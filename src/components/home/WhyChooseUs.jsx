import Reveal from '../ui/Reveal'
import SectionHeading from '../ui/SectionHeading'
import { WHY_FEATURES } from '../../data/home'

export default function WhyChooseUs() {
  return (
    <section id="why-us" className="relative overflow-hidden bg-chocolate px-5 py-24 text-cream lg:px-8 lg:py-32">
      <div className="pointer-events-none absolute -right-40 -top-40 h-[32rem] w-[32rem] rounded-full bg-walnut/40 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">
        <Reveal>
          <SectionHeading
            light
            eyebrow="Why Choose Us"
            title="Built the way you asked for it"
            description="Direct manufacturing, personal service and furniture made to your requirements."
          />
        </Reveal>

        <div className="mt-16 grid gap-px overflow-hidden rounded-3xl bg-beige/15 sm:grid-cols-2 lg:grid-cols-3">
          {WHY_FEATURES.map((feature, index) => {
            const Icon = feature.icon
            return (
              <Reveal key={feature.title} delay={(index % 3) * 0.08} className="bg-chocolate p-8 lg:p-10">
                <Icon className="h-7 w-7 text-beige" strokeWidth={1.5} />
                <h3 className="mt-6 font-serif text-2xl">{feature.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-cream/70">{feature.text}</p>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
