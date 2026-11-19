// Central place for business details.
// Everything marked with [brackets] is a placeholder. Replace it with real details.
// WhatsApp number: digits only, including country code (for example 91XXXXXXXXXX).
export const SITE = {
  name: 'MUSKAN FURNITURES',
  tagline: 'Your Design, Our Craftsmanship.',
  phone: '[Your Phone Number]',
  whatsappNumber: '[WhatsApp Number]',
  email: '[Your Email Address]',
  address: '[Business Address: Village, Tehsil, District, State, PIN]',
  hours: '[Working Hours]',
  mapEmbedUrl: '', // Paste the Google Maps embed src here when available
  whatsappDefaultMessage: 'Hello MUSKAN FURNITURES, I would like to discuss a custom furniture order.',
}

export const NAV_LINKS = [
  { label: 'Collection', href: '#collection' },
  { label: 'Custom Design', href: '#custom-design' },
  { label: 'Process', href: '#process' },
  { label: 'Why Us', href: '#why-us' },
  { label: 'Contact', href: '#contact' },
]

export const whatsappLink = (message = SITE.whatsappDefaultMessage) =>
  `https://wa.me/${SITE.whatsappNumber.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`
