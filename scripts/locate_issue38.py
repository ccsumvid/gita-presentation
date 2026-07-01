#!/usr/bin/env python3
"""For each non-Dhyana issue #38 row, locate the target sloka and the entry
line(s) that contain the pada text, printing the actual stored iast+text so we
can craft exact edits. Accounts for double-space separators.
"""
import json
import re
import unicodedata

CHAP_FILE = {str(n): f"data/chapter_{n:02d}.json" for n in range(1, 19)}


def load(chapter):
    path = CHAP_FILE[chapter]
    return path, json.load(open(path))


def norm_ws(s):
    return re.sub(r"\s+", " ", s).strip()


def main():
    data = json.load(open("scratch/issue38_changes.json"))
    for o in data:
        if o["chapter"] == "Dhyana":
            continue
        path, doc = load(o["chapter"])
        target = None
        for sh in doc["shloka"]:
            if str(sh.get("shlokaNum")) == str(o["sloka"]):
                target = sh
                break
        print(f"\n=== ch{o['chapter']} sloka {o['sloka']} (row {o['row']}) ===")
        print("PADAS:", o["padas"])
        print("DESC :", o["desc"])
        if not target:
            print("  !! SLOKA NOT FOUND")
            continue
        pada_norm = norm_ws(o["padas"])
        for idx, e in enumerate(target["entry"]):
            iast_n = norm_ws(e.get("iast", ""))
            # strip trailing shloka number markers and dandas for matching
            iast_core = re.sub(r"\s*\|+\s*", " ", iast_n)
            iast_core = re.sub(r"\|\|\d+\|\|", "", iast_core).strip()
            match = pada_norm in iast_n or pada_norm in iast_core or iast_core in pada_norm
            flag = "  <== MATCH" if match else ""
            print(f"  [{idx}] swhtsp={e.get('swhtsp')!r} iast={e.get('iast')!r}{flag}")
            if match:
                print(f"         text={e.get('text')!r}")


if __name__ == "__main__":
    main()
