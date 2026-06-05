// Types du suivi d'alternance (offres + prospection DRH).

export const DOMAINES = [
  'Développement',
  'Réseaux & Télécom',
  'Data',
  'IA',
  'Cybersécurité',
  'Autre / à trier',
] as const
export type Domaine = (typeof DOMAINES)[number]

export const OFFER_STATUTS = [
  'À postuler',
  'Candidature envoyée',
  'Relancé',
  'Entretien',
  'Refusé',
  'Accepté',
  'Abandonné',
] as const
export type OfferStatut = (typeof OFFER_STATUTS)[number]

export const PRIORITES = ['Haute', 'Moyenne', 'Basse'] as const
export type Priorite = (typeof PRIORITES)[number]

export const ZONES = ['OUI', 'NON', 'À CONFIRMER', 'À VÉRIFIER'] as const
export type Zone = (typeof ZONES)[number]

export const PROSPECT_STATUTS = [
  'À envoyer',
  'Envoyé',
  'Relance 1 faite',
  'Relance 2 faite',
  'Réponse +',
  'Réponse -',
  'Entretien',
  'Clôturé',
] as const
export type ProspectStatut = (typeof PROSPECT_STATUTS)[number]

export interface Offer {
  id: string
  domaine: string
  entreprise: string
  poste: string
  localisation: string | null
  source: string | null
  ref: string | null
  lien: string | null
  priorite: string | null
  statut: string
  date_candidature: string | null
  date_relance: string | null
  contact: string | null
  notes: string | null
  zone_carte: string | null
  created_at: string
  updated_at: string
}

export interface Prospect {
  id: string
  prio: boolean
  civilite: string | null
  nom: string | null
  prenom: string | null
  poste: string | null
  entreprise: string | null
  ville: string | null
  secteur: string | null
  email: string | null
  tel: string | null
  linkedin: string | null
  date_envoi: string | null
  statut: string
  notes: string | null
  created_at: string
  updated_at: string
}

// Vue publique "avancement" (lecture seule, partage)
export interface ProgressRow {
  domaine: string
  entreprise: string
  poste: string
  localisation: string | null
  fait: boolean
}
