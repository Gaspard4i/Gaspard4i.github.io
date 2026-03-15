import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import HttpBackend from 'i18next-http-backend'
import { SUPPORTED_LANGS } from '@/lib/locales'

i18n
  .use(HttpBackend)
  .use(initReactI18next)
  .init({
    lng: 'fr',
    fallbackLng: 'fr',
    supportedLngs: SUPPORTED_LANGS,
    ns: ['translation'],
    defaultNS: 'translation',
    backend: {
      loadPath: '/locales/{{lng}}.json',
    },
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: true,
    },
  })

export default i18n
