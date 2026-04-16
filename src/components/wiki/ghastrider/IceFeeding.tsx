import { useTranslation } from 'react-i18next'
import { AlertTriangle } from 'lucide-react'
import ScreenshotPlaceholder from '@/components/atoms/ScreenshotPlaceholder'

const ICE_ROWS = [
  { itemKey: 'wiki.gr.ice.ice', effect: 'Speed I', duration: '10s', noteKey: 'wiki.gr.ice.stacks' },
  { itemKey: 'wiki.gr.ice.packedIce', effect: 'Speed II', duration: '10s', noteKey: 'wiki.gr.ice.stacks' },
  { itemKey: 'wiki.gr.ice.blueIce', effect: 'Speed III', duration: '10s', noteKey: 'wiki.gr.ice.stacks' },
  { itemKey: 'wiki.gr.ice.powderSnow', effect: 'Speed I', duration: '10s', noteKey: 'wiki.gr.ice.empties' },
]

export default function IceFeeding() {
  const { t } = useTranslation()

  return (
    <div className="space-y-8">
      <p className="text-base-content/80 leading-relaxed">
        {t('wiki.gr.ice.intro')}
      </p>

      <h3 className="text-xl font-bold text-base-content">{t('wiki.gr.ice.howTo')}</h3>
      <p className="text-base-content/70">{t('wiki.gr.ice.howToDesc')}</p>

      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>{t('wiki.gr.ice.itemCol')}</th>
              <th>{t('wiki.gr.ice.effectCol')}</th>
              <th>{t('wiki.gr.ice.durationCol')}</th>
              <th>{t('wiki.gr.ice.notesCol')}</th>
            </tr>
          </thead>
          <tbody>
            {ICE_ROWS.map(({ itemKey, effect, duration, noteKey }) => (
              <tr key={itemKey}>
                <td className="font-medium">{t(itemKey)}</td>
                <td><span className="badge badge-primary badge-sm">{effect}</span></td>
                <td>{duration}</td>
                <td className="text-base-content/60">{t(noteKey)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="alert alert-warning">
        <AlertTriangle size={18} />
        <span>{t('wiki.gr.ice.resetWarning')}</span>
      </div>

      <ScreenshotPlaceholder label={t('wiki.gr.ice.screenshotFeeding')} />
    </div>
  )
}
