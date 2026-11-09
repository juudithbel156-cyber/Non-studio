import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { dict, type Dict, type Lang } from './dict'
import type { L } from '../content/types'

type Ctx = { lang: Lang; t: Dict; l: (v: L) => string; setLang: (l: Lang) => void }
const I18nCtx = createContext<Ctx | null>(null)

function initialLang(): Lang {
  const q = new URLSearchParams(window.location.search).get('lang')
  if (q === 'ca' || q === 'es') return q
  try {
    const s = localStorage.getItem('lang')
    if (s === 'ca' || s === 'es') return s
  } catch { /* sin almacenamiento */ }
  return 'es'
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(initialLang)
  useEffect(() => {
    document.documentElement.lang = lang
    try { localStorage.setItem('lang', lang) } catch { /* nada */ }
  }, [lang])
  const value = useMemo<Ctx>(() => ({
    lang, setLang,
    t: dict[lang] as Dict,
    l: (v: L) => (lang === 'ca' && v.ca ? v.ca : v.es),
  }), [lang])
  return <I18nCtx.Provider value={value}>{children}</I18nCtx.Provider>
}

export function useI18n() {
  const c = useContext(I18nCtx)
  if (!c) throw new Error('useI18n fuera de I18nProvider')
  return c
}
