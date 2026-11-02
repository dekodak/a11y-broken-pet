# DESIGN: "Fernwick Outfitters" demo prototype

Design-only brief. Supersedes the page list in SPEC.md but keeps its conventions (section 8). All 7 page ids and every existing defect ID survive, re-skinned into a believable outdoor-gear web shop. Phase A may now edit `app/layout.tsx` and `app/globals.css` (SPEC.md forbade it for page authors only).

## 1. Concept

- **Brand:** Fernwick Outfitters, a fictional outdoor-gear shop (tents, packs, boots, layers). Tagline "Gear for the long way round". No real brands, no external assets, fonts or CDNs. Imagery is inline SVG/CSS only (`ProductArt`) plus `public/hero.svg`.
- **Tone:** warm, practical and a little wry. Microcopy is plain English, no hints about defects. Prices in EUR, e.g. "Ridgeback 2P Tent, EUR 389.00". Invented products: Ridgeback 2P Tent, Larch 45L Pack, Moss Trail Boots, Alder Down Jacket, Cinder Stove, Heron Water Filter, Birch Sleeping Bag, Sedge Trekking Poles.
- **Layout principles:** mobile-first CSS, single-column below 768px, 12-col-feel grid above. Max content width 72rem. Generous whitespace, cards with soft shadow, one primary action per section. Real content must fill each screen (no lorem ipsum); every page has breadcrumbs (except home) and an h1.

### Design tokens (defined on `:root` in `app/globals.css`)

```css
:root{
 /* colour */
 --c-bg:#faf7f2; --c-surface:#fff; --c-ink:#1d2a24; --c-muted:#55635b; --c-border:#d9d3c7;
 --c-primary:#2f6b4f; --c-primary-ink:#fff; --c-primary-dark:#1f4d38;
 --c-accent:#d97b29;            /* only on dark surfaces or as decoration */
 --c-link:#1f5a8a; --c-danger:#b3261e; --c-success:#1e6b3a; --c-focus:#1a56db;
 --c-header:#14261f; --c-header-ink:#f4efe6; --c-header-muted:#b9c7be; /* dark header 13:1 */
 --c-band:#0f1d2e; --c-band-low:#5b6b8a;   /* HOME-018 only: ~2.9:1 on band */
 /* spacing (rem) */
 --s-1:.25rem; --s-2:.5rem; --s-3:.75rem; --s-4:1rem; --s-5:1.5rem; --s-6:2rem; --s-7:3rem; --s-8:4rem;
 /* type */
 --f-sans:system-ui,-apple-system,"Segoe UI",Roboto,sans-serif; --f-serif:Georgia,"Times New Roman",serif;
 --t-xs:.8125rem; --t-sm:.9375rem; --t-md:1rem; --t-lg:1.25rem; --t-xl:1.625rem; --t-2xl:2.25rem; --t-3xl:3rem;
 /* shape */
 --r-sm:.25rem; --r-md:.5rem; --r-lg:1rem; --r-pill:999px;
 --sh-1:0 1px 2px rgba(20,38,31,.08); --sh-2:0 6px 20px rgba(20,38,31,.12);
 --header-h:3.5rem; --tabbar-h:3.5rem;
}
```
Headings use `--f-serif` (h1 `--t-2xl`, 3xl at >=1024), body `--f-sans` 16px/1.55. Dark-header text on `--c-header` and all body text on `--c-bg`/white must pass AA (polished by default). Legacy classes from SPEC.md (`page card btn icon-btn tiny ok muted-low inline-link err invalid modal-backdrop modal x popover scroll-box tablist tab active clip`) stay defined and are re-styled to fit the theme; `.muted-low`, `.inline-link`, `.tiny`, `.clip` keep their defective metrics (contrast ~1.9:1, no underline, 16px, fixed height).

