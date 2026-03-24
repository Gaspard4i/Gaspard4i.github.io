import { useTranslation } from 'react-i18next'
import type { Experience } from '@/types/experience'

interface ExperienceItemProps {
  experience: Experience
}

function formatDate(dateStr: string, locale: string): string {
  const date = new Date(dateStr)
  return date.toLocaleDateString(locale === 'fr' ? 'fr-FR' : 'en-US', { month: 'long', year: 'numeric' })
}

export default function ExperienceItem({ experience }: ExperienceItemProps) {
  const { t, i18n } = useTranslation()
  const fr = i18n.language.startsWith('fr')
  const locale = fr ? 'fr' : 'en'

  const company = (fr ? experience.company : experience.company_en) ?? experience.company
  const role = (fr ? experience.role : experience.role_en) ?? experience.role
  const description = (fr ? experience.description : experience.description_en) ?? experience.description

  const startDate = formatDate(experience.start_date, locale)
  const endDate = experience.current
    ? t('common.present')
    : experience.end_date
      ? formatDate(experience.end_date, locale)
      : ''

  return (
    <li className="mb-6 ml-4">
      <div className="absolute w-3 h-3 bg-primary mt-1.5 -left-1.5 border border-base-100" />
      <time className="text-xs font-normal text-base-content/50">
        {startDate} – {endDate}
      </time>
      <h3 className="text-sm font-semibold text-base-content mt-0.5">{role}</h3>
      <p className="text-xs text-primary font-medium">{company}</p>
      {description && (
        <p className="text-xs text-base-content/70 mt-1">{description}</p>
      )}
    </li>
  )
}
