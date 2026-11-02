'use client';

import { useState } from 'react';

export function GiftStep() {
  return (
    <section className="card" aria-labelledby="gift-heading">
      <h2 id="gift-heading">Gift options</h2>
      <p className="muted">Packaging for this order.</p>
      {/* FRM-005: radios without a group name */}
      <div className="co-choices" data-pet-issue="FRM-005">
        <div className="co-choice">
          <input id="wrap-plain" type="radio" name="wrap" value="plain" defaultChecked />
          <label htmlFor="wrap-plain"><span>Standard box</span><span className="cost">Free</span></label>
        </div>
        <div className="co-choice">
          <input id="wrap-paper" type="radio" name="wrap" value="paper" />
          <label htmlFor="wrap-paper"><span>Recycled paper wrap</span><span className="cost">EUR 2.50</span></label>
        </div>
        <div className="co-choice">
          <input id="wrap-tin" type="radio" name="wrap" value="tin" />
          <label htmlFor="wrap-tin"><span>Reusable gift tin</span><span className="cost">EUR 6.00</span></label>
        </div>
      </div>
      <div className="field">
        <label htmlFor="gift-note">Gift message <span className="co-opt">(optional)</span></label>
        {/* FRM-004: flagged invalid while valid, description id missing */}
        <input id="gift-note" type="text" maxLength={120} aria-invalid="true" aria-describedby="gift-note-x" data-pet-issue="FRM-004" />
      </div>
    </section>
  );
}

export function PaymentStep({ card, onCard, cardError }: { card: string; onCard: (v: string) => void; cardError: string }) {
  return (
    <section className="card" aria-labelledby="pay-heading">
      <h2 id="pay-heading">Payment</h2>
      <div className="co-pair">
        {/* FRM-001: placeholder-only inputs */}
        <div className="field">
          <input type="text" name="cardName" placeholder="Name on card" data-pet-issue="FRM-001" />
        </div>
        <div className="field">
          <input type="text" name="billCity" placeholder="Billing town or city" data-pet-issue="FRM-001" />
        </div>
      </div>
      <div className="field" data-pet-issue="FRM-003">
        <label htmlFor="card-no">Card number <span className="co-star">*</span></label>
        <input id="card-no" name="cardNumber" type="text" autoComplete="cc-number" value={card} onChange={(e) => onCard(e.target.value)} className={cardError ? 'invalid' : undefined} data-pet-issue="FRM-006 FRM-013" />
        {cardError ? <span className="err">{cardError}</span> : null}
      </div>
      <div className="co-pair">
        <div className="field">
          <label htmlFor="card-exp">Expiry <span className="co-star">*</span></label>
          <input id="card-exp" name="cardExp" type="text" autoComplete="cc-exp" data-pet-issue="FRM-006" />
        </div>
        <div className="field">
          <label htmlFor="bill-zip">Billing postcode</label>
          <input id="bill-zip" name="billZip" type="text" autoComplete="postal-code" data-pet-issue="FRM-013" />
        </div>
      </div>
    </section>
  );
}

export function AccountStep() {
  const [save, setSave] = useState(true);
  return (
    <section className="card" aria-labelledby="acct-heading">
      <h2 id="acct-heading">Create an account</h2>
      <p className="muted">Track orders and check out faster next time.</p>
      {/* FRM-008: div checkbox without state, focus or keys */}
      <div className="co-cbox" onClick={() => setSave(!save)}>
        <div role="checkbox" className={`co-cbox-box${save ? ' on' : ''}`} data-pet-issue="FRM-008">{save ? '✓' : ''}</div>
        <span>Save my details for next time</span>
      </div>
      {/* FRM-012: accessible name differs from visible label */}
      <div className="field">
        <label htmlFor="acct-email">Email address</label>
        <input id="acct-email" type="email" autoComplete="email" aria-label="field1" data-pet-issue="FRM-012" />
      </div>
      {/* FRM-009: both inputs share one id */}
      <div className="co-pair">
        <div className="field">
          <label htmlFor="pw">Password</label>
          <input id="pw" type="password" autoComplete="new-password" data-pet-issue="FRM-009" />
        </div>
        <div className="field">
          <label htmlFor="pw">Confirm password</label>
          <input id="pw" type="password" autoComplete="new-password" data-pet-issue="FRM-009" />
        </div>
      </div>
    </section>
  );
}
