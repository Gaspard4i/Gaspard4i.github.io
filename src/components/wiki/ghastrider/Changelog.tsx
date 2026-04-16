import { useTranslation } from 'react-i18next'
import { Tag } from 'lucide-react'
import Badge from '@/components/atoms/Badge'

export default function Changelog() {
  const { t } = useTranslation()

  return (
    <div className="space-y-8">
      <div className="card bg-base-200">
        <div className="card-body">
          <div className="flex items-center gap-3 mb-2">
            <Tag size={18} className="text-primary" />
            <h3 className="text-xl font-bold text-base-content">v26.1.2.1-alpha.1</h3>
            <Badge label="Alpha" variant="accent" size="sm" />
          </div>
          <p className="text-sm text-base-content/50 mb-4">2026-04-16</p>
          <p className="text-base-content/80 mb-4 font-medium">{t('wiki.gr.changelog.firstRelease')}</p>

          <ul className="space-y-2">
            {([
              'dashMechanic',
              'overchargeDecay',
              'proportionalCd',
              'autoRecharge',
              'verticalBoost',
              'iceFeeding',
              'customSounds',
              'itemParticles',
              'debugFunction',
              'loaderSupport',
            ] as const).map((key) => (
              <li key={key} className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-success mt-2 shrink-0" />
                <span className="text-sm text-base-content/80">{t(`wiki.gr.changelog.items.${key}`)}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
