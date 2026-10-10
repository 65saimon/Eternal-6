"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ShoppingBag,
  Heart,
  Search,
  Menu,
  X,
  Phone,
  Sparkles,
  User,
  ShieldCheck
} from "lucide-react";
import { EternalLogo } from "@/components/brand/EternalLogo";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";

export function Navbar() {
  const pathname = usePathname();
  const { totalCount } = useCart();
  const { totalWishlist } = useWishlist();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Shop Hijabs", href: "/shop" },
    { label: "The Pearl Edit", href: "/collections/the-pearl-edit", highlight: true },
    { label: "Hand Art", href: "/hand-art" },
    { label: "Gallery", href: "/gallery" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/shop?q=${encodeURIComponent(searchQuery.trim())}`;
      setSearchOpen(false);
    }
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-[#FFF9F2]/90 backdrop-blur-md border-b border-[#D6B878]/25 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Mobile Menu Button */}
            <div className="flex items-center lg:hidden">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                className="p-2 text-[#342722] hover:text-[#B89A58] transition-colors"
                aria-label="Open menu"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>

            {/* Brand Logo */}
            <div className="flex-shrink-0 flex items-center">
              <EternalLogo height={44} />
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`relative text-sm tracking-wide font-medium transition-colors py-1 ${
                      isActive
                        ? "text-[#342722] font-semibold"
                        : "text-[#342722]/80 hover:text-[#B89A58]"
                    } ${link.highlight ? "text-[#9C7938] font-semibold flex items-center gap-1" : ""}`}
                  >
                    {link.highlight && <Sparkles className="w-3.5 h-3.5 text-[#D6B878]" />}
                    {link.label}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#D6B878] rounded-full" />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Action Icons */}
            <div className="flex items-center space-x-4 sm:space-x-5">
              {/* Search Toggle */}
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-2 text-[#342722]/85 hover:text-[#B89A58] transition-colors"
                aria-label="Search products"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Wishlist */}
              <Link
                href="/shop?wishlist=true"
                className="relative p-2 text-[#342722]/85 hover:text-[#B89A58] transition-colors"
                aria-label="View wishlist"
              >
                <Heart className="w-5 h-5" />
                {totalWishlist > 0 && (
                  <span className="absolute top-1 right-1 bg-[#B89A58] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {totalWishlist}
                  </span>
                )}
              </Link>

              {/* Shopping Cart */}
              <Link
                href="/cart"
                className="relative p-2 text-[#342722]/85 hover:text-[#B89A58] transition-colors"
                aria-label="View shopping cart"
              >
                <ShoppingBag className="w-5 h-5" />
                {totalCount > 0 && (
                  <span className="absolute top-1 right-1 bg-[#342722] text-[#D6B878] text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center border border-[#D6B878]">
                    {totalCount}
                  </span>
                )}
              </Link>

              {/* Theme Mode Toggle (Light / Dark) */}
              <ThemeToggle />
            </div>
          </div>
        </div>

        {/* Search Bar Expandable Drawer */}
        {searchOpen && (
          <div className="border-t border-[#D6B878]/30 bg-[#FFF9F2] py-4 px-4 sm:px-8 shadow-inner animate-in fade-in duration-200">
            <form onSubmit={handleSearchSubmit} className="max-w-3xl mx-auto flex items-center gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8C7654]" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by hijab style, fabric (Georgette, Zafran, Muna Jori), color, stone work..."
                  className="w-full pl-11 pr-4 py-2.5 rounded-full border border-[#D6B878]/50 bg-white/90 text-[#342722] text-sm placeholder-[#8C7654]/70 focus:outline-none focus:border-[#B89A58] focus:ring-1 focus:ring-[#B89A58]"
                  autoFocus
                />
              </div>
              <button
                type="submit"
                className="px-5 py-2.5 rounded-full bg-[#342722] hover:bg-[#4A3932] text-[#FFF9F2] text-sm font-medium tracking-wide transition-colors"
              >
                Search
              </button>
              <button
                type="button"
                onClick={() => setSearchOpen(false)}
                className="p-2 text-[#8C7654] hover:text-[#342722]"
                aria-label="Close search"
              >
                <X className="w-5 h-5" />
              </button>
            </form>
          </div>
        )}
      </header>

      {/* Mobile Slide-Out Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-[#342722]/50 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Drawer Panel */}
          <div className="relative w-4/5 max-w-sm bg-[#FFF9F2] h-full shadow-2xl flex flex-col justify-between p-6 z-10 border-r border-[#D6B878]/40 overflow-y-auto">
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-[#D6B878]/30">
                <EternalLogo height={38} />
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 text-[#342722] hover:text-[#B89A58]"
                  aria-label="Close menu"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Navigation Links */}
              <div className="mt-6 flex flex-col space-y-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`text-base font-medium py-2 px-3 rounded-lg transition-colors flex items-center justify-between ${
                      pathname === link.href
                        ? "bg-[#F4EBDD] text-[#342722] font-semibold"
                        : "text-[#342722]/80 hover:bg-[#F4EBDD]/60 hover:text-[#342722]"
                    }`}
                  >
                    <span>{link.label}</span>
                    {link.highlight && <Sparkles className="w-4 h-4 text-[#D6B878]" />}
                  </Link>
                ))}

                <Link
                  href="/track-order"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-base font-medium py-2 px-3 rounded-lg text-[#342722]/80 hover:bg-[#F4EBDD]/60"
                >
                  Track Order
                </Link>

                {/* Theme Mode Toggle inside Drawer */}
                <div className="pt-2 px-1">
                  <ThemeToggle showLabel={true} className="w-full justify-start py-2.5 px-3" />
                </div>
              </div>
            </div>

            {/* Bottom Contact / Concierge Details */}
            <div className="pt-6 border-t border-[#D6B878]/30 space-y-3">
              <a
                href="https://wa.me/8801606266496"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-sm text-[#342722] font-medium"
              >
                <Phone className="w-4 h-4 text-[#25D366]" />
                <span>+880 1606-266496 (WhatsApp)</span>
              </a>
              <p className="text-xs text-[#8C7654]">
                Chattogram Boutique | Modest Luxury Hijabs & Mehendi Art
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
