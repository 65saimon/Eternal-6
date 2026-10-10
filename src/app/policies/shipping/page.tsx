import React from "react";
import Link from "next/link";
import { PearlDivider } from "@/components/ui/PearlDivider";
import { Truck, ShieldCheck, Clock, MapPin } from "lucide-react";

export default function ShippingPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 space-y-10">
      <div className="text-center">
        <span className="text-xs uppercase tracking-[0.25em] text-[#8C7654] font-semibold">
          DELIVERY INFORMATION
        </span>
        <h1 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-[#342722] mt-1">
          Shipping & Delivery Policy
        </h1>
        <PearlDivider className="my-3" />
        <p className="text-xs text-[#8C7654]">Last updated: October 2026</p>
      </div>

      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#D6B878]/30 shadow-sm space-y-8 text-xs sm:text-sm text-[#342722]/85 leading-relaxed">
        <div className="space-y-3">
          <h2 className="font-serif-luxury text-xl font-bold text-[#342722] flex items-center gap-2">
            <MapPin className="w-5 h-5 text-[#B89A58]" />
            <span>Delivery Zones & Charges</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="p-4 rounded-2xl bg-[#FFF9F2] border border-[#D6B878]/30 space-y-1.5">
              <span className="font-bold text-[#342722] text-sm block">Chattogram Metropolitan</span>
              <p>• <strong>Delivery Fee:</strong> ৳70</p>
              <p>• <strong>Estimated Timeline:</strong> 24 to 48 hours</p>
              <p>• Delivered via dedicated boutique courier</p>
            </div>
            <div className="p-4 rounded-2xl bg-[#FFF9F2] border border-[#D6B878]/30 space-y-1.5">
              <span className="font-bold text-[#342722] text-sm block">All Other Districts in Bangladesh</span>
              <p>• <strong>Delivery Fee:</strong> ৳130</p>
              <p>• <strong>Estimated Timeline:</strong> 2 to 4 business days</p>
              <p>• Delivered via reliable nationwide partners (Steadfast / Pathao / eCourier)</p>
            </div>
          </div>
        </div>

        <div className="space-y-3 pt-4 border-t border-[#D6B878]/20">
          <h2 className="font-serif-luxury text-xl font-bold text-[#342722] flex items-center gap-2">
            <Truck className="w-5 h-5 text-[#B89A58]" />
            <span>Complimentary Shipping</span>
          </h2>
          <p>
            Orders totaling <strong>৳2,500 or more</strong> qualify for complimentary free delivery across Bangladesh. The shipping deduction is automatically computed during checkout.
          </p>
        </div>

        <div className="space-y-3 pt-4 border-t border-[#D6B878]/20">
          <h2 className="font-serif-luxury text-xl font-bold text-[#342722] flex items-center gap-2">
            <Clock className="w-5 h-5 text-[#B89A58]" />
            <span>Custom Creation Lead Times</span>
          </h2>
          <p>
            For bespoke calligraphy or made-to-order hijabs, production takes up to <strong>7 calendar days</strong> before dispatch. Our team sends photographic confirmation of the finished piece prior to shipping.
          </p>
        </div>

        <div className="space-y-3 pt-4 border-t border-[#D6B878]/20">
          <h2 className="font-serif-luxury text-xl font-bold text-[#342722] flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#B89A58]" />
            <span>Cash on Delivery Verification</span>
          </h2>
          <p>
            For COD orders, our customer service team will call your registered contact number to confirm delivery details. We reserve the right to withhold dispatch if the phone number is unreachable.
          </p>
        </div>
      </div>
    </div>
  );
}
