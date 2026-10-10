"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";
import { MessageCircle, X, Send, Sparkles } from "lucide-react";

import Image from "next/image";

export function FloatingWhatsApp() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [customMsg, setCustomMsg] = useState("");

  // Hide on checkout & payment routes to avoid checkout distraction
  if (pathname.startsWith("/checkout") || pathname.startsWith("/admin")) {
    return null;
  }

  const phoneNumber = "8801606266496"; // Eternal 6 boutique concierge (+880 1606-266496)

  const templates = [
    {
      label: "Hijab Product Inquiry",
      text: "Hello Eternal 6! I am browsing your hijabs on the website and would like to ask about availability and styling recommendations.",
    },
    {
      label: "Mehendi / Hand Art Booking",
      text: "Hello Eternal 6! I would like to inquire about booking a Mehendi or Hand Art appointment in Chittagong.",
    },
    {
      label: "Delivery to My Area",
      text: "Hello Eternal 6! Could you please tell me about delivery times and Cash on Delivery service to my district?",
    },
    {
      label: "Existing Order Status",
      text: "Hello Eternal 6! I would like to check on my recent order. My order reference is: ",
    },
  ];

  const handleSend = (text: string) => {
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen ? (
        <div className="w-80 sm:w-96 bg-[#FFF9F2] rounded-2xl shadow-2xl border border-[#D6B878]/50 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300">
          {/* Header */}
          <div className="bg-[#342722] text-[#FFF9F2] p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-full overflow-hidden border border-[#D6B878]/60 shadow-sm bg-[#14100E] flex-shrink-0">
                <Image
                  src="/images/logo/eternal6-logo.png"
                  alt="Eternal 6 - Timeless Elegance"
                  fill
                  className="object-cover scale-110"
                />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-[#25D366] rounded-full border border-[#14100E]" />
              </div>
              <div>
                <h4 className="font-serif-luxury text-sm font-semibold tracking-wide flex items-center gap-1.5">
                  Eternal 6 Concierge
                  <Sparkles className="w-3 h-3 text-[#D6B878]" />
                </h4>
                <p className="text-[11px] text-[#E7D8C5]/70">+880 1606-266496 • Live Assistant</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-[#E7D8C5]/70 hover:text-white p-1"
              aria-label="Close chat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="p-4 bg-gradient-to-b from-[#FFF9F2] to-[#F4EBDD]/60 space-y-3 max-h-96 overflow-y-auto">
            <p className="text-xs text-[#342722]/80 leading-relaxed bg-white/80 p-3 rounded-xl border border-[#D6B878]/30">
              Assalamu Alaikum! Welcome to <strong>Eternal 6</strong>. How may our boutique stylists assist you today?
            </p>

            <div className="space-y-1.5 pt-1">
              <p className="text-[11px] font-semibold text-[#8C7654] uppercase tracking-wider">
                Quick Inquiries:
              </p>
              {templates.map((tpl, i) => (
                <button
                  key={i}
                  onClick={() => handleSend(tpl.text)}
                  className="w-full text-left text-xs bg-white hover:bg-[#F4EBDD] text-[#342722] p-2.5 rounded-lg border border-[#D6B878]/30 transition-colors flex items-center justify-between group"
                >
                  <span className="font-medium">{tpl.label}</span>
                  <span className="text-[#D6B878] group-hover:translate-x-0.5 transition-transform">→</span>
                </button>
              ))}
            </div>

            <div className="pt-2">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={customMsg}
                  onChange={(e) => setCustomMsg(e.target.value)}
                  placeholder="Type a custom message..."
                  className="flex-1 bg-white border border-[#D6B878]/40 rounded-xl px-3 py-2 text-xs text-[#342722] placeholder-[#8C7654]/60 focus:outline-none focus:border-[#B89A58]"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && customMsg.trim()) {
                      handleSend(customMsg.trim());
                    }
                  }}
                />
                <button
                  onClick={() => {
                    if (customMsg.trim()) handleSend(customMsg.trim());
                  }}
                  className="bg-[#25D366] hover:bg-[#1EBE5D] text-white p-2.5 rounded-xl transition-colors flex items-center justify-center shadow"
                  aria-label="Send WhatsApp message"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="group relative flex items-center gap-2.5 bg-[#25D366] hover:bg-[#1EBE5D] text-white pl-4 pr-5 py-3 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
          aria-label="Chat on WhatsApp"
        >
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
          </span>
          <MessageCircle className="w-5 h-5 fill-current" />
          <span className="text-sm font-semibold tracking-wide">WhatsApp Us</span>
        </button>
      )}
    </div>
  );
}
