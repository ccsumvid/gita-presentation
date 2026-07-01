#!/usr/bin/env python3
"""
Data-side pacing changes (Electron operator + web build both read these):

- #44 Gita Mahatmyam: add chapter-level "lineEndPauseBeats": 2.5 so verse lines
  pause 2.5 mātrās (the shlokas were mislabeled tristubh → 4.5-mātrā pauses → too
  slow). The renderer prefers pageData.lineEndPauseBeats over the meter default.
- #46 Samarpana (kshama_prarthana) slide 4 — both occurrences (shlokaNum "4"):
  bpmOffset -40 internal (= -10 SPM) to sync with the diction.
"""
import json, os

D = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "data")


def load(f):
    with open(os.path.join(D, f), encoding="utf-8") as fh:
        return json.load(fh)


def save(f, d):
    with open(os.path.join(D, f), "w", encoding="utf-8") as fh:
        json.dump(d, fh, ensure_ascii=False, indent=2)
        fh.write("\n")


# #44 — insert lineEndPauseBeats right after defaultBpm to keep key order tidy
gm = load("gita_mahatmyam.json")
if "lineEndPauseBeats" not in gm:
    ordered = {}
    for k, v in gm.items():
        ordered[k] = v
        if k == "defaultBpm":
            ordered["lineEndPauseBeats"] = 2.5
    if "lineEndPauseBeats" not in ordered:      # no defaultBpm key — prepend before shloka
        ordered = {}
        for k, v in gm.items():
            if k == "shloka" and "lineEndPauseBeats" not in ordered:
                ordered["lineEndPauseBeats"] = 2.5
            ordered[k] = v
    gm = ordered
gm["lineEndPauseBeats"] = 2.5
save("gita_mahatmyam.json", gm)
print("gita_mahatmyam lineEndPauseBeats = 2.5")

# #46 — both shlokaNum "4" objects get bpmOffset -40
kp = load("kshama_prarthana.json")
n = 0
for s in kp["shloka"]:
    if str(s.get("shlokaNum")) == "4":
        s["bpmOffset"] = -40
        n += 1
save("kshama_prarthana.json", kp)
print(f"kshama_prarthana slide-4 bpmOffset=-40 applied to {n} shloka(s)")

for f in ("gita_mahatmyam.json", "kshama_prarthana.json"):
    json.load(open(os.path.join(D, f), encoding="utf-8"))
print("valid")
