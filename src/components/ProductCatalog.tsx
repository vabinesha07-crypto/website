import { useState, useMemo } from 'react';
import { Filter, SlidersHorizontal, RotateCcw } from 'lucide-react';
import { DressProduct, Category, Currency } from '../types';
import { ProductCard } from './ProductCard';

interface ProductCatalogProps {
  products: DressProduct[];
  selectedCategory: Category;
  onSelectCategory: (cat: Category) => void;
  currency: Currency;
  wishlistIds: string[];
  onToggleWishlist: (product: DressProduct) => void;
  onQuickView: (product: DressProduct) => void;
  onQuickAdd: (product: DressProduct, size: 'XS' | 'S' | 'M' | 'L' | 'XL', colorName: string) => void;
}

export function ProductCatalog({
  products,
  selectedCategory,
  onSelectCategory,
  currency,
  wishlistIds,
  onToggleWishlist,
  onQuickView,
  onQuickAdd,
}: ProductCatalogProps) {
  const [selectedLength, setSelectedLength] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc'>('featured');
  const [searchTerm, setSearchTerm] = useState('');

  const categories: { id: Category; label: string }[] = [
    { id: 'all', label: 'All Silhouettes' },
    { id: 'evening', label: 'Evening & Black Tie' },
    { id: 'silk-slip', label: 'Mulberry Silk Slips' },
    { id: 'linen-resort', label: 'Summer & Resort Linen' },
    { id: 'cocktail', label: 'Sculptural Cocktail' },
  ];

  const lengths = ['all', 'Midi', 'Maxi', 'Floor-Length'];

  // Filter & sort logic
  const filteredProducts = useMemo(() => {
    return products
      .filter((item) => {
        const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
        const matchesLength = selectedLength === 'all' || item.length === selectedLength;
        const matchesSearch =
          searchTerm.trim() === '' ||
          item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.fabric.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.description.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesLength && matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        return 0;
      });
  }, [products, selectedCategory, selectedLength, searchTerm, sortBy]);

  const hasActiveFilters = selectedCategory !== 'all' || selectedLength !== 'all' || searchTerm !== '';

  const handleResetFilters = () => {
    onSelectCategory('all');
    setSelectedLength('all');
    setSearchTerm('');
    setSortBy('featured');
  };

  return (
    <section id="collection-section" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-6 border-b border-[#E8E3D8]">
        <div>
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#8C8477] mb-2 font-medium">
            <span>Catalogue Raisonné</span>
            <span aria-hidden="true">·</span>
            <span>Handcrafted Editions</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-normal text-[#1A1816] tracking-tight">
            The Dress Collection
          </h2>
        </div>

        {/* Tabular Count & Active Info */}
        <div className="text-xs uppercase tracking-wider text-[#6B6358] font-mono tabular-nums flex items-center gap-3">
          <span>Showing {filteredProducts.length} of {products.length} silhouettes</span>
          {hasActiveFilters && (
            <button
              onClick={handleResetFilters}
              className="inline-flex items-center gap-1 text-[#8E3A42] hover:underline normal-case font-sans font-medium"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset filters</span>
            </button>
          )}
        </div>
      </div>

      {/* Interactive Controls Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8">
        {/* Category Segmented Controls */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 lg:pb-0 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`px-4 py-2 text-xs uppercase tracking-wider font-medium whitespace-nowrap transition-all duration-200 border cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-[#181615] text-[#FAF8F5] border-[#181615]'
                  : 'bg-white text-[#575047] border-[#E5DFD4] hover:border-[#181615] hover:text-[#181615]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Secondary Filter & Sort Dropdowns */}
        <div className="flex items-center gap-3 self-end lg:self-auto flex-wrap">
          {/* Length Filter */}
          <div className="flex items-center gap-2 bg-white border border-[#E5DFD4] px-3 py-1.5 text-xs text-[#575047]">
            <Filter className="w-3.5 h-3.5 text-[#8C8477]" />
            <label htmlFor="length-select" className="sr-only">Length</label>
            <select
              id="length-select"
              value={selectedLength}
              onChange={(e) => setSelectedLength(e.target.value)}
              className="bg-transparent text-xs text-[#1A1816] focus:outline-none cursor-pointer"
            >
              <option value="all">All Lengths</option>
              {lengths.filter(l => l !== 'all').map((l) => (
                <option key={l} value={l}>{l}</option>
              ))}
            </select>
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-2 bg-white border border-[#E5DFD4] px-3 py-1.5 text-xs text-[#575047]">
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#8C8477]" />
            <label htmlFor="sort-select" className="sr-only">Sort by</label>
            <select
              id="sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-transparent text-xs text-[#1A1816] focus:outline-none cursor-pointer font-medium"
            >
              <option value="featured">Curated Edition</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
        </div>
      </div>

      {/* Empty State */}
      {filteredProducts.length === 0 ? (
        <div className="py-20 text-center bg-white border border-[#E8E3D8] p-8">
          <p className="font-serif text-2xl text-[#1A1816] mb-2">No matching dresses found</p>
          <p className="text-sm text-[#736B60] mb-6">Try selecting a different silhouette or clearing your filters.</p>
          <button
            onClick={handleResetFilters}
            className="px-6 py-2.5 bg-[#181615] text-[#FAF8F5] text-xs uppercase tracking-widest font-medium hover:bg-[#2C2926]"
          >
            View All Silhouettes
          </button>
        </div>
      ) : (
        /* 3-Column Uniform Product Grid */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              currency={currency}
              isWishlisted={wishlistIds.includes(product.id)}
              onToggleWishlist={onToggleWishlist}
              onQuickView={onQuickView}
              onQuickAdd={onQuickAdd}
            />
          ))}
        </div>
      )}
    </section>
  );
}
