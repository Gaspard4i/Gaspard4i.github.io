import { useTranslation } from 'react-i18next'

export function useI18nField() {
  const { t } = useTranslation()

  return function resolve(key: string | null | undefined, fallback: string): string {
    if (!key) return fallback
    const translated = t(key, { defaultValue: '' })
    return translated || fallback
  }
}
