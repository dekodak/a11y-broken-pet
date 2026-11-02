import { useId, type ReactNode } from 'react';

export type IconName =
  | 'search' | 'menu' | 'close' | 'cart' | 'user' | 'heart' | 'home'
  | 'store' | 'bell' | 'gear' | 'info' | 'star' | 'leaf' | 'chevron';

interface IconProps {
  name: IconName;
  size?: number;
  title?: string;
}

const glyphs: Record<IconName, ReactNode> = {
  search: (<><circle cx="11" cy="11" r="7" /><path d="M16.5 16.5L21 21" /></>),
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  close: <path d="M6 6l12 12M18 6L6 18" />,
  cart: (<><path d="M3 4h2.5l2 11h10.5l2-8H7" /><circle cx="9.5" cy="19.5" r="1.3" /><circle cx="17" cy="19.5" r="1.3" /></>),
  user: (<><circle cx="12" cy="8" r="4" /><path d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7" /></>),
  heart: <path d="M12 20.5s-8-4.8-8-11a4.6 4.6 0 0 1 8-3 4.6 4.6 0 0 1 8 3c0 6.2-8 11-8 11z" />,
  home: <path d="M3 11l9-7.5 9 7.5M5.5 9.5V20h13V9.5M10 20v-6h4v6" />,
  store: <path d="M3 9l1.5-5h15L21 9v1a3 3 0 0 1-6 0 3 3 0 0 1-6 0 3 3 0 0 1-6 0V9zM5 13v7h14v-7" />,
  bell: <path d="M6 16v-5a6 6 0 0 1 12 0v5l1.5 2h-15zM10 21h4" />,
  gear: (<><circle cx="12" cy="12" r="3" /><path d="M12 2.5v3M12 18.5v3M2.5 12h3M18.5 12h3M5.3 5.3l2.1 2.1M16.6 16.6l2.1 2.1M18.7 5.3l-2.1 2.1M7.4 16.6l-2.1 2.1" /></>),
  info: (<><circle cx="12" cy="12" r="9" /><path d="M12 11v6M12 7.5v.5" /></>),
  star: <path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z" fill="currentColor" />,
  leaf: <path d="M5 19c0-9 5-14 15-14 0 10-5 15-14 15M5 19c3-5 6-8 10-10" />,
  chevron: <path d="M6 9l6 6 6-6" />,
};

export default function Icon({ name, size = 24, title }: IconProps) {
  const uid = useId();
  const titleId = title ? `icon-title-${uid}` : undefined;
  const a11y = title
    ? { role: 'img' as const, 'aria-labelledby': titleId }
    : { 'aria-hidden': true as const, focusable: false as const };
  return (
    <svg
      className="icon"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...a11y}
    >
      {title ? <title id={titleId}>{title}</title> : null}
      {glyphs[name]}
    </svg>
  );
}
