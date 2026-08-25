import { Sun, Moon, Monitor } from 'lucide-react'
import { useTheme } from '@/hooks/useTheme'
import type { ThemeMode } from '@/types/theme'

const OPTIONS: { mode: ThemeMode; icon: typeof Sun; label: string }[] = [
  { mode: 'light', icon: Sun, label: 'Clair' },
  { mode: 'dark', icon: Moon, label: 'Sombre' },
  { mode: 'system', icon: Monitor, label: 'Système' },
]

export default function ThemeSwitcher() {
  const { mode, setMode } = useTheme()

  return (
    <div className="flex items-center gap-0.5 bg-base-200 rounded-field p-0.5" role="group" aria-label="Choix du thème">
      {OPTIONS.map(({ mode: optionMode, icon: Icon, label }) => (
        <button
          key={optionMode}
          className={`btn btn-ghost btn-sm btn-square ${mode === optionMode ? 'bg-base-100 text-primary shadow-sm' : 'text-base-content/60'}`}
          onClick={() => setMode(optionMode)}
          aria-label={label}
          aria-pressed={mode === optionMode}
          title={label}
        >
          <Icon size={15} />
        </button>
      ))}
    </div>
  )
}
