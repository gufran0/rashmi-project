import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const values = [
  {
    num: '01',
    title: 'Confidential',
    desc: 'Your matter stays strictly between us with complete professional discretion and legal privilege.',
  },
  {
    num: '02',
    title: 'Client Focused',
    desc: 'Your objectives and commercial priorities shape every strategic step and recommendation.',
  },
  {
    num: '03',
    title: 'Practical Solutions',
    desc: 'Advice grounded in practical legal reality, structured for workable and cost-effective resolutions.',
  },
  {
    num: '04',
    title: 'Result Oriented',
    desc: 'Every legal intervention is purposeful, proactive and directed toward your desired goal.',
  },
]

export default function About() {
  const sectionRef = useRef(null)
  const headingRef = useRef(null)
  const listRef = useRef(null)

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
        listRef.current?.querySelectorAll('.value-row'),
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power2.out',
          stagger: 0.1,
          scrollTrigger: { trigger: listRef.current, start: 'top 85%', once: true },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="about" ref={sectionRef} className="bg-[#0c0e0b] py-28 lg:py-36 border-b border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-12 gap-16 lg:gap-20 items-start">
          {/* Left Column */}
          <div className="lg:col-span-5" ref={headingRef}>
            <div className="flex items-center gap-3 mb-6">
              <span className="w-8 h-px bg-gold" />
              <span className="text-gold text-xs uppercase tracking-[0.2em] font-sans font-medium">
                About the Practice
              </span>
            </div>
            <h2 className="font-serif text-heading text-ivory leading-[1.12] mb-8 font-normal tracking-tight">
              Legal counsel that is clear, confidential and practical
            </h2>
            <div className="space-y-6 text-ivory/65 font-sans text-base leading-relaxed font-light">
              <p>
                Adv. Rashmi Pathak — Legal Services provides focused advocacy and advisory for individuals and corporate entities navigating personal disputes, transactional obligations, or regulatory challenges.
              </p>
              <p className="border-l border-gold pl-5 text-sm text-ivory/80 italic font-serif">
                "Trusted Advice | Practical Solutions | Confidential & Professional"
              </p>
            </div>
          </div>

          {/* Right Column — Minimalist Hairline List */}
          <div ref={listRef} className="lg:col-span-7 divide-y divide-white/[0.08] border-y border-white/[0.08]">
            {values.map((v) => (
              <div
                key={v.title}
                className="value-row py-8 group transition-colors duration-200"
              >
                <div className="grid sm:grid-cols-12 gap-4 items-baseline">
                  <div className="sm:col-span-2">
                    <span className="font-serif text-xs text-gold/60 font-light">
                      {v.num}
                    </span>
                  </div>
                  <div className="sm:col-span-4">
                    <h3 className="font-serif text-ivory text-xl font-normal group-hover:text-gold transition-colors">
                      {v.title}
                    </h3>
                  </div>
                  <div className="sm:col-span-6">
                    <p className="font-sans text-ivory/55 text-sm leading-relaxed font-light">
                      {v.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
