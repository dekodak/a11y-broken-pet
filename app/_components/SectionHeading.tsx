import type { ReactNode } from 'react';

interface SectionHeadingProps {
  level: 2 | 3;
  eyebrow?: string;
  children: ReactNode;
}

export default function SectionHeading({ level, eyebrow, children }: SectionHeadingProps) {
  const Tag = level === 2 ? 'h2' : 'h3';
  return (
    <div className="section-heading">
      {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
      <Tag>{children}</Tag>
    </div>
  );
}
