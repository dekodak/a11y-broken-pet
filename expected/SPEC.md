# Implementation spec (for the page authors)

Goal: a Next.js 15 App Router fixture with deliberately broken accessibility, used to test an a11y checker.
Project root: `/Users/dekodak/apps/a11y-broken-pet`. Shared files already exist and must NOT be edited:
`package.json`, `tsconfig.json`, `next.config.mjs`, `app/layout.tsx`, `app/globals.css`.
Do not run `npm install` / `npm run build` / dev servers. The Leader does that.

## Conventions (all pages)

- Each page is a single `app/<name>/page.tsx` (home: `app/page.tsx`), starts with `'use client';`, default-exports a component. React + TypeScript, no extra dependencies, no external images/CDNs.
- Wrapper: `<div className="page">` with a real `<h1>`, then `<section className="card">` blocks, each with its own `<h2>` (unless the spec says the heading is itself a defect). Exception: the `forms` page wraps in `<main className="page">`.
- Put attribute `data-pet-issue="ID"` on the element that carries the defect (space-separated for several IDs, e.g. `data-pet-issue="TBL-001 TBL-002"`). For defects of *absence* (nothing to tag), tag the closest container. Controls (correct implementations) use `data-pet-issue="OK-..."` on their root.
- Interactive-only defects (visible only after clicking/typing/keyboard) still get the attribute on the element that exists once the state is reached, and are marked `interaction: yes` in the fragment.
- Visible text may be neutral and plain English. Do NOT write hints like "this is broken" or "bad" in labels, `aria-*`, ids or class names (a checker must not be helped). Comments in the source MAY name the issue ID.
- Invalid ARIA that TypeScript rejects: build the attributes as `const bad = { 'aria-expanded': 'yes' } as unknown as React.HTMLAttributes<HTMLElement>;` and spread `{...bad}`. Hyphenated attribute names are not type-checked, so `aria-labeledby` typos need no cast.
- Page-specific CSS: put it in `app/<name>/<name>.css` (home: `app/home.css`) and import it. Reuse base classes from `app/globals.css`: `page card btn icon-btn tiny ok muted-low inline-link err invalid modal-backdrop modal x popover scroll-box tablist tab active clip`, plus table styles. The `.ok` class restores a visible focus ring and is used ONLY on controls.
- Use stable ids. Keep each page under ~400 lines. Hydration-safe (no `Date.now()`/`Math.random()` in render).
- Implement every ID listed for your page(s), plus the OK control(s). Being creative beyond the list is allowed: add up to 3 extra issues per page with the next free ID number and document them in the fragment.

## Fragment output

Write `expected/fragments/<page-id>.md` containing ONLY table rows (no header), one per issue/control, 7 columns:

`| ID | page-id | selector | what is wrong (specific) | WCAG SC | expected checker signal (axe-like rule id or plain description) | interaction yes/no |`

`selector` is `[data-pet-issue~="ID"]`. Controls rows say "CORRECT: ..." in column 4 and "must NOT be flagged" in column 6. One row per ID (an ID covering several instances says how many). Page ids: `home dialogs tables tabs graphics forms misc`.

## Page specs

### home (`app/page.tsx`) — prefix HOME
- HOME-001 heading order jumps: h1 then an h4 (then later an h2).
- HOME-002 an empty heading element (`<h3></h3>`).
- HOME-003 hero `<img src="/hero.svg">` without `alt` (create `public/hero.svg`, any simple 600x200 svg).
- HOME-004 informative image with filename alt (`IMG_4032.jpg`).
- HOME-005 decorative divider image with descriptive alt (should be `alt=""`).
- HOME-006 three icon-only `<button>`s (search, menu, close) containing only an inline svg, no text, no label (tag all three).
- HOME-007 button with `aria-label=""` (empty) next to an svg.
- HOME-008 link containing only an empty `<i>` glyph, no text.
- HOME-009 `<div role="button" onClick>` Like counter: no tabindex, no key handler.
- HOME-010 `<a onClick>` without `href` (Reset).
- HOME-011 two links both reading "click here" with different destinations.
- HOME-012 a link with `tabIndex={3}` (positive tabindex).
- HOME-013 paragraph using `.muted-low` for real content (insufficient contrast).
- HOME-014 inline links in a paragraph using `.inline-link` (color is only cue, contrast to text < 3:1, no underline).
- HOME-015 `target="_blank"` link, no warning of new tab.
- HOME-016 French sentence in an English page without `lang="fr"`.
- OK-HOME-1 properly labelled icon-only button (`aria-label`, svg `aria-hidden`, class `ok`).
- OK-HOME-2 an image with a good descriptive alt.

