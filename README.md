# shydel.com

Marketing site for Shydel — AI systems for portfolio management across public equities, financials, fixed income, private equity and real estate.

Plain static HTML/CSS, no build step. Open `index.html` in a browser, or serve the folder:

```
python -m http.server 8000
```

## Pages

The top menu is Home · Platform ▾ · Assets ▾ · About. Platform and Assets are dropdowns; each of their pages also has a row of section links under the menu.

- `index.html` — home
- Platform: `platform.html` (overview), `platform-board.html`, `platform-analysis.html` (18 stages, comparison table, scorecard), `platform-memory.html`, `platform-data.html`
- Assets: `public-equities.html`, `financials.html`, `fixed-income.html`, `private-equity.html`, `real-estate.html`
- `about.html`

All pages share `styles.css` and `site.js` (tabs, dropdowns, stage pop-ups, screenshot lightbox; everything degrades to plain content without JS).

## Content rules

- Describe the product in general terms. Do not quote live counts (skills, rules, tools, holdings) or current build status in the prose; the library and the board change every day.
- The app-styled cards (goal, stage track, scorecard) and the screenshots are the only places real figures appear. Open Text, VICI and E-L Financial use the agent's recorded cards; the fixed income and private equity cards are labelled illustrative.
- Each asset page shows views specific to that class; avoid repeating the same kind of screenshot across asset pages.
- Stage labels are the agent's `ANALYSIS_STAGES`; scorecard weights are its `SCORE_MEASURES`. Colours are the agent's asset-class palette (`--eq`, `--fn`, `--fi`, `--pe`, `--re`).

## Screenshots

`assets/app/` holds screenshots of the Shydel Agent web UI (`../shydel-agent`, run with `.\dev.ps1`), captured with Playwright at 1600×1000 @2x, cropped to the relevant region and exported as WebP. Portfolio values and share counts are blurred in the app before capture. Retake them when the app's UI changes.

## To do

- Point the shydel.com domain at the host (Vercel or GitHub Pages).
