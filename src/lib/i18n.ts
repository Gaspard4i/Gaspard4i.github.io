import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import HttpBackend from 'i18next-http-backend'
import { SUPPORTED_LANGS } from '@/lib/locales'
import { supabase } from '@/lib/supabase'

async function loadWithOverrides(_options: unknown, url: string, _payload: unknown, callback: (err: unknown, data: unknown) => void) {
  try {
    const langMatch = (url as string).match(/locales\/(\w+)\.json/)
    const lang = langMatch ? langMatch[1] : 'fr'

    const res = await fetch(url as string)
    const staticData = await res.json()

    const { data: overrides } = await supabase
      .from('translations')
      .select('key, value')
      .eq('lang', lang)

    if (overrides && overrides.length > 0) {
      for (const { key, value } of overrides) {
        const keys = key.split('.')
        let obj = staticData
        for (let i = 0; i < keys.length - 1; i++) {
          if (!obj[keys[i]]) obj[keys[i]] = {}
          obj = obj[keys[i]]
        }
        obj[keys[keys.length - 1]] = value
      }
    }

    callback(null, { status: 200, data: staticData })
  } catch (err) {
    callback(err, null)
  }
}

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
      request: loadWithOverrides,
    },
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: true,
    },
  })

export default i18n
