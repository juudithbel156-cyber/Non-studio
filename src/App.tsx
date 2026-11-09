import { useEffect } from 'react'
import { MotionConfig } from 'framer-motion'
import { I18nProvider } from './i18n/I18n'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { Hero } from './sections/Hero'
import { Store } from './sections/Store'
import { Team } from './sections/Team'
import { Toys } from './sections/Toys'
import { Brands } from './sections/Brands'
import { News } from './sections/News'
import { Services } from './sections/Services'
import { Contact } from './sections/Contact'
import { initSmoothScroll, ScrollTrigger } from './hooks/smoothScroll'
import { usePrefersReducedMotion } from './hooks/env'

export default function App() {
  const reduced = usePrefersReducedMotion()
  useEffect(() => initSmoothScroll(reduced), [reduced])
  useEffect(() => {
    document.fonts?.ready.then(() => ScrollTrigger.refresh())
  }, [])

  return (
    <I18nProvider>
      <MotionConfig reducedMotion="user">
        <a href="#tienda" className="sr-only z-[100] rounded-full bg-amarillo px-4 py-2 font-bold focus:not-sr-only focus:fixed focus:left-4 focus:top-4">Saltar al contenido</a>
        <Header />
        <main>
          <Hero />
          <Store />
          <Team />
          <Toys />
          <Brands />
          <News />
          <Services />
          <Contact />
        </main>
        <Footer />
      </MotionConfig>
    </I18nProvider>
  )
}
