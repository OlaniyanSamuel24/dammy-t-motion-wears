export const brandName = 'Dammy T & Motion Wears';
export const brandAddress = 'Labowo River, Ogunpa Market, Ibadan';

export const whatsappNumbers = [
  {display: '0703 111 1076', e164: '2347031111076'},
  {display: '0814 543 8482', e164: '2348145438482'},
] as const;

export const socials = {
  instagram: {
    label: 'Instagram',
    handle: 'Dammy T & Motion Wears',
    href: 'https://www.instagram.com/explore/search/keyword/?q=Dammy%20T%20%26%20Motion%20Wears',
  },
  tiktok: {
    label: 'TikTok',
    handle: 'Dammy T & Motion Wears',
    href: 'https://www.tiktok.com/search?q=Dammy%20T%20Motion%20Wears',
  },
} as const;

export function whatsappUrl(phone: string, text?: string) {
  const base = `https://wa.me/${phone}`;
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
}

export function orderWhatsAppText(input: {
  name: string;
  phone: string;
  address: string;
  items: string;
  total: string;
}) {
  return [
    'Hello Dammy T & Motion Wears, I want to place an order.',
    '',
    `Name: ${input.name}`,
    `Phone: ${input.phone}`,
    `Address: ${input.address}`,
    '',
    'Items:',
    input.items,
    '',
    `Total: ${input.total}`,
  ].join('\n');
}
