'use client';

import Link from 'next/link';
import Breadcrumbs from '../_components/Breadcrumbs';
import './orders.css';
import { HistorySection, TrackerSection } from './_parts/HistorySection';
import { PriceListSection, SavedSection } from './_parts/PriceSaved';
import { CompareSection, PackListSection, SizingSection, StoreHoursSection } from './_parts/Reference';

export default function Page() {
  return (
    <div className="page orders">
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Account', href: '/account' }, { label: 'Orders & sizing' }]} />
      <h1>Orders &amp; sizing</h1>
      <p className="lead">Follow a parcel, check a size, or compare tents before you buy.</p>
      <nav aria-label="On this page" className="o-subnav">
        <ul>
          <li><Link href="#history" className="chip ok">Orders</Link></li>
          <li><Link href="#sizing" className="chip ok">Sizing</Link></li>
          <li><Link href="#compare" className="chip ok">Compare</Link></li>
        </ul>
      </nav>
      <HistorySection />
      <TrackerSection />
      <PriceListSection />
      <StoreHoursSection />
      <PackListSection />
      <SavedSection />
      <SizingSection />
      <CompareSection />
    </div>
  );
}
