// Helpers du suivi d'alternance : signature, modèles d'emails, Gmail, CSV, relances.
import type { Prospect } from '@/types/alternance'

// --- Coordonnées candidat (centralisées : à corriger ici une seule fois) ---
// NB : vérifier le téléphone (le CV indique 07 68 37 07 76).
export const CANDIDAT = {
  nom: 'Gaspard Catry',
  tel: '07 68 37 07 67',
  email: 'catry.gaspard@gmail.com',
  portfolio: 'portfolio.gazai.fr',
  linkedin: 'Gaspard Catry',
}

// --- Relances : +7 et +20 jours à partir de la date d'envoi ---
export function addDays(iso: string, days: number): string {
  const d = new Date(iso)
  d.setDate(d.getDate() + days)
  return d.toISOString().slice(0, 10)
}

export function relanceDates(dateEnvoi: string | null): { r1: string | null; r2: string | null } {
  if (!dateEnvoi) return { r1: null, r2: null }
  return { r1: addDays(dateEnvoi, 7), r2: addDays(dateEnvoi, 20) }
}

export function formatDateFr(iso: string | null): string {
  if (!iso) return '—'
  return new Date(iso).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' })
}

/** Une relance est "due" si sa date est passée ou aujourd'hui. */
export function isDue(iso: string | null): boolean {
  if (!iso) return false
  return new Date(iso) <= new Date(new Date().toDateString())
}

// --- Modèles d'emails -------------------------------------------------------
export type TemplateKind = 'candidature' | 'relance1' | 'relance2'

const SIGNATURE = `${CANDIDAT.nom}
${CANDIDAT.tel}
${CANDIDAT.email}
${CANDIDAT.portfolio}`

export const EMAIL_TEMPLATES: Record<TemplateKind, { label: string; subject: string; body: string }> = {
  candidature: {
    label: 'Candidature',
    subject: 'Candidature apprentissage 36 mois - Ingénieur Full-Stack / DevOps - IMT Nord Europe',
    body: `Madame, Monsieur,

[PHRASE PERSONNALISÉE ENTREPRISE]

Je me permets de vous adresser ma candidature pour un contrat d'apprentissage de 36 mois, dans le cadre de mon intégration au cycle ingénieur à l'IMT Nord Europe (spécialité Informatique, Télécommunication et Réseaux - site de Villeneuve-d'Ascq), pour une entrée en formation à la rentrée de septembre 2026.

Mon projet professionnel s'oriente vers l'ingénierie logicielle full-stack, les architectures backend et les pratiques DevOps. Je souhaite également élargir mes compétences vers la data et l'intelligence artificielle au fil de ces trois années.

Côté technique, je maîtrise le développement full-stack (Java, PHP, React, Spring Boot, Symfony), les API REST, les bases de données SQL et NoSQL, ainsi que les environnements DevOps : Docker, GitLab CI/CD, GitHub Actions.

Ces compétences ont été forgées en conditions réelles :
- Actuellement en alternance chez Mandarine Academy (Villeneuve-d'Ascq) comme développeur full-stack, je travaille sur la refonte d'interface d'une plateforme LMS, le développement de nouvelles fonctionnalités et la résolution de tickets en production, dans un environnement Agile/Scrum.
- En stage chez Nextoo (Roubaix), j'ai suivi une formation intensive full-stack et DevOps tout en participant à des projets internes : développement de trois applications web, mise en place d'une pipeline CI/CD complète et conteneurisation des environnements.

Vous trouverez mes réalisations concrètes sur mon portfolio : ${CANDIDAT.portfolio}

Je suis basé dans la région Nord et reste ouvert à des opportunités en Hauts-de-France ou en Île-de-France. Mon CV est joint à ce message.

Je serais heureux d'échanger avec vous lors d'un entretien pour vous présenter mon parcours et mieux comprendre vos besoins.

Cordialement,
${SIGNATURE}
LinkedIn : ${CANDIDAT.linkedin}`,
  },
  relance1: {
    label: 'Relance 1 (J+7)',
    subject: 'Relance - Candidature apprentissage ingénieur full-stack - Gaspard Catry',
    body: `Madame, Monsieur,

Je me permets de revenir vers vous suite à ma candidature envoyée le [date d'envoi], pour un contrat d'apprentissage de 36 mois dans le cadre de mon cycle ingénieur à l'IMT Nord Europe.

Je comprends que les processus de recrutement prennent du temps, et je ne souhaite pas être intrusif. Simplement, cette opportunité m'importe, et je préfère vous l'exprimer directement plutôt que d'attendre en silence.

Si ma candidature est en cours d'examen, je reste disponible pour tout échange complémentaire : présentation de mon portfolio, entretien technique ou simple appel de découverte.

Pour rappel, mon profil en quelques mots : développeur full-stack avec une expérience concrète en production (Mandarine Academy), une formation DevOps validée en stage (Nextoo), et une orientation future vers les architectures backend, le cloud et l'IA.

Portfolio : ${CANDIDAT.portfolio}

Bonne journée,
${SIGNATURE}`,
  },
  relance2: {
    label: 'Relance 2 (J+20)',
    subject: 'Dernier message - Candidature apprentissage ingénieur - Gaspard Catry',
    body: `Madame, Monsieur,

Je vous contacte une dernière fois au sujet de ma candidature pour un apprentissage de 36 mois, transmise le [date d'envoi initial].

Je ne veux pas multiplier les relances au-delà du raisonnable : si le profil ne correspond pas à vos besoins actuels, je l'entends tout à fait. Un retour de votre part, même négatif, me permettrait simplement de concentrer mes démarches ailleurs.

En revanche, si la question reste ouverte, je suis disponible rapidement pour un échange, à votre convenance.

Rappel rapide de mon profil :
- Admis IMT Nord Europe - cycle ingénieur, rentrée septembre 2026
- Full-stack (Java, PHP, React, Spring Boot, Symfony) + DevOps (Docker, CI/CD)
- Expérience en production chez Mandarine Academy + stage Nextoo
- Portfolio : ${CANDIDAT.portfolio}

Merci pour le temps que vous aurez accordé à ma candidature.

Cordialement,
${SIGNATURE}`,
  },
}

