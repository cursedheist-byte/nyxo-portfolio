import { useCallback, useState } from 'react'
import { AnimatePresence } from 'motion/react'
import AuroraBackground from './components/AuroraBackground'
import Cursor from './components/Cursor'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import Navbar from './components/Navbar'
import About from './components/About'
import Work from './components/Work'
import StyleLab from './components/StyleLab'
import Stack from './components/Stack'
import Process from './components/Process'
import GithubSection from './components/GithubSection'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Preloader from './components/Preloader'
import ScrollProgress from './components/ScrollProgress'
import { useSmoothScroll } from './hooks/useSmoothScroll'

function shouldShowIntro() {
  if (typeof window === 'undefined') return false
  try {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false
    return window.sessionStorage.getItem('nyxo-intro') !== '1'
  } catch {
    return true
  }
}

export default function App() {
  useSmoothScroll()
  const [showIntro, setShowIntro] = useState(shouldShowIntro)

  const finishIntro = useCallback(() => {
    setShowIntro(false)
    try {
      window.sessionStorage.setItem('nyxo-intro', '1')
    } catch {
      // Storage can be blocked in private modes; the intro simply replays.
    }
  }, [])

  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>

      <AuroraBackground />
      <div className="grid-lines" aria-hidden="true" />

      <AnimatePresence>
        {showIntro ? <Preloader onComplete={finishIntro} /> : null}
      </AnimatePresence>

      <Cursor />
      <ScrollProgress />
      <Navbar />

      <main id="main" className="relative z-10">
        <Hero ready={!showIntro} />
        <Marquee />
        <About />
        <Work />
        <StyleLab />
        <Stack />
        <Process />
        <GithubSection />
        <Contact />
      </main>

      <Footer />
      <div className="grain" aria-hidden="true" />
    </>
  )
}
