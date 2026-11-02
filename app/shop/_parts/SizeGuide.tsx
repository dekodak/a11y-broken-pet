import { useRef } from 'react';

const SIZES = [
  { eu: '38', cm: '24.0' }, { eu: '40', cm: '25.5' }, { eu: '42', cm: '27.0' },
  { eu: '44', cm: '28.5' }, { eu: '46', cm: '30.0' },
];

export default function SizeGuide() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  return (
    <>
      <button type="button" ref={triggerRef} className="btn btn-secondary ok" aria-haspopup="dialog" onClick={() => dialogRef.current?.showModal()}>
        Size guide
      </button>
      {/* OK-DLG-1: native modal dialog, named and described, focus returned to the trigger */}
      <dialog
        ref={dialogRef}
        className="size-dialog"
        aria-labelledby="size-guide-title"
        aria-describedby="size-guide-desc"
        onClose={() => triggerRef.current?.focus()}
        data-pet-issue="OK-DLG-1"
      >
        <h2 id="size-guide-title">Boot size guide</h2>
        <p id="size-guide-desc" className="muted">Measure your foot standing up, heel to longest toe, and add half a size if you wear thick socks.</p>
        <div className="table-wrap">
          <table>
            <caption>EU boot sizes and foot length</caption>
            <thead><tr><th scope="col">EU size</th><th scope="col">Foot length (cm)</th></tr></thead>
            <tbody>
              {SIZES.map((s) => (<tr key={s.eu}><th scope="row">{s.eu}</th><td>{s.cm}</td></tr>))}
            </tbody>
          </table>
        </div>
        <div className="row" style={{ marginTop: 'var(--s-4)' }}>
          <button type="button" className="btn btn-primary ok" onClick={() => dialogRef.current?.close()}>Close size guide</button>
        </div>
      </dialog>
    </>
  );
}
