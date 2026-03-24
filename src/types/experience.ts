export type ExperienceType = 'stage' | 'alternance' | 'education' | 'job' | 'other'

export interface Experience {
  id: string
  company: string
  company_en: string | null
  role: string
  role_en: string | null
  description: string | null
  description_en: string | null
  start_date: string
  end_date: string | null
  current: boolean
  type: ExperienceType
  context_fr: string | null
  context_en: string | null
  missions_fr: string | null
  missions_en: string | null
  autonomy_fr: string | null
  autonomy_en: string | null
  interactions_fr: string | null
  interactions_en: string | null
}
