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
  description: string
  long_description: string | null
  url: string | null
  github_url: string | null
  image_url: string | null
  featured: boolean
  year: number | null
  created_at: string
  project_skills: ProjectSkill[]
}
