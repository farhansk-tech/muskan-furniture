import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Reveal from '../ui/Reveal'
import SectionHeading from '../ui/SectionHeading'
import ImageWithFallback from '../ui/ImageWithFallback'
import { CATEGORIES } from '../../data/categories'

export default function CategoriesPreview() {
  return (
    <section id="collection" className="bg-beige/35 px-5 py-24 lg:px-8 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <SectionHeading
              align="left"
              eyebrow="Our Collection"
              title="Designs to begin with"
              description="Start from a design in our collection, or use these categories as a starting point for your own."
            />
            <a href="#custom-design" className="inline-flex items-center gap-2 text-sm font-medium text-walnut">
              Request a custom piece <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </Reveal>

        <div className="mt-16 grid grid-cols-2 gap-5 sm:gap-7 lg:grid-cols-5">
          {CATEGORIES.map((category, index) => (
            <Reveal key={category.slug} delay={(index % 5) * 0.06} className="h-full">
              <motion.article
                whileHover={{ y: -8 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                className="group flex h-full flex-col"
              >
                <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-beige">
                  <ImageWithFallback
                    src={`/images/categories/${category.slug}.jpg`}
                    alt={`${category.name} by MUSKAN FURNITURES`}
                    className="h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-chocolate/80 via-transparent to-transparent" />
                  <h3 className="absolute bottom-4 left-4 right-4 font-serif text-xl text-cream sm:text-2xl">
                    {category.name}
                  </h3>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-chocolate/70">{category.description}</p>
                <a
                  href="#custom-design"
                  className="mt-auto inline-flex items-center gap-2 pt-3 text-sm font-medium text-walnut"
                >
                  Request customization
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
              </motion.article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