### dialogs (`app/dialogs/page.tsx`) — prefix DLG
Four popups, plus one correct one. Keep a normal focusable `<input>` and links on the page behind so a missing trap is observable.
- A "Settings" modal (custom `div`s):
  - DLG-001 trigger `<button>` has no `aria-haspopup`, `aria-expanded`, `aria-controls`.
  - DLG-002 popup has no `role="dialog"`/`alertdialog` and no accessible name.
  - DLG-003 no focus trap, focus not moved into the popup on open, Esc does not close, focus not restored on close, page behind not inert.
  - DLG-004 close control is `<span className="x" onClick>×</span>`: not focusable, no name.
- B "Share" modal:
  - DLG-005 `role="dialog" aria-modal="true" aria-labelledby="share-title-x"` but no element with that id exists; no focus management.
  - DLG-006 trigger has `aria-haspopup="dialog"` but `aria-expanded` hard-coded `"false"` even while open.
- C "Actions" menu button:
  - DLG-007 `aria-haspopup="menu" aria-controls="actions-menu-x"` (id missing); popup items are plain `div`s (no `role="menu"`/`menuitem`), no arrow-key support, Esc does not close.
- D tooltip:
  - DLG-008 popover content shown via `onMouseEnter`/`onMouseLeave` only: not on focus, not dismissible/hoverable, no `role="tooltip"`, trigger has no `aria-describedby`.
- OK-DLG-1 native `<dialog>` + `showModal()`, `aria-labelledby`/`aria-describedby` valid, trigger `aria-haspopup="dialog"`, focus returned to trigger on close, class `ok` on buttons.

### tables (`app/tables/page.tsx`) — prefix TBL
- TBL-001 data table with no `<caption>`/`aria-label`/`aria-labelledby`.
- TBL-002 same table: header row uses `<td><b>…</b></td>` instead of `<th>`.
- TBL-003 plain static table with `role="grid"`, rows `<tr role="listitem">` (invalid for grid), header `<th role="gridcell">`.
- TBL-004 same table: `aria-rowcount={50} aria-colcount={7}` but 4 rows x 3 columns; no accessible name.
- TBL-005 sortable header: `<th><div onClick>Name ▲</div></th>` — no button, no keyboard; sort state only in the glyph.
- TBL-006 two `<th aria-sort="ascending">` at the same time.
- TBL-007 `aria-sort` placed on a `<td>`.
- TBL-008 layout table `role="presentation"` that still contains `<th>` and a `<caption>`.
- TBL-009 `<div role="table">` with `<div role="row">` children whose cells have no roles (no `cell`/`columnheader`).
- TBL-010 table with per-row `<input type="checkbox">` and a select-all checkbox, none labelled.
- TBL-011 an empty `<th></th>` over an actions column.
- TBL-012 complex table with `colSpan`/`rowSpan` headers, no `scope`/`headers`/`id` association.
- TBL-013 wide table in a `.scroll-box` (overflow auto) with no `tabIndex={0}`, no name (scrollable region not keyboard reachable).
- OK-TBL-1 correct table: caption, `scope="col"`/`scope="row"`, no ARIA overrides.

### tabs (`app/tabs/page.tsx`) — prefix TAB
Build one `Tabs` component with flags (roving tabindex, arrow handling none|lr|full where full = Left/Right + Home/End, aria-selected on/off, aria-controls ok/missing target, panels `aria-labelledby` on/off, orientation, tablist label). Panels use the `hidden` attribute. Tabs are `<button role="tab">` inside `<div role="tablist">`, tab bar classes `tablist` / `tab` / `active`.
- Variant A "Overview": no tablist label; TAB-001 no arrow keys; TAB-002 no `aria-selected` (state only via class); TAB-003 no roving tabindex (every tab is a tab stop); TAB-004 panels without `aria-labelledby`; TAB-009 tablist has no accessible name.
- Variant B "Activity": arrows Left/Right work (and move selection), `aria-selected` correct; TAB-005 `aria-controls` points to ids that do not exist; TAB-006 Home/End unsupported; TAB-003 again (no roving tabindex) — tag with TAB-003 too.
- Variant D "Mail": `<div role="tab">` elements that are NOT inside any `role="tablist"`, no `tabIndex` (not focusable) — TAB-007; one of them contains a nested `<button aria-label="Close inbox">×</button>` — TAB-010.
- Variant E "Settings": `aria-orientation="vertical"` with vertical layout but only Left/Right keys implemented, Up/Down ignored — TAB-008.
- OK-TAB-1 correct tabs: roving tabindex, Left/Right/Home/End, `aria-selected`, valid `aria-controls`, panel `aria-labelledby` and `tabIndex={0}`, named tablist, class `ok`.

