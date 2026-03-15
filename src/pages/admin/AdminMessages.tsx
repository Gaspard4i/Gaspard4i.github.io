import { useState } from 'react'
import { Trash2, Mail, MailOpen } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { useSupabase } from '@/hooks/useSupabase'

interface ContactMessage {
  id: string
  name: string
  email: string
  message: string
  read: boolean
  created_at: string
}

function formatDate(d: string) {
  return new Date(d).toLocaleString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })
}

export default function AdminMessages() {
  const { data: messages, loading, refetch } = useSupabase<ContactMessage[]>(() =>
    supabase.from('contact_messages').select('*').order('created_at', { ascending: false })
  )
  const [expanded, setExpanded] = useState<string | null>(null)

  async function toggleRead(msg: ContactMessage) {
    await supabase.from('contact_messages').update({ read: !msg.read }).eq('id', msg.id)
    refetch()
  }

  async function handleDelete(id: string) {
    if (!confirm('Supprimer ce message ?')) return
    await supabase.from('contact_messages').delete().eq('id', id)
    refetch()
  }

  const unread = messages?.filter((m) => !m.read).length ?? 0

  return (
    <div className="p-8">
      <div className="flex items-center gap-3 mb-6">
        <h1 className="text-2xl font-bold text-base-content">Messages</h1>
        {unread > 0 && <span className="badge badge-primary">{unread} non lu{unread > 1 ? 's' : ''}</span>}
      </div>

      {loading ? (
        <div className="flex justify-center py-12"><span className="loading loading-spinner loading-lg" /></div>
      ) : messages?.length === 0 ? (
        <p className="text-base-content/50 text-sm">Aucun message reçu.</p>
      ) : (
        <div className="flex flex-col gap-3">
          {messages?.map((msg) => (
            <div
              key={msg.id}
              className={`card bg-base-100 border-l-4 ${msg.read ? 'border-base-300' : 'border-primary'}`}
            >
              <div className="card-body py-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 cursor-pointer" onClick={() => setExpanded(expanded === msg.id ? null : msg.id)}>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`font-semibold text-base-content ${!msg.read ? 'font-bold' : ''}`}>{msg.name}</span>
                      <a href={`mailto:${msg.email}`} onClick={(e) => e.stopPropagation()} className="text-primary text-sm hover:underline">{msg.email}</a>
                      <span className="text-xs text-base-content/40 ml-auto">{formatDate(msg.created_at)}</span>
                    </div>
                    {expanded === msg.id ? (
                      <p className="text-base-content/80 text-sm mt-2 whitespace-pre-wrap">{msg.message}</p>
                    ) : (
                      <p className="text-base-content/60 text-sm mt-1 truncate">{msg.message}</p>
                    )}
                  </div>
                  <div className="flex gap-1 shrink-0">
                    <button className="btn btn-ghost btn-xs" title={msg.read ? 'Marquer non lu' : 'Marquer lu'} onClick={() => toggleRead(msg)}>
                      {msg.read ? <MailOpen size={14} /> : <Mail size={14} className="text-primary" />}
                    </button>
                    <button className="btn btn-ghost btn-xs text-error" onClick={() => handleDelete(msg.id)}>
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
