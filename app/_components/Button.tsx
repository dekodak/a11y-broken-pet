import Link from 'next/link';
import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from 'react';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'ghost';
  href?: string;
  'data-pet-issue'?: string;
};

export default function Button({ variant = 'primary', href, className, children, type, ...rest }: ButtonProps) {
  const classes = `btn btn-${variant} ok${className ? ` ${className}` : ''}`;
  if (href) {
    return (
      <Link href={href} className={classes} {...(rest as unknown as AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {children}
      </Link>
    );
  }
  return (
    <button type={type ?? 'button'} className={classes} {...rest}>
      {children}
    </button>
  );
}