### Breakpoints and modes
`--bp-sm 480`, `md 768`, `lg 1024` (CSS vars are not usable in media queries, hardcode the numbers).
- **mobile:** `max-width:767px` (checker viewport 390x844). Hamburger + off-canvas menu, bottom `MobileTabBar`, sticky header, bottom sheets, sticky ATC bar.
- **tablet:** 768-1023, inline compact nav, no mega menu, no tab bar.
- **desktop:** `min-width:1024px` (checker viewport 1440x900). Mega menu, sidebars, hover affordances.
- GLB-007 stays: `:focus{outline:none}` globally; every polished control carries class `ok` (or sits inside one).

## 2. Sitemap (exactly 7 page ids)

| page id | route | file | screen / role |
|---|---|---|---|
| home | `/` | `app/page.tsx` | Landing: promo strip, hero, category tiles, featured products, journal, community |
| dialogs | `/shop` | `app/shop/page.tsx` | Catalog "Camp & Trail" with filters, cart drawer, share wishlist, card menu, tooltip, size-guide dialog |
| tables | `/orders` | `app/orders/page.tsx` | "Orders & sizing": order history, delivery tracker, price list, size chart, tent comparison |
| tabs | `/product` | `app/product/page.tsx` | Product detail: Ridgeback 2P Tent (gallery, tabs, bundle, fit finder, warranty) |
| graphics | `/account` | `app/account/page.tsx` | Account dashboard: spend charts, trail miles, impact infographic, wishlist |
| forms | `/checkout` | `app/checkout/page.tsx` | Checkout + create account (wrapped in `<main className="page">`) |
| misc | `/help` | `app/help/page.tsx` | Help centre: FAQ, stories carousel, video, store map, cookie banner, toasts, newsletter |

Old dirs `app/dialogs|tables|tabs|graphics|forms|misc` are removed by Phase A (`git mv` the css to `app/<route>/<route>.css`, then each page agent overwrites its page). Home css stays `app/home.css`. Page-level `<main>` rule is unchanged from SPEC (GLB-005): only `/checkout` has one `<main>`, `/help` has two, the others use `<div className="page">`.

### Where each existing ID lives (re-skin map)
- **GLB-001..007** `layout.tsx` + Header (Phase A). GLB-003 logo `<div>` "Fernwick"; GLB-004 header desktop nav + off-canvas nav unnamed, no aria-current; GLB-006 viewport; GLB-007 focus CSS.
- **HOME-001..016** `/`: 001 h1 then h4 "Trail Week picks" in featured; 002 empty h3 in "Why Fernwick" strip; 003 hero `<img src=/hero.svg>` no alt; 004 customer photo alt `IMG_4032.jpg`; 005 ridge divider `alt="Mountain ridge divider"`; 006 three icon buttons (hero search, store menu, close promo strip); 007 `aria-label=""` heart on featured card; 008 `<a><i/></a>` in Community follow row; 009 `div role=button` photo Like counter; 010 `<a onClick>` "Reset" in Gear finder; 011 two "click here" (deals, gift guide); 012 `tabIndex=3` "Find a store"; 013 `.muted-low` shipping fine print; 014 inline links in Journal teaser; 015 `target=_blank` "Read the Journal"; 016 French testimonial (Chamonix). OK-HOME-1 labelled "Open wishlist" icon button; OK-HOME-2 featured photo with real alt.
- **DLG-001..004** cart drawer (div drawer, trigger "View cart", close span ×). **DLG-005/006** "Share wishlist" modal. **DLG-007** product-card "More" menu. **DLG-008** "Free returns" info hover popover. **OK-DLG-1** "Size guide" native dialog.
- **TBL-001/002** order history (td-as-header, no caption). **003/004** delivery tracker grid. **005/006/007** price list (sortable). **008** store-hours layout table. **009** pack-list div table. **010/011** saved-items table (checkboxes, empty actions th). **012** complex size chart with spans. **013** tent comparison in scroll box. **OK-TBL-1** simple size chart with caption/scope.
- **TAB-001/002/003/004/009** "Details" (Description/Features/Care). **TAB-003/005/006** "Customer info" (Reviews/Q&A/Delivery). **TAB-007/010** "Bundle options" (role=tab divs outside tablist, one with nested "Close" button). **TAB-008** vertical "Fit finder". **OK-TAB-1** "Warranty" tabs.
- **SVG-001** monthly spend bars; **002** payment-expiry warning icon; **003** avatar placeholder; **004** flourish under heading; **005** "Orders by month" svg with link; **006** gear-icon link to /checkout; **007** impact by region (aria-hidden svg text); **008** data-URI activity chart alt "chart"; **009** trail-miles canvas; **010** route elevation svg labelledby missing; **011** returned (red) vs kept (green) bars; **012** sync-status svg role=presentation; **013** bell emoji button; **OK-SVG-1/2** carbon-savings chart, decorative leaf.
- **FRM-001..012** `/checkout`: 001 name/city placeholders; 002 email label for mismatch; 003 promo-code error span; 004 valid postcode with aria-invalid; 005 shipping method radios; 006 required `*` only; 007 country select; 008 gift-wrap div checkbox; 009 dup id; 010 name/email/tel no autocomplete; 011 div "Place order"; 012 "Email address" aria-label field1 (create-account block). **OK-FRM-1** billing contact fieldset.
- **MISC-001** customer stories carousel; **002** "Save preferences" Saved!; **003** FAQ div accordion; **004** aria-hidden chat widget; **005** setup video; **006** store-map iframe; **007** "people viewing" live counter; **008** clipped shipping notice; **009** five 16px pagination buttons; **010** two mains + empty aria-label section; **011** invalid ARIA in "Trip planner" card; **012** positive tabindex "Quick links"; **OK-MISC-1** returns accordion.

