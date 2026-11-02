'use client';

import Link from 'next/link';
import { useState } from 'react';
import Tabs, { type TabDef } from './Tabs';

const detailTabs: TabDef[] = [
  {
    id: 'description',
    label: 'Description',
    panel: (
      <div className="stack">
        <p>
          The Ridgeback is a two-person, three-season tent built for the kind of trip where the forecast is a polite
          suggestion. Two doors and two vestibules mean nobody climbs over anybody at 3 a.m.
        </p>
        <p>
          The pole set pitches inner and fly together in about six minutes, and the whole thing packs down to the size
          of a loaf of bread.
        </p>
      </div>
    ),
  },
  {
    id: 'features',
    label: 'Features',
    panel: (
      <ul className="pd-list">
        <li>Two doors, two vestibules with 0.9 m2 of storage each</li>
        <li>Colour-coded clips and a single hub pole set</li>
        <li>Recycled 20D ripstop fly, 3000 mm hydrostatic head</li>
        <li>Internal mesh pockets and a lantern loop</li>
      </ul>
    ),
  },
  {
    id: 'specs',
    label: 'Specs',
    panel: (
      <dl className="pd-specs">
        <dt>Packed weight</dt>
        <dd>2.1 kg</dd>
        <dt>Floor area</dt>
        <dd>3.0 m2</dd>
        <dt>Pitch time</dt>
        <dd>About 6 minutes</dd>
        <dt>Season rating</dt>
        <dd>3-season</dd>
      </dl>
    ),
  },
  {
    id: 'care',
    label: 'Care',
    panel: (
      <ol className="pd-list">
        <li>Shake out grit and dry fully before packing.</li>
        <li>Wipe the fly with cool water, no detergent.</li>
        <li>Store loose, away from direct sunlight.</li>
      </ol>
    ),
  },
];

const customerTabs: TabDef[] = [
  {
    id: 'reviews',
    label: 'Reviews',
    panel: (
      <div className="stack">
        <p className="muted">4.6 out of 5 from 128 reviews</p>
        <blockquote className="pd-quote">
          <p>Pitched it in a crosswind on the first try. Roomy for two with packs inside.</p>
          <footer className="muted">Ines, 14 Feb 2026</footer>
        </blockquote>
        <blockquote className="pd-quote">
          <p>A bit heavy next to ultralight models, but the vestibules are great.</p>
          <footer className="muted">Tomas, 2 Jan 2026</footer>
        </blockquote>
      </div>
    ),
  },
  {
    id: 'qa',
    label: 'Q&A',
    panel: (
      <dl className="pd-specs pd-qa">
        <dt>Does it come with a footprint?</dt>
        <dd>No, it is sold separately in the Tent + footprint bundle.</dd>
        <dt>Can two tall adults fit?</dt>
        <dd>Yes, the inner is 220 cm long.</dd>
      </dl>
    ),
  },
  {
    id: 'delivery',
    label: 'Delivery',
    panel: (
      <p>
        Standard delivery takes 2 to 4 working days and is free over EUR 75. Track an existing parcel from{' '}
        <Link href="/orders" className="ok">your orders</Link>.
      </p>
    ),
  },
];

const fitTabs: TabDef[] = [
  { id: 'trek', label: 'Trekking', panel: <p>Two people plus packs, one night to a week. Pick the 2-person size and the Slate colour for stealth pitches.</p> },
  { id: 'base', label: 'Basecamp', panel: <p>Staying put? Add the footprint and use the vestibules as a gear shed. Longer stays reward the extra floor space.</p> },
  { id: 'family', label: 'Family', panel: <p>One adult plus two small children fit in the 3-person size. Check the <Link href="/orders#compare" className="ok">comparison table</Link> for floor areas.</p> },
];

