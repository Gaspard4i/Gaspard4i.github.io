import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { CheckCircle, Send, ShieldCheck } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import FormField from '@/components/molecules/FormField'
import Button from '@/components/atoms/Button'

interface FormState {
  name: string
  email: string
  message: string
}

const INITIAL_STATE: FormState = { name: '', email: '', message: '' }
const COOLDOWN_MS = 5 * 60 * 1000 // 5 minutes
const LS_KEY = 'last_contact_at'

async function sendEmailNotification(name: string, email: string, message: string) {
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY
  if (!serviceId || !templateId || !publicKey) return

  await fetch('https://api.emailjs.com/api/v1.0/email/send', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      service_id: serviceId,
      template_id: templateId,
      user_id: publicKey,
      template_params: {
        from_name: name,
        from_email: email,
        message,
        to_email: 'catry.gaspard@gmail.com',
      },
    }),
  }).catch(() => {}) // silent fail — message is already saved in DB
}

export default function ContactForm() {
  const { t } = useTranslation()
  const [form, setForm] = useState<FormState>(INITIAL_STATE)
  const [honeypot, setHoneypot] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  function getCooldownRemaining(): number {
    const last = localStorage.getItem(LS_KEY)
    if (!last) return 0
    return Math.max(0, COOLDOWN_MS - (Date.now() - Number(last)))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    // Honeypot — bot filled the hidden field
    if (honeypot) return

    // Rate limit
    const remaining = getCooldownRemaining()
    if (remaining > 0) {
      setError(`Veuillez attendre ${Math.ceil(remaining / 60000)} minute(s) avant de renvoyer un message.`)
      return
    }

    setLoading(true)
    setError(null)

    const { error: dbError } = await supabase
      .from('contact_messages')
      .insert([{ name: form.name, email: form.email, message: form.message }])

    if (dbError) {
      setLoading(false)
      setError(t('contact.error'))
      return
    }

    localStorage.setItem(LS_KEY, String(Date.now()))
    await sendEmailNotification(form.name, form.email, form.message)

    setLoading(false)
    setSuccess(true)
    setForm(INITIAL_STATE)
  }

  if (success) {
    return (
      <div className="alert alert-success">
        <CheckCircle size={20} />
        <span>{t('contact.success')}</span>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Honeypot — hidden from real users, bots fill it */}
      <input
        type="text"
        name="_gotcha"
        value={honeypot}
        onChange={(e) => setHoneypot(e.target.value)}
        style={{ display: 'none' }}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />

      <FormField
        label={t('contact.name')}
        type="text"
        value={form.name}
        onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
        required
        placeholder="Gaspard"
      />
      <FormField
        label={t('contact.email')}
        type="email"
        value={form.email}
        onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
        required
        placeholder="hello@example.com"
      />
      <FormField
        as="textarea"
        label={t('contact.message')}
        value={form.message}
        onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
        required
        placeholder={t('contact.messagePlaceholder')}
      />

      {error && (
        <div className="alert alert-error text-sm py-2">
          <span>{error}</span>
        </div>
      )}

      <Button type="submit" loading={loading} className="w-full gap-2">
        <Send size={15} />
        {t('contact.send')}
      </Button>

      <div className="flex items-start gap-2 text-xs text-base-content/40 mt-2">
        <ShieldCheck size={14} className="shrink-0 mt-0.5" />
        <span>{t('contact.gdpr')}</span>
      </div>
    </form>
  )
}
