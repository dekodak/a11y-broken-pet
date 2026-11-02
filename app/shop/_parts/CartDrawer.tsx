import { useState } from 'react';
import Button from '../../_components/Button';
import Icon from '../../_components/Icon';
import ProductArt from '../../_components/ProductArt';
import { formatPrice, products } from '../../_data/products';

const START_LINES = [
  { id: 'ridgeback-2p', qty: 1 },
  { id: 'larch-45', qty: 1 },
];

export default function CartDrawer() {
  const [open, setOpen] = useState(false);
  const [lines, setLines] = useState(START_LINES);
  const count = lines.reduce((sum, l) => sum + l.qty, 0);
  const subtotal = lines.reduce((sum, l) => sum + l.qty * (products.find((p) => p.id === l.id)?.price ?? 0), 0);
  const close = () => setOpen(false);
  const setQty = (id: string, raw: string) => {
    const qty = Math.max(0, Number.parseInt(raw, 10) || 0);
    setLines((prev) => prev.map((l) => (l.id === id ? { ...l, qty } : l)));
  };
  return (
    <>
      {/* DLG-001: trigger lacks aria-haspopup / aria-expanded / aria-controls */}
      <Button className="cart-bar" onClick={() => setOpen(true)} data-pet-issue="DLG-001">
        <Icon name="cart" size={20} />
        View cart ({count})
      </Button>
      {open ? (
        <>
          <div className="drawer-backdrop" onClick={close} />
          {/* DLG-002 no role/name; DLG-003 no focus management, Esc, trap or inert background */}
          <div className="drawer" data-pet-issue="DLG-002 DLG-003">
            <div className="drawer-head">
              <div className="drawer-title">Your cart</div>
              {/* DLG-004: span close control */}
              <span className="x" onClick={close} data-pet-issue="DLG-004">×</span>
            </div>
            <ul className="drawer-lines">
              {lines.map((l) => {
                const p = products.find((x) => x.id === l.id);
                if (!p) return null;
                return (
                  <li key={l.id}>
                    <div className="line-art"><ProductArt kind={p.kind} tone={l.id === 'larch-45' ? 2 : 1} /></div>
                    <div className="line-info">
                      <p><strong>{p.name}</strong></p>
                      <p className="muted">{formatPrice(p.price)} each</p>
                      <div className="line-qty">
                        <span>Qty</span>
                        {/* DLG-009: number input without label */}
                        <input type="number" min={0} max={9} value={l.qty} onChange={(e) => setQty(l.id, e.target.value)} data-pet-issue="DLG-009" />
                      </div>
                    </div>
                    <p className="price">{formatPrice(p.price * l.qty)}</p>
                  </li>
                );
              })}
            </ul>
            <div className="drawer-foot">
              <div className="drawer-sum"><span>Subtotal</span><span>{formatPrice(subtotal)}</span></div>
              <Button href="/checkout">Go to checkout</Button>
              <Button variant="ghost" onClick={close}>Keep shopping</Button>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
}
