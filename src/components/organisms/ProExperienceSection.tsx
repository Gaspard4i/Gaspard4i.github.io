import { useTranslation } from 'react-i18next'
import { useSupabase } from '@/hooks/useSupabase'
import { supabase } from '@/lib/supabase'
import ExperienceDetailCard from '@/components/molecules/ExperienceDetailCard'
import SkeletonBox from '@/components/atoms/SkeletonBox'
import type { Experience } from '@/types/experience'

const PRO_TYPES = ['stage', 'alternance']

export default function ProExperienceSection() {
  const { t } = useTranslation()

  const { data: experiences, loading, error } = useSupabase<Experience[]>(() =>
    supabase
      .from('experiences')
      .select('*')
      .in('type', PRO_TYPES)
      .order('start_date', { ascending: false })
  )

  if (loading) {
    return <SkeletonBox className="h-32 w-full" count={2} />
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
      {experiences?.map((exp) => (
        <ExperienceDetailCard key={exp.id} experience={exp} />
      ))}
    </div>
  )
}
