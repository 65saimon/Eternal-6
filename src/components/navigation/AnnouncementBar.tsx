"use client";

import React, { useState } from "react";
import { Sparkles, X } from "lucide-react";

export function AnnouncementBar() {
  const [isOpen, setIsOpen] = useState(true);

  if (!isOpen) return null;

  return (
    <div className="relative z-50 bg-[#342722] text-[#FFF9F2] text-xs py-2 px-4 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex-1 text-center flex items-center justify-center gap-2 font-medium tracking-wide">
          <Sparkles className="w-3.5 h-3.5 text-[#D6B878] animate-pulse" />
          <span>
            Complimentary delivery in Chattogram on orders above <strong className="text-[#D6B878]">৳2,500</strong> | Cash on Delivery available across Bangladesh
          </span>
          <span className="hidden sm:inline-block w-1.5 h-1.5 rounded-full bg-[#D6B878]/60" />
          <span className="hidden sm:inline-block text-[#D6B878]">Boutique WhatsApp: +880 1606-266496</span>
        </div>
        <button
          onClick={() => setIsOpen(false)}
          className="text-[#FFF9F2]/70 hover:text-white p-1 transition-colors"
          aria-label="Dismiss banner"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
