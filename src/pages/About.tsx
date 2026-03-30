import { useTranslation } from 'react-i18next'
import SectionLayout from '@/components/templates/SectionLayout'
import SkillsGrid from '@/components/organisms/SkillsGrid'
import ExperienceTimeline from '@/components/organisms/ExperienceTimeline'
import ProExperienceSection from '@/components/organisms/ProExperienceSection'
import ReflexiveSection from '@/components/organisms/ReflexiveSection'
import { useSupabase } from '@/hooks/useSupabase'
import { useI18nField } from '@/hooks/useI18nField'
import { supabase } from '@/lib/supabase'
import type { Profile } from '@/types/profile'

export default function About() {
  const { t, i18n } = useTranslation()
  const resolve = useI18nField()
  const { data: profile } = useSupabase<Profile>(() =>
    supabase.from('profile').select('*').single()
  )
  const fr = i18n.language.startsWith('fr')

  const positioning = profile
    ? resolve(profile.positioning_key, fr ? profile.positioning_fr : profile.positioning_en)
    : ''
  const bio = profile
    ? resolve(profile.about_key, fr ? profile.about_fr : profile.about_en)
    : t('about.bio')

  return (
    <>
      {/* 1. Positionnement professionnel */}
      <SectionLayout
        id="positioning"
        title={t('about.positioning')}
        subtitle={t('about.positioningSubtitle')}
      >
        <div className="prose max-w-none text-base-content/80">
          {positioning && positioning.split('\n\n').map((para, i) => (
            <p key={i} className="leading-relaxed">{para}</p>
          ))}
          {bio && bio.split('\n\n').map((para, i) => (
            <p key={`bio-${i}`} className="leading-relaxed">{para}</p>
          ))}
        </div>
      </SectionLayout>

      {/* 2. Expériences professionnelles détaillées */}
      <SectionLayout
        id="pro-experience"
        title={t('about.proExperience')}
        subtitle={t('about.proExperienceSubtitle')}
        className="bg-base-200"
      >
        <ProExperienceSection />
      </SectionLayout>

      {/* 3. Compétences techniques */}
      <SectionLayout
        id="skills"
        title={t('about.skills')}
        subtitle={t('about.skillsSubtitle')}
      >
        <SkillsGrid />
      </SectionLayout>

      {/* 4. Analyse réflexive */}
      <SectionLayout
        id="reflexive"
        title={t('about.reflexive')}
        subtitle={t('about.reflexiveSubtitle')}
        className="bg-base-200"
      >
        <ReflexiveSection />
      </SectionLayout>

      {/* 5. Parcours complet (timeline) */}
      <SectionLayout
        id="experience"
        title={t('about.experience')}
        subtitle={t('about.experienceSubtitle')}
      >
        <ExperienceTimeline />
      </SectionLayout>
    </>
  )
}
