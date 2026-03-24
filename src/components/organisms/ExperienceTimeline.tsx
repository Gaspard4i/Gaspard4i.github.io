import { useTranslation } from 'react-i18next'
import { useSupabase } from '@/hooks/useSupabase'
import { supabase } from '@/lib/supabase'
import ExperienceItem from '@/components/molecules/ExperienceItem'
import SkeletonBox from '@/components/atoms/SkeletonBox'
import type { Experience } from '@/types/experience'

interface ExperienceTimelineProps {
  excludeTypes?: string[]
}

export default function ExperienceTimeline({ excludeTypes }: ExperienceTimelineProps) {
  const { t } = useTranslation()

  const { data: experiences, loading, error } = useSupabase<Experience[]>(() =>
    supabase.from('experiences').select('*').order('start_date', { ascending: false })
  )

  if (loading) {
    return <SkeletonBox className="h-16 w-full" count={4} />
  }

  if (error) {
    return (
      <div className="alert alert-error">
        <span>{t('common.error')}</span>
      </div>
    )
  }

  const filtered = excludeTypes
    ? (experiences ?? []).filter((exp) => !excludeTypes.includes(exp.type))
    : experiences

  return (
    <ol className="relative border-l border-base-300 ml-2">
      {filtered?.map((exp) => (
        <ExperienceItem key={exp.id} experience={exp} />
      ))}
    </ol>
  )
}
