import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Lock } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'

export default function SuiviLogin() {
  const { signIn } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    const { error: authError } = await signIn(email, password)
    setLoading(false)
    if (authError) setError('Email ou mot de passe incorrect.')
    else navigate('/suivi-alternance')
  }

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center px-4">
      <div className="card bg-base-100 w-full max-w-sm shadow-xl">
        <div className="card-body">
          <h1 className="card-title text-base-content font-mono mb-1 flex items-center gap-2">
            <Lock size={18} className="text-primary" /> Suivi alternance
          </h1>
          <p className="text-xs text-base-content/50 mb-4">Espace privé — connexion requise.</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="form-control">
              <label className="label"><span className="label-text">Email</span></label>
              <input
                type="email"
                className="input input-bordered w-full"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoFocus
              />
            </div>
            <div className="form-control">
              <label className="label"><span className="label-text">Mot de passe</span></label>
              <input
                type="password"
                className="input input-bordered w-full"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && (
              <div className="alert alert-error text-sm py-2"><span>{error}</span></div>
            )}
            <button type="submit" className="btn btn-primary w-full" disabled={loading}>
              {loading && <span className="loading loading-spinner loading-sm" />}
              Connexion
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
