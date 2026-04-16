import { useTranslation } from 'react-i18next'
import { Download, ExternalLink } from 'lucide-react'

export default function Installation() {
  const { t } = useTranslation()

  return (
    <div className="space-y-8">
      <h3 className="text-xl font-bold text-base-content">{t('wiki.gr.install.requirements')}</h3>
      <ul className="space-y-2">
        {(['mc', 'loader', 'fabricApi'] as const).map((key) => (
          <li key={key} className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-primary shrink-0" />
            <span className="text-base-content/80">{t(`wiki.gr.install.req.${key}`)}</span>
          </li>
        ))}
      </ul>

      <h3 className="text-xl font-bold text-base-content">{t('wiki.gr.install.stepsTitle')}</h3>
      <ul className="steps steps-vertical">
        <li className="step step-primary">
          <div className="text-left">{t('wiki.gr.install.step1')}</div>
        </li>
        <li className="step step-primary">
          <div className="text-left">{t('wiki.gr.install.step2')}</div>
        </li>
        <li className="step step-primary">
          <div className="text-left">{t('wiki.gr.install.step3')}</div>
        </li>
        <li className="step step-primary">
          <div className="text-left">
            {t('wiki.gr.install.step4prefix')} <code className="bg-base-300 px-1.5 py-0.5 rounded text-sm">mods/</code> {t('wiki.gr.install.step4suffix')}
          </div>
        </li>
        <li className="step step-primary">
          <div className="text-left">{t('wiki.gr.install.step5')}</div>
        </li>
      </ul>

      <h3 className="text-xl font-bold text-base-content">{t('wiki.gr.install.downloadTitle')}</h3>
      <div className="flex flex-wrap gap-3">
        <a
          href="https://github.com/Gaspard4i/ghastrider/releases/latest"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-primary gap-2"
        >
          <Download size={16} />
          GitHub Releases
        </a>
        <a
          href="https://fabricmc.net/"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-outline btn-sm gap-2"
        >
          <ExternalLink size={14} />
          Fabric Loader
        </a>
        <a
          href="https://neoforged.net/"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-outline btn-sm gap-2"
        >
          <ExternalLink size={14} />
          NeoForge
        </a>
      </div>

      <p className="text-sm text-base-content/50">{t('wiki.gr.install.platforms')}</p>
    </div>
  )
}
