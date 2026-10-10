"use client";

import React, { useState } from "react";
import { PearlDivider } from "@/components/ui/PearlDivider";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  MessageCircle,
  CheckCircle2,
  Sparkles
} from "lucide-react";
import { FacebookIcon, InstagramIcon } from "@/components/ui/SocialIcons";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    subject: "Product Inquiry",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 space-y-16">
      {/* Header */}
      <div className="text-center max-w-xl mx-auto">
        <span className="text-xs uppercase tracking-[0.25em] text-[#8C7654] font-semibold">
          ATELIER CONCIERGE
        </span>
        <h1 className="font-serif-luxury text-3xl sm:text-5xl font-bold text-[#342722] mt-1">
          Connect With Eternal 6
        </h1>
        <PearlDivider className="my-4" />
        <p className="text-xs sm:text-sm text-[#342722]/70">
          Our Chattogram boutique team is available to assist you with order inquiries, fabric advice, custom embroidery, and ceremonial mehendi appointments.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Information Column (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-[#D6B878]/30 shadow-sm space-y-8">
          <div className="space-y-6">
            <h2 className="font-serif-luxury text-xl font-bold text-[#342722] pb-3 border-b border-[#D6B878]/20">
              Boutique Information
            </h2>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#F4EBDD] flex items-center justify-center text-[#B89A58] flex-shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div className="text-xs space-y-1">
                <span className="font-bold text-[#342722] uppercase tracking-wider block">Atelier Location</span>
                <p className="text-[#342722]/80 leading-relaxed">
                  Chittagong (Chattogram), Bangladesh
                </p>
                <p className="text-[11px] text-[#8C7654]">
                  Serving patrons across all districts in Bangladesh
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#25D366]/10 flex items-center justify-center text-[#25D366] flex-shrink-0 border border-[#25D366]/20">
                <Phone className="w-5 h-5" />
              </div>
              <div className="text-xs space-y-1">
                <span className="font-bold text-[#342722] uppercase tracking-wider block">Phone & WhatsApp Hotline</span>
                <a
                  href="https://wa.me/8801606266496"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#342722] hover:text-[#25D366] font-mono font-bold text-sm block"
                >
                  +880 1606-266496
                </a>
                <p className="text-[11px] text-[#8C7654]">
                  Instant WhatsApp concierge assistance from 10:00 AM to 10:00 PM
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#F4EBDD] flex items-center justify-center text-[#B89A58] flex-shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div className="text-xs space-y-1">
                <span className="font-bold text-[#342722] uppercase tracking-wider block">Email Inquiries</span>
                <a
                  href="mailto:eternal6six@gmail.com"
                  className="text-[#342722] hover:text-[#B89A58] font-mono font-medium block"
                >
                  eternal6six@gmail.com
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#F4EBDD] flex items-center justify-center text-[#B89A58] flex-shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div className="text-xs space-y-1">
                <span className="font-bold text-[#342722] uppercase tracking-wider block">Atelier Hours</span>
                <p className="text-[#342722]/80">Saturday – Thursday: 10:00 AM – 9:00 PM</p>
                <p className="text-[#342722]/80">Friday: 2:30 PM – 9:00 PM</p>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="pt-6 border-t border-[#D6B878]/30 space-y-3">
            <span className="text-xs uppercase tracking-wider font-semibold text-[#8C7654] block">
              Official Social Channels
            </span>
            <div className="flex items-center gap-3">
              <a
                href="https://www.facebook.com/eternalsix6"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-xl bg-[#1877F2]/10 text-[#1877F2] hover:bg-[#1877F2] hover:text-white text-xs font-semibold flex items-center gap-2 transition-colors border border-[#1877F2]/20"
                title="Eternal 6 - Timeless Elegance"
              >
                <FacebookIcon className="w-4 h-4" />
                <span>Eternal 6 - Timeless Elegance</span>
              </a>

              <a
                href="https://www.instagram.com/eternal6six"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-xl bg-[#E4405F]/10 text-[#E4405F] hover:bg-[#E4405F] hover:text-white text-xs font-semibold flex items-center gap-2 transition-colors border border-[#E4405F]/20"
              >
                <InstagramIcon className="w-4 h-4" />
                <span>Instagram</span>
              </a>
            </div>
          </div>
        </div>

        {/* Right Form Column (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-10 border border-[#D6B878]/30 shadow-sm space-y-6">
          <h2 className="font-serif-luxury text-xl font-bold text-[#342722] pb-2 border-b border-[#D6B878]/20">
            Send an Inquiry
          </h2>

          {submitted ? (
            <div className="p-8 text-center bg-[#FFF9F2] rounded-2xl border border-[#D6B878]/40 space-y-3">
              <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
              <h3 className="font-serif-luxury text-lg font-bold text-[#342722]">
                Message Received
              </h3>
              <p className="text-xs text-[#342722]/80 max-w-sm mx-auto">
                Thank you for contacting Eternal 6. A boutique representative will review your message and reach out shortly.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="px-6 py-2 rounded-full border border-[#D6B878] text-xs font-semibold text-[#342722]"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-[#342722] block mb-1">
                    Your Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Tanjina Akhter"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#D6B878]/40 bg-[#FFF9F2] text-xs text-[#342722] focus:outline-none focus:border-[#B89A58]"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#342722] block mb-1">
                    Phone Number <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="e.g. 01812345678"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#D6B878]/40 bg-[#FFF9F2] text-xs font-mono text-[#342722] focus:outline-none focus:border-[#B89A58]"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-[#342722] block mb-1">
                  Subject / Topic
                </label>
                <select
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#D6B878]/40 bg-[#FFF9F2] text-xs text-[#342722] focus:outline-none focus:border-[#B89A58]"
                >
                  <option value="Product Inquiry">Product Inquiry / Stock Confirmation</option>
                  <option value="Custom Order">Bespoke Name Embroidery / Custom Hijab</option>
                  <option value="Mehendi Booking">Mehendi / Hand Art Appointment</option>
                  <option value="Delivery Status">Delivery / Order Tracking</option>
                  <option value="Wholesale">Wholesale & Gift Hamper Collaboration</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-[#342722] block mb-1">
                  Message <span className="text-rose-500">*</span>
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="How can our stylists assist you?"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#D6B878]/40 bg-[#FFF9F2] text-xs text-[#342722] focus:outline-none focus:border-[#B89A58]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-full bg-[#342722] hover:bg-[#4A3932] text-[#FFF9F2] text-xs font-bold uppercase tracking-widest transition-all shadow-md flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4 text-[#D6B878]" />
                <span>Submit Inquiry</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
