import type { Metadata, Viewport } from 'next';
import './globals.css';
import Footer from './_components/Footer';
import Header from './_components/Header';
import MobileTabBar from './_components/MobileTabBar';

// GLB-002: every page shares this one generic title.
export const metadata: Metadata = {
  title: 'Fernwick Outfitters',
  description: 'Gear for the long way round',
  // Head-level / markerless defects: GLB-002 title, GLB-006 viewport, GLB-007 global focus CSS.
  other: { 'pet-issue': 'GLB-002 GLB-006 GLB-007' },
};

// GLB-006: zoom is disabled.
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // GLB-001: <html> has no lang attribute.
    <html data-pet-issue="GLB-001">
      {/* GLB-005: no skip link, no main landmark in the shell. */}
      <body data-pet-issue="GLB-005">
        <Header />
        {children}
        <Footer />
        <MobileTabBar />
        {/* MOB-009: landscape phones get a blocking rotate prompt. */}
        <div className="rotate-overlay" data-pet-issue="MOB-009">
          <p>Rotate your device to continue</p>
        </div>
      </body>
    </html>
  );
}
