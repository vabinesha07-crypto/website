import { useState } from 'react';
import { ArrowRight, Sparkles, ShieldCheck, Ruler } from 'lucide-react';
import { HERO_IMAGE } from '../data/products';

interface HeroProps {
  onExplore: () => void;
  onOpenSizeGuide: () => void;
}

export function Hero({ onExplore, onOpenSizeGuide }: HeroProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  return (
    <section className="relative overflow-hidden bg-[#181615] text-[#FAF8F5]">
      {/* Editorial Split Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 min-h-[640px] lg:min-h-[720px] items-stretch">
        {/* Left Column: Brand Prose & Campaign Direction */}
        <div className="lg:col-span-5 flex flex-col justify-between p-8 sm:p-12 lg:p-16 z-10 order-2 lg:order-1">
          <div>
            {/* Quiet 1-line text kicker without pill badges */}
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#C2B7A3] mb-6">
              <span>Collection Édition 2026</span>
              <span aria-hidden="true">·</span>
              <span>Paris & Como</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-normal tracking-tight text-[#FAF8F5] leading-[1.1] mb-6 text-balance">
              Fluid Silhouettes Draped in Quiet Splendor.
            </h1>

            <p className="text-base sm:text-lg text-[#C7C0B5] font-light leading-relaxed max-w-xl mb-8">
              Meticulously patterned ready-to-wear and couture evening dresses. 
              Cut from pure 22-momme Mulberry silk, Italian virgin wool crepe, and hand-finished Belgian linen.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-10">
              <button
                onClick={onExplore}
                className="inline-flex items-center justify-center gap-3 px-7 py-3.5 bg-[#FAF8F5] text-[#181615] text-xs uppercase font-medium tracking-[0.16em] hover:bg-[#EAE4D9] transition-all duration-200 group cursor-pointer"
              >
                <span>Explore The Silhouettes</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                onClick={onOpenSizeGuide}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 border border-[#4A453F] text-[#FAF8F5] text-xs uppercase font-medium tracking-[0.16em] hover:border-[#8E8478] hover:bg-white/5 transition-all duration-200 cursor-pointer"
              >
                <Ruler className="w-3.5 h-3.5 text-[#C2B7A3]" />
                <span>Atelier Fit Guide</span>
              </button>
            </div>
          </div>

          {/* Adjacency Trust Indicators */}
          <div className="pt-8 border-t border-[#312C28] grid grid-cols-2 gap-6 text-xs text-[#A89F91]">
            <div className="flex items-start gap-2.5">
              <Sparkles className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
              <div>
                <p className="text-[#FAF8F5] font-medium tracking-wide">Bespoke Hemming</p>
                <p className="text-[11px] text-[#8C8376] mt-0.5">Custom tailoring included on every order</p>
              </div>
            </div>
            <div className="flex items-start gap-2.5">
              <ShieldCheck className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
              <div>
                <p className="text-[#FAF8F5] font-medium tracking-wide">30-Day Atelier Return</p>
                <p className="text-[11px] text-[#8C8376] mt-0.5">Complimentary insured return pickup</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Hero High Fashion Imagery */}
        <div className="lg:col-span-7 relative min-h-[420px] lg:min-h-full order-1 lg:order-2 overflow-hidden bg-[#24211E]">
          {/* Zero-broken-image fallback container */}
          {(!imageLoaded || imageError) && (
            <div className="absolute inset-0 bg-gradient-to-tr from-[#1B1917] via-[#2A2623] to-[#38332E] flex flex-col items-center justify-center p-8 text-center">
              <span className="font-serif text-2xl text-[#E8E2D5] tracking-widest uppercase mb-2">
                Atelier Vélène
              </span>
              <span className="text-xs text-[#9E9589] tracking-wider uppercase">
                Haute Couture Silhouettes
              </span>
            </div>
          )}

          {!imageError && (
            <img
              src={HERO_IMAGE}
              alt="Editorial campaign model wearing an evening silk dress in an architectural Parisian salon"
              referrerPolicy="no-referrer"
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageError(true)}
              className={`w-full h-full object-cover object-center lg:object-top transition-all duration-700 ${
                imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
              }`}
            />
          )}

          {/* Measured scrim to ensure WCAG AA contrast for editorial watermark badge */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#181615] via-transparent to-transparent lg:hidden" />
          
          {/* Subtle editorial photo caption */}
          <div className="absolute bottom-6 right-6 hidden sm:block bg-[#181615]/80 backdrop-blur-md px-4 py-2 text-[11px] text-[#C2B7A3] border border-[#3A3530]/60 tracking-wider uppercase">
            <span>Look 01 · The Sculpted Emerald Satin Gown</span>
          </div>
        </div>
      </div>
    </section>
  );
}
