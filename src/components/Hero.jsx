import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

const headlineWords = ['Your', 'Legal', 'Partner', 'for', 'Real', 'Solutions']

const coreValues = ['Confidential', 'Client Focused', 'Practical Solutions', 'Result Oriented']

export default function Hero() {
  const sectionRef = useRef(null)
  const headlineRef = useRef(null)
  const sublineRef = useRef(null)
  const ctaRef = useRef(null)
  const valuesRef = useRef(null)
  const portraitRef = useRef(null)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) {
      gsap.set(
        [
          headlineRef.current?.querySelectorAll('.word-inner'),
          sublineRef.current,
          ctaRef.current,
          valuesRef.current,
          portraitRef.current,
        ],
        { opacity: 1, y: 0, scale: 1 }
      )
      return
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.2 })

      tl.to(headlineRef.current?.querySelectorAll('.word-inner'), {
        y: 0,
        opacity: 1,
        duration: 0.9,
        ease: 'power3.out',
        stagger: 0.08,
      })
        .fromTo(
          sublineRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, ease: 'power2.out' },
          '-=0.4'
        )
        .fromTo(
          ctaRef.current,
          { y: 15, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' },
          '-=0.3'
        )
        .fromTo(
          valuesRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.8, ease: 'power2.out' },
          '-=0.2'
        )
        .fromTo(
          portraitRef.current,
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 1.1, ease: 'power2.out' },
          '-=0.8'
        )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative min-h-[92vh] bg-[#0c0e0b] flex items-center pt-32 pb-20 lg:pt-40 lg:pb-28"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 w-full">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column (7 cols) */}
          <div className="lg:col-span-7 flex flex-col">
            {/* Minimalist Kicker */}
            <div className="flex items-center gap-3 mb-8">
              <span className="w-8 h-px bg-gold" />
              <span className="text-gold text-xs uppercase tracking-[0.25em] font-sans font-medium">
                Advocate &bull; Legal Counsel
              </span>
            </div>

            {/* Headline */}
            <h1
              ref={headlineRef}
              className="font-serif text-display text-ivory leading-[1.06] mb-8 font-normal tracking-[-0.025em]"
              aria-label="Your Legal Partner for Real Solutions"
            >
              {headlineWords.map((word, i) => (
                <span
                  key={i}
                  className="word-wrap mr-[0.24em] last:mr-0 inline-block overflow-hidden align-top"
                >
                  <span className="word-inner inline-block">
                    {word}
                  </span>
                </span>
              ))}
            </h1>

            {/* Subline */}
            <p
              ref={sublineRef}
              className="font-sans text-ivory/65 text-lg sm:text-xl font-light leading-relaxed mb-10 max-w-lg"
              style={{ opacity: 0 }}
            >
              Protecting your rights. Supporting your growth.
            </p>

            {/* Actions */}
            <div ref={ctaRef} className="flex flex-wrap items-center gap-6 mb-16" style={{ opacity: 0 }}>
              <a
                href="#consultation"
                id="hero-book-btn"
                className="btn-gold"
                onClick={(e) => {
                  e.preventDefault()
                  document.querySelector('#consultation')?.scrollIntoView({ behavior: 'smooth' })
                }}
              >
                Book a Consultation
              </a>
              <a
                href="#services"
                id="hero-services-btn"
                className="text-ivory/70 hover:text-gold text-xs uppercase tracking-[0.16em] font-medium transition-colors flex items-center gap-2 group"
                onClick={(e) => {
                  e.preventDefault()
                  document.querySelector('#services')?.scrollIntoView({ behavior: 'smooth' })
                }}
              >
                <span>Explore Services</span>
                <span className="transition-transform group-hover:translate-x-1">&rarr;</span>
              </a>
            </div>

            {/* Minimal Values Strip */}
            <div
              ref={valuesRef}
              className="pt-8 border-t border-white/[0.08] flex flex-wrap items-center gap-x-8 gap-y-3"
              style={{ opacity: 0 }}
            >
              {coreValues.map((val) => (
                <span key={val} className="text-ivory/45 text-xs uppercase tracking-[0.18em] font-sans">
                  &bull; {val}
                </span>
              ))}
            </div>
          </div>

          {/* Right Column (5 cols) — Minimal Portrait */}
          <div className="lg:col-span-5 relative flex justify-center lg:justify-end" ref={portraitRef} style={{ opacity: 0 }}>
            <div className="relative max-w-[400px] w-full">
              <div className="overflow-hidden border border-white/[0.1] bg-[#141713]">
                <img
                  src="/rashmi-portrait.jpg"
                  alt="Adv. Rashmi Pathak — Legal Services"
                  className="w-full h-[520px] object-cover object-top transition-transform duration-700 hover:scale-[1.02]"
                />
              </div>
              <div className="mt-4 flex items-center justify-between text-xs font-sans text-ivory/40">
                <span className="tracking-widest uppercase">Adv. Rashmi Pathak</span>
                <span className="text-gold/80 uppercase tracking-widest">Legal Practice</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
