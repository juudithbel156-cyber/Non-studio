import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from 'react'
import { gsap, ScrollTrigger, scrollTopNow, scrollToTarget } from './hooks/smoothScroll'
import type { Category } from './content/site'

export type Route = { page: 'home'; anchor?: string } | { page: 'cat'; id: Category['id'] }
const IDS = ['facial', 'corporal', 'bienestar', 'crio'] as const

function parse(): Route {
  const h = location.hash.replace('#', '')
  const m = h.match(/^tratamiento-(facial|corporal|bienestar|crio)$/)
  return m ? { page: 'cat', id: m[1] as Category['id'] } : { page: 'home' }
}
export const hashFor = (r: Route) => (r.page === 'cat' ? `#tratamiento-${r.id}` : '#inicio')

type Ctx = { route: Route; go: (r: Route, e?: { clientX: number; clientY: number }, label?: string) => void }
const C = createContext<Ctx | null>(null)

/**
 * Navegación entre páginas con transición cinematográfica:
 * una cortina circular cubre la pantalla desde el punto del clic, se cambia de página
 * y la cortina se retira hacia arriba descubriendo la nueva escena.
 */
export function RouterProvider({ children }: { children: ReactNode }) {
  const [route, setRoute] = useState<Route>(parse)
  const curtain = useRef<HTMLDivElement>(null)
  const label = useRef<HTMLParagraphElement>(null)
  const busy = useRef(false)

  useEffect(() => {
    const on = () => { if (!busy.current) { setRoute(parse()); scrollTopNow() } }
    window.addEventListener('hashchange', on)
    return () => window.removeEventListener('hashchange', on)
  }, [])

  const go = useCallback<Ctx['go']>((r, e, text) => {
    // Ancla dentro de la home: desplazamiento suave sin cambiar de página
    if (r.page === 'home' && route.page === 'home') {
      if (r.anchor) scrollToTarget(`#${r.anchor}`)
      else scrollToTarget(0)
      return
    }
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches
    const swap = () => {
      setRoute(r)
      history.pushState(null, '', hashFor(r))
      scrollTopNow()
      requestAnimationFrame(() => {
        ScrollTrigger.refresh()
        if (r.page === 'home' && r.anchor) setTimeout(() => scrollToTarget(`#${r.anchor}`), 60)
      })
    }
    if (reduced || !curtain.current) { swap(); return }
    busy.current = true
    const x = e ? e.clientX : innerWidth / 2
    const y = e ? e.clientY : innerHeight / 2
    if (label.current) label.current.textContent = text ?? ''
    gsap.timeline({ onComplete: () => { busy.current = false } })
      .set(curtain.current, { display: 'flex', clipPath: `circle(0% at ${x}px ${y}px)` })
      .fromTo(label.current, { yPercent: 60, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.6, ease: 'expo.out' }, 0.35)
      .to(curtain.current, { clipPath: `circle(150% at ${x}px ${y}px)`, duration: 0.8, ease: 'power3.inOut' }, 0)
      .add(swap)
      .to(label.current, { yPercent: -40, opacity: 0, duration: 0.4, ease: 'power2.in' }, '+=0.15')
      .to(curtain.current, { clipPath: 'inset(0% 0% 100% 0%)', duration: 0.9, ease: 'expo.inOut' }, '<0.1')
      .set(curtain.current, { display: 'none', clipPath: 'none' })
  }, [route.page])

  return (
    <C.Provider value={{ route, go }}>
      {children}
      <div ref={curtain} aria-hidden className="fixed inset-0 z-[90] hidden items-center justify-center bg-chocolate">
        <p ref={label} className="gutter text-center font-serif text-[clamp(2.4rem,6vw,5.5rem)] leading-none text-crema" />
      </div>
    </C.Provider>
  )
}
export const useRouter = () => { const c = useContext(C); if (!c) throw new Error('router'); return c }
export { IDS }
