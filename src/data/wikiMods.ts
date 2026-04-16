import type { WikiCategory } from '@/types/wiki'

import GrOverview from '@/components/wiki/ghastrider/Overview'
import GrDash from '@/components/wiki/ghastrider/DashMechanic'
import GrIce from '@/components/wiki/ghastrider/IceFeeding'
import GrInstall from '@/components/wiki/ghastrider/Installation'
import GrCommands from '@/components/wiki/ghastrider/Commands'
import GrChangelog from '@/components/wiki/ghastrider/Changelog'

import NrOverview from '@/components/wiki/numismatic/Overview'
import NrCurrency from '@/components/wiki/numismatic/Currency'
import NrRoadmap from '@/components/wiki/numismatic/Roadmap'

export const WIKI_CATEGORIES: WikiCategory[] = [
  {
    id: 'minecraft',
    titleKey: 'wiki.minecraft.title',
    subtitleKey: 'wiki.minecraft.subtitle',
    mods: [
      {
        id: 'ghastrider',
        nameKey: 'wiki.mods.ghastrider.name',
        taglineKey: 'wiki.mods.ghastrider.tagline',
        version: '26.1.2.1-alpha.1',
        mc: '26.1.2',
        loaders: ['Fabric', 'NeoForge'],
        status: 'alpha',
        repo: 'https://github.com/Gaspard4i/ghastrider',
        icon: null,
        sections: [
          { id: 'overview', titleKey: 'wiki.gr.sections.overview', component: GrOverview },
          { id: 'dash', titleKey: 'wiki.gr.sections.dash', component: GrDash },
          { id: 'ice-feeding', titleKey: 'wiki.gr.sections.ice', component: GrIce },
          { id: 'installation', titleKey: 'wiki.gr.sections.installation', component: GrInstall },
          { id: 'commands', titleKey: 'wiki.gr.sections.commands', component: GrCommands },
          { id: 'changelog', titleKey: 'wiki.gr.sections.changelog', component: GrChangelog },
        ],
      },
      {
        id: 'numismatic-reimagined',
        nameKey: 'wiki.mods.numismatic.name',
        taglineKey: 'wiki.mods.numismatic.tagline',
        version: 'WIP',
        mc: '1.20.1',
        loaders: ['Fabric', 'Forge'],
        status: 'wip',
        repo: 'https://github.com/Gaspard4i/numismatic-reimagined',
        icon: null,
        sections: [
          { id: 'overview', titleKey: 'wiki.nr.sections.overview', component: NrOverview },
          { id: 'currency', titleKey: 'wiki.nr.sections.currency', component: NrCurrency },
          { id: 'roadmap', titleKey: 'wiki.nr.sections.roadmap', component: NrRoadmap },
        ],
      },
    ],
  },
]

export function findMod(modId: string) {
  for (const cat of WIKI_CATEGORIES) {
    const mod = cat.mods.find((m) => m.id === modId)
    if (mod) return { mod, category: cat }
  }
  return null
}

export function findCategory(categoryId: string) {
  return WIKI_CATEGORIES.find((c) => c.id === categoryId) ?? null
}
