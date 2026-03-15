import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSupabase } from '@/hooks/useSupabase'
import { supabase } from '@/lib/supabase'
import SkillTag from '@/components/molecules/SkillTag'
import SkeletonBox from '@/components/atoms/SkeletonBox'
import type { Skill, SkillCategory } from '@/types/skill'

const CATEGORIES: { key: SkillCategory | 'all'; label: string }[] = [
  { key: 'all', label: 'Tout' },
  { key: 'backend', label: 'Backend' },
  { key: 'frontend', label: 'Frontend' },
  { key: 'database', label: 'Database' },
  { key: 'devops', label: 'DevOps' },
  { key: 'data-science', label: 'Data Science' },
  { key: 'tools', label: 'Outils' },
]

interface SkillsGridProps {
  featuredOnly?: boolean
}

export default function SkillsGrid({ featuredOnly = false }: SkillsGridProps) {
  const { t } = useTranslation()
  const [activeCategory, setActiveCategory] = useState<SkillCategory | 'all'>('all')

  const { data: skills, loading, error } = useSupabase<Skill[]>(() => {
    let query = supabase.from('skills').select('*').order('name')
    if (featuredOnly) query = query.eq('featured', true)
    return query
  })

  const filtered =
    activeCategory === 'all'
      ? skills ?? []
      : (skills ?? []).filter((s) => s.category === activeCategory)

  if (loading) {
    return <SkeletonBox className="h-8 w-full" count={3} />
  }

  if (error) {
    return (
      <div className="alert alert-error">
        <span>{t('common.error')}</span>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {!featuredOnly && (
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={`btn btn-sm ${
                activeCategory === cat.key ? 'btn-primary' : 'btn-ghost'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      )}

      <div className="flex flex-wrap gap-2">
        {filtered.map((skill) => (
          <SkillTag key={skill.id} skill={skill} />
        ))}
      </div>
    </div>
  )
}
