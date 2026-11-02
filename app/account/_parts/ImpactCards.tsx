'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';

const chartSvg =
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 120"><rect width="240" height="120" fill="#eef4ef"/>' +
  '<rect x="20" y="70" width="28" height="40" fill="#2f6b4f"/><rect x="62" y="45" width="28" height="65" fill="#2f6b4f"/>' +
  '<rect x="104" y="30" width="28" height="80" fill="#2f6b4f"/><rect x="146" y="55" width="28" height="55" fill="#2f6b4f"/>' +
  '<rect x="188" y="20" width="28" height="90" fill="#d97b29"/></svg>';
const chartSrc = `data:image/svg+xml;utf8,${encodeURIComponent(chartSvg)}`;

const trailMiles = [12, 18, 9, 24, 15, 30, 21];
const trailDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export function TrailMilesCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const ctx = ref.current?.getContext('2d');
    if (!ctx) return;
    ctx.fillStyle = '#f4efe6';
    ctx.fillRect(0, 0, 320, 160);
    ctx.fillStyle = '#2f6b4f';
    trailMiles.forEach((miles, i) => {
      ctx.fillRect(18 + i * 43, 130 - miles * 3.6, 28, miles * 3.6);
    });
    ctx.fillStyle = '#1d2a24';
    ctx.font = '11px sans-serif';
    trailDays.forEach((day, i) => ctx.fillText(day, 20 + i * 43, 148));
  }, []);
  return (
    <section className="card" aria-labelledby="miles-heading">
      <h3 id="miles-heading">Trail miles this week</h3>
      {/* SVG-009: canvas, no fallback or name */}
      <canvas ref={ref} className="acc-canvas" width={320} height={160} data-pet-issue="SVG-009" />
    </section>
  );
}

export function ElevationCard() {
  return (
    <section className="card" aria-labelledby="elev-heading">
      <h3 id="elev-heading">Elevation gained</h3>
      {/* SVG-010: labelledby points at a missing id */}
      <svg className="acc-chart" viewBox="0 0 320 140" role="img" aria-labelledby="elev-title-x" data-pet-issue="SVG-010">
        <title id="elev-title">Elevation profile of the Saturday route</title>
        <path d="M0 120L50 90 100 100 150 50 200 70 250 25 320 60V140H0z" fill="#dfe9df" stroke="#2f6b4f" strokeWidth="2" />
        <text x="250" y="18" textAnchor="middle">1,240 m</text>
      </svg>
    </section>
  );
}

export function ActivityImage() {
  return (
    <section className="card" aria-labelledby="activity-heading">
      <h3 id="activity-heading">Activity at a glance</h3>
      {/* SVG-008: uninformative alt text on a chart image */}
      <img className="acc-img" src={chartSrc} alt="chart" width={240} height={120} data-pet-issue="SVG-008" />
    </section>
  );
}

export function SyncStatus() {
  return (
    <section className="card" aria-labelledby="sync-heading">
      <h3 id="sync-heading">Device sync</h3>
      <div className="acc-status">
        {/* SVG-012: presentation role with a name and a title */}
        <svg viewBox="0 0 32 32" fill="none" stroke="#1e6b3a" strokeWidth="2.5" strokeLinecap="round" role="presentation" aria-label="Network status" data-pet-issue="SVG-012">
          <title>Connected</title>
          <path d="M4 12a17 17 0 0 1 24 0M9 17a10 10 0 0 1 14 0M14 22a3 3 0 0 1 4 0" />
        </svg>
        <span>Watch and phone synced two minutes ago.</span>
      </div>
    </section>
  );
}

export function ImpactCard() {
  return (
    <section className="card acc-wide" aria-labelledby="impact-heading">
      <h3 id="impact-heading">Your trail impact</h3>
      <div className="acc-impact">
        <div>
          {/* SVG-007: data in text inside an aria-hidden svg */}
          <svg className="acc-chart" viewBox="0 0 320 130" aria-hidden="true" data-pet-issue="SVG-007">
            <text x="0" y="22">Alps</text><rect x="70" y="10" width="168" height="16" rx="3" fill="#2f6b4f" /><text x="246" y="22">42%</text>
            <text x="0" y="62">Nordics</text><rect x="70" y="50" width="132" height="16" rx="3" fill="#2f6b4f" /><text x="246" y="62">33%</text>
            <text x="0" y="102">Pyrenees</text><rect x="70" y="90" width="100" height="16" rx="3" fill="#2f6b4f" /><text x="246" y="102">25%</text>
          </svg>
        </div>
        <div className="acc-status">
          {/* OK-SVG-1 */}
          <svg className="acc-ring" viewBox="0 0 80 80" role="img" aria-labelledby="ring-title ring-desc" data-pet-issue="OK-SVG-1">
            <title id="ring-title">Trips offset</title>
            <desc id="ring-desc">Ring chart: 68 percent of your trips this year were carbon offset.</desc>
            <circle cx="40" cy="40" r="30" fill="none" stroke="#dfe9df" strokeWidth="10" />
            <circle cx="40" cy="40" r="30" fill="none" stroke="#2f6b4f" strokeWidth="10" strokeDasharray="128 189" transform="rotate(-90 40 40)" />
          </svg>
          <p style={{ margin: 0 }}>68% of your trips offset this year.</p>
        </div>
      </div>
      <div className="acc-status" style={{ marginTop: 'var(--s-4)' }}>
        {/* OK-SVG-2 */}
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#2f6b4f" strokeWidth="1.75" strokeLinecap="round" aria-hidden="true" focusable="false" data-pet-issue="OK-SVG-2">
          <path d="M5 19c0-9 5-14 15-14 0 10-5 15-14 15M5 19c3-5 6-8 10-10" />
        </svg>
        <span>Every pack you return is repaired or recycled. <Link href="/help" className="ok">How it works</Link></span>
      </div>
      {/* SVG-004: decorative flourish exposed to AT */}
      <svg className="acc-flourish" width="120" height="16" viewBox="0 0 120 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" data-pet-issue="SVG-004">
        <title>Decoration</title>
        <path d="M4 8c14-10 24 10 38 0s24 10 38 0 24 10 36 0" />
      </svg>
    </section>
  );
}

export function SocialLinks() {
  return (
    <section className="card acc-wide" aria-labelledby="social-heading">
      <h3 id="social-heading">Share your trips</h3>
      <p className="muted" style={{ margin: 0 }}>Post your route to the Fernwick community.</p>
      <div className="acc-social">
        <Link href="/help" data-pet-issue="SVG-006">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75"><rect x="3.5" y="3.5" width="17" height="17" rx="5" /><circle cx="12" cy="12" r="4" /></svg>
        </Link>
        <Link href="/help" data-pet-issue="SVG-006">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75"><path d="M13 21v-8h3l.5-3.5H13V7.5c0-1 .5-1.7 1.8-1.7H17V3a22 22 0 0 0-2.7-.2C11.700 2.800 9.500 4.400 9.500 7.200v2.300H6.500V13h3v8z" /></svg>
        </Link>
      </div>
    </section>
  );
}
