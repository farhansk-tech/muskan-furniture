import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Reveal from '../ui/Reveal'
import SectionHeading from '../ui/SectionHeading'
import ImageWithFallback from '../ui/ImageWithFallback'
import AppLink from '../ui/AppLink'
import { CATEGORIES } from '../../data/categories'

// Each card shows a main photo. If a second "-detail" photo exists, it fades in on hover.
// Image files are described in public/images/README.txt.
export default function CategoriesPreview() {
  return (
    <section id="collection" className="bg-beige/35 px-5 py-20 sm:py-24 lg:px-8 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <SectionHeading
              align="left"
              eyebrow="Our Collection"
              title="Designs to begin with"
              description="Start from a design in our collection, or use these categories as a starting point for your own."
            />
            <AppLink to="/custom-order" className="inline-flex items-center gap-2 text-sm font-medium text-walnut">
              Request a custom piece <ArrowRight className="h-4 w-4" />
            </AppLink>
          </div>
        </Reveal>

        <div className="mt-12 grid grid-cols-2 gap-4 sm:gap-6 lg:mt-16 lg:grid-cols-5 lg:gap-7">
          {CATEGORIES.map((category, index) => (
            <Reveal key={category.slug} delay={(index % 5) * 0.06} className="h-full">
              <motion.article
                whileHover={{ y: -6 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                className="group flex h-full flex-col"
              >
                <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-beige shadow-[0_20px_40px_-28px_rgba(48,32,23,0.6)] transition-shadow duration-500 group-hover:shadow-[0_30px_50px_-28px_rgba(48,32,23,0.75)]">
                  <ImageWithFallback
                    src={`/images/categories/${category.slug}.jpg`}
                    alt={`${category.name} made by MUSKAN FURNITURES`}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.04]"
                  />
                  <img
                    src={`/images/categories/${category.slug}-detail.jpg`}
                    alt=""
                    aria-hidden="true"
                    loading="lazy"
                    decoding="async"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none'
                    }}
                    className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-700 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-chocolate/85 via-chocolate/10 to-transparent" />
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-4 top-4 h-px origin-left scale-x-0 bg-brass transition-transform duration-700 group-hover:scale-x-100"
                  />
                  <div className="absolute inset-x-4 bottom-4">
                    <h3 className="font-serif text-xl leading-tight text-cream sm:text-2xl">{category.name}</h3>
                    <p className="mt-1 text-[11px] uppercase tracking-[0.2em] text-beige opacity-100 transition-all duration-500 md:translate-y-2 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100">
                      Made to your design
                    </p>
                  </div>
                </div>

                <p className="mt-4 text-sm leading-relaxed text-chocolate/70">{category.description}</p>
                <AppLink
                  to={`/custom-order?category=${category.slug}`}
                  className="mt-auto inline-flex items-center gap-2 pt-3 text-sm font-medium text-walnut"
                >
                  Request customization
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </AppLink>
              </motion.article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
