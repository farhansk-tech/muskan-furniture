import { useSearchParams } from 'react-router-dom'
import { MessageCircle } from 'lucide-react'
import CustomEnquiryForm from '../components/forms/CustomEnquiryForm'
import Button from '../components/ui/Button'
import { CATEGORIES } from '../data/categories'
import { whatsappLink } from '../data/site'

const STEPS = [
  'We review your enquiry and reference photo.',
  'You receive a quotation for your approval.',
  'You confirm the order and we begin manufacturing.',
  'We inspect, deliver and install in your village.',
]

export default function CustomOrderPage() {
  const [params] = useSearchParams()
  const requested = params.get('category')
  const initialCategory = CATEGORIES.some((c) => c.slug === requested) ? requested : ''

  return (
    <>
      <section className="bg-chocolate px-5 pb-16 pt-32 text-cream sm:pt-36 lg:px-8 lg:pb-20 lg:pt-44">
        <div className="mx-auto max-w-7xl">
          <p className="eyebrow !text-beige">Custom Furniture Enquiry</p>
          <h1 className="mt-5 max-w-3xl font-serif text-5xl leading-[1.05] sm:text-6xl">Tell us what you have in mind.</h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-cream/75 sm:text-lg">
            Share your measurements, wood and finish preferences and a reference photo. We will review your request and prepare a quotation for your approval.
          </p>
        </div>
      </section>

      <section className="bg-cream px-4 py-14 sm:px-5 lg:px-8 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1fr_340px] lg:gap-16">
          <CustomEnquiryForm initialCategory={initialCategory} />

          <aside className="space-y-6 lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-3xl bg-walnut p-8 text-cream">
              <h2 className="font-serif text-2xl">How it works</h2>
              <ol className="mt-6 space-y-5">
                {STEPS.map((step, i) => (
                  <li key={step} className="flex gap-4">
                    <span className="font-serif text-lg text-beige">0{i + 1}</span>
                    <span className="text-sm leading-relaxed text-cream/85">{step}</span>
                  </li>
                ))}
              </ol>
            </div>

            <div className="rounded-3xl border border-beige bg-white p-8">
              <h3 className="font-serif text-2xl text-walnut">Prefer to talk first?</h3>
              <p className="mt-3 text-sm leading-relaxed text-chocolate/70">
                Message us on WhatsApp and we will help you shape your idea before you submit.
              </p>
              <Button
                variant="primary"
                className="mt-6 w-full"
                href={whatsappLink('Hello, I would like to discuss a custom furniture order.')}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="h-4 w-4" />
                Chat on WhatsApp
              </Button>
            </div>
          </aside>
        </div>
      </section>
    </>
  )
}
