import { useState } from 'react'
import { Upload, Download, FileWarning, CheckCircle2 } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { parseCsv, toCsv, downloadFile } from '@/lib/alternance'
import type { Offer, Prospect } from '@/types/alternance'

type Target = 'offers' | 'prospects'

function findCol(headers: string[], ...needles: string[]): number {
  const norm = headers.map((h) => h.toLowerCase().trim())
  for (const n of needles) {
    const i = norm.findIndex((h) => h.includes(n.toLowerCase()))
    if (i >= 0) return i
  }
  return -1
}

function toIsoDate(v: string): string | null {
  const s = v.trim()
  if (!s) return null
  const m = s.match(/^(\d{2})\/(\d{2})\/(\d{4})$/)
  if (m) return `${m[3]}-${m[2]}-${m[1]}`
  if (/^\d{4}-\d{2}-\d{2}/.test(s)) return s.slice(0, 10)
  return null
}

function villeFromAddress(adr: string): string {
  const m = adr.match(/(\d{5})\s+(.+)$/)
  return m ? `${m[1]} ${m[2].trim()}` : adr.trim()
}

const PRIO_KEYWORDS = ['logiciel', 'informatique', 'donnée', 'systèmes et logiciels', 'développement']

export default function SuiviImport() {
  const [target, setTarget] = useState<Target>('offers')
  const [raw, setRaw] = useState('')
  const [parsed, setParsed] = useState<Record<string, unknown>[] | null>(null)
  const [importing, setImporting] = useState(false)
  const [done, setDone] = useState<string | null>(null)
  const [err, setErr] = useState<string | null>(null)

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0]
    if (!f) return
    const reader = new FileReader()
    reader.onload = () => { setRaw(String(reader.result)); setParsed(null); setDone(null); setErr(null) }
    reader.readAsText(f, 'utf-8')
  }

  function preview() {
    setErr(null); setDone(null)
    try {
      const rows = parseCsv(raw)
      if (rows.length < 2) { setErr('CSV vide ou sans données.'); return }
      const headers = rows[0]
      const records = target === 'offers' ? mapOffers(headers, rows.slice(1)) : mapProspects(headers, rows.slice(1))
      setParsed(records)
    } catch (e) {
      setErr('Erreur de lecture du CSV : ' + (e as Error).message)
    }
  }

  function mapOffers(headers: string[], rows: string[][]): Record<string, unknown>[] {
    const c = {
      domaine: findCol(headers, 'domaine'),
      entreprise: findCol(headers, 'entreprise'),
      poste: findCol(headers, 'intitulé', 'poste'),
      localisation: findCol(headers, 'localisation', 'lieu'),
      source: findCol(headers, 'source'),
      ref: findCol(headers, 'réf', 'ref'),
      lien: findCol(headers, 'lien'),
      priorite: findCol(headers, 'priorité', 'priorite'),
      statut: findCol(headers, 'statut'),
      date_candidature: findCol(headers, 'date candidature'),
      date_relance: findCol(headers, 'date relance'),
      contact: findCol(headers, 'contact'),
      notes: findCol(headers, 'notes'),
      zone_carte: findCol(headers, 'zone'),
    }
    const get = (r: string[], i: number) => (i >= 0 ? (r[i] ?? '').trim() : '')
    return rows.filter((r) => get(r, c.entreprise) || get(r, c.poste)).map((r) => {
      const lien = get(r, c.lien)
      return {
        domaine: get(r, c.domaine) || 'Autre / à trier',
        entreprise: get(r, c.entreprise),
        poste: get(r, c.poste),
        localisation: get(r, c.localisation) || null,
        source: get(r, c.source) || null,
        ref: get(r, c.ref) || null,
        lien: lien && lien.toLowerCase() !== 'ouvrir' ? lien : null,
        priorite: get(r, c.priorite) || null,
        statut: get(r, c.statut) || 'À postuler',
        date_candidature: toIsoDate(get(r, c.date_candidature)),
        date_relance: toIsoDate(get(r, c.date_relance)),
        contact: get(r, c.contact) || null,
        notes: get(r, c.notes) || null,
        zone_carte: get(r, c.zone_carte) || null,
      }
    })
  }

  function mapProspects(headers: string[], rows: string[][]): Record<string, unknown>[] {
    const c = {
      nom: findCol(headers, 'nom'),
      prenom: findCol(headers, 'prénom', 'prenom'),
      civilite: findCol(headers, 'civilité', 'civilite'),
      linkedin: findCol(headers, 'url linkedin du prospect', 'linkedin du prospect', 'linkedin'),
      poste: findCol(headers, 'poste occupé', 'poste'),
      email: findCol(headers, 'email', 'e-mail', 'mail'),
      entreprise: findCol(headers, 'nom de la page linkedin', 'nom commercial', 'entreprise'),
      tel: findCol(headers, 'tél standard', 'tel', 'téléphone', 'phone'),
      secteur: findCol(headers, 'activité source pharow', 'secteur naf', 'secteur', 'activité'),
      adresse: findCol(headers, 'adresse du siège complète', 'adresse', 'ville'),
    }
    const get = (r: string[], i: number) => (i >= 0 ? (r[i] ?? '').trim() : '')
    return rows.filter((r) => get(r, c.nom) || get(r, c.entreprise)).map((r) => {
      const secteur = get(r, c.secteur)
      const prio = PRIO_KEYWORDS.some((k) => secteur.toLowerCase().includes(k))
      return {
        nom: get(r, c.nom) || null,
        prenom: get(r, c.prenom) || null,
        civilite: get(r, c.civilite) || null,
        linkedin: get(r, c.linkedin) || null,
        poste: get(r, c.poste) || null,
        email: get(r, c.email) || null,
        entreprise: get(r, c.entreprise) || null,
        tel: get(r, c.tel) || null,
        secteur: secteur || null,
        ville: get(r, c.adresse) ? villeFromAddress(get(r, c.adresse)) : null,
        prio,
        statut: 'À envoyer',
      }
    })
  }

  async function doImport() {
    if (!parsed || parsed.length === 0) return
    setImporting(true); setErr(null); setDone(null)
    const table = target === 'offers' ? 'alternance_offers' : 'alternance_prospects'
    const { error } = await supabase.from(table).insert(parsed)
    setImporting(false)
    if (error) setErr('Erreur Supabase : ' + error.message)
    else {
      setDone(`${parsed.length} ligne(s) importée(s) avec succès.`)
      setParsed(null); setRaw('')
    }
  }

  async function exportData(t: Target) {
    if (t === 'offers') {
      const { data } = await supabase.from('alternance_offers').select('*').order('domaine')
      const rows = (data as Offer[] ?? []).map((o) => [o.domaine, o.entreprise, o.poste, o.localisation, o.source, o.ref, o.lien, o.priorite, o.statut, o.date_candidature, o.date_relance, o.contact, o.notes, o.zone_carte])
      downloadFile('offres.csv', toCsv(['Domaine', 'Entreprise', 'Poste', 'Localisation', 'Source', 'Réf', 'Lien', 'Priorité', 'Statut', 'Date candidature', 'Date relance', 'Contact', 'Notes', 'Zone'], rows))
    } else {
      const { data } = await supabase.from('alternance_prospects').select('*').order('entreprise')
      const rows = (data as Prospect[] ?? []).map((p) => [p.prio, p.civilite, p.nom, p.prenom, p.poste, p.entreprise, p.ville, p.secteur, p.email, p.tel, p.linkedin, p.date_envoi, p.statut, p.notes])
      downloadFile('prospection_drh.csv', toCsv(['Prio', 'Civilité', 'Nom', 'Prénom', 'Poste', 'Entreprise', 'Ville', 'Secteur', 'Email', 'Tél', 'LinkedIn', 'Date envoi', 'Statut', 'Notes'], rows))
    }
  }

  return (
    <div className="p-4 sm:p-8 max-w-3xl">
      <h1 className="text-2xl font-bold text-base-content mb-1">Import / Export</h1>
      <p className="text-sm text-base-content/60 mb-6">Charge tes fichiers CSV existants (offres ou prospection DRH) dans la base privée, ou ré-exporte vers Excel.</p>

      <div className="tabs tabs-boxed w-fit mb-4">
        <button className={`tab ${target === 'offers' ? 'tab-active' : ''}`} onClick={() => { setTarget('offers'); setParsed(null) }}>Offres</button>
        <button className={`tab ${target === 'prospects' ? 'tab-active' : ''}`} onClick={() => { setTarget('prospects'); setParsed(null) }}>Prospection DRH</button>
      </div>

      <div className="card bg-base-100 border border-base-300 mb-6">
        <div className="card-body p-4 gap-3">
          <h2 className="font-semibold text-base-content flex items-center gap-2"><Upload size={16} /> Importer ({target === 'offers' ? 'offres' : 'contacts DRH'})</h2>
          <input type="file" accept=".csv,text/csv" className="file-input file-input-bordered file-input-sm w-full max-w-xs" onChange={handleFile} />
          <div className="divider text-xs my-0">ou coller le CSV</div>
          <textarea className="textarea textarea-bordered textarea-sm w-full font-mono text-xs" rows={5} placeholder="Domaine;Entreprise;…" value={raw} onChange={(e) => { setRaw(e.target.value); setParsed(null) }} />
          <div className="flex gap-2">
            <button className="btn btn-sm" onClick={preview} disabled={!raw.trim()}>Prévisualiser</button>
            {parsed && <button className="btn btn-primary btn-sm" onClick={doImport} disabled={importing}>{importing && <span className="loading loading-spinner loading-xs" />}Importer {parsed.length} ligne(s)</button>}
          </div>

          {err && <div className="alert alert-error text-sm py-2"><FileWarning size={14} /><span>{err}</span></div>}
          {done && <div className="alert alert-success text-sm py-2"><CheckCircle2 size={14} /><span>{done}</span></div>}

          {parsed && parsed.length > 0 && (
            <div className="overflow-x-auto max-h-60 border border-base-200 rounded-box mt-2">
              <table className="table table-xs">
                <thead><tr>{Object.keys(parsed[0]).map((k) => <th key={k}>{k}</th>)}</tr></thead>
                <tbody>
                  {parsed.slice(0, 8).map((row, i) => (
                    <tr key={i}>{Object.keys(parsed[0]).map((k) => <td key={k} className="max-w-[12rem] truncate">{String(row[k] ?? '')}</td>)}</tr>
                  ))}
                </tbody>
              </table>
              {parsed.length > 8 && <p className="text-xs text-base-content/40 p-2">… et {parsed.length - 8} autres lignes.</p>}
            </div>
          )}
        </div>
      </div>

      <div className="card bg-base-100 border border-base-300">
        <div className="card-body p-4 gap-3">
          <h2 className="font-semibold text-base-content flex items-center gap-2"><Download size={16} /> Exporter</h2>
          <div className="flex gap-2">
            <button className="btn btn-outline btn-sm" onClick={() => exportData('offers')}>Offres (CSV)</button>
            <button className="btn btn-outline btn-sm" onClick={() => exportData('prospects')}>Prospection DRH (CSV)</button>
          </div>
          <p className="text-xs text-base-content/40">Les fichiers CSV s'ouvrent directement dans Excel / Google Sheets.</p>
        </div>
      </div>
    </div>
  )
}
