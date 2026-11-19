export default function SectionHeading({ eyebrow, title, description, align = 'center', light = false }) {
  const alignment = align === 'center' ? 'mx-auto text-center' : 'text-left'

  return (
    <div className={`max-w-2xl ${alignment}`}>
      {eyebrow && <p className={`eyebrow ${light ? '!text-beige' : ''}`}>{eyebrow}</p>}
      <h2 className={`mt-4 font-serif text-4xl leading-tight sm:text-5xl ${light ? 'text-cream' : 'text-walnut'}`}>
        {title}
      </h2>
      {description && (
        <p className={`mt-5 text-base leading-relaxed sm:text-lg ${light ? 'text-cream/75' : 'text-chocolate/70'}`}>
          {description}
        </p>
      )}
    </div>
  )
}
