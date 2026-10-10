import React from "react";
import Link from "next/link";
import { PearlDivider } from "@/components/ui/PearlDivider";
import { User, Package, Heart, Phone, ArrowRight, ShieldCheck } from "lucide-react";

export default function AccountPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 space-y-10">
      <div className="text-center">
        <span className="text-xs uppercase tracking-[0.25em] text-[#8C7654] font-semibold">
          PATRON PORTAL
        </span>
        <h1 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-[#342722] mt-1">
          Customer Account & Orders
        </h1>
        <PearlDivider className="my-3" />
        <p className="text-xs sm:text-sm text-[#342722]/70 max-w-md mx-auto">
          Track your existing parcel deliveries, manage saved wishlist pieces, or contact our personal boutique styling concierge.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white rounded-3xl p-6 border border-[#D6B878]/30 shadow-sm space-y-4 text-center">
          <div className="w-12 h-12 rounded-2xl bg-[#F4EBDD] flex items-center justify-center text-[#B89A58] mx-auto">
            <Package className="w-6 h-6" />
          </div>
          <h3 className="font-serif-luxury text-lg font-bold text-[#342722]">Track Order</h3>
          <p className="text-xs text-[#342722]/70">
            Check live shipment and courier dispatch status using your reference ID.
          </p>
          <Link
            href="/track-order"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#B89A58] hover:text-[#342722]"
          >
            <span>Track Parcel</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-[#D6B878]/30 shadow-sm space-y-4 text-center">
          <div className="w-12 h-12 rounded-2xl bg-[#F4EBDD] flex items-center justify-center text-[#B89A58] mx-auto">
            <Heart className="w-6 h-6" />
          </div>
          <h3 className="font-serif-luxury text-lg font-bold text-[#342722]">My Wishlist</h3>
          <p className="text-xs text-[#342722]/70">
            View your favorited hijabs, pearl edits, and saved boutique sets.
          </p>
          <Link
            href="/shop?wishlist=true"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#B89A58] hover:text-[#342722]"
          >
            <span>View Favorites</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-[#D6B878]/30 shadow-sm space-y-4 text-center">
          <div className="w-12 h-12 rounded-2xl bg-[#F4EBDD] flex items-center justify-center text-[#B89A58] mx-auto">
            <Phone className="w-6 h-6" />
          </div>
          <h3 className="font-serif-luxury text-lg font-bold text-[#342722]">Concierge Desk</h3>
          <p className="text-xs text-[#342722]/70">
            Speak directly with our Chattogram atelier stylists on WhatsApp.
          </p>
          <a
            href="https://wa.me/8801606266496"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#B89A58] hover:text-[#342722]"
          >
            <span>WhatsApp Us</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
}
