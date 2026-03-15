export type ThemeName = 'original' | 'original-dark' | 'vscode' | 'spotify'

export interface ThemeDefinition {
  id: ThemeName
  name: string
  prefersDark: boolean
  primaryColor: string
}
