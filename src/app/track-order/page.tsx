"use client";

import React, { useState } from "react";
import { PearlDivider } from "@/components/ui/PearlDivider";
import {
  Search,
  CheckCircle2,
  Clock,
  Package,
  Truck,
  Check,
  AlertCircle,
  Phone
} from "lucide-react";

export default function TrackOrderPage() {
  const [orderNumber, setOrderNumber] = useState("");
  const [phone, setPhone] = useState("");
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setOrder(null);

    if (!orderNumber.trim() || !phone.trim()) {
      setError("Please enter both your Order Reference and Contact Phone Number.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/orders/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderNumber, phone }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Order not found. Please verify your reference and phone number.");
      }

      setOrder(data.order);
    } catch (err: any) {
      setError(err.message || "Failed to locate order.");
    } finally {
      setLoading(false);
    }
  };

  const steps = [
    { key: "pending", label: "Order Received", desc: "Order registered in boutique system" },
    { key: "confirmed", label: "Confirmed", desc: "Customer details verified" },
    { key: "processing", label: "Packaging at Atelier", desc: "Gift-wrapped with pearl signature" },
    { key: "shipped", label: "Out with Courier", desc: "Handed over to delivery agent" },
    { key: "delivered", label: "Delivered", desc: "Safely received by customer" },
  ];

  const getStepStatus = (stepIndex: number, currentStatus: string) => {
    const statusOrder = ["pending", "confirmed", "processing", "shipped", "delivered"];
    const currentIndex = statusOrder.indexOf(currentStatus.toLowerCase());
    if (currentIndex === -1) return stepIndex === 0 ? "current" : "upcoming";
    if (stepIndex < currentIndex) return "completed";
    if (stepIndex === currentIndex) return "current";
    return "upcoming";
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 space-y-12">
      {/* Header */}
      <div className="text-center max-w-xl mx-auto">
        <span className="text-xs uppercase tracking-[0.25em] text-[#8C7654] font-semibold">
          LIVE PARCEL DISPATCH
        </span>
        <h1 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-[#342722] mt-1">
          Track Your Boutique Order
        </h1>
        <PearlDivider className="my-3" />
        <p className="text-xs sm:text-sm text-[#342722]/70">
          Enter your unique order reference and the phone number provided at checkout.
        </p>
      </div>

      {/* Lookup Form */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#D6B878]/40 shadow-sm max-w-2xl mx-auto">
        <form onSubmit={handleTrack} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-[#342722] block mb-1">
                Order Reference
              </label>
              <input
                type="text"
                required
                value={orderNumber}
                onChange={(e) => setOrderNumber(e.target.value)}
                placeholder="e.g. ET6-2026-9481"
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#D6B878]/40 bg-[#FFF9F2] text-xs font-mono font-bold text-[#342722] focus:outline-none focus:border-[#B89A58]"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-[#342722] block mb-1">
                Contact Phone Number
              </label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="e.g. 01812345678"
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#D6B878]/40 bg-[#FFF9F2] text-xs font-mono text-[#342722] focus:outline-none focus:border-[#B89A58]"
              />
            </div>
          </div>

          {error && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-full bg-[#342722] hover:bg-[#4A3932] text-[#FFF9F2] text-xs font-bold uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2"
          >
            {loading ? <span>Querying System...</span> : <span>Track Shipment</span>}
          </button>
        </form>
      </div>

      {/* Tracking Result */}
      {order && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#D6B878]/40 shadow-xl space-y-8 animate-in fade-in duration-300">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#D6B878]/30 gap-2">
            <div>
              <span className="text-xs uppercase tracking-wider text-[#8C7654] font-semibold">
                Order Tracking Status
              </span>
              <h3 className="font-serif-luxury text-xl font-bold text-[#342722]">
                Ref: {order.orderNumber}
              </h3>
            </div>
            <div className="text-xs bg-[#FFF9F2] border border-[#D6B878] px-3 py-1 rounded-full font-bold text-[#8C6E33]">
              Destination: {order.area}, {order.district}
            </div>
          </div>

          {/* Stepper Timeline */}
          <div className="py-4">
            <div className="relative flex flex-col md:flex-row justify-between gap-6 md:gap-2">
              {steps.map((step, idx) => {
                const status = getStepStatus(idx, order.orderStatus);
                return (
                  <div key={step.key} className="flex-1 flex md:flex-col items-center md:text-center gap-4 md:gap-2 relative">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs z-10 transition-colors ${
                        status === "completed"
                          ? "bg-emerald-600 text-white"
                          : status === "current"
                          ? "bg-[#342722] text-[#D6B878] border-2 border-[#D6B878] shadow-md ring-4 ring-[#D6B878]/20"
                          : "bg-gray-100 text-gray-400 border border-gray-200"
                      }`}
                    >
                      {status === "completed" ? (
                        <Check className="w-5 h-5" />
                      ) : (
                        <span>{idx + 1}</span>
                      )}
                    </div>

                    <div className="space-y-0.5">
                      <div className={`text-xs font-bold ${status === "current" ? "text-[#342722]" : "text-gray-600"}`}>
                        {step.label}
                      </div>
                      <div className="text-[11px] text-gray-400 max-w-[130px] leading-tight hidden sm:block">
                        {step.desc}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Items in parcel */}
          <div className="pt-6 border-t border-[#D6B878]/20 space-y-3">
            <h4 className="text-xs uppercase tracking-wider text-[#8C7654] font-bold">
              Parcel Contents:
            </h4>
            <div className="divide-y divide-[#D6B878]/20">
              {order.items.map((it: any, i: number) => (
                <div key={i} className="py-2.5 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-3">
                    {it.image && (
                      <img src={it.image} alt="" className="w-10 h-12 rounded object-cover border border-[#D6B878]/30" />
                    )}
                    <div>
                      <div className="font-semibold text-[#342722]">{it.productName}</div>
                      <div className="text-[11px] text-[#8C7654]">Qty: {it.quantity}</div>
                    </div>
                  </div>
                  <div className="font-mono font-bold text-[#342722]">
                    ৳{(it.price * it.quantity).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center pt-3 border-t border-[#D6B878]/20 text-xs">
              <span className="font-semibold text-[#342722]">Total Payable ({order.paymentMethod.toUpperCase()}):</span>
              <span className="font-mono text-base font-bold text-[#342722]">৳{order.total.toLocaleString()}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
