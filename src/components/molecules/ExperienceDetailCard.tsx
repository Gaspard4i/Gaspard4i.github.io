import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ChevronDown, ChevronUp, Building2, Target, UserCheck, Users } from 'lucide-react'
import Badge from '@/components/atoms/Badge'
import type { Experience } from '@/types/experience'
import { variantForExperienceType, companyTextClass } from '@/lib/variants'

interface ExperienceDetailCardProps {
  experience: Experience
}

function formatDate(dateStr: string, locale: string): string {
  const date = new Date(dateStr)
  return date.toLocaleDateString(locale === 'fr' ? 'fr-FR' : 'en-US', { month: 'long', year: 'numeric' })
}

interface DetailBlockProps {
  icon: React.ReactNode
  title: string
  content: string | null
}

function DetailBlock({ icon, title, content }: DetailBlockProps) {
  if (!content) return null
  return (
    <div className="bg-base-200/50 rounded-lg p-3">
      <div className="flex items-center gap-2 mb-1.5">
        <span className="text-primary">{icon}</span>
        <h4 className="text-sm font-semibold text-base-content">{title}</h4>
      </div>
      <div className="text-sm text-base-content/70 leading-relaxed">
        {content.split('\n').map((line, i) => (
          <p key={i} className={line.startsWith('-') ? 'ml-3 before:content-["•"] before:mr-1.5 before:text-primary' : 'mb-1'}>{line.startsWith('- ') ? line.slice(2) : line}</p>
        ))}
      </div>
    </div>
  )
}

export default function ExperienceDetailCard({ experience }: ExperienceDetailCardProps) {
  const { t, i18n } = useTranslation()
  const [open, setOpen] = useState(false)
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
  const variant = variantForExperienceType(experience.type)
  const companyClass = companyTextClass(company)

  return (
    <div className="card bg-base-100 border border-base-300 hover:border-primary/30 transition-colors">
      <div className="card-body p-5">
        <div className="flex items-start justify-between gap-3 flex-wrap">
          <div className="flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-lg font-bold text-base-content">{role}</h3>
              <Badge variant={variant} size="sm" label={t(`experienceTypes.${experience.type}`)} />
            </div>
            <p className={`text-sm font-medium ${companyClass}`}>{company}</p>
            <p className="text-xs text-base-content/50 mt-0.5">{startDate} – {endDate}</p>
          </div>
        </div>

        {description && (
          <p className="text-sm text-base-content/70 mt-2 leading-relaxed line-clamp-2">{description}</p>
        )}

        {hasDetails && (
          <button
            onClick={() => setOpen(!open)}
            className="btn btn-ghost btn-sm gap-1.5 mt-2 self-start text-primary hover:bg-primary/10"
          >
            {open ? t('about.seeLess') : t('about.seeMore')}
            {open ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </button>
        )}

        {open && hasDetails && (
          <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-3 animate-fade-in">
            <DetailBlock icon={<Building2 size={14} />} title={t('about.context')} content={context} />
            <DetailBlock icon={<Target size={14} />} title={t('about.missions')} content={missions} />
            <DetailBlock icon={<UserCheck size={14} />} title={t('about.autonomy')} content={autonomy} />
            <DetailBlock icon={<Users size={14} />} title={t('about.interactions')} content={interactions} />
          </div>
        )}
      </div>
    </div>
  )
}
