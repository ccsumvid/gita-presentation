#!/usr/bin/env node
// Replicate groupIntoPages from src/shared.js to count pages for a chapter file.
const fs = require('fs');
const path = require('path');
const file = process.argv[2] || 'datta_stavam.json';
const data = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data', file), 'utf8'));
const HDR = new Set(['fh', 'sh', 'th', 'uh']);
const pages = [];
for (const shloka of data.shloka) {
  const headers = shloka.entry.filter(e => HDR.has(e.sty));
  const regular = shloka.entry.filter(e => !HDR.has(e.sty));
  for (const h of headers) pages.push({ num: shloka.shlokaNum, kind: 'HEADER(' + h.sty + ')', first: (h.iast || h.text || '').slice(0, 50) });
  if (regular.length) {
    const repeat = Math.max(1, parseInt(shloka.repeat, 10) || 1);
    for (let r = 0; r < repeat; r++) pages.push({ num: shloka.shlokaNum, kind: 'VERSE(' + regular.length + ' lines)' + (repeat > 1 ? ' pass' + (r + 1) : ''), first: (regular[0].iast || regular[0].text || '').slice(0, 50) });
  }
}
console.log(`=== ${file} ===`);
console.log(`shloka groups: ${data.shloka.length}`);
console.log(`TOTAL PAGES: ${pages.length}`);
pages.forEach((p, i) => console.log(`  page ${i + 1}: shlokaNum="${p.num}" ${p.kind}  | ${p.first}`));
