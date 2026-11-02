'use client';

import { useState } from 'react';
import Breadcrumbs from '../_components/Breadcrumbs';
import Button from '../_components/Button';
import ProductCard from '../_components/ProductCard';
import SectionHeading from '../_components/SectionHeading';
import { formatPrice, products } from '../_data/products';
import './product.css';
import BuyBox from './_parts/BuyBox';
import { GalleryDesktop, GalleryStrip } from './_parts/Gallery';
import {
  BundleSection,
  CustomerSection,
  DetailsSection,
  FitSection,
  WarrantySection,
} from './_parts/TabSections';

const pairs = [products[1], products[4], products[7]];

export default function Page() {
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const addToCart = () => setAdded(true);

  return (
    <div className="page pd">
      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Shop', href: '/shop' },
          { label: 'Tents', href: '/shop' },
          { label: 'Ridgeback 2P Tent' },
        ]}
      />

      {/* DSK-002: buy box comes first in the DOM; CSS order puts it to the right of the gallery at >=768px */}
      <div className="pd-top" data-pet-issue="DSK-002">
        <GalleryStrip />
        <BuyBox qty={qty} onQty={setQty} added={added} onAdd={addToCart} />
        <GalleryDesktop />
      </div>

      <DetailsSection />
      <CustomerSection />
      <BundleSection />
      <FitSection />
      <WarrantySection />

      <section className="pd-pairs">
        <SectionHeading level={2} eyebrow="Complete the kit">Pairs well with</SectionHeading>
        <div className="grid-products">
          {pairs.map((item) => (
            <ProductCard key={item.id} product={item} />
          ))}
        </div>
      </section>

      {/* MOB-004: fixed add-to-cart bar sits over content while tabbing; no scroll padding is set */}
      <div className="pd-atc" data-pet-issue="MOB-004">
        <div className="pd-atc-info">
          <strong>Ridgeback 2P Tent</strong>
          <span className="price">{formatPrice(389)}</span>
        </div>
        <Button onClick={addToCart}>Add to cart</Button>
      </div>
    </div>
  );
}
