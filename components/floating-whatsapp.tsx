'use client';

import React from 'react';
import {whatsappNumbers, whatsappUrl} from '../lib/brand';
import {WhatsAppIcon} from './icons';

export default function FloatingWhatsApp() {
  return (
    <aside aria-label="WhatsApp customer support" className="fixed bottom-6 right-6 z-40">
      <a
        href={whatsappUrl(whatsappNumbers[0].e164, 'Hello Dammy T & Motion Wears, I am reaching out from your website.')}
        target="_blank"
        rel="noreferrer"
        className="flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-3 text-xs font-semibold text-white shadow-lg transition hover:scale-105 hover:bg-[#20ba59] focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:ring-offset-2"
        aria-label="Chat with Dammy T & Motion Wears on WhatsApp"
      >
        <WhatsAppIcon size={20} fill="#ffffff" />
        <span className="hidden sm:inline">Chat with us</span>
      </a>
    </aside>
  );
}