### graphics (`app/graphics/page.tsx`) — prefix SVG
Inline SVG unless noted. Keep each block in its own card with a visible caption.
- SVG-001 bar chart `<svg>` with `<title>` + `<desc>` but no `role="img"`.
- SVG-002 `<svg aria-label="Warning">` with no `role`.
- SVG-003 `<svg role="img">` with no accessible name at all.
- SVG-004 decorative flourish svg, not `aria-hidden`, contains `<title>Decoration</title>`.
- SVG-005 `<svg role="img" aria-label="Sales">` containing a focusable `<a href="#">` inside.
- SVG-006 `<a href="/forms">` whose only content is an svg, no name.
- SVG-007 meaningful data in `<text>` elements inside an svg with `aria-hidden="true"`.
- SVG-008 `<img>` of a data-URI svg chart with `alt="chart"`.
- SVG-009 `<canvas>` drawing a figure (draw in `useEffect`), no fallback content, no role/name.
- SVG-010 `<svg role="img" aria-labelledby="chart-title-x">` pointing to a missing id.
- SVG-011 bar chart where the legend/series are distinguished only by red vs green fill, no text/pattern.
- SVG-012 `<svg role="presentation" aria-label="Network status">` also containing a `<title>`: conflicting semantics.
- SVG-013 `<span>🔔</span>` emoji as the only content of a `<button>`, no label.
- OK-SVG-1 `<svg role="img" aria-labelledby="ok-t ok-d">` with matching `<title id>`/`<desc id>`.
- OK-SVG-2 decorative svg with `aria-hidden="true" focusable="false"`.

### forms (`app/forms/page.tsx`, wrapped in `<main className="page">`) — prefix FRM
- FRM-001 inputs identified by `placeholder` only (name, city).
- FRM-002 `<label htmlFor="mail-x">` whose target id does not exist (the input has a different id).
- FRM-003 error text rendered as plain sibling `<span className="err">` after submit: no `aria-describedby`, no `aria-invalid`, no live region, field marked only by red border (`invalid`). Submit button (real `<button>`) triggers it.
- FRM-004 input with `aria-invalid="true"` that is valid + `aria-describedby="hint-x"` with missing id.
- FRM-005 radio group (3 radios, each labelled) with no `fieldset`/`legend`/group role/name.
- FRM-006 required fields shown only by a red `*`, no `required`/`aria-required`.
- FRM-007 `<select>` with no label.
- FRM-008 custom checkbox: `<div role="checkbox">` with no `aria-checked`, no `tabIndex`, no key handling.
- FRM-009 two inputs sharing the same `id`.
- FRM-010 name/email/tel inputs without `autoComplete` (SC 1.3.5).
- FRM-011 submit "button" is `<div className="btn" onClick>`.
- FRM-012 visible label "Email address" but `aria-label="field1"` (label in name mismatch).
- OK-FRM-1 a fully correct `fieldset`/`legend` group with labelled inputs, `required`, `autoComplete`, and an error message linked via `aria-describedby` + `aria-invalid` + `role="alert"` region (class `ok`).

### misc (`app/misc/page.tsx`) — prefix MISC
Use two `<main>` elements on this page (inside the page div).
- MISC-001 auto-rotating carousel (`setInterval` 3 s, text slides) with no pause/stop control, no `aria-live` consideration, no slide labelling.
- MISC-002 "Save" button shows "Saved!" text in a plain `div` (no `role="status"`/`aria-live`).
- MISC-003 accordion with `<div onClick>` headers: not buttons, no `aria-expanded`/`aria-controls`, not focusable.
- MISC-004 wrapper with `aria-hidden="true"` containing a focusable `<button>`.
- MISC-005 `<video controls autoPlay muted loop>` with no `<track kind="captions">` (no media file needed).
- MISC-006 `<iframe src="about:blank">` with no `title`.
- MISC-007 `aria-live="assertive"` counter that increments every 5 s.
- MISC-008 `.clip` box with fixed height + `overflow: hidden` clipping a long sentence.
- MISC-009 row of five `.tiny` 16 px buttons, 2 px apart, labelled with digits.
- MISC-010 duplicate `<main>` landmarks (two on the page) and a `<section aria-label="">`.
- MISC-011 invalid ARIA: `role="buton"`, `aria-labeledby="x"` typo on a `div role="button"`, `aria-expanded="yes"`, `aria-checked` on a plain `div` without a role.
- MISC-012 positive `tabIndex` values (1, 2, 3) on three buttons in reverse DOM order (focus order differs from visual order).
- OK-MISC-1 correct accordion (button, `aria-expanded`, `aria-controls`, region with `aria-labelledby`, class `ok`).
