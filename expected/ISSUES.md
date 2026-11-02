# Expected accessibility findings (ground truth for the checker)

Fixture: **Fernwick Outfitters**, a fictional outdoor-gear shop, `http://localhost:4010` (see `../a11y-pet.config.json`).
Scan every page at desktop (1440x900) and mobile (390x844); `MOB-009` also needs landscape (844x390).
Every defect is marked in the DOM with `data-pet-issue="ID"`: select it with `[data-pet-issue~="ID"]`.
Rows with an `OK-` ID are **correct** implementations: the checker must NOT flag them.

Columns: ID | page | selector | what is wrong | WCAG SC | expected checker signal | needs interaction (`yes` = only visible after click/typing/keyboard/timer, or CSS-only) | viewport (where it is observable: desktop, mobile or both).
Page `global` = defect lives in the shared shell (header, footer, tab bar, layout) and appears on every page.
Routes: home `/`, dialogs `/shop`, tables `/orders`, tabs `/product`, graphics `/account`, forms `/checkout`, misc `/help`.

Run `npm run pet:up`, then `npm run pet:verify` to confirm this list is in sync with the served HTML.

| ID | page | selector | what is wrong | WCAG SC | expected checker signal | interaction | viewport |
|---|---|---|---|---|---|---|---|
| GLB-001 | global | html[data-pet-issue~="GLB-001"] | `<html>` has no `lang` attribute | 3.1.1 | html-has-lang | no | both |
| GLB-002 | global | head > title | All 7 pages share the same title "Fernwick Outfitters" | 2.4.2 | manual: page titles not unique/descriptive | no | both |
| GLB-003 | global | [data-pet-issue~="GLB-003"] | Site name "Fernwick" is a `div`: not a heading and not a link home | 1.3.1, 2.4.4 | manual: landmark and heading structure | no | both |
| GLB-004 | global | [data-pet-issue~="GLB-004"] | Header navs (desktop row and off-canvas) have no accessible name; current page never marked `aria-current` | 1.3.1, 2.4.8 | landmark-unique | no | both |
| GLB-005 | global | body[data-pet-issue~="GLB-005"] | No skip link; the shell has no `<main>` (only /checkout has one, /help has two) | 2.4.1 | bypass, landmark-one-main, region | no | both |
| GLB-006 | global | meta[name="viewport"] | `user-scalable=no` and `maximum-scale=1` block zoom | 1.4.4 | meta-viewport | no | both |
| GLB-007 | global | *:focus (CSS) | Default focus outline removed globally; only controls with class `ok` restore a ring | 2.4.7 | manual: focus-visible check | yes | both |
| GLB-008 | global | [data-pet-issue~="GLB-008"] | Desktop nav row and off-canvas nav are both in the DOM at every size; the inactive one is hidden with opacity:0, height:0, overflow:hidden so its links stay tabbable and landmarks duplicate | 1.3.1, 2.4.3 | landmark-unique, hidden-but-focusable | no | both |
| GLB-009 | global | [data-pet-issue~="GLB-009"] | Cart link shows icon plus badge "2"; its accessible name is just "2" and count changes are not announced | 2.4.4, 4.1.3 | link-name quality (name "2") | no | both |
| GLB-010 | global | [data-pet-issue~="GLB-010"] | Footer column headings are `div.h` (2 containers: columns and social row); 3 social links contain only svgs | 1.3.1, 2.4.4 | link-name; heading structure | no | both |
| MOB-001 | global | [data-pet-issue~="MOB-001"] | Hamburger `<button>` has only an icon: no name, no `aria-expanded`/`aria-controls` | 4.1.2 | button-name | no | mobile |
| MOB-002 | global | [data-pet-issue~="MOB-002"] | Closed off-canvas menu is hidden only by `translateX(-100%)`: its 7 links remain tab stops while off screen | 2.4.3, 2.4.7 | focusable offscreen content | yes | mobile |
| MOB-003 | global | [data-pet-issue~="MOB-003"] | Open off-canvas menu has no `role=dialog`, no focus move, no trap, Esc ignored, page behind not inert; backdrop click only | 2.1.2, 4.1.2 | modal focus management missing | yes | mobile |
| MOB-009 | global | [data-pet-issue~="MOB-009"] | In landscape with height <=500px a full-screen "Rotate your device to continue" overlay hides all content | 1.3.4 | manual: orientation restriction (emulate 844x390) | yes | mobile |
| MOB-014 | global | [data-pet-issue~="MOB-014"] | Bottom tab bar `<nav>` has no name and its 4 links contain only svgs | 2.4.4, 4.1.2 | link-name, landmark-unique | no | mobile |
| DSK-001 | global | [data-pet-issue~="DSK-001"] | "Shop" mega menu opens on CSS `:hover` only (panel is `display:none` otherwise); trigger has no `aria-haspopup`/`aria-expanded`; 12 panel links unreachable by keyboard | 1.4.13, 2.1.1 | manual: hover-only content | yes | desktop |
| OK-GLB-1 | global | [data-pet-issue~="OK-GLB-1"] | CORRECT: footer `<nav aria-label="Footer">` with real text links | 1.3.1, 2.4.4 | must NOT be flagged | no | both |
| OK-GLB-2 | global | [data-pet-issue~="OK-GLB-2"] | CORRECT: breadcrumbs `<nav aria-label="Breadcrumb"><ol>` with `aria-current="page"` on the last item (all pages except home) | 1.3.1, 2.4.8 | must NOT be flagged | no | both |
| HOME-001 | home | [data-pet-issue~="HOME-001"] | Heading order jumps from h1 to h4 "Trail Week picks" (later h2s follow) | 1.3.1 | heading-order | no | both |
| HOME-002 | home | [data-pet-issue~="HOME-002"] | Empty h3 in the "Why Fernwick" benefit card | 1.3.1, 2.4.6 | empty-heading | no | both |
| HOME-003 | home | [data-pet-issue~="HOME-003"] | Hero `<img src="/hero.svg">` has no alt attribute | 1.1.1 | image-alt | no | both |
| HOME-004 | home | [data-pet-issue~="HOME-004"] | Customer photo alt is the filename "IMG_4032.jpg" | 1.1.1 | manual: alt quality (image-redundant-alt style) | no | both |
| HOME-005 | home | [data-pet-issue~="HOME-005"] | Decorative ridge divider has descriptive alt "Mountain ridge divider" (should be empty alt) | 1.1.1 | manual: decorative image announced | no | both |
| HOME-006 | home | [data-pet-issue~="HOME-006"] | Three icon-only buttons with no name: hero search, store menu, close promo strip (3 instances) | 4.1.2 | button-name | no | both |
| HOME-007 | home | [data-pet-issue~="HOME-007"] | Heart button beside the featured heading has `aria-label=""` and only an svg | 4.1.2 | button-name | no | both |
| HOME-008 | home | [data-pet-issue~="HOME-008"] | Community follow links contain only an empty `<i>` glyph (3 instances) | 2.4.4 | link-name | no | both |
| HOME-009 | home | [data-pet-issue~="HOME-009"] | Like counter is `div role=button` with onClick, no tabindex or key handler | 2.1.1, 4.1.2 | manual: not keyboard operable (click handler on non-focusable) | yes | both |
| HOME-010 | home | [data-pet-issue~="HOME-010"] | Gear finder "Reset" is an `<a onClick>` without href | 2.1.1, 4.1.2 | manual: not focusable or keyboard operable | yes | both |
| HOME-011 | home | [data-pet-issue~="HOME-011"] | Two links both read "click here" with different destinations (/shop, /product) (2 instances) | 2.4.4 | identical-links-same-purpose, link-name quality | no | both |
| HOME-012 | home | [data-pet-issue~="HOME-012"] | "Find a store" link has `tabIndex=3` | 2.4.3 | tabindex | no | both |
| HOME-013 | home | [data-pet-issue~="HOME-013"] | Shipping fine print uses `.muted-low` (about 1.9:1) | 1.4.3 | color-contrast | no | both |
| HOME-014 | home | [data-pet-issue~="HOME-014"] | Journal teaser inline links use `.inline-link`: no underline, colour is the only cue, under 3:1 vs body text (2 links) | 1.4.1 | link-in-text-block | no | both |
| HOME-015 | home | [data-pet-issue~="HOME-015"] | "Read the Journal" uses `target=_blank` with no new-tab warning | 3.2.5 | manual: unannounced new window | no | both |
| HOME-016 | home | [data-pet-issue~="HOME-016"] | French testimonial in an English page without `lang="fr"` | 3.1.2 | manual: language of parts | no | both |
| HOME-017 | home | [data-pet-issue~="HOME-017"] | Category tiles: image link with empty name adjacent to a title link with the same href (4 pairs) | 2.4.4 | link-name, redundant adjacent links | no | both |
| HOME-018 | home | [data-pet-issue~="HOME-018"] | Promo strip text #5b6b8a on #0f1d2e (about 2.9:1) | 1.4.3 | color-contrast | no | both |
| HOME-019 | home | [data-pet-issue~="HOME-019"] | Free-shipping ticker scrolls forever via CSS animation, no pause control, no prefers-reduced-motion handling | 2.2.2 | manual: moving content without pause | no | both |
| DSK-004 | home | [data-pet-issue~="DSK-004"] | Desktop hero banner is an `<img>` (data-URI SVG) with "Trail Week: 30% off" baked in and `alt="Banner"`; mobile shows real text | 1.4.5, 1.1.1 | image of text, alt quality | no | desktop |
| DSK-005 | home | [data-pet-issue~="DSK-005"] | Desktop hero overlay copy #8a8f8c on the pale sky background (about 2.8:1); mobile copy is dark | 1.4.3 | color-contrast | no | desktop |
| OK-HOME-1 | home | [data-pet-issue~="OK-HOME-1"] | CORRECT: icon-only "Open wishlist" button with aria-label, aria-hidden svg, class ok | 4.1.2 | must NOT be flagged | no | both |
| OK-HOME-2 | home | [data-pet-issue~="OK-HOME-2"] | CORRECT: journal photo with descriptive alt | 1.1.1 | must NOT be flagged | no | both |
| OK-HOME-3 | home | [data-pet-issue~="OK-HOME-3"] | CORRECT: featured ProductCard grid (articles, one named link each, labelled Add buttons, AA contrast) | 1.3.1, 2.4.4 | must NOT be flagged | no | both |
| DLG-001 | dialogs | [data-pet-issue~="DLG-001"] | "View cart (n)" trigger button has no aria-haspopup, aria-expanded or aria-controls | 4.1.2 | manual: disclosure/dialog trigger state missing | no | both |
| DLG-002 | dialogs | [data-pet-issue~="DLG-002"] | Cart drawer is a plain div: no role=dialog and no accessible name (title is a div) | 4.1.2 | dialog semantics missing | yes | both |
| DLG-003 | dialogs | [data-pet-issue~="DLG-003"] | Cart drawer: focus not moved in on open, no trap, Esc does nothing, focus not restored, page behind not inert | 2.1.2, 2.4.3 | modal focus management missing | yes | both |
| DLG-004 | dialogs | [data-pet-issue~="DLG-004"] | Drawer close control is a span with onClick (x): not focusable, no role or name | 2.1.1, 4.1.2 | click handler on non-interactive; no name | yes | both |
| DLG-005 | dialogs | [data-pet-issue~="DLG-005"] | Share wishlist dialog has role=dialog aria-modal=true and aria-labelledby="share-title-x" but no element has that id; no focus management | 4.1.2, 2.4.3 | aria-valid-attr-value (broken idref); focus management missing | yes | both |
| DLG-006 | dialogs | [data-pet-issue~="DLG-006"] | "Share wishlist" trigger has aria-haspopup=dialog but aria-expanded is hard-coded "false" while the dialog is open | 4.1.2 | manual: state not reflected | yes | both |
| DLG-007 | dialogs | [data-pet-issue~="DLG-007"] | Featured-card "More options" menu button: aria-controls="actions-menu-x" has no target; popup items are plain divs (no menu/menuitem roles), no arrow keys, Esc does not close (2 elements: trigger and popup) | 4.1.2, 2.1.1 | aria-valid-attr-value; menu semantics missing | yes | both |
| DLG-008 | dialogs | [data-pet-issue~="DLG-008"] | "Free returns" popover appears on mouseenter/mouseleave only: not on focus, not dismissible, no role=tooltip, trigger lacks aria-describedby (2 elements: trigger and popover) | 1.4.13, 2.1.1 | manual: hover-only content | yes | both |
| DLG-009 | dialogs | [data-pet-issue~="DLG-009"] | Cart drawer quantity number inputs (2) have no label or aria-label; "Qty" is a loose span | 1.3.1, 4.1.2 | label | yes | both |
| OK-DLG-1 | dialogs | [data-pet-issue~="OK-DLG-1"] | CORRECT: native <dialog> opened with showModal(), aria-labelledby and aria-describedby valid, trigger has aria-haspopup=dialog, focus returned to trigger on close, buttons class ok | 4.1.2, 2.4.3 | must NOT be flagged | yes | both |
| OK-DLG-2 | dialogs | [data-pet-issue~="OK-DLG-2"] | CORRECT: desktop filter sidebar uses fieldset/legend (Category, Price, Brand) with labelled checkboxes and radios (3 fieldsets) | 1.3.1, 3.3.2 | must NOT be flagged | no | desktop |
| MOB-010 | dialogs | [data-pet-issue~="MOB-010"] | Product-card titles have height 2.6rem and overflow hidden in the 2-col grid, long names are cut without a clamp indicator (every card) | 1.4.4, 1.4.12 | clipped text (scrollHeight > clientHeight) | no | mobile |
| MOB-012 | dialogs | [data-pet-issue~="MOB-012"] | Filters bottom sheet is a plain div: no role/name, drag-handle div, no trap, no Esc, background stays tabbable | 2.1.2, 4.1.2 | dialog semantics/focus management missing | yes | mobile |
| DSK-006 | dialogs | [data-pet-issue~="DSK-006"] | Card "Add to cart" button wrapper is opacity:0 until :hover with no :focus rule: keyboard focus lands on an invisible control (every card) | 2.4.7, 1.4.13 | focused element with opacity 0 | yes | desktop |
| TBL-001 | tables | [data-pet-issue~="TBL-001"] | Order history table has no `<caption>`, `aria-label` or `aria-labelledby` | 1.3.1, 2.4.6 | manual: table name | no | both |
| TBL-002 | tables | [data-pet-issue~="TBL-002"] | Order history header row uses `<td><b>` cells instead of `<th>` | 1.3.1 | manual: no header cells (td-headers) | no | both |
| TBL-003 | tables | [data-pet-issue~="TBL-003"] | Parcel list is a static table with `role="grid"`, rows `role="listitem"`, header `<th role="gridcell">` | 4.1.2, 1.3.1 | aria-required-children, aria-allowed-role | no | both |
| TBL-004 | tables | [data-pet-issue~="TBL-004"] | Same parcel table declares `aria-rowcount=50` and `aria-colcount=7` but has 5 rows x 3 columns; no accessible name | 1.3.1, 4.1.2 | manual: wrong counts; table name | no | both |
| TBL-005 | tables | [data-pet-issue~="TBL-005"] | Price list sortable headers (3) are `<div onClick>` inside `th`/`td`: not buttons, no keyboard; sort state only in the glyph | 2.1.1, 4.1.2 | manual: click handler on non-interactive | yes | both |
| TBL-006 | tables | [data-pet-issue~="TBL-006"] | Two `<th aria-sort="ascending">` at the same time | 4.1.2 | manual: multiple aria-sort | no | both |
| TBL-007 | tables | [data-pet-issue~="TBL-007"] | `aria-sort="descending"` placed on a `<td>` | 4.1.2 | aria-allowed-attr | no | both |
| TBL-008 | tables | [data-pet-issue~="TBL-008"] | Store hours layout table has `role="presentation"` but still contains `<th>` and a `<caption>` | 1.3.1 | presentation-role-conflict | no | both |
| TBL-009 | tables | [data-pet-issue~="TBL-009"] | Pack list `div role="table"` with `role="row"` children whose cells have no `cell`/`columnheader` roles | 1.3.1, 4.1.2 | aria-required-children | no | both |
| TBL-010 | tables | [data-pet-issue~="TBL-010"] | Saved items: select-all and per-row checkboxes (5 total) have no label | 1.3.1, 4.1.2 | label | no | both |
| TBL-011 | tables | [data-pet-issue~="TBL-011"] | Saved items: empty `<th></th>` over the actions column | 1.3.1 | empty-table-header | no | both |
| TBL-012 | tables | [data-pet-issue~="TBL-012"] | Jacket size chart uses `colSpan`/`rowSpan` headers with no `scope`, `headers` or `id` association | 1.3.1 | manual: complex table header association | no | both |
| TBL-013 | tables | [data-pet-issue~="TBL-013"] | Tent comparison sits in an `overflow:auto` container with no `tabindex=0` and no name | 2.1.1 | scrollable-region-focusable | no | both |
| TBL-014 | tables | [data-pet-issue~="TBL-014"] | Tent comparison feature cells show only glyphs (check / cross / dash) with no text alternative | 1.1.1, 1.3.1 | manual: glyph-only values | no | both |
| OK-TBL-1 | tables | [data-pet-issue~="OK-TBL-1"] | CORRECT: boot size chart with `<caption>`, `scope="col"`/`scope="row"`, no ARIA overrides | 1.3.1 | must NOT be flagged | no | both |
| MOB-008 | tables | [data-pet-issue~="MOB-008"] | Order history table has `min-width:28rem` and no scroll container: the page scrolls horizontally at 320-430px | 1.4.10 | `documentElement.scrollWidth > innerWidth` | no | mobile |
| TAB-001 | tabs | [data-pet-issue~="TAB-001"] | "Details" tablist (Description/Features/Specs/Care): arrow keys do nothing, only Tab/click | 2.1.1 | manual: tabs keyboard pattern | yes | both |
| TAB-002 | tabs | [data-pet-issue~="TAB-002"] | "Details" tabs have no `aria-selected`; selected state is only the `.active` class | 4.1.2 | aria-required-attr / manual: selected state | no | both |
| TAB-003 | tabs | [data-pet-issue~="TAB-003"] | No roving tabindex: every tab is a tab stop in both "Details" and "Customer info" (2 tablists) | 2.4.3, 2.1.1 | manual: tabs keyboard pattern | yes | both |
| TAB-004 | tabs | [data-pet-issue~="TAB-004"] | "Details" tabpanels (4) have no `aria-labelledby` and no name | 4.1.2 | manual: tabpanel name | no | both |
| TAB-005 | tabs | [data-pet-issue~="TAB-005"] | "Customer info" tabs' `aria-controls` point to ids that do not exist (`ci-tabpanel-*`) | 4.1.2 | aria-valid-attr-value | no | both |
| TAB-006 | tabs | [data-pet-issue~="TAB-006"] | "Customer info" supports Left/Right only; Home/End do nothing | 2.1.1 | manual: tabs keyboard pattern | yes | both |
| TAB-007 | tabs | [data-pet-issue~="TAB-007"] | "Bundle options": 3 `<div role="tab">` outside any `role="tablist"`, no `tabindex`, so not focusable | 4.1.2, 2.1.1 | aria-required-parent, manual: not focusable | no | both |
| TAB-008 | tabs | [data-pet-issue~="TAB-008"] | "Fit finder" vertical tablist (`aria-orientation="vertical"`) handles only Left/Right; Up/Down are ignored | 2.1.1 | manual: tabs keyboard pattern | yes | both |
| TAB-009 | tabs | [data-pet-issue~="TAB-009"] | "Details" tablist has no accessible name | 4.1.2 | manual: tablist name | no | both |
| TAB-010 | tabs | [data-pet-issue~="TAB-010"] | "Camp kit" tab contains a nested `<button aria-label="Close camp kit">` | 4.1.2 | nested-interactive | no | both |
| TAB-011 | tabs | [data-pet-issue~="TAB-011"] | Visible active "Customer info" panel carries `aria-hidden="true"` (3 panels tagged; the active one is exposed as hidden) | 4.1.2 | aria-hidden on visible content | no | both |
| OK-TAB-1 | tabs | [data-pet-issue~="OK-TAB-1"] | CORRECT: "Warranty" tabs with roving tabindex, Left/Right/Home/End, `aria-selected`, valid `aria-controls`, labelled focusable panels, named tablist | 4.1.2, 2.1.1 | must NOT be flagged | no | both |
| OK-TAB-2 | tabs | [data-pet-issue~="OK-TAB-2"] | CORRECT: Colour and Size pickers are labelled radio fieldsets with legends, 24px radios, 44px labels | 1.3.1, 3.3.2 | must NOT be flagged | no | both |
| MOB-004 | tabs | [data-pet-issue~="MOB-004"] | Fixed 4rem add-to-cart bar above the tab bar covers focused controls (Reviews/Q&A tabs) when tabbing down; no scroll padding | 2.4.11 | focus obscured; fixed element overlaps focused rect | yes | mobile |
| MOB-005 | tabs | [data-pet-issue~="MOB-005"] | Quantity stepper -/+ buttons (2) are 20x20px with 4px gap at <=767px (44px on desktop) | 2.5.8 | target-size | no | mobile |
| MOB-006 | tabs | [data-pet-issue~="MOB-006"] | Gallery is a swipe-only scroll-snap strip: thumbnail buttons not rendered, dots are spans, no prev/next | 2.5.1, 2.5.7 | manual: gesture-only operation; scrollable-region-focusable | yes | mobile |
| DSK-002 | tabs | [data-pet-issue~="DSK-002"] | Buy box is first in DOM but CSS `order` shows it right of the gallery at >=768px: tab order disagrees with visual order | 2.4.3, 1.3.2 | manual: focus order vs layout | yes | desktop |
| SVG-001 | graphics | [data-pet-issue~="SVG-001"] | Monthly spend bar chart svg has title and desc but no role="img", so name/description are not reliably exposed | 1.1.1 | svg-img-alt / svg without role img | no | both |
| SVG-002 | graphics | [data-pet-issue~="SVG-002"] | Card-expiry warning svg has aria-label "Warning" but no role, so the label is not announced reliably | 1.1.1, 4.1.2 | aria-allowed-attr / svg-img-alt (label on generic svg) | no | both |
| SVG-003 | graphics | [data-pet-issue~="SVG-003"] | Profile avatar svg role="img" with no accessible name (no label, title or labelledby) | 1.1.1 | svg-img-alt | no | both |
| SVG-004 | graphics | [data-pet-issue~="SVG-004"] | Decorative flourish svg is not aria-hidden and contains title "Decoration", so it is exposed to AT | 1.1.1 | decorative graphic exposed (svg not aria-hidden) | no | both |
| SVG-005 | graphics | [data-pet-issue~="SVG-005"] | Orders-by-month svg role="img" contains focusable links (6 bars); children of role img are presentational | 4.1.2 | nested-interactive | no | both |
| SVG-006 | graphics | [data-pet-issue~="SVG-006"] | Links whose only content is an svg with no accessible name (3 instances: settings gear in the profile row, 2 social icons) | 2.4.4, 4.1.2 | link-name | no | both |
| SVG-007 | graphics | [data-pet-issue~="SVG-007"] | Regional impact percentages (Alps 42%, Nordics 33%, Pyrenees 25%) are text elements inside an svg with aria-hidden="true" | 1.1.1, 1.3.1 | informative content hidden from AT (aria-hidden on svg with text) | no | both |
| SVG-008 | graphics | [data-pet-issue~="SVG-008"] | Activity chart is a data-URI svg image with non-descriptive alt "chart" | 1.1.1 | image-alt quality (uninformative alt on chart) | no | both |
| SVG-009 | graphics | [data-pet-issue~="SVG-009"] | Trail miles canvas chart has no fallback content, no role and no accessible name | 1.1.1 | canvas without alternative / role img name missing | no | both |
| SVG-010 | graphics | [data-pet-issue~="SVG-010"] | Elevation svg role="img" aria-labelledby references id "elev-title-x" which does not exist (title has id "elev-title") | 1.1.1, 4.1.2 | aria-valid-attr-value / svg-img-alt | no | both |
| SVG-011 | graphics | [data-pet-issue~="SVG-011"] | Spend-against-budget bars and legend swatches distinguished only by red vs green fill, no pattern or value text (1 container, legend with 2 swatches) | 1.4.1 | use-of-color (no axe rule; manual) | no | both |
| SVG-012 | graphics | [data-pet-issue~="SVG-012"] | Sync status svg role="presentation" also has aria-label "Network status" and a title: conflicting semantics | 1.1.1, 4.1.2 | presentation-role-conflict | no | both |
| SVG-013 | graphics | [data-pet-issue~="SVG-013"] | Notification bell button whose only content is an emoji span, no accessible label | 4.1.2, 2.4.4 | button-name | no | both |
| SVG-014 | graphics | [data-pet-issue~="SVG-014"] | Spending trend line chart data points (6 circles) reveal their values only on mouseenter and click; not focusable, no key handling, no text table | 2.1.1, 1.4.13 | manual: pointer-only data | yes | both |
| OK-SVG-1 | graphics | [data-pet-issue~="OK-SVG-1"] | CORRECT: ring chart svg role="img" with aria-labelledby pointing to existing title and desc ids | 1.1.1 | must NOT be flagged | no | both |
| OK-SVG-2 | graphics | [data-pet-issue~="OK-SVG-2"] | CORRECT: decorative leaf svg with aria-hidden="true" and focusable="false" | 1.1.1 | must NOT be flagged | no | both |
| OK-SVG-3 | graphics | [data-pet-issue~="OK-SVG-3"] | CORRECT: wishlist "Move up" / "Move down" buttons with per-item accessible names, 44px targets, visible focus ring (shown at >=768px) | 2.5.7, 4.1.2 | must NOT be flagged | no | desktop |
| MOB-007 | graphics | [data-pet-issue~="MOB-007"] | Wishlist rows (4) can be reordered only by dragging a handle; the Move up/down buttons are display:none at <=767px | 2.5.7 | manual: dragging without single-pointer alternative | yes | mobile |
| FRM-001 | forms | [data-pet-issue~="FRM-001"] | "Name on card" and "Billing town or city" inputs identified by placeholder only, no label (2 inputs) | 1.3.1, 3.3.2, 4.1.2 | label | no | both |
| FRM-002 | forms | [data-pet-issue~="FRM-002"] | Promo code label htmlFor="promo-x" targets a non-existent id; the input has id "promo-input" so it is unlabelled | 1.3.1, 4.1.2 | label | no | both |
| FRM-003 | forms | [data-pet-issue~="FRM-003"] | After "Place order" with an empty card number the error is a plain sibling span; no aria-describedby, aria-invalid or live region; field marked only by red border | 3.3.1, 1.4.1, 4.1.3 | error not programmatically associated (manual); color-only error | yes | both |
| FRM-004 | forms | [data-pet-issue~="FRM-004"] | Optional gift message input is valid but has aria-invalid="true" and aria-describedby="gift-note-x" referencing a missing id | 3.3.1, 4.1.2 | aria-valid-attr-value | no | both |
| FRM-005 | forms | [data-pet-issue~="FRM-005"] | Three labelled gift packaging radios with no fieldset/legend or group role/name | 1.3.1, 3.3.2 | radiogroup (group without name) | no | both |
| FRM-006 | forms | [data-pet-issue~="FRM-006"] | Card number and expiry required only by a red asterisk in the label; no required or aria-required (2 inputs) | 3.3.2, 1.4.1, 4.1.2 | required indication missing (manual) | no | both |
| FRM-007 | forms | [data-pet-issue~="FRM-007"] | "Preferred delivery window" select has a visible caption span but no associated label | 1.3.1, 4.1.2 | select-name | no | both |
| FRM-008 | forms | [data-pet-issue~="FRM-008"] | "Save my details" custom checkbox is a div role="checkbox" without aria-checked, tabindex or key handling | 4.1.2, 2.1.1 | aria-required-attr, focusable role missing tabindex | no | both |
| FRM-009 | forms | [data-pet-issue~="FRM-009"] | Password and confirm password inputs share the id "pw" (2 inputs) | 4.1.1, 1.3.1 | duplicate-id-active | no | both |
| FRM-010 | forms | [data-pet-issue~="FRM-010"] | Courier contact name, notification email and mobile number inputs lack autocomplete attributes (3 inputs) | 1.3.5 | autocomplete-valid / missing autocomplete | no | both |
| FRM-011 | forms | [data-pet-issue~="FRM-011"] | "Place order" control is a div with onClick: not a button, not focusable, no role | 4.1.2, 2.1.1 | click handler on non-interactive element (manual) | yes | both |
| FRM-012 | forms | [data-pet-issue~="FRM-012"] | Account email input has visible label "Email address" but aria-label="field1": accessible name does not contain visible text | 2.5.3 | label-content-name-mismatch | no | both |
| FRM-013 | forms | [data-pet-issue~="FRM-013"] | Mobile number, card number and billing postcode inputs are type="text" with no inputmode or pattern; wrong keyboard on mobile (3 inputs) | 1.3.5, 3.3.2 | manual: input purpose/type missing | no | both |
| OK-FRM-1 | forms | [data-pet-issue~="OK-FRM-1"] | CORRECT: contact fieldset/legend with labelled required inputs, autocomplete, and email error linked by aria-describedby, aria-invalid and role="alert" | 1.3.1, 3.3.1, 3.3.2, 1.3.5 | must NOT be flagged | no | both |
| OK-FRM-2 | forms | [data-pet-issue~="OK-FRM-2"] | CORRECT: delivery address fieldset/legend with labelled required inputs, matching autocomplete tokens, numeric postcode input with pattern | 1.3.1, 1.3.5, 3.3.2 | must NOT be flagged | no | both |
| MOB-011 | forms | [data-pet-issue~="MOB-011"] | "Order summary" collapse toggle is a div with onClick and a chevron: not a button, no aria-expanded (the static summary aside is display:none at <=767px) | 4.1.2, 2.1.1 | click handler on non-interactive | yes | mobile |
| MISC-001 | misc | [data-pet-issue~="MISC-001"] | "Stories from the trail" text carousel rotates every 3s with no pause/stop control, no slide labelling and no live-region handling | 2.2.2, 4.1.3 | manual: auto-moving content without pause | no | both |
| MISC-002 | misc | [data-pet-issue~="MISC-002"] | "Save preferences" shows "Saved!" in a plain div with no role=status or aria-live | 4.1.3 | manual: status message not announced | yes | both |
| MISC-003 | misc | [data-pet-issue~="MISC-003"] | Orders FAQ accordion headers are div onClick: not buttons, no aria-expanded/aria-controls, not focusable (3 headers) | 4.1.2, 2.1.1 | click handler on non-interactive | yes | both |
| MISC-004 | misc | [data-pet-issue~="MISC-004"] | Chat widget wrapper has aria-hidden=true but contains a focusable "Chat with us" button | 4.1.2 | aria-hidden-focus | no | both |
| MISC-005 | misc | [data-pet-issue~="MISC-005"] | Setup video has controls, autoplay, muted, loop and no <track kind="captions"> | 1.2.2, 2.2.2 | video-caption | no | both |
| MISC-006 | misc | [data-pet-issue~="MISC-006"] | Store map iframe (src about:blank) has no title | 4.1.2 | frame-title | no | both |
| MISC-007 | misc | [data-pet-issue~="MISC-007"] | "people are reading help articles" counter is aria-live=assertive and increments every 5s | 4.1.3, 2.2.2 | manual: noisy assertive live region | no | both |
| MISC-008 | misc | [data-pet-issue~="MISC-008"] | Shipping notice sits in a fixed-height (1.5em) overflow:hidden box that clips its sentence | 1.4.4, 1.4.12 | clipped text (scrollHeight > clientHeight) | no | both |
| MISC-009 | misc | [data-pet-issue~="MISC-009"] | Article pagination: five 16px buttons labelled 1 to 5, 2px apart | 2.5.8 | target-size | no | both |
| MISC-010 | misc | [data-pet-issue~="MISC-010"] | Two <main> landmarks on the page (hero/topics and contact) and a newsletter <section aria-label=""> | 1.3.1, 4.1.2 | landmark-no-duplicate-main, landmark-unique, aria-valid-attr-value | no | both |
| MISC-011 | misc | [data-pet-issue~="MISC-011"] | Trip planner card: role="buton", aria-labeledby typo, aria-expanded="yes", aria-checked on a div without a role | 4.1.2 | aria-roles, aria-valid-attr, aria-valid-attr-value | no | both |
| MISC-012 | misc | [data-pet-issue~="MISC-012"] | Quick links: three buttons with tabindex 3, 2, 1 in DOM order, so focus order is the reverse of visual order (3 buttons) | 2.4.3 | tabindex | yes | both |
| MISC-013 | misc | [data-pet-issue~="MISC-013"] | Cookie banner: fixed bottom div with no role/name, no focus management, covers footer and content (~45% of a phone screen), "Accept all" solid vs "Manage" in .muted-low text (~1.9:1) | 1.4.3, 2.4.11 | color-contrast; dialog semantics missing | yes | both |
| MISC-014 | misc | [data-pet-issue~="MISC-014"] | "Added to wishlist" toast (role=status) vanishes after 4s while holding an Undo button | 2.2.1 | manual: timing without extend | yes | both |
| OK-MISC-1 | misc | [data-pet-issue~="OK-MISC-1"] | CORRECT: returns FAQ accordion with real buttons in headings, aria-expanded, aria-controls, region panels labelled by their button, class ok | 4.1.2, 2.1.1 | must NOT be flagged | yes | both |
| DSK-003 | misc | [data-pet-issue~="DSK-003"] | Sticky "Topics" list is a scrollable region (max-height 20rem, overflow auto) of plain text items with no focusable content | 2.1.1 | scrollable-region-focusable | no | desktop |
| MOB-013 | misc | [data-pet-issue~="MOB-013"] | Topic anchors (chips jump to 6 targets) have no scroll-margin-top, so the targets land under the sticky 3.5rem header | 2.4.11 | focus obscured by fixed header | yes | mobile |
