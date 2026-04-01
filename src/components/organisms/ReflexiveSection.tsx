import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { useSupabase } from '@/hooks/useSupabase'
import { useI18nField } from '@/hooks/useI18nField'
import { supabase } from '@/lib/supabase'
import SkeletonBox from '@/components/atoms/SkeletonBox'
import type { Profile } from '@/types/profile'

interface ProseBlockProps {
  title: string
  content: string
  accent?: string
  defaultOpen?: boolean
}

function ProseBlock({ title, content, accent = 'border-primary', defaultOpen = false }: ProseBlockProps) {
  const [open, setOpen] = useState(defaultOpen)

  if (!content) return null

  const firstPara = content.split('\n\n')[0]
  const hasMore = content.includes('\n\n')

  return (
    <div className={`border-l-3 ${accent} pl-4`}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 w-full text-left group"
      >
        <h3 className="text-base font-bold text-base-content group-hover:text-primary transition-colors">{title}</h3>
        {hasMore && (
          <span className="text-base-content/40 group-hover:text-primary transition-colors">
            {open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </span>
        )}
      </button>
      <div className="prose max-w-none text-base-content/80 mt-2">
        {open ? (
          content.split('\n\n').map((para, i) => (
            <p key={i} className="mb-3 text-sm leading-relaxed">{para}</p>
          ))
        ) : (
          <p className="text-sm leading-relaxed">{firstPara}</p>
        )}
      </div>
    </div>
  )
}

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
