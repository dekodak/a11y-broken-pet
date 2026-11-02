'use client';

import Link from 'next/link';
import Wrap from './Wrap';

const orders = [
  { id: 'FW-20466', date: '21 Mar 2026', total: 'EUR 294.00', status: 'Shipped' },
  { id: 'FW-20418', date: '12 Mar 2026', total: 'EUR 389.00', status: 'Delivered' },
  { id: 'FW-20377', date: '2 Mar 2026', total: 'EUR 169.00', status: 'Delivered' },
  { id: 'FW-20291', date: '18 Feb 2026', total: 'EUR 219.00', status: 'Delivered' },
];

const steps = ['Ordered', 'Packed', 'In transit', 'Delivered'];

const parcels = [
  { parcel: 'FW-20466 / 1 of 2', stage: 'Out for delivery', eta: '24 Mar 2026' },
  { parcel: 'FW-20466 / 2 of 2', stage: 'At local depot', eta: '25 Mar 2026' },
  { parcel: 'FW-20377 / 1 of 1', stage: 'Delivered', eta: '4 Mar 2026' },
  { parcel: 'FW-20291 / 1 of 1', stage: 'Delivered', eta: '20 Feb 2026' },
];

export function HistorySection() {
  return (
    <section className="card" id="history">
      <h2>Order history</h2>
      <p className="muted">Your last four orders. Select an order number to see its delivery progress.</p>
      {/* TBL-001: no caption or name. TBL-002: header cells are td. MOB-008: fixed min-width, no scroll container. */}
      <table className="o-fixed" data-pet-issue="TBL-001 TBL-002 MOB-008">
        <thead>
          <tr>
            <td><b>Order</b></td>
            <td><b>Date</b></td>
            <td><b>Total</b></td>
            <td><b>Status</b></td>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td><Link href="/orders#tracker" className="ok">{order.id}</Link></td>
              <td>{order.date}</td>
              <td>{order.total}</td>
              <td>{order.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

export function TrackerSection() {
  return (
    <section className="card" id="tracker">
      <h2>Delivery tracker</h2>
      <p className="muted">Order FW-20466 is on its way.</p>
      <ol className="o-steps" aria-label="Progress for order FW-20466">
        {steps.map((step, index) => (
          <li key={step} aria-current={index === 2 ? 'step' : undefined} className={index <= 2 ? 'done' : undefined}>
            {step}
          </li>
        ))}
      </ol>
      <Wrap label="Parcel list">
        {/* TBL-003: grid role on a static table, listitem rows, th as gridcell. TBL-004: wrong counts, no name. */}
        <table role="grid" aria-rowcount={50} aria-colcount={7} data-pet-issue="TBL-003 TBL-004">
          <thead>
            <tr role="listitem">
              <th role="gridcell">Parcel</th>
              <th role="gridcell">Stage</th>
              <th role="gridcell">Estimated</th>
            </tr>
          </thead>
          <tbody>
            {parcels.map((p) => (
              <tr key={p.parcel} role="listitem">
                <td>{p.parcel}</td>
                <td>{p.stage}</td>
                <td>{p.eta}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Wrap>
    </section>
  );
}
