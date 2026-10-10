import React from "react";
import { PearlDivider } from "@/components/ui/PearlDivider";
import { FileText, CheckCircle2, ShieldAlert } from "lucide-react";

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 space-y-10">
      <div className="text-center">
        <span className="text-xs uppercase tracking-[0.25em] text-[#8C7654] font-semibold">
          TERMS OF SERVICE
        </span>
        <h1 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-[#342722] mt-1">
          Terms & Conditions
        </h1>
        <PearlDivider className="my-3" />
        <p className="text-xs text-[#8C7654]">Last updated: October 2026</p>
      </div>

      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#D6B878]/30 shadow-sm space-y-8 text-xs sm:text-sm text-[#342722]/85 leading-relaxed">
        <div className="space-y-3">
          <h2 className="font-serif-luxury text-xl font-bold text-[#342722] flex items-center gap-2">
            <FileText className="w-5 h-5 text-[#B89A58]" />
            <span>1. General Boutique Conditions</span>
          </h2>
          <p>
            By accessing or ordering from the Eternal 6 website, Facebook page, or WhatsApp sales desk, you agree to these Terms. All products, prices in Bangladeshi Taka (৳), and service availability are subject to stock validation.
          </p>
        </div>

        <div className="space-y-3 pt-4 border-t border-[#D6B878]/20">
          <h2 className="font-serif-luxury text-xl font-bold text-[#342722] flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-[#B89A58]" />
            <span>2. Intellectual Property & Brand Hallmark</span>
          </h2>
          <p>
            The Eternal 6 name, signature 6-petal moti emblem, product photography, editorial campaign imagery, and text copy are the intellectual property of Eternal 6. Unauthorized duplication, commercial scraping, or misrepresentation is strictly prohibited.
          </p>
        </div>

        <div className="space-y-3 pt-4 border-t border-[#D6B878]/20">
          <h2 className="font-serif-luxury text-xl font-bold text-[#342722] flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-[#B89A58]" />
            <span>3. Order Fulfillment & Governing Law</span>
          </h2>
          <p>
            Orders are governed under the laws of the People&apos;s Republic of Bangladesh. Disputes arising from transactions shall fall under the jurisdiction of competent courts in Chattogram, Bangladesh.
          </p>
        </div>
      </div>
    </div>
  );
}
