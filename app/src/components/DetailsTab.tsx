import { useState } from 'react'
import { Copy, Pencil, Check } from 'lucide-react'
import type { DocTypeDef } from '@/lib/documents'
import type { StoredDoc } from '@/lib/storage'

interface Props {
  def: DocTypeDef
  doc?: StoredDoc
  onSave: (fields: Record<string, string>) => void
  toast: (t: string) => void
}

const fmt = (v: string, type?: string) =>
  type === 'date' && v ? new Date(v).toLocaleDateString('ru-RU') : v

export function DetailsTab({ def, doc, onSave, toast }: Props) {
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState<Record<string, string>>(doc?.fields ?? {})
  const values = editing ? draft : doc?.fields ?? {}

  const copy = async (text: string) => {
    if (!text) return
    await navigator.clipboard.writeText(text)
    toast('Скопировано')
  }

  return (
    <div className="px-4 pt-4">
      <div className="overflow-hidden rounded-2xl bg-white">
        {def.fields.map((f, i) => {
          const value = values[f.key] ?? ''
          return (
            <div key={f.key} className={`flex items-center gap-3 px-4 py-3 ${i > 0 ? 'border-t border-slate-100' : ''}`}>
              <div className="min-w-0 flex-1">
                <p className="text-xs text-slate-500">{f.label}</p>
                {editing ? (
                  <input
                    type={f.type === 'date' ? 'date' : 'text'}
                    value={value}
                    onChange={(e) => setDraft({ ...draft, [f.key]: e.target.value })}
                    className="mt-0.5 w-full border-b border-slate-200 bg-transparent py-1 text-[15px] outline-none focus:border-brand-500"
                  />
                ) : (
                  <p className={`mt-0.5 truncate text-[15px] ${value ? '' : 'text-slate-300'}`}>
                    {fmt(value, f.type) || 'Не указано'}
                  </p>
                )}
              </div>
              {!editing && (
                <button onClick={() => copy(fmt(value, f.type))} aria-label="Копировать" className="rounded-lg p-2 active:bg-slate-100">
                  <Copy className="h-5 w-5 text-slate-400" />
                </button>
              )}
            </div>
          )
        })}
      </div>

      <button
        onClick={() => {
          if (editing) {
            onSave(draft)
            toast('Сохранено')
          } else setDraft(doc?.fields ?? {})
          setEditing(!editing)
        }}
        className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-brand-500 py-3 font-medium text-brand-600 active:bg-brand-50"
      >
        {editing ? <Check className="h-4 w-4" /> : <Pencil className="h-4 w-4" />}
        {editing ? 'Сохранить' : 'Редактировать реквизиты'}
      </button>
    </div>
  )
}
