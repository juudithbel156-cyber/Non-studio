import { useState } from 'react'
import { motion } from 'framer-motion'
import { useI18n } from '../i18n/I18n'
import { team, type TeamMember } from '../content/team'
import { SectionHead } from '../components/Reveal'
import { TiltCard } from '../components/TiltCard'

function Silhouette() {
  return (
    <svg viewBox="0 0 200 250" className="h-full w-full" aria-hidden>
      <rect width="200" height="250" fill="url(#tm-bg)" />
      <defs>
        <linearGradient id="tm-bg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#2F5BD3" /><stop offset="1" stopColor="#1B3D9A" /></linearGradient>
      </defs>
      <circle cx="100" cy="100" r="42" fill="#fff" opacity=".22" />
      <path d="M30 250c4-52 34-80 70-80s66 28 70 80Z" fill="#fff" opacity=".22" />
    </svg>
  )
}

function Card({ m, i }: { m: TeamMember; i: number }) {
  const { t, l } = useI18n()
  const [open, setOpen] = useState(false)
  return (
    <motion.li
      initial={{ opacity: 0, y: 60, rotateX: -18 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, margin: '-8% 0px' }}
      transition={{ duration: 1, delay: i * 0.1, ease: [0.2, 0.8, 0.2, 1] }}
      style={{ transformPerspective: 900 }}
    >
      <TiltCard className="group h-full" max={10}>
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          className="relative block h-full w-full overflow-hidden rounded-[28px] bg-white text-left shadow-[0_30px_60px_-30px_rgba(0,0,0,.6)] transition-shadow duration-500 group-hover:shadow-[0_50px_80px_-30px_rgba(0,0,0,.75)]"
          style={{ transformStyle: 'preserve-3d' }}
        >
          <div className="relative aspect-[4/5] overflow-hidden">
            <motion.div
              className="h-full w-full transition-transform duration-700 ease-out group-hover:scale-[1.07]"
              initial={{ clipPath: 'inset(100% 0 0 0)' }}
              whileInView={{ clipPath: 'inset(0% 0 0 0)' }}
              viewport={{ once: true }}
              transition={{ duration: 1.1, delay: 0.2 + i * 0.1, ease: [0.7, 0, 0.2, 1] }}
            >
              {m.photo ? <img src={m.photo} alt={m.name} loading="lazy" className="h-full w-full object-cover" /> : <Silhouette />}
            </motion.div>
            {m.placeholder && <span className="pendiente absolute left-3 top-3">{t.team.pending}</span>}
            {/* información adicional */}
            <div className={`absolute inset-x-0 bottom-0 translate-y-full bg-gradient-to-t from-noche via-noche/85 to-transparent p-3.5 pt-12 text-sm text-white transition-transform sm:p-5 sm:pt-14 sm:text-base duration-500 ease-out group-hover:translate-y-0 ${open ? '!translate-y-0' : ''}`}>
              <p className="leading-relaxed">{l(m.more)}</p>
            </div>
          </div>
          <div className="relative bg-white p-3.5 sm:p-5" style={{ transform: 'translateZ(40px)' }}>
            <h3 className="text-lg font-extrabold leading-tight text-azul sm:text-2xl">{m.name}</h3>
            <p className="font-display text-sm font-bold text-rojo sm:text-base">{l(m.role)}</p>
            <p className="mt-2 hidden text-[.95rem] leading-relaxed text-gris sm:block">{l(m.bio)}</p>
          </div>
        </button>
      </TiltCard>
    </motion.li>
  )
}

export function Team() {
  const { t } = useI18n()
  return (
    <section id="equipo" aria-labelledby="equipo-title" className="relative overflow-hidden bg-azul py-28 md:py-36">
      {/* destellos de la marca */}
      <svg aria-hidden viewBox="0 0 100 100" className="pointer-events-none absolute -right-16 -top-16 hidden h-80 w-80 opacity-40 md:block">
        <g stroke="#FFCC00" strokeWidth="7" strokeLinecap="round"><path d="M20 30l30-18" /><path d="M28 55h40" /><path d="M20 80l30 18" /></g>
      </svg>
      <div className="container-j relative">
        <SectionHead id="equipo-title" title={t.team.title} lead={t.team.lead} tone="light" />
        <ul className="grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-4">
          {team.map((m, i) => <Card key={i} m={m} i={i} />)}
        </ul>
      </div>
    </section>
  )
}
