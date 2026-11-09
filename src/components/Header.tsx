import { useEffect, useRef, useState } from 'react'
import { useI18n } from '../i18n/I18n'
import { useRouter } from '../router'
import { Logo, Pill } from './ui'
import { categories, contact } from '../content/site'
import { gsap, stopScroll } from '../hooks/smoothScroll'

export function Header() {
  const { t, lang, setLang } = useI18n()
  const { go, route } = useRouter()
  const [open, setOpen] = useState(false)
  const [compact, setCompact] = useState(false)
  const panel = useRef<HTMLDivElement>(null)
  const tone = route.page === 'cat' ? categories.find((c) => c.id === route.id)?.tone : undefined
  const onColor = !!tone && tone !== 'melocoton'

  useEffect(() => {
    const on = () => setCompact(scrollY > 80)
    on(); addEventListener('scroll', on, { passive: true })
    return () => removeEventListener('scroll', on)
  }, [])

  useEffect(() => {
    stopScroll(open)
    const el = panel.current
    if (!el) return
    if (open) {
      gsap.set(el, { display: 'flex' })
      gsap.fromTo(el, { clipPath: 'circle(0% at 100% 0%)' }, { clipPath: 'circle(150% at 100% 0%)', duration: 0.9, ease: 'expo.inOut' })
      gsap.fromTo(el.querySelectorAll('[data-item]'), { yPercent: 120, rotate: 4 }, { yPercent: 0, rotate: 0, duration: 1, stagger: 0.05, ease: 'expo.out', delay: 0.3 })
    } else {
      gsap.to(el, { clipPath: 'circle(0% at 100% 0%)', duration: 0.6, ease: 'expo.inOut', onComplete: () => { el.style.display = 'none' } })
    }
  }, [open])

  const items = [
    { label: t.nav.treatments, anchor: 'tratamientos' },
    { label: t.nav.results, anchor: 'resultados' },
    { label: t.nav.team, anchor: 'equipo' },
    { label: t.nav.center, anchor: 'centro' },
  ]
  const nav = (anchor: string, e?: React.MouseEvent) => { setOpen(false); go({ page: 'home', anchor }, e, route.page === 'home' ? undefined : 'Hêbê') }

  return (
    <>
      <header className="pointer-events-none fixed inset-x-0 top-0 z-50" style={{ paddingTop: 'env(safe-area-inset-top, 0px)' }}>
        <div className={`gutter wrap grid grid-cols-[1fr_auto_1fr] items-start pt-5 transition-[padding] duration-500 ${compact ? 'md:pt-4' : 'md:pt-7'}`}>
          {/* navegación en columna */}
          <nav aria-label="Principal" className="pointer-events-auto hidden md:block">
            <ul className={`flex flex-col gap-0.5 text-[13px] transition-opacity duration-500 ${compact || onColor ? 'pointer-events-none opacity-0' : ''}`}>
              {items.map((i, k) => (
                <li key={i.anchor}>
                  <a href="#inicio" onClick={(e) => { e.preventDefault(); nav(i.anchor, e) }} className={`group inline-flex items-center gap-2 ${k === 0 ? 'text-naranja' : 'text-tinta/70 hover:text-tinta'}`}>
                    {i.label}
                    {k === 0 && <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-naranja" />}
                  </a>
                </li>
              ))}
            </ul>
            <button onClick={() => setOpen(true)} className={`absolute top-4 inline-flex h-11 items-center gap-3 rounded-full bg-white/80 px-5 text-[14px] shadow-[0_8px_30px_-12px_rgba(29,42,36,.35)] backdrop-blur transition-[opacity,transform] duration-500 ${compact || onColor ? '' : 'pointer-events-none -translate-y-3 opacity-0'}`} aria-label={t.menu} aria-expanded={open}>
              <span className="flex flex-col gap-1"><span className="h-px w-4 bg-tinta" /><span className="h-px w-4 bg-tinta" /></span>{t.menu}
            </button>
          </nav>

          <a href="#inicio" onClick={(e) => { e.preventDefault(); setOpen(false); go({ page: 'home' }, e, 'Hêbê') }} className={`pointer-events-auto col-start-1 justify-self-start transition-opacity duration-500 md:col-start-2 md:justify-self-center ${compact ? 'md:opacity-0' : ''}`} aria-label="Inicio">
            <Logo light={onColor} className="h-7 md:h-9" />
          </a>

          <div className="pointer-events-auto col-start-3 flex items-center justify-end gap-2">
            <div className="flex rounded-full bg-white/80 p-1 text-[12px] backdrop-blur" role="group" aria-label="Idioma">
              {(['es', 'ca'] as const).map((l) => (
                <button key={l} onClick={() => setLang(l)} aria-pressed={lang === l} className={`rounded-full px-2.5 py-1.5 uppercase transition-colors ${lang === l ? 'bg-tinta text-white' : 'text-tinta/60 hover:text-tinta'}`}>{l}</button>
              ))}
            </div>
            <Pill href={`tel:${contact.tel}`} tone={tone === 'naranja' ? 'tinta' : 'naranja'} className="!h-11 max-sm:hidden">{t.cta.bookShort}</Pill>
            <button onClick={() => setOpen((o) => !o)} aria-expanded={open} aria-label={open ? t.close : t.menu} className="grid h-11 w-11 place-items-center rounded-full bg-tinta text-white md:hidden">
              <span className="flex flex-col gap-1"><span className="h-px w-4 bg-white" /><span className="h-px w-4 bg-white" /></span>
            </button>
          </div>
        </div>
      </header>

      <div ref={panel} className="fixed inset-0 z-[60] hidden flex-col justify-between bg-naranja pb-10 pt-6 text-white" role="dialog" aria-modal="true" aria-label={t.menu}>
        <div className="gutter flex items-center justify-between">
          <Logo light className="h-8" />
          <button onClick={() => setOpen(false)} className="grid h-11 w-11 place-items-center rounded-full bg-white text-naranja" aria-label={t.close}>
            <svg width="14" height="14" viewBox="0 0 14 14"><path d="M2 2l10 10M12 2 2 12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>
          </button>
        </div>
        <ul className="gutter flex flex-col">
          {items.map((i) => (
            <li key={i.anchor} className="overflow-hidden">
              <a data-item href="#inicio" onClick={(e) => { e.preventDefault(); nav(i.anchor, e) }} className="block font-display text-[clamp(2.6rem,9vw,7rem)] font-medium leading-[1.05] tracking-[-0.04em] hover:text-tinta">{i.label}</a>
            </li>
          ))}
        </ul>
        <div className="gutter flex flex-wrap items-center gap-4 text-[15px]">
          <Pill href={`tel:${contact.tel}`} tone="blanco">{t.cta.book}</Pill>
          <span className="text-white/80">{contact.street}, {contact.city}</span>
        </div>
      </div>
    </>
  )
}
