import { useTranslation } from 'react-i18next'
import { useSupabase } from '@/hooks/useSupabase'
import { useI18nField } from '@/hooks/useI18nField'
import { supabase } from '@/lib/supabase'
import ProseBlock from '@/components/molecules/ProseBlock'
import SkeletonBox from '@/components/atoms/SkeletonBox'
import type { Profile } from '@/types/profile'

export default function ReflexiveSection() {
  const { t, i18n } = useTranslation()
  const resolve = useI18nField()
  const fr = i18n.language.startsWith('fr')

  const { data: profile, loading, error } = useSupabase<Profile>(() =>
    supabase.from('profile').select('*').single()
  )

  if (loading) {
    return <SkeletonBox className="h-20 w-full" count={3} />
  }

  if (error || !profile) {
    return (
      <div className="alert alert-error">
        <span>{t('common.error')}</span>
      </div>
    )
  }

  const reflexive = resolve(profile.reflexive_key, fr ? profile.reflexive_fr : profile.reflexive_en)
  const strengths = resolve(profile.strengths_key, fr ? profile.strengths_fr : profile.strengths_en)
  const improvements = resolve(profile.improvements_key, fr ? profile.improvements_fr : profile.improvements_en)

  return (
    <div className="space-y-5">
      <ProseBlock title={t('about.reflexive')} content={reflexive} accent="border-primary" defaultOpen />
      <ProseBlock title={t('about.strengths')} content={strengths} accent="border-success" />
      <ProseBlock title={t('about.improvements')} content={improvements} accent="border-warning" />
    </div>
  )
}
