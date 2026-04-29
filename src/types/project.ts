export interface ProjectSkill {
  skill_id: string
  skills: {
    id: string
    name: string
    icon: string | null
    category: string | null
  }
}

export interface Project {
  id: string
  title: string
  title_key: string | null
  description: string
  description_key: string | null
  long_description: string | null
  long_description_key: string | null
  url: string | null
  github_url: string | null
  image_url: string | null
  featured: boolean
  year: number | null
  month: number | null
  day: number | null
  created_at: string
  project_skills: ProjectSkill[]
}

export interface HeroRole {
  id: string
  text_key: string
  text_default: string
  sort_order: number
  created_at: string
}
