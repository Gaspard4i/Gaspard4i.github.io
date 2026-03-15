interface BadgeProps {
  label: string
  variant?: 'primary' | 'secondary' | 'accent' | 'ghost' | 'neutral'
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const variantClasses = {
  primary: 'badge-primary',
  secondary: 'badge-secondary',
  accent: 'badge-accent',
  ghost: 'badge-ghost',
  neutral: 'badge-neutral',
}

const sizeClasses = {
  sm: 'badge-sm',
  md: '',
  lg: 'badge-lg',
}

export default function Badge({
  label,
  variant = 'neutral',
  size = 'md',
  className = '',
}: BadgeProps) {
  return (
    <span className={`badge ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}>
      {label}
    </span>
  )
}
