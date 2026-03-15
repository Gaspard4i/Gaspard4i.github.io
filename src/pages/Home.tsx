import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import HeroSection from '@/components/organisms/HeroSection'
import ProjectGrid from '@/components/organisms/ProjectGrid'
import SkillsGrid from '@/components/organisms/SkillsGrid'
import SectionLayout from '@/components/templates/SectionLayout'

export default function Home() {
  const { t } = useTranslation()

  return (
    <>
      <HeroSection />

      <SectionLayout
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

      <SectionLayout title={t('about.skills')} subtitle={t('about.skillsSubtitle')}>
        <SkillsGrid featuredOnly />
      </SectionLayout>
    </>
  )
}
