import { useCallback, useEffect, useState } from 'react'
import { MotionConfig } from 'framer-motion'
import { CartProvider } from './store/cart'
import { Loader } from './components/Loader'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { Bag } from './components/Bag'
import { Cursor } from './components/Cursor'
import { Hero } from './sections/Hero'
import { Collection } from './sections/Collection'
import { Arrivals } from './sections/Arrivals'
import { World } from './sections/World'
import { Lookbook } from './sections/Lookbook'
import { Visit } from './sections/Visit'
import { Instagram } from './sections/Instagram'
import { initSmoothScroll, ScrollTrigger } from './hooks/smoothScroll'
import { usePrefersReducedMotion } from './hooks/env'

export default function App() {
  const reduced = usePrefersReducedMotion()
  const [ready, setReady] = useState(false)
  const [pick, setPick] = useState<string | null>(null)
  const done = useCallback(() => setReady(true), [])
  useEffect(() => initSmoothScroll(reduced), [reduced])
  useEffect(() => { document.fonts?.ready.then(() => ScrollTrigger.refresh()) }, [])
  return (
    <MotionConfig reducedMotion="user">
      <CartProvider>
        <Loader onDone={done} />
        <a href="#coleccion" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[300] focus:rounded-full focus:bg-negro focus:px-4 focus:py-2 focus:text-hueso">Saltar al contenido</a>
        <Header />
        <main>
          <Hero ready={ready} />
          <Collection onPick={setPick} />
          <Arrivals pick={pick} setPick={setPick} />
          <World />
          <Lookbook />
          <Visit />
          <Instagram />
        </main>
        <Footer />
        <Bag />
        <Cursor />
      </CartProvider>
    </MotionConfig>
  )
}
