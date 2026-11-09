import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

/** Entrada sutil al aparecer en pantalla (respeta "reducir movimiento" vía MotionConfig). */
export function Reveal({ children, delay = 0, className = '', y = 28 }: { children: ReactNode; delay?: number; className?: string; y?: number }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{ duration: 0.8, delay, ease: [0.2, 0.8, 0.2, 1] }}
    >
      {children}
    </motion.div>
  )
}

export function SectionHead({ title, lead, tone = 'dark', id, deco }: { title: string; lead?: string; tone?: 'dark' | 'light'; id?: string; deco?: ReactNode }) {
  return (
    <div className="relative mb-10 flex flex-col-reverse gap-2 md:mb-14 md:flex-row md:items-end md:justify-between md:gap-8">
      <Reveal className="max-w-3xl">
        <h2 id={id} className={`h-section ${tone === 'light' ? 'text-white' : 'text-azul'}`} style={{ textWrap: 'balance' }}>{title}</h2>
        {lead && <p className={`lead mt-5 ${tone === 'light' ? '!text-white/80' : ''}`}>{lead}</p>}
      </Reveal>
      {deco && <div className="-mb-4 -mt-6 self-end md:-my-10 md:shrink-0">{deco}</div>}
    </div>
  )
}
