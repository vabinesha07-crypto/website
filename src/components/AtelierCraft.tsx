import { ATELIER_PILLARS } from '../data/products';

export function AtelierCraft() {
  return (
    <section id="craft-section" className="py-20 sm:py-28 bg-[#F4F1EA] border-y border-[#E2DBD0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mb-16">
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#8C8477] mb-3 font-medium">
            <span>Maison Philosophy</span>
            <span aria-hidden="true">·</span>
            <span>Parisian Atelier</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif text-[#181615] tracking-tight leading-[1.15] mb-6">
            Sartorial Precision in Every Stitch.
          </h2>
          <p className="text-base text-[#5E574D] font-light leading-relaxed">
            Our atelier was founded on a singular conviction: that a dress should sculpt without restriction, flowing naturally with the movement and breath of the woman wearing it.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {ATELIER_PILLARS.map((pillar) => (
            <div 
              key={pillar.number}
              className="bg-white p-7 border border-[#E4DDD2] flex flex-col justify-between"
            >
              <div>
                <span className="text-xs font-mono text-[#A1988B] block mb-4">
                  {pillar.number}
                </span>
                <h3 className="font-serif text-lg text-[#181615] mb-2 font-medium">
                  {pillar.title}
                </h3>
                <p className="text-xs text-[#6B6357] leading-relaxed font-light">
                  {pillar.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Editorial Statement */}
        <div className="bg-[#181615] text-[#FAF8F5] p-8 sm:p-12 lg:p-16 border border-[#2E2B27] flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
          <div className="max-w-2xl">
            <blockquote className="font-serif text-xl sm:text-2xl lg:text-3xl text-[#FAF8F5] font-light italic leading-snug mb-4">
              &ldquo;A dress should not simply be worn; it must elevate every gesture, every turn, and every room you enter.&rdquo;
            </blockquote>
            <p className="text-xs uppercase tracking-[0.2em] text-[#B8AF9F]">
              Éléonore Vélène · Head Couturière & Founder
            </p>
          </div>
          <div className="text-xs text-[#A89F90] border-l lg:border-l border-[#3D3833] pl-6 max-w-xs font-light">
            <p className="mb-2">Private atelier fitting salons available by appointment:</p>
            <p className="text-[#FAF8F5] font-medium font-serif text-sm">Place Vendôme, Paris</p>
            <p className="text-[#FAF8F5] font-medium font-serif text-sm">Madison Avenue, New York</p>
          </div>
        </div>
      </div>
    </section>
  );
}
