import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    'Missing Supabase environment variables. Copy .env.example to .env.local and fill in your values.'
  )
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Bug connu de supabase-js : la Navigator LockManager API peut rejeter la promesse
// d'acquisition du verrou de refresh token sans que ce soit une vraie erreur
// (concurrence entre onglets/tabs), cf. https://github.com/supabase/auth-js/issues/966
window.addEventListener('unhandledrejection', (event) => {
  if (event.reason?.message?.includes('Acquiring an exclusive Navigator LockManager lock')) {
    event.preventDefault()
  }
})
