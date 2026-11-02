'use client';

import Link from 'next/link';
import { useState } from 'react';
import './home.css';
import Button from './_components/Button';
import Icon from './_components/Icon';
import ProductArt from './_components/ProductArt';
import ProductCard from './_components/ProductCard';
import SectionHeading from './_components/SectionHeading';
import { products } from './_data/products';
import { withBase } from './_lib/withBase';

const svgUri = (svg: string) => `data:image/svg+xml,${encodeURIComponent(svg)}`;

const BANNER_SRC = svgUri(
  '<svg xmlns="http://www.w3.org/2000/svg" width="416" height="96" viewBox="0 0 416 96"><rect width="416" height="96" rx="8" fill="#1f4d38"/><text x="24" y="44" font-family="Georgia,serif" font-size="30" font-weight="700" fill="#ffffff">Trail Week: 30% off</text><text x="24" y="74" font-family="sans-serif" font-size="16" fill="#f4efe6">Tents, packs and boots until Sunday</text></svg>',
);
const RIDGE_SRC = svgUri(
  '<svg xmlns="http://www.w3.org/2000/svg" width="1440" height="48" viewBox="0 0 1440 48" preserveAspectRatio="none"><path d="M0 48 L0 30 L120 12 L230 34 L380 6 L520 32 L680 14 L820 38 L980 8 L1120 30 L1260 12 L1440 32 L1440 48Z" fill="#2f6b4f" opacity=".85"/></svg>',
);
const JOURNAL_PHOTO_SRC = svgUri(
  '<svg xmlns="http://www.w3.org/2000/svg" width="640" height="440" viewBox="0 0 640 440"><rect width="640" height="440" fill="#f0b97a"/><rect y="250" width="640" height="190" fill="#3f7a8a"/><path d="M0 250 L140 140 L260 230 L380 120 L520 230 L640 170 V250Z" fill="#314e45"/><path d="M250 330 L330 230 L410 330Z" fill="#2f6b4f"/><circle cx="500" cy="90" r="36" fill="#fff3d6"/></svg>',
);
const CUSTOMER_PHOTO_SRC = svgUri(
  '<svg xmlns="http://www.w3.org/2000/svg" width="112" height="112" viewBox="0 0 112 112"><rect width="112" height="112" fill="#cfe0d6"/><circle cx="56" cy="44" r="20" fill="#d9a77a"/><path d="M16 112c0-26 18-38 40-38s40 12 40 38z" fill="#d97b29"/></svg>',
);

const tiles = [
  { name: 'Tents', kind: 'tent', tone: 1 },
  { name: 'Packs', kind: 'pack', tone: 2 },
  { name: 'Boots', kind: 'boot', tone: 3 },
  { name: 'Layers', kind: 'jacket', tone: 1 },
] as const;

const tickerItems = [
  'Free delivery over EUR 75',
  '30-day returns on everything',
  'Repairs for the life of the gear',
  'Order by 3pm, ships today',
];