## 3. Pages (desktop / mobile / content / polished vs broken)

### 3.1 home `/`
- **Desktop (1440):** promo strip (dark `--c-band`, HOME-018 text; contains close HOME-006) -> header (mega menu) -> hero (2-col: copy left, art right; desktop hero uses banner image-of-text, DSK-004; headline overlay DSK-005) -> ridge divider -> category tiles (4 cols: Tents, Packs, Boots, Layers; HOME-017) -> "Trail Week picks" 4-col ProductCard grid -> Why Fernwick 3 USPs -> Gear finder (3 selects + Reset) -> Journal teaser + customer photo + testimonial -> Community follow row -> ticker (HOME-019) -> footer.
- **Mobile (390):** same order single-column; hero stacks (real text, no banner image), tiles 2x2, picks horizontal 2-col grid, bottom tab bar fixed.
- **Content:** "Spring Trail Week: up to 30% off tents and packs"; hero h1 "Gear for the long way round"; CTA "Shop tents"; fine print "Free delivery over EUR 75, 30-day returns."
- **Polished:** product grid (ProductCard, OK-HOME-3), OK-HOME-1, OK-HOME-2, breadcrumbs absent, footer nav. **Broken:** all HOME-0xx, DSK-004/005.

### 3.2 shop `/shop` (dialogs)
- **Desktop:** breadcrumbs, h1 "Camp & Trail", left sticky filter sidebar (Category/Price/Brand fieldsets, OK-DLG-2) + 3-col product grid + sort select (labelled). A sticky "View cart (2)" bar opens drawer from right (DLG-001..004). Share wishlist button top right (DLG-005/006). Card "More" kebab menu on featured card (DLG-007). "Free returns" badge with info icon (DLG-008). "Size guide" link opens native dialog (OK-DLG-1). Quick add hover (DSK-006). Cart quantity fields (DLG-009).
- **Mobile:** sidebar becomes a "Filters" button opening a bottom sheet (MOB-012); grid 2-col, card titles clamped (MOB-010); cart drawer becomes full-width; tab bar fixed.
- **Polished:** filter fieldsets on desktop, native size-guide dialog, sort select, grid links. **Broken:** DLG-001..009, MOB-010/012, DSK-006.

