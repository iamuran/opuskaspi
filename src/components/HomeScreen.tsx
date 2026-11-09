import { ChevronRight, Info } from 'lucide-react'
import { DOC_TYPES, type DocType } from '@/lib/documents'
import type { Store } from '@/lib/storage'
import { Header } from './Header'

export function HomeScreen({ store, onOpen }: { store: Store; onOpen: (t: DocType) => void }) {
  return (
    <div className="min-h-full">
      <Header title="Мои документы" />
      <div className="px-4 pt-4">
        <div className="mb-4 flex gap-3 rounded-2xl bg-brand-50 p-3 text-sm text-brand-700">
          <Info className="mt-0.5 h-4 w-4 shrink-0" />
          <span>Здесь хранятся ваши личные копии. Они не заменяют официальные документы.</span>
        </div>

        <div className="overflow-hidden rounded-2xl bg-white">
          {DOC_TYPES.map((d, i) => {
            const Icon = d.icon
            const filled = !!store[d.type]?.image
            return (
              <button
                key={d.type}
                onClick={() => onOpen(d.type)}
                className={`flex w-full items-center gap-3 px-4 py-3.5 text-left active:bg-slate-50 ${
                  i > 0 ? 'border-t border-slate-100' : ''
                }`}
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100">
                  <Icon className="h-5 w-5 text-slate-600" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-medium">{d.title}</p>
                  <p className="truncate text-xs text-slate-500">{filled ? 'Копия загружена' : d.subtitle}</p>
                </div>
                {filled && <span className="h-2 w-2 rounded-full bg-brand-500" />}
                <ChevronRight className="h-5 w-5 text-slate-300" />
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
