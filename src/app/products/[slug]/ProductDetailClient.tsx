"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ProductItem } from "@/components/shop/ProductCard";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import {
  ShoppingBag,
  Heart,
  Sparkles,
  Truck,
  RotateCcw,
  ShieldCheck,
  Check,
  Phone,
  ChevronDown,
  Layers,
  Share2
} from "lucide-react";

interface Props {
  product: ProductItem;
}

export function ProductDetailClient({ product }: Props) {
  const router = useRouter();
  const { addItem } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

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
      return [{ id: "v1", name: "Standard (75\" x 30\")", color: "Standard", stock: 10 }];
    }
  })();

  const [activeImgIndex, setActiveImgIndex] = useState(0);
  const [selectedVariantId, setSelectedVariantId] = useState(variants[0]?.id || "v1");
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [openAccordion, setOpenAccordion] = useState<string | null>("delivery");

  const isWishlisted = isInWishlist(product.id);
  const activePrice = product.salePrice && product.salePrice > 0 ? product.salePrice : product.price;
  const hasDiscount = product.salePrice && product.salePrice < product.price;
  const discountPercent = hasDiscount
    ? Math.round(((product.price - (product.salePrice || 0)) / product.price) * 100)
    : 0;

  const handleAddToCart = () => {
    const selectedVariant = variants.find((v: { id: string }) => v.id === selectedVariantId) || variants[0];
    addItem(
      {
        id: product.id,
        name: product.name,
        slug: product.slug,
        price: product.price,
        salePrice: product.salePrice,
        image: images[0] || "/images/logo/logo-emblem.svg",
        variantId: selectedVariant?.id,
        variantName: selectedVariant?.name,
        material: product.material,
      },
      quantity
    );
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleBuyNow = () => {
    handleAddToCart();
    router.push("/checkout");
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: `Look at this beautiful hijab from Eternal 6: ${product.name}`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Product link copied to clipboard!");
    }
  };

  const whatsappMessage = `Hello Eternal 6! I would like to order "${product.name}" (৳${activePrice}). Could you please confirm availability and delivery?`;
  const whatsappUrl = `https://wa.me/8801606266496?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
      {/* 1. Left Gallery Column (7 cols) */}
      <div className="lg:col-span-7 space-y-4">
        {/* Main Display Image */}
        <div className="relative aspect-[4/5] rounded-3xl overflow-hidden bg-white border border-[#D6B878]/40 shadow-lg">
          <img
            src={images[activeImgIndex] || images[0]}
            alt={product.name}
            className="w-full h-full object-cover object-center transition-all duration-300"
          />

          {/* Badges */}
          <div className="absolute top-4 left-4 flex flex-col gap-2">
            {hasDiscount && (
              <span className="px-3 py-1 bg-[#B89A58] text-white font-bold text-xs tracking-wider rounded-full shadow">
                {discountPercent}% OFF
              </span>
            )}
            {product.isPearlEdit && (
              <span className="px-3 py-1 bg-[#FFF9F2] text-[#342722] border border-[#D6B878] font-semibold text-xs tracking-wide rounded-full shadow flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-[#D6B878]" />
                The Pearl Edit
              </span>
            )}
          </div>

          {/* Wishlist & Share buttons */}
          <div className="absolute top-4 right-4 flex items-center gap-2">
            <button
              onClick={handleShare}
              className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm text-[#342722] hover:text-[#B89A58] flex items-center justify-center shadow transition-colors"
              aria-label="Share product"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => toggleWishlist(product.id)}
              className={`w-10 h-10 rounded-full flex items-center justify-center shadow transition-colors ${
                isWishlisted
                  ? "bg-rose-50 text-rose-600"
                  : "bg-white/90 backdrop-blur-sm text-[#342722] hover:text-rose-600"
              }`}
              aria-label="Save to Wishlist"
            >
              <Heart className={`w-4 h-4 ${isWishlisted ? "fill-rose-600" : ""}`} />
            </button>
          </div>
        </div>

        {/* Thumbnail Selector */}
        {images.length > 1 && (
          <div className="flex items-center gap-3 overflow-x-auto pb-2">
            {images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImgIndex(idx)}
                className={`relative w-20 h-24 rounded-xl overflow-hidden border-2 transition-all flex-shrink-0 ${
                  activeImgIndex === idx
                    ? "border-[#B89A58] shadow-md scale-105"
                    : "border-transparent opacity-70 hover:opacity-100"
                }`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* 2. Right Specification & Buy Column (5 cols) */}
      <div className="lg:col-span-5 space-y-6">
        <div>
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-[#8C7654] font-semibold mb-2">
            <span>{product.material}</span>
            <span>•</span>
            <span>{product.collection}</span>
          </div>

          <h1 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-[#342722] leading-tight">
            {product.name}
          </h1>

          <div className="text-xs text-[#8C7654] mt-1 font-mono">
            SKU: {product.sku}
          </div>
        </div>

        {/* Price & Stock */}
        <div className="p-4 rounded-2xl bg-white border border-[#D6B878]/30 shadow-sm space-y-2">
          <div className="flex items-baseline gap-3">
            <span className="text-3xl font-bold text-[#342722] font-mono">
              ৳{activePrice.toLocaleString()}
            </span>
            {hasDiscount && (
              <span className="text-base text-[#8C7654]/70 line-through font-mono">
                ৳{product.price.toLocaleString()}
              </span>
            )}
            <span className="text-xs text-[#342722] bg-[#F4EBDD] font-medium px-2.5 py-1 rounded-full border border-[#D6B878]/40">
              BDT
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs text-emerald-700 font-medium pt-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>In Stock ({product.stock} available in Chattogram atelier)</span>
          </div>
        </div>

        {/* Description */}
        <div className="text-xs sm:text-sm text-[#342722]/80 leading-relaxed space-y-2">
          <p>{product.description}</p>
        </div>

        {/* Variant Picker */}
        {variants.length > 0 && (
          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-[#8C7654] block">
              Size / Variant:
            </label>
            <div className="flex flex-wrap gap-2">
              {variants.map((v: any) => (
                <button
                  key={v.id}
                  onClick={() => setSelectedVariantId(v.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-medium border transition-all ${
                    selectedVariantId === v.id
                      ? "bg-[#342722] text-[#FFF9F2] border-[#342722] shadow"
                      : "bg-white text-[#342722] border-[#D6B878]/50 hover:bg-[#F4EBDD]"
                  }`}
                >
                  {v.name}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Quantity */}
        <div className="flex items-center gap-4">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#8C7654]">
            Quantity:
          </span>
          <div className="flex items-center border border-[#D6B878]/50 rounded-xl bg-white overflow-hidden">
            <button
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="px-3.5 py-1.5 text-sm text-[#342722] hover:bg-[#F4EBDD]"
            >
              -
            </button>
            <span className="px-4 py-1.5 text-xs font-mono font-bold text-[#342722]">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
              className="px-3.5 py-1.5 text-sm text-[#342722] hover:bg-[#F4EBDD]"
            >
              +
            </button>
          </div>
        </div>

        {/* CTAs */}
        <div className="space-y-3 pt-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              onClick={handleAddToCart}
              disabled={added}
              className={`py-3.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2 ${
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
                  <span>Add to Bag</span>
                </>
              )}
            </button>

            <button
              onClick={handleBuyNow}
              className="py-3.5 rounded-full text-xs font-bold uppercase tracking-wider bg-[#B89A58] hover:bg-[#9C7938] text-white transition-all shadow-md flex items-center justify-center gap-2"
            >
              <span>Instant Checkout</span>
            </button>
          </div>

          {/* WhatsApp Direct Order CTA */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3 rounded-full text-xs font-semibold uppercase tracking-wider bg-[#25D366] hover:bg-[#1EBE5D] text-white flex items-center justify-center gap-2 shadow transition-colors"
          >
            <Phone className="w-4 h-4" />
            <span>Order via WhatsApp Direct</span>
          </a>
        </div>

        {/* Accordions (Delivery, Returns, Care) */}
        <div className="pt-4 border-t border-[#D6B878]/30 space-y-2">
          {/* Delivery */}
          <div className="border border-[#D6B878]/30 rounded-xl overflow-hidden bg-white/70">
            <button
              onClick={() => setOpenAccordion(openAccordion === "delivery" ? null : "delivery")}
              className="w-full p-3.5 text-left text-xs font-bold uppercase tracking-wider text-[#342722] flex items-center justify-between"
            >
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-[#B89A58]" />
                <span>Delivery Charges & Timelines</span>
              </div>
              <ChevronDown className={`w-4 h-4 transition-transform ${openAccordion === "delivery" ? "rotate-180" : ""}`} />
            </button>
            {openAccordion === "delivery" && (
              <div className="p-3.5 pt-0 text-xs text-[#342722]/80 space-y-1.5 border-t border-[#D6B878]/20 bg-white">
                <p>• <strong>Chattogram:</strong> ৳70 (Delivered within 24 - 48 hours).</p>
                <p>• <strong>Outside Chattogram:</strong> ৳130 (Delivered within 2 - 4 business days).</p>
                <p>• <strong>Complimentary Delivery:</strong> On all orders above ৳2,500.</p>
                <p>• <strong>Cash on Delivery:</strong> Available across all 64 districts in Bangladesh.</p>
              </div>
            )}
          </div>

          {/* Returns & Exchanges */}
          <div className="border border-[#D6B878]/30 rounded-xl overflow-hidden bg-white/70">
            <button
              onClick={() => setOpenAccordion(openAccordion === "returns" ? null : "returns")}
              className="w-full p-3.5 text-left text-xs font-bold uppercase tracking-wider text-[#342722] flex items-center justify-between"
            >
              <div className="flex items-center gap-2">
                <RotateCcw className="w-4 h-4 text-[#B89A58]" />
                <span>7-Day Return & Exchange Guarantee</span>
              </div>
              <ChevronDown className={`w-4 h-4 transition-transform ${openAccordion === "returns" ? "rotate-180" : ""}`} />
            </button>
            {openAccordion === "returns" && (
              <div className="p-3.5 pt-0 text-xs text-[#342722]/80 space-y-1.5 border-t border-[#D6B878]/20 bg-white">
                <p>If you receive a defective piece or incorrect shade, please inspect during delivery or contact us within 7 days with the original packaging intact.</p>
              </div>
            )}
          </div>

          {/* Fabric Care */}
          <div className="border border-[#D6B878]/30 rounded-xl overflow-hidden bg-white/70">
            <button
              onClick={() => setOpenAccordion(openAccordion === "care" ? null : "care")}
              className="w-full p-3.5 text-left text-xs font-bold uppercase tracking-wider text-[#342722] flex items-center justify-between"
            >
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-[#B89A58]" />
                <span>Fabric & Handcraft Care</span>
              </div>
              <ChevronDown className={`w-4 h-4 transition-transform ${openAccordion === "care" ? "rotate-180" : ""}`} />
            </button>
            {openAccordion === "care" && (
              <div className="p-3.5 pt-0 text-xs text-[#342722]/80 space-y-1.5 border-t border-[#D6B878]/20 bg-white">
                <p>{product.careInstructions || "Gentle cold water hand wash. Protect stone and pearl embellishments during ironing."}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
