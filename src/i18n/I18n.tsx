import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { dict, type Dict, type Lang } from './dict'
import type { L } from '../content/site'

type Ctx = { lang: Lang; t: Dict; l: (v: L) => string; setLang: (l: Lang) => void }
const C = createContext<Ctx | null>(null)

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(() => {
    try { const s = localStorage.getItem('hebe-lang'); if (s === 'ca' || s === 'es') return s } catch { /* sin almacenamiento */ }
    return 'es'
  })
  useEffect(() => {
    document.documentElement.lang = lang
    try { localStorage.setItem('hebe-lang', lang) } catch { /* nada */ }
  }, [lang])
  const v = useMemo<Ctx>(() => ({ lang, setLang, t: dict[lang] as Dict, l: (x: L) => x[lang] }), [lang])
  return <C.Provider value={v}>{children}</C.Provider>
}
export const useI18n = () => { const c = useContext(C); if (!c) throw new Error('I18n'); return c }
