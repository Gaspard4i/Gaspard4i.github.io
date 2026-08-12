import { ENABLED_LANGS } from '@/lib/enabledLocales'

// ALL_LOCALES : bloc auto-généré par loco-sync — do not edit manually
export const ALL_LOCALES = [
  {
    "code": "fr",
    "label": "Français"
  },
  {
    "code": "en",
    "label": "English"
  },
  {
    "code": "es",
    "label": "Español"
  },
  {
    "code": "it",
    "label": "Italiano"
  },
  {
    "code": "de",
    "label": "Deutsch"
  },
  {
    "code": "nl",
    "label": "Nederlands"
  },
  {
    "code": "pt",
    "label": "Português"
  }
] as const

// SUPPORTED_LOCALES : langues réellement exposées (filtrées par la liste blanche).
export const SUPPORTED_LOCALES = ALL_LOCALES.filter((l) =>
  (ENABLED_LANGS as readonly string[]).includes(l.code)
)

export type LocaleCode = typeof ALL_LOCALES[number]['code']
export const SUPPORTED_LANGS = SUPPORTED_LOCALES.map((l) => l.code)
