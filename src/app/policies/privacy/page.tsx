import React from "react";
import { PearlDivider } from "@/components/ui/PearlDivider";
import { Shield, Lock, EyeOff } from "lucide-react";

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 space-y-10">
      <div className="text-center">
        <span className="text-xs uppercase tracking-[0.25em] text-[#8C7654] font-semibold">
          SECURITY & TRUST
        </span>
        <h1 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-[#342722] mt-1">
          Privacy Policy
        </h1>
        <PearlDivider className="my-3" />
        <p className="text-xs text-[#8C7654]">Last updated: October 2026</p>
      </div>

      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#D6B878]/30 shadow-sm space-y-8 text-xs sm:text-sm text-[#342722]/85 leading-relaxed">
        <div className="space-y-3">
          <h2 className="font-serif-luxury text-xl font-bold text-[#342722] flex items-center gap-2">
            <Shield className="w-5 h-5 text-[#B89A58]" />
            <span>Our Commitment to Privacy</span>
          </h2>
          <p>
            At Eternal 6, we value the trust of our patrons. We collect only the minimum personal information necessary to fulfill orders, process Cash on Delivery, schedule mehendi appointments, and deliver tailored modest fashion recommendations.
          </p>
        </div>

        <div className="space-y-3 pt-4 border-t border-[#D6B878]/20">
          <h2 className="font-serif-luxury text-xl font-bold text-[#342722] flex items-center gap-2">
            <Lock className="w-5 h-5 text-[#B89A58]" />
            <span>Information We Collect</span>
          </h2>
          <ul className="list-disc list-inside space-y-1 pl-2">
            <li><strong>Delivery Details:</strong> Recipient name, mobile contact number, area, and delivery address.</li>
            <li><strong>Order Records:</strong> Itemized products, variant selections, transaction references for bKash/Nagad.</li>
            <li><strong>Appointment Inquiries:</strong> Event date, time, location, and aesthetic preferences.</li>
          </ul>
        </div>

        <div className="space-y-3 pt-4 border-t border-[#D6B878]/20">
          <h2 className="font-serif-luxury text-xl font-bold text-[#342722] flex items-center gap-2">
            <EyeOff className="w-5 h-5 text-[#B89A58]" />
            <span>Data Protection & Non-Disclosure</span>
          </h2>
          <p>
            We never sell, rent, or trade your personal information with external marketers. Your telephone number and address are shared solely with authorized courier agents in Bangladesh for delivery fulfillment purposes.
          </p>
        </div>
      </div>
    </div>
  );
}
