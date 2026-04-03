import { useState, useEffect, useMemo } from 'react'
import { Check, Search, RotateCw, Trash2 } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { SUPPORTED_LOCALES } from '@/lib/locales'
import i18n from '@/lib/i18n'

interface TranslationOverride {
  id: number
  lang: string
  key: string
  value: string
}

function flattenJson(obj: Record<string, unknown>, prefix = ''): Record<string, string> {
  const result: Record<string, string> = {}
  for (const [k, v] of Object.entries(obj)) {
    const fullKey = prefix ? `${prefix}.${k}` : k
    if (typeof v === 'object' && v !== null && !Array.isArray(v)) {
      Object.assign(result, flattenJson(v as Record<string, unknown>, fullKey))
    } else if (typeof v === 'string') {
      result[fullKey] = v
    }
  }
  return result
}

export default function AdminTranslations() {
  const [allKeys, setAllKeys] = useState<Record<string, Record<string, string>>>({})
  const [overrides, setOverrides] = useState<TranslationOverride[]>([])
  const [activeLang, setActiveLang] = useState('fr')
  const [search, setSearch] = useState('')
  const [editKey, setEditKey] = useState<string | null>(null)
  const [editValue, setEditValue] = useState('')
  const [saving, setSaving] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadData()
  }, [])

  async function loadData() {
    setLoading(true)
    const keysByLang: Record<string, Record<string, string>> = {}

    await Promise.all(
      SUPPORTED_LOCALES.map(async ({ code }) => {
        try {
          const res = await fetch(`/locales/${code}.json`)
          const data = await res.json()
          keysByLang[code] = flattenJson(data)
        } catch {
          keysByLang[code] = {}
        }
      })
    )

    const { data: dbOverrides } = await supabase
      .from('translations')
      .select('*')
      .order('key')

    if (dbOverrides) {
      setOverrides(dbOverrides)
      for (const o of dbOverrides) {
        if (!keysByLang[o.lang]) keysByLang[o.lang] = {}
        keysByLang[o.lang][o.key] = o.value
      }
    }

    setAllKeys(keysByLang)
    setLoading(false)
  }

  const sortedKeys = useMemo(() => {
    const keys = new Set<string>()
    for (const langKeys of Object.values(allKeys)) {
      for (const k of Object.keys(langKeys)) keys.add(k)
    }
    return Array.from(keys).sort()
  }, [allKeys])

  const filteredKeys = useMemo(() => {
    if (!search) return sortedKeys
    const lower = search.toLowerCase()
    return sortedKeys.filter(
      (k) =>
        k.toLowerCase().includes(lower) ||
        (allKeys[activeLang]?.[k] ?? '').toLowerCase().includes(lower)
    )
  }, [sortedKeys, search, activeLang, allKeys])

  function getOverride(lang: string, key: string) {
    return overrides.find((o) => o.lang === lang && o.key === key)
  }

  function startEdit(key: string) {
    setEditKey(key)
    const override = getOverride(activeLang, key)
    setEditValue(override?.value ?? allKeys[activeLang]?.[key] ?? '')
  }

  async function handleSave() {
    if (!editKey) return
    setSaving(true)

    const existing = getOverride(activeLang, editKey)
    const staticValue = allKeys[activeLang]?.[editKey]

    if (editValue === staticValue && existing) {
      await supabase.from('translations').delete().eq('id', existing.id)
    } else if (existing) {
      await supabase.from('translations').update({ value: editValue }).eq('id', existing.id)
    } else if (editValue !== staticValue) {
      await supabase.from('translations').insert({ lang: activeLang, key: editKey, value: editValue })
    }

    setEditKey(null)
    setSaving(false)
    await loadData()
    i18n.reloadResources([activeLang])
  }

  async function handleDelete(override: TranslationOverride) {
    await supabase.from('translations').delete().eq('id', override.id)
    await loadData()
    i18n.reloadResources([override.lang])
  }

  if (loading) {
    return (
      <div className="p-8 flex justify-center">
        <span className="loading loading-spinner loading-lg" />
      </div>
    )
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-base-content">Traductions</h1>
          <p className="text-sm text-base-content/50 mt-1">
            {sortedKeys.length} cles - {overrides.length} override{overrides.length !== 1 ? 's' : ''} en base
          </p>
        </div>
        <button className="btn btn-ghost btn-sm gap-1" onClick={loadData}>
          <RotateCw size={14} /> Actualiser
        </button>
      </div>

      {/* Language tabs */}
      <div className="tabs tabs-boxed mb-4 w-fit">
        {SUPPORTED_LOCALES.map(({ code, label }) => (
          <button
            key={code}
            className={`tab ${activeLang === code ? 'tab-active' : ''}`}
            onClick={() => setActiveLang(code)}
          >
            {label}
            {overrides.filter((o) => o.lang === code).length > 0 && (
              <span className="badge badge-primary badge-xs ml-1">
                {overrides.filter((o) => o.lang === code).length}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="form-control mb-4">
        <div className="input input-bordered input-sm flex items-center gap-2 max-w-sm">
          <Search size={14} className="text-base-content/40" />
          <input
            type="text"
            placeholder="Rechercher une cle ou une valeur..."
            className="grow bg-transparent outline-none text-sm"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="table table-sm">
          <thead>
            <tr>
              <th className="w-1/3">Cle</th>
              <th>Valeur ({activeLang.toUpperCase()})</th>
              <th className="w-16"></th>
            </tr>
          </thead>
          <tbody>
            {filteredKeys.map((key) => {
              const override = getOverride(activeLang, key)
              const value = allKeys[activeLang]?.[key] ?? ''
              const isEditing = editKey === key

              return (
                <tr
                  key={key}
                  className={`hover cursor-pointer ${override ? 'bg-primary/5' : ''}`}
                  onClick={() => !isEditing && startEdit(key)}
                >
                  <td className="font-mono text-xs text-base-content/60 align-top">
                    {key}
                    {override && (
                      <span className="badge badge-primary badge-xs ml-2">modifie</span>
                    )}
                  </td>
                  <td>
                    {isEditing ? (
                      <div className="flex flex-col gap-2">
                        <textarea
                          className="textarea textarea-bordered textarea-sm w-full"
                          rows={Math.min(8, Math.max(2, editValue.split('\n').length + 1))}
                          value={editValue}
                          onChange={(e) => setEditValue(e.target.value)}
                          autoFocus
                          onClick={(e) => e.stopPropagation()}
                        />
                        <div className="flex gap-2">
                          <button
                            className="btn btn-primary btn-xs gap-1"
                            onClick={(e) => { e.stopPropagation(); handleSave() }}
                            disabled={saving}
                          >
                            <Check size={12} /> {saving ? '...' : 'Enregistrer'}
                          </button>
                          <button
                            className="btn btn-ghost btn-xs"
                            onClick={(e) => { e.stopPropagation(); setEditKey(null) }}
                          >
                            Annuler
                          </button>
                        </div>
                      </div>
                    ) : (
                      <span className="text-sm text-base-content/80 whitespace-pre-line line-clamp-2">
                        {value}
                      </span>
                    )}
                  </td>
                  <td className="align-top">
                    {override && !isEditing && (
                      <button
                        className="btn btn-ghost btn-xs text-error"
                        title="Supprimer l'override (revenir au fichier statique)"
                        onClick={(e) => { e.stopPropagation(); handleDelete(override) }}
                      >
                        <Trash2 size={12} />
                      </button>
                    )}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
