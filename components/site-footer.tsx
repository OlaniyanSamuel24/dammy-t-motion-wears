import Link from 'next/link';
import {brandAddress, brandName, socials, whatsappNumbers, whatsappUrl} from '../lib/brand';
import {WhatsAppIcon, InstagramIcon, TikTokIcon} from './icons';
import {MapPin} from 'lucide-react';

export default function SiteFooter() {
  return (
    <footer className="bg-[var(--ink)] px-5 py-12 text-white lg:px-10">
      <div className="mx-auto grid max-w-[1400px] gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Link href="/" className="text-sm font-semibold uppercase tracking-[.08em]">
            {brandName}
          </Link>
          <p className="mt-3 max-w-xs text-sm leading-6 text-white/55">
            Clothes, shoes and ready-to-wear from Ibadan. Visit the shop or send a WhatsApp message to order.
          </p>
          <p className="mt-4 max-w-xs text-sm leading-6 text-white/70 flex items-start gap-2">
            <MapPin size={16} className="mt-1 shrink-0 text-[var(--accent)]" />
            <span>{brandAddress}</span>
          </p>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[.12em] text-white/45 flex items-center gap-1.5">
            <WhatsAppIcon size={14} fill="#25D366" /> WhatsApp
          </p>
          <div className="mt-4 grid gap-2.5 text-sm">
            {whatsappNumbers.map((number) => (
              <a
                key={number.e164}
                href={whatsappUrl(number.e164)}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-white/80 hover:text-white transition"
              >
                <WhatsAppIcon size={14} fill="#25D366" />
                <span>{number.display}</span>
              </a>
            ))}
          </div>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[.12em] text-white/45">Social</p>
          <div className="mt-4 grid gap-2.5 text-sm">
            <a
              href={socials.instagram.href}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-white/80 hover:text-white transition"
            >
              <InstagramIcon size={15} className="text-[#E4405F]" />
              <span>Instagram · {socials.instagram.handle}</span>
            </a>
            <a
              href={socials.tiktok.href}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-white/80 hover:text-white transition"
            >
              <TikTokIcon size={15} className="text-[#25F4EE]" fill="#25F4EE" />
              <span>TikTok · {socials.tiktok.handle}</span>
            </a>
            <a href="#shop" className="text-white/80 hover:text-white transition pt-1">
              Shop pieces
            </a>
            <Link href="/seller" className="text-white/80 hover:text-white transition">
              Sell with us
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
