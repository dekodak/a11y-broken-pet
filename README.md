# a11y-broken-pet

Intentionally inaccessible Next.js app for testing an accessibility checker. Every defect is planted on purpose: do not copy this code as an example.

Live demo: https://dekodak.github.io/a11y-broken-pet/ (GitHub Pages, static export, redeployed on every push to `main`).

```bash
npm run pet:up       # install + build if needed, start on http://localhost:4010 in the background
npm run pet:config   # run config for the checker (page URLs), JSON on stdout
npm run pet:verify   # confirm expected/ISSUES.md matches the served HTML
npm run pet:down     # stop
```

- `a11y-pet.config.json`: how to launch the app and which pages to scan.
- `expected/ISSUES.md`: ground truth. One row per planted defect (`[data-pet-issue~="ID"]`), plus `OK-` rows for correct controls that must not be flagged.
- `expected/SPEC.md`: the authoring spec the pages were built from.
- `.claude/launch.json`: dev-server entry for the Claude preview pane.

## Site map (Fernwick Outfitters)

home `/`, shop `/shop`, orders `/orders`, product `/product`, account `/account`, checkout `/checkout`, help `/help`.
Scan at desktop 1440x900 and mobile 390x844 (landscape 844x390 for MOB-009). `expected/DESIGN.md` is the design spec, `expected/DEMO.md` the demo talk track.
After pulling changes run `npm run pet:rebuild`. `PET_BASE_URL=http://localhost:4011 npm run pet:verify` checks another port.

Pages build: `PAGES_EXPORT=1 NEXT_PUBLIC_BASE_PATH=/a11y-broken-pet npm run build` (output in `out/`). Plain `<a>`/`<img>` URLs go through `app/_lib/withBase.ts` because `basePath` does not rewrite them. Check the deployed site with `PET_BASE_URL=https://dekodak.github.io/a11y-broken-pet npm run pet:verify`.
