'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import Breadcrumbs from '../_components/Breadcrumbs';
import Button from '../_components/Button';
import ProductCard from '../_components/ProductCard';
import SectionHeading from '../_components/SectionHeading';
import { products } from '../_data/products';
import CardMenu from './_parts/CardMenu';
import CartDrawer from './_parts/CartDrawer';
import FilterFields, { DEFAULT_FILTERS, matchesFilters, type FilterState } from './_parts/Filters';
import ReturnsTip from './_parts/ReturnsTip';
import ShareModal from './_parts/ShareModal';
import SizeGuide from './_parts/SizeGuide';
import './shop.css';

type SortKey = 'featured' | 'low' | 'high' | 'rating';

const GUIDES = [
  { title: 'Choosing a tent', text: 'Season ratings, pole types and how much room two people really need.', href: '/product', cta: 'See the Ridgeback 2P' },
  { title: 'Sizing and fit', text: 'Boot, pack and jacket charts in one place, with a fit finder.', href: '/orders', cta: 'Open sizing charts' },
  { title: 'Need a hand?', text: 'Delivery, returns and repairs answered by people who camp.', href: '/help', cta: 'Visit the help centre' },
];

export default function Page() {
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS);
  const [sort, setSort] = useState<SortKey>('featured');
  const [sheetOpen, setSheetOpen] = useState(false);

  const visible = useMemo(() => {
    const list = products.filter((p) => matchesFilters(p, filters));
    if (sort === 'low') list.sort((a, b) => a.price - b.price);
    if (sort === 'high') list.sort((a, b) => b.price - a.price);
    if (sort === 'rating') list.sort((a, b) => b.rating - a.rating);
    return list;
  }, [filters, sort]);

  const activeCount = filters.categories.length + filters.brands.length + (filters.price === 'any' ? 0 : 1);
  const clear = () => setFilters(DEFAULT_FILTERS);

  return (
    <div className="page">
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Camp & Trail' }]} />
      <div className="shop-head">
        <div>
          <h1>Camp &amp; Trail</h1>
          <p className="lead">Everything for three nights out, from the first tent peg to the last brew.</p>
        </div>
        <div className="shop-actions">
          <ReturnsTip />
          <SizeGuide />
          <ShareModal />
        </div>
      </div>

      <div className="shop-layout">
        <aside className="filters-side" aria-label="Filters">
          <div className="filters-head">
            <h2>Filters</h2>
            {activeCount > 0 ? <Button variant="ghost" onClick={clear}>Clear all</Button> : null}
          </div>
          <FilterFields state={filters} onChange={setFilters} prefix="side" tagged />
        </aside>

        <section aria-label="Products">
          <div className="shop-toolbar">
            <Button variant="secondary" className="filters-open" onClick={() => setSheetOpen(true)}>
              Filters{activeCount > 0 ? ` (${activeCount})` : ''}
            </Button>
            <p className="muted">{visible.length} {visible.length === 1 ? 'item' : 'items'}</p>
            <div className="sort-field">
              <label htmlFor="shop-sort">Sort by</label>
              <select id="shop-sort" value={sort} onChange={(e) => setSort(e.target.value as SortKey)}>
                <option value="featured">Featured</option>
                <option value="low">Price, low to high</option>
                <option value="high">Price, high to low</option>
                <option value="rating">Best rated</option>
              </select>
            </div>
          </div>
          {visible.length === 0 ? (
            <div className="shop-empty">
              <p>Nothing matches those filters yet.</p>
              <Button variant="secondary" onClick={clear}>Clear all filters</Button>
            </div>
          ) : (
            <div className="grid-products">
              {visible.map((p) => (
                <ProductCard
                  key={p.id}
                  product={p}
                  titleClamp
                  quickAdd="hover"
                  more={p.id === 'ridgeback-2p' ? <CardMenu name={p.name} /> : undefined}
                />
              ))}
            </div>
          )}
        </section>
      </div>

      {/* MOB-012: filters bottom sheet without dialog semantics, name, trap or Esc */}
      {sheetOpen ? (
        <>
          <div className="sheet-backdrop" onClick={() => setSheetOpen(false)} />
          <div className="sheet" data-pet-issue="MOB-012">
            <div className="sheet-grip" />
            <div className="sheet-title">Filters</div>
            <FilterFields state={filters} onChange={setFilters} prefix="sheet" />
            <Button onClick={() => setSheetOpen(false)}>Show {visible.length} {visible.length === 1 ? 'item' : 'items'}</Button>
          </div>
        </>
      ) : null}

      <CartDrawer />

      <section className="guides">
        <SectionHeading level={2} eyebrow="Before you buy">Guides from the workshop</SectionHeading>
        <div className="grid-3">
          {GUIDES.map((g) => (
            <article key={g.title} className="card guide-card">
              <h3>{g.title}</h3>
              <p>{g.text}</p>
              <Link href={g.href} className="ok">{g.cta}</Link>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
