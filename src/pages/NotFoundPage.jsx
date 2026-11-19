import AppLink from '../components/ui/AppLink'

export default function NotFoundPage() {
  return (
    <section className="flex min-h-[70svh] flex-col items-center justify-center bg-cream px-5 pt-32 text-center">
      <p className="eyebrow">Page not found</p>
      <h1 className="mt-4 font-serif text-5xl text-walnut">This page has moved.</h1>
      <AppLink to="/" className="mt-8 rounded-full bg-walnut px-7 py-3 text-sm text-cream transition-colors hover:bg-chocolate">
        Back to home
      </AppLink>
    </section>
  )
}
