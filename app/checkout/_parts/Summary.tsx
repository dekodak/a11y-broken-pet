'use client';

import { useState } from 'react';
import ProductArt from '../../_components/ProductArt';
import { formatPrice, products } from '../../_data/products';

export const cartLines = [
  { id: 'moss-trail', qty: 1 },
  { id: 'larch-45', qty: 1 },
  { id: 'heron-filter', qty: 2 },
];

export function cartSubtotal(): number {
  return cartLines.reduce((sum, line) => sum + (products.find((p) => p.id === line.id)?.price ?? 0) * line.qty, 0);
}

interface SummaryProps {
  shipping: number;
  discount: number;
}

function Lines({ shipping, discount }: SummaryProps) {
  const subtotal = cartSubtotal();
  const total = subtotal - discount + shipping;
  return (
    <>
      <ul className="co-items">
        {cartLines.map((line, i) => {
          const p = products.find((x) => x.id === line.id);
          if (!p) return null;
          return (
            <li key={p.id}>
              <div className="thumb"><ProductArt kind={p.kind} tone={((i % 3) + 1) as 1 | 2 | 3} /></div>
              <span className="name">{p.name}<br /><span className="muted">Qty {line.qty}</span></span>
              <span>{formatPrice(p.price * line.qty)}</span>
            </li>
          );
        })}
      </ul>
      <dl className="co-totals">
        <dt>Subtotal</dt><dd>{formatPrice(subtotal)}</dd>
        {discount > 0 ? (<><dt>Promo</dt><dd>-{formatPrice(discount)}</dd></>) : null}
        <dt>Shipping</dt><dd>{shipping === 0 ? 'Free' : formatPrice(shipping)}</dd>
        <dt className="grand">Total</dt><dd className="grand">{formatPrice(total)}</dd>
      </dl>
    </>
  );
}

export function SummaryAside(props: SummaryProps) {
  return (
    <aside className="co-summary co-aside" aria-labelledby="summary-heading">
      <h2 id="summary-heading">Order summary</h2>
      <Lines {...props} />
    </aside>
  );
}

export function SummaryCollapse(props: SummaryProps) {
  const [open, setOpen] = useState(false);
  const total = cartSubtotal() - props.discount + props.shipping;
  return (
    <div className="co-mobile-sum">
      {/* MOB-011: div toggle, not a button, no expanded state */}
      <div className={`co-toggle${open ? ' open' : ''}`} onClick={() => setOpen(!open)} data-pet-issue="MOB-011">
        <span>Order summary {formatPrice(total)}</span>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M6 9l6 6 6-6" /></svg>
      </div>
      {open ? <div className="co-mobile-panel"><Lines {...props} /></div> : null}
    </div>
  );
}
