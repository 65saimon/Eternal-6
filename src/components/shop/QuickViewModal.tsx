"use client";

import React, { useState } from "react";
import Link from "next/link";
import { X, ShoppingBag, Heart, Check, Sparkles, Phone } from "lucide-react";
import { ProductItem } from "./ProductCard";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";

interface QuickViewModalProps {
  product: ProductItem | null;
  onClose: () => void;
}

export function QuickViewModal({ product, onClose }: QuickViewModalProps) {
  const { addItem } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const [selectedImgIndex, setSelectedImgIndex] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState<string>("");
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  if (!product) return null;

  const images: string[] = (() => {
    try {
      return JSON.parse(product.images);
    } catch {
      return ["/images/logo/logo-emblem.svg"];
    }
  })();

  const variants = (() => {
    try {
      return JSON.parse(product.variants);
    } catch {
      return [{ id: "v1", name: "Standard", color: "Standard", stock: 10 }];
    }
  })();

  const isWishlisted = isInWishlist(product.id);
  const activePrice = product.salePrice && product.salePrice > 0 ? product.salePrice : product.price;

  const handleAddToCart = () => {
    addItem(
      {
        id: product.id,
        name: product.name,
        slug: product.slug,
        price: product.price,
        salePrice: product.salePrice,
        image: images[0] || "/images/logo/logo-emblem.svg",
        variantId: selectedVariant || variants[0]?.id,
        variantName: variants.find((v: { id: string }) => v.id === selectedVariant)?.name || variants[0]?.name,
        material: product.material,
      },
      quantity
    );
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      onClose();
    }, 1200);
  };

  const whatsappMessage = `Hello Eternal 6! I would like to order "${product.name}" (৳${activePrice}). Could you please confirm availability?`;
  const whatsappUrl = `https://wa.me/8801606266496?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#342722]/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-3xl bg-[#FFF9F2] rounded-3xl shadow-2xl border border-[#D6B878]/50 overflow-hidden flex flex-col md:flex-row max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-white/80 hover:bg-white text-[#342722] flex items-center justify-center shadow transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Image Gallery Column */}
        <div className="w-full md:w-1/2 p-6 flex flex-col justify-between bg-white/60 border-b md:border-b-0 md:border-r border-[#D6B878]/30">
          <div className="relative aspect-square rounded-2xl overflow-hidden bg-[#F4EBDD]/40 mb-4 border border-[#D6B878]/20">
            <img
              src={images[selectedImgIndex] || images[0]}
              alt={product.name}
              className="w-full h-full object-cover object-center"
            />
            {product.isPearlEdit && (
              <span className="absolute top-3 left-3 px-2.5 py-1 text-[10px] font-semibold text-[#342722] bg-[#FFF9F2] border border-[#D6B878] rounded-full shadow-sm flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-[#D6B878]" />
                The Pearl Edit
              </span>
            )}
          </div>

          {/* Thumbnails */}
          {images.length > 1 && (
            <div className="flex gap-2.5 overflow-x-auto pb-1">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImgIndex(i)}
                  className={`w-14 h-14 rounded-xl overflow-hidden border-2 flex-shrink-0 transition-all ${
                    selectedImgIndex === i ? "border-[#D6B878] scale-105 shadow-sm" : "border-transparent opacity-70"
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Details Column */}
        <div className="w-full md:w-1/2 p-6 overflow-y-auto flex flex-col justify-between space-y-4">
          <div>
            <div className="text-[11px] uppercase tracking-widest text-[#8C7654] font-medium mb-1">
              {product.material} • {product.collection}
            </div>
            <h2 className="font-serif-luxury text-xl font-bold text-[#342722] leading-snug">
              {product.name}
            </h2>

            {/* Price in BDT */}
            <div className="flex items-baseline gap-3 my-3">
              <span className="text-2xl font-bold text-[#342722] font-mono">
                ৳{activePrice.toLocaleString()}
              </span>
              {product.salePrice && product.salePrice < product.price && (
                <span className="text-sm text-[#8C7654]/70 line-through font-mono">
                  ৳{product.price.toLocaleString()}
                </span>
              )}
              <span className="text-xs bg-[#B89A58]/20 text-[#8C6E33] font-semibold px-2 py-0.5 rounded-full">
                Cash on Delivery Available
              </span>
            </div>

            <p className="text-xs text-[#342722]/80 leading-relaxed mb-4">
              {product.description}
            </p>

            {/* Quantity */}
            <div className="flex items-center gap-4 mb-4">
              <span className="text-xs text-[#8C7654] font-semibold uppercase tracking-wider">Quantity:</span>
              <div className="flex items-center border border-[#D6B878]/50 rounded-lg bg-white overflow-hidden">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-3 py-1 text-sm text-[#342722] hover:bg-[#F4EBDD]"
                >
                  -
                </button>
                <span className="px-3 py-1 text-xs font-mono font-bold text-[#342722]">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="px-3 py-1 text-sm text-[#342722] hover:bg-[#F4EBDD]"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="space-y-2 pt-2 border-t border-[#D6B878]/30">
            <button
              onClick={handleAddToCart}
              disabled={added}
              className={`w-full py-3 rounded-full text-xs font-bold uppercase tracking-widest transition-all shadow-md flex items-center justify-center gap-2 ${
                added
                  ? "bg-emerald-600 text-white"
                  : "bg-[#342722] hover:bg-[#4A3932] text-[#FFF9F2]"
              }`}
            >
              {added ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Added to Boutique Bag</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4 text-[#D6B878]" />
                  <span>Add to Bag — ৳{(activePrice * quantity).toLocaleString()}</span>
                </>
              )}
            </button>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-[#25D366] hover:bg-[#1EBE5D] text-white flex items-center justify-center gap-2 shadow-sm transition-colors"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Order via WhatsApp</span>
            </a>

            <div className="flex items-center justify-between pt-1 text-xs">
              <button
                onClick={() => toggleWishlist(product.id)}
                className="text-[#8C7654] hover:text-[#342722] flex items-center gap-1.5 transition-colors"
              >
                <Heart className={`w-3.5 h-3.5 ${isWishlisted ? "fill-rose-600 text-rose-600" : ""}`} />
                <span>{isWishlisted ? "Saved to Wishlist" : "Save to Wishlist"}</span>
              </button>

              <Link
                href={`/products/${product.slug}`}
                onClick={onClose}
                className="text-[#9C7938] hover:underline font-semibold"
              >
                View Full Specifications →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
