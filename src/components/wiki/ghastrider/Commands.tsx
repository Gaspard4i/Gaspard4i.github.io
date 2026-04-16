import { useTranslation } from 'react-i18next'
import { Info } from 'lucide-react'
import ScreenshotPlaceholder from '@/components/atoms/ScreenshotPlaceholder'

export default function Commands() {
  const { t } = useTranslation()

  return (
    <div className="space-y-8">
      <h3 className="text-xl font-bold text-base-content">{t('wiki.gr.commands.debugTitle')}</h3>

      <div className="mockup-code">
        <pre data-prefix="$"><code>/function ghastrider:debug</code></pre>
      </div>

      <p className="text-base-content/80">{t('wiki.gr.commands.debugDesc')}</p>

      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>{t('wiki.gr.commands.actionCol')}</th>
              <th>{t('wiki.gr.commands.detailCol')}</th>
            </tr>
          </thead>
          <tbody>
            {(['peaceful', 'gamerules', 'weather', 'clearInv', 'killGhasts', 'spawnGhasts', 'giveItems'] as const).map((key) => (
              <tr key={key}>
                <td className="font-medium">{t(`wiki.gr.commands.actions.${key}.action`)}</td>
                <td className="text-base-content/70">{t(`wiki.gr.commands.actions.${key}.detail`)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ScreenshotPlaceholder label={t('wiki.gr.commands.screenshotDebug')} />

      <div className="alert alert-info">
        <Info size={18} />
        <span>{t('wiki.gr.commands.requiresCreative')}</span>
      </div>
    </div>
  )
}
