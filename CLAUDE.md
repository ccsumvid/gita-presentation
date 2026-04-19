# Gita Parayana Pace Helper

## Project Overview

A web-based presentation tool for Bhagavad Gita parayana (recitation). It displays Sanskrit verses with syllable-level animation pacing, helping groups chant at a consistent tempo. The app is a single-page HTML file (`index.html`) with no build step.

## Hosting

- **Firebase Hosting**, project ID: `gita-pacer`
- Serves from repo root (not a subfolder)
- Deploy with `firebase deploy`
- `docs/` folder is ignored by hosting

## Architecture

Single file: `index.html` containing all CSS, HTML, and JavaScript.

### Key Modules (all in `index.html`)

1. **EMBEDDED_DHYANA** — Chapter 0 (Gita Dhyana Shlokas) data, embedded inline so it loads instantly with no network request.
2. **prosody** — Sanskrit prosody engine. Splits Devanagari text into syllables, classifies guru (heavy, 2 beats) vs laghu (light, 1 beat) for pacing.
3. **dataLayer** — Loads chapter data. Chapter 0 is embedded; chapters 1-18 are lazy-loaded from `data/chapter_XX.json`. Caches loaded chapters and prefetches the next chapter.
4. **renderer** — Renders verse pages. Three display modes: Asterisk (hides text, shows `*` per syllable), IAST (transliterated Roman), Devanagari (original script).
5. **animator** — Syllable-by-syllable animation engine. Highlights current syllable in gold, dims completed ones. Auto-advances pages and chapters.
6. **ui** — UI controller. Binds controls, handles chapter selection, page navigation, keyboard shortcuts.

### Data Files

- `data/chapter_01.json` through `data/chapter_18.json` — Per-chapter verse data (15-54 KB each)
- Sourced from `https://sgsgitafoundation.org/assets/tutor_assets/bg/XX/tutor_chapter.json`
- The raw tutor data has teacher/student repetitions (teacher=YW, student=NW). Our files are **deduplicated** — only unique verse lines are kept.
- Each chapter JSON has: `name` (Sanskrit), `chapterNum`, `shloka[]` array
- Each shloka has: `shlokaNum`, `entry[]` with `startTime`, `endTime`, `swhtsp` (line position marker), `shlNbr`, `sty` (style: fh=first header, th=title header, uh=closing header), `text` (Devanagari)

## Controls

- **SPM (Syllables Per Minute)**: Controls animation tempo. +/- buttons or keyboard `+`/`-`. Range: 40-600.
- **Play/Pause**: Space bar or buttons
- **Reset**: `R` key or button
- **Prev/Next page**: Arrow keys or buttons. At chapter boundaries, navigates to adjacent chapters.
- **Chapter selector**: Dropdown to jump to any chapter (0-18)
- **Display modes**: Asterisk (default), IAST, Devanagari

## Keyboard Shortcuts

| Key | Action |
|-----|--------|
| Space | Play/Pause |
| Arrow Right | Next page |
| Arrow Left | Previous page |
| R | Reset animation |
| +/= | Increase SPM by 10 |
| -/_ | Decrease SPM by 10 |

## Design Reference

- `Gita-Parayana-HTML5-Viewer-Design.docx` — Original design spec
- `Updated Parayana Instructions Final-resized on 7.17.25 - black background.pptx` — Reference PowerPoint with all chapter slides (black background, gold/white text)

## Conventions

- Black background, white/gold text throughout
- No build tools, no dependencies, no npm — pure vanilla HTML/CSS/JS
- Keep the site lightweight: lazy-load chapters, don't bundle all data
