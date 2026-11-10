import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

let lenis: Lenis | null = null

export function initSmoothScroll(reduced: boolean) {
  if (reduced || lenis) return () => {}
  lenis = new Lenis({ duration: 1.15, smoothWheel: true })
  lenis.on('scroll', ScrollTrigger.update)
  const tick = (time: number) => lenis?.raf(time * 1000)
  gsap.ticker.add(tick)
  gsap.ticker.lagSmoothing(0)
  return () => {
    gsap.ticker.remove(tick)
    lenis?.destroy()
    lenis = null
  }
}

/** Desplazamiento suave a un ancla (#id) o a un número de píxeles. */
export function scrollToTarget(target: string | number) {
  const offset = -20
  if (lenis) {
    lenis.scrollTo(target as string, { offset: typeof target === 'number' ? 0 : offset, duration: 1.4 })
    return
  }
  if (typeof target === 'number') window.scrollTo({ top: target, behavior: 'smooth' })
  else {
    const el = document.querySelector(target)
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY + offset, behavior: 'smooth' })
  }
}

export function stopScroll(stop: boolean) {
  if (!lenis) return
  if (stop) lenis.stop()
  else lenis.start()
}

export { gsap, ScrollTrigger }

export function scrollTopNow() {
  if (lenis) lenis.scrollTo(0, { immediate: true })
  else window.scrollTo(0, 0)
}
