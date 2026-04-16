import { useTranslation } from 'react-i18next'
import { Check, Clock } from 'lucide-react'

const PHASES = [
  { key: 'coinItems', done: true },
  { key: 'purse', done: false },
  { key: 'piggyBank', done: false },
  { key: 'shopBlock', done: false },
  { key: 'config', done: false },
  { key: 'lootTables', done: false },
  { key: 'villagerTrades', done: false },
  { key: 'marketplace', done: false },
  { key: 'achievements', done: false },
  { key: 'security', done: false },
  { key: 'addonApi', done: false },
  { key: 'neoforgePort', done: false },
]

export default function Roadmap() {
  const { t } = useTranslation()

  return (
    <div className="space-y-8">
      <p className="text-base-content/80 leading-relaxed">
        {t('wiki.nr.roadmap.intro')}
      </p>

      <div className="space-y-2">
        {PHASES.map(({ key, done }, i) => (
          <div
            key={key}
            className={`flex items-center gap-3 p-3 rounded-lg ${done ? 'bg-success/10' : 'bg-base-200'}`}
          >
            <span className="text-sm font-mono text-base-content/40 w-6 text-right">{i + 1}.</span>
            {done ? (
              <Check size={16} className="text-success shrink-0" />
            ) : (
              <Clock size={16} className="text-base-content/30 shrink-0" />
            )}
            <span className={`text-sm ${done ? 'text-success font-semibold' : 'text-base-content/70'}`}>
              {t(`wiki.nr.roadmap.phases.${key}`)}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
