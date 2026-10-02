import React, { useState } from "react";
import { useApp, Product } from "../utils/store";
import { Eye, ShoppingCart, ShieldAlert, ArrowUpDown, Tag } from "lucide-react";

export const Shop: React.FC = () => {
  const { products, addToCart } = useApp();

  // Filters
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [sortBy, setSortBy] = useState<"none" | "price-low" | "price-high">("none");

  // Quick View Modal
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // Categories list
  const categories = ["all", "Coffee & Tea", "Mugs & Gifts", "Judaica & Ritual Items", "Books & Study Materials", "Gift Cards"];

  // Filtering & Sorting
  const filteredProducts = products.filter((p) => {
    return selectedCategory === "all" || p.category === selectedCategory;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "price-low") return a.price - b.price;
    if (sortBy === "price-high") return b.price - a.price;
    return 0; // none
  });

  return (
    <div className="pt-28 min-h-screen bg-white text-brand">
      {/* Header section */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center space-y-4">
        <span className="eyebrow text-brand">
          Shoresh shop
        </span>
        <h1 className="text-fluid-section font-serif font-medium tracking-tight leading-tight max-w-4xl mx-auto text-brand">
          Bring the Shteibl Experience Home
        </h1>
        <p className="text-lg text-stone-600 max-w-3xl mx-auto leading-relaxed">
          Support our renovation project by shopping our curated collection of custom diner mugs, organic whole beans, braided Havdalah candles, and signed books.
        </p>
      </section>

      {/* FILTER & SORT CONTROLS */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pb-8 no-print">
        <div className="bg-white rounded-3xl p-4 sm:p-6 border border-stone-200/80 shadow-sm flex flex-col lg:flex-row items-center justify-between gap-6">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-brand text-white"
                    : "bg-stone-50 hover:bg-stone-100 text-brand border border-stone-200"
                }`}
              >
                {cat === "all" ? "All Items" : cat}
              </button>
            ))}
          </div>

          {/* Sort By selector */}
          <div className="flex items-center gap-2 shrink-0 self-end lg:self-center">
            <ArrowUpDown className="w-4 h-4 text-stone-400" />
            <select
              value={sortBy}
              onChange={(e: any) => setSortBy(e.target.value)}
              className="bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-base font-medium focus:border-brand text-brand"
            >
              <option value="none">Sort By Default</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>
      </section>

      {/* PRODUCTS GRID */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pb-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {sortedProducts.map((p) => (
            <div
              key={p.id}
              className="group bg-white rounded-3xl overflow-hidden border border-stone-200 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Product Image on Hover switches */}
                <div className="relative aspect-square overflow-hidden bg-stone-50">
                  <img
                    src={p.imageUrl}
                    alt={p.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Secondary Image crossfade on hover */}
                  <img
                    src={p.secondImageUrl}
                    alt={`${p.title} detail`}
                    className="w-full h-full object-cover absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  />
                  <span className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm text-brand text-sm font-medium px-2.5 py-1 rounded-lg border border-brand/15 flex items-center gap-1">
                    <Tag className="w-3 h-3" />
                    <span>{p.category}</span>
                  </span>
                </div>

                {/* Details */}
                <div className="p-6 space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="font-serif text-2xl font-medium text-brand transition-colors line-clamp-2">
                      {p.title}
                    </h3>
                  </div>
                  <span className="text-sm text-brand-muted">Sample product</span>
                  <p className="text-stone-500 text-xs sm:text-sm leading-relaxed line-clamp-2">
                    {p.description}
                  </p>
                </div>
              </div>

              {/* Footer pricing & buttons */}
              <div className="px-6 pb-6 pt-2 border-t border-stone-50 flex items-center justify-between gap-2">
                <span className="font-serif font-medium text-2xl text-brand">${p.price.toFixed(2)}</span>
                
                <div className="flex gap-2">
                  <button
                    onClick={() => setQuickViewProduct(p)}
                    className="p-3 rounded-full border border-stone-200 hover:border-brand hover:bg-stone-50 text-brand cursor-pointer"
                    title="Quick View details"
                    aria-label={`Quick view ${p.title}`}
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => addToCart(p)}
                    className="brand-button"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    <span>Add</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* QUICK VIEW MODAL */}
      {quickViewProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop overlay */}
          <div
            onClick={() => setQuickViewProduct(null)}
            className="absolute inset-0 bg-black/60 backdrop-blur-xs"
          />

          {/* Modal Container */}
          <div className="relative bg-white rounded-3xl max-w-3xl w-full border border-brand/15 shadow-2xl p-6 sm:p-8 overflow-y-auto max-h-[90vh] z-10 grid grid-cols-1 md:grid-cols-12 gap-8" role="dialog" aria-modal="true" aria-label={quickViewProduct.title}>
            <button
              onClick={() => setQuickViewProduct(null)}
              className="absolute top-6 right-6 p-1.5 rounded-full border border-stone-200 hover:bg-stone-50 text-stone-500 font-bold"
            >
              ✕
            </button>

            {/* Images Left */}
            <div className="md:col-span-6 space-y-4">
              <div className="aspect-square bg-stone-100 rounded-2xl overflow-hidden border border-stone-200">
                <img
                  src={quickViewProduct.imageUrl}
                  alt={quickViewProduct.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="aspect-[4/3] rounded-xl overflow-hidden border border-stone-200 bg-stone-100">
                  <img
                    src={quickViewProduct.imageUrl}
                    alt="Detail view 1"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="aspect-[4/3] rounded-xl overflow-hidden border border-stone-200 bg-stone-100">
                  <img
                    src={quickViewProduct.secondImageUrl}
                    alt="Detail view 2"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Content Right */}
            <div className="md:col-span-6 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div>
                  <span className="text-base font-medium text-brand">
                    {quickViewProduct.category}
                  </span>
                  <h2 className="font-serif text-3xl font-medium text-brand leading-tight">
                    {quickViewProduct.title}
                  </h2>
                </div>

                <span className="text-base text-brand-muted">Sample product. Details to be confirmed.</span>

                <p className="font-serif font-medium text-2xl text-brand">
                  ${quickViewProduct.price.toFixed(2)}
                </p>

                <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
                  {quickViewProduct.description}
                </p>

                {/* Bullets lists */}
                <div className="space-y-1.5 text-xs text-stone-500 border-t border-stone-100 pt-4">
                  <p className="font-bold text-stone-700">Product Specifications:</p>
                  <ul className="list-disc pl-4 space-y-1">
                    {quickViewProduct.details.map((bullet, idx) => (
                      <li key={idx}>{bullet}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action area */}
              <div className="space-y-4 pt-4 border-t border-stone-100">
                <div className="flex items-center gap-2.5 p-3 bg-brand-soft rounded-xl border border-brand/15 text-base text-brand leading-relaxed">
                  <ShieldAlert className="w-5 h-5 text-brand shrink-0" />
                  <span>
                    This is a sample item. Final products, pricing, and shipping will be confirmed before orders open.
                  </span>
                </div>

                <button
                  onClick={() => {
                    addToCart(quickViewProduct);
                    setQuickViewProduct(null);
                  }}
                  className="brand-button w-full"
                >
                  <ShoppingCart className="w-4.5 h-4.5" />
                  <span>Secure item & Add to Cart</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
