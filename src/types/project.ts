export interface Project {
  id: string
  title: string
  description: string
  techs: string[]
  url: string | null
  github_url: string | null
  image_url: string | null
  featured: boolean
  year: number | null
  created_at: string
}
