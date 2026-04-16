import { useTranslation } from 'react-i18next'
import { Info } from 'lucide-react'
import ScreenshotPlaceholder from '@/components/atoms/ScreenshotPlaceholder'

export default function DashMechanic() {
  const { t } = useTranslation()

  return (
    <div className="space-y-8">
      <p className="text-base-content/80 leading-relaxed">
        {t('wiki.gr.dash.intro')}
      </p>

      <h3 className="text-xl font-bold text-base-content">{t('wiki.gr.dash.howTo')}</h3>
      <ul className="steps steps-vertical">
        <li className="step step-primary">
          <div className="text-left">{t('wiki.gr.dash.step1')}</div>
        </li>
        <li className="step step-primary">
          <div className="text-left">
            {t('wiki.gr.dash.step2prefix')} <kbd className="kbd kbd-sm">G</kbd> {t('wiki.gr.dash.step2suffix')}
          </div>
        </li>
        <li className="step step-primary">
          <div className="text-left">
            {t('wiki.gr.dash.step3prefix')} <kbd className="kbd kbd-sm">G</kbd> {t('wiki.gr.dash.step3suffix')}
          </div>
        </li>
        <li className="step step-primary">
          <div className="text-left">{t('wiki.gr.dash.step4')}</div>
        </li>
      </ul>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ScreenshotPlaceholder label={t('wiki.gr.dash.screenshotCharging')} />
        <ScreenshotPlaceholder label={t('wiki.gr.dash.screenshotCooldown')} />
      </div>

      <h3 className="text-xl font-bold text-base-content">{t('wiki.gr.dash.tipsTitle')}</h3>
      <div className="space-y-3">
        <div className="alert">
          <Info size={18} />
          <span>{t('wiki.gr.dash.tipRelease')}</span>
        </div>
        <div className="alert">
          <Info size={18} />
          <span>{t('wiki.gr.dash.tipAutoRecharge')}</span>
        </div>
        <div className="alert alert-warning">
          <Info size={18} />
          <span>{t('wiki.gr.dash.tipOvercharge')}</span>
        </div>
      </div>
    </div>
  )
}