/** Salutation personnalisée selon la civilité + nom du contact. */
export function salutation(p?: Pick<Prospect, 'civilite' | 'nom'> | null): string {
  if (p?.civilite && p?.nom) return `${p.civilite} ${p.nom},`
  return 'Madame, Monsieur,'
}

/** Remplit un modèle pour un prospect donné (salutation + date d'envoi). */
export function fillTemplate(kind: TemplateKind, p?: Prospect | null): { subject: string; body: string } {
  const t = EMAIL_TEMPLATES[kind]
  let body = t.body
  body = body.replace('Madame, Monsieur,', salutation(p))
  if (p?.date_envoi) {
    body = body.split("[date d'envoi]").join(formatDateFr(p.date_envoi))
    body = body.split("[date d'envoi initial]").join(formatDateFr(p.date_envoi))
  }
  return { subject: t.subject, body }
}

// --- Gmail / mailto ---------------------------------------------------------
/** URL de composition Gmail (s'ouvre dans un nouvel onglet). */
export function gmailComposeUrl(to: string, subject: string, body: string): string {
  const params = new URLSearchParams({ view: 'cm', fs: '1', to, su: subject, body })
  return `https://mail.google.com/mail/?${params.toString()}`
}

export function mailtoUrl(to: string, subject: string, body: string): string {
  return `mailto:${encodeURIComponent(to)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}

// --- CSV --------------------------------------------------------------------
/** Parse un CSV (auto-détection , ou ;) avec gestion des guillemets. */
export function parseCsv(text: string): string[][] {
  const clean = text.replace(/^\uFEFF/, '')
  const delimiter = (clean.split('\n')[0].match(/;/g)?.length ?? 0) >= (clean.split('\n')[0].match(/,/g)?.length ?? 0) ? ';' : ','
  const rows: string[][] = []
  let row: string[] = []
  let field = ''
  let inQuotes = false
  for (let i = 0; i < clean.length; i++) {
    const c = clean[i]
    if (inQuotes) {
      if (c === '"') {
        if (clean[i + 1] === '"') { field += '"'; i++ } else { inQuotes = false }
      } else field += c
    } else if (c === '"') inQuotes = true
    else if (c === delimiter) { row.push(field); field = '' }
    else if (c === '\n') { row.push(field); rows.push(row); row = []; field = '' }
    else if (c === '\r') { /* ignore */ }
    else field += c
  }
  if (field.length > 0 || row.length > 0) { row.push(field); rows.push(row) }
  return rows.filter((r) => r.some((c) => c.trim() !== ''))
}

/** Sérialise des objets en CSV (séparateur ,). */
export function toCsv(headers: string[], rows: (string | number | boolean | null)[][]): string {
  const esc = (v: string | number | boolean | null) => {
    const s = v == null ? '' : String(v)
    return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s
  }
  return [headers.join(','), ...rows.map((r) => r.map(esc).join(','))].join('\n')
}

export function downloadFile(filename: string, content: string, type = 'text/csv;charset=utf-8') {
  const blob = new Blob([content], { type })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}
