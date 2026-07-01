#!/usr/bin/env python3
"""
Issue #27 follow-up (June 21 comment): break compound-spanning half-verses at the
pāda boundary so each pāda sits on its own display line, matching the accepted
v0.10.3 structure of 6.9 / 17.8 (swhtsp p, l, p, '' — one pāda per line, the
first pāda of a joined half ending in a compound hyphen "-").

Also removes the stray "śrī bhagavānuvāca" speaker label from 18.3, which is a
continuation of Bhagavān's speech begun at 18.2 (not a new utterance).

Line breaks land at the exact 8-syllable pāda boundary; for 6.23 a samāsa hyphen
is introduced at the saṃyōga|viyōga seam (which coincides with the pāda break).

startTime/endTime are not used by the beat/SPM pacing engine, so split halves
simply inherit the parent entry's timing fields.
"""
import json
import os

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA = os.path.join(ROOT, "data")


def load(ch):
    with open(os.path.join(DATA, f"chapter_{ch}.json"), encoding="utf-8") as f:
        return json.load(f)


def save(ch, d):
    with open(os.path.join(DATA, f"chapter_{ch}.json"), "w", encoding="utf-8") as f:
        json.dump(d, f, ensure_ascii=False, indent=2)
        f.write("\n")


def find_shloka(d, num):
    for s in d["shloka"]:
        if str(s["shlokaNum"]) == str(num):
            return s
    raise KeyError(num)


def split_entry(entry, first, second):
    """Return two entries from one, keeping timing/meta, applying new text/iast/swhtsp."""
    a = dict(entry)
    b = dict(entry)
    a["swhtsp"], a["text"], a["iast"] = first["sw"], first["text"], first["iast"]
    b["swhtsp"], b["text"], b["iast"] = second["sw"], second["text"], second["iast"]
    return a, b


# (chapter, shlokaNum, index_of_entry_to_split, first_half, second_half)
SPLITS = [
    ("06", "23", 0,
     {"sw": "p", "text": "तं  विद्यात्  दुःखसंयोग-", "iast": "taṃ  vidyāt  duḥkhasaṃyōga-"},
     {"sw": "l", "text": "वियोगं  योगसञ्ज्ञितम् |", "iast": "viyōgaṃ  yōgasañjñitam |"}),
    ("13", "8", 2,
     {"sw": "p", "text": "जन्ममृत्युजराव्याधि-", "iast": "janmamṛtyujarāvyādhi-"},
     {"sw": "", "text": "दुःखदोषानुदर्शनम् ||8||", "iast": "duḥkhadōṣānudarśanam ||8||"}),
    ("17", "9", 0,
     {"sw": "p", "text": "कट्वम्ललवणात्युष्ण-", "iast": "kaṭvamlalavaṇātyuṣṇa-"},
     {"sw": "l", "text": "तीक्ष्णरूक्षविदाहिनः |", "iast": "tīkṣṇarūkṣavidāhinaḥ |"}),
    ("17", "14", 0,
     {"sw": "p", "text": "देवद्विजगुरुप्राज्ञ-", "iast": "dēvadvijaguruprājña-"},
     {"sw": "l", "text": "पूजनं शौचमार्जवम् |", "iast": "pūjanaṃ śaucamārjavam |"}),
]


def apply_splits():
    by_ch = {}
    for ch, num, idx, first, second in SPLITS:
        by_ch.setdefault(ch, []).append((num, idx, first, second))
    for ch, ops in by_ch.items():
        d = load(ch)
        for num, idx, first, second in ops:
            s = find_shloka(d, num)
            orig = s["entry"][idx]
            a, b = split_entry(orig, first, second)
            s["entry"][idx:idx + 1] = [a, b]
            print(f"Ch{ch} S{num}: split entry {idx} -> {a['iast']!r} / {b['iast']!r}")
        save(ch, d)


def remove_18_3_label():
    d = load("18")
    s = find_shloka(d, "3")
    e0 = s["entry"][0]
    assert "uvāca" in e0.get("iast", ""), f"18.3 entry 0 unexpected: {e0.get('iast')!r}"
    removed = s["entry"].pop(0)
    print(f"Ch18 S3: removed stray label {removed['iast']!r}")
    save("18", d)


if __name__ == "__main__":
    apply_splits()
    remove_18_3_label()
    print("Done.")
