import type { Metadata } from 'next';
import './globals.css';
import CartHydration from '../components/cart-hydration';
import NavigationBehavior from '../components/navigation-behavior';
import MobileMenu from '../components/mobile-menu';
export const metadata: Metadata = { title:'Dammy T & Motion Wears — Curated African fashion', description:'A considered marketplace for modern African style by Dammy T & Motion Wears.' };
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body><CartHydration/><NavigationBehavior/><MobileMenu/>{children}</body></html>}
