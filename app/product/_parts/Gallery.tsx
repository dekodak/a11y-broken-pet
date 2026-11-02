'use client';

import { useState } from 'react';
import ProductArt from '../../_components/ProductArt';

const views: Array<{ caption: string; tone: 1 | 2 | 3 }> = [
  { caption: 'Front view, doors closed', tone: 1 },
  { caption: 'Vestibule open', tone: 2 },
  { caption: 'Packed size', tone: 3 },
  { caption: 'Inside, looking up', tone: 1 },
];

/** Mobile gallery. MOB-006: swipe-only snap strip, dots are spans, no prev/next, thumbnails not rendered. */
export function GalleryStrip() {
  return (
    <div className="pd-gallery-m">
      <div className="pd-strip" data-pet-issue="MOB-006">
        {views.map((view, index) => (
          <figure className="pd-slide" key={view.caption}>
            <ProductArt kind="tent" tone={view.tone} />
            <figcaption>
              Photo {index + 1} of {views.length}: {view.caption}
            </figcaption>
          </figure>
        ))}
      </div>
      <div className="pd-dots">
        {views.map((view, index) => (
          <span key={view.caption} className={index === 0 ? 'on' : undefined} />
        ))}
      </div>
    </div>
  );
}

/** Desktop gallery with real thumbnail buttons. */
export function GalleryDesktop() {
  const [selected, setSelected] = useState(0);
  const current = views[selected];
  return (
    <div className="pd-gallery-d">
      <figure className="pd-main">
        <div className="pd-main-art">
          <ProductArt kind="tent" tone={current.tone} />
        </div>
        <figcaption>{current.caption}</figcaption>
      </figure>
      <ul className="pd-thumbs">
        {views.map((view, index) => (
          <li key={view.caption}>
            <button
              type="button"
              className="ok pd-thumb"
              aria-pressed={index === selected}
              aria-label={`Show photo ${index + 1} of ${views.length}: ${view.caption}`}
              onClick={() => setSelected(index)}
            >
              <ProductArt kind="tent" tone={view.tone} />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
