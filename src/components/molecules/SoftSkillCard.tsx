import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ChevronDown, ChevronUp } from 'lucide-react'
import type { SoftSkill } from '@/types/softSkill'

interface SoftSkillCardProps {
  softSkill: SoftSkill
}

export default function SoftSkillCard({ softSkill }: SoftSkillCardProps) {
  const { t, i18n } = useTranslation()
  const [open, setOpen] = useState(false)
  const fr = i18n.language.startsWith('fr')

  const name = fr ? softSkill.name_fr : softSkill.name_en
  const description = fr ? softSkill.description_fr : softSkill.description_en
  const situation = fr ? softSkill.situation_fr : softSkill.situation_en
  const analysis = fr ? softSkill.analysis_fr : softSkill.analysis_en

  return (
    <div className="card bg-base-100 border border-base-300">
      <div className="card-body p-4">
        <div className="flex items-start justify-between gap-2">
          <h4 className="font-semibold text-base-content">{name}</h4>
          <button
            onClick={() => setOpen(!open)}
            className="btn btn-ghost btn-xs btn-circle flex-shrink-0"
            aria-label={open ? 'Réduire' : 'Développer'}
          >
            {open ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </button>
        </div>

        <p className="text-sm text-base-content/70 leading-relaxed">{description}</p>

        {open && (
          <div className="mt-3 space-y-3 animate-fade-in">
            {situation && (
              <div className="bg-base-200 rounded-lg p-3">
                <p className="text-xs font-semibold text-secondary mb-1">{t('about.situation')}</p>
                {situation.split('\n').map((line, i) => (
                  <p key={i} className="text-sm text-base-content/80 leading-relaxed">{line}</p>
                ))}
              </div>
            )}
            {analysis && (
              <div className="border-l-2 border-secondary pl-3">
                <p className="text-xs font-semibold text-secondary mb-1">{t('about.analysis')}</p>
                {analysis.split('\n').map((line, i) => (
                  <p key={i} className="text-sm text-base-content/70 leading-relaxed italic">{line}</p>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