### 3.3 orders `/orders` (tables)
- **Desktop:** account-style sub-nav (Orders, Sizing, Compare as in-page anchors), then sections in single column: Order history (T1), Delivery tracker (T2), Price list (T3), Store hours (T4), Pack list (T5), Saved items (T6), Size chart simple (OK) + complex (T7), Tent comparison scroll (T8).
- **Mobile:** sections stack; T1 has a fixed 28rem table not wrapped in a scroll container (MOB-008, whole page scrolls sideways); other tables sit in `.table-wrap` (`overflow-x:auto`) which only T8 omits keyboard access (TBL-013).
- **Content:** orders "FW-20418, 12 Mar 2026, EUR 389.00, Delivered"; sizes EU 36-47; tents with weight/capacity/price.
- **Polished:** OK-TBL-1 size chart, sections' headings/anchors. **Broken:** TBL-001..014, MOB-008.

### 3.4 product `/product` (tabs)
- **Desktop:** breadcrumbs, 2-col: gallery with thumbnail buttons (left, 55%) and buy box (right). Buy box DOM comes before gallery but CSS `order` swaps visual placement (DSK-002). Below: "Details" tabs (TAB-001..), "Customer info" tabs, "Bundle options", "Fit finder" vertical, "Warranty" (OK-TAB-1).
- **Mobile:** gallery becomes a full-bleed scroll-snap strip, thumbnails hidden, dots are spans, swipe only (MOB-006). Quantity stepper buttons 20px (MOB-005). Sticky bottom add-to-cart bar above the tab bar (MOB-004). Tab bars scroll horizontally.
- **Content:** "Ridgeback 2P Tent, EUR 389.00, 2.1 kg, 3-season", size/colour pickers (clean radio fieldsets, OK-TAB-2), 4.6 stars (128).
- **Polished:** colour/size fieldsets (OK-TAB-2), OK-TAB-1, breadcrumbs. **Broken:** TAB-001..011, MOB-004/005/006, DSK-002.

### 3.5 account `/account` (graphics)
- **Desktop:** sidebar nav (Overview, Orders, Wishlist, Settings, links, clean) + content grid 2-col of cards: profile row (avatar SVG-003, bell SVG-013, gear link SVG-006, warning SVG-002), spend bars (SVG-001, SVG-011), orders by month (SVG-005), sync status (SVG-012), trail miles canvas (SVG-009), elevation (SVG-010), activity image (SVG-008), impact infographic (SVG-007, OK-SVG-1/2, SVG-004), spend line chart (SVG-014), wishlist with "Move up/down" buttons (desktop, clean OK-SVG-3) and drag.
- **Mobile:** sidebar becomes a horizontal chip row; cards 1-col; wishlist shows drag handles only, up/down buttons `display:none` (MOB-007).
- **Polished:** OK-SVG-1/2, OK-SVG-3 wishlist buttons (desktop). **Broken:** SVG-001..014, MOB-007.

### 3.6 checkout `/checkout` (forms, wrapped in `<main className="page">`)
- **Desktop:** 2-col: left steps (Contact, Delivery, Payment, Create account), right sticky order summary (static aside). **Mobile:** single column, summary collapsed into a toggle bar at the top "Order summary EUR 412.00" (MOB-011); static aside is `display:none`.
- **Content:** items, subtotal, promo code, shipping methods (Standard EUR 4.90 / Express EUR 9.90 / Pickup free), country select, gift wrap, "Place order".
- **Polished:** OK-FRM-1 billing contact, OK-FRM-2 delivery address fieldset (labelled, autocomplete, type/inputmode correct). **Broken:** FRM-001..013, MOB-011.

### 3.7 help `/help` (misc)
- **Desktop:** first `<main>` (hero search + topic list), sticky left "Topics" list that scrolls (DSK-003), FAQ accordions, stories carousel, video, store map iframe, trip planner card, pagination, newsletter, second `<main>` with contact. Cookie banner fixed bottom (MISC-013); toast stack bottom-right (MISC-014); chat widget (MISC-004).
- **Mobile:** topics list becomes anchor chips below the sticky header; targets are hidden under the 3.5rem header (MOB-013); cookie banner covers ~45% of the viewport.
- **Polished:** OK-MISC-1 returns accordion. **Broken:** MISC-001..014, DSK-003, MOB-013.

