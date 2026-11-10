import { useEffect, useRef, useState } from 'react'
import { Logo } from './ui'
import { useCart } from '../store/cart'
import { store } from '../data/store'
import { gsap, scrollToTarget, stopScroll } from '../hooks/smoothScroll'

export const NAV = [
  { id: 'coleccion', label: 'The Collection' },
  { id: 'novedades', label: 'New Arrivals' },
  { id: 'mundo', label: 'The NAU World' },
  { id: 'lookbook', label: 'Lookbook' },
  { id: 'visitanos', label: 'Visit Us' },
]

export function Header() {
  const { count, setOpen } = useCart()
  const [menu, setMenu] = useState(false)
  const [dark, setDark] = useState(true)
  const panel = useRef<HTMLDivElement>(null)

  // La cabecera se aclara sobre cualquier sección marcada como oscura (data-dark)
  useEffect(() => {
    const on = () => {
      const y = 42
      const hit = [...document.querySelectorAll<HTMLElement>('[data-dark]')].some((el) => { const r = el.getBoundingClientRect(); return r.top <= y && r.bottom >= y })
      setDark(hit)
    }
    on(); addEventListener('scroll', on, { passive: true }); return () => removeEventListener('scroll', on)
  }, [])

  useEffect(() => {
    stopScroll(menu)
    const el = panel.current; if (!el) return
    if (menu) {
      gsap.set(el, { display: 'flex' })
      gsap.fromTo(el, { clipPath: 'inset(0% 0% 100% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.9, ease: 'expo.inOut' })
      gsap.fromTo(el.querySelectorAll('[data-i]'), { yPercent: 110 }, { yPercent: 0, duration: 1.1, stagger: 0.05, ease: 'expo.out', delay: 0.35 })
      gsap.fromTo(el.querySelector('[data-s]'), { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: 1.4, ease: 'power2.inOut', delay: 0.4 })
    } else {
      gsap.to(el, { clipPath: 'inset(0% 0% 100% 0%)', duration: 0.7, ease: 'expo.inOut', onComplete: () => { el.style.display = 'none' } })
    }
  }, [menu])
  useEffect(() => { const k = (e: KeyboardEvent) => e.key === 'Escape' && setMenu(false); addEventListener('keydown', k); return () => removeEventListener('keydown', k) }, [])

  const go = (id: string) => { setMenu(false); scrollToTarget(`#${id}`) }
  const tone = dark && !menu ? 'text-hueso' : 'text-negro'

  return (
    <>
      <header className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${tone}`} style={{ paddingTop: 'env(safe-area-inset-top, 0px)' }}>
        <div className="gutter wrap grid h-[72px] grid-cols-3 items-center md:h-[84px]">
          <button onClick={() => setMenu((m) => !m)} aria-expanded={menu} aria-label={menu ? 'Cerrar menú' : 'Abrir menú'} className="group flex items-center gap-3 justify-self-start">
            <span className="relative block h-3 w-7">
              <span className={`absolute left-0 top-0 h-px w-full bg-current transition-transform duration-500 ${menu ? 'translate-y-1.5 rotate-45' : 'group-hover:w-5'}`} />
              <span className={`absolute bottom-0 left-0 h-px w-full bg-current transition-transform duration-500 ${menu ? '-translate-y-1.5 -rotate-45' : ''}`} />
            </span>
            <span className="meta hidden sm:inline">{menu ? 'Cerrar' : 'Menú'}</span>
          </button>
          <a href="#top" onClick={(e) => { e.preventDefault(); setMenu(false); scrollToTarget(0) }} className="justify-self-center" aria-label="NAU essentials, inicio">
            <Logo size={30} className={dark && !menu ? '' : 'text-musgo'} />
          </a>
          <div className="flex items-center gap-5 justify-self-end">
            <a href={store.instagram.url} target="_blank" rel="noopener noreferrer" className="meta hidden md:inline">Instagram</a>
            <button onClick={() => setOpen(true)} className="meta flex items-center gap-2" aria-label={`Abrir bolsa, ${count} artículos`}>
              Bolsa <span className={`grid h-6 min-w-6 place-items-center rounded-full px-1.5 text-[11px] ${count ? 'bg-lima text-negro' : 'border border-current'}`}>{count}</span>
            </button>
          </div>
        </div>
      </header>

      <div ref={panel} className="fixed inset-0 z-40 hidden flex-col justify-between bg-hueso pb-10 pt-28" role="dialog" aria-modal="true" aria-label="Menú">
        <nav className="gutter wrap w-full">
          <ul className="flex flex-col">
            {NAV.map((n, i) => (
              <li key={n.id} className="overflow-hidden border-b border-negro/10">
                <a data-i href={`#${n.id}`} onClick={(e) => { e.preventDefault(); go(n.id) }} className="group flex items-baseline justify-between py-3 md:py-4">
                  <span className="font-serif text-[clamp(2.4rem,7vw,6rem)] font-light leading-[1] tracking-[-0.04em] transition-transform duration-700 ease-[var(--ease-suelta)] group-hover:translate-x-4 group-hover:italic">{n.label}</span>
                  <span className="meta text-piedra">{String(i + 1).padStart(2, '0')}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="gutter wrap w-full">
          <div data-s className="stitch mb-6 text-cuero" />
          <div className="flex flex-wrap items-center justify-between gap-4 text-[14px]">
            <span>{store.street}, Martorell</span>
            <a href={`tel:${store.tel}`}>{store.phone}</a>
            <a href={store.instagram.url} target="_blank" rel="noopener noreferrer">{store.instagram.handle}</a>
          </div>
        </div>
      </div>
    </>
  )
}
