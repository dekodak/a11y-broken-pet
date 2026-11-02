import Link from 'next/link';
import Icon from './Icon';

const columns = [
  { title: 'Shop', links: [['Tents', '/shop'], ['Packs', '/shop'], ['Boots', '/shop'], ['Layers', '/shop']] },
  { title: 'Help', links: [['Delivery', '/help'], ['Returns', '/help'], ['Size charts', '/orders'], ['Contact us', '/help']] },
  { title: 'Account', links: [['Your orders', '/orders'], ['Wishlist', '/account'], ['Checkout', '/checkout']] },
  { title: 'Fernwick', links: [['Our story', '/'], ['The Journal', '/'], ['Find a store', '/help']] },
];

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        {/* OK-GLB-1: named, correct footer navigation */}
        <nav aria-label="Footer" data-pet-issue="OK-GLB-1">
          {/* GLB-010: column headings are divs */}
          <div className="footer-cols" data-pet-issue="GLB-010">
            {columns.map((col) => (
              <div key={col.title}>
                <div className="h">{col.title}</div>
                <ul>
                  {col.links.map(([label, href]) => (
                    <li key={label}><Link href={href} className="ok">{label}</Link></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </nav>
        {/* GLB-010: social links contain only svgs */}
        <div className="footer-social" data-pet-issue="GLB-010">
          <Link href="/"><Icon name="leaf" /></Link>
          <Link href="/help"><Icon name="star" /></Link>
          <Link href="/shop"><Icon name="heart" /></Link>
        </div>
        <p className="footer-fine">Fernwick Outfitters. Gear for the long way round. Free delivery over EUR 75.</p>
      </div>
    </footer>
  );
}
