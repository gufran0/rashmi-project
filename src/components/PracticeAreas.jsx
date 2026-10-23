import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const areas = [
  {
    number: '01',
    title: 'Litigation',
    subtitle: 'Civil, Criminal & Commercial Disputes',
    desc: 'Skilled advocacy across a broad spectrum of dispute resolution proceedings — civil trials, criminal defense, and complex commercial matters.',
  },
  {
    number: '02',
    title: 'Drafting',
    subtitle: 'Contracts & Legal Documentation',
    desc: 'Preparation, vetting and drafting of commercial agreements, deeds, legal notices, and formal legal opinions tailored to protect your interests.',
  },
  {
    number: '03',
    title: 'White Collar Crime',
    subtitle: 'Investigations & Regulatory Defense',
    desc: 'Specialized advisory on financial offenses, regulatory enforcement proceedings, economic audits, and sensitive internal enquiries.',
  },
  {
    number: '04',
    title: 'Corporate Law',
    subtitle: 'Governance, Advisory & Structuring',
    desc: 'End-to-end legal counsel for corporate entities — statutory compliance, corporate restructuring, contractual structuring, and transactions.',
  },
]

export default function PracticeAreas() {
  const sectionRef = useRef(null)
  const headingRef = useRef(null)
  const gridRef = useRef(null)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: { trigger: headingRef.current, start: 'top 85%', once: true },
        }
      )

      gsap.fromTo(
        gridRef.current?.querySelectorAll('.area-col'),
        { y: 25, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: 'power2.out',
          stagger: 0.1,
          scrollTrigger: { trigger: gridRef.current, start: 'top 80%', once: true },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="practice-areas" ref={sectionRef} className="bg-[#0c0e0b] py-28 lg:py-36 border-b border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="max-w-2xl mb-20" ref={headingRef}>
          <div className="flex items-center gap-3 mb-6">
            <span className="w-8 h-px bg-gold" />
            <span className="text-gold text-xs uppercase tracking-[0.2em] font-sans font-medium">
              Core Competencies
            </span>
          </div>
          <h2 className="font-serif text-heading text-ivory leading-tight font-normal mb-4">
            Key Areas of Practice
          </h2>
          <p className="font-sans text-ivory/60 text-base leading-relaxed font-light">
            Focused legal expertise tailored to resolve critical matters for private clients and corporate organizations.
          </p>
        </div>

        {/* Minimalist 4-Column Grid */}
        <div ref={gridRef} className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {areas.map((area) => (
            <div
              key={area.number}
              className="area-col pt-6 border-t border-white/[0.1] flex flex-col justify-between group"
            >
              <div>
                <span className="font-serif text-gold/60 text-xs block mb-4 font-light">
                  {area.number}
                </span>

                <h3 className="font-serif text-ivory text-2xl font-normal mb-2 group-hover:text-gold transition-colors">
                  {area.title}
                </h3>
                <p className="font-sans text-gold/75 text-[0.72rem] uppercase tracking-wider mb-4 font-medium">
                  {area.subtitle}
                </p>
                <p className="font-sans text-ivory/55 text-sm leading-relaxed font-light">
                  {area.desc}
                </p>
              </div>

              <div className="mt-8 pt-4 flex items-center text-xs text-ivory/30 group-hover:text-gold transition-colors font-medium">
                <span>Inquire</span>
                <span className="ml-2">&rarr;</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
