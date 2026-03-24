import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import HeroSection from '@/components/organisms/HeroSection'
import ProjectGrid from '@/components/organisms/ProjectGrid'
import SkillsGrid from '@/components/organisms/SkillsGrid'
import ProExperienceSection from '@/components/organisms/ProExperienceSection'
import ExperienceTimeline from '@/components/organisms/ExperienceTimeline'
import SectionLayout from '@/components/templates/SectionLayout'

export default function Home() {
  const { t } = useTranslation()

  return (
    <>
      <HeroSection />

      {/* Expériences pro — le recruteur voit ça en premier après le hero */}
      <SectionLayout
        id="pro-experience"
        title={t('about.proExperience')}
        subtitle={t('about.proExperienceSubtitle')}
        className="bg-base-200"
      >
        <ProExperienceSection />
        <div className="mt-4 text-center">
          <Link to="/about#reflexive" className="btn btn-ghost btn-sm text-base-content/60 hover:text-primary">
            {t('about.reflexive')} →
          </Link>
        </div>
      </SectionLayout>

      <SectionLayout
        id="projects"
        title={t('projects.featuredTitle')}
        subtitle={t('projects.featuredSubtitle')}
      >
        <ProjectGrid featuredOnly limit={3} />
        <div className="mt-8 text-center">
          <Link to="/projects" className="btn btn-outline">
            {t('projects.seeAll')}
          </Link>
        </div>
      </SectionLayout>

      <SectionLayout id="skills" title={t('about.skills')} subtitle={t('about.skillsSubtitle')} className="bg-base-200">
        <SkillsGrid featuredOnly />
        <div className="mt-6 text-center">
          <Link to="/about#skills" className="btn btn-ghost btn-sm text-base-content/60 hover:text-primary">
            {t('about.skills')} →
          </Link>
        </div>
      </SectionLayout>

      <SectionLayout
        id="experience"
        title={t('about.experience')}
        subtitle={t('about.experienceSubtitle')}
      >
        <ExperienceTimeline />
      </SectionLayout>

      <SectionLayout id="contact" title={t('contact.title')} subtitle={t('contact.subtitle')} className="bg-base-200">
        <div className="text-center">
          <Link to="/contact" className="btn btn-primary btn-lg">
            {t('contact.send')}
          </Link>
        </div>
      </SectionLayout>
    </>
  )
}
