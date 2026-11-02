'use client';

import Link from 'next/link';
import type { FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Breadcrumbs from '../_components/Breadcrumbs';
import Icon from '../_components/Icon';
import SectionHeading from '../_components/SectionHeading';
import Articles from './_parts/Articles';
import Carousel from './_parts/Carousel';
import { LiveCounter, SetupVideo, StoreMap } from './_parts/Embeds';
import { FaqDivs, FaqReturns } from './_parts/Faq';
import { Newsletter, Preferences } from './_parts/Forms';
import { ChatWidget, CookieBanner } from './_parts/Overlays';
import TripPlanner from './_parts/TripPlanner';
import './help.css';

const CHIPS = [
  { href: '#topic-orders', label: 'Orders' },
  { href: '#topic-returns', label: 'Returns' },
  { href: '#topic-tips', label: 'Setup and tips' },
  { href: '#topic-stores', label: 'Stores' },
  { href: '#topic-articles', label: 'Articles' },
  { href: '#topic-contact', label: 'Contact' },
];

const TOPICS = [
  'Placing an order', 'Delivery times', 'Tracking a parcel', 'Changing an address', 'Returns window',
  'Starting a return', 'Refunds', 'Exchanges and sizes', 'Warranty claims', 'Repairs and spares',
  'Tent setup guides', 'Care and washing', 'Store opening hours', 'Boot fitting', 'Gift cards', 'Payment options',
];

function goTo(id: string) {
  document.getElementById(id)?.scrollIntoView();
}

export default function Page() {
  const router = useRouter();
  const search = (e: FormEvent) => { e.preventDefault(); goTo('topic-articles'); };
  return (
    <div className="page">
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Help centre' }]} />
      {/* MISC-010: first of two <main> landmarks on this page */}
      <main className="help-main" data-pet-issue="MISC-010">
        <section className="help-hero">
          <h1>How can we help?</h1>
          <p className="lead">Delivery, returns, repairs and a few tricks for pitching in the rain.</p>
          <form role="search" className="help-search" onSubmit={search}>
            <div className="field">
              <label htmlFor="help-q">Search help articles</label>
              <input id="help-q" type="search" autoComplete="off" />
            </div>
            <button type="submit" className="btn btn-primary ok"><Icon name="search" size={20} />Search</button>
          </form>
          <div className="quick">
            <span>Quick links</span>
            {/* MISC-012: positive tabindex values in reverse DOM order */}
            <button type="button" className="chip ok" tabIndex={3} onClick={() => router.push('/orders')} data-pet-issue="MISC-012">Track an order</button>
            <button type="button" className="chip ok" tabIndex={2} onClick={() => goTo('topic-returns')} data-pet-issue="MISC-012">Start a return</button>
            <button type="button" className="chip ok" tabIndex={1} onClick={() => goTo('topic-stores')} data-pet-issue="MISC-012">Find a store</button>
          </div>
          <LiveCounter />
        </section>

        <nav aria-label="Topics" className="topic-chips">
          {CHIPS.map((c) => (<a key={c.href} href={c.href} className="chip ok">{c.label}</a>))}
        </nav>

        <div className="help-grid">
          <aside className="topics-aside">
            <p className="topics-title">Topics</p>
            {/* DSK-003: scrollable region of plain text, nothing focusable inside */}
            <div className="topics-scroll" data-pet-issue="DSK-003">
              <ul>{TOPICS.map((t) => (<li key={t}>{t}</li>))}</ul>
            </div>
          </aside>

          <div className="help-content">
            {/* MOB-013: anchor targets have no scroll-margin and sit under the sticky header */}
            <section id="topic-orders" tabIndex={-1} className="topic" data-pet-issue="MOB-013">
              <SectionHeading level={2} eyebrow="Topic">Orders and delivery</SectionHeading>
              <FaqDivs />
              {/* MISC-008: fixed-height clipped notice */}
              <div className="clip notice" data-pet-issue="MISC-008">
                Orders placed after 14:00 on Friday ship on Monday, and remote postcodes can add two working days.
              </div>
            </section>

            <section id="topic-returns" tabIndex={-1} className="topic" data-pet-issue="MOB-013">
              <SectionHeading level={2} eyebrow="Topic">Returns and exchanges</SectionHeading>
              <FaqReturns />
            </section>

            <section id="topic-tips" tabIndex={-1} className="topic" data-pet-issue="MOB-013">
              <SectionHeading level={2} eyebrow="Topic">Setup and tips</SectionHeading>
              <div className="grid-2">
                <div>
                  <h3>Stories from the trail</h3>
                  <Carousel />
                </div>
                <TripPlanner />
              </div>
              <h3 className="topic-sub">Tent setup video</h3>
              <SetupVideo />
            </section>

            <section id="topic-stores" tabIndex={-1} className="topic" data-pet-issue="MOB-013">
              <SectionHeading level={2} eyebrow="Topic">Visit a store</SectionHeading>
              <StoreMap />
            </section>

            <section id="topic-articles" tabIndex={-1} className="topic" data-pet-issue="MOB-013">
              <SectionHeading level={2} eyebrow="Topic">Popular articles</SectionHeading>
              <Articles />
            </section>

            <div className="grid-2 topic">
              <Preferences />
              <Newsletter />
            </div>
          </div>
        </div>
      </main>

      {/* MISC-010: second <main> landmark */}
      <main id="topic-contact" tabIndex={-1} className="help-main help-contact" data-pet-issue="MISC-010 MOB-013">
        <SectionHeading level={2} eyebrow="Still stuck?">Talk to a person</SectionHeading>
        <div className="grid-3">
          <article className="card">
            <h3>Email</h3>
            <p className="muted">help@fernwick.example. We answer within one working day.</p>
          </article>
          <article className="card">
            <h3>Phone</h3>
            <p className="muted">+44 20 7946 0000, weekdays 9:00 to 17:00.</p>
          </article>
          <article className="card">
            <h3>Your orders</h3>
            <p className="muted">See delivery status and start returns from your account.</p>
            <Link href="/account" className="ok">Go to your account</Link>
          </article>
        </div>
      </main>

      <ChatWidget />
      <CookieBanner />
    </div>
  );
}
