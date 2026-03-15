import { useState, useRef, useEffect, type ReactNode } from 'react'
import { Sun, Monitor, Music, ChevronDown, Check } from 'lucide-react'
import { useTheme } from '@/hooks/useTheme'
import type { ThemeName } from '@/types/theme'

const THEME_ICONS: Record<ThemeName, ReactNode> = {
  original: <Sun size={15} />,
  'original-dark': <Sun size={15} />,
  vscode: <Monitor size={15} />,
  spotify: <Music size={15} />,
}

export default function ThemeSwitcher() {
  const { theme, setTheme, themes, currentTheme } = useTheme()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

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
        aria-label="Changer de thème"
        aria-expanded={isOpen}
      >
        {THEME_ICONS[theme]}
        <span className="hidden sm:inline text-sm">{currentTheme.name}</span>
        <ChevronDown size={13} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-40 bg-base-200 rounded-box shadow-lg z-50 py-1">
          {themes.map((t) => (
            <button
              key={t.id}
              className={`w-full flex items-center gap-3 px-4 py-2 text-sm hover:bg-base-300 transition-colors ${
                theme === t.id ? 'text-primary font-semibold' : 'text-base-content'
              }`}
              onClick={() => {
                setTheme(t.id as ThemeName)
                setIsOpen(false)
              }}
            >
              {THEME_ICONS[t.id as ThemeName]}
              <span>{t.name}</span>
              {theme === t.id && <Check size={14} className="ml-auto" />}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
