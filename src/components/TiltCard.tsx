import { useRef, type ReactNode } from 'react'
import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform, useReducedMotion } from 'framer-motion'

/**
 * Tarjeta con inclinación 3D real (CSS 3D: perspective + preserve-3d).
 * Los hijos pueden usar `style={{ transform: 'translateZ(40px)' }}` para separarse en capas.
 */
export function TiltCard({ children, className = '', max = 12, glare = true }: { children: ReactNode; className?: string; max?: number; glare?: boolean }) {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const x = useMotionValue(0.5)
  const y = useMotionValue(0.5)
  const sx = useSpring(x, { stiffness: 220, damping: 22 })
  const sy = useSpring(y, { stiffness: 220, damping: 22 })
  const rotY = useTransform(sx, [0, 1], [-max, max])
  const rotX = useTransform(sy, [0, 1], [max, -max])
  const gx = useTransform(sx, (v) => `${v * 100}%`)
  const gy = useTransform(sy, (v) => `${v * 100}%`)
  const glareBg = useMotionTemplate`radial-gradient(circle at ${gx} ${gy}, rgba(255,255,255,.35), transparent 55%)`

  const move = (e: React.PointerEvent) => {
    if (reduced || e.pointerType === 'touch') return
    const r = ref.current!.getBoundingClientRect()
    x.set((e.clientX - r.left) / r.width)
    y.set((e.clientY - r.top) / r.height)
  }
  const leave = () => { x.set(0.5); y.set(0.5) }

  return (
    <div style={{ perspective: 1100 }} className={className}>
      <motion.div
        ref={ref}
        onPointerMove={move}
        onPointerLeave={leave}
        style={{ rotateX: rotX, rotateY: rotY, transformStyle: 'preserve-3d' }}
        className="relative h-full"
      >
        {children}
        {glare && !reduced && (
          <motion.div aria-hidden className="pointer-events-none absolute inset-0 rounded-[28px] opacity-0 transition-opacity duration-300 group-hover:opacity-100" style={{ background: glareBg }} />
        )}
      </motion.div>
    </div>
  )
}
