const items = [
  'Litigation & Trial Advocacy',
  'Precise Legal Drafting',
  'White Collar Crime Advisory',
  'Corporate Law & Compliance',
  'Absolute Confidentiality',
  'Dispute Resolution',
]

export default function MarqueeStrip() {
  return (
    <div
      className="border-y border-white/[0.08] py-4 overflow-hidden select-none bg-[#0c0e0b]"
      aria-hidden="true"
    >
      <div className="marquee-track flex items-center">
        {Array(2).fill(null).map((_, groupIdx) => (
          <div key={groupIdx} className="flex items-center shrink-0">
            {items.map((item, idx) => (
              <div key={idx} className="flex items-center mx-8">
                <span className="font-sans text-xs tracking-[0.2em] text-ivory/50 uppercase whitespace-nowrap">
                  {item}
                </span>
                <span className="text-gold/50 text-[0.65rem] ml-8">&bull;</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
