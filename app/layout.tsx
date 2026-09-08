import type { Metadata } from 'next';
import './globals.css';
import NavigationBehavior from '../components/navigation-behavior';
export const metadata: Metadata = { title:'Dammy T & Motion Wears — Curated African fashion', description:'A considered marketplace for modern African style by Dammy T & Motion Wears.' };
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body><NavigationBehavior/>{children}</body></html>}
