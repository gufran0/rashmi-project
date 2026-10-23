import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const MATTER_TYPES = [
  'Litigation / Court Representation',
  'Drafting / Agreement Review',
  'White Collar Crime / Investigation Advisory',
  'Corporate Law / Regulatory Compliance',
  'General Legal Advice',
  'Other Legal Matter',
]

export default function Contact() {
  const sectionRef = useRef(null)
  const headingRef = useRef(null)
  const formRef = useRef(null)

  const [form, setForm] = useState({
    name: '',
    clientType: 'Individual',
    matterType: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [copied, setCopied] = useState(false)

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
        formRef.current,
        { y: 25, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          delay: 0.1,
          scrollTrigger: { trigger: formRef.current, start: 'top 80%', once: true },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const subject = encodeURIComponent(`Legal Consultation Enquiry - ${form.name}`)
    const body = encodeURIComponent(
      `Hello Adv. Rashmi Pathak,\n\nI would like to initiate a legal consultation.\n\nClient Name: ${form.name}\nClient Type: ${form.clientType}\nMatter: ${form.matterType || 'General Enquiry'}\n\nSummary:\n${form.message}\n\nRegards,\n${form.name}`
    )
    window.location.href = `mailto:rashmi.counselandcare@gmail.com?subject=${subject}&body=${body}`
    setSubmitted(true)
  }

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('rashmi.counselandcare@gmail.com')
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
  }

  return (
    <section id="contact" ref={sectionRef} className="bg-[#0c0e0b] py-28 lg:py-36 border-b border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-12 gap-16 lg:gap-20 items-start">
          {/* Left Column — Minimalist Inquiry Details */}
          <div ref={headingRef} className="lg:col-span-5">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-8 h-px bg-gold" />
              <span className="text-gold text-xs uppercase tracking-[0.2em] font-sans font-medium">
                Confidential Inquiry
              </span>
            </div>
            <h2 className="font-serif text-heading text-ivory leading-tight font-normal mb-6">
              Let's discuss your legal matter
            </h2>
            <p className="font-sans text-ivory/60 text-base leading-relaxed mb-10 font-light">
              Reach out directly to outline your situation. Inquiries are reviewed confidentially, and guidance on consultation scheduling will be provided promptly.
            </p>

            <div className="pt-8 border-t border-white/[0.08] space-y-4">
              <p className="text-xs uppercase tracking-[0.16em] text-gold font-medium font-sans">
                Direct Email
              </p>
              <a
                href="mailto:rashmi.counselandcare@gmail.com"
                id="contact-email-link"
                className="font-serif text-xl sm:text-2xl text-ivory hover:text-gold transition-colors break-all block font-normal"
              >
                rashmi.counselandcare@gmail.com
              </a>
              <button
                type="button"
                onClick={handleCopyEmail}
                className="text-xs uppercase tracking-[0.14em] text-ivory/40 hover:text-gold transition-colors cursor-pointer block pt-2"
              >
                {copied ? '✓ Copied to clipboard' : 'Copy address'}
              </button>
            </div>
          </div>

          {/* Right Column — Minimal Form with Underline Inputs */}
          <div ref={formRef} className="lg:col-span-7">
            {submitted ? (
              <div className="py-12 border-t border-white/[0.08]">
                <h3 className="font-serif text-ivory text-2xl mb-3 font-normal">Email Prepared</h3>
                <p className="font-sans text-ivory/60 text-sm leading-relaxed max-w-md mb-8 font-light">
                  Your email client has opened with your inquiry pre-filled. Please send the email to deliver your message.
                </p>
                <button
                  type="button"
                  className="btn-outline text-xs"
                  onClick={() => setSubmitted(false)}
                >
                  Fill Another Message
                </button>
              </div>
            ) : (
              <form
                id="contact-form"
                onSubmit={handleSubmit}
                className="space-y-8"
              >
                <div>
                  <label htmlFor="contact-name" className="block text-xs uppercase tracking-[0.16em] text-ivory/45 mb-2 font-sans font-medium">
                    Full Name *
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    required
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Your Name"
                    className="minimal-input"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-[0.16em] text-ivory/45 mb-4 font-sans font-medium">
                    Client Representation *
                  </label>
                  <div className="flex gap-8">
                    {['Individual', 'Company'].map((type) => (
                      <label
                        key={type}
                        className="flex items-center gap-2 cursor-pointer text-sm font-sans"
                      >
                        <input
                          id={`client-type-${type.toLowerCase()}`}
                          type="radio"
                          name="clientType"
                          value={type}
                          checked={form.clientType === type}
                          onChange={handleChange}
                          className="accent-gold"
                        />
                        <span className={form.clientType === type ? 'text-ivory' : 'text-ivory/50'}>
                          {type}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label htmlFor="contact-matter" className="block text-xs uppercase tracking-[0.16em] text-ivory/45 mb-2 font-sans font-medium">
                    Matter Category
                  </label>
                  <select
                    id="contact-matter"
                    name="matterType"
                    value={form.matterType}
                    onChange={handleChange}
                    className="minimal-input appearance-none bg-transparent cursor-pointer"
                  >
                    <option value="" className="bg-[#0c0e0b] text-ivory/50">Select category (optional)</option>
                    {MATTER_TYPES.map((m) => (
                      <option key={m} value={m} className="bg-[#141713] text-ivory">
                        {m}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="contact-message" className="block text-xs uppercase tracking-[0.16em] text-ivory/45 mb-2 font-sans font-medium">
                    Summary of Matter *
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    required
                    rows={4}
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Briefly describe the key facts or questions you wish to discuss..."
                    className="minimal-input resize-none"
                  />
                </div>

                <div className="pt-4">
                  <button
                    id="contact-submit-btn"
                    type="submit"
                    className="btn-gold"
                  >
                    Send via Email &rarr;
                  </button>
                </div>

                <p className="text-ivory/35 text-xs font-light">
                  Submitting generates an email draft with your inputs for transmission to the chamber.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
