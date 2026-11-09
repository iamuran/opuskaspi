import { ChevronLeft } from 'lucide-react'

export function Header({ title, onBack }: { title: string; onBack?: () => void }) {
  return (
    <header className="safe-top sticky top-0 z-20 bg-white/90 backdrop-blur border-b border-slate-200">
      <div className="relative flex h-12 items-center justify-center px-12">
        {onBack && (
          <button onClick={onBack} aria-label="Назад" className="absolute left-2 rounded-full p-2 active:bg-slate-100">
            <ChevronLeft className="h-6 w-6" />
          </button>
        )}
        <h1 className="truncate text-[17px] font-semibold">{title}</h1>
      </div>
    </header>
  )
}
