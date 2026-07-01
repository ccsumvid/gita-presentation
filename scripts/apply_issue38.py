#!/usr/bin/env python3
"""Apply issue #38 sloka pada text corrections.

Each edit targets a specific (file, shlokaNum, entry_index) and does an exact
substring replace on the 'iast' and/or 'text' field. The script asserts the
old substring is present (and unique enough) before replacing, so a bad match
fails loudly rather than silently doing nothing.

Categories:
  - space add/remove & spelling fixes  -> affects BOTH iast and text
  - anusvara vs plain-m (ṃ<->m)        -> IAST-only (Devanagari uses anusvāra ं
                                          which romanizes as either; text unchanged)
  - avagraha apostrophe add            -> IAST-only (Devanagari has no avagraha here)
  - tilde (~) removal                  -> IAST-only (Devanagari uses ँ, unchanged)

Dhyana (chapter 0, embedded in src/shared.js) rows are NOT handled here; the
re-spacing instructions do not map cleanly onto the app's multi-line display
structure and are flagged for clarification.
"""
import json

# edit = (path, shlokaNum, entry_idx, field, old, new)
# field: 'iast', 'text', or 'both' (old/new given as (iast_old,iast_new,text_old,text_new))
EDITS = [
    # ---- Chapter 1 ----
    # s7: join tān bravīmi (space -> none) BOTH
    ("data/chapter_01.json", "7", 3, "both",
     ("tān  bravīmi", "tānbravīmi", "तान्  ब्रवीमि", "तान्ब्रवीमि")),
    # s8: join bhavān bhīṣmaśca BOTH
    ("data/chapter_01.json", "8", 0, "both",
     ("bhavān  bhīṣmaśca", "bhavānbhīṣmaśca", "भवान्  भीष्मश्च", "भवान्भीष्मश्च")),
    # s12: join sañjanayan harṣaṃ BOTH
    ("data/chapter_01.json", "12", 0, "both",
     ("sañjanayan  harṣaṃ", "sañjanayanharṣaṃ", "सञ्जनयन्  हर्षं", "सञ्जनयन्हर्षं")),
    # s18: join pṛthak pṛthak BOTH
    ("data/chapter_01.json", "18", 3, "both",
     ("pṛthak  pṛthak", "pṛthakpṛthak", "पृथक्  पृथक्", "पृथक्पृथक्")),
    # s22: yōddhavyaṃ -> yōddhavyam (ṃ->m) IAST-only
    ("data/chapter_01.json", "22", 2, "iast",
     ("yōddhavyaṃ", "yōddhavyam")),
    # s23: join dhārtarāṣṭrasya durbuddhēḥ BOTH
    ("data/chapter_01.json", "23", 2, "both",
     ("dhārtarāṣṭrasya  durbuddhēḥ", "dhārtarāṣṭrasyadurbuddhēḥ",
      "धार्तराष्ट्रस्य  दुर्बुद्धेः", "धार्तराष्ट्रस्यदुर्बुद्धेः")),
    # s30: remove space inside word tva kcaiva -> tvakcaiva BOTH
    ("data/chapter_01.json", "30", 1, "both",
     ("tva kcaiva", "tvakcaiva", "त्व क्चैव", "त्वक्चैव")),
    # s33: doubled t prāṇāṃstyakttvā -> prāṇāṃstyaktvā BOTH
    ("data/chapter_01.json", "33", 3, "both",
     ("prāṇāṃstyakttvā", "prāṇāṃstyaktvā", "प्राणांस्त्यक्त्त्वा", "प्राणांस्त्यक्त्वा")),
    # s44: narakē'niyataṃ -> narakē niyataṃ (remove apostrophe, add space) BOTH
    ("data/chapter_01.json", "44", 2, "both",
     ("narakē'niyataṃ", "narakē niyataṃ", "नरकेऽनियतं", "नरके नियतं")),

    # ---- Chapter 2 ----
    # s29: kaścidēnaṃ -> kaścidēnam (ṃ->m) IAST-only
    ("data/chapter_02.json", "29", 0, "iast",
     ("kaścidēnaṃ", "kaścidēnam")),
    # s37: split bhōkṣyasēmahīm -> bhōkṣyasē mahīm BOTH
    ("data/chapter_02.json", "37", 1, "both",
     ("bhōkṣyasēmahīm", "bhōkṣyasē mahīm", "भोक्ष्यसेमहीम्", "भोक्ष्यसे महीम्")),
    # s72: remove extra apostrophe sthitvā'syām -> sthitvāsyām IAST-only
    ("data/chapter_02.json", "72", 2, "iast",
     ("sthitvā'syāmantakālē'pi", "sthitvāsyāmantakālē'pi")),

    # ---- Chapter 3 ----
    # s10 (1): prasaviṣyadhvaṃ -> prasaviṣyadhvam (ṃ->m) IAST-only
    ("data/chapter_03.json", "10", 2, "iast",
     ("prasaviṣyadhvaṃ", "prasaviṣyadhvam")),
    # s10 (2): join ēṣa vō'stviṣṭakāmadhuk -> ēṣavō'stviṣṭakāmadhuk BOTH
    ("data/chapter_03.json", "10", 3, "both",
     ("ēṣa  vō'stviṣṭakāmadhuk", "ēṣavō'stviṣṭakāmadhuk",
      "एष  वोऽस्त्विष्टकामधुक्", "एषवोऽस्त्विष्टकामधुक्")),
    # s20: saṃsiddhiṃ -> saṃsiddhim (final ṃ->m) IAST-only
    ("data/chapter_03.json", "20", 0, "iast",
     ("hi  saṃsiddhiṃ", "hi  saṃsiddhim")),
    # s42: split parābuddhiḥ -> parā buddhiḥ BOTH
    ("data/chapter_03.json", "42", 2, "both",
     ("parābuddhiḥ", "parā buddhiḥ", "पराबुद्धिः", "परा बुद्धिः")),

    # ---- Chapter 4 ----
    # s21: join tyaktasarva parigrahaḥ BOTH
    ("data/chapter_04.json", "21", 1, "both",
     ("tyaktasarva  parigrahaḥ", "tyaktasarvaparigrahaḥ",
      "त्यक्तसर्व  परिग्रहः", "त्यक्तसर्वपरिग्रहः")),

    # ---- Chapter 5 ----
    # s11: add avagraha tyaktvātma -> tyaktvā''tma IAST-only
    ("data/chapter_05.json", "11", 3, "iast",
     ("tyaktvātmaśuddhayē", "tyaktvā''tmaśuddhayē")),
    # s24 (1): split yō'ntaḥsukhō -> yō'ntaḥ sukhō BOTH
    ("data/chapter_05.json", "24", 0, "both",
     ("yō'ntaḥsukhō'ntarārāmaḥ", "yō'ntaḥ sukhō'ntarārāmaḥ",
      "योऽन्तःसुखोऽन्तरारामः", "योऽन्तः सुखोऽन्तरारामः")),
    # s24 (2): add avagraha tathāntar -> tathā'ntar IAST-only
    ("data/chapter_05.json", "24", 1, "iast",
     ("tathāntarjyōtirēva", "tathā'ntarjyōtirēva")),

    # ---- Chapter 6 ----
    # s6: add avagraha bandhurātmātma -> bandhurātmā''tma IAST-only
    ("data/chapter_06.json", "6", 0, "iast",
     ("bandhurātmātmanastasya", "bandhurātmā''tmanastasya")),
    # s20: add avagraha caivātmanātmānaṃ -> caivātmanā''tmānaṃ IAST-only
    ("data/chapter_06.json", "20", 2, "iast",
     ("caivātmanātmānaṃ", "caivātmanā''tmānaṃ")),
    # s23: split duḥkhasaṃyōgaviyōgaṃ -> duḥkhasaṃyōga viyōgaṃ BOTH
    ("data/chapter_06.json", "23", 0, "both",
     ("duḥkhasaṃyōgaviyōgaṃ", "duḥkhasaṃyōga viyōgaṃ",
      "दुःखसंयोगवियोगं", "दुःखसंयोग वियोगं")),
    # s24: split saṅkalpaprabhavānkāmān -> saṅkalpaprabhavān kāmān BOTH
    ("data/chapter_06.json", "24", 0, "both",
     ("saṅkalpaprabhavānkāmān", "saṅkalpaprabhavān kāmān",
      "सङ्कल्पप्रभवान्कामान्", "सङ्कल्पप्रभवान् कामान्")),
    # s28: brahmasaṃsparśam -> brahmasaṃsparśaṃ (m->ṃ) IAST-only
    ("data/chapter_06.json", "28", 2, "iast",
     ("brahmasaṃsparśam", "brahmasaṃsparśaṃ")),

    # ---- Chapter 7 ----
    # s7: kiñjidasti -> kiñcidasti (spelling j->c) BOTH
    ("data/chapter_07.json", "7", 1, "both",
     ("kiñjidasti", "kiñcidasti", "किञ्जिदस्ति", "किञ्चिदस्ति")),
    # s17: join ēka bhaktir -> ēkabhaktir BOTH
    ("data/chapter_07.json", "17", 1, "both",
     ("ēka  bhaktirviśiṣyatē", "ēkabhaktirviśiṣyatē",
      "एक  भक्तिर्विशिष्यते", "एकभक्तिर्विशिष्यते")),
    # s20: remove space kāmaistai stair -> kāmaistaistair BOTH
    ("data/chapter_07.json", "20", 0, "both",
     ("kāmaistai stairhṛtajñānāḥ", "kāmaistaistairhṛtajñānāḥ",
      "कामैस्तै स्तैर्हृतज्ञानाः", "कामैस्तैस्तैर्हृतज्ञानाः")),

    # ---- Chapter 8 ----
    # s9: rūpaṃ -> rūpam (ṃ->m) IAST-only
    ("data/chapter_08.json", "9", 2, "iast",
     ("acintyarūpaṃ", "acintyarūpam")),
    # s28: split yatpuṇyaphalaṃ -> yat puṇyaphalaṃ BOTH
    ("data/chapter_08.json", "28", 1, "both",
     ("yatpuṇyaphalaṃ", "yat puṇyaphalaṃ", "यत्पुण्यफलं", "यत् पुण्यफलं")),

    # ---- Chapter 9 ----
    # s25: split pitṝnyānti -> pitṝn yānti BOTH
    ("data/chapter_09.json", "25", 1, "both",
     ("pitṝnyānti", "pitṝn yānti", "पितॄन्यान्ति", "पितॄन् यान्ति")),

    # ---- Chapter 10 ----
    # s21: ādityānāmahaṃ -> ādityānāmaham (ṃ->m) IAST-only
    ("data/chapter_10.json", "21", 0, "iast",
     ("ādityānāmahaṃ", "ādityānāmaham")),
    # s28: join āyudhānāṃ ahaṃ -> āyudhānāmahaṃ BOTH
    ("data/chapter_10.json", "28", 0, "both",
     ("āyudhānāṃ  ahaṃ", "āyudhānāmahaṃ", "आयुधानां  अहं", "आयुधानामहं")),

    # ---- Chapter 11 ----
    # s3: aiśvaram -> anusvāra  -> FLAGGED (see report); NOT applied.
    # s23: join bahuvaktra nētraṃ -> bahuvaktranētraṃ BOTH
    ("data/chapter_11.json", "23", 0, "both",
     ("bahuvaktra  nētraṃ", "bahuvaktranētraṃ", "बहुवक्त्र  नेत्रं", "बहुवक्त्रनेत्रं")),
    # s33: split śatrūnbhuṅkṣva -> śatrūn bhuṅkṣva BOTH
    ("data/chapter_11.json", "33", 1, "both",
     ("śatrūnbhuṅkṣva", "śatrūn bhuṅkṣva", "शत्रून्भुङ्क्ष्व", "शत्रून् भुङ्क्ष्व")),
    # s34: add avagraha tathānyānapi -> tathā'nyānapi IAST-only
    ("data/chapter_11.json", "34", 1, "iast",
     ("tathānyānapi", "tathā'nyānapi")),
    # s43: add avagraha pitāsi -> pitā'si IAST-only
    ("data/chapter_11.json", "43", 0, "iast",
     ("pitāsi  lōkasya", "pitā'si  lōkasya")),
    # s45: split dēvarūpaṃ -> dēva rūpaṃ BOTH
    ("data/chapter_11.json", "45", 2, "both",
     ("darśaya  dēvarūpaṃ", "darśaya  dēva rūpaṃ",
      "दर्शय  देवरूपं", "दर्शय  देव रूपं")),

    # ---- Chapter 13 ----
    # s7: adaṃbhitvam -> adambhitvam (ṃ->m) IAST-only
    ("data/chapter_13.json", "7", 0, "iast",
     ("adaṃbhitvam", "adambhitvam")),
    # s14: join guṇabhōktṛ ca -> guṇabhōktṛca BOTH
    ("data/chapter_13.json", "14", 3, "both",
     ("guṇabhōktṛ ca", "guṇabhōktṛca", "गुणभोक्तृ च", "गुणभोक्तृच")),
    # s19: vikārāṃśca / guṇāṃścaiva -> plain m in both, IAST-only
    ("data/chapter_13.json", "19", 2, "iast",
     ("vikārāṃśca guṇāṃścaiva", "vikārāmśca guṇāmścaiva")),

    # ---- Chapter 15 ----
    # s1: split ūrdhvamūlamadhaḥśākham -> ūrdhvamūlamadhaḥ śākham BOTH
    ("data/chapter_15.json", "1", 1, "both",
     ("ūrdhvamūlamadhaḥśākham", "ūrdhvamūlamadhaḥ śākham",
      "ऊर्ध्वमूलमधःशाखम्", "ऊर्ध्वमूलमधः शाखम्")),
    # s3: saṃpratiṣṭhā -> sampratiṣṭhā (ṃ->m) IAST-only
    ("data/chapter_15.json", "3", 1, "iast",
     ("saṃpratiṣṭhā", "sampratiṣṭhā")),
    # s5: join sukhaduḥkha sañjñaiḥ -> sukhaduḥkhasañjñaiḥ BOTH
    ("data/chapter_15.json", "5", 2, "both",
     ("sukhaduḥkha  sañjñaiḥ", "sukhaduḥkhasañjñaiḥ",
      "सुखदुःख  सञ्ज्ञैः", "सुखदुःखसञ्ज्ञैः")),
    # s6: join na pāvakaḥ -> napāvakaḥ BOTH
    ("data/chapter_15.json", "6", 1, "both",
     ("na  pāvakaḥ", "napāvakaḥ", "न  पावकः", "नपावकः")),
    # s11: remove space before apostrophe yatantō ' -> yatantō' BOTH
    ("data/chapter_15.json", "11", 2, "both",
     ("yatantō 'pyakṛtātmānaḥ", "yatantō'pyakṛtātmānaḥ",
      "यतन्तो ऽप्यकृतात्मानः", "यतन्तोऽप्यकृतात्मानः")),
    # s19: split sarvavidbhajati -> sarvavid bhajati BOTH
    ("data/chapter_15.json", "19", 2, "both",
     ("sarvavidbhajati", "sarvavid bhajati", "सर्वविद्भजति", "सर्वविद् भजति")),

    # ---- Chapter 16 ----
    # s10: add avagraha gṛhītvāsad -> gṛhītvā'sad IAST-only
    ("data/chapter_16.json", "10", 2, "iast",
     ("mōhādgṛhītvāsadgrāhān", "mōhādgṛhītvā'sadgrāhān")),
    # s14: śatṛḥ -> śatruḥ (spelling) BOTH
    ("data/chapter_16.json", "14", 0, "both",
     ("hataḥ  śatṛḥ", "hataḥ  śatruḥ", "हतः  शतृः", "हतः  शत्रुः")),

    # ---- Chapter 17 ----
    # s4: split prētānbhūtagaṇāṃścānyē -> prētān bhūtagaṇāṃścānyē BOTH
    ("data/chapter_17.json", "4", 2, "both",
     ("prētānbhūtagaṇāṃścānyē", "prētān bhūtagaṇāṃścānyē",
      "प्रेतान्भूतगणांश्चान्ये", "प्रेतान् भूतगणांश्चान्ये")),
    # s6: split tānviddhyāsuraniścayān -> tān viddhyāsuraniścayān BOTH
    ("data/chapter_17.json", "6", 3, "both",
     ("tānviddhyāsuraniścayān", "tān viddhyāsuraniścayān",
      "तान्विद्ध्यासुरनिश्चयान्", "तान् विद्ध्यासुरनिश्चयान्")),
    # s8: āyuḥsattva -> āyussattva (ḥs -> ss) BOTH
    ("data/chapter_17.json", "8", 0, "both",
     ("āyuḥsattvabalārōgya", "āyussattvabalārōgya",
      "आयुःसत्त्वबलारोग्य", "आयुस्सत्त्वबलारोग्य")),
    # s16: join manaḥ prasādaḥ -> manaḥprasādaḥ BOTH
    ("data/chapter_17.json", "16", 0, "both",
     ("manaḥ  prasādaḥ", "manaḥprasādaḥ", "मनः  प्रसादः", "मनःप्रसादः")),
    # s17: split tapastattrividhaṃ -> tapastat trividhaṃ BOTH
    ("data/chapter_17.json", "17", 1, "both",
     ("tapastattrividhaṃ", "tapastat trividhaṃ", "तपस्तत्त्रिविधं", "तपस्तत् त्रिविधं")),
    # s23: ōṃ -> ōm (ṃ->m) IAST-only
    ("data/chapter_17.json", "23", 0, "iast",
     ("ōṃ  tatsaditi", "ōm  tatsaditi")),
    # s24: split tasmādōmityudāhṛtya -> tasmād ōm ityudāhṛtya BOTH
    ("data/chapter_17.json", "24", 0, "both",
     ("tasmādōmityudāhṛtya", "tasmād ōm ityudāhṛtya",
      "तस्मादोमित्युदाहृत्य", "तस्माद् ओम् इत्युदाहृत्य")),
    # s26: split sadityētatprayujyatē -> sadityētat prayujyatē BOTH
    ("data/chapter_17.json", "26", 1, "both",
     ("sadityētatprayujyatē", "sadityētat prayujyatē",
      "सदित्येतत्प्रयुज्यते", "सदित्येतत् प्रयुज्यते")),

    # ---- Chapter 18 ----
    # s3: split yajñadānatapaḥkarma -> yajñadānatapaḥ karma BOTH
    ("data/chapter_18.json", "3", 3, "both",
     ("yajñadānatapaḥkarma", "yajñadānatapaḥ karma",
      "यज्ञदानतपःकर्म", "यज्ञदानतपः कर्म")),
    # s17: remove tilde imā~llōkān -> imāllōkān IAST-only
    ("data/chapter_18.json", "17", 2, "iast",
     ("imā~llōkān", "imāllōkān")),
    # s21: split nānābhāvānpṛthagvidhān -> nānābhāvān pṛthagvidhān BOTH
    ("data/chapter_18.json", "21", 1, "both",
     ("nānābhāvānpṛthagvidhān", "nānābhāvān pṛthagvidhān",
      "नानाभावान्पृथग्विधान्", "नानाभावान् पृथग्विधान्")),
    # s71: remove tilde śubhā~llōkān -> śubhāllōkān IAST-only
    ("data/chapter_18.json", "71", 2, "iast",
     ("śubhā~llōkān", "śubhāllōkān")),
    # s72: praṇaṣṭastē -> pranaṣṭastē (ṇ->n) BOTH
    ("data/chapter_18.json", "72", 3, "both",
     ("praṇaṣṭastē", "pranaṣṭastē", "प्रणष्टस्ते", "प्रनष्टस्ते")),
    # s76: split rājansaṃsmṛtya -> rājan saṃsmṛtya BOTH
    ("data/chapter_18.json", "76", 0, "both",
     ("rājansaṃsmṛtya  saṃsmṛtya", "rājan saṃsmṛtya  saṃsmṛtya",
      "राजन्संस्मृत्य  संस्मृत्य", "राजन् संस्मृत्य  संस्मृत्य")),
]


