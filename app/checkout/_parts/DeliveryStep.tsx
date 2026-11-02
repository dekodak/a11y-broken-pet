'use client';

import { formatPrice } from '../../_data/products';

export const shippingOptions = [
  { id: 'standard', label: 'Standard, 3-5 days', cost: 4.9 },
  { id: 'express', label: 'Express, next day', cost: 9.9 },
  { id: 'pickup', label: 'Pickup at a Fernwick shop', cost: 0 },
];

interface DeliveryStepProps {
  shipping: string;
  onShipping: (id: string) => void;
}

export default function DeliveryStep({ shipping, onShipping }: DeliveryStepProps) {
  return (
    <>
      {/* OK-FRM-2: correct delivery address fieldset */}
      <fieldset className="ok" data-pet-issue="OK-FRM-2">
        <legend>Delivery address</legend>
        <div className="field">
          <label htmlFor="ship-street">Street and number</label>
          <input id="ship-street" name="street" type="text" required autoComplete="street-address" />
        </div>
        <div className="co-pair">
          <div className="field">
            <label htmlFor="ship-city">Town or city</label>
            <input id="ship-city" name="city" type="text" required autoComplete="address-level2" />
          </div>
          <div className="field">
            <label htmlFor="ship-zip">Postcode</label>
            <input id="ship-zip" name="postcode" type="text" required autoComplete="postal-code" inputMode="numeric" pattern="[0-9]{4,5}" />
          </div>
        </div>
        <div className="field">
          <label htmlFor="ship-country">Country</label>
          <select id="ship-country" name="country" autoComplete="country" defaultValue="DE" required>
            <option value="DE">Germany</option>
            <option value="NL">Netherlands</option>
            <option value="AT">Austria</option>
            <option value="FR">France</option>
          </select>
        </div>
      </fieldset>

      <fieldset className="ok">
        <legend>Shipping method</legend>
        <div className="co-choices">
          {shippingOptions.map((opt) => (
            <div className="co-choice" key={opt.id}>
              <input id={`ship-${opt.id}`} type="radio" name="shipping" value={opt.id} checked={shipping === opt.id} onChange={() => onShipping(opt.id)} />
              <label htmlFor={`ship-${opt.id}`}><span>{opt.label}</span><span className="cost">{opt.cost === 0 ? 'Free' : formatPrice(opt.cost)}</span></label>
            </div>
          ))}
        </div>
      </fieldset>

      <section className="card" aria-labelledby="courier-heading">
        <h2 id="courier-heading">Delivery updates</h2>
        <p className="muted">Who should the courier get in touch with?</p>
        {/* FRM-010: name, email and tel without autocomplete; FRM-013: tel is plain text */}
        <div className="field">
          <label htmlFor="courier-name">Contact name</label>
          <input id="courier-name" type="text" data-pet-issue="FRM-010" />
        </div>
        <div className="field">
          <label htmlFor="courier-email">Notification email</label>
          <input id="courier-email" type="email" data-pet-issue="FRM-010" />
        </div>
        <div className="field">
          <label htmlFor="courier-phone">Mobile number</label>
          <input id="courier-phone" type="text" data-pet-issue="FRM-010 FRM-013" />
        </div>
        {/* FRM-007: select with no label */}
        <div className="field">
          <span className="lbl">Preferred delivery window</span>
          <select data-pet-issue="FRM-007" defaultValue="any">
            <option value="any">Any time</option>
            <option value="am">Morning, 8-12</option>
            <option value="pm">Afternoon, 12-17</option>
            <option value="eve">Evening, 17-20</option>
          </select>
        </div>
      </section>
    </>
  );
}
