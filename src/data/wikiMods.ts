import type { WikiCategory } from '@/types/wiki'

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
          { id: 'overview', titleKey: 'wiki.mods.ghastrider.sections.overview.title', content: 'wiki.mods.ghastrider.sections.overview.content' },
          { id: 'dash', titleKey: 'wiki.mods.ghastrider.sections.dash.title', content: 'wiki.mods.ghastrider.sections.dash.content' },
          { id: 'ice-feeding', titleKey: 'wiki.mods.ghastrider.sections.ice.title', content: 'wiki.mods.ghastrider.sections.ice.content' },
          { id: 'installation', titleKey: 'wiki.mods.ghastrider.sections.installation.title', content: 'wiki.mods.ghastrider.sections.installation.content' },
          { id: 'commands', titleKey: 'wiki.mods.ghastrider.sections.commands.title', content: 'wiki.mods.ghastrider.sections.commands.content' },
          { id: 'changelog', titleKey: 'wiki.mods.ghastrider.sections.changelog.title', content: 'wiki.mods.ghastrider.sections.changelog.content' },
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
          { id: 'overview', titleKey: 'wiki.mods.numismatic.sections.overview.title', content: 'wiki.mods.numismatic.sections.overview.content' },
          { id: 'currency', titleKey: 'wiki.mods.numismatic.sections.currency.title', content: 'wiki.mods.numismatic.sections.currency.content' },
          { id: 'roadmap', titleKey: 'wiki.mods.numismatic.sections.roadmap.title', content: 'wiki.mods.numismatic.sections.roadmap.content' },
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
