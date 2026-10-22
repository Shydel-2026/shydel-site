# shydel.com

Marketing site for Shydel — AI analysts for value investment firms: security analysis in levels, a scorecard led by the margin of safety, stress tests on top picks and a review of the whole book. The home page opens with the epigraph of *The Intelligent Investor*.

Plain static HTML/CSS, no build step. Open `index.html` in a browser, or serve the folder:

```
python -m http.server 8000
```

## Pages

The top menu is Home · Platform · Resources · About.

- `index.html` — home
- `platform.html` — tabs for Process (level 1 numbers, levels 2–3, the top-pick card, the stress test, the level 5 portfolio review), Analysis (the value framework, the playbooks, the 18 stages, a financial and an operating-business example, the scorecard), Memory and Data; `platform.html#analysis` opens that tab
- `assets.html` — redirects to `platform.html#analysis` (the old asset-class page; kept so existing links still land)
- `resources.html` — the five published analyses: a video card per YouTube upload (click-to-play embed, falls back to a YouTube link) and a slide-deck card per PDF
- `about.html`

All pages share `styles.css` and `site.js` (tabs, dropdowns, stage pop-ups, screenshot lightbox; everything degrades to plain content without JS).

## Content rules

- Write for value investors, not engineers: describe the value framework and the analysis, not the agent's tools, skills or internals. Do not quote live counts (rules, holdings) or build status; the board changes every day.
- Keep examples few: one financial (E-L Financial) and one operating business (Trigano) carry the Analysis tab. Figures in the prose come from the agent's recorded cards and appear in the screenshots.
- Stage labels are the agent's `ANALYSIS_STAGES`; scorecard weights are its `SCORE_MEASURES` (`backend/shydel_agent/key_metrics.py`), grouped by research level on the Platform page. Colours are the agent's palette (`--eq`, `--fn`, `--fi`, `--pe`, `--re`).

## Resources

`assets/slides/` holds each published deck as `<ticker>-analysis-<yyyy-mm>.pdf` plus a `<ticker>-cover.jpg` of its first page (1600 px wide; on a Mac: `qlmanage -t -s 1600 -o . deck.pdf` then `sips -s format jpeg`). To publish a new analysis:

1. Drop the PDF and its cover in `assets/slides/`.
2. In `resources.html`, copy a `<article class="video">` block and set `data-yt` to the YouTube video id, the links, the ticker tag, the verdict chip (`verdict-hold`, `verdict-trim`, `verdict-buy`) and a two-line summary.
3. Copy an `<a class="deck">` block for the PDF.

Newest first in both lists. Keep the summaries to what the video says; the not-financial-advice note at the end of the section covers every item.

## Screenshots

`assets/app/` holds screenshots of the Shydel Agent web UI (`../shydel-agent`, run with `.\dev.ps1`), captured with Playwright at 1600×1000 @2x, cropped to the relevant region and exported as WebP. Portfolio values and share counts are blurred in the app before capture. Retake them when the app's UI changes. The `vi-*` files are the October 2026 set: tight crops of one element or about one paragraph, captured at 2x and shown at half their pixel width (`style="width: …px"` on the `<img>`), so the text reads at the app's real size. Wait for a card's thesis to load before capturing, and take screenshots from the already-running app; never start, restart or stop its servers.

## Brand

The logo (mark, wordmark, lockups) lives in `assets/logo/` as SVG and PNG; `assets/favicon.svg`, `assets/apple-touch-icon.png` and `assets/og-image.png` (the social share image every page points to) come from the same files. YouTube exports and usage notes are in `brand/`.

## To do

- Point the shydel.com domain at the host (Vercel or GitHub Pages).
