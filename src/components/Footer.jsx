const links = [
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Practice Areas', href: '#practice-areas' },
  { label: 'Process', href: '#how-it-works' },
  { label: 'Consultation', href: '#consultation' },
  { label: 'Contact', href: '#contact' },
]

export default function Footer() {
  const handleNavClick = (e, href) => {
    e.preventDefault()
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer className="bg-[#0c0e0b] text-ivory/60">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-20 lg:py-28">
        <div className="grid md:grid-cols-12 gap-12 mb-20 items-baseline">
          {/* Brand */}
          <div className="md:col-span-6">
            <h3 className="font-serif text-ivory text-2xl font-normal tracking-tight mb-2">
              Adv. Rashmi Pathak
            </h3>
            <p className="text-gold text-xs uppercase tracking-[0.2em] font-sans font-medium mb-6">
              Legal Services
            </p>
            <p className="font-serif italic text-ivory/60 text-sm max-w-sm font-light">
              "Trusted Advice | Practical Solutions | Confidential & Professional"
            </p>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-3">
            <p className="text-xs uppercase tracking-[0.16em] text-ivory/40 font-medium mb-6">
              Navigation
            </p>
            <ul className="space-y-3">
              {links.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="text-xs uppercase tracking-[0.14em] text-ivory/60 hover:text-gold transition-colors inline-block"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="md:col-span-3">
            <p className="text-xs uppercase tracking-[0.16em] text-ivory/40 font-medium mb-6">
              Inquiry
            </p>
            <a
              href="mailto:rashmi.counselandcare@gmail.com"
              className="text-sm text-ivory hover:text-gold transition-colors break-all block mb-3 font-light"
            >
              rashmi.counselandcare@gmail.com
            </a>
            <span className="text-xs text-ivory/30">
              General legal advisory
            </span>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="pt-8 border-t border-white/[0.08] mb-12">
          <p className="text-xs text-ivory/35 leading-relaxed max-w-3xl font-light">
            <strong className="text-ivory/50 font-normal">Bar Council Notice:</strong> The rules of the Bar Council of India prohibit advocates from advertising or soliciting work. The contents of this website are intended solely to provide general information at the request of the visitor. Transmission or receipt of information does not create a lawyer–client relationship.
          </p>
        </div>

        {/* Copyright */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-ivory/30 font-light">
          <p>&copy; {new Date().getFullYear()} Adv. Rashmi Pathak &bull; Legal Services. All rights reserved.</p>
          <p className="text-gold/50">Confidential &bull; Professional &bull; Practical</p>
        </div>
      </div>
    </footer>
  )
}
