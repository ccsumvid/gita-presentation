#!/usr/bin/env python3
"""Rebuild data/gita_arati.json for issue #43 (Gita Aarti).

Singing pattern per verse (2-7), as requested in the issue:
  1. Pāda 1 + Pāda 2       (written line 1, kept intact)
  2. "maiyā" + Pāda 2      (refrain repeat of the 2nd pāda)
  3. Pāda 3   (sung twice) -> repeat:2
  4. Pāda 4 + "|| ōm  jaya ||"  (written line 2 tail + refrain cue)
Plus a Pallavi (refrain) slide added again near the end.

The file stores each verse as TWO written half-lines. Each half-line is
divided into TWO metrical pādas. Because the pāda boundary is a musical
judgment (not mechanically derivable from the text), the split points are
listed EXPLICITLY below as PADA_SPLITS, reflecting the standard sung
version of this aarti ("ōm jaya bhagavadgītē").

NEEDS-CLARIFICATION: confirm every PADA_SPLITS boundary against the
reference audio/notation before release. The words are taken verbatim
from the source file — only the split position is chosen here.

Idempotent guard: refuses to run if the file is already transformed.
"""
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "data" / "gita_arati.json"

# Per verse: (pada1, pada2, pada3, pada4). Words verbatim from source; only
# the boundary between pada1|pada2 and pada3|pada4 is chosen here.
PADA_SPLITS = {
    "2": ("karma-sukarma-prakāśini", "kāmāsakti  harā",
          "tattvajñāna-vikāśini", "vidyā  brahma  parā"),
    "3": ("niścala-bhakti-vidhāyini", "nirmala  malahārī",
          "śaraṇa-rahasya-pradāyini", "saba  vidhi  sukhakārī"),
    "4": ("rāga-dvēṣa-vidāriṇi", "kāriṇi  mōda  sadā",
          "bhava-bhaya-hāriṇi  tāriṇi", "paramānandapradā"),
    "5": ("āsura-bhāva-vināśini", "nāśini  tama-rajanī",
          "daivī  sadguṇadāyini", "hari-rasikā  sajanī"),
    "6": ("samatā  tyāga  sikhāvani", "hari-mukha  kī  vāṇī",
          "sakala  śāstra  kī  svāmini", "śrutiyō  kī  rānī"),
    "7": ("dayā-sudhā  barsāvani", "mātu  kr̥pā  kījai",
          "hari-pada-prēma  pradāyini", "apanō  kara  lījai"),
}

REFRAIN_CUE = "|| ōm  jaya ||"


def base_entry(text, swhtsp, sty=""):
    return {"text": text, "iast": text, "swhtsp": swhtsp,
            "shlNbr": "00", "sty": sty}


def norm(s):
    """Collapse whitespace and drop dandas + the 'ōm jaya' refrain cue,
    for verification comparisons."""
    s = s.replace("|", " ")
    words = [w for w in s.split() if w]
    # Drop a trailing 'ōm jaya' refrain cue if present.
    while words and words[-1] == "jaya" and len(words) >= 2 and words[-2] == "ōm":
        words = words[:-2]
    return " ".join(words)


def build():
    data = json.loads(SRC.read_text(encoding="utf-8"))
    old = data["shloka"]

    if any(sh.get("shlokaNum") == "pallavi" for sh in old):
        raise SystemExit("Refusing to run: file already transformed for #43.")

    title, pallavi = old[0], old[1]
    new_shlokas = [title, pallavi]

    for sh in old[2:]:
        num = sh["shlokaNum"]
        line1 = sh["entry"][0]["iast"]   # pada1 + pada2 (+ trailing '|')
        line2 = sh["entry"][1]["iast"]   # pada3 + pada4 (+ '|| ōm jaya ||')
        p1, p2, p3, p4 = PADA_SPLITS[num]

        # Verify the chosen padas reconstruct the source words exactly.
        assert norm(p1 + " " + p2) == norm(line1), (num, "line1", norm(line1))
        assert norm(p3 + " " + p4) == norm(line2), (num, "line2", norm(line2))

        # Slide 1: written line 1 intact (Pāda1 + Pāda2)
        new_shlokas.append({"shlokaNum": num,
                            "entry": [base_entry(line1, "l")]})

        # Slide 2: "maiyā" + Pāda2  (keep the same trailing '|' as line1)
        new_shlokas.append({"shlokaNum": num,
                            "entry": [base_entry("maiyā  " + p2 + " |", "l")]})

        # Slide 3: Pāda3, sung twice
        new_shlokas.append({"shlokaNum": num,
                            "entry": [base_entry(p3, "l")],
                            "repeat": 2})

        # Slide 4: Pāda4 + refrain cue
        new_shlokas.append({"shlokaNum": num,
                            "entry": [base_entry(p4 + " " + REFRAIN_CUE, "")]})

    # Pallavi again near the END (the missing slide)
    new_shlokas.append({"shlokaNum": "pallavi",
                        "entry": [dict(e) for e in pallavi["entry"]]})

    data["shloka"] = new_shlokas
    return data


def main():
    data = build()
    SRC.write_text(
        json.dumps(data, ensure_ascii=False, separators=(",", ":")) + "\n",
        encoding="utf-8")
    print("Wrote", SRC)
    print("Total shlokas:", len(data["shloka"]))


if __name__ == "__main__":
    main()
