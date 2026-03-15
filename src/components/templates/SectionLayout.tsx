import type { ReactNode } from 'react'

interface SectionLayoutProps {
  title?: string
  subtitle?: string
  children: ReactNode
  className?: string
  id?: string
}

export default function SectionLayout({
  title,
  subtitle,
  children,
  className = '',
  id,
}: SectionLayoutProps) {
  return (
    <section id={id} className={`py-16 px-4 ${className}`}>
      <div className="max-w-5xl mx-auto">
        {(title || subtitle) && (
          <div className="mb-10">
            {title && (
              <h2 className="text-3xl font-bold text-base-content mb-2">{title}</h2>
            )}
            {subtitle && (
              <p className="text-base-content/60">{subtitle}</p>
            )}
            <div className="w-16 h-1 bg-primary rounded-full mt-3" />
          </div>
        )}
        {children}
      </div>
    </section>
  )
}
