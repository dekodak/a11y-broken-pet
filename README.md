# a11y-broken-pet

Intentionally inaccessible Next.js app for testing an accessibility checker. Not for production.

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
