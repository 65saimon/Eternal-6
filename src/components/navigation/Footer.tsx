"use client";

import React, { useState } from "react";
import Link from "next/link";
import { EternalLogo } from "@/components/brand/EternalLogo";
import { PearlDivider } from "@/components/ui/PearlDivider";
import {
  Send,
  MapPin,
  Phone,
  Mail,
  CheckCircle,
  Heart
} from "lucide-react";
import { FacebookIcon, InstagramIcon, WhatsAppIcon } from "@/components/ui/SocialIcons";

export function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) return;

    try {
      await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
    } catch {
      // Ignore
    }

    setSubscribed(true);
    setEmail("");
  };

  return (
    <footer className="bg-[#342722] text-[#F4EBDD] pt-16 pb-12 border-t-2 border-[#D6B878]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Column (2 cols on large) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-[#FFF9F2] p-2.5 rounded-lg inline-block shadow-sm">
              <EternalLogo height={38} withLink={false} />
            </div>
            <p className="text-[#E7D8C5]/80 text-sm leading-relaxed max-w-sm">
              Eternal 6 is a boutique modest fashion house based in Chattogram, Bangladesh. We curate handcrafted stone-work hijabs, premium Zafran wraps, and signature mehendi & Islamic hand art for life’s most cherished moments.
            </p>
            <div className="flex items-center space-x-3 pt-2">
              <a
                href="https://www.facebook.com/eternalsix6"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-[#4A3932] flex items-center justify-center text-[#D6B878] hover:bg-[#D6B878] hover:text-[#342722] transition-colors"
                aria-label="Eternal 6 - Timeless Elegance Facebook Page"
                title="Eternal 6 - Timeless Elegance"
              >
                <FacebookIcon className="w-4 h-4" />
              </a>
              <a
                href="https://www.instagram.com/eternal6six"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-[#4A3932] flex items-center justify-center text-[#D6B878] hover:bg-[#D6B878] hover:text-[#342722] transition-colors"
                aria-label="Instagram Profile"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a
                href="https://wa.me/8801606266496"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-[#4A3932] flex items-center justify-center text-[#25D366] hover:bg-[#25D366] hover:text-white transition-colors"
                aria-label="WhatsApp (+880 1606-266496)"
              >
                <WhatsAppIcon className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="font-serif-luxury text-base font-semibold text-[#D6B878] tracking-wider uppercase">
              Collections
            </h4>
            <ul className="space-y-2 text-sm text-[#E7D8C5]/85">
              <li>
                <Link href="/collections/the-pearl-edit" className="hover:text-[#D6B878] transition-colors flex items-center gap-1">
                  <span>The Pearl Edit</span>
                  <span className="text-[10px] bg-[#D6B878]/20 text-[#D6B878] px-1.5 py-0.5 rounded font-mono">NEW</span>
                </Link>
              </li>
              <li>
                <Link href="/shop?material=Zafran" className="hover:text-[#D6B878] transition-colors">
                  Zafran Block Prints
                </Link>
              </li>
              <li>
                <Link href="/shop?category=Bridal" className="hover:text-[#D6B878] transition-colors">
                  Bridal & Stone Work
                </Link>
              </li>
              <li>
                <Link href="/shop?material=Georgette" className="hover:text-[#D6B878] transition-colors">
                  Premium Georgette
                </Link>
              </li>
              <li>
                <Link href="/hand-art" className="hover:text-[#D6B878] transition-colors">
                  Hand Art & Mehendi
                </Link>
              </li>
              <li>
                <Link href="/shop?category=Gift%20Sets" className="hover:text-[#D6B878] transition-colors">
                  Sacred Art Gift Sets
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Care */}
          <div className="space-y-3">
            <h4 className="font-serif-luxury text-base font-semibold text-[#D6B878] tracking-wider uppercase">
              Boutique Care
            </h4>
            <ul className="space-y-2 text-sm text-[#E7D8C5]/85">
              <li>
                <Link href="/track-order" className="hover:text-[#D6B878] transition-colors">
                  Track Your Order
                </Link>
              </li>
              <li>
                <Link href="/hand-art/book" className="hover:text-[#D6B878] transition-colors">
                  Book Mehendi Appointment
                </Link>
              </li>
              <li>
                <Link href="/policies/shipping" className="hover:text-[#D6B878] transition-colors">
                  Delivery & Shipping
                </Link>
              </li>
              <li>
                <Link href="/policies/returns" className="hover:text-[#D6B878] transition-colors">
                  Returns & Exchanges
                </Link>
              </li>
              <li>
                <Link href="/policies/privacy" className="hover:text-[#D6B878] transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/policies/terms" className="hover:text-[#D6B878] transition-colors">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>

          {/* Chattogram Atelier & Newsletter */}
          <div className="space-y-3">
            <h4 className="font-serif-luxury text-base font-semibold text-[#D6B878] tracking-wider uppercase">
              Atelier & Contact
            </h4>
            <div className="space-y-2 text-sm text-[#E7D8C5]/85">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#D6B878] mt-0.5 flex-shrink-0" />
                <span>Chattogram, Bangladesh</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#25D366] flex-shrink-0" />
                <a
                  href="https://wa.me/8801606266496"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#D6B878]"
                >
                  +880 1606-266496 (WhatsApp)
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#D6B878] flex-shrink-0" />
                <a href="mailto:eternal6six@gmail.com" className="hover:text-[#D6B878]">
                  eternal6six@gmail.com
                </a>
              </div>
            </div>

            {/* Newsletter */}
            <div className="pt-3">
              <p className="text-xs text-[#E7D8C5]/70 mb-2">
                Receive invitations to private collection launches and boutique privileges.
              </p>
              {subscribed ? (
                <div className="flex items-center gap-2 text-xs text-[#D6B878] bg-[#4A3932] p-2 rounded-lg">
                  <CheckCircle className="w-4 h-4 text-[#D6B878]" />
                  <span>Thank you for subscribing to Eternal 6.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    className="flex-1 bg-[#241B16] border border-[#D6B878]/40 rounded-lg px-3 py-1.5 text-xs text-[#F4EBDD] placeholder-[#E7D8C5]/40 focus:outline-none focus:border-[#D6B878]"
                  />
                  <button
                    type="submit"
                    className="px-3 py-1.5 bg-[#D6B878] hover:bg-[#B89A58] text-[#342722] rounded-lg text-xs font-semibold transition-colors flex items-center justify-center"
                    aria-label="Subscribe"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Divider */}
        <PearlDivider className="my-10 opacity-30" />

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-[#E7D8C5]/60 gap-4">
          <p>© {new Date().getFullYear()} Eternal 6. All rights reserved. Timeless Elegance™.</p>
          <div className="flex items-center gap-4">
            <span>Official Bangladesh Sales Channels: Website • Facebook • WhatsApp</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
