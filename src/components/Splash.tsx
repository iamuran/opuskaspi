import { FolderLock } from 'lucide-react'

export function Splash() {
  return (
    <div className="flex h-full flex-col items-center justify-center bg-white">
      <div className="flex h-24 w-24 items-center justify-center rounded-3xl bg-brand-500 shadow-lg">
        <FolderLock className="h-12 w-12 text-white" />
      </div>
      <p className="mt-5 text-xl font-semibold">Мои документы</p>
      <p className="mt-1 text-sm text-slate-500">Личное хранилище копий</p>
      <p className="safe-bottom absolute bottom-6 text-xs text-slate-400">Учебный проект</p>
    </div>
  )
}
