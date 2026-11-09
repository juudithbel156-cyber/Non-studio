import { useEffect, useRef, type ReactNode, type MouseEvent } from 'react'
import { gsap } from '../hooks/smoothScroll'
import { LOGO } from '../assets/images'

/** Logotipo original de la marca (naranja). En fondos oscuros se aclara con un filtro. */
export function Logo({ light = false, className = 'h-8' }: { light?: boolean; className?: string }) {
  return <img src={LOGO} alt="Hêbê by Clau, centre mèdic d'estètica" className={`w-auto ${className}`} style={light ? { filter: 'brightness(0) invert(1)' } : undefined} />
}

/** Botón píldora con círculo de icono (gira al pasar el ratón). */
export function Pill({ children, href, onClick, tone = 'naranja', target, className = '' }: {
  children: ReactNode; href?: string; onClick?: (e: MouseEvent) => void; tone?: 'naranja' | 'blanco' | 'tinta'; target?: string; className?: string
}) {
  const dot = tone === 'naranja' ? 'bg-white text-naranja' : tone === 'blanco' ? 'bg-naranja text-white' : 'bg-white text-tinta'
  const inner = (
    <>
      <span>{children}</span>
      <span className={`pill-dot ${dot}`} aria-hidden>
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </span>
    </>
  )
  const cls = `group pill pill-${tone} ${className}`
  return href ? (
    <a href={href} target={target} rel={target ? 'noopener noreferrer' : undefined} onClick={onClick} data-magnetic className={cls}>{inner}</a>
  ) : (
    <button type="button" onClick={onClick} data-magnetic className={cls}>{inner}</button>
  )
}

/** Texto partido en letras para animarlas. */
export function Letters({ text, className = '' }: { text: string; className?: string }) {
  return (
    <span className={className} aria-label={text}>
      {text.split(' ').map((w, i) => (
        <span key={i} aria-hidden className="inline-block whitespace-nowrap">
          {[...w].map((ch, j) => (
            <span key={j} className="inline-block overflow-hidden pb-[0.1em] align-bottom"><span data-letter className="inline-block">{ch}</span></span>
          ))}
          {' '}
        </span>
      ))}
    </span>
  )
}

/** Frase que se "enciende" palabra a palabra al hacer scroll. */
export function ScrubWords({ text, className = '' }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null)
  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const ctx = gsap.context(() => {
      gsap.fromTo('[data-w]', { opacity: 0.15 }, { opacity: 1, stagger: 0.1, ease: 'none', scrollTrigger: { trigger: ref.current, start: 'top 75%', end: 'bottom 40%', scrub: true } })
    }, ref)
    return () => ctx.revert()
  }, [text])
  return <p ref={ref} className={className}>{text.split(' ').map((w, i) => <span key={i} data-w>{w} </span>)}</p>
}

/** Imagen con descubrimiento por máscara y movimiento interior al hacer scroll. */
export function Photo({ src, alt, className = '', imgClass = 'object-cover', cursor, speed = 0.1, reveal = true }: { src: string; alt: string; className?: string; imgClass?: string; cursor?: string; speed?: number; reveal?: boolean }) {
  const box = useRef<HTMLDivElement>(null)
  const img = useRef<HTMLImageElement>(null)
  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const ctx = gsap.context(() => {
      if (reveal) gsap.from(box.current, { clipPath: 'inset(100% 0% 0% 0%)', duration: 1.3, ease: 'expo.inOut', scrollTrigger: { trigger: box.current, start: 'top 88%' } })
      gsap.fromTo(img.current, { yPercent: -speed * 100, scale: 1 + speed * 2 }, { yPercent: speed * 100, ease: 'none', scrollTrigger: { trigger: box.current, start: 'top bottom', end: 'bottom top', scrub: true } })
    }, box)
    return () => ctx.revert()
  }, [speed, reveal])
  return (
    <div ref={box} data-cursor={cursor} className={`group relative overflow-hidden ${className}`}>
      <img ref={img} src={src} alt={alt} loading="lazy" decoding="async" className={`h-full w-full transition-[filter] duration-700 group-hover:saturate-[1.15] ${imgClass}`} />
    </div>
  )
}

/** Aparición al entrar en pantalla, visible por defecto. */
export function Rise({ children, className = '', delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const ctx = gsap.context(() => {
      gsap.from(ref.current, { y: 50, opacity: 0, duration: 1.2, delay, ease: 'expo.out', scrollTrigger: { trigger: ref.current, start: 'top 92%' } })
    }, ref)
    return () => ctx.revert()
  }, [delay])
  return <div ref={ref} className={className}>{children}</div>
}

export const TONE: Record<string, { bg: string; fg: string }> = {
  naranja: { bg: 'bg-naranja', fg: 'text-white' },
  orquidea: { bg: 'bg-orquidea', fg: 'text-white' },
  melocoton: { bg: 'bg-melocoton', fg: 'text-tinta' },
  bosque: { bg: 'bg-bosque', fg: 'text-white' },
}
