import { useState } from 'react';
import { Search, Heart, ShoppingBag, Menu, X, ChevronDown } from 'lucide-react';
import { Currency } from '../types';

interface NavbarProps {
  cartCount: number;
  wishlistCount: number;
  currency: Currency;
  onCurrencyChange: (c: Currency) => void;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenSearch: () => void;
  onSelectCategory: (category: string) => void;
}

export function Navbar({
  cartCount,
  wishlistCount,
  currency,
  onCurrencyChange,
  onOpenCart,
  onOpenWishlist,
  onOpenSearch,
  onSelectCategory,
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currencyDropdownOpen, setCurrencyDropdownOpen] = useState(false);

  const currencies: Currency[] = ['USD', 'EUR', 'GBP'];

  const handleNavClick = (cat: string) => {
    onSelectCategory(cat);
    setMobileMenuOpen(false);
    const element = document.getElementById('collection-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FAF9F5]/90 backdrop-blur-md border-b border-[#E8E4DC] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* Mobile menu button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-[#2B2724] hover:text-black transition-colors"
          aria-label="Toggle mobile menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>

        {/* Zone 1: Single text element Brand wordmark */}
        <a
          href="/"
          className="text-2xl sm:text-3xl font-serif tracking-[0.18em] text-[#1A1816] font-medium uppercase whitespace-nowrap hover:opacity-85 transition-opacity"
        >
          Atelier Vélène
        </a>

        {/* Zone 2: 4-6 clean text navigation links */}
        <nav className="hidden lg:flex items-center gap-8 text-sm font-medium tracking-wider uppercase text-[#544E47]">
          <button
            onClick={() => handleNavClick('all')}
            className="hover:text-[#1A1816] transition-colors py-1 relative hover:after:w-full after:w-0 after:h-px after:bg-[#1A1816] after:absolute after:bottom-0 after:left-0 after:transition-all cursor-pointer whitespace-nowrap"
          >
            All Dresses
          </button>
          <button
            onClick={() => handleNavClick('evening')}
            className="hover:text-[#1A1816] transition-colors py-1 relative hover:after:w-full after:w-0 after:h-px after:bg-[#1A1816] after:absolute after:bottom-0 after:left-0 after:transition-all cursor-pointer whitespace-nowrap"
          >
            Evening & Gala
          </button>
          <button
            onClick={() => handleNavClick('silk-slip')}
            className="hover:text-[#1A1816] transition-colors py-1 relative hover:after:w-full after:w-0 after:h-px after:bg-[#1A1816] after:absolute after:bottom-0 after:left-0 after:transition-all cursor-pointer whitespace-nowrap"
          >
            Mulberry Silk
          </button>
          <button
            onClick={() => handleNavClick('linen-resort')}
            className="hover:text-[#1A1816] transition-colors py-1 relative hover:after:w-full after:w-0 after:h-px after:bg-[#1A1816] after:absolute after:bottom-0 after:left-0 after:transition-all cursor-pointer whitespace-nowrap"
          >
            Linen Resort
          </button>
          <button
            onClick={() => scrollToSection('craft-section')}
            className="hover:text-[#1A1816] transition-colors py-1 relative hover:after:w-full after:w-0 after:h-px after:bg-[#1A1816] after:absolute after:bottom-0 after:left-0 after:transition-all cursor-pointer whitespace-nowrap"
          >
            Maison Craft
          </button>
        </nav>

        {/* Zone 3: Primary action cluster */}
        <div className="flex items-center gap-3 sm:gap-5 text-[#2B2724]">
          {/* Currency Selector */}
          <div className="relative">
            <button
              onClick={() => setCurrencyDropdownOpen(!currencyDropdownOpen)}
              className="flex items-center gap-1 text-xs font-medium tracking-wider text-[#544E47] hover:text-[#1A1816] py-1.5 px-2 rounded-md hover:bg-[#EFECE6] transition-colors"
              aria-label="Select currency"
            >
              <span>{currency}</span>
              <ChevronDown className="w-3 h-3 opacity-60" />
            </button>
            {currencyDropdownOpen && (
              <div className="absolute right-0 mt-2 w-24 bg-white border border-[#E4DFD5] shadow-lg rounded-md py-1 z-50">
                {currencies.map((c) => (
                  <button
                    key={c}
                    onClick={() => {
                      onCurrencyChange(c);
                      setCurrencyDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-1.5 text-xs tracking-wider transition-colors ${
                      currency === c
                        ? 'bg-[#F2EFE9] text-[#1A1816] font-semibold'
                        : 'text-[#544E47] hover:bg-[#FAF9F5]'
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Search Trigger */}
          <button
            onClick={onOpenSearch}
            className="p-2 text-[#544E47] hover:text-[#1A1816] hover:bg-[#EFECE6] rounded-full transition-colors"
            aria-label="Search dress collection"
            title="Search dresses"
          >
            <Search className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

          {/* Wishlist Trigger */}
          <button
            onClick={onOpenWishlist}
            className="p-2 text-[#544E47] hover:text-[#1A1816] hover:bg-[#EFECE6] rounded-full transition-colors relative"
            aria-label={`Wishlist with ${wishlistCount} items`}
            title="Saved dresses"
          >
            <Heart className="w-4 h-4 sm:w-5 sm:h-5" />
            {wishlistCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#8E3A42] text-white text-[10px] font-semibold rounded-full flex items-center justify-center tabular-nums">
                {wishlistCount}
              </span>
            )}
          </button>

          {/* Cart Bag Trigger */}
          <button
            onClick={onOpenCart}
            className="flex items-center gap-2 py-2 px-3.5 bg-[#1A1816] text-[#FAF9F5] rounded-full hover:bg-[#2F2C28] transition-colors"
            aria-label={`Shopping bag with ${cartCount} items`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="text-xs font-medium tracking-wider uppercase hidden sm:inline">Bag</span>
            <span className="text-xs font-semibold tabular-nums px-1.5 py-0.5 rounded-full bg-white/20">
              {cartCount}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#FAF9F5] border-b border-[#E4DFD5] px-6 py-6 space-y-4 animate-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col space-y-3 text-sm font-medium tracking-wider uppercase text-[#47423C]">
            <button
              onClick={() => handleNavClick('all')}
              className="text-left py-2 border-b border-[#EFECE6]"
            >
              All Dresses
            </button>
            <button
              onClick={() => handleNavClick('evening')}
              className="text-left py-2 border-b border-[#EFECE6]"
            >
              Evening & Black Tie
            </button>
            <button
              onClick={() => handleNavClick('silk-slip')}
              className="text-left py-2 border-b border-[#EFECE6]"
            >
              Mulberry Silk Slips
            </button>
            <button
              onClick={() => handleNavClick('linen-resort')}
              className="text-left py-2 border-b border-[#EFECE6]"
            >
              Linen Resort
            </button>
            <button
              onClick={() => handleNavClick('cocktail')}
              className="text-left py-2 border-b border-[#EFECE6]"
            >
              Sculptural Cocktail
            </button>
            <button
              onClick={() => scrollToSection('craft-section')}
              className="text-left py-2 border-b border-[#EFECE6]"
            >
              Maison & Tailoring Craft
            </button>
            <button
              onClick={() => scrollToSection('reviews-section')}
              className="text-left py-2"
            >
              Client Letters & Reviews
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
