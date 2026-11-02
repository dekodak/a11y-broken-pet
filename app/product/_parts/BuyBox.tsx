'use client';

import Link from 'next/link';
import { useState } from 'react';
import Button from '../../_components/Button';
import Icon from '../../_components/Icon';
import { formatPrice, products } from '../../_data/products';

const product = products[0];
const colours = [
  { id: 'moss', label: 'Moss', hex: '#4f7a5c' },
  { id: 'sand', label: 'Sand', hex: '#d9c7a1' },
  { id: 'slate', label: 'Slate', hex: '#5b6b7a' },
];
const sizes = [
  { id: '2p', label: '2 person' },
  { id: '3p', label: '3 person (+ EUR 60.00)' },
];

interface BuyBoxProps {
  qty: number;
  onQty: (value: number) => void;
  added: boolean;
  onAdd: () => void;
}

export default function BuyBox({ qty, onQty, added, onAdd }: BuyBoxProps) {
  const [colour, setColour] = useState('moss');
  const [size, setSize] = useState('2p');
  const clamp = (value: number) => Math.min(9, Math.max(1, value || 1));

  return (
    <div className="pd-buy">
      <p className="eyebrow">Tents / 3-season</p>
      <h1>{product.name}</h1>
      <p className="pd-rating">
        <span className="stars">
          <Icon name="star" size={16} />
          <Icon name="star" size={16} />
          <Icon name="star" size={16} />
          <Icon name="star" size={16} />
          <Icon name="star" size={16} />
        </span>
        <a href="#customer-info" className="ok">
          {product.rating.toFixed(1)} out of 5, {product.reviews} reviews
        </a>
      </p>
      <p className="price">{formatPrice(product.price)}</p>
      <p>A roomy two-door tent that packs small. Free delivery over EUR 75 and 30-day returns.</p>
      <ul className="pd-facts">
        <li>2.1 kg packed</li>
        <li>3-season</li>
        <li>Sleeps 2</li>
      </ul>

      {/* OK-TAB-2: colour and size pickers are clean radio fieldsets */}
      <div data-pet-issue="OK-TAB-2">
        <fieldset>
          <legend>Colour</legend>
          <div className="opt">
            {colours.map((c) => (
              <label key={c.id} htmlFor={`pd-colour-${c.id}`}>
                <input
                  className="ok"
                  type="radio"
                  name="pd-colour"
                  id={`pd-colour-${c.id}`}
                  checked={colour === c.id}
                  onChange={() => setColour(c.id)}
                />
                <span className="pd-swatch" style={{ background: c.hex }} aria-hidden="true" />
                {c.label}
              </label>
            ))}
          </div>
        </fieldset>
        <fieldset>
          <legend>Size</legend>
          <div className="opt">
            {sizes.map((s) => (
              <label key={s.id} htmlFor={`pd-size-${s.id}`}>
                <input
                  className="ok"
                  type="radio"
                  name="pd-size"
                  id={`pd-size-${s.id}`}
                  checked={size === s.id}
                  onChange={() => setSize(s.id)}
                />
                {s.label}
              </label>
            ))}
          </div>
        </fieldset>
      </div>

      <div className="pd-qty-row">
        <label htmlFor="pd-qty">Quantity</label>
        <div className="qty">
          <button type="button" className="ok" aria-label="Decrease quantity" data-pet-issue="MOB-005" onClick={() => onQty(clamp(qty - 1))}>
            −
          </button>
          <input
            id="pd-qty"
            type="number"
            inputMode="numeric"
            min={1}
            max={9}
            value={qty}
            onChange={(event) => onQty(clamp(Number(event.target.value)))}
          />
          <button type="button" className="ok" aria-label="Increase quantity" data-pet-issue="MOB-005" onClick={() => onQty(clamp(qty + 1))}>
            +
          </button>
        </div>
      </div>

      <div className="cluster">
        <Button onClick={onAdd}>Add to cart</Button>
        <Button variant="secondary" href="/shop">Keep shopping</Button>
      </div>
      <p role="status" className="muted pd-status">
        {added ? `Added ${qty} to your cart.` : ''}
      </p>
      <p className="pd-links">
        <Link href="/orders#sizing" className="ok">Sizing and floor-area charts</Link>
        {' / '}
        <Link href="/orders" className="ok">Track an order</Link>
      </p>
    </div>
  );
}
