import { useTranslation } from 'react-i18next'
import { useSupabase } from '@/hooks/useSupabase'
import { supabase } from '@/lib/supabase'
import SkeletonBox from '@/components/atoms/SkeletonBox'
import type { Profile } from '@/types/profile'

interface ProseBlockProps {
  title: string
  content: string
  accent?: string
}

function ProseBlock({ title, content, accent = 'border-primary' }: ProseBlockProps) {
  if (!content) return null
  return (
    <div className={`border-l-3 ${accent} pl-4`}>
      <h3 className="text-base font-bold text-base-content mb-2">{title}</h3>
      <div className="prose max-w-none text-base-content/80">
        {content.split('\n\n').map((para, i) => (
          <p key={i} className="mb-3 text-sm leading-relaxed">{para}</p>
        ))}
      </div>
    </div>
  )
}

export default function ReflexiveSection() {
  const { t, i18n } = useTranslation()
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

  const reflexive = fr ? profile.reflexive_fr : profile.reflexive_en
  const strengths = fr ? profile.strengths_fr : profile.strengths_en
  const improvements = fr ? profile.improvements_fr : profile.improvements_en

  return (
    <div className="space-y-6">
      <ProseBlock
        title={t('about.reflexive')}
        content={reflexive}
        accent="border-primary"
      />
      <ProseBlock
        title={t('about.strengths')}
        content={strengths}
        accent="border-success"
      />
      <ProseBlock
        title={t('about.improvements')}
        content={improvements}
        accent="border-warning"
      />
    </div>
  )
}
