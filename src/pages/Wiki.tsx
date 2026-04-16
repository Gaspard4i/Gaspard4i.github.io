import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { BookOpen, ChevronRight } from 'lucide-react'
import SectionLayout from '@/components/templates/SectionLayout'
import { WIKI_CATEGORIES } from '@/data/wikiMods'

export default function Wiki() {
  const { t } = useTranslation()

  return (
    <SectionLayout title={t('wiki.title')} subtitle={t('wiki.subtitle')}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {WIKI_CATEGORIES.map((cat) => (
          <Link
            key={cat.id}
            to={`/wiki/${cat.id}`}
            className="card bg-base-200 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          >
            <div className="card-body">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-primary/15 flex items-center justify-center">
                  <BookOpen size={24} className="text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="card-title text-lg">{t(cat.titleKey)}</h3>
                  <p className="text-base-content/60 text-sm">{t(cat.subtitleKey)}</p>
                </div>
                <ChevronRight size={20} className="text-base-content/40" />
              </div>
              <div className="mt-3">
                <span className="text-sm text-base-content/50">
                  {t('wiki.modCount', { count: cat.mods.length })}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </SectionLayout>
  )
}
