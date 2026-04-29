export type ThemeName = 'original' | 'original-dark' | 'vscode' | 'spotify' | 'mandarine' | 'nextoo'

export interface ThemeDefinition {
  id: ThemeName
  name: string
  prefersDark: boolean
  primaryColor: string
}
