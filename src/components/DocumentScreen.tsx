import { useState } from 'react'
import { Share2, Send } from 'lucide-react'
import { getDocType, type DocType } from '@/lib/documents'
import { compressImage, dataUrlToFile, type StoredDoc } from '@/lib/storage'
import { Header } from './Header'
import { DocumentTab } from './DocumentTab'
import { DetailsTab } from './DetailsTab'

interface Props {
  type: DocType
  doc?: StoredDoc
  onBack: () => void
  onUpdate: (patch: Partial<StoredDoc>) => void
  onDelete: () => void
  toast: (t: string) => void
}

const DISCLAIMER = 'Личная копия — не является официальным документом.'

export function DocumentScreen({ type, doc, onBack, onUpdate, onDelete, toast }: Props) {
  const def = getDocType(type)
  const [tab, setTab] = useState<'doc' | 'details'>('doc')

  const handleImage = async (file: File) => {
    try {
      onUpdate({ image: await compressImage(file), fileName: file.name })
      toast('Копия сохранена')
    } catch {
      toast('Не удалось открыть файл')
    }
  }

  const shareFile = async () => {
    if (!doc?.image) return toast('Сначала загрузите копию')
    const file = await dataUrlToFile(doc.image, `${def.title} (копия).jpg`)
    if (navigator.canShare?.({ files: [file] })) {
      await navigator.share({ files: [file], title: def.title, text: DISCLAIMER }).catch(() => {})
    } else {
      const a = document.createElement('a')
      a.href = doc.image
      a.download = file.name
      a.click()
    }
  }

  const shareDetails = async () => {
    const lines = def.fields
      .map((f) => [f.label, doc?.fields[f.key]] as const)
      .filter(([, v]) => v)
      .map(([l, v]) => `${l}: ${v}`)
    if (!lines.length) return toast('Реквизиты не заполнены')
    const text = `${def.title}\n${lines.join('\n')}\n\n${DISCLAIMER}`
    if (navigator.share) await navigator.share({ title: def.title, text }).catch(() => {})
    else {
      await navigator.clipboard.writeText(text)
      toast('Реквизиты скопированы')
    }
  }

  return (
    <div className="flex min-h-full flex-col">
      <Header title={def.title} onBack={onBack} />

      <div className="px-4 pt-3">
        <div className="grid grid-cols-2 rounded-xl bg-slate-200 p-1 text-sm font-medium">
          {(['doc', 'details'] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`rounded-lg py-1.5 transition ${tab === t ? 'bg-white shadow-sm' : 'text-slate-500'}`}
            >
              {t === 'doc' ? 'Документ' : 'Реквизиты'}
            </button>
          ))}
        </div>
      </div>

      <main className="flex flex-1 flex-col pb-36">
        {tab === 'doc' ? (
          <DocumentTab doc={doc} onImage={handleImage} onDelete={onDelete} />
        ) : (
          <DetailsTab key={type} def={def} doc={doc} onSave={(fields) => onUpdate({ fields })} toast={toast} />
        )}
        <p className="mt-4 px-6 text-center text-xs text-slate-400">{DISCLAIMER}</p>
      </main>

      <div className="safe-bottom fixed inset-x-0 bottom-0 z-10 space-y-2 border-t border-slate-200 bg-white/95 px-4 pt-3 backdrop-blur">
        <button
          onClick={shareFile}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand-500 py-3 font-medium text-white active:bg-brand-600"
        >
          <Share2 className="h-5 w-5" /> Поделиться файлом
        </button>
        <button
          onClick={shareDetails}
          className="flex w-full items-center justify-center gap-2 rounded-xl border border-brand-500 py-3 font-medium text-brand-600 active:bg-brand-50"
        >
          <Send className="h-5 w-5" /> Отправить реквизиты
        </button>
      </div>
    </div>
  )
}
