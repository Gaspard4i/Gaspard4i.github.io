export type ThemeName = 'original' | 'vscode' | 'spotify'

export interface ThemeDefinition {
  id: ThemeName
  name: string
  icon: string
  prefersDark: boolean
  primaryColor: string
}
