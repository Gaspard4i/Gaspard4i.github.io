import { useTranslation } from 'react-i18next'
import { useParams, Navigate } from 'react-router-dom'
import SectionLayout from '@/components/templates/SectionLayout'
import ModCard from '@/components/molecules/ModCard'
import { findCategory } from '@/data/wikiMods'

export default function WikiCategory() {
  const { t } = useTranslation()
  const { categoryId } = useParams<{ categoryId: string }>()
  const category = categoryId ? findCategory(categoryId) : null

  if (!category) return <Navigate to="/wiki" replace />

  return (
    <SectionLayout title={t(category.titleKey)} subtitle={t(category.subtitleKey)}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {category.mods.map((mod) => (
          <ModCard key={mod.id} mod={mod} categoryId={category.id} />
        ))}
      </div>
    </SectionLayout>
  )
}
