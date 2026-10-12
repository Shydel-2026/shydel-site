# shydel.com

Marketing site for Shydel — AI systems for portfolio management across public equities, financials, fixed income, private equity and real estate.

Plain static HTML/CSS, no build step. Open `index.html` in a browser, or serve the folder:

```
python -m http.server 8000
```

## Pages

The top menu is Home · Platform · Resources · About. Platform has two pages, Overview and Assets, each with its own tabs.

- `index.html` — home
- `platform.html` — the overview, with tabs for Board, Analysis (18 stages, comparison table, scorecard), Memory and Data; `platform.html#memory` opens that tab
- `assets.html` — a tab per asset class (public equities, financials, fixed income, private equity, real estate); `assets.html#real-estate` opens that tab
- `resources.html` — the five published analyses: a video card per YouTube upload (click-to-play embed, falls back to a YouTube link) and a slide-deck card per PDF
- `about.html`

All pages share `styles.css` and `site.js` (tabs, dropdowns, stage pop-ups, screenshot lightbox; everything degrades to plain content without JS).

## Content rules

- Describe the product in general terms. Do not quote live counts (skills, rules, tools, holdings) or current build status in the prose; the library and the board change every day.
- The app-styled cards (goal, stage track, scorecard) and the screenshots are the only places real figures appear. Open Text, VICI and E-L Financial use the agent's recorded cards; the fixed income and private equity cards are labelled illustrative.
- Each asset page shows views specific to that class; avoid repeating the same kind of screenshot across asset pages.
- Stage labels are the agent's `ANALYSIS_STAGES`; scorecard weights are its `SCORE_MEASURES`. Colours are the agent's asset-class palette (`--eq`, `--fn`, `--fi`, `--pe`, `--re`).

## Resources

`assets/slides/` holds each published deck as `<ticker>-analysis-<yyyy-mm>.pdf` plus a `<ticker>-cover.jpg` of its first page (1600 px wide; on a Mac: `qlmanage -t -s 1600 -o . deck.pdf` then `sips -s format jpeg`). To publish a new analysis:

1. Drop the PDF and its cover in `assets/slides/`.
2. In `resources.html`, copy a `<article class="video">` block and set `data-yt` to the YouTube video id, the links, the ticker tag, the verdict chip (`verdict-hold`, `verdict-trim`, `verdict-buy`) and a two-line summary.
3. Copy an `<a class="deck">` block for the PDF.

Newest first in both lists. Keep the summaries to what the video says; the not-financial-advice note at the end of the section covers every item.

## Screenshots

`assets/app/` holds screenshots of the Shydel Agent web UI (`../shydel-agent`, run with `.\dev.ps1`), captured with Playwright at 1600×1000 @2x, cropped to the relevant region and exported as WebP. Portfolio values and share counts are blurred in the app before capture. Retake them when the app's UI changes.

## Brand

The logo (mark, wordmark, lockups) lives in `assets/logo/` as SVG and PNG; `assets/favicon.svg`, `assets/apple-touch-icon.png` and `assets/og-image.png` (the social share image every page points to) come from the same files. YouTube exports and usage notes are in `brand/`.

## To do

- Point the shydel.com domain at the host (Vercel or GitHub Pages).
