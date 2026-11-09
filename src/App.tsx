import { useEffect } from 'react'
import { I18nProvider } from './i18n/I18n'
import { RouterProvider, useRouter } from './router'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { Cursor } from './components/Cursor'
import { Hero } from './sections/Hero'
import { Treatments } from './sections/Treatments'
import { Manifesto } from './sections/Manifesto'
import { Results } from './sections/Results'
import { Team } from './sections/Team'
import { Center } from './sections/Center'
import { CategoryPage } from './pages/CategoryPage'
import { initSmoothScroll, ScrollTrigger } from './hooks/smoothScroll'
import { usePrefersReducedMotion } from './hooks/env'

function Pages() {
  const { route } = useRouter()
  return (
    <main>
      {route.page === 'home' ? (
        <>
          <Hero />
          <Treatments />
          <Manifesto />
          <Results />
          <Team />
          <Center />
        </>
      ) : (
        <CategoryPage id={route.id} />
      )}
    </main>
  )
}

export default function App() {
  const reduced = usePrefersReducedMotion()
  useEffect(() => initSmoothScroll(reduced), [reduced])
  useEffect(() => { document.fonts?.ready.then(() => ScrollTrigger.refresh()) }, [])
  return (
    <I18nProvider>
      <RouterProvider>
        <Header />
        <Pages />
        <Footer />
        <Cursor />
      </RouterProvider>
    </I18nProvider>
  )
}