const warrantyTabs: TabDef[] = [
  { id: 'cover', label: 'Coverage', panel: <p>Five years against faults in materials and stitching, from the date of delivery.</p> },
  { id: 'claims', label: 'Claims', panel: <p>Send us your order number and two photos. We reply within two working days.</p> },
  { id: 'repairs', label: 'Repairs', panel: <p>Pole breaks and torn fabric are repaired at cost. Postage is on us.</p> },
];

const bundles = [
  { id: 'solo', label: 'Tent only', body: 'The tent, pole set, pegs and a repair kit. EUR 389.00.' },
  { id: 'foot', label: 'Tent + footprint', body: 'Adds a fitted groundsheet that protects the floor. EUR 419.00.' },
  { id: 'kit', label: 'Camp kit', body: 'Tent, footprint, two Birch sleeping bags and a Cinder stove. EUR 779.00.', closable: true },
];

function BundleOptions() {
  const [active, setActive] = useState('solo');
  const [kitOpen, setKitOpen] = useState(true);
  const visible = bundles.filter((b) => b.id !== 'kit' || kitOpen);
  return (
    <div className="tabs">
      <div className="tablist">
        {visible.map((b) => (
          // TAB-007: role=tab divs outside a tablist, not focusable. TAB-010: nested close button.
          <div
            key={b.id}
            role="tab"
            id={`bundle-tab-${b.id}`}
            className={`tab${active === b.id ? ' active' : ''}`}
            aria-selected={active === b.id}
            onClick={() => setActive(b.id)}
            data-pet-issue={b.closable ? 'TAB-007 TAB-010' : 'TAB-007'}
          >
            {b.label}
            {b.closable ? (
              <button
                type="button"
                className="pd-tab-x"
                aria-label="Close camp kit"
                onClick={(event) => {
                  event.stopPropagation();
                  setKitOpen(false);
                  setActive('solo');
                }}
              >
                ×
              </button>
            ) : null}
          </div>
        ))}
      </div>
      {visible.map((b) => (
        <div key={b.id} role="tabpanel" className="tabpanel" id={`bundle-panel-${b.id}`} hidden={active !== b.id}>
          <p>{b.body}</p>
        </div>
      ))}
    </div>
  );
}

export function DetailsSection() {
  return (
    <section className="card" id="details">
      <h2>Details</h2>
      {/* TAB-001 no arrows, TAB-002 no aria-selected, TAB-003 no roving, TAB-004 panels unlabelled, TAB-009 unnamed tablist */}
      <Tabs
        id="det"
        tabs={detailTabs}
        keys="none"
        selectedAttr={false}
        roving={false}
        panelLabelled={false}
        listIssue="TAB-001 TAB-002 TAB-003 TAB-009"
        panelIssue="TAB-004"
      />
    </section>
  );
}

export function CustomerSection() {
  return (
    <section className="card" id="customer-info">
      <h2>Customer info</h2>
      {/* TAB-003 no roving, TAB-005 aria-controls dangling, TAB-006 no Home/End, TAB-011 active panel aria-hidden */}
      <Tabs
        id="ci"
        tabs={customerTabs}
        label="Customer info"
        keys="lr"
        roving={false}
        controls="missing"
        hideActivePanel
        listIssue="TAB-003 TAB-005 TAB-006"
        panelIssue="TAB-011"
      />
    </section>
  );
}

export function BundleSection() {
  return (
    <section className="card" id="bundles">
      <h2>Bundle options</h2>
      <BundleOptions />
    </section>
  );
}

export function FitSection() {
  return (
    <section className="card" id="fit">
      <h2>Fit finder</h2>
      {/* TAB-008: vertical tablist, only Left/Right handled */}
      <Tabs id="fit" tabs={fitTabs} label="Fit finder" vertical keys="lr" listIssue="TAB-008" />
    </section>
  );
}

export function WarrantySection() {
  return (
    <section className="card" id="warranty" data-pet-issue="OK-TAB-1">
      <h2>Warranty</h2>
      <Tabs id="war" tabs={warrantyTabs} label="Warranty" panelFocusable ok />
    </section>
  );
}
