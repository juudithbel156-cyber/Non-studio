import { useEffect, useRef } from 'react'
import { ToyArt } from '../components/ToyArt'
import type { ToyIcon } from '../content/categories'

/**
 * Alternativa sin WebGL (y pantalla de carga): capas de ilustraciones con parallax por ratón.
 */
const layers: { icon: ToyIcon; cls: string; depth: number }[] = [
  { icon: 'car', cls: 'left-[4%] bottom-[10%] w-[32vw] max-w-[360px]', depth: 30 },
  { icon: 'teddy', cls: 'right-[4%] bottom-[8%] w-[28vw] max-w-[320px]', depth: 26 },
  { icon: 'blocks', cls: 'left-[34%] bottom-[2%] w-[18vw] max-w-[200px]', depth: 40 },
  { icon: 'star', cls: 'right-[18%] top-[14%] w-[12vw] max-w-[140px]', depth: 14 },
  { icon: 'baby', cls: 'left-[12%] top-[18%] w-[10vw] max-w-[120px] opacity-70', depth: 10 },
]

export function HeroFallback({ loading = false }: { loading?: boolean }) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const move = (e: PointerEvent) => {
      const x = e.clientX / window.innerWidth - 0.5
      const y = e.clientY / window.innerHeight - 0.5
      el.querySelectorAll<HTMLElement>('[data-depth]').forEach((n) => {
        const d = Number(n.dataset.depth)
        n.style.transform = `translate3d(${-x * d}px, ${-y * d}px, 0)`
      })
    }
    window.addEventListener('pointermove', move)
    return () => window.removeEventListener('pointermove', move)
  }, [])
  return (
    <div ref={ref} className="absolute inset-0 overflow-hidden bg-[radial-gradient(ellipse_at_50%_110%,#2F5BD3_0%,#10296F_60%)]" aria-hidden>
      <div className="absolute inset-x-0 bottom-0 h-[28%] bg-[linear-gradient(180deg,transparent,rgba(6,20,63,.4))]" />
      {layers.map((l) => (
        <div key={l.icon} data-depth={l.depth} className={`absolute transition-transform duration-300 ease-out ${l.cls} ${loading ? 'opacity-30' : ''}`}>
          <ToyArt icon={l.icon} className="h-auto w-full" />
        </div>
      ))}
      {loading && <div className="absolute bottom-24 left-1/2 h-1 w-24 -translate-x-1/2 overflow-hidden rounded-full bg-white/15"><div className="h-full w-1/2 animate-pulse rounded-full bg-amarillo" /></div>}
    </div>
  )
}
