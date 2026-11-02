import { useState } from 'react';

const ACTIONS = ['Save to wishlist', 'Compare with another tent', 'Copy product link'];

export default function CardMenu({ name }: { name: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="card-menu">
      {/* DLG-007: aria-controls references an id that does not exist */}
      <button
        type="button"
        className="icon-btn card-menu-btn ok"
        aria-label={`More options for ${name}`}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls="actions-menu-x"
        onClick={() => setOpen((v) => !v)}
        data-pet-issue="DLG-007"
      >
        <span aria-hidden="true">⋯</span>
      </button>
      {open ? (
        <div className="card-menu-list" data-pet-issue="DLG-007">
          {ACTIONS.map((a) => (
            <div key={a} className="card-menu-item" onClick={() => setOpen(false)}>{a}</div>
          ))}
        </div>
      ) : null}
    </div>
  );
}
