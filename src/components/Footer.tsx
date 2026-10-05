import { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';

export function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setTimeout(() => {
      setEmail('');
      setSubscribed(false);
    }, 4000);
  };

  return (
    <footer className="bg-[#181615] text-[#FAF8F5] border-t border-[#292522]">
      {/* Upper Newsletter & Brand Invitation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 border-b border-[#2C2926]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6">
            <span className="text-xs uppercase tracking-[0.25em] text-[#C2B7A3] mb-2 block font-medium">
              Private Invitations
            </span>
            <h3 className="text-2xl sm:text-3xl font-serif font-normal text-[#FAF8F5] mb-3">
              Subscribe to Private Collection Previews
            </h3>
            <p className="text-xs sm:text-sm text-[#A89F91] font-light leading-relaxed max-w-lg">
              Receive private invitations to limited-edition seasonal releases, runway debuts, and personal bespoke appointments with our Paris couturières.
            </p>
          </div>

          <div className="lg:col-span-6">
            {subscribed ? (
              <div className="p-4 bg-[#23201D] border border-[#3E3832] flex items-center gap-3 text-xs text-[#EAE4D9]">
                <Check className="w-4 h-4 text-[#D4AF37]" />
                <span>Merci. Your invitation will arrive prior to the next seasonal salon preview.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  required
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 bg-[#23201D] border border-[#3E3832] px-4 py-3 text-xs text-[#FAF8F5] placeholder:text-[#7A7369] focus:outline-none focus:border-[#C2B7A3]"
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-[#FAF8F5] text-[#181615] text-xs uppercase tracking-widest font-medium hover:bg-[#EAE4D8] transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Request Access</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Main Links & Locations Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-2 md:grid-cols-4 gap-10 text-xs">
        {/* Brand Column */}
        <div className="col-span-2 md:col-span-1">
          <p className="font-serif text-xl tracking-widest uppercase text-[#FAF8F5] mb-4">
            Atelier Vélène
          </p>
          <p className="text-[#968E82] leading-relaxed mb-4 font-light">
            Haute couture and luxury ready-to-wear dresses crafted from certified organic silks, Italian virgin wools, and Belgian flax linen.
          </p>
          <p className="text-[11px] text-[#7A7369] font-mono">
            Paris · New York · Milan
          </p>
        </div>

        {/* Silhouettes */}
        <div>
          <h4 className="uppercase tracking-[0.2em] text-[#C2B7A3] font-medium mb-4">
            Silhouettes
          </h4>
          <ul className="space-y-2.5 text-[#9E968A] font-light">
            <li><a href="#collection-section" className="hover:text-white transition-colors">Evening & Black Tie</a></li>
            <li><a href="#collection-section" className="hover:text-white transition-colors">Mulberry Silk Slips</a></li>
            <li><a href="#collection-section" className="hover:text-white transition-colors">Resort Washed Linen</a></li>
            <li><a href="#collection-section" className="hover:text-white transition-colors">Sculptural Cocktail</a></li>
            <li><a href="#collection-section" className="hover:text-white transition-colors">Bespoke Column Gowns</a></li>
          </ul>
        </div>

        {/* Maison & Services */}
        <div>
          <h4 className="uppercase tracking-[0.2em] text-[#C2B7A3] font-medium mb-4">
            Atelier Services
          </h4>
          <ul className="space-y-2.5 text-[#9E968A] font-light">
            <li><span className="hover:text-white transition-colors cursor-pointer">Bespoke Hem Adjustments</span></li>
            <li><span className="hover:text-white transition-colors cursor-pointer">Textile Provenance Guide</span></li>
            <li><span className="hover:text-white transition-colors cursor-pointer">Private Salon Fittings</span></li>
            <li><span className="hover:text-white transition-colors cursor-pointer">Silk & Chiffon Preservation</span></li>
            <li><span className="hover:text-white transition-colors cursor-pointer">Atelier Care & Repair</span></li>
          </ul>
        </div>

        {/* Salons */}
        <div>
          <h4 className="uppercase tracking-[0.2em] text-[#C2B7A3] font-medium mb-4">
            Private Salons
          </h4>
          <div className="space-y-4 text-[#9E968A] font-light">
            <div>
              <p className="text-white font-medium">Paris Salon</p>
              <p>18 Place Vendôme, 75001 Paris</p>
              <p className="text-[11px] text-[#7A7369]">By appointment only</p>
            </div>
            <div>
              <p className="text-white font-medium">New York Salon</p>
              <p>680 Madison Avenue, New York, NY</p>
              <p className="text-[11px] text-[#7A7369]">Tuesday – Saturday</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quiet Bottom Legal Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 border-t border-[#292522] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#787166]">
        <p>© 2026 Atelier Vélène S.A. All rights reserved.</p>
        <div className="flex items-center gap-6">
          <span className="hover:text-[#A89F91] cursor-pointer">Privacy Policy</span>
          <span className="hover:text-[#A89F91] cursor-pointer">Terms of Maison</span>
          <span className="hover:text-[#A89F91] cursor-pointer">Ethical Sourcing Manifest</span>
        </div>
      </div>
    </footer>
  );
}
