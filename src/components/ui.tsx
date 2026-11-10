import { useEffect, useRef, type ReactNode } from 'react'
import { gsap } from '../hooks/smoothScroll'

/** Logotipo NAU: minúsculas redondeadas como en su etiqueta de cuero. */
export function Logo({ className = '', size = 28 }: { className?: string; size?: number }) {
  return <span className={`font-marca font-semibold leading-none tracking-[-0.01em] ${className}`} style={{ fontSize: size }}>nau</span>
}

/** Texto revelado por máscara, línea a línea (palabras). */
export function MaskText({ text, className = '', as: Tag = 'h2', delay = 0, trigger = true }: { text: string; className?: string; as?: 'h1' | 'h2' | 'h3' | 'p'; delay?: number; trigger?: boolean }) {
  const ref = useRef<HTMLElement>(null)
  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const ctx = gsap.context(() => {
      gsap.from('[data-m]', { yPercent: 105, duration: 1.3, stagger: 0.06, delay, ease: 'expo.out', scrollTrigger: trigger ? { trigger: ref.current, start: 'top 88%' } : undefined })
    }, ref)
    return () => ctx.revert()
  }, [delay, trigger, text])
  return (
    <Tag ref={ref as never} className={className} aria-label={text}>
      {text.split(' ').map((w, i) => (
        <span key={i} aria-hidden className="inline-block overflow-hidden pb-[0.16em] -mb-[0.08em] align-bottom"><span data-m className="inline-block">{w}&nbsp;</span></span>
      ))}
    </Tag>
  )
}

/** Fotografía editorial: se descubre de abajo arriba y hace un zoom lento con el scroll. */
export function Photo({ src, alt, className = '', cursor, speed = 0.1, reveal = true, children }: { src: string; alt: string; className?: string; cursor?: string; speed?: number; reveal?: boolean; children?: ReactNode }) {
  const box = useRef<HTMLDivElement>(null)
  const img = useRef<HTMLImageElement>(null)
  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const ctx = gsap.context(() => {
      if (reveal) gsap.from(box.current, { clipPath: 'inset(100% 0% 0% 0%)', duration: 1.5, ease: 'expo.inOut', scrollTrigger: { trigger: box.current, start: 'top 90%' } })
      gsap.fromTo(img.current, { yPercent: -speed * 100, scale: 1.12 + speed }, { yPercent: speed * 100, scale: 1.02, ease: 'none', scrollTrigger: { trigger: box.current, start: 'top bottom', end: 'bottom top', scrub: true } })
    }, box)
    return () => ctx.revert()
  }, [speed, reveal])
  return (
    <div ref={box} data-cursor={cursor} className={`group relative overflow-hidden bg-lino ${className}`}>
      <img ref={img} src={src} alt={alt} loading="lazy" decoding="async" className="h-full w-full object-cover transition-[filter] duration-700 group-hover:brightness-[1.05]" />
      {children}
    </div>
  )
}

/** Línea de puntada que se "cose" al entrar en pantalla. */
export function Stitch({ className = '' }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const ctx = gsap.context(() => {
      gsap.from(ref.current, { clipPath: 'inset(0 100% 0 0)', duration: 1.6, ease: 'power2.inOut', scrollTrigger: { trigger: ref.current, start: 'top 92%' } })
    }, ref)
    return () => ctx.revert()
  }, [])
  return <div ref={ref} aria-hidden className={`stitch w-full ${className}`} />
}

export function Rise({ children, className = '', delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const ctx = gsap.context(() => { gsap.from(ref.current, { y: 40, opacity: 0, duration: 1.2, delay, ease: 'expo.out', scrollTrigger: { trigger: ref.current, start: 'top 92%' } }) }, ref)
    return () => ctx.revert()
  }, [delay])
  return <div ref={ref} className={className}>{children}</div>
}

/** Botón con atracción magnética sutil (manejada por el cursor global). */
export function Magnetic({ children, className = '', ...p }: { children: ReactNode; className?: string } & React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  return <a data-magnetic className={className} {...p}>{children}</a>
}
