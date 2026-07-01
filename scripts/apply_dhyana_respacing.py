#!/usr/bin/env python3
"""
#38 Dhyāna re-spacing to match the reference PDF (rows skipped by the first pass).

The audience only ever sees Asterisks or English (iast) display — the Devanagari
`text` is used solely for (space-insensitive) syllable analysis and is never shown —
so this re-spaces the `iast` of each Dhyāna display line only. Words are NOT moved
across existing line breaks (line composition, and therefore line-end pauses, are
unchanged); only intra-line spacing plus the PDF's sandhi spellings change:
  ōṃ→ōm, advaitāmṛta-varṣiṇīṃ (hyphen), yēna tvayā→yēnatvayā,
  pārāśaryavacaḥ sarōja→pārāśarya vacassarōja, bhūyād→bhūyāt.

Applied to BOTH the embedded Dhyāna in src/shared.js and the copy in index.html.
"""
import os

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
FILES = [os.path.join(ROOT, "src", "shared.js"), os.path.join(ROOT, "index.html")]

# (old iast value, new iast value) — exact strings incl. original multi-spaces.
PAIRS = [
    # Sloka 1
    ("ōṃ  pārthāya  pratibōdhitāṃ   bhagavatā", "ōm  pārthāya  pratibōdhitāṃ   bhagavatā"),
    ("advaitāmṛtavarṣiṇīṃ  bhagavatīm", "advaitāmṛta-varṣiṇīṃ  bhagavatīm"),
    # Sloka 2
    ("namō'stutē  vyāsa  viśālabuddhē", "namō'stutē  vyāsa  viśāla buddhē"),
    ("phullāravindāyatapatranētra |", "phullāravindāyata patranētra |"),
    ("yēna tvayā bhārata tailapūrṇaḥ", "yēnatvayā bhārata taila pūrṇaḥ"),
    ("prajvālitō jñānamayaḥ  pradīpaḥ||", "prajvālitō jñāna mayaḥ  pradīpaḥ||"),
    # Sloka 3
    ("prapannapārijātāya", "prapanna pārijātāya"),
    ("tōtravētraikapāṇayē |", "tōtravētraika pāṇayē |"),
    # Sloka 4
    ("vasudēvasutaṃ  dēvaṃ", "vasudēva sutaṃ  dēvaṃ"),
    ("kaṃsacāṇūramardanam |", "kaṃsa cāṇūra mardanam |"),
    ("dēvakīparamānandaṃ", "dēvakī paramānandaṃ"),
    # Sloka 5
    ("gāndhāranīlōtpalā", "gāndhāra nīlōtpalā"),
    ("aśvatthāmavikarṇaghōramakarā", "aśvatthāma vikarṇa ghōramakarā"),
    # Sloka 6
    ("pārāśaryavacaḥ  sarōjamamalaṃ", "pārāśarya vacassarōjamamalaṃ"),
    ("gītārthagandhōtkaṭaṃ", "gītārtha gandhōtkaṭaṃ"),
    ("nānākhyānakakēsaraṃ  harikathā", "nānākhyānaka kēsaraṃ  harikathā"),
    ("sambōdhanābōdhitam |", "sambōdhanā bōdhitam |"),
    ("lōkē  sajjanaṣaṭpadairaharahaḥ", "lōkē  sajjana ṣaṭpadairaharahaḥ"),
    ("bhūyādbhāratapaṅkajaṃ  kalimala", "bhūyāt bhārata paṅkajaṃ  kalimala"),
    # Sloka 7
    ("yatkṛpā  tamahaṃ  vandē", "yat kṛpā  tamahaṃ  vandē"),
    ("paramānandamādhavam ||", "paramānanda mādhavam ||"),
]


def collapse(s):
    return s.replace(" ", "").replace("-", "")


for old, new in PAIRS:
    # Guard: re-spacing must preserve the letter sequence except the intended
    # sandhi spellings (ōṃ→ōm, vacaḥ→vacas, bhūyād→bhūyāt).
    co, cn = collapse(old), collapse(new)
    if co != cn:
        assert (co, cn) in {
            ("ōṃpārthāyapratibōdhitāṃbhagavatā", "ōmpārthāyapratibōdhitāṃbhagavatā"),
            ("pārāśaryavacaḥsarōjamamalaṃ", "pārāśaryavacassarōjamamalaṃ"),
            ("bhūyādbhāratapaṅkajaṃkalimala", "bhūyātbhāratapaṅkajaṃkalimala"),
        }, f"unexpected letter change: {old!r} -> {new!r}"

for path in FILES:
    with open(path, encoding="utf-8") as fh:
        txt = fh.read()
    misses = []
    for old, new in PAIRS:
        needle = '"iast":"' + old + '"'
        repl = '"iast":"' + new + '"'
        n = txt.count(needle)
        if n == 0:
            misses.append(old)
            continue
        txt = txt.replace(needle, repl)
    with open(path, "w", encoding="utf-8") as fh:
        fh.write(txt)
    label = os.path.relpath(path, ROOT)
    if misses:
        print(f"{label}: WARNING not found ({len(misses)}): " + "; ".join(misses))
    else:
        print(f"{label}: all {len(PAIRS)} lines re-spaced")
