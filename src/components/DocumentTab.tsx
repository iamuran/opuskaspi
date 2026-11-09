import { useState } from 'react'
import { ImagePlus, RefreshCw, Trash2 } from 'lucide-react'
import type { StoredDoc } from '@/lib/storage'
import { UploadMenu } from './UploadMenu'

interface Props {
  doc?: StoredDoc
  onImage: (file: File) => void
  onDelete: () => void
}

export function DocumentTab({ doc, onImage, onDelete }: Props) {
  const [menu, setMenu] = useState(false)

  return (
    <div className="flex flex-1 flex-col px-4 pt-4">
      {doc?.image ? (
        <>
          <div className="relative overflow-hidden rounded-2xl bg-white shadow-sm">
            <img src={doc.image} alt="Копия документа" className="w-full object-contain" />
            {/* Водяной знак: явно показывает, что это копия */}
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
              <span className="-rotate-[24deg] select-none whitespace-nowrap text-2xl font-bold uppercase tracking-widest text-red-600/35">
                Копия · не является документом
              </span>
            </div>
          </div>
          <div className="mt-3 flex gap-2">
            <button
              onClick={() => setMenu(true)}
              className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-white py-2.5 text-sm font-medium active:bg-slate-50"
            >
              <RefreshCw className="h-4 w-4" /> Заменить
            </button>
            <button
              onClick={() => confirm('Удалить копию и реквизиты?') && onDelete()}
              className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-white py-2.5 text-sm font-medium text-red-600 active:bg-slate-50"
            >
              <Trash2 className="h-4 w-4" /> Удалить
            </button>
          </div>
        </>
      ) : (
        <div className="flex flex-1 flex-col items-center justify-center pb-16 text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-white">
            <ImagePlus className="h-8 w-8 text-slate-400" />
          </div>
          <p className="mb-5 max-w-[260px] text-sm text-slate-500">
            Загрузите фото или скан документа, чтобы хранить копию под рукой
          </p>
          <button
            onClick={() => setMenu(true)}
            className="rounded-xl bg-brand-500 px-6 py-3 font-medium text-white shadow active:bg-brand-600"
          >
            Загрузить фото
          </button>
        </div>
      )}

      <UploadMenu open={menu} onClose={() => setMenu(false)} onFile={onImage} />
    </div>
  )
}
