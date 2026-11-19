import { motion } from 'framer-motion'
import Reveal from '../ui/Reveal'
import SectionHeading from '../ui/SectionHeading'
import { PROCESS_STEPS } from '../../data/home'

export default function ProcessStrip() {
  return (
    <section id="process" className="bg-cream px-5 py-24 lg:px-8 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <SectionHeading
            eyebrow="Our Manufacturing Process"
            title="From your idea to your living room"
            description="Six clear steps, followed in our workshop for every piece we make."
          />
        </Reveal>

        <div className="relative mt-20 grid gap-12 md:grid-cols-2 lg:grid-cols-6 lg:gap-6">
          <div className="absolute left-0 top-7 hidden h-px w-full bg-beige lg:block" aria-hidden="true">
            <motion.div
              className="h-px w-full origin-left bg-walnut"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.8, ease: 'easeInOut' }}
            />
          </div>

          {PROCESS_STEPS.map((step, index) => {
            const Icon = step.icon
            return (
              <Reveal key={step.title} delay={index * 0.1} className="relative">
                <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full border border-beige bg-cream text-walnut">
                  <Icon className="h-6 w-6" strokeWidth={1.5} />
                </div>
                <p className="mt-6 font-serif text-sm tracking-[0.2em] text-walnut/60">
                  0{index + 1}
                </p>
                <h3 className="mt-2 font-serif text-2xl text-walnut">{step.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-chocolate/70">{step.text}</p>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
