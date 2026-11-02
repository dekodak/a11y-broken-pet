'use client';

import Link from 'next/link';

const memberFacts = [
  { label: 'Member since', value: 'March 2021' },
  { label: 'Tier', value: 'Trailhead' },
  { label: 'Orders', value: '14' },
  { label: 'Points', value: '1,280' },
];

export default function ProfileCard() {
  return (
    <section className="card acc-wide" aria-labelledby="profile-heading">
      <div className="acc-head">
        {/* SVG-003: role img, no accessible name */}
        <svg className="acc-avatar" viewBox="0 0 64 64" role="img" data-pet-issue="SVG-003">
          <circle cx="32" cy="32" r="32" fill="#dfe9df" />
          <circle cx="32" cy="25" r="11" fill="#2f6b4f" />
          <path d="M10 56c3-12 13-17 22-17s19 5 22 17a32 32 0 0 1-44 0z" fill="#2f6b4f" />
        </svg>
        <div className="acc-head-main">
          <p className="eyebrow">Member dashboard</p>
          <h2 id="profile-heading">Good to see you, Maren</h2>
          <p className="muted" style={{ margin: 0 }}>maren.hale@example.com</p>
        </div>
        <div className="acc-tools">
          {/* SVG-013: emoji only button */}
          <button type="button" data-pet-issue="SVG-013"><span>🔔</span></button>
          {/* SVG-006: link with svg only */}
          <Link href="/help" data-pet-issue="SVG-006">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round">
              <circle cx="12" cy="12" r="3" />
              <path d="M12 2.5v3M12 18.5v3M2.5 12h3M18.5 12h3M5.3 5.3l2.1 2.1M16.6 16.6l2.1 2.1M18.7 5.3l-2.1 2.1M7.4 16.6l-2.1 2.1" />
            </svg>
          </Link>
        </div>
      </div>
      <dl className="acc-facts">
        {memberFacts.map((fact) => (
          <div key={fact.label}>
            <dt>{fact.label}</dt>
            <dd>{fact.value}</dd>
          </div>
        ))}
      </dl>
      <div className="acc-alert">
        {/* SVG-002: aria-label without a role */}
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinejoin="round" aria-label="Warning" data-pet-issue="SVG-002">
          <path d="M12 3l10 18H2z" />
          <path d="M12 10v5M12 17.8v.2" />
        </svg>
        <span>Your saved card ending 4417 expires next month. <Link href="/checkout" className="ok">Update payment details</Link></span>
      </div>
    </section>
  );
}
