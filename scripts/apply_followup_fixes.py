#!/usr/bin/env python3
"""
Follow-up data fixes after the spoorthi issue triage (session 2026-07-01):

- #38 ch11.3: iast anusvāra uses under-dot ṃ (aiśvaram → aiśvaraṃ); Devanagari
  `text` (ऐश्वरम्) left unchanged, per user instruction.
- #45 Gita Sāram 8/10/15: re-line to match the reference PDF images (move a word
  to the correct display line) + minor anusvāra/spacing fixes. IAST-only file.
- #43 Gita Ārati: the "mayya + pāda-2" refrain slides (verses 2–7) use the
  spelling "mayya" as written in the issue (was "maiyā"). Pallavi lines untouched.
  IAST-only file.
"""
import json, os

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
D = os.path.join(ROOT, "data")


def load(f):
    with open(os.path.join(D, f), encoding="utf-8") as fh:
        return json.load(fh)


def save(f, d):
    with open(os.path.join(D, f), "w", encoding="utf-8") as fh:
        json.dump(d, fh, ensure_ascii=False, indent=2)
        fh.write("\n")


def sh(doc, num):
    for s in doc["shloka"]:
        if str(s.get("shlokaNum")) == str(num):
            return s
    raise KeyError(num)


def set_line(entry, iast, iast_only=True):
    entry["iast"] = iast
    if iast_only:
        entry["text"] = iast


# ---- #38 ch11.3 : iast only, under-dot anusvāra ----
d11 = load("chapter_11.json")
e = sh(d11, "3")["entry"][3]
assert e["iast"] == "aiśvaram  puruṣōttama ||3||", e["iast"]
e["iast"] = "aiśvaraṃ  puruṣōttama ||3||"   # text (Devanagari ऐश्वरम्) unchanged
save("chapter_11.json", d11)
print("ch11.3 iast ->", e["iast"])

# ---- #45 Gita Sāram 8/10/15 (IAST-only; text==iast) ----
gs = load("gita_saram.json")

s8 = sh(gs, "8")["entry"]
set_line(s8[0], "akṣaraparavarapuruṣaṁ  taṁ")
set_line(s8[1], "dhyāyan   prētō  yāti  param |")
set_line(s8[2], "tatastamēva  dhyāyan  tvaṁ")
set_line(s8[3], "kālaṁ  yāpaya  naśyantam || 8 ||")

s10 = sh(gs, "10")["entry"]
set_line(s10[3], "nērṣyādvēṣau  sajjētē || 10 ||")   # was "nērṣyā  dvēṣau ..."

s15 = sh(gs, "15")["entry"]
set_line(s15[0], "chitvā  sāṁsārika  vr̥kṣaṁ")        # moved "padaṁ" off line 1
set_line(s15[1], "padaṁ  gavēṣaya  munilakṣyam |")
save("gita_saram.json", gs)
print("saram 8/10/15 re-lined")

# ---- #43 Gita Ārati: refrain spelling maiyā -> mayya on verse refrains 2-7 ----
ga = load("gita_arati.json")
changed = 0
for s in ga["shloka"]:
    num = str(s.get("shlokaNum"))
    if num in {"2", "3", "4", "5", "6", "7"}:
        for entry in s["entry"]:
            if entry.get("iast", "").startswith("maiyā"):
                new = entry["iast"].replace("maiyā", "mayya", 1)
                set_line(entry, new)
                changed += 1
save("gita_arati.json", ga)
print(f"arati refrains updated maiyā->mayya: {changed}")

# validate
for f in ("chapter_11.json", "gita_saram.json", "gita_arati.json"):
    json.load(open(os.path.join(D, f), encoding="utf-8"))
print("all touched JSON valid")
