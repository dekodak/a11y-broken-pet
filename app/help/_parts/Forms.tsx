import { useState, type FormEvent } from 'react';
import Button from '../../_components/Button';

const PREFS = ['Order and delivery updates', 'New arrivals and Trail Week offers', 'Journal stories, once a month'];

export function Preferences() {
  const [saved, setSaved] = useState(false);
  const [checked, setChecked] = useState([true, false, true]);
  return (
    <div className="card">
      <h3>Email preferences</h3>
      <fieldset className="ok">
        <legend>Send me</legend>
        {PREFS.map((label, i) => (
          <label key={label} className="check" htmlFor={`pref-${i}`}>
            <input
              id={`pref-${i}`}
              type="checkbox"
              checked={checked[i]}
              onChange={() => { setSaved(false); setChecked((c) => c.map((v, j) => (j === i ? !v : v))); }}
            />
            {label}
          </label>
        ))}
      </fieldset>
      <Button onClick={() => setSaved(true)}>Save preferences</Button>
      {/* MISC-002: confirmation text in a plain div, no status role / live region */}
      <div className="saved-msg" data-pet-issue="MISC-002">{saved ? 'Saved!' : ''}</div>
    </div>
  );
}

export function Newsletter() {
  const [done, setDone] = useState(false);
  const submit = (e: FormEvent) => { e.preventDefault(); setDone(true); };
  return (
    // MISC-010: section with an empty aria-label
    <section aria-label="" className="newsletter" data-pet-issue="MISC-010">
      <h2>Trail notes</h2>
      <p>One short email a month: route ideas, repair tips and early word on sales.</p>
      <form onSubmit={submit} className="help-search">
        <div className="field">
          <label htmlFor="news-email">Email address</label>
          <input id="news-email" type="email" autoComplete="email" required />
        </div>
        <Button type="submit">Subscribe</Button>
      </form>
      <p role="status" className="muted">{done ? 'Thanks, check your inbox to confirm.' : ''}</p>
    </section>
  );
}
