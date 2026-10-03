# shydel.com

Marketing site for Shydel — AI systems for portfolio management across private equity, real estate, public equities and fixed income.

Plain static HTML/CSS, no build step. Open `index.html` in a browser, or serve the folder:

```
python -m http.server 8000
```

Pages: `index.html` (home), `about.html`, and one page per domain — `private-equity.html`, `real-estate.html`, `public-equities.html`, `fixed-income.html`. All share `styles.css`. The header, contact block and footer are copied into every page, so change them in all six.

## To do

- Point the shydel.com domain at the host (Vercel or GitHub Pages).
