import { useTranslation } from 'react-i18next'
import { Zap, Snowflake, Wind, Timer, ArrowUpFromLine, RotateCw, Volume2, Sparkles } from 'lucide-react'
import ScreenshotPlaceholder from '@/components/atoms/ScreenshotPlaceholder'

const FEATURES = [
  { icon: Zap, key: 'wiki.gr.overview.chargeBar' },
  { icon: Timer, key: 'wiki.gr.overview.minThreshold' },
  { icon: Wind, key: 'wiki.gr.overview.overchargeDecay' },
  { icon: RotateCw, key: 'wiki.gr.overview.proportionalCd' },
  { icon: ArrowUpFromLine, key: 'wiki.gr.overview.autoRecharge' },
  { icon: Snowflake, key: 'wiki.gr.overview.iceFeeding' },
  { icon: Volume2, key: 'wiki.gr.overview.customSounds' },
  { icon: Sparkles, key: 'wiki.gr.overview.particles' },
]

export default function Overview() {
  const { t } = useTranslation()

  return (
    <div className="space-y-8">
      <p className="text-lg text-base-content/80 leading-relaxed">
        {t('wiki.gr.overview.intro')}
      </p>

      <ScreenshotPlaceholder label={t('wiki.gr.overview.screenshotRiding')} />

      <h3 className="text-xl font-bold text-base-content">{t('wiki.gr.overview.featuresTitle')}</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {FEATURES.map(({ icon: Icon, key }) => (
          <div key={key} className="flex items-start gap-3 p-4 bg-base-200 rounded-lg">
            <div className="w-9 h-9 rounded-lg bg-primary/15 flex items-center justify-center shrink-0">
              <Icon size={18} className="text-primary" />
            </div>
            <p className="text-sm text-base-content/80">{t(key)}</p>
          </div>
        ))}
      </div>

      <div className="alert">
        <Zap size={18} />
        <span>{t('wiki.gr.overview.tip')}</span>
      </div>
    </div>
  )
}
