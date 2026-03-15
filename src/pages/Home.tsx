import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import HeroSection from '@/components/organisms/HeroSection'
import ProjectGrid from '@/components/organisms/ProjectGrid'
import SkillsGrid from '@/components/organisms/SkillsGrid'
import ExperienceTimeline from '@/components/organisms/ExperienceTimeline'
import SectionLayout from '@/components/templates/SectionLayout'

export default function Home() {
  const { t } = useTranslation()

  return (
    <>
      <HeroSection />

      <SectionLayout
        id="projects"
        title={t('projects.featuredTitle')}
        subtitle={t('projects.featuredSubtitle')}
        className="bg-base-200"
      >
        <ProjectGrid featuredOnly limit={3} />
        <div className="mt-8 text-center">
          <Link to="/projects" className="btn btn-outline">
            {t('projects.seeAll')}
          </Link>
        </div>
      </SectionLayout>

      <SectionLayout id="skills" title={t('about.skills')} subtitle={t('about.skillsSubtitle')}>
        <SkillsGrid featuredOnly />
        <div className="mt-6 text-center">
          <Link to="/about" className="btn btn-ghost btn-sm text-base-content/60 hover:text-primary">
            {t('about.skills')} →
          </Link>
        </div>
      </SectionLayout>

      <SectionLayout
        id="experience"
        title={t('about.experience')}
        subtitle={t('about.experienceSubtitle')}
        className="bg-base-200"
      >
        <ExperienceTimeline />
      </SectionLayout>

      <SectionLayout id="contact" title={t('contact.title')} subtitle={t('contact.subtitle')}>
        <div className="text-center">
          <Link to="/contact" className="btn btn-primary btn-lg">
            {t('contact.send')}
          </Link>
        </div>
      </SectionLayout>
    </>
  )
}
