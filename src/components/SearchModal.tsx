import { useState, useMemo } from 'react';
import { Search, X, ArrowRight } from 'lucide-react';
import { DressProduct, Currency } from '../types';
import { formatPrice } from '../utils/formatters';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: DressProduct[];
  currency: Currency;
  onSelectProduct: (product: DressProduct) => void;
}

export function SearchModal({
  isOpen,
  onClose,
  products,
  currency,
  onSelectProduct,
}: SearchModalProps) {
  if (!isOpen) return null;

  const [query, setQuery] = useState('');

  const suggestions = ['Mulberry Silk', 'Evening Gown', 'Belgian Linen', 'Black Tie', 'Velvet'];

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.fabric.toLowerCase().includes(q) ||
        p.silhouette.toLowerCase().includes(q) ||
        p.categoryLabel.toLowerCase().includes(q)
    );
  }, [products, query]);

  const handleSelect = (p: DressProduct) => {
    onSelectProduct(p);
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-start justify-center p-4 pt-16 sm:pt-24"
      onClick={onClose}
    >
      <div 
        onClick={(e) => e.stopPropagation()}
        className="bg-white w-full max-w-2xl border border-[#E0D8CB] shadow-2xl p-6 sm:p-8"
      >
        <div className="flex items-center justify-between pb-4 border-b border-[#ECE7DD] mb-6">
          <div className="flex items-center gap-3 flex-1">
            <Search className="w-5 h-5 text-[#8A8173]" />
            <input
              type="text"
              autoFocus
              placeholder="Search by silhouette, fabric, or occasion..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full text-base sm:text-lg font-serif text-[#181615] placeholder:text-[#A89F93] focus:outline-none"
            />
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#736B60] hover:text-[#181615] rounded-full hover:bg-[#F2EDE4]"
            aria-label="Close search"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Suggestions */}
        <div className="flex items-center gap-2 flex-wrap mb-6">
          <span className="text-xs uppercase tracking-wider text-[#8A8173] font-medium mr-1">
            Explore:
          </span>
          {suggestions.map((sug) => (
            <button
              key={sug}
              onClick={() => setQuery(sug)}
              className="text-xs px-2.5 py-1 bg-[#FAF9F5] border border-[#E2DDD3] text-[#544D44] hover:border-[#181615] hover:text-[#181615] transition-colors"
            >
              {sug}
            </button>
          ))}
        </div>

        {/* Results */}
        <div className="max-h-[50vh] overflow-y-auto space-y-3">
          {query.trim() === '' ? (
            <p className="text-xs text-[#8A8173] text-center py-8">
              Type keywords such as &ldquo;silk&rdquo;, &ldquo;gown&rdquo;, or &ldquo;linen&rdquo; to explore.
            </p>
          ) : results.length === 0 ? (
            <p className="text-xs text-[#8A8173] text-center py-8">
              No silhouettes found matching &ldquo;{query}&rdquo;.
            </p>
          ) : (
            results.map((product) => (
              <div
                key={product.id}
                onClick={() => handleSelect(product)}
                className="flex items-center gap-4 p-3 hover:bg-[#FAF9F5] border border-transparent hover:border-[#E8E2D5] transition-all cursor-pointer group"
              >
                <div className="w-14 h-18 bg-[#EDE8DE] shrink-0 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-[10px] uppercase tracking-wider text-[#8A8173]">
                    {product.categoryLabel}
                  </span>
                  <h4 className="font-serif text-sm text-[#181615] group-hover:text-[#453F39] truncate">
                    {product.name}
                  </h4>
                  <p className="text-xs text-[#736B60] truncate">{product.fabric}</p>
                </div>
                <div className="text-right">
                  <span className="font-mono text-sm font-semibold text-[#181615] tabular-nums">
                    {formatPrice(product.price, currency)}
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#8A8173] group-hover:translate-x-1 transition-transform ml-auto mt-1" />
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
