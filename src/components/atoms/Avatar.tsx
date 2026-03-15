const GRAVATAR_HASH = 'ea7dd79c8a54c68d3149de07d613daa105ab40f29c64da6cbbe540d6f362f93c'

interface AvatarProps {
  alt: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
}

const sizeClasses = {
  sm: 'w-16 h-16',
  md: 'w-28 h-28',
  lg: 'w-48 h-48',
  xl: 'w-64 h-64',
}

const pixelSizes = { sm: 128, md: 224, lg: 384, xl: 512 }

export default function Avatar({ alt, size = 'md', className = '' }: AvatarProps) {
  const px = pixelSizes[size]
  const src = `https://www.gravatar.com/avatar/${GRAVATAR_HASH}?s=${px}&d=identicon`

  return (
    <div className={`avatar ${className}`}>
      <div className={`${sizeClasses[size]} mask mask-squircle ring ring-primary ring-offset-base-100 ring-offset-2`}>
        <img src={src} alt={alt} />
      </div>
    </div>
  )
}
