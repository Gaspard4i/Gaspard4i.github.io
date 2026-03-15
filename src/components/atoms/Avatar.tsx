interface AvatarProps {
  src?: string
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

export default function Avatar({ src, alt, size = 'md', className = '' }: AvatarProps) {
  return (
    <div className={`avatar ${className}`}>
      <div className={`${sizeClasses[size]} rounded-full ring ring-primary ring-offset-base-100 ring-offset-2`}>
        {src ? (
          <img src={src} alt={alt} />
        ) : (
          <div className="bg-base-300 flex items-center justify-center w-full h-full rounded-full">
            <span className="text-2xl font-bold text-base-content">
              {alt.charAt(0).toUpperCase()}
            </span>
          </div>
        )}
      </div>
    </div>
  )
}
