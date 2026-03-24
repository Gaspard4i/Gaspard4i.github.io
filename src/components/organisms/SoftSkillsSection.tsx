import { useTranslation } from 'react-i18next'
import { useSupabase } from '@/hooks/useSupabase'
import { supabase } from '@/lib/supabase'
import SoftSkillCard from '@/components/molecules/SoftSkillCard'
import SkeletonBox from '@/components/atoms/SkeletonBox'
import type { SoftSkill, SoftSkillCategory } from '@/types/softSkill'

const CATEGORY_ORDER: SoftSkillCategory[] = [
  'maniere_etre',
  'maniere_communiquer',
  'maniere_travailler',
]

export default function SoftSkillsSection() {
  const { t } = useTranslation()

  const { data: softSkills, loading, error } = useSupabase<SoftSkill[]>(() =>
    supabase.from('soft_skills').select('*').order('sort_order')
  )

  if (loading) {
    return <SkeletonBox className="h-24 w-full" count={3} />
  }

  if (error) {
    return (
      <div className="alert alert-error">
        <span>{t('common.error')}</span>
      </div>
    )
  }

  const grouped = CATEGORY_ORDER.map((cat) => ({
    category: cat,
    items: (softSkills ?? []).filter((s) => s.category === cat),
  })).filter((g) => g.items.length > 0)

  return (
    <div className="space-y-8">
      {grouped.map(({ category, items }) => (
        <div key={category}>
          <h3 className="text-lg font-bold text-base-content mb-3">
            {t(`softSkillCategories.${category}`)}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {items.map((skill) => (
              <SoftSkillCard key={skill.id} softSkill={skill} />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
