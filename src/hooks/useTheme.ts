import { useState, useEffect, useCallback } from 'react'
import type { ThemeMode } from '@/types/theme'

const STORAGE_KEY = 'portfolio-theme'

function getSystemPreference(): 'light' | 'dark' {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export function useTheme() {
  const [mode, setModeState] = useState<ThemeMode>(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as ThemeMode | null
    return stored === 'light' || stored === 'dark' || stored === 'system' ? stored : 'system'
  })

  const resolvedTheme = mode === 'system' ? getSystemPreference() : mode

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', resolvedTheme)
    localStorage.setItem(STORAGE_KEY, mode)
  }, [mode, resolvedTheme])

  useEffect(() => {
    if (mode !== 'system') return
    const mql = window.matchMedia('(prefers-color-scheme: dark)')
    const handleChange = () => {
      document.documentElement.setAttribute('data-theme', getSystemPreference())
    }
    mql.addEventListener('change', handleChange)
    return () => mql.removeEventListener('change', handleChange)
  }, [mode])

  const setMode = useCallback((next: ThemeMode) => {
    setModeState(next)
  }, [])

  return { mode, setMode, resolvedTheme }
}
