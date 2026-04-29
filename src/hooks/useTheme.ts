import { useState, useEffect, useCallback } from 'react'
import type { ThemeName, ThemeDefinition } from '@/types/theme'

const STORAGE_KEY = 'portfolio-theme'

function getSystemDefault(): ThemeName {
  if (window.matchMedia('(prefers-color-scheme: dark)').matches) return 'original-dark'
  return 'original'
}

const THEMES: ThemeDefinition[] = [
  { id: 'original', name: 'Original', prefersDark: false, primaryColor: '#5c8a4a' },
  { id: 'original-dark', name: 'Original Dark', prefersDark: true, primaryColor: '#6aad56' },
  { id: 'vscode', name: 'VS Code', prefersDark: true, primaryColor: '#4fc3f7' },
  { id: 'spotify', name: 'Spotify', prefersDark: true, primaryColor: '#1db954' },
  { id: 'mandarine', name: 'Mandarine', prefersDark: false, primaryColor: '#e8762e' },
  { id: 'nextoo', name: 'Nextoo', prefersDark: false, primaryColor: '#1e5fb4' },
]

export function useTheme() {
  const [theme, setThemeState] = useState<ThemeName>(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as ThemeName | null
    const isValid = stored && THEMES.some((t) => t.id === stored)
    return isValid ? stored : getSystemDefault()
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem(STORAGE_KEY, theme)
  }, [theme])

  const setTheme = useCallback((name: ThemeName) => {
    setThemeState(name)
  }, [])

  const currentTheme = THEMES.find((t) => t.id === theme) ?? THEMES[0]

  return { theme, setTheme, themes: THEMES, currentTheme }
}
