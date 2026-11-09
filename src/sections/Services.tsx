import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { useI18n } from '../i18n/I18n'
import { services, type ServiceIcon } from '../content/services'
import { SectionHead } from '../components/Reveal'

const glyph: Record<ServiceIcon, ReactNode> = {
  chat: <path d="M6 8h20v13H14l-6 5v-5H6Z" />,
  gift: <><rect x="6" y="13" width="20" height="13" rx="2" /><path d="M4 9h24v5H4ZM16 9v17M16 9c-3-5-9-4-7 0M16 9c3-5 9-4 7 0" /></>,
  list: <><rect x="8" y="5" width="16" height="22" rx="3" /><path d="M12 11h8M12 16h8M12 21h5" /></>,
  phone: <path d="M9 5h4l2 6-3 2a12 12 0 0 0 7 7l2-3 6 2v4a2 2 0 0 1-2 2A20 20 0 0 1 7 7a2 2 0 0 1 2-2Z" />,
  bag: <><path d="M7 11h18l-2 15H9Z" /><path d="M12 11a4 4 0 0 1 8 0" /></>,
  plus: <path d="M16 8v16M8 16h16" />,
}
const colors = ['#1B3D9A', '#E52421', '#0E9F6E', '#7C3AED', '#F59E0B', '#0EA5E9']

/** Icono con volumen real: capas apiladas en el eje Z (CSS 3D), gira al pasar el ratón. */
function Icon3D({ icon, color }: { icon: ServiceIcon; color: string }) {
  const layers = 7
  return (
    <div className="h-24 w-24" style={{ perspective: 600 }}>
      <div className="relative h-full w-full transition-transform duration-700 ease-[cubic-bezier(.2,.9,.25,1.15)] [transform:rotateX(18deg)_rotateY(-24deg)] group-hover:[transform:rotateX(8deg)_rotateY(28deg)_translateZ(10px)]" style={{ transformStyle: 'preserve-3d' }}>
        {Array.from({ length: layers }).map((_, i) => (
          <div
            key={i}
            className="absolute inset-0 grid place-items-center rounded-[26px]"
            style={{ transform: `translateZ(${(i - layers) * 2.2}px)`, background: i === layers - 1 ? color : `color-mix(in srgb, ${color} ${55 + i * 5}%, #000)` }}
          >
            {i === layers - 1 && (
              <svg viewBox="0 0 32 32" className="h-12 w-12" fill="none" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>{glyph[icon]}</svg>
            )}
          </div>
        ))}
        <div className="absolute inset-0 rounded-[26px] bg-[linear-gradient(140deg,rgba(255,255,255,.45),transparent_45%)]" style={{ transform: 'translateZ(0.5px)' }} />
      </div>
    </div>
  )
}

export function Services() {
  const { t, l } = useI18n()
  return (
    <section id="servicios" aria-labelledby="servicios-title" className="relative bg-white py-28 md:py-36">
      <div className="container-j">
        <SectionHead id="servicios-title" title={t.services.title} lead={t.services.lead} />
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-8% 0px' }}
              transition={{ duration: 0.7, delay: (i % 3) * 0.08 }}
              className="group flex gap-5 rounded-[28px] bg-nube p-6 transition-colors duration-500 hover:bg-[#E3E9FF]"
            >
              <Icon3D icon={s.icon} color={colors[i % colors.length]} />
              <div className="flex-1">
                <h3 className="text-[1.35rem] font-extrabold leading-tight text-tinta">{l(s.title)}</h3>
                <p className="mt-1.5 text-[.97rem] leading-relaxed text-gris">{l(s.text)}</p>
                {!s.confirmed && <span className="pendiente mt-3">{t.services.pending}</span>}
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  )
}
