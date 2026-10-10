"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  Send, 
  Terminal, 
  ShieldCheck, 
  CheckCircle2, 
  AlertCircle, 
  Loader2, 
  Mail, 
  Building, 
  User 
} from "lucide-react";
import { ContactSubmissionInput } from "@/lib/validations";

export default function ContactSection() {
  const [formData, setFormData] = useState<ContactSubmissionInput>({
    name: "",
    email: "",
    company: "",
    service_interest: "SaaS",
    budget_range: "$50k - $150k",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || "Failed to transmit transmission.");
      }

      setSuccess(true);
      setFormData({
        name: "",
        email: "",
        company: "",
        service_interest: "SaaS",
        budget_range: "$50k - $150k",
        message: "",
      });
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected transmission fault occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto rounded-3xl bg-white dark:bg-[#070d1d] border border-slate-200 dark:border-cyan-500/20 p-8 sm:p-12 shadow-2xl relative overflow-hidden backdrop-blur-xl"
      >
        <div className="text-center space-y-4 mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-100 dark:bg-cyan-950/60 border border-cyan-300 dark:border-cyan-500/30 text-xs font-mono text-cyan-700 dark:text-cyan-400">
            <Terminal className="w-3.5 h-3.5" />
            <span>SECURE TRANSMISSION PROTOCOL</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Initiate Strategic Engagement
          </h2>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
            Discuss architectural deployments, autonomous agent workflows, or custom frontier R&D partnerships with our technical directors.
          </p>
        </div>

        {success ? (
          <div className="p-8 rounded-2xl bg-emerald-100 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-500/40 text-center space-y-4 animate-in fade-in zoom-in-95">
            <CheckCircle2 className="w-12 h-12 text-emerald-600 dark:text-emerald-400 mx-auto animate-bounce" />
            <h3 className="text-xl font-bold text-slate-900 dark:text-white font-mono">
              TRANSMISSION RECEIVED & VERIFIED
            </h3>
            <p className="text-sm text-slate-700 dark:text-slate-300 max-w-md mx-auto">
              Your inquiry has been safely logged in our sovereign database. A Quantrix principal engineer will respond within 4 business hours via encrypted channels.
            </p>
            <button
              onClick={() => setSuccess(false)}
              className="mt-4 px-6 py-2 rounded-lg bg-slate-900 text-white dark:bg-slate-900 dark:border-white/10 text-xs font-mono text-cyan-400 hover:border-cyan-400 transition-colors"
            >
              SEND ANOTHER TRANSMISSION
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="p-4 rounded-xl bg-red-100 dark:bg-red-950/50 border border-red-300 dark:border-red-500/50 text-red-800 dark:text-red-300 text-xs font-mono flex items-center gap-3">
                <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Name */}
              <div className="space-y-2">
                <label className="text-xs font-mono text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                  <span>FULL NAME *</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Dr. Alex Mercer"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-slate-50 dark:bg-slate-900/80 border border-slate-300 dark:border-white/10 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-500 transition-colors font-sans"
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label className="text-xs font-mono text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                  <span>ENTERPRISE EMAIL *</span>
                </label>
                <input
                  type="email"
                  required
                  placeholder="alex.mercer@enterprise.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-slate-50 dark:bg-slate-900/80 border border-slate-300 dark:border-white/10 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-500 transition-colors font-sans"
                />
              </div>

              {/* Company */}
              <div className="space-y-2">
                <label className="text-xs font-mono text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  <Building className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                  <span>ORGANIZATION / AGENCY</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Lockheed Martin / Stripe"
                  value={formData.company || ""}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-slate-50 dark:bg-slate-900/80 border border-slate-300 dark:border-white/10 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-500 transition-colors font-sans"
                />
              </div>

              {/* Primary Interest */}
              <div className="space-y-2">
                <label className="text-xs font-mono text-slate-700 dark:text-slate-300">
                  PRIMARY PILLAR INTEREST
                </label>
                <select
                  value={formData.service_interest || "SaaS"}
                  onChange={(e) => setFormData({ ...formData, service_interest: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-slate-50 dark:bg-slate-900/80 border border-slate-300 dark:border-white/10 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-cyan-500 transition-colors font-sans"
                >
                  <option value="SaaS">Enterprise SaaS Engineering</option>
                  <option value="Automation">Autonomous Systems & Agent Swarms</option>
                  <option value="R&D">Applied Deep Tech R&D</option>
                  <option value="All">Comprehensive Architecture Modernization</option>
                </select>
              </div>
            </div>

            {/* Message */}
            <div className="space-y-2">
              <label className="text-xs font-mono text-slate-700 dark:text-slate-300">
                TECHNICAL SCOPE & OBJECTIVES *
              </label>
              <textarea
                required
                rows={4}
                placeholder="Outline your architectural challenges, performance requirements, latency targets, or R&D goals..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-4 py-3 rounded-lg bg-slate-50 dark:bg-slate-900/80 border border-slate-300 dark:border-white/10 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-500 transition-colors font-sans"
              />
            </div>

            {/* Submission Button */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-[11px] font-mono text-slate-500 flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                <span>END-TO-END ENCRYPTED // RATE-LIMIT GUARD ENFORCED</span>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={loading}
                className="w-full sm:w-auto px-8 py-3.5 rounded-lg bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white text-xs font-mono font-bold tracking-wider uppercase transition-all shadow-[0_0_25px_rgba(0,240,255,0.25)] flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>TRANSMITTING...</span>
                  </>
                ) : (
                  <>
                    <span>TRANSMIT BRIEF</span>
                    <Send className="w-3.5 h-3.5" />
                  </>
                )}
              </motion.button>
            </div>
          </form>
        )}
      </motion.div>
    </section>
  );
}
