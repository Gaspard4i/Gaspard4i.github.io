import { useTranslation } from 'react-i18next'
import { Zap, Snowflake, Gamepad2 } from 'lucide-react'
import ScreenshotPlaceholder from '@/components/atoms/ScreenshotPlaceholder'

export default function Overview() {
  const { t } = useTranslation()

  return (
    <div className="space-y-8">
      <p className="text-lg text-base-content/80 leading-relaxed">
        {t('wiki.gr.overview.intro')}
      </p>

      <ScreenshotPlaceholder label={t('wiki.gr.overview.screenshotRiding')} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="card bg-base-200">
          <div className="card-body">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-primary/15 flex items-center justify-center">
                <Zap size={20} className="text-primary" />
              </div>
              <h3 className="font-bold text-base-content">{t('wiki.gr.overview.dashTitle')}</h3>
            </div>
            <p className="text-sm text-base-content/70">{t('wiki.gr.overview.dashDesc')}</p>
          </div>
        </div>

        <div className="card bg-base-200">
          <div className="card-body">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-info/15 flex items-center justify-center">
                <Snowflake size={20} className="text-info" />
              </div>
              <h3 className="font-bold text-base-content">{t('wiki.gr.overview.iceTitle')}</h3>
            </div>
            <p className="text-sm text-base-content/70">{t('wiki.gr.overview.iceDesc')}</p>
          </div>
        </div>
      </div>

      <h3 className="text-xl font-bold text-base-content">{t('wiki.gr.overview.quickStartTitle')}</h3>
      <ul className="steps steps-vertical">
        <li className="step step-primary">
          <div className="text-left">{t('wiki.gr.overview.qs1')}</div>
        </li>
        <li className="step step-primary">
          <div className="text-left">{t('wiki.gr.overview.qs2')}</div>
        </li>
        <li className="step step-primary">
          <div className="text-left">
            {t('wiki.gr.overview.qs3prefix')} <kbd className="kbd kbd-sm">G</kbd> {t('wiki.gr.overview.qs3suffix')}
          </div>
        </li>
        <li className="step step-primary">
          <div className="text-left">{t('wiki.gr.overview.qs4')}</div>
        </li>
      </ul>

      <div className="alert alert-info">
        <Gamepad2 size={18} />
        <span>{t('wiki.gr.overview.compatNote')}</span>
      </div>
    </div>
  )
}
