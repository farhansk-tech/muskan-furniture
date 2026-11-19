import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { NAV_LINKS } from '../../data/site'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const solid = scrolled || open

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        solid ? 'bg-cream/95 shadow-[0_1px_0_rgba(75,46,32,0.12)] backdrop-blur' : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8" aria-label="Main navigation">
        <a
          href="#top"
          className={`font-serif text-lg tracking-[0.18em] transition-colors duration-500 sm:text-xl ${
            solid ? 'text-walnut' : 'text-cream'
          }`}
        >
          MUSKAN <span className="font-light">FURNITURES</span>
        </a>

        <ul className="hidden items-center gap-8 lg:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={`text-sm tracking-wide transition-opacity hover:opacity-60 ${
                  solid ? 'text-chocolate' : 'text-cream/90'
                }`}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <a
            href="#custom-design"
            className={`hidden rounded-full border px-5 py-2 text-sm transition-colors duration-500 sm:inline-flex ${
              solid ? 'border-walnut text-walnut hover:bg-walnut hover:text-cream' : 'border-cream/60 text-cream hover:bg-cream hover:text-walnut'
            }`}
          >
            Customize
          </a>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            className={`rounded-full p-2 lg:hidden ${solid ? 'text-walnut' : 'text-cream'}`}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden bg-cream lg:hidden"
          >
            <ul className="flex flex-col px-5 pb-8">
              {NAV_LINKS.map((link) => (
                <li key={link.href} className="border-b border-beige/50">
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block py-4 font-serif text-2xl text-walnut"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
