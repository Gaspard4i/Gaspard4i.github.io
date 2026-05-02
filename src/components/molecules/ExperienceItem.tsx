import { useTranslation } from 'react-i18next'
import type { Experience } from '@/types/experience'
import { variantForExperienceType, companyTextClass } from '@/lib/variants'

const DOT_BG: Record<string, string> = {
  primary: 'bg-primary',
  secondary: 'bg-secondary',
  accent: 'bg-accent',
  info: 'bg-info',
  success: 'bg-success',
  warning: 'bg-warning',
  error: 'bg-error',
  neutral: 'bg-neutral',
}
const TEXT_VARIANT: Record<string, string> = {
  primary: 'text-primary',
  secondary: 'text-secondary',
  accent: 'text-accent',
  info: 'text-info',
  success: 'text-success',
  warning: 'text-warning',
  error: 'text-error',
  neutral: 'text-base-content/70',
}

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

  const variant = variantForExperienceType(experience.type)
  const companyClass = companyTextClass(company, TEXT_VARIANT[variant] ?? TEXT_VARIANT.neutral)

  return (
    <li className="mb-6 ml-4">
      <div className={`absolute w-3 h-3 mt-1.5 -left-1.5 border border-base-100 ${DOT_BG[variant] ?? DOT_BG.neutral}`} />
      <time className="text-xs font-normal text-base-content/50">
        {startDate} – {endDate}
      </time>
      <h3 className="text-sm font-semibold text-base-content mt-0.5">{role}</h3>
      <p className={`text-xs font-medium ${companyClass}`}>{company}</p>
      {description && (
        <p className="text-xs text-base-content/70 mt-1">{description}</p>
      )}
    </li>
  )
}