export default function HomePage() {
  const [promoOpen, setPromoOpen] = useState(true);
  const [activity, setActivity] = useState('hike');
  const [season, setSeason] = useState('spring');
  const [budget, setBudget] = useState('mid');
  const [likes, setLikes] = useState(24);
  const [query, setQuery] = useState('');

  const resetFinder = () => {
    setActivity('hike');
    setSeason('spring');
    setBudget('mid');
  };

  return (
    <div className="home">
      {promoOpen ? (
        <div className="promo-strip" data-pet-issue="HOME-018">
          <div className="container">
            <p>Spring Trail Week: up to 30% off tents and packs</p>
            {/* HOME-006 (3/3): close promo strip, icon only, no name */}
            <button type="button" data-pet-issue="HOME-006" onClick={() => setPromoOpen(false)}>
              <Icon name="close" />
            </button>
          </div>
        </div>
      ) : null}

      <section className="hero">
        <div className="container hero-grid">
          <div>
            {/* mobile copy: real text, dark ink */}
            <div className="hero-copy-mob">
              <h1>Gear for the long way round</h1>
              <p className="lead">Tents, packs, boots and layers for the trips you keep promising yourself.</p>
              <div className="hero-cta">
                <Button href="/shop">Shop tents</Button>
                <Button href="/product" variant="secondary">See the Ridgeback</Button>
              </div>
            </div>
            {/* DSK-005: desktop overlay copy, low contrast on the pale sky; DSK-004: banner is an image of text */}
            <div className="hero-copy-desk" data-pet-issue="DSK-005">
              <h1>Gear for the long way round</h1>
              <p className="lead">Tents, packs, boots and layers for the trips you keep promising yourself.</p>
              <div className="hero-cta">
                <Button href="/shop">Shop tents</Button>
                <Button href="/product" variant="secondary">See the Ridgeback</Button>
              </div>
              <img className="hero-banner" src={BANNER_SRC} alt="Banner" width={416} height={96} data-pet-issue="DSK-004" />
            </div>
            <div className="hero-search">
              <label className="sr-only" htmlFor="hero-q">Search gear</label>
              <input id="hero-q" type="search" className="input ok" placeholder="Search tents, boots, stoves" value={query} onChange={(e) => setQuery(e.target.value)} />
              {/* HOME-006 (1/3): hero search, icon only */}
              <button type="button" data-pet-issue="HOME-006"><Icon name="search" /></button>
            </div>
          </div>
          <div className="hero-art">
            {/* HOME-003: no alt attribute */}
            <img src={withBase('/hero.svg')} width={600} height={440} data-pet-issue="HOME-003" />
          </div>
        </div>
        {/* HOME-005: decorative divider with descriptive alt */}
        <img className="ridge" src={RIDGE_SRC} alt="Mountain ridge divider" width={1440} height={48} data-pet-issue="HOME-005" />
      </section>

      <section className="section container">
        <div className="tile-grid">
          {tiles.map((t) => (
            <div className="tile" key={t.name} data-pet-issue="HOME-017">
              <Link href="/shop" className="tile-img"><ProductArt kind={t.kind} tone={t.tone} /></Link>
              <Link href="/shop" className="tile-name ok">{t.name}</Link>
            </div>
          ))}
        </div>
      </section>

      <section className="section container">
        <div className="picks-head">
          {/* HOME-001: h1 jumps straight to h4 */}
          <h4 data-pet-issue="HOME-001">Trail Week picks</h4>
          <div className="cluster">
            {/* HOME-007: empty aria-label next to svg (featured heading tools, outside the polished grid) */}
            <button type="button" className="heart-btn" aria-label="" data-pet-issue="HOME-007">
              <Icon name="heart" />
            </button>
            {/* OK-HOME-1: correctly labelled icon button */}
            <button type="button" className="wish-btn ok" aria-label="Open wishlist" data-pet-issue="OK-HOME-1">
              <Icon name="heart" />
            </button>
          </div>
        </div>
        {/* OK-HOME-3: ProductCard grid */}
        <div className="grid-products" data-pet-issue="OK-HOME-3">
          {products.slice(0, 4).map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      <section className="section container">
        <div className="deal-band">
          <p className="deal-off">30%</p>
          <div className="stack">
            <h2>Trail Week runs until Sunday</h2>
            <p>
              Up to 30% off tents and packs. For this week&apos;s deals, <Link href="/shop" data-pet-issue="HOME-011">click here</Link>. Buying
              for someone else? For the gift guide, <Link href="/product" data-pet-issue="HOME-011">click here</Link>.
            </p>
          </div>
          <Button href="/shop" variant="secondary">Shop the sale</Button>
        </div>
      </section>

      <section className="section container">
        <SectionHeading level={2} eyebrow="Why Fernwick">Gear that earns its place in the pack</SectionHeading>
        <div className="usp">
          <div className="usp-card">
            {/* HOME-002: empty heading */}
            <h3 data-pet-issue="HOME-002"></h3>
            <Icon name="home" size={32} />
            <h3>Free delivery over EUR 75</h3>
            <p>Standard shipping is on us, express is a few euros extra.</p>
          </div>
          <div className="usp-card">
            <Icon name="leaf" size={32} />
            <h3>30-day returns</h3>
            <p>Try it in the garden. If it is not right, send it back.</p>
          </div>
          <div className="usp-card">
            <Icon name="gear" size={32} />
            <h3>Repairs for life</h3>
            <p>Torn a seam? Our workshop patches it for the price of a coffee.</p>
          </div>
        </div>
        {/* HOME-013: real content in low-contrast text */}
        <p className="fine muted-low" data-pet-issue="HOME-013">Free delivery over EUR 75, 30-day returns.</p>
      </section>

      <section className="section container">
        <div className="finder">
          <SectionHeading level={2} eyebrow="Gear finder">Not sure where to start?</SectionHeading>
          <div className="finder-fields">
            <div className="field">
              <label htmlFor="gf-activity">Activity</label>
              <select id="gf-activity" className="input ok" value={activity} onChange={(e) => setActivity(e.target.value)}>
                <option value="hike">Day hiking</option>
                <option value="camp">Camping</option>
                <option value="trek">Multi-day trekking</option>
              </select>
            </div>
            <div className="field">
              <label htmlFor="gf-season">Season</label>
              <select id="gf-season" className="input ok" value={season} onChange={(e) => setSeason(e.target.value)}>
                <option value="spring">Spring</option>
                <option value="summer">Summer</option>
                <option value="winter">Winter</option>
              </select>
            </div>
            <div className="field">
              <label htmlFor="gf-budget">Budget</label>
              <select id="gf-budget" className="input ok" value={budget} onChange={(e) => setBudget(e.target.value)}>
                <option value="low">Under EUR 100</option>
                <option value="mid">EUR 100 to 250</option>
                <option value="high">Over EUR 250</option>
              </select>
            </div>
          </div>
          <div className="finder-actions">
            <Button href="/shop">Show matching gear</Button>
            {/* HOME-010: anchor with onClick and no href */}
            <a className="finder-reset" onClick={resetFinder} data-pet-issue="HOME-010">Reset</a>
          </div>
        </div>
      </section>

      <section className="section container">
        <div className="journal">
          <div>
            <SectionHeading level={2} eyebrow="From the Journal">Three nights on the Cinder Ridge</SectionHeading>
            {/* HOME-014: inline links, colour is the only cue */}
            <p data-pet-issue="HOME-014">
              We packed the <Link className="inline-link" href="/product">Ridgeback 2P</Link> and a week of{' '}
              <Link className="inline-link" href="/orders">trail snacks</Link> and went looking for quiet. Here is what worked and what we left at home.
            </p>
            <div className="cluster">
              {/* HOME-015: opens a new tab without warning */}
              <Link href="/help" target="_blank" className="btn btn-secondary ok" data-pet-issue="HOME-015">Read the Journal</Link>
              {/* HOME-012: positive tabindex */}
              <Link href="/help" tabIndex={3} className="btn btn-ghost ok" data-pet-issue="HOME-012">Find a store</Link>
              {/* HOME-006 (2/3): store menu, icon only */}
              <button type="button" className="heart-btn" data-pet-issue="HOME-006"><Icon name="store" /></button>
            </div>
            <figure className="quote">
              {/* HOME-016: French text without lang */}
              <p data-pet-issue="HOME-016">Une tente légère, solide et facile à monter. Je la recommande à tous mes amis randonneurs.</p>
              <figcaption className="quote-who">
                {/* HOME-004: filename as alt */}
                <img className="customer-photo" src={CUSTOMER_PHOTO_SRC} alt="IMG_4032.jpg" width={56} height={56} data-pet-issue="HOME-004" />
                <span>Camille, Chamonix</span>
                {/* HOME-009: div role=button, no keyboard support */}
                <div role="button" className="home-like" onClick={() => setLikes(likes + 1)} data-pet-issue="HOME-009">Like {likes}</div>
              </figcaption>
            </figure>
          </div>
          {/* OK-HOME-2: descriptive alt */}
          <img
            className="journal-photo"
            src={JOURNAL_PHOTO_SRC}
            alt="A green tent pitched beside a mountain lake at sunset"
            width={640}
            height={440}
            data-pet-issue="OK-HOME-2"
          />
        </div>
      </section>

      <section className="section container">
        <div className="follow">
          <SectionHeading level={2} eyebrow="Community">Share your trail</SectionHeading>
          <div className="follow-links">
            {/* HOME-008 x3: link with an empty glyph only */}
            <a href={withBase('/help')} data-pet-issue="HOME-008"><i className="glyph" /></a>
            <a href={withBase('/account')} data-pet-issue="HOME-008"><i className="glyph" /></a>
            <a href={withBase('/orders')} data-pet-issue="HOME-008"><i className="glyph" /></a>
          </div>
        </div>
        <div className="cluster">
          <Button href="/checkout" variant="secondary">Go to checkout</Button>
        </div>
      </section>

      {/* HOME-019: endless marquee, no pause, no reduced-motion handling */}
      <div className="ticker" data-pet-issue="HOME-019">
        <div className="ticker-track">
          {tickerItems.map((t) => (<span key={t}>{t}</span>))}
          {tickerItems.map((t) => (<span key={`${t}-2`} aria-hidden="true">{t}</span>))}
        </div>
      </div>
    </div>
  );
}
