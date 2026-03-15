import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { CheckCircle, Send } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import FormField from '@/components/molecules/FormField'
import Button from '@/components/atoms/Button'

interface FormState {
  name: string
  email: string
  message: string
}

const INITIAL_STATE: FormState = { name: '', email: '', message: '' }

export default function ContactForm() {
  const { t } = useTranslation()
  const [form, setForm] = useState<FormState>(INITIAL_STATE)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const { error: dbError } = await supabase
      .from('contact_messages')
      .insert([{ name: form.name, email: form.email, message: form.message }])

    setLoading(false)

    if (dbError) {
      setError(t('contact.error'))
    } else {
      setSuccess(true)
      setForm(INITIAL_STATE)
    }
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
    </form>
  )
}
