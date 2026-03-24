import { useTranslation } from 'react-i18next'
import Badge from '@/components/atoms/Badge'
import type { Experience } from '@/types/experience'

interface ExperienceDetailCardProps {
  experience: Experience
}

function formatDate(dateStr: string, locale: string): string {
  const date = new Date(dateStr)
  return date.toLocaleDateString(locale === 'fr' ? 'fr-FR' : 'en-US', { month: 'long', year: 'numeric' })
}

interface DetailBlockProps {
  title: string
  content: string | null
}

function DetailBlock({ title, content }: DetailBlockProps) {
  if (!content) return null
  return (
    <div>
      <h4 className="text-sm font-semibold text-primary mb-1">{title}</h4>
      <div className="text-sm text-base-content/80 leading-relaxed">
        {content.split('\n').map((line, i) => (
          <p key={i} className={line.startsWith('-') ? 'ml-2' : 'mb-1'}>{line}</p>
        ))}
      </div>
    </div>
  )
}

export default function ExperienceDetailCard({ experience }: ExperienceDetailCardProps) {
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

  const context = fr ? experience.context_fr : experience.context_en
  const missions = fr ? experience.missions_fr : experience.missions_en
  const autonomy = fr ? experience.autonomy_fr : experience.autonomy_en
  const interactions = fr ? experience.interactions_fr : experience.interactions_en

  const hasDetails = context || missions || autonomy || interactions

  return (
    <div className="card bg-base-100 border border-base-300">
      <div className="card-body p-5">
        <div className="flex items-start justify-between gap-3 flex-wrap">
          <div>
            <h3 className="text-lg font-bold text-base-content">{role}</h3>
            <p className="text-sm text-primary font-medium">{company}</p>
            <p className="text-xs text-base-content/50 mt-0.5">{startDate} – {endDate}</p>
          </div>
          <Badge variant="primary" size="sm" label={t(`experienceTypes.${experience.type}`)} />
        </div>

        {description && (
          <p className="text-sm text-base-content/70 mt-2 leading-relaxed">{description}</p>
        )}

        {hasDetails && (
          <div className="mt-4 space-y-4 border-t border-base-200 pt-4">
            <DetailBlock title={t('about.context')} content={context} />
            <DetailBlock title={t('about.missions')} content={missions} />
            <DetailBlock title={t('about.autonomy')} content={autonomy} />
            <DetailBlock title={t('about.interactions')} content={interactions} />
          </div>
        )}
      </div>
    </div>
  )
}
