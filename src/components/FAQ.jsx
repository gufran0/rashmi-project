import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const faqs = [
  {
    q: 'What does a consultation include?',
    a: 'A consultation is a focused session where you share the facts of your matter, discuss risks, and receive guidance on available legal avenues. This session provides general legal counsel; formal lawyer–client representation is established through separate engagement.',
  },
  {
    q: 'Is my matter kept strictly confidential?',
    a: 'Yes. All disclosures and communications are governed by professional standards of advocate confidentiality. Nothing is shared with third parties.',
  },
  {
    q: 'Do you represent both individuals and companies?',
    a: 'Yes. Services are available to private individuals managing personal or property disputes, as well as corporate enterprises requiring commercial, compliance, and dispute counsel.',
  },
  {
    q: 'What should I prepare for the consultation?',
    a: 'It is helpful to have key documents organized beforehand — contracts, notices, orders, or correspondence — ensuring the session is focused and constructive.',
  },
  {
    q: 'How do I book a consultation?',
    a: 'You may book directly by writing to rashmi.counselandcare@gmail.com or by filling in the contact form below. A convenient slot will be confirmed promptly.',
  },
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null)
  const sectionRef = useRef(null)
  const headingRef = useRef(null)

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
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const toggle = (i) => setOpenIndex(openIndex === i ? null : i)

  return (
    <section id="faq" ref={sectionRef} className="bg-[#0c0e0b] py-28 lg:py-36 border-b border-white/[0.08]">
      <div className="max-w-4xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="mb-16" ref={headingRef}>
          <div className="flex items-center gap-3 mb-6">
            <span className="w-8 h-px bg-gold" />
            <span className="text-gold text-xs uppercase tracking-[0.2em] font-sans font-medium">
              Common Questions
            </span>
          </div>
          <h2 className="font-serif text-heading text-ivory leading-tight font-normal">
            Frequently Asked Questions
          </h2>
        </div>

        {/* Minimalist Hairline Accordion */}
        <div className="divide-y divide-white/[0.08] border-y border-white/[0.08]">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i
            return (
              <div key={i} className="py-6">
                <button
                  id={`faq-btn-${i}`}
                  className="w-full flex items-baseline justify-between text-left cursor-pointer group"
                  onClick={() => toggle(i)}
                  aria-expanded={isOpen}
                >
                  <span className="font-serif text-ivory text-lg sm:text-xl font-normal group-hover:text-gold transition-colors pr-6">
                    {faq.q}
                  </span>
                  <span className="text-gold/60 text-sm font-mono flex-shrink-0 transition-transform">
                    {isOpen ? '—' : '+'}
                  </span>
                </button>
                <div className={`faq-answer ${isOpen ? 'open' : ''}`}>
                  <p className="font-sans text-ivory/60 text-sm sm:text-base leading-relaxed pt-4 font-light">
                    {faq.a}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
