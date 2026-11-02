'use client';

import Link from 'next/link';
import Breadcrumbs from '../_components/Breadcrumbs';
import './account.css';
import { ActivityImage, ElevationCard, ImpactCard, SocialLinks, SyncStatus, TrailMilesCanvas } from './_parts/ImpactCards';
import ProfileCard from './_parts/ProfileCard';
import { BudgetBars, OrdersByMonth, SpendBars, SpendLine } from './_parts/SpendCharts';
import Wishlist from './_parts/Wishlist';

const sections = [
  { label: 'Overview', href: '/account', current: true },
  { label: 'Orders', href: '/orders' },
  { label: 'Wishlist', href: '/account#wishlist' },
  { label: 'Settings', href: '/help' },
  { label: 'Shop gear', href: '/shop' },
];

export default function Page() {
  return (
    <div className="page">
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Your account' }]} />
      <h1>Your account</h1>
      <div className="acc-layout">
        <nav className="acc-nav" aria-label="Account sections">
          <ul>
            {sections.map((item) => (
              <li key={item.label}>
                <Link href={item.href} className="ok" aria-current={item.current ? 'page' : undefined}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="acc-content">
          <ProfileCard />
          <SpendBars />
          <BudgetBars />
          <OrdersByMonth />
          <SyncStatus />
          <TrailMilesCanvas />
          <ElevationCard />
          <ActivityImage />
          <SpendLine />
          <ImpactCard />
          <Wishlist />
          <SocialLinks />
        </div>
      </div>
    </div>
  );
}
