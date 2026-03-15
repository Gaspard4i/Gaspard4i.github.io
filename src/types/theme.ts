export type ThemeName = 'original' | 'vscode' | 'spotify'

export interface ThemeDefinition {
  id: ThemeName
  name: string
  prefersDark: boolean
  primaryColor: string
}
