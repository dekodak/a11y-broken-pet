import type { ReactNode } from 'react';
import type { ProductKind } from '../_data/products';

interface ProductArtProps {
  kind: ProductKind;
  tone?: 1 | 2 | 3;
}

const tones: Record<1 | 2 | 3, [string, string, string]> = {
  1: ['#dfe9df', '#2f6b4f', '#d97b29'],
  2: ['#efe3d0', '#7a4b2a', '#2f6b4f'],
  3: ['#dbe5ee', '#1f5a8a', '#d97b29'],
};

function shape(kind: ProductKind, fg: string, accent: string): ReactNode {
  switch (kind) {
    case 'tent':
      return (<>
        <path d="M30 140L120 40l90 100z" fill={fg} />
        <path d="M120 40l30 100h-60z" fill={accent} opacity=".9" />
        <path d="M20 140h200" stroke={fg} strokeWidth="4" />
      </>);
    case 'pack':
      return (<>
        <rect x="75" y="35" width="90" height="110" rx="26" fill={fg} />
        <rect x="90" y="95" width="60" height="38" rx="10" fill={accent} />
        <path d="M100 35c0-14 40-14 40 0" stroke={fg} strokeWidth="6" fill="none" />
        <rect x="60" y="60" width="12" height="60" rx="6" fill={accent} />
        <rect x="168" y="60" width="12" height="60" rx="6" fill={accent} />
      </>);
    case 'boot':
      return (<>
        <path d="M70 40h50v50l60 18c14 4 20 12 20 26v6H60z" fill={fg} />
        <rect x="60" y="132" width="140" height="14" rx="7" fill={accent} />
        <path d="M78 58h34M78 72h34" stroke="#fff" strokeWidth="4" strokeLinecap="round" />
      </>);
    case 'jacket':
      return (<>
        <path d="M85 40h70l40 30-14 40-22-10v50H81v-50l-22 10-14-40z" fill={fg} />
        <path d="M120 40v120" stroke={accent} strokeWidth="5" />
        <path d="M86 90h68M86 118h68" stroke="#fff" strokeWidth="3" opacity=".5" />
      </>);
    case 'stove':
      return (<>
        <rect x="90" y="85" width="60" height="55" rx="8" fill={fg} />
        <path d="M80 85h80l-10-18H90z" fill={accent} />
        <path d="M105 60c-8-14 8-18 0-30 14 6 22 22 8 30" fill={accent} opacity=".8" />
        <rect x="70" y="140" width="100" height="8" rx="4" fill={fg} />
      </>);
    case 'filter':
      return (<>
        <rect x="95" y="35" width="50" height="22" rx="6" fill={accent} />
        <rect x="85" y="55" width="70" height="95" rx="20" fill={fg} />
        <rect x="98" y="80" width="44" height="40" rx="8" fill="#fff" opacity=".35" />
      </>);
  }
}

export default function ProductArt({ kind, tone = 1 }: ProductArtProps) {
  const [bg, fg, accent] = tones[tone];
  return (
    <svg className="product-art" viewBox="0 0 240 180" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">
      <rect width="240" height="180" fill={bg} />
      <circle cx="195" cy="38" r="16" fill={accent} opacity=".35" />
      <path d="M0 150c40-24 80-24 120-8s80 16 120-6v44H0z" fill={fg} opacity=".12" />
      {shape(kind, fg, accent)}
    </svg>
  );
}
