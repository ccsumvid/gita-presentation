# Changelog

## [0.9.2] - 2026-06-06

### Fixed
- Dhyana Shlokas now defaults to 70 SPM (slower pace) when selected; other chapters keep their current SPM
- Header lines (chapter title, intro text) now animate without pauses between them — pointer sweeps continuously from one line to the next
- Pressing Play after a restart now always blanks the projector before the countdown, so the header only appears after countdown ends
- Removed the 2-second pause between "ōṃ tatsaditi…" colophon and "sarvadharmān…" — they now flow directly

## [0.9.1] - 2026-06-05

### Fixed
- Pointer now animates across all header lines (chapter title, intro text) in both asterisk and English mode — the pointer sweeps left→right across each header line exactly as it does for verse lines

## [0.9.0] - 2026-06-05

### Fixed
- **Countdown on first launch**: projector window now correctly shows blank screen on first open — previously the `projector-status` connection event was overwriting the blank before the countdown could run
- **Uvaca lines on same slide**: speaker labels ("sañjaya uvāca", "arjuna uvāca", "śrī bhagavānuvāca") now appear on the same slide as the verse they introduce in all affected chapters (2, 4, 5, 7, 8, 9, 12, 16, ch18 shloka 2)
- **Chapter 8 colophon on single slide**: "ōṃ tatsaditi śrīmad…" closing text was split across 8 separate slides — now grouped as one page (the entries had incorrect `sty=th/uh` tags instead of empty)
- **Pranam mudra for colophon and Sarvadharman**: Pranam cue now shows when transitioning through "Om Tatsaditi" colophon and Sarvadharman shloka, not just at chapter headers

## [0.8.9] - 2026-06-05

### Fixed
- Sarvadharman shloka (18.66) now comes AFTER the closing colophon ("ōṃ tatsaditi śrīmad…") in all 18 chapters, as per traditional recitation order
- Long-chandas verses (Trishtubh etc.) in chapters 1–18 now display as 4 lines matching book layout — 8-line split is restricted to Dhyana Shlokas and Invocation Prayers only
- Chapter header pages now show Pranam (namaskara) mudra image instead of folded hands

## [0.8.8] - 2026-06-05

### Added
- App icon: Gita Pacer logo (lotus/flame/speedometer, by SGS Gita Foundation)

### Fixed
- Chapter header ("ōṃ śrī paramātmanē namaḥ…") now correctly appears AFTER the countdown: projector blanks when chapter loads, page pre-renders during countdown, header appears the instant the overlay lifts
- Header page stays visible for 3 seconds with folded-hands cue before verse 1 begins (works for both initial play and mid-session chapter transitions)
- Last line of invocation prayers shlokas now respects BPM: root cause was Unicode dandas (॥ U+0965) not recognized by prosody engine — normalized to ASCII || so | = 2-beat pause, || = 4-beat pause
- Mid-pada split (continuation lines in long-chandas) flows without an extra beat pause, keeping pointer in rhythmic sync

## [0.8.7] - 2026-06-03

### Fixed
- Pointer animation is now smooth and predictable in asterisk mode:
  - **Ahead-prediction model**: pointer snaps to the current syllable center, then immediately glides toward the next syllable on the same line over the full syllable duration — so it arrives exactly when the next syllable activates.
  - **Clean line transitions**: at the end of each line the pointer glides to the right edge of the last syllable, then snaps cleanly to the start of the next line with no horizontal carry-over.
  - **No cross-line jumps**: previously the pointer carried over from the right side of line N to the left side of line N+1, creating a jarring right-to-left motion. Now every new line starts from a snap at the first syllable's center.
  - **English mode unchanged**: left-edge snap → right-edge sweep per line (already correct).

## [0.8.6] - 2026-06-03

### Fixed
- Reduced verse line spacing so all 8 lines of a long-chandas shloka fit on screen — margin reduced from 1.2em (1.5em at 1600px+) to 0.6em across all breakpoints. Verified: 8 lines occupy 693px within a 731px display area on a standard 1280px viewport.

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