## 4. Shared components (`app/_components/`, built by Phase A, one pass)

All styles live in `app/globals.css` (tokens, header, footer, tabbar, cards, buttons, utilities); no per-component css files. Clean = must not be flagged.

| file | props | used by | status |
|---|---|---|---|
| `Header.tsx` ('use client') | none | layout | **defective** (GLB-003/004/008/009, MOB-001/002/003, DSK-001): logo div, desktop nav row (mega menu on hover), search, cart link with count, EUR select, hamburger + off-canvas menu |
| `MobileTabBar.tsx` | none | layout | **defective** (MOB-014); `<nav>` fixed bottom, 4 icon-only links Home/Shop/Cart/Account |
| `Footer.tsx` | none | layout | partly defective (GLB-010: column headings are divs, social icon links unnamed); `<nav aria-label="Footer">` itself clean (OK-GLB-1) |
| `Breadcrumbs.tsx` | `items:{label,href?}[]` | all pages except home | **clean** (OK-GLB-2): `<nav aria-label="Breadcrumb"><ol>`, last item `aria-current="page"` |
| `Button.tsx` | `variant:'primary'|'secondary'|'ghost'`, `href?`, `onClick?`, `children`, native button props | all | **clean**: real `<button>`/`<a>`, class `ok`, min 44px target |
| `Icon.tsx` | `name:'search'|'menu'|'close'|'cart'|'user'|'heart'|'home'|'store'|'bell'|'gear'|'info'|'star'|'leaf'|'chevron'`, `size?`, `title?` | all | **clean**: svg `aria-hidden focusable=false` unless `title` given (then `role=img` + `<title id>`); defects wrap it, never live inside |
| `ProductArt.tsx` | `kind:'tent'|'pack'|'boot'|'jacket'|'stove'|'filter'`, `tone?:1|2|3` | home, shop, product, account | **clean**: decorative inline SVG, `aria-hidden` |
| `ProductCard.tsx` | `product`, `titleClamp?:boolean`, `quickAdd?:'always'|'hover'`, `more?:ReactNode` | home, shop | **clean by default** (OK-HOME-3): `<article>`, one link on the name, price, rating text "4.6 out of 5, 128 reviews", Button "Add Ridgeback 2P Tent to cart". Defects only via props: `titleClamp` -> MOB-010, `quickAdd="hover"` -> DSK-006 |
| `SectionHeading.tsx` | `level:2|3`, `eyebrow?`, `children` | all | **clean** |

Data: `app/_data/products.ts` exports 8 typed products `{id,name,kind,price,rating,reviews,badge?}`. Types may be inline in the file. Phase A also: `lib useIsMobile` is NOT provided (see section 8); `layout.tsx` renders `<Header/> {children} <Footer/> <MobileTabBar/>`, plus MOB-009 orientation overlay (CSS only), GLB-005 (no skip link, no main), GLB-002 shared title "Fernwick Outfitters", `lang` missing (GLB-001), `metadata.other['pet-issue']`. Header/Footer/TabBar tag their defects with `data-pet-issue`. Mark the hidden duplicate navs so the verify script finds them in HTML (both are in the DOM at every viewport).

## 5. NEW defect catalogue

Viewport column = where the checker can observe it (all markers exist in DOM at both viewports; a viewport-specific element is `display:none` at the other, so it is absent from the a11y tree there). `int` = needs interaction. "Page" `layout` = owned by Phase A.

