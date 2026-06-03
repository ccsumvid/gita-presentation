# Changelog

## [0.8.5] - 2026-06-03

### Added
- Invocation Prayers (āvāhana ślōkāḥ) added as a new chapter between Datta Stavam and Dhyana Shlokas, containing the Guru Parampara shloka, Ganapati shloka, Guru Brahma shloka, and closing mantra (closes #15)

### Changed
- Left-aligned verse text within a centered panel; continuation lines (even rows in 8-line long-chandas display) staggered 20% from the left
- Chapter header/intro pages now automatically show the folded-hands image during the 3-second pause, signalling chanters to do namaskara

## [0.8.4] - 2026-06-03

### Fixed
- Asterisk mode: long-chandas padas now split into two evenly balanced lines at the exact syllable midpoint — 11 syllables gives 5+6, 12 gives 6+6, 19 gives 9+10. Previously long-chandas padas showed as one unbroken line of asterisks.
- English mode: line split now uses syllable-count word boundaries instead of character-count midpoint, giving more natural splits aligned to the meter.

## [0.8.3] - 2026-06-03

### Fixed
- English mode: long-chandas verses (Trishtubh, Jagatī) in all chapters now correctly split into 8 display lines. Previously used character count (threshold 40) which missed Chapter 11 Vishwarupa verses and others with 38-39 char entries. Now uses syllable count from the prosody engine (threshold 9) — Anushtubh padas always have 8 syllables (no split), Trishtubh have 11+ (splits).

## [0.8.2] - 2026-06-02

### Added
- BG 18.66 (sarvadharmān parityajya…) repeats 3 times in its natural position in Chapter 18
- BG 18.78 (yatra yōgēśvaraḥ kṛṣṇaḥ…), the final verse of Chapter 18, repeats 3 times before the closing colophon

## [0.8.1] - 2026-06-02

### Fixed
- Windows installer no longer shows "cannot be closed" error on reinstall/upgrade — added single-instance lock so the NSIS installer can always terminate a running instance cleanly

## [0.8.0] - 2026-06-02

### Added
- Sarvadharman shloka (BG 18.66 "sarvadharmān parityajya…") now appears at the end of all 18 chapters before the closing colophon
- Instruction overlay is now a compact top-right corner popup — verse display remains fully visible while instructions are shown

### Changed
- Asterisk mode now hides all text including chapter headers and intro lines — full asterisk-only display throughout
- English mode: long-chandas verses (entries >40 IAST chars) split into two display lines per pada, matching traditional book layout (8 lines for Vasantatilaka/Sragdhara, 4 lines for Anushtubh)
- Automatic folded-hands instruction after the 2nd shloka removed — all shlokas now play uninterrupted
- Updated "Increase Sruti" instruction image to a clearer visual guide
- Split lines use tighter spacing (0.25em) within a pada pair vs full spacing between separate padas

## [0.7.1] - 2026-05-21

### Fixed
- Pause button is now always visible as its own distinct control alongside Play — no longer toggling visibility; Play dims when playing, Pause dims when paused (#11)
- Chapter 1 intro now correctly begins with "Atha Srimad Bhagavad Gita" (not "Om Sri Paramatmane Namah") as the golden first-header, matching the traditional recitation sequence (#12)

## [0.7.0] - 2026-05-19

### Added
- Chapter intro sequence: every chapter (1–18) now displays "ōṃ śrī paramātmanē namaḥ", chapter number header, and chapter name as distinct header slides before the first shloka (#9)
- Chapter 1 specific intro: "atha śrīmadbhagavadgītā" header slide added before "atha prathamō'dhyāyaḥ" (#5)
- Countdown slide now shows "Start in" with the countdown number and "Listen to Śruti" at the bottom (#6)
- Folded hands GIF auto-displays on the projector after the first two shlokas of each chapter complete (#8)

### Changed
- Transport: back-arrow button replaced with "Restart Chapter" button — resets to page 0 of the current chapter (#7)
- Keyboard left-arrow now restarts the chapter (previously: navigate to previous page)
- `sh`-style entries (chapter sub-headers) now render as plain-text header pages rather than syllable-animated content

## [0.6.0] - 2026-05-03

### Fixed
- Pointer animation corrected
- x64 DMG detection fix in release script

### Added
- Release script builds both arm64 and x64 DMGs for every release
