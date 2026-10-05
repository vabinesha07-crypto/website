import { useState } from 'react';
import { Heart, Eye, ShoppingBag, Check } from 'lucide-react';
import { DressProduct, Currency } from '../types';
import { formatPrice } from '../utils/formatters';

interface ProductCardProps {
  product: DressProduct;
  currency: Currency;
  isWishlisted: boolean;
  onToggleWishlist: (product: DressProduct) => void;
  onQuickView: (product: DressProduct) => void;
  onQuickAdd: (product: DressProduct, size: 'XS' | 'S' | 'M' | 'L' | 'XL', colorName: string) => void;
}

export function ProductCard({
  product,
  currency,
  isWishlisted,
  onToggleWishlist,
  onQuickView,
  onQuickAdd,
}: ProductCardProps) {
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState<'XS' | 'S' | 'M' | 'L' | 'XL'>(product.sizes[1] || 'S');
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    onQuickAdd(product, selectedSize, selectedColor.name);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1800);
  };

  return (
    <article 
      onClick={() => onQuickView(product)}
      className="group relative flex flex-col bg-[#FAF9F5] border border-[#ECE7DE] hover:border-[#D6CFBE] transition-all duration-300 cursor-pointer overflow-hidden"
    >
      {/* Visual Slot Container (3:4 ratio for editorial fashion elegance) */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#F0ECE1]">
        {/* Fallback container */}
        {(!imageLoaded || imageError) && (
          <div className="absolute inset-0 bg-gradient-to-b from-[#EBE6DC] to-[#DDD7CB] flex flex-col items-center justify-center p-6 text-center">
            <span className="font-serif text-lg text-[#524B43] tracking-wider uppercase mb-1">
              {product.name}
            </span>
            <span className="text-[11px] text-[#7A7267] uppercase tracking-widest">
              {product.silhouette}
            </span>
          </div>
        )}

        {!imageError && (
          <img
            src={product.image}
            alt={`${product.name} - ${product.fabric}`}
            referrerPolicy="no-referrer"
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
            className={`w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          />
        )}

        {/* Quiet Top Row: Edition Tag & Wishlist Button */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
          {product.badge ? (
            <span className="text-[10px] uppercase tracking-wider font-semibold text-[#181615] bg-[#FAF8F5]/95 backdrop-blur-sm px-2.5 py-1 border border-[#E0D9CC]/70">
              {product.badge}
            </span>
          ) : (
            <div />
          )}

          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleWishlist(product);
            }}
            className={`p-2 rounded-full backdrop-blur-md transition-colors ${
              isWishlisted
                ? 'bg-[#8E3A42] text-white'
                : 'bg-[#FAF8F5]/90 text-[#3D3833] hover:text-[#181615] hover:bg-white'
            }`}
            aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          >
            <Heart className={`w-3.5 h-3.5 ${isWishlisted ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* Hover Quick Action Drawer */}
        <div className="absolute inset-x-3 bottom-3 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200 z-10 flex flex-col gap-2">
          {/* Quick Size Picker */}
          <div 
            onClick={(e) => e.stopPropagation()} 
            className="flex items-center justify-center gap-1.5 p-1 bg-[#FAF8F5]/95 backdrop-blur-md border border-[#DCD6C9]"
          >
            {product.sizes.map((sz) => (
              <button
                key={sz}
                onClick={() => setSelectedSize(sz)}
                className={`text-[11px] font-medium w-6 h-6 flex items-center justify-center transition-colors ${
                  selectedSize === sz
                    ? 'bg-[#181615] text-white'
                    : 'text-[#59524A] hover:bg-[#EBE5D9]'
                }`}
              >
                {sz}
              </button>
            ))}
          </div>

          {/* Quick Add Button */}
          <button
            onClick={handleQuickAdd}
            disabled={justAdded}
            className={`w-full py-2.5 px-4 text-xs font-medium tracking-wider uppercase flex items-center justify-center gap-2 transition-all ${
              justAdded
                ? 'bg-[#29523D] text-white'
                : 'bg-[#181615] text-[#FAF8F5] hover:bg-[#2C2926]'
            }`}
          >
            {justAdded ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Added to Bag</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Quick Add · {selectedSize}</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Product Information Module */}
      <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between bg-white">
        <div>
          {/* Unboxed metadata with typographic separators */}
          <div className="flex items-center gap-1.5 text-[11px] uppercase tracking-wider text-[#8A8175] mb-1.5">
            <span>{product.categoryLabel}</span>
            <span aria-hidden="true">·</span>
            <span>{product.length}</span>
          </div>

          {/* Product Name */}
          <h2 className="text-base font-serif font-medium text-[#1A1816] tracking-wide mb-1 group-hover:text-[#423C35] transition-colors line-clamp-1">
            {product.name}
          </h2>

          {/* Fabric Line */}
          <p className="text-xs text-[#70685E] font-light line-clamp-1 mb-3">
            {product.fabric}
          </p>
        </div>

        {/* Bottom Section: Color Swatches & Tabular Price */}
        <div className="pt-3 border-t border-[#F0ECE1] flex items-center justify-between gap-2">
          {/* Color Swatches */}
          <div 
            onClick={(e) => e.stopPropagation()} 
            className="flex items-center gap-1.5"
            aria-label="Available colors"
          >
            {product.colors.map((color) => (
              <button
                key={color.name}
                onClick={() => setSelectedColor(color)}
                style={{ backgroundColor: color.hex }}
                className={`w-3.5 h-3.5 rounded-full border transition-all ${
                  selectedColor.name === color.name
                    ? 'ring-2 ring-offset-1 ring-[#181615] scale-110'
                    : 'border-[#CCC5B8] opacity-80 hover:opacity-100'
                }`}
                title={color.name}
                aria-label={`Select color ${color.name}`}
              />
            ))}
            <span className="text-[10px] text-[#8C8376] ml-1 font-mono">
              {product.colors.length} {product.colors.length === 1 ? 'hue' : 'hues'}
            </span>
          </div>

          {/* Tabular Price Display */}
          <div className="flex items-baseline gap-2 tabular-nums">
            {product.originalPrice && (
              <span className="text-xs text-[#A39A8D] line-through font-mono">
                {formatPrice(product.originalPrice, currency)}
              </span>
            )}
            <span className="text-sm font-semibold text-[#181615] font-mono">
              {formatPrice(product.price, currency)}
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}
