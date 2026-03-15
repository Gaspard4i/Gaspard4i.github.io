import { useTranslation } from 'react-i18next'
import SectionLayout from '@/components/templates/SectionLayout'
import SkillsGrid from '@/components/organisms/SkillsGrid'
import ExperienceTimeline from '@/components/organisms/ExperienceTimeline'
import { useSupabase } from '@/hooks/useSupabase'
import { supabase } from '@/lib/supabase'
import type { Profile } from '@/types/profile'

export default function About() {
  const { t, i18n } = useTranslation()
  const { data: profile } = useSupabase<Profile>(() =>
    supabase.from('profile').select('*').single()
  )
  const bio = profile
    ? (i18n.language.startsWith('fr') ? profile.about_fr : profile.about_en)
    : t('about.bio')

  return (
    <>
      <SectionLayout title={t('about.title')} subtitle={t('about.subtitle')}>
        <div className="prose max-w-none text-base-content/80">
          <p>{bio}</p>
        </div>
      </SectionLayout>

      <SectionLayout
        title={t('about.skills')}
        subtitle={t('about.skillsSubtitle')}
        className="bg-base-200"
      >
        <SkillsGrid />
      </SectionLayout>

      <SectionLayout title={t('about.experience')} subtitle={t('about.experienceSubtitle')}>
        <ExperienceTimeline />
      </SectionLayout>
    </>
  )
}
