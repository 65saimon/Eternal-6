"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { EternalLogo } from "@/components/brand/EternalLogo";
import { Lock, ShieldCheck, ArrowRight, AlertCircle, Sparkles } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [passphrase, setPassphrase] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key: passphrase }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Invalid administrator credentials.");
      }

      // Also set localStorage for client header fallback
      localStorage.setItem("eternal6_admin_key", passphrase);
      router.push("/admin");
    } catch (err: any) {
      setError(err.message || "Authentication failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto py-16 sm:py-24 space-y-8">
      <div className="text-center space-y-3">
        <div className="flex justify-center">
          <EternalLogo height={44} withLink={false} />
        </div>
        <h1 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-[#342722]">
          Boutique Admin Portal
        </h1>
        <p className="text-xs text-[#8C7654]">
          Restricted access for Eternal 6 management & atelier fulfillment staff.
        </p>
      </div>

      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#D6B878]/40 shadow-xl space-y-6">
        {error && (
          <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-[#342722] block mb-1">
              Administrator Passphrase
            </label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8C7654]" />
              <input
                type="password"
                required
                value={passphrase}
                onChange={(e) => setPassphrase(e.target.value)}
                placeholder="Enter passphrase..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#D6B878]/40 bg-[#FFF9F2] text-xs text-[#342722] focus:outline-none focus:border-[#B89A58]"
              />
            </div>
            <p className="text-[11px] text-[#8C7654] mt-1">
              Default secure key: <code className="font-mono text-[#342722] bg-[#F4EBDD] px-1 rounded">eternal6_luxury_admin_2026</code>
            </p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-full bg-[#342722] hover:bg-[#4A3932] disabled:opacity-60 text-[#FFF9F2] text-xs font-bold uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2"
          >
            {loading ? <span>Verifying...</span> : <span>Access Control Plane</span>}
            <ArrowRight className="w-4 h-4 text-[#D6B878]" />
          </button>
        </form>

        <div className="pt-4 border-t border-[#D6B878]/20 text-center text-xs text-[#8C7654]">
          <Link href="/" className="hover:underline text-[#342722]">
            ← Return to Public Storefront
          </Link>
        </div>
      </div>
    </div>
  );
}
