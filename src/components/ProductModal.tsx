import { useState } from 'react';
import { X, Heart, ShieldCheck, Truck, Sparkles, ChevronDown, Check, Ruler } from 'lucide-react';
import { DressProduct, Currency } from '../types';
import { formatPrice } from '../utils/formatters';

interface ProductModalProps {
  product: DressProduct | null;
  currency: Currency;
  isWishlisted: boolean;
  onClose: () => void;
  onToggleWishlist: (product: DressProduct) => void;
  onAddToCart: (
    product: DressProduct,
    size: 'XS' | 'S' | 'M' | 'L' | 'XL',
    colorName: string,
    bespokeHemming: boolean,
    quantity: number
  ) => void;
  onOpenSizeGuide: () => void;
}

export function ProductModal({
  product,
  currency,
  isWishlisted,
  onClose,
  onToggleWishlist,
  onAddToCart,
  onOpenSizeGuide,
}: ProductModalProps) {
  if (!product) return null;

  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState<'XS' | 'S' | 'M' | 'L' | 'XL'>('S');
  const [bespokeHemming, setBespokeHemming] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'details' | 'fabric' | 'shipping'>('details');
  const [addedSuccess, setAddedSuccess] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleAdd = () => {
    onAddToCart(product, selectedSize, selectedColor.name, bespokeHemming, quantity);
    setAddedSuccess(true);
    setTimeout(() => {
      setAddedSuccess(false);
      onClose();
    }, 1200);
  };

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6"
      onClick={onClose}
    >
      <div 
        onClick={(e) => e.stopPropagation()}
        className="relative bg-[#FAF9F5] w-full max-w-5xl max-h-[92vh] overflow-y-auto shadow-2xl border border-[#E0D9CD] flex flex-col my-auto"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 bg-[#FAF9F5]/90 hover:bg-white text-[#2B2724] border border-[#DDD6C8] transition-colors rounded-full"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-0">
          {/* Left Column: Editorial Gallery */}
          <div className="md:col-span-6 bg-[#F2EDE4] relative min-h-[380px] md:min-h-[580px] overflow-hidden flex items-center justify-center">
            <img
              src={product.image}
              alt={product.name}
              referrerPolicy="no-referrer"
              onLoad={() => setImageLoaded(true)}
              className={`w-full h-full object-cover object-center max-h-[620px] transition-opacity duration-500 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
            />

            {product.badge && (
              <div className="absolute top-4 left-4 bg-[#181615] text-[#FAF8F5] text-[10px] uppercase tracking-widest font-semibold px-3 py-1.5">
                {product.badge}
              </div>
            )}

            <div className="absolute bottom-4 left-4 right-4 bg-[#FAF9F5]/90 backdrop-blur-md p-3 text-xs text-[#524B43] border border-[#DDD6C8]">
              <span className="font-semibold text-[#181615]">Fit Profile: </span>
              {product.modelMeasurements}
            </div>
          </div>

          {/* Right Column: Contiguous Purchase Module */}
          <div className="md:col-span-6 p-6 sm:p-8 lg:p-10 flex flex-col justify-between bg-white">
            <div>
              {/* Category & Origin Line */}
              <div className="flex items-center justify-between gap-4 mb-2">
                <div className="text-xs uppercase tracking-[0.2em] text-[#8C8477] font-medium">
                  <span>{product.categoryLabel}</span>
                  <span className="mx-2">·</span>
                  <span>{product.origin}</span>
                </div>
                <button
                  onClick={() => onToggleWishlist(product)}
                  className={`p-2 transition-colors ${
                    isWishlisted ? 'text-[#8E3A42]' : 'text-[#8C8477] hover:text-[#181615]'
                  }`}
                  aria-label="Toggle wishlist"
                >
                  <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
                </button>
              </div>

              {/* Title */}
              <h2 className="text-2xl sm:text-3xl font-serif text-[#1A1816] tracking-tight mb-2">
                {product.name}
              </h2>

              {/* Price in Tabular Numerals */}
              <div className="flex items-baseline gap-3 mb-6">
                <span className="text-2xl font-semibold font-mono text-[#181615] tabular-nums">
                  {formatPrice(product.price, currency)}
                </span>
                {product.originalPrice && (
                  <span className="text-sm font-mono text-[#A89F93] line-through tabular-nums">
                    {formatPrice(product.originalPrice, currency)}
                  </span>
                )}
                <span className="text-xs text-[#29523D] font-medium uppercase tracking-wider ml-2">
                  Complimentary Shipping
                </span>
              </div>

              {/* Description */}
              <p className="text-sm text-[#5C554C] leading-relaxed mb-6 font-light">
                {product.description}
              </p>

              {/* Color Selection */}
              <div className="mb-6">
                <div className="flex items-center justify-between text-xs mb-2.5">
                  <span className="uppercase tracking-wider text-[#736B60] font-medium">Hue:</span>
                  <span className="text-[#181615] font-semibold">{selectedColor.name}</span>
                </div>
                <div className="flex items-center gap-3">
                  {product.colors.map((c) => (
                    <button
                      key={c.name}
                      onClick={() => setSelectedColor(c)}
                      style={{ backgroundColor: c.hex }}
                      className={`w-7 h-7 rounded-full border transition-all ${
                        selectedColor.name === c.name
                          ? 'ring-2 ring-offset-2 ring-[#181615] scale-110'
                          : 'border-[#CCC5B8] opacity-80 hover:opacity-100'
                      }`}
                      title={c.name}
                      aria-label={`Color ${c.name}`}
                    />
                  ))}
                </div>
              </div>

              {/* Size Selection & Size Guide Trigger */}
              <div className="mb-6">
                <div className="flex items-center justify-between text-xs mb-2.5">
                  <span className="uppercase tracking-wider text-[#736B60] font-medium">Select Size:</span>
                  <button
                    onClick={onOpenSizeGuide}
                    className="inline-flex items-center gap-1.5 text-[#181615] hover:text-[#8E3A42] transition-colors underline uppercase tracking-wider text-[11px] font-medium"
                  >
                    <Ruler className="w-3.5 h-3.5" />
                    <span>Fit & Size Guide</span>
                  </button>
                </div>
                <div className="grid grid-cols-5 gap-2">
                  {product.sizes.map((sz) => (
                    <button
                      key={sz}
                      onClick={() => setSelectedSize(sz)}
                      className={`py-2.5 text-xs font-semibold tracking-wider transition-all border ${
                        selectedSize === sz
                          ? 'bg-[#181615] text-[#FAF8F5] border-[#181615]'
                          : 'bg-[#FAF9F5] text-[#3D3730] border-[#E2DDD3] hover:border-[#181615]'
                      }`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>

              {/* Bespoke Hemming Option */}
              <div className="mb-6 p-3.5 bg-[#FAF8F5] border border-[#E5DFD4]">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={bespokeHemming}
                    onChange={(e) => setBespokeHemming(e.target.checked)}
                    className="mt-1 accent-[#181615] w-4 h-4 rounded cursor-pointer"
                  />
                  <div>
                    <div className="flex items-center gap-1.5 text-xs font-medium text-[#181615]">
                      <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                      <span>Complimentary Bespoke Hem Adjustment</span>
                    </div>
                    <p className="text-[11px] text-[#6B6357] mt-0.5 leading-normal">
                      Our atelier tailors will contact you upon order placement to confirm your preferred shoe height and hem drop.
                    </p>
                  </div>
                </label>
              </div>

              {/* Quantity Stepper & Add to Bag CTA */}
              <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center border border-[#D5CEC2] bg-[#FAF9F5]">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-12 flex items-center justify-center text-sm hover:bg-[#EAE4D8] transition-colors"
                    aria-label="Decrease quantity"
                  >
                    -
                  </button>
                  <span className="w-10 text-center text-xs font-mono font-semibold tabular-nums">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-12 flex items-center justify-center text-sm hover:bg-[#EAE4D8] transition-colors"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={handleAdd}
                  disabled={addedSuccess}
                  className={`flex-1 h-12 px-6 text-xs uppercase tracking-[0.16em] font-medium flex items-center justify-center gap-2 transition-all ${
                    addedSuccess
                      ? 'bg-[#29523D] text-white'
                      : 'bg-[#181615] text-[#FAF8F5] hover:bg-[#2F2C29]'
                  }`}
                >
                  {addedSuccess ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Added to Shopping Bag</span>
                    </>
                  ) : (
                    <span>Add to Bag · {formatPrice(product.price * quantity, currency)}</span>
                  )}
                </button>
              </div>
            </div>

            {/* Accordion Tabs for Craft & Care */}
            <div className="border-t border-[#E8E2D5] pt-4">
              <div className="flex gap-4 border-b border-[#EFECE5] pb-2 text-xs uppercase tracking-wider">
                <button
                  onClick={() => setActiveTab('details')}
                  className={`pb-1 font-medium transition-colors ${
                    activeTab === 'details' ? 'border-b-2 border-[#181615] text-[#181615]' : 'text-[#8C8477]'
                  }`}
                >
                  Silhouette Details
                </button>
                <button
                  onClick={() => setActiveTab('fabric')}
                  className={`pb-1 font-medium transition-colors ${
                    activeTab === 'fabric' ? 'border-b-2 border-[#181615] text-[#181615]' : 'text-[#8C8477]'
                  }`}
                >
                  Fabric & Care
                </button>
                <button
                  onClick={() => setActiveTab('shipping')}
                  className={`pb-1 font-medium transition-colors ${
                    activeTab === 'shipping' ? 'border-b-2 border-[#181615] text-[#181615]' : 'text-[#8C8477]'
                  }`}
                >
                  Atelier Guarantee
                </button>
              </div>

              <div className="pt-3 text-xs text-[#635B51] leading-relaxed">
                {activeTab === 'details' && (
                  <ul className="space-y-1.5 list-disc list-inside">
                    {product.details.map((d, i) => (
                      <li key={i}>{d}</li>
                    ))}
                  </ul>
                )}
                {activeTab === 'fabric' && (
                  <div className="space-y-2">
                    <p><strong className="text-[#181615]">Composition:</strong> {product.fabric}</p>
                    <p><strong className="text-[#181615]">Care:</strong> {product.careInstructions}</p>
                  </div>
                )}
                {activeTab === 'shipping' && (
                  <div className="space-y-2">
                    <p className="flex items-center gap-1.5 text-[#181615] font-medium">
                      <Truck className="w-3.5 h-3.5 text-[#D4AF37]" />
                      <span>Complimentary worldwide express courier</span>
                    </p>
                    <p className="flex items-center gap-1.5 text-[#181615] font-medium">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
                      <span>30-day atelier return and exchange privileges</span>
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
