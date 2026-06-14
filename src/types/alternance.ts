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
  'Plus disponible',
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

// Provenance d'un contact : Nicolas (Excel de Nicolas), IMT (partage IMT),
// Claude (recommandations Claude), Autre (origine inconnue / à trier).
export const SOURCE_CATS = ['Nicolas', 'IMT', 'Claude', 'Autre'] as const
export type SourceCat = (typeof SOURCE_CATS)[number]

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
  source_cat: string
  notes: string | null
  created_at: string
  updated_at: string
}

// Table unifiée : offres + candidatures libres (ex-prospection DRH).
export const ITEM_TYPES = ['Offre', 'Candidature libre'] as const
export type ItemType = (typeof ITEM_TYPES)[number]

// Statuts unifiés (offres + candidatures libres).
export const ITEM_STATUTS = [
  'À postuler',
  'À envoyer',
  'Candidature envoyée',
  'Envoyé',
  'Relancé',
  'Relance 1 faite',
  'Relance 2 faite',
  'Entretien',
  'Réponse +',
  'Réponse -',
  'Refusé',
  'Accepté',
  'Abandonné',
  'Clôturé',
  'Plus disponible',
] as const
export type ItemStatut = (typeof ITEM_STATUTS)[number]

export interface AlternanceItem {
  id: string
  type: string // 'Offre' | 'Candidature libre'
  domaine: string
  entreprise: string
  poste: string | null
  localisation: string | null
  email: string | null
  contact: string | null
  tel: string | null
  linkedin: string | null
  secteur: string | null
  source: string | null
  source_cat: string
  ref: string | null
  lien: string | null
  priorite: string | null
  statut: string
  date_action: string | null
  date_relance: string | null
  notes: string | null
  zone_carte: string | null
  created_at: string
  updated_at: string
}

// Vue publique "avancement" (lecture seule, partage)
// etat : 'Fait' | 'Refusé' | 'Abandonné' | 'Plus disponible' | 'Pas encore'
// type : 'Offre' | 'Candidature libre'
export interface ProgressRow {
  type: string
  domaine: string
  entreprise: string
  poste: string | null
  localisation: string | null
  etat: string
}

// Note / source utile (issues du partage IMT filière ITR : consignes, contacts, liens)
export interface Note {
  id: string
  titre: string
  contenu: string | null
  lien: string | null
  ordre: number
  created_at: string
  updated_at: string
}
