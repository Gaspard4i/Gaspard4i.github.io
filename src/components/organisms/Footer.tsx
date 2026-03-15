import { useTranslation } from 'react-i18next'

const SOCIAL_LINKS = [
  {
    label: 'GitHub',
    href: 'https://github.com/Gaspard4i',
    icon: 'https://api.iconify.design/mdi/github.svg',
  },
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com/in/gaspard-catry',
    icon: 'https://api.iconify.design/mdi/linkedin.svg',
  },
]

export default function Footer() {
  const { t } = useTranslation()
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-base-300 bg-base-100">
      <div className="max-w-5xl mx-auto px-4 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-base-content/50">
          © {year} Gaspard Catry — {t('footer.madeWith')}
        </p>
        <div className="flex items-center gap-2">
          {SOCIAL_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.label}
              className="btn btn-ghost btn-sm btn-square hover:text-primary"
            >
              <img src={link.icon} alt={link.label} width={18} height={18} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
