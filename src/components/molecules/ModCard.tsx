import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { ExternalLink, Gamepad2 } from 'lucide-react'
import { SiGithub } from '@icons-pack/react-simple-icons'
import Badge from '@/components/atoms/Badge'
import type { WikiMod } from '@/types/wiki'

const STATUS_VARIANT = {
  alpha: 'accent',
  beta: 'secondary',
  release: 'primary',
  wip: 'ghost',
} as const

const STATUS_LABEL = {
  alpha: 'Alpha',
  beta: 'Beta',
  release: 'Release',
  wip: 'In Development',
} as const

interface ModCardProps {
  mod: WikiMod
  categoryId: string
}

export default function ModCard({ mod, categoryId }: ModCardProps) {
  const { t } = useTranslation()

  return (
    <div className="card bg-base-200 shadow-md hover:shadow-xl transition-shadow duration-300 h-full">
      <Link to={`/wiki/${categoryId}/${mod.id}`} className="block">
        <div className="card-body gap-3">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-lg bg-primary/15 flex items-center justify-center shrink-0">
              <Gamepad2 size={28} className="text-primary" />
            </div>
            <div className="min-w-0">
              <h3 className="card-title text-base-content text-lg">{t(mod.nameKey)}</h3>
              <p className="text-base-content/70 text-sm">{t(mod.taglineKey)}</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-1.5 mt-1">
            {mod.loaders.map((l) => (
              <Badge key={l} label={l} variant="neutral" size="sm" />
            ))}
            <Badge label={`MC ${mod.mc}`} variant="primary" size="sm" />
            <Badge label={STATUS_LABEL[mod.status]} variant={STATUS_VARIANT[mod.status]} size="sm" />
            {mod.version !== 'WIP' && (
              <Badge label={`v${mod.version}`} variant="ghost" size="sm" />
            )}
          </div>
        </div>
      </Link>

      <div className="card-body pt-0">
        <div className="card-actions justify-end">
          <a
            href={mod.repo}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="btn btn-outline btn-sm gap-2"
          >
            <SiGithub size={14} />
            GitHub
          </a>
          <Link
            to={`/wiki/${categoryId}/${mod.id}`}
            className="btn btn-primary btn-sm gap-2"
          >
            <ExternalLink size={14} />
            {t('wiki.viewDocs')}
          </Link>
        </div>
      </div>
    </div>
  )
}
