#!/usr/bin/env python3
"""Show word-boundary diff between 'padas' (current) and 'desc' (target)
for the Dhyana rows of issue #38, so we can see exactly which spaces change.
"""
import json
import re


def target_from_desc(desc):
    # desc format: "Re-space to match PDF: <target>"
    m = re.split(r"match PDF:\s*", desc, maxsplit=1)
    return m[1].strip() if len(m) > 1 else desc


def main():
    data = json.load(open("scratch/issue38_changes.json"))
    for o in data:
        if o["chapter"] != "Dhyana":
            continue
        cur = o["padas"]
        tgt = target_from_desc(o["desc"])
        print(f"\n=== Dhyana sloka {o['sloka']} ===")
        print("CUR:", cur)
        print("TGT:", tgt)
        # Show the boundary changes: strip spaces and confirm same letters
        print("cur nospace == tgt nospace?",
              cur.replace(" ", "").replace("-", "") == tgt.replace(" ", "").replace("-", ""))
        cw = cur.split()
        tw = tgt.split()
        print(f"cur words={len(cw)} tgt words={len(tw)}")


if __name__ == "__main__":
    main()
