import type { ReactNode } from 'react'

interface SocialLinkProps {
  href: string
  label: string
  icon: ReactNode
  className?: string
}

export default function SocialLink({ href, label, icon, className = '' }: SocialLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className={`btn btn-ghost btn-square btn-sm hover:text-primary transition-colors ${className}`}
    >
      {icon}
    </a>
  )
}
