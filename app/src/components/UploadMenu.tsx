import { useEffect, useRef, type ChangeEvent } from 'react'
import { Camera, Folder, Images } from 'lucide-react'

interface Props {
  open: boolean
  onClose: () => void
  onFile: (file: File) => void
}

/** Меню «Медиатека / Сделать снимок / Выбрать файл». */
export function UploadMenu({ open, onClose, onFile }: Props) {
  const libraryRef = useRef<HTMLInputElement>(null)
  const cameraRef = useRef<HTMLInputElement>(null)
  const fileRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  const handle = (e: ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0]
    e.target.value = ''
    onClose()
    if (f) onFile(f)
  }

  const items = [
    { label: 'Медиатека', icon: Images, ref: libraryRef },
    { label: 'Сделать снимок', icon: Camera, ref: cameraRef },
    { label: 'Выбрать файл', icon: Folder, ref: fileRef },
  ]

  return (
    <>
      <input ref={libraryRef} type="file" accept="image/*" hidden onChange={handle} />
      <input ref={cameraRef} type="file" accept="image/*" capture="environment" hidden onChange={handle} />
      <input ref={fileRef} type="file" accept="image/*,.heic,.heif" hidden onChange={handle} />

      {open && (
        <div className="fixed inset-0 z-40 bg-black/10 backdrop-blur-[2px]" onClick={onClose}>
          <div
            className="absolute left-1/2 top-1/2 w-60 -translate-x-1/2 -translate-y-[85%] overflow-hidden rounded-2xl bg-white/95 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {items.map(({ label, icon: Icon, ref }, i) => (
              <button
                key={label}
                onClick={() => ref.current?.click()}
                className={`flex w-full items-center justify-between px-4 py-3 text-[15px] active:bg-slate-100 ${
                  i > 0 ? 'border-t border-slate-200' : ''
                }`}
              >
                {label}
                <Icon className="h-5 w-5 text-slate-600" />
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  )
}
