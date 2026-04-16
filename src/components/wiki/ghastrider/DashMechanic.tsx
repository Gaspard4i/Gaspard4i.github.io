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
          <div className="text-left">
            {t('wiki.gr.dash.step1')}
          </div>
        </li>
        <li className="step step-primary">
          <div className="text-left">
            {t('wiki.gr.dash.step2prefix')} <kbd className="kbd kbd-sm">{t('wiki.gr.dash.key')}</kbd> {t('wiki.gr.dash.step2suffix')}
          </div>
        </li>
        <li className="step step-primary">
          <div className="text-left">
            {t('wiki.gr.dash.step3prefix')} <kbd className="kbd kbd-sm">{t('wiki.gr.dash.key')}</kbd> {t('wiki.gr.dash.step3suffix')}
          </div>
        </li>
        <li className="step step-primary">
          <div className="text-left">
            {t('wiki.gr.dash.step4')}
          </div>
        </li>
        <li className="step step-primary">
          <div className="text-left">
            {t('wiki.gr.dash.step5prefix')} <kbd className="kbd kbd-sm">{t('wiki.gr.dash.key')}</kbd> {t('wiki.gr.dash.step5suffix')}
          </div>
        </li>
      </ul>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ScreenshotPlaceholder label={t('wiki.gr.dash.screenshotCharging')} />
        <ScreenshotPlaceholder label={t('wiki.gr.dash.screenshotCooldown')} />
      </div>

      <h3 className="text-xl font-bold text-base-content">{t('wiki.gr.dash.params')}</h3>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>{t('wiki.gr.dash.paramCol')}</th>
              <th>{t('wiki.gr.dash.valueCol')}</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>{t('wiki.gr.dash.minCharge')}</td><td>2/18 (~11%)</td></tr>
            <tr><td>{t('wiki.gr.dash.maxChargeTime')}</td><td>2s</td></tr>
            <tr><td>{t('wiki.gr.dash.maxCooldown')}</td><td>3s</td></tr>
            <tr><td>{t('wiki.gr.dash.verticalBoost')}</td><td>30%</td></tr>
            <tr>
              <td>{t('wiki.gr.dash.keyLabel')}</td>
              <td><kbd className="kbd kbd-sm">{t('wiki.gr.dash.key')}</kbd> ({t('wiki.gr.dash.configurable')})</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="alert alert-info">
        <Info size={18} />
        <span>{t('wiki.gr.dash.overchargeTip')}</span>
      </div>
    </div>
  )
}
