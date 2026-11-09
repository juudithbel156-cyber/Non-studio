import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion'
import { useI18n } from '../i18n/I18n'
import { categories, type Category } from '../content/categories'
import { SectionHead } from '../components/Reveal'
import { TiltCard } from '../components/TiltCard'
import { ToyArt } from '../components/ToyArt'
import { IconChevron, IconClose, IconMap, IconPhone } from '../components/Icons'
import { site } from '../config/site'
import { stopScroll } from '../hooks/smoothScroll'

function tint(hex: string, a: number) {
  const n = parseInt(hex.slice(1), 16)
  return `rgba(${n >> 16},${(n >> 8) & 255},${n & 255},${a})`
}

function CategoryCard({ c, i, onOpen }: { c: Category; i: number; onOpen: () => void }) {
  const { t, l } = useI18n()
  return (
    <motion.li
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-6% 0px' }}
      transition={{ duration: 0.8, delay: (i % 5) * 0.07, ease: [0.2, 0.8, 0.2, 1] }}
      className="pt-14"
    >
      <TiltCard className="group h-full" max={14}>
        <button
          type="button"
          onClick={onOpen}
          aria-label={`${t.toys.open}: ${l(c.title)}`}
          className="relative block h-full w-full rounded-[28px] text-left"
          style={{ transformStyle: 'preserve-3d' }}
        >
          <motion.div
            layoutId={`cat-bg-${c.id}`}
            className="absolute inset-0 rounded-[28px] shadow-[0_24px_40px_-24px_rgba(16,41,111,.55)] transition-shadow duration-500 group-hover:shadow-[0_40px_60px_-26px_rgba(16,41,111,.7)]"
            style={{ background: `linear-gradient(165deg, ${tint(c.color, 0.16)}, ${tint(c.color, 0.32)})` }}
          />
          {/* la ilustración sobresale de la tarjeta */}
          <div className="relative -mt-14 px-4" style={{ transform: 'translateZ(60px)' }}>
            <div className="transition-transform duration-500 ease-[cubic-bezier(.2,.9,.25,1.15)] group-hover:-translate-y-3 group-hover:scale-[1.06]">
              <motion.div layoutId={`cat-art-${c.id}`}>
                {c.image ? <img src={c.image} alt="" loading="lazy" className="mx-auto aspect-square w-[82%] object-contain" /> : <ToyArt icon={c.icon} className="mx-auto w-[82%]" />}
              </motion.div>
            </div>
          </div>
          <div className="relative px-5 pb-6 pt-1" style={{ transform: 'translateZ(30px)' }}>
            <h3 className="text-[1.45rem] font-extrabold leading-tight text-tinta">{l(c.title)}</h3>
            <p className="mt-1 text-[.95rem] leading-snug text-gris">{l(c.text)}</p>
          </div>
        </button>
      </TiltCard>
    </motion.li>
  )
}

function Detail({ c, onClose, onNav }: { c: Category; onClose: () => void; onNav: (d: 1 | -1) => void }) {
  const { t, l } = useI18n()
  const closeBtn = useRef<HTMLButtonElement>(null)
  useEffect(() => {
    closeBtn.current?.focus()
    const k = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') onNav(1)
      if (e.key === 'ArrowLeft') onNav(-1)
    }
    window.addEventListener('keydown', k)
    return () => window.removeEventListener('keydown', k)
  }, [onClose, onNav])

  return (
    <motion.div className="fixed inset-0 z-[60] flex items-end justify-center p-0 sm:items-center sm:p-6" role="dialog" aria-modal="true" aria-labelledby="cat-title">
      <motion.div className="absolute inset-0 bg-noche/70 backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} />
      <div className="relative w-full max-w-4xl">
        <motion.div layoutId={`cat-bg-${c.id}`} className="absolute inset-0 rounded-t-[32px] bg-white sm:rounded-[32px]" style={{ background: `linear-gradient(165deg, #fff 40%, ${tint(c.color, 0.22)})` }} />
        <div className="relative grid max-h-[92svh] gap-6 overflow-y-auto p-6 pt-16 sm:grid-cols-[1fr_1.1fr] sm:p-10">
          <motion.div layoutId={`cat-art-${c.id}`} className="mx-auto w-full max-w-[340px]">
            {c.image ? <img src={c.image} alt="" className="w-full object-contain" /> : <ToyArt icon={c.icon} className="w-full" />}
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0, transition: { delay: 0.2 } }} exit={{ opacity: 0, transition: { duration: 0.1 } }}>
            <h3 id="cat-title" className="h-section text-azul">{l(c.title)}</h3>
            <p className="mt-4 text-lg leading-relaxed text-tinta">{l(c.detail)}</p>
            <p className="mt-4 rounded-2xl bg-nube p-4 text-[.95rem] text-gris">{t.toys.note}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href={`tel:${site.phone.tel}`} className="btn btn-azul"><IconPhone size={20} />{t.toys.ask}</a>
              <a href={site.mapsUrl} target="_blank" rel="noopener noreferrer" className="btn btn-claro"><IconMap size={20} />{t.toys.visit}</a>
            </div>
          </motion.div>
        </div>
        <div className="absolute right-4 top-4 flex gap-2">
          <button onClick={() => onNav(-1)} className="grid h-11 w-11 place-items-center rounded-full bg-nube text-azul hover:bg-azul hover:text-white" aria-label="Anterior"><IconChevron dir="left" /></button>
          <button onClick={() => onNav(1)} className="grid h-11 w-11 place-items-center rounded-full bg-nube text-azul hover:bg-azul hover:text-white" aria-label="Siguiente"><IconChevron /></button>
          <button ref={closeBtn} onClick={onClose} className="grid h-11 w-11 place-items-center rounded-full bg-azul text-white" aria-label={t.close}><IconClose /></button>
        </div>
      </div>
    </motion.div>
  )
}

export function Toys() {
  const { t } = useI18n()
  const [open, setOpen] = useState<number | null>(null)
  useEffect(() => { stopScroll(open !== null) }, [open])

  return (
    <section id="juguetes" aria-labelledby="juguetes-title" className="relative bg-nube py-28 md:py-36">
      <div className="container-j">
        <SectionHead id="juguetes-title" title={t.toys.title} lead={t.toys.lead} />
        <LayoutGroup>
          <ul className="grid grid-cols-2 gap-x-4 gap-y-6 md:grid-cols-3 lg:grid-cols-5 lg:gap-x-5">
            {categories.map((c, i) => <CategoryCard key={c.id} c={c} i={i} onOpen={() => setOpen(i)} />)}
          </ul>
          <AnimatePresence>
            {open !== null && (
              <Detail
                key={categories[open].id}
                c={categories[open]}
                onClose={() => setOpen(null)}
                onNav={(d) => setOpen((o) => (o === null ? o : (o + d + categories.length) % categories.length))}
              />
            )}
          </AnimatePresence>
        </LayoutGroup>
      </div>
    </section>
  )
}