### 5.1 MOB- (mobile only, 390x844)
| ID | page | element / behavior | SC | expected checker signal | int |
|---|---|---|---|---|---|
| MOB-001 | layout | Hamburger `<button>` with icon only: no name, no `aria-expanded`/`aria-controls` | 4.1.2 | button-name | no |
| MOB-002 | layout | Off-canvas menu closed via `transform:translateX(-100%)` only (no visibility/inert/hidden): its 7 links are still tab stops, off screen | 2.4.3, 2.4.7 | focusable offscreen content; tab walk reaches invisible links | yes |
| MOB-003 | layout | Open off-canvas: no `role=dialog`, no focus move, no trap, Esc ignored, page behind not inert, backdrop click only | 2.1.2, 4.1.2 | modal focus management missing | yes |
| MOB-004 | product | Sticky bottom add-to-cart bar (fixed, 4rem) covers focused controls (Reviews tab, Q&A) when tabbing down; no scroll-padding | 2.4.11 | focus obscured; fixed element overlaps focused rect | yes |
| MOB-005 | product | Quantity stepper -/+ buttons 20x20px at <=767px (44px on desktop); 4px gap | 2.5.8 | target-size | no |
| MOB-006 | product | Gallery is swipe-only scroll-snap strip; thumbnail buttons `display:none`; dots are `span`s; no prev/next | 2.5.1, 2.5.7 | manual: gesture-only operation; no operable alternative | yes |
| MOB-007 | account | Wishlist reorder via pointer drag handles only; "Move up/down" buttons `display:none` on mobile | 2.5.7 | manual: dragging without single-pointer alternative | yes |
| MOB-008 | orders | Order-history table fixed `min-width:28rem` not in a scroll container: page scrolls horizontally at 320-430px | 1.4.10 | `documentElement.scrollWidth > innerWidth` | no |
| MOB-009 | layout | `@media (orientation:landscape) and (max-height:500px)` shows full-screen "Rotate your device to continue" overlay, content hidden | 1.3.4 | manual: orientation restriction (emulate landscape 844x390) | yes |
| MOB-010 | shop | Product-card titles `height:2.6rem; overflow:hidden` in 2-col grid, long names cut, no clamp indicator; clipped at 200% zoom | 1.4.4, 1.4.12 | clipped text (`scrollHeight > clientHeight`) | no |
| MOB-011 | checkout | "Order summary" collapse toggle is `<div onClick>` with chevron: not a button, no `aria-expanded` | 4.1.2, 2.1.1 | click handler on non-interactive | yes |
| MOB-012 | shop | Filters bottom sheet is a plain div: no role/name, no trap, no Esc, drag-handle div, background still tabbable | 2.1.2, 4.1.2 | dialog semantics/focus management missing | yes |
| MOB-013 | help | FAQ topic anchors jump under sticky 3.5rem header; no `scroll-margin-top`; focused target hidden | 2.4.11 | focus obscured by fixed header | yes |
| MOB-014 | layout | Bottom tab bar `<nav>` has no name and 4 links containing only svgs (no text/label) | 2.4.4, 4.1.2 | link-name, landmark-unique | no |

