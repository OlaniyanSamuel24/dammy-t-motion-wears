import type { Metadata } from 'next';
import './globals.css';
import CartHydration from '../components/cart-hydration';
import NavigationBehavior from '../components/navigation-behavior';
import MobileMenu from '../components/mobile-menu';
import SiteFooter from '../components/site-footer';
import FloatingWhatsApp from '../components/floating-whatsapp';

export const metadata: Metadata = {
  title: 'Dammy T & Motion Wears',
  description: 'Clothes, shoes and ready-to-wear from Ogunpa Market, Ibadan.',
};

export default function RootLayout({children}:{children:React.ReactNode}) {
  return (
    <html lang="en">
      <body>
        <CartHydration />
        <NavigationBehavior />
        <MobileMenu />
        {children}
        <SiteFooter />
        <FloatingWhatsApp />
      </body>
    </html>
  );
}
