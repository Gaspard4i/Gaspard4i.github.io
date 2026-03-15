import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import NavItem from '@/components/molecules/NavItem'
import ThemeSwitcher from '@/components/molecules/ThemeSwitcher'

const NAV_LINKS = [
  { to: '/', key: 'nav.home' },
  { to: '/projects', key: 'nav.projects' },
  { to: '/about', key: 'nav.about' },
  { to: '/contact', key: 'nav.contact' },
]

const LANGUAGES = [
  { code: 'fr', label: 'FR' },
  { code: 'en', label: 'EN' },
]

export default function Header() {
  const { t, i18n } = useTranslation()
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 bg-base-100/90 backdrop-blur-sm border-b border-base-300">
      <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="/" className="font-mono font-bold text-primary text-lg">
          gaspard<span className="text-base-content/50">4i</span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <NavItem key={link.to} to={link.to} label={t(link.key)} />
          ))}
        </nav>

        {/* Controls */}
        <div className="flex items-center gap-2">
          {/* Language switcher */}
          <div className="flex items-center gap-1">
            {LANGUAGES.map((lang) => (
              <button
                key={lang.code}
                onClick={() => i18n.changeLanguage(lang.code)}
                className={`btn btn-ghost btn-xs font-mono ${
                  i18n.language === lang.code ? 'text-primary font-bold' : 'text-base-content/50'
                }`}
              >
                {lang.label}
              </button>
            ))}
          </div>

          <ThemeSwitcher />

          {/* Mobile menu button */}
          <button
            className="btn btn-ghost btn-square btn-sm md:hidden"
            onClick={() => setMobileOpen((o) => !o)}
            aria-label="Menu"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <nav className="md:hidden border-t border-base-300 bg-base-100 px-4 py-2 flex flex-col gap-1">
          {NAV_LINKS.map((link) => (
            <NavItem
              key={link.to}
              to={link.to}
              label={t(link.key)}
              onClick={() => setMobileOpen(false)}
            />
          ))}
        </nav>
      )}
    </header>
  )
}
