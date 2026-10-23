import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const servicesData = {
  individuals: [
    { title: 'Legal Representation & Litigation', desc: 'Courtroom advocacy and skilled representation across civil, criminal and commercial disputes.' },
    { title: 'Drafting & Review of Agreements', desc: 'Preparation, scrutiny and legal review of contracts, deeds and protective agreements.' },
    { title: 'White Collar Crime Matters', desc: 'Strategic advisory and defense representation for financial crimes and economic allegations.' },
    { title: 'Advisory on Criminal & Regulatory Investigations', desc: 'Confidential counsel during active investigation proceedings, notices and depositions.' },
    { title: 'Dispute Resolution', desc: 'Pragmatic negotiation and dispute mitigation strategies before matters escalate to trial.' },
    { title: 'General Legal Advice', desc: 'Clear, direct and actionable counsel on private, property and regulatory concerns.' },
  ],
  companies: [
    { title: 'Corporate Law Advisory', desc: 'Strategic guidance on corporate law, internal resolutions and governance standards.' },
    { title: 'Contract Drafting & Negotiation', desc: 'Structuring and negotiating critical commercial vendor, partner and shareholder agreements.' },
    { title: 'White Collar Crime & Internal Investigations', desc: 'Corporate risk auditing, financial fraud enquiries and internal investigations.' },
    { title: 'Regulatory Compliance Support', desc: 'Helping enterprises maintain statutory compliance across regional and national frameworks.' },
    { title: 'Commercial Disputes & Litigation', desc: 'Representation and defense in commercial litigation, tribunals and dispute forums.' },
    { title: 'Governance & Transaction Support', desc: 'Advisory on structural reorganizations, contract risks and corporate operations.' },
  ],
}

export default function Services() {
  const [active, setActive] = useState('individuals')
  const sectionRef = useRef(null)
  const headingRef = useRef(null)
  const listRef = useRef(null)

  const animateList = () => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const items = listRef.current?.querySelectorAll('.service-row')
    if (!items) return
    gsap.fromTo(
      items,
      { y: 12, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.4, ease: 'power2.out', stagger: 0.05 }
    )
  }

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

      ScrollTrigger.create({
        trigger: listRef.current,
        start: 'top 80%',
        once: true,
        onEnter: animateList,
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const handleTabSwitch = (tab) => {
    setActive(tab)
    requestAnimationFrame(animateList)
  }

  const items = servicesData[active]

  return (
    <section id="services" ref={sectionRef} className="bg-[#0c0e0b] py-28 lg:py-36 border-b border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div ref={headingRef}>
            <div className="flex items-center gap-3 mb-6">
              <span className="w-8 h-px bg-gold" />
              <span className="text-gold text-xs uppercase tracking-[0.2em] font-sans font-medium">
                Scope of Services
              </span>
            </div>
            <h2 className="font-serif text-heading text-ivory leading-tight font-normal">
              Comprehensive Legal Services
            </h2>
          </div>

          {/* Minimalist Switcher */}
          <div className="flex items-center gap-6 border-b border-white/[0.1] pb-2 self-start md:self-auto">
            <button
              id="tab-individuals"
              className={`text-xs uppercase tracking-[0.16em] font-medium pb-2 transition-all cursor-pointer relative ${
                active === 'individuals'
                  ? 'text-gold'
                  : 'text-ivory/45 hover:text-ivory'
              }`}
              onClick={() => handleTabSwitch('individuals')}
            >
              For Individuals
              {active === 'individuals' && (
                <span className="absolute -bottom-2.5 left-0 right-0 h-px bg-gold" />
              )}
            </button>
            <button
              id="tab-companies"
              className={`text-xs uppercase tracking-[0.16em] font-medium pb-2 transition-all cursor-pointer relative ${
                active === 'companies'
                  ? 'text-gold'
                  : 'text-ivory/45 hover:text-ivory'
              }`}
              onClick={() => handleTabSwitch('companies')}
            >
              For Companies
              {active === 'companies' && (
                <span className="absolute -bottom-2.5 left-0 right-0 h-px bg-gold" />
              )}
            </button>
          </div>
        </div>

        {/* Minimalist Hairline Service Rows */}
        <div ref={listRef} className="divide-y divide-white/[0.08] border-y border-white/[0.08]">
          {items.map((item, i) => (
            <div
              key={`${active}-${i}`}
              className="service-row py-8 group transition-colors duration-200"
            >
              <div className="grid md:grid-cols-12 gap-4 items-baseline">
                <div className="md:col-span-1">
                  <span className="font-serif text-xs text-gold/60">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
                <div className="md:col-span-4">
                  <h3 className="font-serif text-ivory text-xl font-normal group-hover:text-gold transition-colors">
                    {item.title}
                  </h3>
                </div>
                <div className="md:col-span-6">
                  <p className="font-sans text-ivory/55 text-sm leading-relaxed font-light">
                    {item.desc}
                  </p>
                </div>
                <div className="md:col-span-1 text-right hidden md:block">
                  <span className="text-gold/30 group-hover:text-gold transition-colors text-sm">&rarr;</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
