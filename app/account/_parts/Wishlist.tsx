'use client';

import { useState } from 'react';
import ProductArt from '../../_components/ProductArt';
import { formatPrice, products } from '../../_data/products';

const initialIds = ['larch-45', 'moss-trail', 'heron-filter', 'sedge-poles'];

const arrow = (up: boolean) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
    <path d={up ? 'M6 15l6-6 6 6' : 'M6 9l6 6 6-6'} />
  </svg>
);

export default function Wishlist() {
  const [ids, setIds] = useState(initialIds);
  const [dragging, setDragging] = useState<number | null>(null);
  const [over, setOver] = useState<number | null>(null);
  const [message, setMessage] = useState('');
  const items = ids.flatMap((id) => products.filter((p) => p.id === id));

  const move = (from: number, to: number) => {
    if (to < 0 || to >= ids.length || from === to) return;
    const next = [...ids];
    const [moved] = next.splice(from, 1);
    next.splice(to, 0, moved);
    setIds(next);
    const name = products.find((p) => p.id === moved)?.name ?? 'Item';
    setMessage(`${name} moved to position ${to + 1} of ${next.length}`);
  };

  return (
    <section id="wishlist" className="card acc-wide" aria-labelledby="wishlist-heading">
      <h3 id="wishlist-heading">Wishlist</h3>
      <p className="muted">Put what you want most at the top.</p>
      <ul className="acc-wl">
        {items.map((item, index) => (
          <li
            key={item.id}
            className={over === index && dragging !== null ? 'over' : undefined}
            draggable
            onDragStart={() => setDragging(index)}
            onDragOver={(e) => { e.preventDefault(); setOver(index); }}
            onDrop={() => { if (dragging !== null) move(dragging, index); setDragging(null); setOver(null); }}
            onDragEnd={() => { setDragging(null); setOver(null); }}
          >
            {/* MOB-007: drag handle is the only reorder control on small screens */}
            <span className="acc-grip" data-pet-issue="MOB-007">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
                <circle cx="9" cy="6" r="1.6" /><circle cx="15" cy="6" r="1.6" /><circle cx="9" cy="12" r="1.6" /><circle cx="15" cy="12" r="1.6" /><circle cx="9" cy="18" r="1.6" /><circle cx="15" cy="18" r="1.6" />
              </svg>
            </span>
            <div className="acc-wl-art"><ProductArt kind={item.kind} tone={((index % 3) + 1) as 1 | 2 | 3} /></div>
            <div className="acc-wl-name">{item.name}<span>{formatPrice(item.price)}</span></div>
            {/* OK-SVG-3: labelled move buttons */}
            <div className="acc-move" data-pet-issue="OK-SVG-3">
              <button type="button" className="ok" aria-label={`Move ${item.name} up`} disabled={index === 0} onClick={() => move(index, index - 1)}>{arrow(true)}</button>
              <button type="button" className="ok" aria-label={`Move ${item.name} down`} disabled={index === items.length - 1} onClick={() => move(index, index + 1)}>{arrow(false)}</button>
            </div>
          </li>
        ))}
      </ul>
      <p className="sr-only" role="status">{message}</p>
    </section>
  );
}
