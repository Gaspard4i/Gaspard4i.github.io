import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

export default function NotFound() {
  const { t } = useTranslation()

  return (
    <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center">
      <div className="text-center space-y-4">
        <p className="text-8xl font-bold text-primary font-mono">404</p>
        <h1 className="text-2xl font-semibold text-base-content">{t('notFound.title')}</h1>
        <p className="text-base-content/60">{t('notFound.subtitle')}</p>
        <Link to="/" className="btn btn-primary mt-4">
          {t('notFound.cta')}
        </Link>
      </div>
    </div>
  )
}
