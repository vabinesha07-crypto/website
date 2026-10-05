import { Check, Heart } from 'lucide-react';

interface ToastProps {
  message: string | null;
  type?: 'cart' | 'wishlist';
}

export function Toast({ message, type = 'cart' }: ToastProps) {
  if (!message) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-3 duration-300 pointer-events-none">
      <div className="bg-[#181615] text-[#FAF8F5] px-4 py-3 shadow-2xl border border-[#3A3530] flex items-center gap-3 text-xs tracking-wide">
        {type === 'wishlist' ? (
          <Heart className="w-4 h-4 text-[#D4AF37] fill-current" />
        ) : (
          <Check className="w-4 h-4 text-[#D4AF37]" />
        )}
        <span className="font-light">{message}</span>
      </div>
    </div>
  );
}
