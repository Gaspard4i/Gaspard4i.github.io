export type SoftSkillCategory = 'maniere_etre' | 'maniere_communiquer' | 'maniere_travailler'

export interface SoftSkill {
  id: string
  category: SoftSkillCategory
  name_fr: string
  name_en: string
  description_fr: string
  description_en: string
  situation_fr: string
  situation_en: string
  analysis_fr: string
  analysis_en: string
  icon: string | null
  sort_order: number
}
