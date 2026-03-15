import { useTranslation } from 'react-i18next'
import SectionLayout from '@/components/templates/SectionLayout'
import SkillsGrid from '@/components/organisms/SkillsGrid'
import ExperienceTimeline from '@/components/organisms/ExperienceTimeline'

export default function About() {
  const { t } = useTranslation()

  return (
    <>
      <SectionLayout title={t('about.title')} subtitle={t('about.subtitle')}>
        <div className="prose max-w-none text-base-content/80">
          <p>{t('about.bio')}</p>
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
