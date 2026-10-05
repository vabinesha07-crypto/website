import { useState, useCallback } from 'react';
import { PRODUCTS } from './data/products';
import { DressProduct, CartItem, Category, Currency, OrderDetails } from './types';
import { TopBanner } from './components/TopBanner';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProductCatalog } from './components/ProductCatalog';
import { AtelierCraft } from './components/AtelierCraft';
import { ReviewsSection } from './components/ReviewsSection';
import { Footer } from './components/Footer';
import { ProductModal } from './components/ProductModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { SizeGuideModal } from './components/SizeGuideModal';
import { SearchModal } from './components/SearchModal';
import { WishlistModal } from './components/WishlistModal';
import { Toast } from './components/Toast';

export default function App() {
  const [currency, setCurrency] = useState<Currency>('USD');
  const [selectedCategory, setSelectedCategory] = useState<Category>('all');
  
  // Initial cart with one iconic silhouette for instant interaction preview
  const [cart, setCart] = useState<CartItem[]>([
    {
      id: 'cart-init-1',
      productId: 'laurore-silk-slip',
      name: "L'Aurore Bias-Cut Silk Slip Dress",
      price: 340,
      image: '/src/assets/images/dress_silk_champagne_1791194612563.jpg',
      size: 'S',
      color: 'Champagne Ivory',
      quantity: 1,
      fabric: '100% Grade-6A Mulberry Silk',
      bespokeHemming: true,
    }
  ]);

  // Wishlist state
  const [wishlist, setWishlist] = useState<DressProduct[]>([
    PRODUCTS[1] // Celeste pleated evening gown saved by default
  ]);

  const [giftBox, setGiftBox] = useState(true);

  // Modals & Drawers state
  const [quickViewProduct, setQuickViewProduct] = useState<DressProduct | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  // Notification Toast state
  const [toast, setToast] = useState<{ message: string; type: 'cart' | 'wishlist' } | null>(null);

  const showToast = useCallback((message: string, type: 'cart' | 'wishlist' = 'cart') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 2800);
  }, []);

  // Cart operations
  const handleAddToCart = (
    product: DressProduct,
    size: 'XS' | 'S' | 'M' | 'L' | 'XL',
    colorName: string,
    bespokeHemming: boolean,
    quantity: number = 1
  ) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.productId === product.id && item.size === size && item.color === colorName && item.bespokeHemming === bespokeHemming
      );

      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex].quantity += quantity;
        return next;
      }

      return [
        ...prev,
        {
          id: `cart-${Date.now()}-${Math.random()}`,
          productId: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          size,
          color: colorName,
          quantity,
          fabric: product.fabric,
          bespokeHemming,
        },
      ];
    });

    showToast(`${product.name} (Size ${size}) added to your shopping bag`, 'cart');
  };

  const handleUpdateQuantity = (id: string, qty: number) => {
    if (qty <= 0) {
      handleRemoveFromCart(id);
      return;
    }
    setCart((prev) => prev.map((item) => (item.id === id ? { ...item, quantity: qty } : item)));
  };

  const handleRemoveFromCart = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  // Wishlist operations
  const handleToggleWishlist = (product: DressProduct) => {
    const isSaved = wishlist.some((item) => item.id === product.id);
    if (isSaved) {
      setWishlist((prev) => prev.filter((item) => item.id !== product.id));
      showToast(`${product.name} removed from saved silhouettes`, 'wishlist');
    } else {
      setWishlist((prev) => [...prev, product]);
      showToast(`${product.name} saved to your personal collection`, 'wishlist');
    }
  };

  const handleMoveToBag = (product: DressProduct) => {
    handleAddToCart(product, 'S', product.colors[0].name, false, 1);
    setWishlist((prev) => prev.filter((item) => item.id !== product.id));
  };

  const handleOrderSuccess = (order: OrderDetails) => {
    // Clear cart after successful order placement
    setCart([]);
  };

  const scrollToCollection = () => {
    const el = document.getElementById('collection-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const totalCartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const wishlistIds = wishlist.map((item) => item.id);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F5] text-[#1A1816]">
      {/* Top Banner Announcement */}
      <TopBanner />

      {/* Main Top Bar adhering strictly to the Top Bar Contract */}
      <Navbar
        cartCount={totalCartCount}
        wishlistCount={wishlist.length}
        currency={currency}
        onCurrencyChange={setCurrency}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
        onSelectCategory={(cat) => setSelectedCategory(cat as Category)}
      />

      <main className="flex-1">
        {/* Editorial Fashion Hero Section */}
        <Hero
          onExplore={scrollToCollection}
          onOpenSizeGuide={() => setIsSizeGuideOpen(true)}
        />

        {/* Dress Catalog Section */}
        <ProductCatalog
          products={PRODUCTS}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          currency={currency}
          wishlistIds={wishlistIds}
          onToggleWishlist={handleToggleWishlist}
          onQuickView={(p) => setQuickViewProduct(p)}
          onQuickAdd={(p, size, color) => handleAddToCart(p, size, color, false, 1)}
        />

        {/* Maison Philosophy & Tailoring Craft */}
        <AtelierCraft />

        {/* Attributable Client Occasion Letters */}
        <ReviewsSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Product Detail Modal (PDP Contiguous Purchase Module) */}
      <ProductModal
        product={quickViewProduct}
        currency={currency}
        isWishlisted={quickViewProduct ? wishlistIds.includes(quickViewProduct.id) : false}
        onClose={() => setQuickViewProduct(null)}
        onToggleWishlist={handleToggleWishlist}
        onAddToCart={handleAddToCart}
        onOpenSizeGuide={() => {
          setQuickViewProduct(null);
          setIsSizeGuideOpen(true);
        }}
      />

      {/* Shopping Bag Slide-out Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        currency={currency}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        giftBox={giftBox}
        onToggleGiftBox={setGiftBox}
        onProceedToCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
      />

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cart={cart}
        currency={currency}
        giftBox={giftBox}
        onOrderSuccess={handleOrderSuccess}
      />

      {/* Interactive Size Guide Modal */}
      <SizeGuideModal
        isOpen={isSizeGuideOpen}
        onClose={() => setIsSizeGuideOpen(false)}
      />

      {/* Live Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        products={PRODUCTS}
        currency={currency}
        onSelectProduct={(p) => setQuickViewProduct(p)}
      />

      {/* Wishlist Modal */}
      <WishlistModal
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlist={wishlist}
        currency={currency}
        onRemoveFromWishlist={handleToggleWishlist}
        onQuickView={(p) => setQuickViewProduct(p)}
        onMoveToBag={handleMoveToBag}
      />

      {/* Toast Notification */}
      <Toast message={toast?.message || null} type={toast?.type} />
    </div>
  );
}
