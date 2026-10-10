"use client";

import React from "react";
import { Printer } from "lucide-react";

export function PrintInvoiceButton() {
  return (
    <button
      onClick={() => window.print()}
      className="px-6 py-2.5 rounded-full border border-[#D6B878] hover:bg-[#F4EBDD] text-[#342722] text-xs font-semibold uppercase tracking-wider transition-colors flex items-center gap-2"
    >
      <Printer className="w-3.5 h-3.5" />
      <span>Print Invoice</span>
    </button>
  );
}
