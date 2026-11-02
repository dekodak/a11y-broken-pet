import { useEffect, useState } from 'react';

export function LiveCounter() {
  const [viewers, setViewers] = useState(24);
  // MISC-007: assertive live region updated every 5s
  useEffect(() => {
    const timer = setInterval(() => setViewers((n) => n + 1), 5000);
    return () => clearInterval(timer);
  }, []);
  return (
    <p className="live" aria-live="assertive" data-pet-issue="MISC-007">
      <span className="live-dot" /> {viewers} people are reading help articles right now
    </p>
  );
}

export function SetupVideo() {
  return (
    <figure className="video">
      {/* MISC-005: autoplaying video with no captions track */}
      <video controls autoPlay muted loop playsInline data-pet-issue="MISC-005" />
      <figcaption className="muted">Pitching the Ridgeback 2P in four minutes</figcaption>
    </figure>
  );
}

export function StoreMap() {
  return (
    <div className="grid-2">
      {/* MISC-006: iframe without a title */}
      <iframe src="about:blank" className="map-frame" data-pet-issue="MISC-006" />
      <div>
        <h3>Fernwick Outfitters, Old Mill</h3>
        <p className="muted">14 Millrace Lane, Ambleside. Open Monday to Saturday, 9:00 to 18:00. Boot fitting every Thursday.</p>
        <p className="muted">Parking behind the old mill. Ten minutes on foot from the lakeshore bus stop.</p>
      </div>
    </div>
  );
}