### 5.2 DSK- (desktop only, 1440x900)
| ID | page | element / behavior | SC | expected checker signal | int |
|---|---|---|---|---|---|
| DSK-001 | layout | "Shop" mega menu opens on CSS `:hover` only (panel `display:none` otherwise; trigger is a link with no `aria-haspopup/expanded`); keyboard cannot reach 12 panel links | 1.4.13, 2.1.1 | manual: hover-only content | yes |
| DSK-002 | product | Buy box is first in DOM, CSS `order`/`flex-direction:row-reverse` puts it right of gallery: tab order disagrees with visual order | 2.4.3, 1.3.2 | manual: focus order vs layout | yes |
| DSK-003 | help | Sticky "Topics" aside `max-height:20rem; overflow:auto` containing plain text items (no links/focusables): scrollable but not keyboard reachable | 2.1.1 | scrollable-region-focusable | no |
| DSK-004 | home | Desktop hero banner is an `<img>` (data-URI SVG with text baked in: "Trail Week: 30% off"), `alt="Banner"`; mobile shows real text | 1.4.5, 1.1.1 | image of text, alt quality | no |
| DSK-005 | home | Hero overlay copy (#8a8f8c on light sky area of hero art, ~2.8:1) only at >=1024px; mobile uses dark copy | 1.4.3 | color-contrast | no |
| DSK-006 | shop | Card "Quick add" button `opacity:0` until `:hover` (no `:focus-visible`/`:focus-within` rule): keyboard focus lands on an invisible control; on mobile always visible | 2.4.7, 1.4.13 | focused element with opacity 0 | yes |

### 5.3 New shared (both viewports) continuing existing prefixes
| ID | page | element / behavior | SC | expected checker signal | int |
|---|---|---|---|---|---|
| GLB-008 | layout | Header renders desktop nav row and off-canvas nav in DOM at all sizes; the inactive one is hidden with `opacity:0;height:0;overflow:hidden` (not `display:none`), so duplicate unnamed landmarks and tabbable links | 1.3.1, 2.4.3 | landmark-unique, hidden-but-focusable | no |
| GLB-009 | layout | Cart link shows icon + badge "2"; its accessible name is just "2"; count updates silently | 2.4.4, 4.1.3 | link-name quality (name "2") | no |
| GLB-010 | layout | Footer column headings are `<div class="h">`, social links are `<a>` with svg only | 1.3.1, 2.4.4 | link-name; heading structure | no |
| HOME-017 | home | Category tiles: image link (empty name, `alt=""` img, same href) adjacent to title link (4 pairs) | 2.4.4 | link-name; redundant adjacent links | no |
| HOME-018 | home | Promo/"Trail Week" band: `#5b6b8a` text on `#0f1d2e` (~2.9:1) | 1.4.3 | color-contrast | no |
| HOME-019 | home | Free-shipping ticker with infinite CSS marquee animation, no pause, no `prefers-reduced-motion` handling | 2.2.2 | manual: moving content without pause | no |
| DLG-009 | shop | Cart-drawer quantity `<input type=number>` x2 without label, `aria-label` absent | 1.3.1, 4.1.2 | label | yes |
| TBL-014 | orders | Tent comparison cells contain only glyphs ✓ / ✗ / — with no text alternative; header cells are th but glyph meaning lost | 1.1.1, 1.3.1 | manual: glyph-only values | no |
| TAB-011 | product | Visible active panel of "Customer info" carries `aria-hidden="true"` (state toggled on the wrong panel) | 4.1.2 | aria-hidden on visible content | no |
| SVG-014 | account | Spend line chart: data points `<circle>` reveal values only on mouseenter and click (no focus, no keys, no text table) | 2.1.1, 1.4.13 | manual: pointer-only data | yes |
| FRM-013 | checkout | Phone, postcode, card-number inputs are `type="text"` without `inputmode`/`pattern`; on mobile this shows the wrong keyboard | 1.3.5, 3.3.2 | manual: input purpose/type missing | no |
| MISC-013 | help | Cookie banner: fixed bottom div, no role/name, not focus-managed, "Accept all" solid button vs "Manage" as `.muted-low` text, covers footer and focus | 1.4.3, 2.4.11 | contrast + dialog semantics | yes |
| MISC-014 | help | Toast "Added to wishlist" with `role=status` disappears in 4s while holding an "Undo" button | 2.2.1 | manual: timing without extend | yes |

Counts: **MOB 14, DSK 6, shared 13**. New OK- controls (must NOT be flagged): OK-GLB-1 footer nav, OK-GLB-2 breadcrumbs, OK-HOME-3 product grid, OK-DLG-2 filter fieldsets, OK-TAB-2 colour/size pickers, OK-SVG-3 wishlist up/down buttons, OK-FRM-2 delivery fieldset, plus the old OK-* ones. Never write hint words (broken, bad, wrong, inaccessible, defect, fixture) in visible text, aria, ids or classes.

## 6. Phase plan

**Phase A (one agent, finishes before B):**
- `app/globals.css` tokens + base + header/footer/tabbar/card/button/utility styles + legacy classes + defect CSS for MOB-002/009, DSK-001/006 pieces, GLB-008.
- `app/layout.tsx`, `app/_components/*` (section 4), `app/_data/products.ts`, move css files / delete old page dirs, stub `app/<route>/page.tsx` exporting a titled placeholder so the app builds.
- Owns: GLB-001..010, MOB-001/002/003/009/014, DSK-001. Writes `expected/fragments/global.md`.

**Phase B (4 agents, disjoint files, all after A):**
| agent | files | defect IDs |
|---|---|---|
| B1 | `app/page.tsx`, `app/home.css`, `public/hero.svg` | HOME-001..019, DSK-004, DSK-005, OK-HOME-1/2/3 |
| B2 | `app/shop/*`, `app/help/*` | DLG-001..009, OK-DLG-1/2, MOB-010, MOB-012, MOB-013, DSK-003, DSK-006, MISC-001..014, OK-MISC-1 |
| B3 | `app/product/*`, `app/orders/*` | TAB-001..011, OK-TAB-1/2, MOB-004/005/006, DSK-002, TBL-001..014, OK-TBL-1, MOB-008 |
| B4 | `app/account/*`, `app/checkout/*` | SVG-001..014, OK-SVG-1/2/3, MOB-007, FRM-001..013, OK-FRM-1/2, MOB-011 |

Each agent writes only its page files plus `expected/fragments/<page-id>.md` (B2: `dialogs.md`, `misc.md`, etc.; one file per page id). They never edit `_components`, `layout.tsx` or `globals.css`: if a class is missing, add it to the page's own css file. Pages stay under ~450 lines (split inner components into `app/<route>/_parts/*.tsx` when needed).

**Fragment row format (8 columns, no header):**
`| ID | page-id | selector | what is wrong | WCAG SC | expected checker signal | interaction yes/no | viewport desktop|mobile|both |`
Example: `| MOB-005 | tabs | [data-pet-issue~="MOB-005"] | Quantity stepper buttons are 20px at <=767px | 2.5.8 | target-size | no | mobile |`. Selector is `[data-pet-issue~="ID"]`. Correct controls use `OK-` IDs: "CORRECT: ..." in column 4 and "must NOT be flagged" in column 6. The Leader merges fragments into ISSUES.md (adding column 8) and the old 7-column rows get viewport `both`.

## 7. Realism rules for implementers
- Every page needs 6-10 real sections, real names/prices, working internal links between the 7 routes (`next/link`), no `href="#"` except where a defect mandates it.
- Use `ProductArt` and CSS gradients for imagery; no remote URLs; data-URI SVGs allowed.
- Polished parts must really be correct (visible 2px `--c-focus` ring via `.ok`, 44px targets, AA contrast, proper labels). A false positive on them is a fixture bug.

## 8. Conventions (carried over from SPEC.md, plus responsive rules)
- `'use client'` on every page and on Header; hydration-safe (no `Date.now()`, `Math.random()`, `window` in render; fixed fake dates as strings).
- `data-pet-issue="ID"` on the defective element (space-separated for several; absence defects tag the closest container). Instance counts go in fragment column 4. Source comments MAY name IDs; DOM/visible text/aria/ids/classes must not hint.
- Invalid ARIA via `as unknown as React.HTMLAttributes<HTMLElement>` spreads or hyphenated typos, as in SPEC.
- **Mobile vs desktop is CSS-driven:** viewport-specific markup is always rendered and swapped with media queries (`display:none` at the other size), so the DOM/a11y tree at 390px really differs while SSR and client markup stay identical. Use `display:none` for clean swaps; use `opacity/transform/clip` only where the defect is the leaky hiding (GLB-008, MOB-002, DSK-006). No JS media-query branching of markup. If behavior (not markup) needs the viewport, use `matchMedia` inside `useEffect` after mount with initial state `false`.
- Interaction-only defects still tag the element that exists in that state; add `interaction yes` in the fragment.
- Do not run npm/next; the Leader builds and runs `pet:up` / `pet:verify`.
