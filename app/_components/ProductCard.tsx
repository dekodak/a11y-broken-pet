import Link from 'next/link';
import type { ReactNode } from 'react';
import Button from './Button';
import Icon from './Icon';
import ProductArt from './ProductArt';
import { formatPrice, type Product } from '../_data/products';

interface ProductCardProps {
  product: Product;
  titleClamp?: boolean;
  quickAdd?: 'always' | 'hover';
  more?: ReactNode;
}

function toneFor(id: string): 1 | 2 | 3 {
  let sum = 0;
  for (let i = 0; i < id.length; i += 1) sum += id.charCodeAt(i);
  return ((sum % 3) + 1) as 1 | 2 | 3;
}

export default function ProductCard({ product, titleClamp = false, quickAdd = 'always', more }: ProductCardProps) {
  const hover = quickAdd === 'hover';
  return (
    <article className={`pcard${hover ? ' qa-hover' : ''}`}>
      <div className="pcard-art">
        <ProductArt kind={product.kind} tone={toneFor(product.id)} />
        {product.badge ? <span className="pcard-badge">{product.badge}</span> : null}
        {more ? <div className="pcard-more">{more}</div> : null}
      </div>
      <div className="pcard-body">
        {/* MOB-010 when titleClamp: fixed-height clipped title on mobile */}
        <h3 className={`pcard-title${titleClamp ? ' clamp' : ''}`} data-pet-issue={titleClamp ? 'MOB-010' : undefined}>
          <Link href="/product" className="ok">{product.name}</Link>
        </h3>
        <p className="pcard-rating">
          <span className="stars"><Icon name="star" size={16} /></span>
          <span>{product.rating.toFixed(1)} out of 5, {product.reviews} reviews</span>
        </p>
        <p className="pcard-price">{formatPrice(product.price)}</p>
        {/* DSK-006 when quickAdd="hover": invisible until pointer hover on desktop */}
        <div className="pcard-add" data-pet-issue={hover ? 'DSK-006' : undefined}>
          <Button variant="secondary" aria-label={`Add to cart: ${product.name}`}>Add to cart</Button>
        </div>
      </div>
    </article>
  );
}
