import { useState } from 'react';
import Button from '../../_components/Button';

export function CookieBanner() {
  const [shown, setShown] = useState(true);
  if (!shown) return null;
  return (
    // MISC-013: fixed banner without role/name, no focus management, muted "Manage" action
    <div className="cookie" data-pet-issue="MISC-013">
      <div className="cookie-copy">
        <p className="cookie-title">We use cookies</p>
        <p>We use them to keep your cart, count which guides get read and show offers that fit. Essential cookies are always on.</p>
      </div>
      <div className="cookie-actions">
        <Button onClick={() => setShown(false)}>Accept all</Button>
        <button type="button" className="muted-low cookie-manage">Manage</button>
      </div>
    </div>
  );
}

export function ChatWidget() {
  return (
    // MISC-004: focusable button inside an aria-hidden wrapper
    <div className="chat" aria-hidden="true" data-pet-issue="MISC-004">
      <button type="button" className="btn btn-primary ok">Chat with us</button>
    </div>
  );
}
