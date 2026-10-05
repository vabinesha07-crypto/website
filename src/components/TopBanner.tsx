import { useState } from 'react';
import { X, Sparkles } from 'lucide-react';

export function TopBanner() {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <aside 
      aria-label="Atelier announcement"
      className="bg-[#1C1A18] text-[#F3EFEA] text-xs py-2 px-4 transition-all duration-300 relative border-b border-[#2C2926]"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex-1 flex items-center justify-center gap-2 text-center tracking-wide">
          <Sparkles className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
          <span className="font-light">
            Complimentary bespoke hem adjustments & worldwide express delivery on all atelier orders
          </span>
          <span className="hidden md:inline text-[#A69F94] font-normal">· Handcrafted in limited editions</span>
        </div>
        <button
          onClick={() => setDismissed(true)}
          className="text-[#968F85] hover:text-white transition-colors p-1 -mr-1"
          aria-label="Dismiss banner"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </aside>
  );
}
