'use client';

import Link from 'next/link';
import { useState } from 'react';
import Icon from './Icon';

const mainLinks = [
  { href: '/', label: 'Home' },
  { href: '/orders', label: 'Orders' },
  { href: '/product', label: 'Product' },
  { href: '/account', label: 'Account' },
  { href: '/help', label: 'Help' },
];

const menuLinks = [
  { href: '/', label: 'Home' },
  { href: '/shop', label: 'Shop' },
  { href: '/orders', label: 'Orders' },
  { href: '/product', label: 'Product' },
  { href: '/account', label: 'Account' },
  { href: '/checkout', label: 'Checkout' },
  { href: '/help', label: 'Help' },
];

const megaGroups = [
  ['Tents', 'Backpacking tents', 'Family tents'],
  ['Packs', 'Daypacks', 'Expedition packs'],
  ['Boots', 'Trail shoes', 'Socks and insoles'],
  ['Layers', 'Down jackets', 'Rain shells'],
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="hdr-inner">
        {/* MOB-001: icon-only toggle, no name, no expanded/controls state */}
        <button type="button" className="hamburger" data-pet-issue="MOB-001" onClick={() => setOpen((v) => !v)}>
          <Icon name="menu" />
        </button>
        {/* GLB-003: site name is a div, not a heading or a link home */}
        <div className="logo" data-pet-issue="GLB-003">Fernwick</div>

        {/* GLB-004 / GLB-008: unnamed landmark, no aria-current, kept in DOM at all sizes */}
        <nav className="nav-desktop" data-pet-issue="GLB-004 GLB-008">
          <ul>
            <li><Link href="/">Home</Link></li>
            {/* DSK-001: panel opens on :hover only, trigger exposes no state */}
            <li className="has-mega" data-pet-issue="DSK-001">
              <Link href="/shop">Shop</Link>
              <div className="mega">
                {megaGroups.map((group) => (
                  <ul key={group[0]}>
                    {group.map((label) => (
                      <li key={label}><Link href="/shop">{label}</Link></li>
                    ))}
                  </ul>
                ))}
              </div>
            </li>
            {mainLinks.slice(1).map((l) => (
              <li key={l.href}><Link href={l.href}>{l.label}</Link></li>
            ))}
          </ul>
        </nav>

        <div className="hdr-tools">
          <Link href="/help" className="hdr-icon ok" aria-label="Search the help centre"><Icon name="search" /></Link>
          <select className="currency ok" aria-label="Currency" defaultValue="EUR">
            <option value="EUR">EUR</option>
            <option value="GBP">GBP</option>
            <option value="USD">USD</option>
          </select>
          {/* GLB-009: name is only the badge count; updates are silent */}
          <Link href="/shop" className="hdr-icon cart-link" data-pet-issue="GLB-009">
            <Icon name="cart" />
            <span className="cart-count">2</span>
          </Link>
        </div>
      </div>

      {/* MOB-003: opens without dialog role, focus move, trap, Esc or inert page; backdrop click only */}
      <div className={`menu-backdrop${open ? ' open' : ''}`} onClick={() => setOpen(false)} />
      {/* MOB-002 / GLB-008: closed state is a transform only, links stay tabbable */}
      <nav className={`nav-offcanvas${open ? ' open' : ''}`} data-pet-issue="GLB-004 GLB-008 MOB-002 MOB-003">
        <ul>
          {menuLinks.map((l) => (
            <li key={l.href}><Link href={l.href} onClick={() => setOpen(false)}>{l.label}</Link></li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
