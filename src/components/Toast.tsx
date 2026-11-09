export function Toast({ text }: { text: string | null }) {
  if (!text) return null
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-28 z-50 flex justify-center">
      <div className="rounded-full bg-slate-900/90 px-4 py-2 text-sm text-white shadow-lg">{text}</div>
    </div>
  )
}
