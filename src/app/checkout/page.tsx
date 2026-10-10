"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { PearlDivider } from "@/components/ui/PearlDivider";
import {
  Lock,
  ShieldCheck,
  Truck,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Phone,
  Sparkles
} from "lucide-react";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, deliveryZone, setDeliveryZone, deliveryCharge, total, clearCart } = useCart();

  const [formData, setFormData] = useState({
    customerName: "",
    phone: "",
    email: "",
    district: deliveryZone === "chittagong" ? "Chattogram" : "Dhaka",
    area: "",
    fullAddress: "",
    deliveryInstructions: "",
    paymentMethod: "cod", // 'cod', 'bkash', 'nagad'
    paymentTxnId: "",
    notes: "",
    consent: true,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const bdDistricts = [
    "Chattogram",
    "Dhaka",
    "Cox's Bazar",
    "Sylhet",
    "Cumilla",
    "Feni",
    "Noakhali",
    "Brahmanbaria",
    "Gazipur",
    "Narayanganj",
    "Rajshahi",
    "Khulna",
    "Barishal",
    "Rangpur",
    "Mymensingh",
  ];

  const handleDistrictChange = (d: string) => {
    const isChit = d.toLowerCase().includes("chattogram") || d.toLowerCase().includes("chittagong");
    setDeliveryZone(isChit ? "chittagong" : "outside");
    setFormData((prev) => ({ ...prev, district: d }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (items.length === 0) {
      setErrorMessage("Your bag is empty. Please add items before checking out.");
      return;
    }

    if (!formData.customerName.trim()) {
      setErrorMessage("Please enter your full name.");
      return;
    }

    if (!formData.phone.trim()) {
      setErrorMessage("Please enter a valid Bangladeshi contact phone number.");
      return;
    }

    if (!formData.area.trim() || !formData.fullAddress.trim()) {
      setErrorMessage("Please provide your delivery area and full street address.");
      return;
    }

    if ((formData.paymentMethod === "bkash" || formData.paymentMethod === "nagad") && !formData.paymentTxnId.trim()) {
      setErrorMessage(`Please provide your ${formData.paymentMethod.toUpperCase()} Transaction ID (TrxID) for verification.`);
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        customerName: formData.customerName,
        phone: formData.phone,
        email: formData.email,
        district: formData.district,
        area: formData.area,
        fullAddress: formData.fullAddress,
        deliveryInstructions: formData.deliveryInstructions,
        paymentMethod: formData.paymentMethod,
        paymentTxnId: formData.paymentTxnId,
        sourceChannel: "website",
        items: items.map((i) => ({
          productId: i.productId,
          variantName: i.variantName,
          quantity: i.quantity,
        })),
        notes: formData.notes,
      };

      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to process order. Please try again.");
      }

      // Clear local cart
      clearCart();

      // Redirect to confirmation page
      router.push(`/order-confirmation/${data.order.orderNumber}`);
    } catch (err: any) {
      setErrorMessage(err.message || "An unexpected error occurred.");
      setIsSubmitting(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <h1 className="font-serif-luxury text-3xl font-bold text-[#342722]">
          No Items in Bag
        </h1>
        <p className="text-sm text-[#342722]/70">
          Your shopping bag is empty. Please add a product to proceed to checkout.
        </p>
        <Link
          href="/shop"
          className="inline-block px-8 py-3 rounded-full bg-[#342722] text-[#FFF9F2] text-xs font-semibold uppercase tracking-wider"
        >
          Return to Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-8">
      {/* Title */}
      <div className="text-center max-w-xl mx-auto">
        <span className="text-xs uppercase tracking-[0.25em] text-[#8C7654] font-semibold">
          BOUTIQUE CHECKOUT
        </span>
        <h1 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-[#342722] mt-1">
          Complete Your Order
        </h1>
        <PearlDivider className="my-3" />
        <div className="flex items-center justify-center gap-2 text-xs text-[#8C7654]">
          <Lock className="w-3.5 h-3.5 text-[#B89A58]" />
          <span>Encrypted Guest Checkout — No Account Required</span>
        </div>
      </div>

      {errorMessage && (
        <div className="max-w-3xl mx-auto p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-3">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Main Form & Summary Grid */}
      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Form Column (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-[#D6B878]/30 shadow-sm space-y-6">
          {/* Customer Info */}
          <div className="space-y-4">
            <h2 className="font-serif-luxury text-lg font-bold text-[#342722] pb-2 border-b border-[#D6B878]/20">
              1. Customer Information
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-[#342722] block mb-1">
                  Full Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.customerName}
                  onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                  placeholder="e.g. Samira Rahman"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#D6B878]/40 bg-[#FFF9F2] text-xs text-[#342722] focus:outline-none focus:border-[#B89A58]"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#342722] block mb-1">
                  Phone Number <span className="text-rose-500">*</span>
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="e.g. 01812345678"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#D6B878]/40 bg-[#FFF9F2] text-xs text-[#342722] font-mono focus:outline-none focus:border-[#B89A58]"
                />
                <span className="text-[10px] text-[#8C7654]">For courier SMS delivery updates</span>
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-[#342722] block mb-1">
                Email Address (Optional)
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="samira@example.com"
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#D6B878]/40 bg-[#FFF9F2] text-xs text-[#342722] focus:outline-none focus:border-[#B89A58]"
              />
            </div>
          </div>

          {/* Delivery Address */}
          <div className="space-y-4 pt-4 border-t border-[#D6B878]/20">
            <h2 className="font-serif-luxury text-lg font-bold text-[#342722] pb-2 border-b border-[#D6B878]/20">
              2. Delivery Address
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-[#342722] block mb-1">
                  District / Division <span className="text-rose-500">*</span>
                </label>
                <select
                  value={formData.district}
                  onChange={(e) => handleDistrictChange(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#D6B878]/40 bg-[#FFF9F2] text-xs text-[#342722] focus:outline-none focus:border-[#B89A58]"
                >
                  {bdDistricts.map((d) => (
                    <option key={d} value={d}>
                      {d} {d === "Chattogram" ? "(৳70 delivery)" : "(৳130 delivery)"}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-[#342722] block mb-1">
                  Area / Thana <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.area}
                  onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                  placeholder="e.g. GEC Circle / Nasirabad / Agrabad"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#D6B878]/40 bg-[#FFF9F2] text-xs text-[#342722] focus:outline-none focus:border-[#B89A58]"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-[#342722] block mb-1">
                Full Street / House Address <span className="text-rose-500">*</span>
              </label>
              <textarea
                required
                rows={2}
                value={formData.fullAddress}
                onChange={(e) => setFormData({ ...formData, fullAddress: e.target.value })}
                placeholder="House #, Road #, Apartment name or nearby landmark..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#D6B878]/40 bg-[#FFF9F2] text-xs text-[#342722] focus:outline-none focus:border-[#B89A58]"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-[#342722] block mb-1">
                Delivery Instructions (Optional)
              </label>
              <input
                type="text"
                value={formData.deliveryInstructions}
                onChange={(e) => setFormData({ ...formData, deliveryInstructions: e.target.value })}
                placeholder="e.g. Call before delivery, deliver after 3 PM"
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#D6B878]/40 bg-[#FFF9F2] text-xs text-[#342722] focus:outline-none focus:border-[#B89A58]"
              />
            </div>
          </div>

          {/* Payment Method Selection */}
          <div className="space-y-4 pt-4 border-t border-[#D6B878]/20">
            <h2 className="font-serif-luxury text-lg font-bold text-[#342722] pb-2 border-b border-[#D6B878]/20">
              3. Payment Method
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* COD */}
              <label
                className={`p-4 rounded-2xl border cursor-pointer flex flex-col justify-between transition-all ${
                  formData.paymentMethod === "cod"
                    ? "bg-[#342722] text-[#FFF9F2] border-[#342722] shadow"
                    : "bg-[#FFF9F2] text-[#342722] border-[#D6B878]/40 hover:bg-[#F4EBDD]"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-xs uppercase tracking-wider">Cash on Delivery</span>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cod"
                    checked={formData.paymentMethod === "cod"}
                    onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                    className="accent-[#D6B878]"
                  />
                </div>
                <p className="text-[11px] opacity-80">Pay courier in cash when your parcel arrives.</p>
              </label>

              {/* bKash */}
              <label
                className={`p-4 rounded-2xl border cursor-pointer flex flex-col justify-between transition-all ${
                  formData.paymentMethod === "bkash"
                    ? "bg-[#D12053] text-white border-[#D12053] shadow"
                    : "bg-[#FFF9F2] text-[#342722] border-[#D6B878]/40 hover:bg-[#F4EBDD]"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-xs uppercase tracking-wider">bKash</span>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="bkash"
                    checked={formData.paymentMethod === "bkash"}
                    onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                    className="accent-white"
                  />
                </div>
                <p className="text-[11px] opacity-90">Send money to merchant number.</p>
              </label>

              {/* Nagad */}
              <label
                className={`p-4 rounded-2xl border cursor-pointer flex flex-col justify-between transition-all ${
                  formData.paymentMethod === "nagad"
                    ? "bg-[#EA1D25] text-white border-[#EA1D25] shadow"
                    : "bg-[#FFF9F2] text-[#342722] border-[#D6B878]/40 hover:bg-[#F4EBDD]"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-xs uppercase tracking-wider">Nagad</span>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="nagad"
                    checked={formData.paymentMethod === "nagad"}
                    onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                    className="accent-white"
                  />
                </div>
                <p className="text-[11px] opacity-90">Send money to official Nagad wallet.</p>
              </label>
            </div>

            {/* bKash / Nagad instructions box */}
            {(formData.paymentMethod === "bkash" || formData.paymentMethod === "nagad") && (
              <div className="p-4 rounded-2xl bg-[#FFF9F2] border border-[#D6B878] space-y-3 animate-in fade-in duration-200">
                <div className="flex items-center gap-2 text-xs font-bold text-[#342722]">
                  <Sparkles className="w-4 h-4 text-[#B89A58]" />
                  <span>
                    Official {formData.paymentMethod.toUpperCase()} Merchant Number:{" "}
                    <span className="font-mono text-[#B89A58] text-sm">01606266496</span>
                  </span>
                </div>
                <ol className="text-xs text-[#342722]/80 list-decimal list-inside space-y-1">
                  <li>Open your {formData.paymentMethod.toUpperCase()} App and select Send Money or Payment.</li>
                  <li>Enter Merchant Number: <strong>01606266496</strong>.</li>
                  <li>Enter Exact Amount: <strong>৳{total.toLocaleString()}</strong>.</li>
                  <li>Reference: <strong>Eternal6</strong>.</li>
                  <li>Copy and enter the Transaction ID (TrxID) below:</li>
                </ol>
                <div>
                  <input
                    type="text"
                    required
                    value={formData.paymentTxnId}
                    onChange={(e) => setFormData({ ...formData, paymentTxnId: e.target.value })}
                    placeholder={`Paste ${formData.paymentMethod.toUpperCase()} TrxID (e.g. BL9A27F8K)`}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#D6B878] bg-white text-xs font-mono font-bold text-[#342722] focus:outline-none focus:ring-1 focus:ring-[#B89A58]"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Notes */}
          <div>
            <label className="text-xs font-semibold text-[#342722] block mb-1">
              Order Notes / Gift Message (Optional)
            </label>
            <textarea
              rows={2}
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="Any special gift packaging notes or color preferences..."
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#D6B878]/40 bg-[#FFF9F2] text-xs text-[#342722] focus:outline-none"
            />
          </div>
        </div>

        {/* Right Summary Column (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-[#D6B878]/40 shadow-sm space-y-6 sticky top-28">
          <h2 className="font-serif-luxury text-lg font-bold text-[#342722] pb-3 border-b border-[#D6B878]/30">
            Order Review ({items.length} Item{items.length > 1 ? "s" : ""})
          </h2>

          {/* Itemized Mini List */}
          <div className="divide-y divide-[#D6B878]/20 max-h-60 overflow-y-auto pr-1">
            {items.map((item) => {
              const activePrice = item.salePrice && item.salePrice > 0 ? item.salePrice : item.price;
              return (
                <div key={item.id} className="py-2.5 flex items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2.5 truncate">
                    <img src={item.image} alt="" className="w-10 h-12 rounded object-cover flex-shrink-0" />
                    <div className="truncate">
                      <div className="font-medium text-[#342722] truncate">{item.name}</div>
                      <div className="text-[11px] text-[#8C7654]">Qty: {item.quantity}</div>
                    </div>
                  </div>
                  <div className="font-mono font-bold text-[#342722] flex-shrink-0">
                    ৳{(activePrice * item.quantity).toLocaleString()}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Total Breakdown */}
          <div className="space-y-2 text-xs text-[#342722]/80 border-t border-[#D6B878]/30 pt-4">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span className="font-mono font-bold text-[#342722]">৳{subtotal.toLocaleString()}</span>
            </div>

            <div className="flex justify-between items-center">
              <span>Delivery ({formData.district}):</span>
              <span className="font-mono">
                {deliveryCharge === 0 ? (
                  <span className="text-emerald-700 font-bold">FREE</span>
                ) : (
                  `৳${deliveryCharge}`
                )}
              </span>
            </div>

            <div className="flex justify-between text-lg font-bold text-[#342722] border-t border-[#D6B878]/30 pt-3">
              <span>Grand Total:</span>
              <span className="font-mono text-2xl text-[#342722]">৳{total.toLocaleString()}</span>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 rounded-full bg-[#342722] hover:bg-[#4A3932] disabled:opacity-60 text-[#FFF9F2] text-xs font-bold uppercase tracking-widest transition-all shadow-xl flex items-center justify-center gap-2 border border-[#D6B878]/40"
          >
            {isSubmitting ? (
              <span>Securing Order...</span>
            ) : (
              <>
                <span>Place Order (৳{total.toLocaleString()})</span>
                <ArrowRight className="w-4 h-4 text-[#D6B878]" />
              </>
            )}
          </button>

          <div className="space-y-2 pt-2 text-[11px] text-[#8C7654] border-t border-[#D6B878]/20">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#B89A58]" />
              <span>No payment details are shared with third parties.</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-[#B89A58]" />
              <span>Confirmation SMS and call will be placed prior to dispatch.</span>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
