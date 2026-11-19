import { useState } from 'react'

export default function ImageWithFallback({ src, alt, className = '', ...rest }) {
  const [failed, setFailed] = useState(false)

  if (failed || !src) {
    return <div role="img" aria-label={alt} className={`bg-wood-gradient ${className}`} />
  }

  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      onError={() => setFailed(true)}
      className={className}
      {...rest}
    />
  )
}
