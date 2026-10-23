import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function ConsultationCard() {
  const sectionRef = useRef(null)
  const contentRef = useRef(null)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: { trigger: contentRef.current, start: 'top 80%', once: true },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const handleBookViaEmail = (e) => {
    e.preventDefault()
    const subject = encodeURIComponent('Booking Enquiry: Legal Advice Conference (₹2,000)')
    const body = encodeURIComponent(
      `Hello Adv. Rashmi Pathak,\n\nI would like to schedule a Legal Advice Conference (₹2,000).\n\nDetails:\n- Name: \n- Preferred Date/Time: \n- Matter Description: \n\nPlease confirm availability.\n\nThank you.`
    )
    window.location.href = `mailto:rashmi.counselandcare@gmail.com?subject=${subject}&body=${body}`
  }

  return (
    <section id="consultation" ref={sectionRef} className="bg-[#0c0e0b] py-28 lg:py-36 border-b border-white/[0.08]">
      <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center" ref={contentRef}>
        <div className="flex items-center justify-center gap-3 mb-6">
          <span className="w-8 h-px bg-gold" />
          <span className="text-gold text-xs uppercase tracking-[0.2em] font-sans font-medium">
            Direct Consultation
          </span>
          <span className="w-8 h-px bg-gold" />
        </div>

        <h2 className="font-serif text-display-sm text-ivory mb-4 font-normal tracking-tight">
          Legal Advice Conference
        </h2>

        <p className="font-sans text-gold text-2xl font-light mb-6 tracking-wide">
          ₹2,000 <span className="text-ivory/40 text-sm font-normal">per consultation</span>
        </p>

        <p className="font-sans text-ivory/60 text-base leading-relaxed mb-10 max-w-xl mx-auto font-light">
          A dedicated, confidential session to examine the specifics of your matter and review practical legal options. Advice provided is general legal counsel; formal engagement is confirmed separately.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-8">
          <button
            id="consultation-email-btn"
            onClick={handleBookViaEmail}
            className="btn-gold w-full sm:w-auto"
          >
            Book via Email
          </button>
          <a
            href="#contact"
            id="consultation-form-btn"
            onClick={(e) => {
              e.preventDefault()
              document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
            }}
            className="text-ivory/70 hover:text-gold text-xs uppercase tracking-[0.16em] font-medium transition-colors flex items-center gap-2 group"
          >
            <span>Or Submit Inquiry Form</span>
            <span className="transition-transform group-hover:translate-x-1">&rarr;</span>
          </a>
        </div>

        <p className="text-ivory/30 text-xs tracking-wider font-mono">
          rashmi.counselandcare@gmail.com
        </p>
      </div>
    </section>
  )
}
