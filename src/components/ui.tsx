import { useEffect, useRef, type ReactNode } from 'react'
import { gsap } from '../hooks/smoothScroll'
import { useI18n } from '../i18n/I18n'

/** Logotipo tipográfico (PENDIENTE: sustituir por el logotipo oficial si existe en vector). */
export function Wordmark({ className = '', size = 'md' }: { className?: string; size?: 'md' | 'xl' }) {
  return (
    <span className={`inline-flex items-baseline gap-2 font-serif leading-none ${className}`}>
      <span className={size === 'xl' ? 'text-[clamp(5rem,22vw,22rem)] tracking-[-0.03em]' : 'text-[28px] tracking-[-0.01em]'}>Hêbê</span>
      <span className={size === 'xl' ? 'font-sans text-[clamp(1rem,2vw,1.6rem)] font-light' : 'font-sans text-[13px] font-light'}>by Clau</span>
    </span>
  )
}

/** Divide un texto en letras (agrupadas por palabras) para animarlas. */
export function Letters({ text, className = '' }: { text: string; className?: string }) {
  return (
    <span className={className} aria-label={text}>
      {text.split(' ').map((w, i) => (
        <span key={i} aria-hidden className="inline-block whitespace-nowrap">
          {[...w].map((ch, j) => (
            <span key={j} className="inline-block overflow-hidden pb-[0.08em] align-bottom">
              <span data-letter className="inline-block will-change-transform">{ch}</span>
            </span>
          ))}
          {' '}
        </span>
      ))}
    </span>
  )
}

/** Imagen editorial con revelado por máscara y parallax interior. */
export function Shot({ src, alt, className = '', cursor, reveal = 'up', speed = 0.12, children }: { src: string; alt: string; className?: string; cursor?: string; reveal?: 'up' | 'left' | 'none'; speed?: number; children?: ReactNode }) {
  const box = useRef<HTMLDivElement>(null)
  const img = useRef<HTMLImageElement>(null)
  const { t } = useI18n()
  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const ctx = gsap.context(() => {
      if (reveal !== 'none') {
        gsap.fromTo(box.current, { clipPath: reveal === 'left' ? 'inset(0% 100% 0% 0%)' : 'inset(100% 0% 0% 0%)' },
          { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.4, ease: 'expo.inOut', scrollTrigger: { trigger: box.current, start: 'top 85%' } })
      }
      gsap.fromTo(img.current, { yPercent: -speed * 100, scale: 1.18 }, { yPercent: speed * 100, scale: 1.08, ease: 'none', scrollTrigger: { trigger: box.current, start: 'top bottom', end: 'bottom top', scrub: true } })
    }, box)
    return () => ctx.revert()
  }, [reveal, speed])
  return (
    <div ref={box} data-cursor={cursor} className={`group relative overflow-hidden bg-beige ${className}`}>
      <img ref={img} src={src} alt={alt} loading="lazy" decoding="async" className="h-full w-full object-cover transition-[filter] duration-700 group-hover:brightness-[1.04]" />
      <span className="provisional">{t.img}</span>
      {children}
    </div>
  )
}

/** Texto que aparece palabra a palabra al hacer scroll (scrub). */
export function ScrubWords({ text, className = '' }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null)
  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const ctx = gsap.context(() => {
      gsap.fromTo('[data-w]', { opacity: 0.14 }, { opacity: 1, stagger: 0.08, ease: 'none', scrollTrigger: { trigger: ref.current, start: 'top 80%', end: 'bottom 45%', scrub: true } })
    }, ref)
    return () => ctx.revert()
  }, [text])
  return <p ref={ref} className={className}>{text.split(' ').map((w, i) => <span key={i} data-w>{w} </span>)}</p>
}

/** Aparición sobria al entrar en pantalla (visible por defecto si no hay JS/animación). */
export function Rise({ children, className = '', delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const ctx = gsap.context(() => {
      gsap.from(ref.current, { y: 40, opacity: 0, duration: 1.2, delay, ease: 'expo.out', scrollTrigger: { trigger: ref.current, start: 'top 90%' } })
    }, ref)
    return () => ctx.revert()
  }, [delay])
  return <div ref={ref} className={className}>{children}</div>
}
