#!/usr/bin/env node
// Task 13 fixes:
//  A) chapter_06 6.33: ZWNJ (U+200C) between cañcalatvāt|sthitiṃ -> replace with the
//     file's double-space word separator (two real words in BG 6.33).
//  C) datta_stavam: remove the trailing duplicate invocation group (page 11 == page 1).
//
//  NOTE: chapter_09's ZWNJ in matsthāni/matsthānītyupadhāraya (9.4/9.5/9.6) is left
//  UNTOUCHED on purpose — it sits inside a single word and only affects whether the
//  त्स्थ conjunct ligature forms; it's an intentional typographic choice by the
//  original author and was never reported, unlike 6.33 (two separate words).
const fs = require('fs');
const path = require('path');
const DATA = path.join(__dirname, '..', 'data');

function raw(file) { return fs.readFileSync(path.join(DATA, file), 'utf8'); }
function write(file, s) { fs.writeFileSync(path.join(DATA, file), s); }

const ZWNJ = '‌';
const ZWJ = '‍';

// ---- Chapter 6: 6.33 -> double space (two words) ----
{
  const file = 'chapter_06.json';
  let s = raw(file);
  const before = s;
  // cañcalatvāt<ZWNJ>sthitiṃ  ->  cañcalatvāt  sthitiṃ  (match file's double-space style)
  s = s.replace('cañcalatvāt' + ZWNJ + 'sthitiṃ', 'cañcalatvāt  sthitiṃ');
  // Devanagari: चञ्चलत्वात्<ZWNJ>स्थितिं -> चञ्चलत्वात्  स्थितिं
  s = s.replace('चञ्चलत्वात्' + ZWNJ + 'स्थितिं', 'चञ्चलत्वात्  स्थितिं');
  if (s !== before) { write(file, s); console.log('chapter_06: fixed 6.33 ZWNJ -> double space'); }
  else console.log('chapter_06: NO CHANGE (pattern not found!)');
}

// ---- Datta Stavam: remove trailing duplicate invocation group ----
{
  const file = 'datta_stavam.json';
  const data = JSON.parse(raw(file));
  const blanks = data.shloka
    .map((s, i) => ({ s, i }))
    .filter(x => String(x.s.shlokaNum) === '');
  if (blanks.length === 2 &&
      JSON.stringify(blanks[0].s) === JSON.stringify(blanks[1].s) &&
      blanks[1].i === data.shloka.length - 1) {
    data.shloka.splice(blanks[1].i, 1);   // remove the trailing duplicate
    // Re-serialize minified to preserve original single-line formatting.
    write(file, JSON.stringify(data));
    console.log('datta_stavam: removed trailing duplicate invocation group (was index ' + blanks[1].i + ')');
  } else {
    console.log('datta_stavam: NO CHANGE (trailing duplicate not confirmed) — blanks=' + blanks.length);
  }
}

// ---- Verify 6.33 specifically no longer has a ZWNJ between the two words ----
{
  const s = raw('chapter_06.json');
  if (s.includes('cañcalatvāt' + ZWNJ) || s.includes('चञ्चलत्वात्' + ZWNJ)) {
    console.log('ERROR: chapter_06 6.33 still has ZWNJ after cañcalatvāt');
  } else {
    console.log('OK: chapter_06 6.33 has no ZWNJ between cañcalatvāt and sthitiṃ');
  }
}
// (ZWJ is referenced for completeness in the comment above; not enforced.)
void ZWJ;
