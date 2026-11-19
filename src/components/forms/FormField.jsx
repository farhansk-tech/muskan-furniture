export const inputClass =
  'w-full rounded-xl border border-beige bg-white px-4 py-3 text-base text-chocolate placeholder:text-chocolate/40 transition-colors focus:border-walnut focus:outline-none focus:ring-2 focus:ring-walnut/20 aria-[invalid=true]:border-red-700'

export default function FormField({ label, htmlFor, error, hint, required = false, children, className = '' }) {
  return (
    <div className={className}>
      <label htmlFor={htmlFor} className="mb-2 block text-sm font-medium text-chocolate">
        {label}
        {required && <span className="text-red-700"> *</span>}
      </label>
      {children}
      {hint && !error && <p className="mt-1.5 text-xs text-chocolate/55">{hint}</p>}
      {error && (
        <p role="alert" className="mt-1.5 text-xs text-red-700">
          {error}
        </p>
      )}
    </div>
  )
}
