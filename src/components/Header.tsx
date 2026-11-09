import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Logo } from './Logo'
import { IconClose, IconMenu, IconPhone } from './Icons'
import { useI18n } from '../i18n/I18n'
import { site } from '../config/site'
import { scrollToTarget, stopScroll } from '../hooks/smoothScroll'

export const NAV = ['inicio', 'tienda', 'equipo', 'juguetes', 'marcas', 'novedades', 'servicios', 'contacto'] as const
type Id = (typeof NAV)[number]

const key: Record<Id, 'home' | 'store' | 'team' | 'toys' | 'brands' | 'news' | 'services' | 'contact'> = {
  inicio: 'home', tienda: 'store', equipo: 'team', juguetes: 'toys', marcas: 'brands', novedades: 'news', servicios: 'services', contacto: 'contact',
}

export function Header() {
  const { t, lang, setLang } = useI18n()
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState<Id>('inicio')
  const [solid, setSolid] = useState(false)

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id as Id)),
      { rootMargin: '-45% 0px -50% 0px' },
    )
    NAV.forEach((id) => { const el = document.getElementById(id); if (el) io.observe(el) })
    const onScroll = () => setSolid(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => { io.disconnect(); window.removeEventListener('scroll', onScroll) }
  }, [])

  useEffect(() => { stopScroll(open) }, [open])
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const go = (id: Id) => { setOpen(false); scrollToTarget(id === 'inicio' ? 0 : `#${id}`) }

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${solid ? 'bg-noche/85 shadow-[0_10px_30px_-15px_rgba(0,0,0,.5)] backdrop-blur-md' : 'bg-transparent'}`}>
      <div className="container-j flex h-[72px] items-center justify-between gap-4">
        <a href="#inicio" onClick={(e) => { e.preventDefault(); go('inicio') }} aria-label="Juguettos Martorell, inicio">
          <Logo />
        </a>

        <nav aria-label="Principal" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {NAV.slice(1).map((id) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  onClick={(e) => { e.preventDefault(); go(id) }}
                  aria-current={active === id ? 'true' : undefined}
                  className="relative rounded-full px-3.5 py-2 font-display text-[.98rem] font-semibold text-white/85 transition-colors hover:text-white"
                >
                  {active === id && (
                    <motion.span layoutId="nav-pill" className="absolute inset-0 -z-10 rounded-full bg-azul-claro" transition={{ type: 'spring', stiffness: 380, damping: 32 }} />
                  )}
                  {t.nav[key[id]]}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <div className="flex rounded-full bg-white/10 p-1 text-sm font-bold text-white" role="group" aria-label="Idioma">
            {(['es', 'ca'] as const).map((l) => (
              <button key={l} onClick={() => setLang(l)} aria-pressed={lang === l} className={`rounded-full px-2.5 py-1 uppercase transition-colors ${lang === l ? 'bg-white text-azul' : 'hover:bg-white/10'}`}>
                {l}
              </button>
            ))}
          </div>
          <a href={`tel:${site.phone.tel}`} className="grid h-11 w-11 place-items-center rounded-full bg-amarillo text-tinta transition-transform hover:scale-105" aria-label={`${t.call} ${site.phone.display}`}>
            <IconPhone size={20} />
          </a>
          <button onClick={() => setOpen(true)} className="grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white lg:hidden" aria-label={t.menu} aria-expanded={open}>
            <IconMenu />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-50 bg-noche/97 lg:hidden"
            initial={{ clipPath: 'circle(0% at 92% 36px)' }}
            animate={{ clipPath: 'circle(150% at 92% 36px)' }}
            exit={{ clipPath: 'circle(0% at 92% 36px)' }}
            transition={{ duration: 0.55, ease: [0.7, 0, 0.2, 1] }}
            role="dialog"
            aria-modal="true"
            aria-label={t.menu}
          >
            <div className="container-j flex h-[72px] items-center justify-between">
              <Logo />
              <button onClick={() => setOpen(false)} className="grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white" aria-label={t.close}>
                <IconClose />
              </button>
            </div>
            <ul className="container-j mt-6 flex flex-col gap-1">
              {NAV.map((id, i) => (
                <motion.li key={id} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 + i * 0.04 }}>
                  <a
                    href={`#${id}`}
                    onClick={(e) => { e.preventDefault(); go(id) }}
                    className={`block rounded-2xl px-4 py-3 font-display text-3xl font-bold ${active === id ? 'bg-azul-claro text-white' : 'text-white/85'}`}
                  >
                    {t.nav[key[id]]}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
