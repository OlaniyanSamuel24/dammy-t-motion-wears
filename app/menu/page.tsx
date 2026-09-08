import Link from 'next/link';
import {ArrowLeft, ArrowRight, MapPin} from 'lucide-react';
import {brandAddress, socials, whatsappNumbers, whatsappUrl} from '../../lib/brand';
import {WhatsAppIcon, InstagramIcon, TikTokIcon} from '../../components/icons';

export default function MenuPage() {
  const links = [
    ['New in', '/#shop'],
    ['Women', '/?category=Women#shop'],
    ['Men', '/?category=Men#shop'],
    ['Shoes', '/?category=Shoes#shop'],
    ['Journal', '/#story'],
    ['My account', '/account'],
    ['Wishlist', '/wishlist'],
    ['Sell with us', '/seller'],
  ];

  return (
    <main className="min-h-screen bg-[var(--ink)] px-5 py-6 text-white lg:px-10">
      <header className="mx-auto flex max-w-[1200px] justify-between">
        <Link href="/" className="display text-2xl tracking-[.12em]">
          DAMMY T &amp; MOTION WEARS
        </Link>
        <Link href="/" className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest">
          <ArrowLeft size={15} /> Close
        </Link>
      </header>
      <nav className="mx-auto mt-12 max-w-[1200px]">
        {links.map(([label, href]) => (
          <Link
            href={href}
            key={label}
            className="group flex items-center justify-between border-b border-white/20 py-4 text-2xl sm:text-3xl"
          >
            <span className="display">{label}</span>
            <ArrowRight className="opacity-0 transition group-hover:opacity-100" />
          </Link>
        ))}
      </nav>

      <section className="mx-auto mt-12 max-w-[1200px] rounded border border-white/15 bg-white/5 p-6 text-xs text-white/80">
        <div className="grid gap-6 sm:grid-cols-3">
          <div>
            <p className="flex items-center gap-2 font-semibold text-white">
              <MapPin size={16} className="text-[var(--accent)]" /> Store Location
            </p>
            <p className="mt-2 text-white/70 leading-relaxed">{brandAddress}</p>
          </div>
          <div>
            <p className="flex items-center gap-2 font-semibold text-white">
              <WhatsAppIcon size={16} className="text-[#25D366]" fill="#25D366" /> WhatsApp Orders
            </p>
            <div className="mt-2 flex flex-col gap-2">
              {whatsappNumbers.map((number) => (
                <a
                  key={number.e164}
                  href={whatsappUrl(number.e164)}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded bg-white/10 px-3 py-1.5 text-white hover:bg-white/20 transition w-fit"
                >
                  <WhatsAppIcon size={13} fill="#25D366" />
                  <span>{number.display}</span>
                </a>
              ))}
            </div>
          </div>
          <div>
            <p className="font-semibold text-white">Follow Us</p>
            <div className="mt-2 flex flex-col gap-2 text-white/90">
              <a
                href={socials.instagram.href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded bg-white/10 px-3 py-1.5 hover:bg-white/20 transition w-fit"
              >
                <InstagramIcon size={15} className="text-[#E4405F]" />
                <span>Instagram: {socials.instagram.handle}</span>
              </a>
              <a
                href={socials.tiktok.href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded bg-white/10 px-3 py-1.5 hover:bg-white/20 transition w-fit"
              >
                <TikTokIcon size={15} className="text-[#25F4EE]" fill="#25F4EE" />
                <span>TikTok: {socials.tiktok.handle}</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
