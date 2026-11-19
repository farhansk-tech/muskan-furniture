import AppLink from './AppLink'

const variants = {
  primary: 'bg-walnut text-cream hover:bg-chocolate',
  light: 'bg-cream text-walnut hover:bg-beige',
  outline: 'border border-current hover:bg-white/10',
}

export default function Button({ variant = 'primary', href, className = '', children, ...props }) {
  const base = `group inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-medium tracking-wide transition-all duration-300 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 ${variants[variant]} ${className}`

  if (href) {
    return (
      <AppLink to={href} className={base} {...props}>
        {children}
      </AppLink>
    )
  }

  return (
    <button type="button" className={base} {...props}>
      {children}
    </button>
  )
}
