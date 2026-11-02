'use client';

import Link from 'next/link';
import { useState } from 'react';
import Button from '../../_components/Button';
import { formatPrice, products } from '../../_data/products';
import Wrap from './Wrap';

type SortKey = 'name' | 'weight' | 'price';
const weights: Record<string, number> = {
  'ridgeback-2p': 2.1, 'larch-45': 1.3, 'moss-trail': 1.1, 'alder-down': 0.6,
  'cinder-stove': 0.2, 'heron-filter': 0.3, 'birch-bag': 1.0, 'sedge-poles': 0.5,
};

export function PriceListSection() {
  const [key, setKey] = useState<SortKey>('name');
  const [asc, setAsc] = useState(true);
  const sort = (next: SortKey) => {
    if (next === key) setAsc(!asc);
    else {
      setKey(next);
      setAsc(true);
    }
  };
  const glyph = (k: SortKey) => (k === key ? (asc ? '▲' : '▼') : '↕');
  const rows = [...products].sort((a, b) => {
    const diff = key === 'name' ? a.name.localeCompare(b.name) : key === 'weight' ? weights[a.id] - weights[b.id] : a.price - b.price;
    return asc ? diff : -diff;
  });
  return (
    <section className="card" id="prices">
      <h2>Price list</h2>
      <p className="muted">Click a column heading to re-order the list.</p>
      <Wrap label="Price list">
        <table className="o-sortable">
          <caption>Current prices and packed weights</caption>
          <thead>
            <tr>
              {/* TBL-005: div click targets inside th. TBL-006: two th with aria-sort. TBL-007: aria-sort on a td. */}
              <th aria-sort="ascending" data-pet-issue="TBL-006">
                <div className="o-sort" onClick={() => sort('name')} data-pet-issue="TBL-005">Item {glyph('name')}</div>
              </th>
              <th aria-sort="ascending" data-pet-issue="TBL-006">
                <div className="o-sort" onClick={() => sort('weight')} data-pet-issue="TBL-005">Weight {glyph('weight')}</div>
              </th>
              <td aria-sort="descending" data-pet-issue="TBL-007">
                <div className="o-sort" onClick={() => sort('price')} data-pet-issue="TBL-005"><b>Price {glyph('price')}</b></div>
              </td>
            </tr>
          </thead>
          <tbody>
            {rows.map((p) => (
              <tr key={p.id}>
                <td>{p.name}</td>
                <td>{weights[p.id].toFixed(1)} kg</td>
                <td>{formatPrice(p.price)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Wrap>
    </section>
  );
}

const saved = [products[2], products[5], products[7], products[6]];

export function SavedSection() {
  const [items, setItems] = useState(saved);
  const [picked, setPicked] = useState<string[]>([]);
  const toggle = (id: string) => setPicked((cur) => (cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id]));
  const toggleAll = () => setPicked(picked.length === items.length ? [] : items.map((i) => i.id));
  const remove = () => {
    setItems(items.filter((i) => !picked.includes(i.id)));
    setPicked([]);
  };
  return (
    <section className="card" id="saved">
      <h2>Saved items</h2>
      <div className="cluster o-bulk">
        <Button variant="secondary" disabled={picked.length === 0} onClick={remove}>Remove selected</Button>
        <span className="muted" role="status">{picked.length} selected</span>
      </div>
      {items.length === 0 ? (
        <p>Your saved list is empty. Browse the <Link href="/shop" className="ok">shop</Link> to find something.</p>
      ) : (
        <Wrap label="Saved items">
          <table>
            <caption className="sr-only">Saved items</caption>
            <thead>
              <tr>
                <th>
                  {/* TBL-010: select-all and row checkboxes have no label */}
                  <input type="checkbox" checked={picked.length === items.length} onChange={toggleAll} data-pet-issue="TBL-010" />
                </th>
                <th>Item</th>
                <th>Price</th>
                {/* TBL-011: empty header over the actions column */}
                <th data-pet-issue="TBL-011"></th>
              </tr>
            </thead>
            <tbody>
              {items.map((p) => (
                <tr key={p.id}>
                  <td><input type="checkbox" checked={picked.includes(p.id)} onChange={() => toggle(p.id)} data-pet-issue="TBL-010" /></td>
                  <td>{p.name}</td>
                  <td>{formatPrice(p.price)}</td>
                  <td><Button variant="ghost" aria-label={`Add ${p.name} to cart`}>Add to cart</Button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </Wrap>
      )}
    </section>
  );
}
