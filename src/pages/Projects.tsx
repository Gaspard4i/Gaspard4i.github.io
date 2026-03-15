import { useTranslation } from 'react-i18next'
import SectionLayout from '@/components/templates/SectionLayout'
import ProjectGrid from '@/components/organisms/ProjectGrid'

export default function Projects() {
  const { t } = useTranslation()

  return (
    <SectionLayout
      title={t('projects.title')}
      subtitle={t('projects.subtitle')}
      id="projects"
    >
      <ProjectGrid />
    </SectionLayout>
  )
}
