'use client'

interface Props {
  src: string
  alt: string
  className?: string
  placeholderLabel?: string
}

export default function ClientImage({ src, alt, className, placeholderLabel }: Props) {
  if (!src) return null
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
    />
  )
}
