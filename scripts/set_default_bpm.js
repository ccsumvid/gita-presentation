#!/usr/bin/env node
// Task 9: per-section default tempo. Inserts top-level "defaultBpm" key into
// data files immediately after "chapterNum", preserving existing formatting.
// Minified files (no newline before closing brace) get a compact insert;
// pretty-printed files get a 2-space indented insert matching siblings.
const fs = require('fs');
const path = require('path');

const DATA = path.join(__dirname, '..', 'data');

// file -> defaultBpm. Files NOT listed here intentionally get no key.
const TARGETS = {
  'datta_stavam.json': 360,
  'invocation_prayers.json': 340,
  'gita_mahatmyam.json': 380,
  'kshama_prarthana.json': 320,
};
for (let n = 1; n <= 18; n++) {
  const num = String(n).padStart(2, '0');
  TARGETS[`chapter_${num}.json`] = n === 1 ? 340 : 380;
}

function insertKey(raw, bpm) {
  // Pretty: "chapterNum": "xx",\n   -> add indented line after.
  const prettyRe = /("chapterNum"\s*:\s*"[^"]*"\s*,)(\r?\n)([ \t]*)/;
  const mPretty = prettyRe.exec(raw);
  if (mPretty) {
    const indent = mPretty[3];
    return raw.replace(prettyRe,
      `$1$2${indent}"defaultBpm": ${bpm},$2$3`);
  }
  // Minified: "chapterNum":"xx", -> insert "defaultBpm":N, right after.
  const miniRe = /("chapterNum"\s*:\s*"[^"]*"\s*,)/;
  const mMini = miniRe.exec(raw);
  if (mMini) {
    return raw.replace(miniRe, `$1"defaultBpm":${bpm},`);
  }
  throw new Error('chapterNum key not found');
}

for (const [file, bpm] of Object.entries(TARGETS)) {
  const fp = path.join(DATA, file);
  let raw = fs.readFileSync(fp, 'utf8');
  const obj = JSON.parse(raw);
  if (obj.defaultBpm !== undefined) {
    console.log(`SKIP ${file}: already has defaultBpm=${obj.defaultBpm}`);
    continue;
  }
  const out = insertKey(raw, bpm);
  // validate
  const parsed = JSON.parse(out);
  if (parsed.defaultBpm !== bpm) {
    throw new Error(`${file}: post-insert defaultBpm=${parsed.defaultBpm}, expected ${bpm}`);
  }
  fs.writeFileSync(fp, out);
  console.log(`OK ${file}: defaultBpm=${bpm}`);
}
console.log('done');
