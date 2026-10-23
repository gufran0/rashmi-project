import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const steps = [
  {
    number: '01',
    title: 'Book a Consultation',
    desc: '₹2,000 per consultation. Reach out directly via email or through the contact form to schedule an appointment.',
  },
  {
    number: '02',
    title: 'Share Your Matter Confidentially',
    desc: 'Your situation is evaluated under complete professional discretion. All disclosures and records remain strictly private.',
  },
  {
    number: '03',
    title: 'Receive Clear Advice & Next Steps',
    desc: 'Receive direct legal guidance, a candid evaluation of risk, and a well-defined roadmap on your options.',
  },
]

export default function HowItWorks() {
  const sectionRef = useRef(null)
  const headingRef = useRef(null)
  const stepsRef = useRef(null)

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
        stepsRef.current?.querySelectorAll('.step-col'),
        { y: 25, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: 'power2.out',
          stagger: 0.12,
          scrollTrigger: { trigger: stepsRef.current, start: 'top 80%', once: true },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="how-it-works" ref={sectionRef} className="bg-[#0c0e0b] py-28 lg:py-36 border-b border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="max-w-2xl mb-20" ref={headingRef}>
          <div className="flex items-center gap-3 mb-6">
            <span className="w-8 h-px bg-gold" />
            <span className="text-gold text-xs uppercase tracking-[0.2em] font-sans font-medium">
              Engagement Process
            </span>
          </div>
          <h2 className="font-serif text-heading text-ivory leading-tight font-normal mb-4">
            How It Works
          </h2>
          <p className="font-sans text-ivory/60 text-base leading-relaxed font-light">
            A straightforward, three-step structure to secure prompt legal counsel.
          </p>
        </div>

        {/* Minimalist 3 Columns */}
        <div ref={stepsRef} className="grid md:grid-cols-3 gap-12 lg:gap-16">
          {steps.map((step) => (
            <div key={step.number} className="step-col pt-6 border-t border-white/[0.1] flex flex-col justify-between">
              <div>
                <span className="font-serif text-gold/60 text-xs block mb-6 font-light">
                  Step {step.number}
                </span>

                <h3 className="font-serif text-ivory text-xl font-normal mb-3">
                  {step.title}
                </h3>

                <p className="font-sans text-ivory/55 text-sm leading-relaxed font-light">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
