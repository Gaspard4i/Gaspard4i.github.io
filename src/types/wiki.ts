import type { ComponentType } from 'react'

export interface WikiSection {
  id: string
  titleKey: string
  component: ComponentType
}

export type ModStatus = 'alpha' | 'beta' | 'release' | 'wip'

export interface WikiMod {
  id: string
  nameKey: string
  taglineKey: string
  version: string
  mc: string
  loaders: string[]
  status: ModStatus
  repo: string
  icon: string | null
  sections: WikiSection[]
}

export interface WikiCategory {
  id: string
  titleKey: string
  subtitleKey: string
  mods: WikiMod[]
}
