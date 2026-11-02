'use client';

import Link from 'next/link';
import { useState } from 'react';

const months = ['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'];
const spend = [120, 85, 240, 60, 310, 150];
const budget = [150, 150, 200, 150, 250, 200];
const orderCounts = [2, 1, 3, 1, 4, 2];
const lineX = [30, 80, 130, 180, 230, 280];

function barY(value: number, max: number, height: number): number {
  return height - (value / max) * height;
}

export function SpendBars() {
  return (
    <section className="card" aria-labelledby="spend-heading">
      <h3 id="spend-heading">Monthly spend</h3>
      {/* SVG-001: title and desc, no role */}
      <svg className="acc-chart" viewBox="0 0 320 170" data-pet-issue="SVG-001">
        <title>Spend by month</title>
        <desc>Bar chart of euro spend from May to October, peaking in September at 310.</desc>
        {spend.map((value, i) => {
          const h = (value / 320) * 120;
          return (
            <g key={months[i]}>
              <rect x={20 + i * 48} y={130 - h} width="30" height={h} rx="3" fill="#2f6b4f" />
              <text x={35 + i * 48} y="148" textAnchor="middle">{months[i]}</text>
            </g>
          );
        })}
      </svg>
    </section>
  );
}

export function BudgetBars() {
  return (
    <section className="card" aria-labelledby="budget-heading">
      <h3 id="budget-heading">Spend against budget</h3>
      {/* SVG-011: series separated by red vs green only */}
      <div data-pet-issue="SVG-011">
        <svg className="acc-chart" viewBox="0 0 320 150" role="img" aria-label="Monthly spend compared with budget">
          {spend.map((value, i) => {
            const over = value > budget[i];
            return (
              <g key={months[i]}>
                <rect x={20 + i * 48} y={barY(value, 320, 110)} width="30" height={(value / 320) * 110} rx="3" fill={over ? '#c0392b' : '#2e8b57'} />
                <text x={35 + i * 48} y="128" textAnchor="middle">{months[i]}</text>
              </g>
            );
          })}
        </svg>
        <ul className="acc-legend">
          <li><span className="acc-swatch" style={{ background: '#c0392b' }} /> Above plan</li>
          <li><span className="acc-swatch" style={{ background: '#2e8b57' }} /> Within plan</li>
        </ul>
      </div>
    </section>
  );
}

export function OrdersByMonth() {
  return (
    <section className="card" aria-labelledby="orders-month-heading">
      <h3 id="orders-month-heading">Orders by month</h3>
      {/* SVG-005: role img with focusable links inside */}
      <svg className="acc-chart" viewBox="0 0 320 150" role="img" aria-label="Orders by month" data-pet-issue="SVG-005">
        {orderCounts.map((count, i) => (
          <g key={months[i]}>
            <a href="/orders">
              <rect x={20 + i * 48} y={120 - count * 24} width="30" height={count * 24} rx="3" fill="#1f5a8a" />
            </a>
            <text x={35 + i * 48} y="138" textAnchor="middle">{months[i]}</text>
          </g>
        ))}
      </svg>
      <p className="muted" style={{ margin: 0 }}><Link href="/orders" className="ok">See order history</Link></p>
    </section>
  );
}

export function SpendLine() {
  const [active, setActive] = useState<number | null>(null);
  const points = spend.map((value, i) => ({ x: lineX[i], y: 130 - (value / 320) * 100, value, month: months[i] }));
  const path = points.map((pt, i) => `${i === 0 ? 'M' : 'L'}${pt.x} ${pt.y}`).join(' ');
  return (
    <section className="card acc-wide" aria-labelledby="trend-heading">
      <h3 id="trend-heading">Spending trend</h3>
      <svg className="acc-chart" viewBox="0 0 320 160" role="img" aria-label="Line chart of monthly spend, May to October">
        <path d={path} fill="none" stroke="#2f6b4f" strokeWidth="2.5" />
        {/* SVG-014: values revealed on mouse hover/click only */}
        <g className="acc-points" data-pet-issue="SVG-014">
          {points.map((pt, i) => (
            <circle
              key={pt.month}
              cx={pt.x}
              cy={pt.y}
              r="6"
              fill="#fff"
              stroke="#2f6b4f"
              strokeWidth="2.5"
              onMouseEnter={() => setActive(i)}
              onMouseLeave={() => setActive(null)}
              onClick={() => setActive(i)}
            />
          ))}
        </g>
        {points.map((pt) => (
          <text key={pt.month} x={pt.x} y="152" textAnchor="middle">{pt.month}</text>
        ))}
      </svg>
      <p className="acc-tip">{active === null ? '' : `${points[active].month}: EUR ${points[active].value.toFixed(2)}`}</p>
    </section>
  );
}
