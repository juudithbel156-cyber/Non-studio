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

export function SectionHead({ title, lead, tone = 'dark', id }: { title: string; lead?: string; tone?: 'dark' | 'light'; id?: string }) {
  return (
    <Reveal className="mb-12 max-w-3xl md:mb-16">
      <h2 id={id} className={`h-section ${tone === 'light' ? 'text-white' : 'text-azul'}`}>{title}</h2>
      {lead && <p className={`lead mt-5 ${tone === 'light' ? '!text-white/75' : ''}`}>{lead}</p>}
    </Reveal>
  )
}
