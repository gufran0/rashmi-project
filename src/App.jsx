import { useEffect } from 'react'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import MarqueeStrip from './components/MarqueeStrip'
import About from './components/About'
import Services from './components/Services'
import PracticeAreas from './components/PracticeAreas'
import HowItWorks from './components/HowItWorks'
import ConsultationCard from './components/ConsultationCard'
import FAQ from './components/FAQ'
import Contact from './components/Contact'
import Footer from './components/Footer'

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  useEffect(() => {
    // ─── Lenis smooth scroll ────────────────────────────────────────────
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })

    lenis.on('scroll', ScrollTrigger.update)

    const raf = (time) => {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    gsap.ticker.lagSmoothing(0)

    // ─── Scroll Progress Bar ────────────────────────────────────────────
    const progressBar = document.getElementById('scroll-progress')
    ScrollTrigger.create({
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => {
        gsap.set(progressBar, { scaleX: self.progress })
      },
    })

    return () => {
      lenis.destroy()
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, [])

  return (
    <>
      <div id="scroll-progress" aria-hidden="true" />
      <Navbar />
      <main>
        <Hero />
        <MarqueeStrip />
        <About />
        <Services />
        <PracticeAreas />
        <HowItWorks />
        <ConsultationCard />
        <Contact />
        <FAQ />
      </main>
      <Footer />
    </>
  )
}
