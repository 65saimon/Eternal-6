"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { ProductCard, ProductItem } from "@/components/shop/ProductCard";
import { QuickViewModal } from "@/components/shop/QuickViewModal";
import { PearlDivider } from "@/components/ui/PearlDivider";
import { useWishlist } from "@/context/WishlistContext";
import {
  Search,
  Filter,
  SlidersHorizontal,
  X,
  Sparkles,
  ShoppingBag,
  RotateCcw
} from "lucide-react";

function ShopContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  const initialCategory = searchParams.get("category") || "All";
  const initialMaterial = searchParams.get("material") || "All";
  const initialCollection = searchParams.get("collection") || "All";
  const initialWishlistOnly = searchParams.get("wishlist") === "true";

  const { items: wishlistIds } = useWishlist();

  const [products, setProducts] = useState<ProductItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Filters state
  const [search, setSearch] = useState(initialQuery);
  const [category, setCategory] = useState(initialCategory);
  const [material, setMaterial] = useState(initialMaterial);
  const [collection, setCollection] = useState(initialCollection);
  const [sort, setSort] = useState("newest");
  const [priceMax, setPriceMax] = useState(2500);
  const [wishlistOnly, setWishlistOnly] = useState(initialWishlistOnly);

  // Quick view state
  const [quickViewProduct, setQuickViewProduct] = useState<ProductItem | null>(null);

  // Mobile filters drawer
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  useEffect(() => {
    async function loadProducts() {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        if (category !== "All") params.set("category", category);
        if (material !== "All") params.set("material", material);
        if (collection !== "All") params.set("collection", collection);
        if (search) params.set("q", search);
        if (sort) params.set("sort", sort);

        const res = await fetch(`/api/products?${params.toString()}`);
        const data = await res.json();
        if (data.success) {
          setProducts(data.products);
        }
      } catch (err) {
        console.error("Failed to load products:", err);
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, [category, material, collection, search, sort]);

  // Client-side additional filters (price slider, wishlist)
  const filteredProducts = products.filter((p) => {
    const activePrice = p.salePrice && p.salePrice > 0 ? p.salePrice : p.price;
    if (activePrice > priceMax) return false;
    if (wishlistOnly && !wishlistIds.includes(p.id)) return false;
    return true;
  });

  const categories = ["All", "Hijabs", "Gift Sets"];
  const materials = ["All", "Georgette", "Zafran", "Muna Jori"];
  const collections = [
    "All",
    "Everyday Elegance",
    "The Pearl Edit",
    "Premium Chiffon",
    "Bridal Collection",
    "Gift Sets",
  ];

  const resetFilters = () => {
    setSearch("");
    setCategory("All");
    setMaterial("All");
    setCollection("All");
    setSort("newest");
    setPriceMax(2500);
    setWishlistOnly(false);
  };

  const hasActiveFilters =
    search !== "" ||
    category !== "All" ||
    material !== "All" ||
    collection !== "All" ||
    priceMax < 2500 ||
    wishlistOnly;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      {/* Header Banner */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <span className="text-xs uppercase tracking-[0.25em] text-[#8C7654] font-semibold">
          CHATTOGRAM ATELIER CATALOG
        </span>
        <h1 className="font-serif-luxury text-3xl sm:text-5xl font-bold text-[#342722] mt-1">
          {wishlistOnly ? "My Wishlist" : "Shop All Creations"}
        </h1>
        <PearlDivider className="my-4" />
        <p className="text-sm text-[#342722]/70">
          Handcrafted stone-work hijabs, lightweight Zafran block prints, and bespoke heirloom gift sets in Bangladeshi Taka (৳).
        </p>
      </div>

      {/* Top Filter & Sort Bar */}
      <div className="bg-white/80 backdrop-blur-md rounded-2xl p-4 mb-8 border border-[#D6B878]/30 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8C7654]" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by color, fabric, motif..."
            className="w-full pl-10 pr-4 py-2 text-xs rounded-xl border border-[#D6B878]/40 bg-[#FFF9F2] text-[#342722] placeholder-[#8C7654]/60 focus:outline-none focus:border-[#B89A58]"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Right Controls */}
        <div className="flex items-center justify-between w-full md:w-auto gap-3">
          {/* Mobile Filter Toggle */}
          <button
            onClick={() => setMobileFilterOpen(true)}
            className="md:hidden flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#FFF9F2] border border-[#D6B878]/40 text-xs font-semibold text-[#342722]"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#B89A58]" />
            <span>Filters</span>
            {hasActiveFilters && (
              <span className="w-2 h-2 rounded-full bg-[#B89A58]" />
            )}
          </button>

          {/* Wishlist toggle */}
          <button
            onClick={() => setWishlistOnly(!wishlistOnly)}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all border ${
              wishlistOnly
                ? "bg-rose-50 border-rose-300 text-rose-700"
                : "bg-[#FFF9F2] border-[#D6B878]/40 text-[#342722] hover:bg-[#F4EBDD]"
            }`}
          >
            Wishlist ({wishlistIds.length})
          </button>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2 text-xs">
            <span className="text-[#8C7654] font-medium hidden sm:inline">Sort:</span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="px-3 py-2 rounded-xl border border-[#D6B878]/40 bg-[#FFF9F2] text-[#342722] text-xs font-medium focus:outline-none focus:border-[#B89A58]"
            >
              <option value="newest">Newest Arrivals</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="name">Alphabetical</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Grid with Sidebar on Desktop */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Desktop Sidebar Filters */}
        <div className="hidden lg:block space-y-6 bg-white/70 p-6 rounded-2xl border border-[#D6B878]/30 h-fit sticky top-28">
          <div className="flex items-center justify-between pb-4 border-b border-[#D6B878]/30">
            <div className="flex items-center gap-2 font-serif-luxury font-bold text-sm text-[#342722]">
              <Filter className="w-4 h-4 text-[#B89A58]" />
              <span>Refine Catalog</span>
            </div>
            {hasActiveFilters && (
              <button
                onClick={resetFilters}
                className="text-[11px] text-[#8C6E33] hover:underline flex items-center gap-1"
              >
                <RotateCcw className="w-3 h-3" />
                Reset
              </button>
            )}
          </div>

          {/* Collections */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#8C7654]">
              Collections
            </h4>
            <div className="space-y-1">
              {collections.map((col) => (
                <button
                  key={col}
                  onClick={() => setCollection(col)}
                  className={`w-full text-left text-xs py-1.5 px-2.5 rounded-lg transition-colors flex items-center justify-between ${
                    collection === col
                      ? "bg-[#342722] text-[#FFF9F2] font-semibold"
                      : "text-[#342722]/80 hover:bg-[#F4EBDD]"
                  }`}
                >
                  <span>{col}</span>
                  {col === "The Pearl Edit" && <Sparkles className="w-3 h-3 text-[#D6B878]" />}
                </button>
              ))}
            </div>
          </div>

          {/* Fabrics / Materials */}
          <div className="space-y-2 pt-2 border-t border-[#D6B878]/20">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#8C7654]">
              Fabric Material
            </h4>
            <div className="space-y-1">
              {materials.map((mat) => (
                <button
                  key={mat}
                  onClick={() => setMaterial(mat)}
                  className={`w-full text-left text-xs py-1.5 px-2.5 rounded-lg transition-colors ${
                    material === mat
                      ? "bg-[#342722] text-[#FFF9F2] font-semibold"
                      : "text-[#342722]/80 hover:bg-[#F4EBDD]"
                  }`}
                >
                  {mat}
                </button>
              ))}
            </div>
          </div>

          {/* Price Range Slider */}
          <div className="space-y-2 pt-2 border-t border-[#D6B878]/20">
            <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[#8C7654]">
              <span>Max Price</span>
              <span className="font-mono text-[#342722]">৳{priceMax.toLocaleString()}</span>
            </div>
            <input
              type="range"
              min="400"
              max="2500"
              step="50"
              value={priceMax}
              onChange={(e) => setPriceMax(Number(e.target.value))}
              className="w-full accent-[#B89A58]"
            />
            <div className="flex justify-between text-[10px] text-[#8C7654] font-mono">
              <span>৳400</span>
              <span>৳2,500</span>
            </div>
          </div>
        </div>

        {/* Product Cards Grid Column */}
        <div className="lg:col-span-3">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="animate-pulse bg-white rounded-2xl h-80 border border-[#D6B878]/20 p-4 space-y-4">
                  <div className="bg-[#F4EBDD]/60 rounded-xl h-48 w-full" />
                  <div className="bg-[#F4EBDD]/60 h-4 rounded w-3/4" />
                  <div className="bg-[#F4EBDD]/60 h-4 rounded w-1/2" />
                </div>
              ))}
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="bg-white/80 rounded-2xl p-12 text-center border border-[#D6B878]/30 space-y-4">
              <ShoppingBag className="w-12 h-12 text-[#D6B878] mx-auto opacity-70" />
              <h3 className="font-serif-luxury text-xl font-bold text-[#342722]">
                No Creations Match Your Selection
              </h3>
              <p className="text-xs text-[#342722]/70 max-w-sm mx-auto">
                Try widening your price range, clearing active fabric filters, or contacting our boutique stylists for custom orders.
              </p>
              <button
                onClick={resetFilters}
                className="px-6 py-2.5 rounded-full bg-[#342722] text-[#FFF9F2] text-xs font-semibold uppercase tracking-wider transition-colors hover:bg-[#4A3932]"
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between mb-4 text-xs text-[#8C7654]">
                <span>Showing <strong>{filteredProducts.length}</strong> creations</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {filteredProducts.map((p) => (
                  <ProductCard
                    key={p.id}
                    product={p}
                    onQuickView={(prod) => setQuickViewProduct(prod)}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Quick View Modal */}
      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />

      {/* Mobile Filters Modal */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setMobileFilterOpen(false)}
          />
          <div className="relative w-4/5 max-w-sm bg-[#FFF9F2] h-full shadow-2xl p-6 overflow-y-auto space-y-6 z-10 border-r border-[#D6B878]">
            <div className="flex items-center justify-between pb-4 border-b border-[#D6B878]/30">
              <h3 className="font-serif-luxury font-bold text-base text-[#342722]">Filters</h3>
              <button onClick={() => setMobileFilterOpen(false)} className="p-1">
                <X className="w-5 h-5 text-[#342722]" />
              </button>
            </div>

            {/* Mobile Collections */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase text-[#8C7654]">Collection</h4>
              {collections.map((col) => (
                <button
                  key={col}
                  onClick={() => {
                    setCollection(col);
                    setMobileFilterOpen(false);
                  }}
                  className={`w-full text-left text-xs py-2 px-3 rounded-lg ${
                    collection === col ? "bg-[#342722] text-white font-bold" : "text-[#342722]"
                  }`}
                >
                  {col}
                </button>
              ))}
            </div>

            {/* Mobile Fabrics */}
            <div className="space-y-2 pt-2 border-t border-[#D6B878]/20">
              <h4 className="text-xs font-bold uppercase text-[#8C7654]">Fabric</h4>
              {materials.map((mat) => (
                <button
                  key={mat}
                  onClick={() => {
                    setMaterial(mat);
                    setMobileFilterOpen(false);
                  }}
                  className={`w-full text-left text-xs py-2 px-3 rounded-lg ${
                    material === mat ? "bg-[#342722] text-white font-bold" : "text-[#342722]"
                  }`}
                >
                  {mat}
                </button>
              ))}
            </div>

            {/* Mobile Price */}
            <div className="space-y-2 pt-2 border-t border-[#D6B878]/20">
              <div className="flex justify-between text-xs font-bold text-[#8C7654]">
                <span>Max Price:</span>
                <span className="font-mono text-[#342722]">৳{priceMax}</span>
              </div>
              <input
                type="range"
                min="400"
                max="2500"
                step="50"
                value={priceMax}
                onChange={(e) => setPriceMax(Number(e.target.value))}
                className="w-full accent-[#B89A58]"
              />
            </div>

            <button
              onClick={() => {
                resetFilters();
                setMobileFilterOpen(false);
              }}
              className="w-full py-2.5 rounded-full border border-[#D6B878] text-xs font-semibold text-[#342722]"
            >
              Reset Filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-xs text-[#8C7654]">Loading Eternal 6 boutique...</div>}>
      <ShopContent />
    </Suspense>
  );
}
