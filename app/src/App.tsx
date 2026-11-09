import { useCallback, useEffect, useRef, useState } from 'react'
import type { DocType } from '@/lib/documents'
import { useDocStore } from '@/lib/storage'
import { Splash } from '@/components/Splash'
import { HomeScreen } from '@/components/HomeScreen'
import { DocumentScreen } from '@/components/DocumentScreen'
import { Toast } from '@/components/Toast'

export default function App() {
  const [splash, setSplash] = useState(true)
  const [current, setCurrent] = useState<DocType | null>(null)
  const [toastText, setToastText] = useState<string | null>(null)
  const timer = useRef<number | undefined>(undefined)
  const { store, update, remove } = useDocStore()

  useEffect(() => {
    const t = window.setTimeout(() => setSplash(false), 1200)
    return () => window.clearTimeout(t)
  }, [])

  const toast = useCallback((text: string) => {
    setToastText(text)
    window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => setToastText(null), 1800)
  }, [])

  if (splash) return <Splash />

  return (
    <div className="mx-auto h-full max-w-md">
      {current ? (
        <DocumentScreen
          key={current}
          type={current}
          doc={store[current]}
          onBack={() => setCurrent(null)}
          onUpdate={(patch) => update(current, patch)}
          onDelete={() => {
            remove(current)
            toast('Удалено')
          }}
          toast={toast}
        />
      ) : (
        <HomeScreen store={store} onOpen={setCurrent} />
      )}
      <Toast text={toastText} />
    </div>
  )
}
