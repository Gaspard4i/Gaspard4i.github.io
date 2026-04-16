import { useTranslation } from 'react-i18next'
import { NavLink } from 'react-router-dom'
import { ChevronLeft } from 'lucide-react'
import type { WikiMod } from '@/types/wiki'

interface WikiSidebarProps {
  mod: WikiMod
  categoryId: string
  activeSectionId?: string
}

export default function WikiSidebar({ mod, categoryId, activeSectionId }: WikiSidebarProps) {
  const { t } = useTranslation()

  return (
    <nav className="w-full">
      <NavLink
        to={`/wiki/${categoryId}`}
        className="flex items-center gap-1 text-sm text-base-content/60 hover:text-primary transition-colors mb-4"
      >
        <ChevronLeft size={14} />
        {t('wiki.backToCategory')}
      </NavLink>

      <h3 className="font-bold text-base-content mb-3">{t(mod.nameKey)}</h3>

      <ul className="flex flex-col gap-0.5">
        {mod.sections.map((section) => {
          const isActive = section.id === activeSectionId
          return (
            <li key={section.id}>
              <NavLink
                to={`/wiki/${categoryId}/${mod.id}/${section.id}`}
                className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                  isActive
                    ? 'bg-primary/15 text-primary font-semibold'
                    : 'text-base-content/70 hover:bg-base-300 hover:text-base-content'
                }`}
              >
                {t(section.titleKey)}
              </NavLink>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
