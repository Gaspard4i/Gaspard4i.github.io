import { useTranslation } from 'react-i18next'
import { useParams, Navigate, NavLink } from 'react-router-dom'
import { SiGithub } from '@icons-pack/react-simple-icons'
import { ExternalLink, Gamepad2 } from 'lucide-react'
import Badge from '@/components/atoms/Badge'
import WikiSidebar from '@/components/molecules/WikiSidebar'
import { findMod } from '@/data/wikiMods'

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

export default function WikiModDetail() {
  const { t } = useTranslation()
  const { categoryId, modId, sectionId } = useParams<{
    categoryId: string
    modId: string
    sectionId?: string
  }>()

  const result = modId ? findMod(modId) : null
  if (!result || !categoryId) return <Navigate to="/wiki" replace />

  const { mod, category } = result
  const activeSection = sectionId
    ? mod.sections.find((s) => s.id === sectionId)
    : mod.sections[0]

  if (!activeSection) return <Navigate to={`/wiki/${categoryId}/${modId}`} replace />

  return (
    <section className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-lg bg-primary/15 flex items-center justify-center shrink-0">
              <Gamepad2 size={24} className="text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-base-content">{t(mod.nameKey)}</h1>
              <p className="text-base-content/60">{t(mod.taglineKey)}</p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2 mb-4">
            {mod.loaders.map((l) => (
              <Badge key={l} label={l} variant="neutral" size="sm" />
            ))}
            <Badge label={`MC ${mod.mc}`} variant="primary" size="sm" />
            <Badge label={STATUS_LABEL[mod.status]} variant={STATUS_VARIANT[mod.status]} size="sm" />
            {mod.version !== 'WIP' && (
              <Badge label={`v${mod.version}`} variant="ghost" size="sm" />
            )}
          </div>
          <div className="flex gap-2">
            <a href={mod.repo} target="_blank" rel="noopener noreferrer" className="btn btn-outline btn-sm gap-2">
              <SiGithub size={14} />
              GitHub
            </a>
            {mod.status !== 'wip' && (
              <a href={`${mod.repo}/releases/latest`} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-sm gap-2">
                <ExternalLink size={14} />
                {t('wiki.download')}
              </a>
            )}
          </div>
          <div className="w-16 h-1 bg-primary mt-6" />
        </div>

        {/* Mobile section tabs */}
        <div className="lg:hidden mb-6 overflow-x-auto">
          <div className="flex gap-1 min-w-max">
            {mod.sections.map((section) => (
              <NavLink
                key={section.id}
                to={`/wiki/${categoryId}/${mod.id}/${section.id}`}
                className={`btn btn-sm ${
                  section.id === activeSection.id ? 'btn-primary' : 'btn-ghost'
                }`}
              >
                {t(section.titleKey)}
              </NavLink>
            ))}
          </div>
        </div>

        {/* Content with sidebar */}
        <div className="flex gap-8">
          {/* Desktop sidebar */}
          <aside className="hidden lg:block w-56 shrink-0">
            <div className="sticky top-20">
              <WikiSidebar
                mod={mod}
                categoryId={category.id}
                activeSectionId={activeSection.id}
              />
            </div>
          </aside>

          {/* Main content */}
          <div className="flex-1 min-w-0">
            <div className="prose max-w-none">
              <h2 className="text-2xl font-bold text-base-content mb-6">
                {t(activeSection.titleKey)}
              </h2>
              <div
                className="text-base-content/80 leading-relaxed space-y-4"
                dangerouslySetInnerHTML={{ __html: t(activeSection.content) }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
