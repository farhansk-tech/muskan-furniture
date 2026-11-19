import { useEffect, useId, useState } from 'react'
import { ImagePlus, X } from 'lucide-react'

const ACCEPTED = ['image/jpeg', 'image/png', 'image/webp']
const MAX_MB = 5

export default function ImageUploadField({ file, onChange, onError }) {
  const id = useId()
  const [preview, setPreview] = useState(null)

  useEffect(() => {
    if (!file) {
      setPreview(null)
      return
    }
    const url = URL.createObjectURL(file)
    setPreview(url)
    return () => URL.revokeObjectURL(url)
  }, [file])

  function handleChange(e) {
    const picked = e.target.files?.[0]
    e.target.value = ''
    if (!picked) return
    if (!ACCEPTED.includes(picked.type)) {
      onError('Please upload a JPG, PNG or WebP image.')
      return
    }
    if (picked.size > MAX_MB * 1024 * 1024) {
      onError(`The image must be ${MAX_MB} MB or smaller.`)
      return
    }
    onError(undefined)
    onChange(picked)
  }

  return (
    <div>
      {preview ? (
        <div className="relative overflow-hidden rounded-2xl border border-beige bg-cream">
          <img src={preview} alt="Preview of your reference design" className="max-h-72 w-full object-contain" />
          <button
            type="button"
            onClick={() => onChange(null)}
            aria-label="Remove reference image"
            className="absolute right-3 top-3 rounded-full bg-chocolate/80 p-2 text-cream transition-colors hover:bg-chocolate"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ) : (
        <label
          htmlFor={id}
          className="flex cursor-pointer flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-beige bg-cream/60 px-6 py-10 text-center transition-colors hover:border-walnut hover:bg-beige/30"
        >
          <ImagePlus className="h-8 w-8 text-walnut" strokeWidth={1.5} />
          <span className="text-sm font-medium text-chocolate">Tap to upload a reference photo</span>
          <span className="text-xs text-chocolate/60">JPG, PNG or WebP, up to {MAX_MB} MB</span>
        </label>
      )}
      <input id={id} type="file" accept={ACCEPTED.join(',')} onChange={handleChange} className="sr-only" />
    </div>
  )
}
