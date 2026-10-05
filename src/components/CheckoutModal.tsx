import { useState } from 'react';
import { X, CheckCircle, ShieldCheck, Lock, CreditCard, Sparkles, Printer } from 'lucide-react';
import { CartItem, Currency, OrderDetails } from '../types';
import { formatPrice } from '../utils/formatters';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  currency: Currency;
  giftBox: boolean;
  onOrderSuccess: (order: OrderDetails) => void;
}

export function CheckoutModal({
  isOpen,
  onClose,
  cart,
  currency,
  giftBox,
  onOrderSuccess,
}: CheckoutModalProps) {
  if (!isOpen) return null;

  const [name, setName] = useState('Lady Eleanor Sterling');
  const [email, setEmail] = useState('eleanor.sterling@vogue-clients.com');
  const [phone, setPhone] = useState('+1 (555) 234-8890');
  const [address, setAddress] = useState('740 Park Avenue, Apt 11B');
  const [city, setCity] = useState('New York');
  const [postalCode, setPostalCode] = useState('10021');
  const [country, setCountry] = useState('United States');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'apple' | 'concierge'>('card');
  const [cardNumber, setCardNumber] = useState('•••• •••• •••• 4242');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState<OrderDetails | null>(null);

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal >= 300 ? 0 : 25;
  const total = subtotal + shipping;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const orderId = `AV-2026-${Math.floor(1000 + Math.random() * 9000)}`;
      const order: OrderDetails = {
        orderId,
        customerName: name,
        email,
        phone,
        address,
        city,
        postalCode,
        country,
        items: [...cart],
        subtotal,
        shipping,
        giftBox,
        total,
        createdAt: new Date().toLocaleDateString('en-US', {
          month: 'long',
          day: 'numeric',
          year: 'numeric',
        }),
        paymentMethod: paymentMethod === 'card' ? 'Visa Signature' : paymentMethod === 'apple' ? 'Apple Pay' : 'Atelier VIP Concierge Invoice',
      };
      setConfirmedOrder(order);
      setIsSubmitting(false);
      onOrderSuccess(order);
    }, 1200);
  };

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
      onClick={onClose}
    >
      <div 
        onClick={(e) => e.stopPropagation()}
        className="relative bg-[#FAF9F5] w-full max-w-3xl max-h-[92vh] overflow-y-auto border border-[#E0D8CB] shadow-2xl p-6 sm:p-10 my-auto"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-[#736B60] hover:text-[#181615] rounded-full hover:bg-[#EFEAE0] transition-colors"
          aria-label="Close checkout"
        >
          <X className="w-5 h-5" />
        </button>

        {confirmedOrder ? (
          /* Order Confirmation View */
          <div className="text-center py-6">
            <div className="w-16 h-16 bg-[#29523D] text-white rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8" />
            </div>

            <div className="flex items-center justify-center gap-2 text-xs uppercase tracking-[0.2em] text-[#8C8477] mb-2 font-medium">
              <span>Maison Confirmed</span>
              <span aria-hidden="true">·</span>
              <span>Preparing Shipment</span>
            </div>

            <h2 className="text-3xl font-serif text-[#181615] mb-2">
              Merci, {confirmedOrder.customerName}
            </h2>
            <p className="text-sm text-[#61594F] max-w-md mx-auto mb-6">
              Your order <strong className="font-mono text-[#181615]">{confirmedOrder.orderId}</strong> has been received by our Paris atelier. A tailored confirmation receipt has been sent to {confirmedOrder.email}.
            </p>

            {/* Receipt Summary Card */}
            <div className="bg-white border border-[#E2DBD0] p-6 text-left max-w-lg mx-auto mb-8 space-y-4">
              <div className="flex justify-between items-center pb-3 border-b border-[#EFECE5] text-xs">
                <span className="uppercase tracking-wider text-[#8A8173] font-medium">Order Number</span>
                <span className="font-mono font-semibold text-[#181615]">{confirmedOrder.orderId}</span>
              </div>

              <div className="space-y-3">
                {confirmedOrder.items.map((i) => (
                  <div key={i.id} className="flex justify-between text-xs">
                    <div>
                      <p className="font-serif font-medium text-[#181615]">{i.name}</p>
                      <p className="text-[#857C70] font-mono">
                        Size {i.size} · {i.color} · Qty {i.quantity}
                        {i.bespokeHemming && ' · Bespoke Hem'}
                      </p>
                    </div>
                    <span className="font-mono font-medium text-[#181615] tabular-nums">
                      {formatPrice(i.price * i.quantity, currency)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="pt-3 border-t border-[#EFECE5] space-y-1.5 text-xs text-[#6B6357]">
                <div className="flex justify-between">
                  <span>Shipping Address</span>
                  <span className="text-right text-[#181615] font-medium">
                    {confirmedOrder.address}, {confirmedOrder.city}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Courier Service</span>
                  <span className="text-[#29523D] font-medium">
                    {confirmedOrder.shipping === 0 ? 'Complimentary Express Air' : 'Standard Express'}
                  </span>
                </div>
                <div className="flex justify-between pt-2 border-t border-[#EFECE5] text-sm font-semibold text-[#181615]">
                  <span>Total Paid</span>
                  <span className="font-mono tabular-nums">{formatPrice(confirmedOrder.total, currency)}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center gap-4">
              <button
                onClick={() => window.print()}
                className="inline-flex items-center gap-2 px-5 py-2.5 border border-[#423C35] text-xs uppercase tracking-wider font-medium hover:bg-white transition-colors"
              >
                <Printer className="w-4 h-4" />
                <span>Print Receipt</span>
              </button>
              <button
                onClick={onClose}
                className="px-6 py-2.5 bg-[#181615] text-[#FAF8F5] text-xs uppercase tracking-wider font-medium hover:bg-[#2F2C29] transition-colors"
              >
                Return to Boutique
              </button>
            </div>
          </div>
        ) : (
          /* Checkout Input Form */
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#8C8477] mb-2 font-medium">
              <Lock className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Encrypted Atelier Checkout</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif text-[#181615] mb-6">
              Complete Your Order
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Client Contact Info */}
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-[#181615] mb-3">
                  01. Client Information
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-[#696155] mb-1 font-medium">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-white border border-[#D5CEC2] px-3.5 py-2 text-xs text-[#181615] focus:border-[#181615] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-[#696155] mb-1 font-medium">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-white border border-[#D5CEC2] px-3.5 py-2 text-xs text-[#181615] focus:border-[#181615] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-[#696155] mb-1 font-medium">
                      Phone (For Delivery Dispatch)
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-white border border-[#D5CEC2] px-3.5 py-2 text-xs text-[#181615] focus:border-[#181615] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-[#696155] mb-1 font-medium">
                      Country / Region
                    </label>
                    <select
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      className="w-full bg-white border border-[#D5CEC2] px-3.5 py-2 text-xs text-[#181615] focus:border-[#181615] focus:outline-none"
                    >
                      <option value="United States">United States</option>
                      <option value="France">France</option>
                      <option value="United Kingdom">United Kingdom</option>
                      <option value="Monaco">Monaco</option>
                      <option value="Italy">Italy</option>
                      <option value="Switzerland">Switzerland</option>
                      <option value="Japan">Japan</option>
                      <option value="Canada">Canada</option>
                      <option value="Australia">Australia</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Delivery Address */}
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-[#181615] mb-3">
                  02. Destination Address
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="sm:col-span-3">
                    <label className="block text-[11px] uppercase tracking-wider text-[#696155] mb-1 font-medium">
                      Street Address & Suite
                    </label>
                    <input
                      type="text"
                      required
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full bg-white border border-[#D5CEC2] px-3.5 py-2 text-xs text-[#181615] focus:border-[#181615] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-[#696155] mb-1 font-medium">
                      City
                    </label>
                    <input
                      type="text"
                      required
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full bg-white border border-[#D5CEC2] px-3.5 py-2 text-xs text-[#181615] focus:border-[#181615] focus:outline-none"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-[11px] uppercase tracking-wider text-[#696155] mb-1 font-medium">
                      Postal / ZIP Code
                    </label>
                    <input
                      type="text"
                      required
                      value={postalCode}
                      onChange={(e) => setPostalCode(e.target.value)}
                      className="w-full bg-white border border-[#D5CEC2] px-3.5 py-2 text-xs text-[#181615] focus:border-[#181615] focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Method Selector */}
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-[#181615] mb-3">
                  03. Payment Option
                </h3>
                <div className="grid grid-cols-3 gap-3 mb-4">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`p-3 text-left border transition-all ${
                      paymentMethod === 'card'
                        ? 'bg-white border-[#181615] shadow-xs'
                        : 'bg-[#FAF8F5] border-[#DED7CA] hover:border-[#181615]'
                    }`}
                  >
                    <CreditCard className="w-4 h-4 text-[#181615] mb-1.5" />
                    <p className="text-xs font-medium text-[#181615]">Credit Card</p>
                    <p className="text-[10px] text-[#7A7266]">Visa, Amex, MC</p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('apple')}
                    className={`p-3 text-left border transition-all ${
                      paymentMethod === 'apple'
                        ? 'bg-white border-[#181615] shadow-xs'
                        : 'bg-[#FAF8F5] border-[#DED7CA] hover:border-[#181615]'
                    }`}
                  >
                    <Sparkles className="w-4 h-4 text-[#D4AF37] mb-1.5" />
                    <p className="text-xs font-medium text-[#181615]">Apple Pay</p>
                    <p className="text-[10px] text-[#7A7266]">1-Touch Instant</p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('concierge')}
                    className={`p-3 text-left border transition-all ${
                      paymentMethod === 'concierge'
                        ? 'bg-white border-[#181615] shadow-xs'
                        : 'bg-[#FAF8F5] border-[#DED7CA] hover:border-[#181615]'
                    }`}
                  >
                    <ShieldCheck className="w-4 h-4 text-[#29523D] mb-1.5" />
                    <p className="text-xs font-medium text-[#181615]">Concierge Invoice</p>
                    <p className="text-[10px] text-[#7A7266]">Bank Wire / VIP</p>
                  </button>
                </div>

                {paymentMethod === 'card' && (
                  <div className="bg-white p-4 border border-[#D5CEC2] space-y-3">
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-[#696155] mb-1 font-medium">
                        Card Number
                      </label>
                      <input
                        type="text"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        className="w-full bg-[#FAF9F5] border border-[#D5CEC2] px-3.5 py-2 text-xs font-mono text-[#181615]"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] uppercase tracking-wider text-[#696155] mb-1 font-medium">
                          Expiration (MM/YY)
                        </label>
                        <input
                          type="text"
                          defaultValue="09/29"
                          className="w-full bg-[#FAF9F5] border border-[#D5CEC2] px-3.5 py-2 text-xs font-mono text-[#181615]"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] uppercase tracking-wider text-[#696155] mb-1 font-medium">
                          Security CVC
                        </label>
                        <input
                          type="text"
                          defaultValue="842"
                          className="w-full bg-[#FAF9F5] border border-[#D5CEC2] px-3.5 py-2 text-xs font-mono text-[#181615]"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Order Final Summary */}
              <div className="p-4 bg-white border border-[#E0D8CB] space-y-2">
                <div className="flex justify-between text-xs text-[#6B6357]">
                  <span>Items Subtotal ({cart.length})</span>
                  <span className="font-mono text-[#181615] tabular-nums">{formatPrice(subtotal, currency)}</span>
                </div>
                <div className="flex justify-between text-xs text-[#6B6357]">
                  <span>Express Courier</span>
                  <span className="font-mono text-[#29523D] font-medium">
                    {shipping === 0 ? 'Complimentary' : formatPrice(shipping, currency)}
                  </span>
                </div>
                {giftBox && (
                  <div className="flex justify-between text-xs text-[#6B6357]">
                    <span>Atelier Gift Box Packaging</span>
                    <span className="text-[#29523D] font-medium">Included</span>
                  </div>
                )}
                <div className="flex justify-between pt-2 border-t border-[#EFECE5] text-base font-semibold text-[#181615]">
                  <span>Total Amount Due</span>
                  <span className="font-mono tabular-nums">{formatPrice(total, currency)}</span>
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-[#181615] text-[#FAF8F5] text-xs uppercase tracking-[0.2em] font-medium hover:bg-[#2C2926] transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                {isSubmitting ? (
                  <span>Securing Order with Atelier...</span>
                ) : (
                  <span>Place Atelier Order · {formatPrice(total, currency)}</span>
                )}
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-[#7A7266]">
                <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>30-Day complimentary return privileges included</span>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
