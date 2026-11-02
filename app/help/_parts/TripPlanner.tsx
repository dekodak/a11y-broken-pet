import { useState, type HTMLAttributes, type KeyboardEvent } from 'react';

const REGIONS = ['Alps', 'Highlands', 'Tatras'];
// MISC-011: invalid aria-expanded value
const invalidExpanded = { 'aria-expanded': 'yes' } as unknown as HTMLAttributes<HTMLElement>;

export default function TripPlanner() {
  const [region, setRegion] = useState(0);
  const [stove, setStove] = useState(true);
  const press = (action: () => void) => (e: KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); action(); }
  };
  const nextRegion = () => setRegion((r) => (r + 1) % REGIONS.length);
  const toggleStove = () => setStove((s) => !s);
  return (
    <div className="card planner" data-pet-issue="MISC-011">
      <h3>Trip planner</h3>
      <p className="muted">Pick a region and we will suggest a starter kit list for three nights.</p>
      {/* MISC-011: role typo, aria-labeledby typo, invalid aria-expanded, aria-checked without a role */}
      <div
        role="buton"
        aria-labeledby="x"
        tabIndex={0}
        className="planner-row ok"
        onClick={nextRegion}
        onKeyDown={press(nextRegion)}
        {...invalidExpanded}
      >
        Region: <strong>{REGIONS[region]}</strong>
      </div>
      <div className="planner-row ok" tabIndex={0} aria-checked={stove} onClick={toggleStove} onKeyDown={press(toggleStove)}>
        {stove ? 'Stove included' : 'No stove'}
      </div>
      <p className="muted">Suggested: tent, 45L pack, sleeping bag{stove ? ', Cinder Stove' : ''}.</p>
    </div>
  );
}
