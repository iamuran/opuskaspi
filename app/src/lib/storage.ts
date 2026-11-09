import { useCallback, useEffect, useState } from 'react'
import type { DocType } from './documents'

export interface StoredDoc {
  image?: string // data URL (сжатое изображение)
  fileName?: string
  fields: Record<string, string>
  updatedAt?: number
}

export type Store = Partial<Record<DocType, StoredDoc>>

const KEY = 'mydocs:v1'

function load(): Store {
  try {
    return JSON.parse(localStorage.getItem(KEY) || '{}') as Store
  } catch {
    return {}
  }
}

export function useDocStore() {
  const [store, setStore] = useState<Store>(load)

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(store))
    } catch {
      alert('Недостаточно места для сохранения. Попробуйте изображение меньшего размера.')
    }
  }, [store])

  const update = useCallback((type: DocType, patch: Partial<StoredDoc>) => {
    setStore((s) => {
      const prev = s[type] ?? { fields: {} }
      return { ...s, [type]: { ...prev, ...patch, updatedAt: Date.now() } }
    })
  }, [])

  const remove = useCallback((type: DocType) => {
    setStore((s) => {
      const next = { ...s }
      delete next[type]
      return next
    })
  }, [])

  return { store, update, remove }
}

/** Сжимает изображение до maxSide px, чтобы влезть в localStorage. */
export function compressImage(file: File, maxSide = 1400, quality = 0.82): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onerror = reject
    reader.onload = () => {
      const img = new Image()
      img.onerror = reject
      img.onload = () => {
        const scale = Math.min(1, maxSide / Math.max(img.width, img.height))
        const canvas = document.createElement('canvas')
        canvas.width = Math.round(img.width * scale)
        canvas.height = Math.round(img.height * scale)
        canvas.getContext('2d')!.drawImage(img, 0, 0, canvas.width, canvas.height)
        resolve(canvas.toDataURL('image/jpeg', quality))
      }
      img.src = reader.result as string
    }
    reader.readAsDataURL(file)
  })
}

export async function dataUrlToFile(dataUrl: string, name: string): Promise<File> {
  const blob = await (await fetch(dataUrl)).blob()
  return new File([blob], name, { type: blob.type })
}
