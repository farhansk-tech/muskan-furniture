import Reveal from '../ui/Reveal'

export default function Intro() {
  return (
    <section className="bg-cream px-5 py-24 lg:px-8 lg:py-36">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-24">
        <Reveal>
          <p className="eyebrow">Our Workshop</p>
          <h2 className="mt-5 font-serif text-4xl leading-tight text-walnut sm:text-5xl">
            Made to order, built around you.
          </h2>
        </Reveal>
        <Reveal delay={0.15} className="space-y-6 text-lg leading-relaxed text-chocolate/80">
          <p>
            MUSKAN FURNITURES manufactures wooden furniture to order. Every piece starts with your
            requirements, your space and your choice of design, and is built to your measurements in
            the wood and finish you select.
          </p>
          <p>
            We proudly serve our home village and nearby villages, bringing custom craftsmanship
            closer to the families who will live with it every day.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
