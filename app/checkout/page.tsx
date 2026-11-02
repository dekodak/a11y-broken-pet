'use client';

import { useState } from 'react';
import Breadcrumbs from '../_components/Breadcrumbs';
import './checkout.css';
import DeliveryStep, { shippingOptions } from './_parts/DeliveryStep';
import ContactStep from './_parts/ContactStep';
import { AccountStep, GiftStep, PaymentStep } from './_parts/ExtrasStep';
import Steps from './_parts/Steps';
import { SummaryAside, SummaryCollapse, cartSubtotal } from './_parts/Summary';

export default function Page() {
  const [email, setEmail] = useState('');
  const [card, setCard] = useState('');
  const [emailError, setEmailError] = useState('');
  const [cardError, setCardError] = useState('');
  const [shipping, setShipping] = useState('standard');
  const [promo, setPromo] = useState('');
  const [discount, setDiscount] = useState(0);
  const [promoNote, setPromoNote] = useState('');
  const [placed, setPlaced] = useState(false);

  const shippingCost = shippingOptions.find((o) => o.id === shipping)?.cost ?? 0;

  const applyPromo = () => {
    if (promo === 'TRAIL10') {
      setDiscount(cartSubtotal() * 0.1);
      setPromoNote('Code applied: 10% off your gear.');
    } else {
      setDiscount(0);
      setPromoNote('That code is not valid for this basket.');
    }
  };

  const placeOrder = () => {
    const mailBad = !email.includes('@');
    setEmailError(mailBad ? 'Enter an email address such as name@example.com.' : '');
    setCardError(card === '' ? 'Enter your card number.' : '');
    setPlaced(!mailBad && card !== '');
  };

  return (
    <main className="page">
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Basket', href: '/shop' }, { label: 'Checkout' }]} />
      <h1>Checkout</h1>
      <Steps />
      <SummaryCollapse shipping={shippingCost} discount={discount} />
      <div className="co-layout">
        <form className="co-form" noValidate onSubmit={(e) => e.preventDefault()}>
          <ContactStep email={email} onEmail={setEmail} emailError={emailError} />
          <DeliveryStep shipping={shipping} onShipping={setShipping} />
          <GiftStep />
          <PaymentStep card={card} onCard={setCard} cardError={cardError} />
          <AccountStep />
          <section className="card" aria-labelledby="promo-heading">
            <h2 id="promo-heading">Promo code</h2>
            <div className="co-promo">
              {/* FRM-002: label points at an id that does not exist */}
              <div className="field">
                <label htmlFor="promo-x">Code</label>
                <input id="promo-input" type="text" value={promo} onChange={(e) => setPromo(e.target.value)} data-pet-issue="FRM-002" />
              </div>
              <button type="button" className="btn btn-secondary ok" onClick={applyPromo}>Apply</button>
            </div>
            <p className="muted" role="status" style={{ margin: 'var(--s-3) 0 0' }}>{promoNote}</p>
          </section>
          {/* FRM-011: submit control is a div with a click handler */}
          <div className="co-pay-btn" onClick={placeOrder} data-pet-issue="FRM-011">Place order</div>
          <p role="status" className="muted" style={{ marginTop: 'var(--s-3)' }}>{placed ? 'Thank you, your order is on its way to the packing bench.' : ''}</p>
        </form>
        <SummaryAside shipping={shippingCost} discount={discount} />
      </div>
    </main>
  );
}
