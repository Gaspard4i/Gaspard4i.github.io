interface IconProps {
  src: string
  alt?: string
  size?: number
  className?: string
}

export default function Icon({ src, alt = '', size = 24, className = '' }: IconProps) {
  return (
    <img
      src={src}
      alt={alt}
      width={size}
      height={size}
      className={`inline-block ${className}`}
      aria-hidden={!alt}
    />
  )
}
