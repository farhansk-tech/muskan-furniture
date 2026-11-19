import { MessageCircle } from 'lucide-react'
import Button from '../ui/Button'
import ImageWithFallback from '../ui/ImageWithFallback'
import Reveal from '../ui/Reveal'
import { whatsappLink } from '../../data/site'

export default function CtaBand() {
  return (
    <section id="custom-design" className="px-5 py-24 lg:px-8 lg:py-32">
      <Reveal className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-walnut text-cream">
        <ImageWithFallback
          src="/images/cta-workshop.jpg"
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-25"
        />
        <div className="relative grid gap-10 px-8 py-16 sm:px-12 lg:grid-cols-[1.4fr_1fr] lg:items-center lg:px-20 lg:py-24">
          <div>
            <p className="eyebrow !text-beige">Custom Furniture</p>
            <h2 className="mt-4 font-serif text-4xl leading-tight sm:text-5xl">
              Have a design in mind? Let&rsquo;s build it together.
            </h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-cream/75 sm:text-lg">
              Tell us what you need, share a reference photo, and we will prepare a quotation for your approval.
            </p>
          </div>
          <div className="flex flex-col gap-4 sm:flex-row lg:flex-col">
            <Button
              variant="light"
              href={whatsappLink('Hello, I would like a quotation for custom furniture.')}
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle className="h-4 w-4" />
              Request a Quotation
            </Button>
            <Button variant="outline" href="#collection" className="text-cream">
              Explore Collection
            </Button>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
