import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowDown } from 'lucide-react'
import Button from '../ui/Button'
import ImageWithFallback from '../ui/ImageWithFallback'

gsap.registerPlugin(ScrollTrigger)

export default function Hero() {
  const root = useRef(null)
  const media = useRef(null)

  useLayoutEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const ctx = gsap.context(() => {
      gsap
        .timeline({ defaults: { ease: 'power4.out' } })
        .from(media.current, { scale: 1.15, duration: 2.6, ease: 'power2.out' })
        .from('[data-hero-line] > span', { yPercent: 110, duration: 1.3, stagger: 0.14 }, 0.3)
        .from('[data-hero-fade]', { opacity: 0, y: 24, duration: 1, stagger: 0.12 }, '-=0.9')

      if (!reduceMotion) {
        gsap.to(media.current, {
          yPercent: 8,
          ease: 'none',
          scrollTrigger: {
            trigger: root.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        })
      }
    }, root)

    return () => ctx.revert()
  }, [])

  return (
    <section id="top" ref={root} className="relative flex min-h-[100svh] items-end overflow-hidden bg-chocolate">
      <div ref={media} className="absolute inset-x-0 -top-[10%] h-[120%] will-change-transform">
        <ImageWithFallback
          src="/images/hero-interior.jpg"
          alt="Handcrafted solid wood furniture in a warm living room"
          loading="eager"
          className="h-full w-full object-cover"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-chocolate via-chocolate/60 to-chocolate/20" />
      <div className="absolute inset-0 bg-gradient-to-r from-chocolate/70 via-transparent to-transparent" />

      <div className="relative mx-auto w-full max-w-7xl px-5 pb-24 pt-40 lg:px-8 lg:pb-32">
        <p data-hero-fade className="eyebrow !text-beige">
          Custom Wooden Furniture · Made to Order
        </p>

        <h1 className="mt-6 max-w-4xl font-serif text-5xl leading-[1.02] text-cream sm:text-6xl lg:text-8xl">
          <span data-hero-line className="block overflow-hidden pb-2">
            <span className="inline-block">Crafting Furniture.</span>
          </span>
          <span data-hero-line className="block overflow-hidden pb-2">
            <span className="inline-block italic text-beige">Creating Memories.</span>
          </span>
        </h1>

        <p data-hero-fade className="mt-8 max-w-xl text-base leading-relaxed text-cream/80 sm:text-lg">
          Discover handcrafted wooden furniture, designed and manufactured according to your lifestyle.
        </p>

        <div data-hero-fade className="mt-10 flex flex-col gap-4 sm:flex-row">
          <Button href="#collection" variant="light">
            Explore Collection
          </Button>
          <Button href="/custom-order" variant="outline" className="text-cream">
            Customize Your Furniture
          </Button>
        </div>
      </div>

      <a
        href="#collection"
        aria-label="Scroll to collection"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 text-cream/70 sm:block"
      >
        <ArrowDown className="h-5 w-5 animate-bounce" />
      </a>
    </section>
  )
}
