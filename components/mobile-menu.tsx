'use client';

import Link from 'next/link';
import {ArrowLeft,Heart,MapPin,Menu,ShoppingBag,UserRound,X} from 'lucide-react';
import {useEffect,useState} from 'react';
import {usePathname} from 'next/navigation';
import {useStore} from '../lib/store';
import {brandAddress, whatsappNumbers, whatsappUrl, socials} from '../lib/brand';
import {WhatsAppIcon, InstagramIcon, TikTokIcon} from './icons';

const links = [
  ['New in', '/#shop'],
  ['Women', '/?category=Women#shop'],
  ['Men', '/?category=Men#shop'],
  ['Shoes', '/?category=Shoes#shop'],
  ['About', '/#story'],
  ['Account', '/account'],
];

export default function MobileMenu() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const {cart, setCartOpen} = useStore();
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);
  if (pathname === '/menu') return null;
  const close = () => setOpen(false);
  return (
    <>
      <button
        type="button"
        aria-label="Open mobile menu"
        aria-expanded={open}
        aria-controls="mobile-navigation"
        onClick={() => setOpen(true)}
        className="global-mobile-menu lg:hidden"
      >
        <Menu size={21} />
      </button>
      {open && (
        <div
          className="fixed inset-0 z-50 bg-[var(--ink)] text-white"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
          onClick={close}
        >
          <div id="mobile-navigation" className="flex min-h-full flex-col px-5 py-6 overflow-y-auto" onClick={(event) => event.stopPropagation()}>
            <div className="flex items-center justify-between">
              <Link href="/" onClick={close} className="text-sm font-semibold uppercase tracking-[.08em]">
                DAMMY T &amp; MOTION WEARS
              </Link>
              <button type="button" aria-label="Close mobile menu" onClick={close}>
                <X size={22} />
              </button>
            </div>
            <nav className="mt-8 flex-1">
              {links.map(([label, href]) => (
                <Link href={href} key={label} onClick={close} className="flex items-center justify-between border-b border-white/20 py-4 text-3xl">
                  <span className="display">{label}</span>
                </Link>
              ))}
            </nav>
            <div className="mt-6 grid grid-cols-2 gap-3 border-t border-white/20 pt-6">
              <Link href="/account" onClick={close} className="flex items-center justify-center gap-2 border border-white/30 py-3 text-[10px] font-bold uppercase tracking-widest">
                <UserRound size={15} /> Account
              </Link>
              <Link href="/wishlist" onClick={close} className="flex items-center justify-center gap-2 border border-white/30 py-3 text-[10px] font-bold uppercase tracking-widest">
                <Heart size={15} /> Wishlist
              </Link>
              <Link href="/account#orders" onClick={close} className="flex items-center justify-center gap-2 border border-white/30 py-3 text-[10px] font-bold uppercase tracking-widest">
                Orders
              </Link>
              <button
                type="button"
                onClick={() => {
                  close();
                  setCartOpen(true);
                }}
                className="flex items-center justify-center gap-2 border border-white/30 py-3 text-[10px] font-bold uppercase tracking-widest"
              >
                <ShoppingBag size={15} /> Bag ({cart.reduce((total, item) => total + item.quantity, 0)})
              </button>
            </div>
            <div className="mt-6 space-y-3 rounded border border-white/15 bg-white/5 p-4 text-xs text-white/80">
              <div className="flex items-start gap-2">
                <MapPin size={16} className="mt-0.5 shrink-0 text-[var(--accent)]" />
                <div>
                  <p className="font-semibold text-white">Visit Our Store</p>
                  <p className="text-white/70">{brandAddress}</p>
                </div>
              </div>
              <div className="border-t border-white/10 pt-2.5">
                <p className="font-semibold text-white flex items-center gap-1.5">
                  <WhatsAppIcon size={15} className="text-[#25D366]" fill="#25D366" /> WhatsApp Orders
                </p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {whatsappNumbers.map((number) => (
                    <a
                      key={number.e164}
                      href={whatsappUrl(number.e164)}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 rounded bg-white/10 px-2.5 py-1 text-white hover:bg-white/20 transition"
                    >
                      <WhatsAppIcon size={13} fill="#25D366" />
                      <span>{number.display}</span>
                    </a>
                  ))}
                </div>
              </div>
              <div className="border-t border-white/10 pt-2.5 flex flex-wrap gap-3 text-white/90">
                <a
                  href={socials.instagram.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 rounded bg-white/10 px-2.5 py-1 hover:bg-white/20 transition"
                >
                  <InstagramIcon size={14} className="text-[#E4405F]" />
                  <span>{socials.instagram.handle}</span>
                </a>
                <a
                  href={socials.tiktok.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 rounded bg-white/10 px-2.5 py-1 hover:bg-white/20 transition"
                >
                  <TikTokIcon size={14} className="text-[#25F4EE]" fill="#25F4EE" />
                  <span>TikTok</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
