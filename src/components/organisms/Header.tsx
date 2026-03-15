import { useState, useRef, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Menu, X, Globe, ChevronDown, Check } from 'lucide-react'
import NavItem from '@/components/molecules/NavItem'
import ThemeSwitcher from '@/components/molecules/ThemeSwitcher'

const NAV_LINKS = [
  { to: '/', key: 'nav.home' },
  { to: '/projects', key: 'nav.projects' },
  { to: '/about', key: 'nav.about' },
  { to: '/contact', key: 'nav.contact' },
]

const LANGUAGES = [
  { code: 'fr', label: 'Français' },
  { code: 'en', label: 'English' },
]

function LanguageSwitcher() {
  const { i18n } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const current = LANGUAGES.find((l) => l.code === i18n.language) ?? LANGUAGES[0]

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        className="btn btn-ghost btn-sm gap-1.5"
        onClick={() => setIsOpen((o) => !o)}
        aria-label="Changer de langue"
        aria-expanded={isOpen}
      >
        <Globe size={15} />
        <span className="hidden sm:inline text-sm font-mono">{current.code.toUpperCase()}</span>
        <ChevronDown size={13} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-36 bg-base-200 rounded-box shadow-lg z-50 py-1">
          {LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              className={`w-full flex items-center gap-3 px-4 py-2 text-sm hover:bg-base-300 transition-colors ${
                i18n.language === lang.code ? 'text-primary font-semibold' : 'text-base-content'
              }`}
              onClick={() => {
                i18n.changeLanguage(lang.code)
                setIsOpen(false)
              }}
            >
              <span className="font-mono text-xs">{lang.code.toUpperCase()}</span>
              <span>{lang.label}</span>
              {i18n.language === lang.code && <Check size={14} className="ml-auto" />}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default function Header() {
  const { t } = useTranslation()
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 bg-base-100/90 backdrop-blur-sm border-b border-base-300">
      <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2 font-mono font-bold text-primary text-lg">
          <img src="/favicon.gif" alt="Finn" className="w-8 h-8 mask mask-squircle" />
          gaspard<span className="text-base-content/50">4i</span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <NavItem key={link.to} to={link.to} label={t(link.key)} />
          ))}
        </nav>

        {/* Controls */}
        <div className="flex items-center gap-1">
          <LanguageSwitcher />
          <ThemeSwitcher />

          {/* Mobile menu button */}
          <button
            className="btn btn-ghost btn-square btn-sm md:hidden"
            onClick={() => setMobileOpen((o) => !o)}
            aria-label="Menu"
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
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
