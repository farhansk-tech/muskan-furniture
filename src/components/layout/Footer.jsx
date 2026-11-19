import { Clock, MapPin, MessageCircle, Phone } from 'lucide-react'
import { NAV_LINKS, SITE } from '../../data/site'
import AppLink from '../ui/AppLink'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer id="contact" className="bg-chocolate text-cream/75">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-20 lg:grid-cols-[1.2fr_1fr_1fr] lg:px-8">
        <div>
          <p className="font-serif text-2xl tracking-[0.18em] text-cream">
            MUSKAN <span className="font-light">FURNITURES</span>
          </p>
          <p className="mt-4 font-serif text-xl italic text-beige">{SITE.tagline}</p>
          <p className="mt-6 max-w-sm text-sm leading-relaxed">
            Custom wooden furniture, manufactured to your requirements.
          </p>
        </div>

        <div>
          <h4 className="eyebrow !text-beige">Visit &amp; Contact</h4>
          <ul className="mt-6 space-y-4 text-sm">
            <li className="flex gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-beige" />
              <span>{SITE.address}</span>
            </li>
            <li className="flex gap-3">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-beige" />
              <span>{SITE.phone}</span>
            </li>
            <li className="flex gap-3">
              <MessageCircle className="mt-0.5 h-4 w-4 shrink-0 text-beige" />
              <span>WhatsApp: {SITE.whatsappNumber}</span>
            </li>
            <li className="flex gap-3">
              <Clock className="mt-0.5 h-4 w-4 shrink-0 text-beige" />
              <span>{SITE.hours}</span>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="eyebrow !text-beige">Explore</h4>
          <ul className="mt-6 grid grid-cols-2 gap-3 text-sm">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <AppLink to={link.href} className="transition-colors hover:text-beige">
                  {link.label}
                </AppLink>
              </li>
            ))}
          </ul>

          <div className="mt-8 overflow-hidden rounded-2xl border border-beige/20">
            {SITE.mapEmbedUrl ? (
              <iframe
                title="MUSKAN FURNITURES location"
                src={SITE.mapEmbedUrl}
                loading="lazy"
                className="h-40 w-full"
                referrerPolicy="no-referrer-when-downgrade"
              />
            ) : (
              <div className="flex h-40 items-center justify-center p-4 text-center text-xs text-cream/50">
                Google Maps location will appear here once the embed link is added.
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="border-t border-beige/15">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-5 py-6 text-xs text-cream/50 sm:flex-row sm:justify-between lg:px-8">
          <p>© {year} MUSKAN FURNITURES. All rights reserved.</p>
          <p>{SITE.tagline}</p>
        </div>
      </div>
    </footer>
  )
}
