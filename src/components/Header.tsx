import { useEffect, useRef, useState } from 'react'
import { useI18n } from '../i18n/I18n'
import { useRouter } from '../router'
import { Wordmark } from './ui'
import { contact } from '../content/site'
import { gsap, stopScroll } from '../hooks/smoothScroll'

export function Header() {
  const { t, lang, setLang } = useI18n()
  const { go, route } = useRouter()
  const [open, setOpen] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [solid, setSolid] = useState(false)
  const panel = useRef<HTMLDivElement>(null)
  const last = useRef(0)

  useEffect(() => {
    const on = () => {
      const y = scrollY
      setSolid(y > 60)
      setHidden(y > 300 && y > last.current + 4)
      if (y < last.current - 4) setHidden(false)
      last.current = y
    }
    on(); addEventListener('scroll', on, { passive: true })
    return () => removeEventListener('scroll', on)
  }, [])

  useEffect(() => {
    stopScroll(open)
    if (!panel.current) return
    if (open) {
      gsap.set(panel.current, { display: 'flex' })
      gsap.fromTo(panel.current, { clipPath: 'inset(0% 0% 100% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.8, ease: 'expo.inOut' })
      gsap.fromTo(panel.current.querySelectorAll('[data-item]'), { yPercent: 110 }, { yPercent: 0, duration: 1, stagger: 0.06, ease: 'expo.out', delay: 0.35 })
    } else {
      gsap.to(panel.current, { clipPath: 'inset(0% 0% 100% 0%)', duration: 0.6, ease: 'expo.inOut', onComplete: () => { if (panel.current) panel.current.style.display = 'none' } })
    }
  }, [open])

  const items = [
    { label: t.nav.treatments, anchor: 'tratamientos' },
    { label: t.nav.about, anchor: 'sobre' },
    { label: t.nav.featured, anchor: 'destacados' },
    { label: t.nav.contact, anchor: 'reserva' },
  ]
  const nav = (anchor: string, e?: React.MouseEvent) => { setOpen(false); go({ page: 'home', anchor }, e, route.page === 'home' ? undefined : t.nav.home) }

  return (
    <>
      <header className={`fixed inset-x-0 top-0 z-50 transition-[transform,background-color,backdrop-filter] duration-700 ease-[var(--ease-lujo)] ${hidden && !open ? '-translate-y-full' : ''} ${solid ? 'bg-crema/75 backdrop-blur-xl' : ''}`} style={{ paddingTop: 'env(safe-area-inset-top, 0px)' }}>
        <div className="gutter wrap flex h-[76px] items-center justify-between gap-6">
          <a href="#inicio" onClick={(e) => { e.preventDefault(); setOpen(false); go({ page: 'home' }, e, 'Hêbê') }} aria-label="Hêbê by Clau, inicio">
            <Wordmark />
          </a>
          <nav aria-label="Principal" className="hidden lg:block">
            <ul className="flex gap-9 text-[15px]">
              {items.map((i) => (
                <li key={i.anchor}><a href={`#inicio`} onClick={(e) => { e.preventDefault(); nav(i.anchor, e) }} className="relative py-2 after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:origin-right after:scale-x-0 after:bg-chocolate after:transition-transform after:duration-500 hover:after:origin-left hover:after:scale-x-100">{i.label}</a></li>
              ))}
            </ul>
          </nav>
          <div className="flex items-center gap-3">
            <div className="flex text-[13px]" role="group" aria-label="Idioma">
              {(['es', 'ca'] as const).map((l) => (
                <button key={l} onClick={() => setLang(l)} aria-pressed={lang === l} className={`px-2 py-2 uppercase tracking-[0.06em] transition-opacity ${lang === l ? 'opacity-100' : 'opacity-40 hover:opacity-80'}`}>{l}</button>
              ))}
            </div>
            <a href={`tel:${contact.tel}`} data-magnetic className="btn btn-dark hidden h-11 px-6 text-[14px] sm:inline-flex">{t.cta.book}</a>
            <button onClick={() => setOpen((o) => !o)} aria-expanded={open} aria-label={open ? t.close : t.menu} className="relative flex h-11 w-11 flex-col items-center justify-center gap-[6px] lg:hidden">
              <span className={`h-px w-6 bg-chocolate transition-transform duration-500 ${open ? 'translate-y-[3.5px] rotate-45' : ''}`} />
              <span className={`h-px w-6 bg-chocolate transition-transform duration-500 ${open ? '-translate-y-[3.5px] -rotate-45' : ''}`} />
            </button>
          </div>
        </div>
      </header>
      <div ref={panel} className="fixed inset-0 z-40 hidden flex-col justify-between bg-crema pb-10 pt-28" role="dialog" aria-modal="true" aria-label={t.menu}>
        <ul className="gutter flex flex-col gap-2">
          {items.map((i) => (
            <li key={i.anchor} className="overflow-hidden"><a data-item href="#inicio" onClick={(e) => { e.preventDefault(); nav(i.anchor, e) }} className="block font-serif text-[13vw] leading-[1.05]">{i.label}</a></li>
          ))}
        </ul>
        <div className="gutter flex flex-col gap-3">
          <a href={`tel:${contact.tel}`} className="btn btn-dark">{t.cta.book} · {contact.phone}</a>
          <p className="label">{contact.street}, {contact.city}</p>
        </div>
      </div>
    </>
  )
}
