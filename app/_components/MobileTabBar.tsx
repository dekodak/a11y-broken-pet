import Link from 'next/link';
import Icon from './Icon';

export default function MobileTabBar() {
  // MOB-014: unnamed nav, icon-only links
  return (
    <nav className="tabbar" data-pet-issue="MOB-014">
      <Link href="/"><Icon name="home" /></Link>
      <Link href="/shop"><Icon name="store" /></Link>
      <Link href="/checkout"><Icon name="cart" /></Link>
      <Link href="/account"><Icon name="user" /></Link>
    </nav>
  );
}