def get_entry(doc, shloka_num, idx):
    for sh in doc["shloka"]:
        if str(sh.get("shlokaNum")) == str(shloka_num):
            return sh["entry"][idx]
    raise KeyError(f"shloka {shloka_num} not found")


def replace_once(s, old, new):
    if old not in s:
        raise ValueError(f"OLD not found: {old!r} in {s!r}")
    if s.count(old) != 1:
        raise ValueError(f"OLD not unique ({s.count(old)}x): {old!r} in {s!r}")
    return s.replace(old, new)


def main():
    docs = {}
    trailing_nl = {}
    log = []
    for edit in EDITS:
        path, snum, idx, field = edit[0], edit[1], edit[2], edit[3]
        payload = edit[4]
        if path not in docs:
            raw = open(path, encoding="utf-8").read()
            docs[path] = json.loads(raw)
            trailing_nl[path] = raw.endswith("\n")
        e = get_entry(docs[path], snum, idx)
        rec = {"file": path, "sloka": snum, "entry": idx, "field": field}
        if field == "both":
            io, inn, to, tn = payload
            old_i, old_t = e["iast"], e["text"]
            e["iast"] = replace_once(e["iast"], io, inn)
            e["text"] = replace_once(e["text"], to, tn)
            rec.update(iast_old=old_i, iast_new=e["iast"], text_old=old_t, text_new=e["text"])
        elif field == "iast":
            io, inn = payload
            old_i = e["iast"]
            e["iast"] = replace_once(e["iast"], io, inn)
            rec.update(iast_old=old_i, iast_new=e["iast"], text_old=e["text"], text_new=e["text"])
        else:
            raise ValueError(field)
        log.append(rec)

    for path, doc in docs.items():
        out = json.dumps(doc, ensure_ascii=False, indent=2)
        if trailing_nl[path]:
            out += "\n"
        with open(path, "w", encoding="utf-8") as f:
            f.write(out)

    print(f"Applied {len(log)} edits across {len(docs)} files.")
    with open("scratch/issue38_applied.json", "w", encoding="utf-8") as f:
        json.dump(log, f, ensure_ascii=False, indent=2)
    print("Audit log: scratch/issue38_applied.json")


if __name__ == "__main__":
    main()
