const GRAVATAR_HASH = 'ea7dd79c8a54c68d3149de07d613daa105ab40f29c64da6cbbe540d6f362f93c'

interface AvatarProps {
  alt: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
}

const sizeClasses = {
  sm: 'w-12 h-12',
  md: 'w-20 h-20',
  lg: 'w-32 h-32',
  xl: 'w-40 h-40',
}

const pixelSizes = { sm: 96, md: 160, lg: 256, xl: 320 }

export default function Avatar({ alt, size = 'md', className = '' }: AvatarProps) {
  const px = pixelSizes[size]
  const src = `https://www.gravatar.com/avatar/${GRAVATAR_HASH}?s=${px}&d=identicon`

  return (
    <div className={`avatar ${className}`}>
      <div className={`${sizeClasses[size]} rounded-full ring ring-primary ring-offset-base-100 ring-offset-2`}>
        <img src={src} alt={alt} />
      </div>
    </div>
  )
}
