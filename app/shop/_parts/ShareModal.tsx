import { useState } from 'react';
import Button from '../../_components/Button';
import Icon from '../../_components/Icon';

const WISHLIST_URL = 'https://fernwick.example/wishlist/trail-kit';

export default function ShareModal() {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const close = () => { setOpen(false); setCopied(false); };
  const copy = () => {
    navigator.clipboard?.writeText(WISHLIST_URL).catch(() => undefined);
    setCopied(true);
  };
  return (
    <>
      {/* DLG-006: aria-expanded stays "false" while the dialog is open */}
      <Button variant="secondary" aria-haspopup="dialog" aria-expanded="false" onClick={() => setOpen(true)} data-pet-issue="DLG-006">
        <Icon name="heart" size={20} />
        Share wishlist
      </Button>
      {open ? (
        <div className="modal-backdrop" onClick={(e) => { if (e.target === e.currentTarget) close(); }}>
          {/* DLG-005: aria-labelledby points to an id that does not exist; no focus management */}
          <div className="modal" role="dialog" aria-modal="true" aria-labelledby="share-title-x" data-pet-issue="DLG-005">
            <h2 id="share-heading">Share your wishlist</h2>
            <p className="muted">Send your trail kit list to a friend, or copy the link.</p>
            <div className="field">
              <label htmlFor="share-link">Wishlist link</label>
              <input id="share-link" type="text" readOnly value={WISHLIST_URL} />
            </div>
            <Button variant="secondary" onClick={copy}>Copy link</Button>
            <p role="status" className="muted">{copied ? 'Link copied' : ''}</p>
            <div className="field">
              <label htmlFor="share-email">Friend&apos;s email</label>
              <input id="share-email" type="email" autoComplete="off" />
            </div>
            <div className="row">
              <Button onClick={close}>Send invite</Button>
              <Button variant="ghost" onClick={close}>Cancel</Button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
