import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

const TITLES = [
  'Pitching a tent in strong wind', 'Choosing a sleeping bag rating', 'Packing a 45L pack for three nights',
  'Breaking in new boots', 'Cleaning and storing down jackets', 'Using the Heron water filter',
  'Lighting the Cinder Stove safely', 'Adjusting trekking pole length', 'Re-proofing waterproof layers',
  'Reading a trail map', 'Leave no trace basics', 'Winter camping checklist',
  'Repairing a torn tent fly', 'Washing a sleeping bag', 'Planning water stops on a long route',
];
const ROUTES = ['/product', '/orders', '/account', '/checkout'];
const PER_PAGE = 3;

export default function Articles() {
  const [page, setPage] = useState(0);
  const [toast, setToast] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const save = () => {
    clearTimeout(timer.current);
    setToast(true);
    // MISC-014: toast vanishes after 4s even though it holds an Undo action
    timer.current = setTimeout(() => setToast(false), 4000);
  };
  useEffect(() => () => clearTimeout(timer.current), []);
  const start = page * PER_PAGE;
  return (
    <>
      <ul className="articles">
        {TITLES.slice(start, start + PER_PAGE).map((title, i) => (
          <li key={title}>
            <Link href={ROUTES[(start + i) % ROUTES.length]} className="ok">{title}</Link>
            <button type="button" className="btn btn-ghost ok" aria-label={`Save ${title} for later`} onClick={save}>Save</button>
          </li>
        ))}
      </ul>
      {/* MISC-009: five 16px page buttons, 2px apart */}
      <div className="pager" data-pet-issue="MISC-009">
        {[1, 2, 3, 4, 5].map((n) => (
          <button key={n} type="button" className="tiny" onClick={() => setPage(n - 1)}>{n}</button>
        ))}
      </div>
      {toast ? (
        <div className="toast" role="status" data-pet-issue="MISC-014">
          <span>Added to wishlist</span>
          <button type="button" className="toast-undo ok" onClick={() => setToast(false)}>Undo</button>
        </div>
      ) : null}
    </>
  );
}
