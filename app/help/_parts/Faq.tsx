import { useState } from 'react';
import Icon from '../../_components/Icon';

interface FaqItem {
  q: string;
  a: string;
}

const ORDER_FAQ: FaqItem[] = [
  { q: 'How long does delivery take?', a: 'Standard delivery takes 2 to 4 working days within the EU. Express arrives the next working day if you order before 14:00.' },
  { q: 'Can I change my address after ordering?', a: 'Yes, until the parcel is handed to the courier. Email us with your order number and we will update it the same day.' },
  { q: 'Do you deliver to mountain huts and campsites?', a: 'We deliver to any postal address. For huts, use the pickup option and collect from your nearest partner store.' },
];

const RETURN_FAQ: FaqItem[] = [
  { q: 'What is your returns window?', a: 'Thirty days from delivery for unworn, unwashed gear with tags attached. Tents may be pitched once indoors.' },
  { q: 'How do I start a return?', a: 'Open your order from the account page, choose the items and print the prepaid label. Drop the parcel at any partner point.' },
  { q: 'When will I get my refund?', a: 'Within five working days of us receiving the parcel, back to the original payment method.' },
];

export function FaqDivs() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="faq">
      {ORDER_FAQ.map((it, i) => (
        <div key={it.q} className={`faq-item${open === i ? ' is-open' : ''}`}>
          {/* MISC-003: div header, not a button, no aria-expanded/aria-controls, not focusable */}
          <div className="faq-q" onClick={() => setOpen(open === i ? null : i)} data-pet-issue="MISC-003">
            <span>{it.q}</span>
            <span className="faq-chev"><Icon name="chevron" size={20} /></span>
          </div>
          {open === i ? <div className="faq-a"><p>{it.a}</p></div> : null}
        </div>
      ))}
    </div>
  );
}

export function FaqReturns() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div className="faq" data-pet-issue="OK-MISC-1">
      {RETURN_FAQ.map((it, i) => {
        const buttonId = `returns-q-${i}`;
        const panelId = `returns-a-${i}`;
        const isOpen = open === i;
        return (
          <div key={it.q} className={`faq-item${isOpen ? ' is-open' : ''}`}>
            <h3 className="faq-h">
              <button
                type="button"
                id={buttonId}
                className="faq-btn ok"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : i)}
              >
                <span>{it.q}</span>
                <span className="faq-chev"><Icon name="chevron" size={20} /></span>
              </button>
            </h3>
            <div id={panelId} role="region" aria-labelledby={buttonId} hidden={!isOpen} className="faq-a">
              <p>{it.a}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
