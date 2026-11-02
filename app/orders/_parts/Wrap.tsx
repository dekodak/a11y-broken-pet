import type { ReactNode } from 'react';

/** Scroll container for wide tables: focusable, named region. */
export default function Wrap({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="table-wrap" role="region" aria-label={label} tabIndex={0}>
      {children}
    </div>
  );
}
