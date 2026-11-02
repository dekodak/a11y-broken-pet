'use client';

import Wrap from './Wrap';

const bootSizes = [
  ['36', '3.5', '22.5'], ['37', '4.5', '23.5'], ['38', '5', '24.1'], ['39', '6', '24.8'],
  ['40', '6.5', '25.4'], ['41', '7.5', '26.0'], ['42', '8', '26.7'], ['43', '9', '27.3'],
  ['44', '9.5', '27.9'], ['45', '10.5', '28.6'], ['46', '11', '29.2'], ['47', '12', '29.8'],
];
const jacketSizes = [
  ['S', '92-97', '36-38', '78-83', '31-33'], ['M', '98-103', '39-41', '84-89', '33-35'],
  ['L', '104-109', '41-43', '90-95', '35-37'], ['XL', '110-117', '43-46', '96-103', '38-41'],
];
const packList = [
  ['Ridgeback 2P Tent', '2.1 kg', 'Packed'], ['Birch Sleeping Bag', '1.0 kg', 'Packed'],
  ['Cinder Stove', '0.2 kg', 'To pack'], ['Heron Water Filter', '0.3 kg', 'To pack'],
];
const compareRows: Array<[string, string, string, string]> = [
  ['Packed weight', '2.1 kg', '2.9 kg', '1.4 kg'],
  ['Sleeps', '2 people', '3 people', '1 person'],
  ['Price', 'EUR 389.00', 'EUR 449.00', 'EUR 279.00'],
  ['Two doors', '✓', '✓', '✗'],
  ['Footprint included', '✗', '✗', '—'],
  ['Gear loft', '—', '✓', '✗'],
  ['Freestanding', '✓', '✓', '✓'],
];

export function StoreHoursSection() {
  return (
    <section className="card" id="hours">
      <h2>Store hours</h2>
      <p className="muted">Collect an order or try boots on at our Ghent shop.</p>
      {/* TBL-008: layout table with presentation role that still has a caption and th */}
      <table role="presentation" className="o-hours" data-pet-issue="TBL-008">
        <caption>Opening hours</caption>
        <tbody>
          <tr><th>Monday to Friday</th><td>9:00 - 18:00</td></tr>
          <tr><th>Saturday</th><td>10:00 - 17:00</td></tr>
          <tr><th>Sunday</th><td>Closed</td></tr>
        </tbody>
      </table>
    </section>
  );
}

export function PackListSection() {
  return (
    <section className="card" id="packlist">
      <h2>Weekend pack list</h2>
      {/* TBL-009: role=table and role=row, but cells carry no cell/columnheader roles */}
      <div role="table" aria-label="Weekend pack list" className="o-div-table" data-pet-issue="TBL-009">
        <div role="row" className="o-div-row o-div-head">
          <div>Item</div><div>Weight</div><div>Status</div>
        </div>
        {packList.map(([item, weight, status]) => (
          <div role="row" className="o-div-row" key={item}>
            <div>{item}</div><div>{weight}</div><div>{status}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function SizingSection() {
  return (
    <section className="card" id="sizing">
      <h2>Size charts</h2>
      <div className="stack">
        <div data-pet-issue="OK-TBL-1">
          <table className="o-chart">
            <caption>Boot sizes: EU, UK and foot length</caption>
            <thead>
              <tr>
                <th scope="col">EU size</th>
                <th scope="col">UK size</th>
                <th scope="col">Foot length (cm)</th>
              </tr>
            </thead>
            <tbody>
              {bootSizes.map(([eu, uk, cm]) => (
                <tr key={eu}>
                  <th scope="row">{eu}</th>
                  <td>{uk}</td>
                  <td>{cm}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Wrap label="Jacket size chart">
          {/* TBL-012: spanning headers with no scope/headers/id association */}
          <table data-pet-issue="TBL-012">
            <caption>Jacket sizes</caption>
            <thead>
              <tr>
                <th rowSpan={2}>Size</th>
                <th colSpan={2}>Chest</th>
                <th colSpan={2}>Waist</th>
              </tr>
              <tr>
                <th>cm</th><th>in</th><th>cm</th><th>in</th>
              </tr>
            </thead>
            <tbody>
              {jacketSizes.map(([size, ...rest]) => (
                <tr key={size}>
                  <th>{size}</th>
                  {rest.map((v, i) => <td key={i}>{v}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </Wrap>
      </div>
    </section>
  );
}

export function CompareSection() {
  return (
    <section className="card" id="compare">
      <h2>Tent comparison</h2>
      <p className="muted">Scroll sideways to see every model.</p>
      {/* TBL-013: scrollable region without tabindex or name */}
      <div className="table-wrap o-compare" data-pet-issue="TBL-013">
        {/* TBL-014: feature values are glyph-only with no text alternative */}
        <table data-pet-issue="TBL-014">
          <caption>Tent models side by side</caption>
          <thead>
            <tr>
              <th scope="col">Feature</th>
              <th scope="col">Ridgeback 2P</th>
              <th scope="col">Ridgeback 3P</th>
              <th scope="col">Alcove 1P</th>
            </tr>
          </thead>
          <tbody>
            {compareRows.map(([feature, a, b, c]) => (
              <tr key={feature}>
                <th scope="row">{feature}</th>
                <td>{a}</td><td>{b}</td><td>{c}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
