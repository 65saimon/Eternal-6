"use client";

import React from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { PearlDivider } from "@/components/ui/PearlDivider";
import {
  ShoppingBag,
  Trash2,
  ArrowRight,
  ShieldCheck,
  Truck,
  RotateCcw,
  Sparkles
} from "lucide-react";

export default function CartPage() {
  const {
    items,
    updateQuantity,
    removeItem,
    clearCart,
    subtotal,
    deliveryZone,
    setDeliveryZone,
    deliveryCharge,
    total,
  } = useCart();

  const freeDeliveryRemaining = Math.max(0, 2500 - subtotal);

  if (items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-20 h-20 rounded-full bg-[#F4EBDD] flex items-center justify-center mx-auto text-[#B89A58] shadow-inner">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <h1 className="font-serif-luxury text-3xl font-bold text-[#342722]">
          Your Boutique Bag is Empty
        </h1>
        <p className="text-sm text-[#342722]/70 max-w-md mx-auto">
          Explore our handcrafted stone-work hijabs, breathable Zafran wraps, and signature Pearl Edit creations.
        </p>
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#342722] hover:bg-[#4A3932] text-[#FFF9F2] text-xs font-bold uppercase tracking-wider transition-all shadow-md"
        >
          <span>Explore Boutique Collections</span>
          <ArrowRight className="w-4 h-4 text-[#D6B878]" />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-8">
      {/* Header */}
      <div>
        <span className="text-xs uppercase tracking-[0.22em] text-[#8C7654] font-semibold">
          YOUR SELECTIONS
        </span>
        <h1 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-[#342722] mt-1">
          Boutique Shopping Bag
        </h1>
        <PearlDivider className="my-4" />
      </div>

      {/* Free Delivery Progress Banner */}
      <div className="bg-white p-4 rounded-2xl border border-[#D6B878]/40 shadow-sm flex items-center gap-3">
        <Sparkles className="w-5 h-5 text-[#B89A58] flex-shrink-0" />
        <div className="flex-1 text-xs text-[#342722]">
          {freeDeliveryRemaining > 0 ? (
            <span>
              Add <strong className="font-mono text-[#B89A58]">৳{freeDeliveryRemaining.toLocaleString()}</strong> more to your bag to enjoy <strong>Complimentary Delivery</strong> anywhere in Bangladesh!
            </span>
          ) : (
            <span className="text-emerald-700 font-bold">
              🎉 Congratulations! You have unlocked Complimentary Delivery across Bangladesh!
            </span>
          )}
        </div>
      </div>

      {/* Main Grid: Items vs Order Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Items List (8 cols) */}
        <div className="lg:col-span-8 bg-white rounded-3xl p-6 border border-[#D6B878]/30 shadow-sm space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-[#D6B878]/20">
            <span className="text-xs uppercase tracking-wider font-semibold text-[#8C7654]">
              {items.length} Unique Creation{items.length > 1 ? "s" : ""}
            </span>
            <button
              onClick={clearCart}
              className="text-xs text-rose-600 hover:underline"
            >
              Clear Entire Bag
            </button>
          </div>

          <div className="divide-y divide-[#D6B878]/20">
            {items.map((item) => {
              const activePrice = item.salePrice && item.salePrice > 0 ? item.salePrice : item.price;
              const itemTotal = activePrice * item.quantity;

              return (
                <div key={item.id} className="py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  {/* Image & Title */}
                  <div className="flex items-center gap-4">
                    <div className="w-20 h-24 rounded-xl overflow-hidden bg-[#F4EBDD]/50 border border-[#D6B878]/30 flex-shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <Link href={`/products/${item.slug}`} className="hover:text-[#B89A58] transition-colors">
                        <h3 className="font-serif-luxury text-base font-semibold text-[#342722]">
                          {item.name}
                        </h3>
                      </Link>
                      <div className="text-xs text-[#8C7654] mt-0.5">
                        {item.material && <span>{item.material} • </span>}
                        <span>{item.variantName || "Standard"}</span>
                      </div>
                      <div className="text-xs font-mono font-bold text-[#342722] mt-1 sm:hidden">
                        ৳{activePrice.toLocaleString()} × {item.quantity} = ৳{itemTotal.toLocaleString()}
                      </div>
                    </div>
                  </div>

                  {/* Quantity & Actions */}
                  <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-6">
                    {/* Quantity controls */}
                    <div className="flex items-center border border-[#D6B878]/40 rounded-xl bg-[#FFF9F2] overflow-hidden">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="px-3 py-1 text-sm text-[#342722] hover:bg-[#F4EBDD]"
                      >
                        -
                      </button>
                      <span className="px-3 py-1 text-xs font-mono font-bold text-[#342722]">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="px-3 py-1 text-sm text-[#342722] hover:bg-[#F4EBDD]"
                      >
                        +
                      </button>
                    </div>

                    {/* Total Price */}
                    <div className="hidden sm:block text-right">
                      <div className="font-mono text-sm font-bold text-[#342722]">
                        ৳{itemTotal.toLocaleString()}
                      </div>
                      {item.salePrice && item.salePrice < item.price && (
                        <div className="text-[11px] text-[#8C7654]/70 line-through font-mono">
                          ৳{(item.price * item.quantity).toLocaleString()}
                        </div>
                      )}
                    </div>

                    {/* Remove button */}
                    <button
                      onClick={() => removeItem(item.id)}
                      className="p-2 text-gray-400 hover:text-rose-600 transition-colors"
                      title="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="pt-4 border-t border-[#D6B878]/20 flex justify-between items-center text-xs">
            <Link href="/shop" className="text-[#8C6E33] hover:underline font-semibold">
              ← Continue Shopping
            </Link>
          </div>
        </div>

        {/* Order Summary Column (4 cols) */}
        <div className="lg:col-span-4 bg-white rounded-3xl p-6 border border-[#D6B878]/40 shadow-sm space-y-6">
          <h2 className="font-serif-luxury text-lg font-bold text-[#342722] pb-3 border-b border-[#D6B878]/30">
            Order Summary
          </h2>

          {/* Delivery Zone Selector */}
          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-[#8C7654] block">
              Delivery Destination:
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setDeliveryZone("chittagong")}
                className={`p-2.5 rounded-xl text-xs font-medium border text-center transition-all ${
                  deliveryZone === "chittagong"
                    ? "bg-[#342722] text-[#FFF9F2] border-[#342722] shadow"
                    : "bg-[#FFF9F2] text-[#342722] border-[#D6B878]/40 hover:bg-[#F4EBDD]"
                }`}
              >
                <div>Chattogram</div>
                <div className="text-[10px] opacity-80 font-mono">৳70</div>
              </button>

              <button
                type="button"
                onClick={() => setDeliveryZone("outside")}
                className={`p-2.5 rounded-xl text-xs font-medium border text-center transition-all ${
                  deliveryZone === "outside"
                    ? "bg-[#342722] text-[#FFF9F2] border-[#342722] shadow"
                    : "bg-[#FFF9F2] text-[#342722] border-[#D6B878]/40 hover:bg-[#F4EBDD]"
                }`}
              >
                <div>Other Districts</div>
                <div className="text-[10px] opacity-80 font-mono">৳130</div>
              </button>
            </div>
          </div>

          {/* Totals Breakdown */}
          <div className="space-y-2 text-xs text-[#342722]/80 border-t border-[#D6B878]/20 pt-4">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span className="font-mono font-bold text-[#342722]">৳{subtotal.toLocaleString()}</span>
            </div>

            <div className="flex justify-between items-center">
              <span>Delivery Charge:</span>
              <span className="font-mono">
                {deliveryCharge === 0 ? (
                  <span className="text-emerald-700 font-bold">FREE</span>
                ) : (
                  `৳${deliveryCharge}`
                )}
              </span>
            </div>

            <div className="flex justify-between text-base font-bold text-[#342722] border-t border-[#D6B878]/30 pt-3">
              <span>Total Payable:</span>
              <span className="font-mono text-xl text-[#342722]">৳{total.toLocaleString()}</span>
            </div>
            <p className="text-[11px] text-[#8C7654]">
              Includes VAT & duties. Cash on Delivery payable upon arrival.
            </p>
          </div>

          {/* Checkout CTA */}
          <Link
            href="/checkout"
            className="w-full py-4 rounded-full bg-[#342722] hover:bg-[#4A3932] text-[#FFF9F2] text-xs font-bold uppercase tracking-widest transition-all shadow-lg flex items-center justify-center gap-2 group border border-[#D6B878]/40"
          >
            <span>Proceed to Checkout</span>
            <ArrowRight className="w-4 h-4 text-[#D6B878] group-hover:translate-x-1 transition-transform" />
          </Link>

          {/* Reassurance Badges */}
          <div className="space-y-2 pt-2 border-t border-[#D6B878]/20 text-[11px] text-[#8C7654]">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#B89A58]" />
              <span>Safe & Verified Boutique Checkout</span>
            </div>
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-[#B89A58]" />
              <span>Cash on Delivery, bKash & Nagad Supported</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
