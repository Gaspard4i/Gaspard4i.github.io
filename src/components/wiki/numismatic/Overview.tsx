import { useTranslation } from 'react-i18next'
import { Info } from 'lucide-react'

export default function Overview() {
  const { t } = useTranslation()

  return (
    <div className="space-y-8">
      <p className="text-lg text-base-content/80 leading-relaxed">
        {t('wiki.nr.overview.intro')}
      </p>
      <p className="text-base-content/80 leading-relaxed">
        {t('wiki.nr.overview.desc')}
      </p>

      <div className="alert alert-info">
        <Info size={18} />
        <span>{t('wiki.nr.overview.wipNotice')}</span>
      </div>
    </div>
  )
}
