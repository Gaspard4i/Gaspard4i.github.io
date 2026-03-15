import { useState, useRef, useEffect } from 'react'
import { useTheme } from '@/hooks/useTheme'
import type { ThemeName } from '@/types/theme'

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
        className="btn btn-ghost btn-sm gap-2"
        onClick={() => setIsOpen((o) => !o)}
        aria-label="Changer de thème"
        aria-expanded={isOpen}
      >
        <span>{currentTheme.icon}</span>
        <span className="hidden sm:inline text-sm">{currentTheme.name}</span>
        <svg
          className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
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
              <span>{t.icon}</span>
              <span>{t.name}</span>
              {theme === t.id && (
                <svg className="w-4 h-4 ml-auto" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
