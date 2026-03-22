export type SkillCategory =
  | 'backend'
  | 'frontend'
  | 'devops'
  | 'database'
  | 'tools'
  | 'system'
  | 'data-science'
  | 'language'
  | 'fullstack'
  | 'soft-skill'

export interface Skill {
  id: string
  name: string
  category: SkillCategory
  level: 1 | 2 | 3 | 4 | 5
  icon: string | null
  featured: boolean
  description: string | null
}
