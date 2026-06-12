#!/usr/bin/env node
// Scan all data/*.json for U+200C / U+200D and report exact locations.
const fs = require('fs');
const path = require('path');
const DATA = path.join(__dirname, '..', 'data');
const files = fs.readdirSync(DATA).filter(f => f.endsWith('.json'));
for (const f of files) {
  const raw = fs.readFileSync(path.join(DATA, f), 'utf8');
  const lines = raw.split('\n');
  lines.forEach((line, i) => {
    if (/[‌‍]/.test(line)) {
      const codes = [...line].map(c => {
        const cp = c.codePointAt(0);
        return (cp === 0x200c || cp === 0x200d) ? `[U+${cp.toString(16)}]` : c;
      }).join('');
      console.log(`${f}:${i + 1}: ${codes.trim()}`);
    }
  });
}
