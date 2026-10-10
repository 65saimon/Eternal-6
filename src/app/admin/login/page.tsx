"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { EternalLogo } from "@/components/brand/EternalLogo";
import {
  Lock,
  User,
  ShieldCheck,
  ArrowRight,
  AlertCircle,
  Eye,
  EyeOff,
  KeyRound,
} from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [adminId, setAdminId] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
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
        body: JSON.stringify({
          username: adminId || "admin",
          password: password,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Invalid administrator credentials.");
      }

      // Save token to localStorage for authenticated client API calls
      localStorage.setItem("eternal6_admin_key", password);
      localStorage.setItem("eternal6_admin_user", data.adminId || adminId || "admin");

      router.push("/admin");
    } catch (err: any) {
      setError(err.message || "Authentication failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto py-16 sm:py-24 px-4 space-y-8 animate-in fade-in duration-300">
      <div className="text-center space-y-3">
        <div className="flex justify-center">
          <EternalLogo height={48} withLink={false} />
        </div>
        <h1 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-[#342722]">
          Boutique Admin Portal
        </h1>
        <p className="text-xs text-[#8C7654]">
          Password-protected workspace for Eternal 6 management & order fulfillment.
        </p>
      </div>

      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#D6B878]/40 shadow-2xl space-y-6">
        <div className="flex items-center gap-2 p-2.5 rounded-2xl bg-[#FFF9F2] border border-[#D6B878]/30 text-xs text-[#8C7654]">
          <ShieldCheck className="w-4 h-4 text-[#B89A58] flex-shrink-0" />
          <span>Protected Area: Enter your Admin ID & Secret Password</span>
        </div>

        {error && (
          <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          {/* Admin ID / Username */}
          <div>
            <label className="text-xs font-semibold text-[#342722] block mb-1">
              Administrator ID / Username
            </label>
            <div className="relative">
              <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8C7654]" />
              <input
                type="text"
                required
                value={adminId}
                onChange={(e) => setAdminId(e.target.value)}
                placeholder="e.g. admin"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#D6B878]/40 bg-[#FFF9F2] text-xs text-[#342722] focus:outline-none focus:border-[#B89A58]"
              />
            </div>
            <p className="text-[11px] text-[#8C7654] mt-1">
              Default ID: <code className="font-mono text-[#342722] bg-[#F4EBDD] px-1 rounded">admin</code>
            </p>
          </div>

          {/* Password */}
          <div>
            <label className="text-xs font-semibold text-[#342722] block mb-1">
              Administrator Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8C7654]" />
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password..."
                className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-[#D6B878]/40 bg-[#FFF9F2] text-xs text-[#342722] focus:outline-none focus:border-[#B89A58]"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8C7654] hover:text-[#342722]"
                tabIndex={-1}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            <p className="text-[11px] text-[#8C7654] mt-1">
              Default password: <code className="font-mono text-[#342722] bg-[#F4EBDD] px-1 rounded">eternal6_luxury_admin_2026</code>
            </p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-full bg-[#342722] hover:bg-[#4A3932] disabled:opacity-60 text-[#FFF9F2] text-xs font-bold uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2 mt-2"
          >
            {loading ? <span>Verifying Credentials...</span> : <span>Access Admin Dashboard</span>}
            <ArrowRight className="w-4 h-4 text-[#D6B878]" />
          </button>
        </form>

        <div className="pt-4 border-t border-[#D6B878]/20 flex justify-between items-center text-xs text-[#8C7654]">
          <Link href="/" className="hover:underline text-[#342722]">
            ← Return to Storefront
          </Link>
          <span className="text-[11px] text-[#B89A58] flex items-center gap-1">
            <KeyRound className="w-3 h-3" />
            Configurable in Settings
          </span>
        </div>
      </div>
    </div>
  );
}
