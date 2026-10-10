import React from "react";
import Link from "next/link";
import { ShieldCheck, ArrowLeft, ExternalLink, Sparkles } from "lucide-react";
import { EternalLogo } from "@/components/brand/EternalLogo";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

export const metadata = {
  title: "Eternal 6 | Boutique Administration Portal",
  description: "Secure administrative dashboard for Eternal 6 boutique operations, catalog, orders, and bookings.",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#F4EBDD]/40 dark:bg-[#120E0C] text-[#342722] dark:text-[#FAF5EE] flex flex-col font-sans transition-colors duration-300">
      {/* Top Admin Header */}
      <header className="sticky top-0 z-50 bg-[#342722] text-[#FFF9F2] border-b border-[#D6B878]/30 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/admin" className="flex items-center gap-3">
              <EternalLogo height={36} withLink={false} />
              <div className="hidden sm:block">
                <span className="text-[10px] text-[#D6B878] uppercase font-bold tracking-widest px-2 py-0.5 rounded bg-[#4A3932] border border-[#D6B878]/30">
                  ADMIN CONTROL PLANE
                </span>
              </div>
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Link
              href="/"
              target="_blank"
              className="text-xs text-[#D6B878] hover:text-white flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#4A3932] border border-[#D6B878]/30 transition-colors"
            >
              <span>View Live Boutique</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </header>

      {/* Admin Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        {children}
      </main>
    </div>
  );
}
