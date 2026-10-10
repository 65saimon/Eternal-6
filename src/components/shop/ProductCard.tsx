"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Heart, ShoppingBag, Eye, Sparkles, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";

export interface ProductItem {
  id: string;
  sku: string;
  name: string;
  slug: string;
  description: string;
  category: string;
  collection: string;
  price: number;
  salePrice?: number | null;
  material: string;
  colors: string; // JSON
  variants: string; // JSON
  stock: number;
  images: string; // JSON
  isPearlEdit?: boolean;
  careInstructions?: string | null;
}

interface ProductCardProps {
  product: ProductItem;
  onQuickView?: (product: ProductItem) => void;
}

export function ProductCard({ product, onQuickView }: ProductCardProps) {
  const { addItem } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const [added, setAdded] = useState(false);

  const images: string[] = (() => {
    try {
      return JSON.parse(product.images);
    } catch {
      return ["/images/logo/logo-emblem.svg"];
    }
  })();

  const primaryImage = images[0] || "/images/logo/logo-emblem.svg";
  const hoverImage = images[1] || primaryImage;
  const isWishlisted = isInWishlist(product.id);

  const hasDiscount = product.salePrice && product.salePrice < product.price;
  const discountPercent = hasDiscount
    ? Math.round(((product.price - (product.salePrice || 0)) / product.price) * 100)
    : 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    addItem(
      {
        id: product.id,
        name: product.name,
        slug: product.slug,
        price: product.salePrice ?? product.price,
        image: primaryImage,
        variantName: "Standard",
        material: product.material,
      },
      1
    );

    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 350, damping: 25 }}
      className="group relative flex flex-col bg-white dark:bg-[#1A1310] rounded-2xl overflow-hidden border border-[#D6B878]/30 dark:border-[#D6B878]/20 shadow-sm hover:shadow-2xl hover:border-[#D6B878]/70 transition-all duration-300 sheen-overlay"
    >
      {/* Top Badges */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5">
        {hasDiscount && (
          <span className="px-2.5 py-1 text-[11px] font-bold tracking-wider text-white bg-[#B89A58] rounded-full shadow-sm animate-pulse">
            {discountPercent}% OFF
          </span>
        )}
        {product.isPearlEdit && (
          <span className="px-2.5 py-0.5 text-[10px] font-medium tracking-wide text-[#342722] dark:text-[#FAF5EE] bg-[#FFF9F2] dark:bg-[#2A1F19] border border-[#D6B878] rounded-full shadow-sm flex items-center gap-1">
            <Sparkles className="w-2.5 h-2.5 text-[#D6B878]" />
            Pearl Edit
          </span>
        )}
      </div>

      {/* Wishlist Button with Spring Tap */}
      <motion.button
        whileHover={{ scale: 1.15 }}
        whileTap={{ scale: 0.8 }}
        transition={{ type: "spring", stiffness: 500, damping: 15 }}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          toggleWishlist(product.id);
        }}
        className={`absolute top-3 right-3 z-10 w-8 h-8 rounded-full flex items-center justify-center transition-all ${
          isWishlisted
            ? "bg-rose-50 text-rose-600 shadow"
            : "bg-white/80 dark:bg-[#1A1310]/80 backdrop-blur-sm text-[#342722]/70 dark:text-[#FAF5EE]/70 hover:text-rose-600 hover:bg-white"
        }`}
        aria-label="Toggle Wishlist"
      >
        <Heart className={`w-4 h-4 ${isWishlisted ? "fill-rose-600 text-rose-600" : ""}`} />
      </motion.button>

      {/* Image Container */}
      <Link href={`/products/${product.slug}`} className="relative aspect-[4/5] overflow-hidden bg-[#F4EBDD]/40 dark:bg-[#241A15]">
        <img
          src={primaryImage}
          alt={product.name}
          className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-108"
          loading="lazy"
        />

        {/* Quick View Hover Button */}
        {onQuickView && (
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onQuickView(product);
            }}
            className="absolute bottom-3 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 translate-y-2 transition-all duration-300 bg-white/95 dark:bg-[#1A1310]/95 backdrop-blur-sm text-[#342722] dark:text-[#FAF5EE] hover:text-[#B89A58] text-xs font-medium px-4 py-2 rounded-full shadow-md flex items-center gap-1.5 border border-[#D6B878]/40"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Quick View</span>
          </button>
        )}
      </Link>

      {/* Details Container */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div>
          {/* Material & Collection */}
          <div className="flex items-center justify-between text-[11px] text-[#8C7654] dark:text-[#D6B878] uppercase tracking-wider font-medium mb-1">
            <span>{product.material}</span>
            <span className="text-[#342722]/50 dark:text-[#FAF5EE]/50">{product.collection}</span>
          </div>

          {/* Product Name */}
          <Link href={`/products/${product.slug}`}>
            <h3 className="font-serif-luxury text-sm font-semibold text-[#342722] dark:text-[#FAF5EE] line-clamp-2 hover:text-[#B89A58] transition-colors leading-snug">
              {product.name}
            </h3>
          </Link>
        </div>

        {/* Price & Action */}
        <div className="pt-2 border-t border-[#D6B878]/20 flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-base font-bold text-[#342722] dark:text-[#FAF5EE] font-mono">
              ৳{(product.salePrice ?? product.price).toLocaleString()}
            </span>
            {hasDiscount && (
              <span className="text-xs text-[#8C7654]/70 dark:text-[#D6B878]/70 line-through font-mono">
                ৳{product.price.toLocaleString()}
              </span>
            )}
          </div>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.88 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
            onClick={handleAddToCart}
            disabled={added}
            className={`p-2.5 rounded-full transition-all flex items-center justify-center ${
              added
                ? "bg-emerald-600 text-white shadow-md"
                : "bg-[#342722] hover:bg-[#4A3932] dark:bg-[#D6B878] dark:hover:bg-[#E5C98E] text-[#FFF9F2] dark:text-[#140F0D] shadow-sm"
            }`}
            aria-label="Add to cart"
            title="Add to Cart"
          >
            <AnimatePresence mode="wait">
              {added ? (
                <motion.div
                  key="check"
                  initial={{ scale: 0, rotate: -45 }}
                  animate={{ scale: 1, rotate: 0 }}
                  exit={{ scale: 0 }}
                  transition={{ type: "spring", stiffness: 500, damping: 20 }}
                >
                  <Check className="w-4 h-4" />
                </motion.div>
              ) : (
                <motion.div
                  key="bag"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                >
                  <ShoppingBag className="w-4 h-4" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
