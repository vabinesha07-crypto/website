import { useState } from 'react';
import { X, Trash2, ShoppingBag, ArrowRight, Gift, Sparkles, Check } from 'lucide-react';
import { CartItem, Currency } from '../types';
import { formatPrice } from '../utils/formatters';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  currency: Currency;
  onUpdateQuantity: (id: string, qty: number) => void;
  onRemoveItem: (id: string) => void;
  onProceedToCheckout: () => void;
  giftBox: boolean;
  onToggleGiftBox: (val: boolean) => void;
}

export function CartDrawer({
  isOpen,
  onClose,
  cart,
  currency,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
  giftBox,
  onToggleGiftBox,
}: CartDrawerProps) {
  if (!isOpen) return null;

  const FREE_SHIPPING_THRESHOLD = 300;
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const remainingForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const progressPercent = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs transition-opacity duration-300">
      <div 
        className="absolute inset-0"
        onClick={onClose}
        aria-label="Close cart overlay"
      />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10 pointer-events-none">
        <div className="w-screen max-w-md bg-[#FAF9F5] border-l border-[#E2DDD3] shadow-2xl flex flex-col pointer-events-auto">
          {/* Drawer Header */}
          <div className="p-6 border-b border-[#E8E3D8] flex items-center justify-between bg-white">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#181615]" />
              <h2 className="text-lg font-serif tracking-tight text-[#181615]">
                Your Shopping Bag ({cart.reduce((total, i) => total + i.quantity, 0)})
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-[#736B60] hover:text-[#181615] rounded-full hover:bg-[#F2EDE4] transition-colors"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          <div className="bg-[#F4EFE6] px-6 py-3 border-b border-[#E8E2D5]">
            <div className="flex items-center justify-between text-xs text-[#524B43] mb-1.5">
              {remainingForFreeShipping > 0 ? (
                <span>
                  Add <strong className="font-mono text-[#181615]">{formatPrice(remainingForFreeShipping, currency)}</strong> more for complimentary courier delivery
                </span>
              ) : (
                <span className="flex items-center gap-1.5 text-[#29523D] font-medium">
                  <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Complimentary Worldwide Courier Unlocked</span>
                </span>
              )}
              <span className="text-[10px] font-mono text-[#7A7267] tabular-nums">
                {Math.round(progressPercent)}%
              </span>
            </div>
            <div className="w-full bg-[#DDD6C8] h-1.5 rounded-full overflow-hidden">
              <div 
                className="bg-[#181615] h-full transition-all duration-500 ease-out"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {cart.length === 0 ? (
              <div className="py-20 text-center flex flex-col items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-[#EFEBE1] flex items-center justify-center mb-4 text-[#8C8477]">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <p className="font-serif text-xl text-[#181615] mb-2">Your Bag is Empty</p>
                <p className="text-xs text-[#736B60] max-w-xs mb-6">
                  Discover our silk slip dresses, evening gowns, and artisanal summer linen silhouettes.
                </p>
                <button
                  onClick={onClose}
                  className="px-6 py-3 bg-[#181615] text-[#FAF8F5] text-xs uppercase tracking-widest font-medium hover:bg-[#2F2C29]"
                >
                  Explore Collection
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div 
                  key={item.id} 
                  className="flex gap-4 pb-6 border-b border-[#EAE4D8] last:border-b-0"
                >
                  {/* Item Image */}
                  <div className="w-20 h-28 bg-[#EAE5DA] shrink-0 overflow-hidden border border-[#DED7C9]">
                    <img
                      src={item.image}
                      alt={item.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Item Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="font-serif text-sm font-medium text-[#181615] line-clamp-1">
                          {item.name}
                        </h3>
                        <button
                          onClick={() => onRemoveItem(item.id)}
                          className="text-[#9E9588] hover:text-[#8E3A42] transition-colors p-1"
                          aria-label={`Remove ${item.name}`}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Unboxed options metadata */}
                      <div className="flex items-center gap-1.5 text-xs text-[#787064] mt-1 font-mono">
                        <span>Size {item.size}</span>
                        <span>·</span>
                        <span>{item.color}</span>
                      </div>

                      {item.bespokeHemming && (
                        <div className="inline-flex items-center gap-1 text-[10px] text-[#29523D] bg-[#E8EFEA] px-2 py-0.5 mt-1.5 rounded-xs font-medium">
                          <Sparkles className="w-2.5 h-2.5" />
                          <span>Bespoke Hem Requested</span>
                        </div>
                      )}
                    </div>

                    {/* Stepper & Price Row */}
                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center border border-[#D5CEC2] bg-white">
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                          className="w-7 h-7 flex items-center justify-center text-xs hover:bg-[#F2ECE1] transition-colors"
                          aria-label="Decrease quantity"
                        >
                          -
                        </button>
                        <span className="w-7 text-center text-xs font-mono font-medium tabular-nums">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          className="w-7 h-7 flex items-center justify-center text-xs hover:bg-[#F2ECE1] transition-colors"
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>

                      <span className="text-sm font-semibold font-mono tabular-nums text-[#181615]">
                        {formatPrice(item.price * item.quantity, currency)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Drawer Footer with Checkout */}
          {cart.length > 0 && (
            <div className="p-6 bg-white border-t border-[#E8E3D8] space-y-4">
              {/* Complimentary Gift Box Option */}
              <div className="p-3 bg-[#FAF8F5] border border-[#E5DFD4]">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={giftBox}
                    onChange={(e) => onToggleGiftBox(e.target.checked)}
                    className="accent-[#181615] w-4 h-4 rounded cursor-pointer"
                  />
                  <div className="flex items-center gap-2 text-xs text-[#38332E]">
                    <Gift className="w-4 h-4 text-[#D4AF37]" />
                    <span>Signature Atelier Gift Packaging (Complimentary)</span>
                  </div>
                </label>
              </div>

              {/* Subtotal Calculation */}
              <div className="space-y-1.5 text-xs text-[#6B6357]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-mono font-medium text-[#181615] tabular-nums">
                    {formatPrice(subtotal, currency)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Worldwide Courier Delivery</span>
                  <span className="font-mono text-[#29523D] font-medium">
                    {remainingForFreeShipping === 0 ? 'Complimentary' : formatPrice(25, currency)}
                  </span>
                </div>
                <div className="flex justify-between pt-2 border-t border-[#EFECE5] text-sm font-semibold text-[#181615]">
                  <span>Estimated Total</span>
                  <span className="font-mono tabular-nums">
                    {formatPrice(subtotal + (remainingForFreeShipping === 0 ? 0 : 25), currency)}
                  </span>
                </div>
              </div>

              {/* Checkout CTA */}
              <button
                onClick={onProceedToCheckout}
                className="w-full py-4 bg-[#181615] text-[#FAF8F5] text-xs uppercase tracking-[0.18em] font-medium flex items-center justify-center gap-2 hover:bg-[#2C2926] transition-colors"
              >
                <span>Proceed to Secure Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <p className="text-[11px] text-center text-[#8C8477]">
                Secure 256-bit SSL encrypted atelier checkout
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
