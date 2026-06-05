import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Copy, Check, Send, Paperclip, Mail } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { useSupabase } from '@/hooks/useSupabase'
import type { Prospect } from '@/types/alternance'
import { EMAIL_TEMPLATES, fillTemplate, gmailComposeUrl, mailtoUrl, CANDIDAT } from '@/lib/alternance'
import type { TemplateKind } from '@/lib/alternance'

export default function SuiviEmails() {
  const [params] = useSearchParams()
  const { data: prospects } = useSupabase<Prospect[]>(() =>
    supabase.from('alternance_prospects').select('*').order('prio', { ascending: false }).order('entreprise')
  )
  const [kind, setKind] = useState<TemplateKind>('candidature')
  const [prospectId, setProspectId] = useState<string>('')
  const [to, setTo] = useState('')
  const [subject, setSubject] = useState('')
  const [body, setBody] = useState('')
  const [copied, setCopied] = useState<'body' | 'subject' | null>(null)

  // Préselection via ?prospect=<id>
  useEffect(() => {
    const pid = params.get('prospect')
    if (pid) setProspectId(pid)
  }, [params])

  const selected = prospects?.find((p) => p.id === prospectId) ?? null

  // (Re)génère le modèle quand le type ou le destinataire change
  useEffect(() => {
    const { subject: s, body: b } = fillTemplate(kind, selected)
    setSubject(s)
    setBody(b)
    setTo(selected?.email ?? '')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [kind, prospectId])

  async function copy(what: 'body' | 'subject') {
    await navigator.clipboard.writeText(what === 'body' ? body : subject)
    setCopied(what)
    setTimeout(() => setCopied(null), 1500)
  }

  function openGmail() {
    window.open(gmailComposeUrl(to, subject, body), '_blank', 'noopener')
  }

  return (
    <div className="p-4 sm:p-8 max-w-4xl">
      <h1 className="text-2xl font-bold text-base-content mb-1">Composer un email</h1>
      <p className="text-sm text-base-content/60 mb-6">Choisis un modèle et un destinataire : la salutation et les dates se remplissent toutes seules.</p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
        <div className="form-control">
          <label className="label py-1"><span className="label-text text-xs">Modèle</span></label>
          <select className="select select-bordered select-sm w-full" value={kind} onChange={(e) => setKind(e.target.value as TemplateKind)}>
            {(Object.keys(EMAIL_TEMPLATES) as TemplateKind[]).map((k) => (
              <option key={k} value={k}>{EMAIL_TEMPLATES[k].label}</option>
            ))}
          </select>
        </div>
        <div className="form-control sm:col-span-2">
          <label className="label py-1"><span className="label-text text-xs">Destinataire (contact DRH)</span></label>
          <select className="select select-bordered select-sm w-full" value={prospectId} onChange={(e) => setProspectId(e.target.value)}>
            <option value="">— Aucun (saisie manuelle) —</option>
            {prospects?.map((p) => (
              <option key={p.id} value={p.id}>{p.entreprise} — {p.civilite} {p.nom} {p.email ? `(${p.email})` : ''}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="form-control mb-3">
        <label className="label py-1"><span className="label-text text-xs">À (email)</span></label>
        <input className="input input-bordered input-sm w-full" value={to} onChange={(e) => setTo(e.target.value)} placeholder="destinataire@entreprise.fr" />
      </div>

      <div className="form-control mb-3">
        <label className="label py-1">
          <span className="label-text text-xs">Objet</span>
          <button className="btn btn-ghost btn-xs" onClick={() => copy('subject')}>
            {copied === 'subject' ? <Check size={12} className="text-success" /> : <Copy size={12} />} Copier
          </button>
        </label>
        <input className="input input-bordered input-sm w-full" value={subject} onChange={(e) => setSubject(e.target.value)} />
      </div>

      <div className="form-control mb-2">
        <label className="label py-1">
          <span className="label-text text-xs">Corps du message</span>
          <button className="btn btn-ghost btn-xs" onClick={() => copy('body')}>
            {copied === 'body' ? <Check size={12} className="text-success" /> : <Copy size={12} />} Copier
          </button>
        </label>
        <textarea className="textarea textarea-bordered w-full font-mono text-sm leading-relaxed" rows={20} value={body} onChange={(e) => setBody(e.target.value)} />
      </div>

      {kind === 'candidature' && body.includes('[PHRASE PERSONNALISÉE ENTREPRISE]') && (
        <div className="alert alert-warning text-sm py-2 mb-3">
          <span>Pense à remplacer <code>[PHRASE PERSONNALISÉE ENTREPRISE]</code> par une phrase adaptée à l'entreprise.</span>
        </div>
      )}

      <div className="alert text-sm py-2 mb-4 bg-base-200">
        <Paperclip size={14} />
        <span>Gmail ne peut pas pré-attacher de fichier : pense à <strong>joindre ton CV PDF</strong> dans la fenêtre Gmail avant d'envoyer.</span>
      </div>

      <div className="flex flex-wrap gap-2">
        <button className="btn btn-primary btn-sm" onClick={openGmail} disabled={!to}>
          <Send size={15} /> Ouvrir dans Gmail
        </button>
        <a className="btn btn-outline btn-sm" href={mailtoUrl(to, subject, body)}>
          <Mail size={15} /> Client mail (mailto)
        </a>
        <button className="btn btn-ghost btn-sm" onClick={() => copy('body')}>
          {copied === 'body' ? <Check size={15} className="text-success" /> : <Copy size={15} />} Copier le corps
        </button>
      </div>

      <p className="text-xs text-base-content/40 mt-4">
        Signature actuelle : {CANDIDAT.tel} · {CANDIDAT.email} · {CANDIDAT.portfolio} — à modifier dans <code>src/lib/alternance.ts</code> si besoin.
      </p>
    </div>
  )
}
