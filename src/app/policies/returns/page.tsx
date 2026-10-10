import React from "react";
import Link from "next/link";
import { PearlDivider } from "@/components/ui/PearlDivider";
import { RotateCcw, AlertTriangle, ShieldCheck } from "lucide-react";

export default function ReturnsPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 space-y-10">
      <div className="text-center">
        <span className="text-xs uppercase tracking-[0.25em] text-[#8C7654] font-semibold">
          CLIENT SATISFACTION
        </span>
        <h1 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-[#342722] mt-1">
          Returns & Exchange Policy
        </h1>
        <PearlDivider className="my-3" />
        <p className="text-xs text-[#8C7654]">Last updated: October 2026</p>
      </div>

      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#D6B878]/30 shadow-sm space-y-8 text-xs sm:text-sm text-[#342722]/85 leading-relaxed">
        <div className="space-y-3">
          <h2 className="font-serif-luxury text-xl font-bold text-[#342722] flex items-center gap-2">
            <RotateCcw className="w-5 h-5 text-[#B89A58]" />
            <span>7-Day Return & Exchange Window</span>
          </h2>
          <p>
            At Eternal 6, we stand behind the craftsmanship of every hijab and art piece. If you receive an item with any material manufacturing defect, damaged embellishment, or an incorrect variant, you may request an exchange within <strong>7 days</strong> of delivery.
          </p>
        </div>

        <div className="space-y-3 pt-4 border-t border-[#D6B878]/20">
          <h2 className="font-serif-luxury text-xl font-bold text-[#342722] flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#B89A58]" />
            <span>Eligibility Conditions</span>
          </h2>
          <ul className="list-disc list-inside space-y-1 pl-2">
            <li>Items must be unworn, unwashed, and scented-free with original boutique tags intact.</li>
            <li>Original silk ribbon wrapping and box packaging must be presented.</li>
            <li>In-person inspection in front of the courier delivery rider is recommended.</li>
          </ul>
        </div>

        <div className="space-y-3 pt-4 border-t border-[#D6B878]/20">
          <h2 className="font-serif-luxury text-xl font-bold text-[#342722] flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-[#B89A58]" />
            <span>Non-Returnable Items</span>
          </h2>
          <p>
            Bespoke custom name-embroidered hijabs and ceremonial mehendi service retainers are non-refundable once personalized execution has begun, except in case of manufacturing defect on our part.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-[#FFF9F2] border border-[#D6B878]/30 flex items-center justify-between flex-wrap gap-3">
          <div>
            <span className="font-bold text-[#342722] block">Need assistance with an exchange?</span>
            <span className="text-xs text-[#8C7654]">Contact our Chattogram concierge team with your order reference.</span>
          </div>
          <Link
            href="/contact"
            className="px-5 py-2 rounded-full bg-[#342722] text-[#FFF9F2] text-xs font-semibold uppercase tracking-wider"
          >
            Contact Care Desk
          </Link>
        </div>
      </div>
    </div>
  );
}
