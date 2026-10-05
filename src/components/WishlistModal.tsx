import { X, Trash2, ShoppingBag } from 'lucide-react';
import { DressProduct, Currency } from '../types';
import { formatPrice } from '../utils/formatters';

interface WishlistModalProps {
  isOpen: boolean;
  onClose: () => void;
  wishlist: DressProduct[];
  currency: Currency;
  onRemoveFromWishlist: (product: DressProduct) => void;
  onQuickView: (product: DressProduct) => void;
  onMoveToBag: (product: DressProduct) => void;
}

export function WishlistModal({
  isOpen,
  onClose,
  wishlist,
  currency,
  onRemoveFromWishlist,
  onQuickView,
  onMoveToBag,
}: WishlistModalProps) {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div 
        onClick={(e) => e.stopPropagation()}
        className="bg-white w-full max-w-2xl border border-[#E0D8CB] shadow-2xl p-6 sm:p-8 max-h-[85vh] overflow-y-auto my-auto"
      >
        <div className="flex items-center justify-between pb-4 border-b border-[#E8E2D5] mb-6">
          <div>
            <div className="text-xs uppercase tracking-[0.2em] text-[#8C8477] font-medium">
              Curated Silhouettes
            </div>
            <h2 className="text-2xl font-serif text-[#181615]">
              Saved Dresses ({wishlist.length})
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#736B60] hover:text-[#181615] rounded-full hover:bg-[#F2EDE4]"
            aria-label="Close saved items"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {wishlist.length === 0 ? (
          <div className="py-16 text-center">
            <p className="font-serif text-xl text-[#181615] mb-2">No Saved Silhouettes</p>
            <p className="text-xs text-[#736B60] max-w-xs mx-auto mb-6">
              Click the heart icon on any dress in the collection to save your favorite pieces for your upcoming event.
            </p>
            <button
              onClick={onClose}
              className="px-6 py-2.5 bg-[#181615] text-[#FAF8F5] text-xs uppercase tracking-widest font-medium hover:bg-[#2C2926]"
            >
              Browse Dresses
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {wishlist.map((item) => (
              <div 
                key={item.id}
                className="flex items-center gap-4 p-3 border border-[#E8E2D5] hover:border-[#CCC5B8] transition-all"
              >
                <div 
                  onClick={() => {
                    onClose();
                    onQuickView(item);
                  }}
                  className="w-16 h-22 bg-[#EDE8DE] shrink-0 overflow-hidden cursor-pointer"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <span className="text-[10px] uppercase tracking-wider text-[#8A8173]">
                    {item.categoryLabel} · {item.length}
                  </span>
                  <h4 
                    onClick={() => {
                      onClose();
                      onQuickView(item);
                    }}
                    className="font-serif text-sm font-medium text-[#181615] hover:underline cursor-pointer truncate"
                  >
                    {item.name}
                  </h4>
                  <p className="text-xs text-[#736B60] truncate">{item.fabric}</p>
                  <p className="font-mono text-xs font-semibold text-[#181615] tabular-nums mt-1">
                    {formatPrice(item.price, currency)}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      onMoveToBag(item);
                    }}
                    className="px-3 py-2 bg-[#181615] text-[#FAF8F5] text-xs uppercase tracking-wider font-medium hover:bg-[#2C2926] flex items-center gap-1.5"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Add to Bag</span>
                  </button>

                  <button
                    onClick={() => onRemoveFromWishlist(item)}
                    className="p-2 text-[#9E9588] hover:text-[#8E3A42] transition-colors"
                    aria-label={`Remove ${item.name} from saved items`}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
