import { useTranslation } from 'react-i18next'
import { Settings } from 'lucide-react'
import ScreenshotPlaceholder from '@/components/atoms/ScreenshotPlaceholder'

export default function Configuration() {
  const { t } = useTranslation()

  return (
    <div className="space-y-8">
      <p className="text-base-content/80 leading-relaxed">
        {t('wiki.gr.config.intro')}
      </p>

      <h3 className="text-xl font-bold text-base-content">{t('wiki.gr.config.keybindTitle')}</h3>
      <p className="text-base-content/70">{t('wiki.gr.config.keybindDesc')}</p>

      <ul className="steps steps-vertical">
        <li className="step step-primary">
          <div className="text-left">
            {t('wiki.gr.config.keybindStep1prefix')} <kbd className="kbd kbd-sm">Esc</kbd> {t('wiki.gr.config.keybindStep1suffix')}
          </div>
        </li>
        <li className="step step-primary">
          <div className="text-left">{t('wiki.gr.config.keybindStep2')}</div>
        </li>
        <li className="step step-primary">
          <div className="text-left">{t('wiki.gr.config.keybindStep3')}</div>
        </li>
        <li className="step step-primary">
          <div className="text-left">{t('wiki.gr.config.keybindStep4')}</div>
        </li>
      </ul>

      <ScreenshotPlaceholder label={t('wiki.gr.config.screenshotKeybind')} />

      <h3 className="text-xl font-bold text-base-content">{t('wiki.gr.config.settingsTitle')}</h3>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>{t('wiki.gr.config.settingCol')}</th>
              <th>{t('wiki.gr.config.defaultCol')}</th>
              <th>{t('wiki.gr.config.descCol')}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="font-medium">{t('wiki.gr.config.settDashKey')}</td>
              <td><kbd className="kbd kbd-sm">G</kbd></td>
              <td className="text-base-content/70">{t('wiki.gr.config.settDashKeyDesc')}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="alert">
        <Settings size={18} />
        <span>{t('wiki.gr.config.moreSettingsNote')}</span>
      </div>
    </div>
  )
}
