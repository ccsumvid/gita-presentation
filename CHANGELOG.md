# Changelog

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
