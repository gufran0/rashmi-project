import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

export default function Navbar() {
  const navRef = useRef(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  const links = [
    { label: 'About', href: '#about' },
    { label: 'Services', href: '#services' },
    { label: 'Practice Areas', href: '#practice-areas' },
    { label: 'Process', href: '#how-it-works' },
    { label: 'Consultation', href: '#consultation' },
    { label: 'Contact', href: '#contact' },
  ]

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    gsap.fromTo(
      navRef.current,
      { y: -30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out' }
    )
  }, [])

  const handleNavClick = (e, href) => {
    e.preventDefault()
    setMenuOpen(false)
    const target = document.querySelector(href)
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <header
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'py-4 bg-[#0c0e0b]/90 backdrop-blur-md border-b border-white/[0.08]'
          : 'py-6 bg-transparent'
      }`}
      style={{ opacity: 0 }}
    >
      <nav className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between">
          {/* Minimal Brand Signature */}
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, '#home')}
            className="flex items-baseline gap-3"
          >
            <span className="font-serif text-ivory text-xl font-normal tracking-tight hover:text-gold transition-colors">
              Adv. Rashmi Pathak
            </span>
            <span className="hidden sm:inline-block text-gold/75 text-[0.65rem] uppercase tracking-[0.2em] font-sans">
              Legal Services
            </span>
          </a>

          {/* Minimal Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-ivory/60 hover:text-ivory text-xs uppercase tracking-[0.14em] font-medium font-sans transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Minimalist Action */}
          <div className="hidden lg:flex items-center">
            <a
              href="#consultation"
              onClick={(e) => handleNavClick(e, '#consultation')}
              className="text-xs uppercase tracking-[0.14em] font-semibold text-gold hover:text-ivory transition-colors flex items-center gap-1.5"
              id="nav-book-btn"
            >
              <span>Consultation &bull; ₹2,000</span>
              <span className="text-sm">&rarr;</span>
            </a>
          </div>

          {/* Mobile Menu Icon */}
          <button
            id="hamburger-btn"
            className="lg:hidden flex flex-col justify-center gap-1.5 p-2 text-ivory/80 cursor-pointer"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <span className={`block w-5 h-px bg-ivory transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block w-5 h-px bg-ivory transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-5 h-px bg-ivory transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          menuOpen ? 'max-h-[380px] opacity-100 border-b border-white/[0.08]' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="bg-[#0c0e0b] px-6 py-6 flex flex-col gap-4">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="text-ivory/70 hover:text-gold text-xs uppercase tracking-[0.15em] font-medium font-sans transition-colors py-2 border-b border-white/[0.04]"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#consultation"
            onClick={(e) => handleNavClick(e, '#consultation')}
            className="btn-gold mt-2 text-center text-xs justify-center"
            id="mobile-book-btn"
          >
            Book Consultation &bull; ₹2,000
          </a>
        </div>
      </div>
    </header>
  )
}
