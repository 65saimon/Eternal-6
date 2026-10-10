import React from "react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { PearlDivider } from "@/components/ui/PearlDivider";
import { ProductCard, ProductItem } from "@/components/shop/ProductCard";
import {
  Sparkles,
  ArrowRight,
  Shield,
  Palette,
  Heart,
  Clock,
  CheckCircle2,
  Phone,
  Compass,
  Star
} from "lucide-react";
import { LuxuryHeroVisual } from "@/components/hero/LuxuryHeroVisual";
import { LuxuryParticles } from "@/components/ui/LuxuryParticles";
import { MotionReveal } from "@/components/ui/MotionReveal";

export const revalidate = 60; // ISR cache 60s

export default async function HomePage() {
  // Fetch products, services, and reviews from database
  const [bestsellers, pearlEditProducts, reviews, services] = await Promise.all([
    prisma.product.findMany({
      where: { isPublished: true, isFeatured: true },
      take: 8,
      orderBy: { createdAt: "desc" },
    }),
    prisma.product.findMany({
      where: { isPublished: true, isPearlEdit: true },
      take: 4,
      orderBy: { createdAt: "desc" },
    }),
    prisma.customerReview.findMany({
      where: { isFeatured: true },
      take: 4,
      orderBy: { createdAt: "desc" },
    }),
    prisma.handArtService.findMany({
      where: { isPublished: true },
      take: 3,
      orderBy: { createdAt: "asc" },
    }),
  ]);

  const collections = [
    {
      title: "The Pearl Edit",
      subtitle: "Bespoke Moti & Pearl Lace Accents",
      image: "/images/eternal6/crops/blossom-pink-pearl-embroidery.jpg",
      href: "/collections/the-pearl-edit",
      tag: "SIGNATURE",
    },
    {
      title: "Zafran Block Prints",
      subtitle: "Featherlight Breathable Everyday Comfort",
      image: "/images/eternal6/crops/coral-rose-zafran-blockprint.jpg",
      href: "/shop?material=Zafran",
      tag: "BESTSELLER",
    },
    {
      title: "Bridal & Stone Work",
      subtitle: "Bedazzling Crystals & Karchupi Needlework",
      image: "/images/eternal6/crops/sunshine-yellow-muna-jori.jpg",
      href: "/shop?category=Bridal",
      tag: "COUTURE",
    },
    {
      title: "Sacred Hand Art & Gifts",
      subtitle: "Miniature Kaaba Art & Bespoke Sets",
      image: "/images/eternal6/842034237_122121242289417938_3343087035543472055_n.jpg",
      href: "/shop?category=Gift%20Sets",
      tag: "HANDCRAFTED",
    },
  ];

  return (
    <div className="space-y-20 sm:space-y-28">
      {/* 1. LUXURY HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#FFF9F2] via-[#F4EBDD]/60 to-[#FFF9F2] pt-8 sm:pt-16 pb-16 sm:pb-24 border-b border-[#D6B878]/30">
        {/* Soft background glow accents & Ambient Floating Pearl/Gold Particles */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#D6B878]/15 blur-3xl rounded-full pointer-events-none" />
        <LuxuryParticles count={32} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Narrative Column */}
            <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 border border-[#D6B878]/40 shadow-sm float-gentle">
                <span className="w-2 h-2 rounded-full bg-[#D6B878] pearl-glow" />
                <span className="text-xs uppercase tracking-[0.22em] text-[#8C7654] font-semibold">
                  CHATTOGRAM BOUTIQUE ATELIER
                </span>
              </div>

              <h1 className="font-serif-luxury text-4xl sm:text-5xl lg:text-6xl font-bold text-[#342722] leading-[1.12]">
                Elegance That <br />
                <span className="gold-gradient-text luster-animated italic font-serif">Lasts Forever.</span>
              </h1>

              <p className="text-base sm:text-lg text-[#342722]/80 leading-relaxed max-w-xl mx-auto lg:mx-0">
                Discover timeless hijabs and beautiful hand art, thoughtfully chosen to celebrate your unique style. Handcrafted stone-work drapes, breathable Zafran fabrics, and bespoke ceremonial mehendi.
              </p>

              {/* CTAs */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <Link
                  href="/shop"
                  className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#342722] hover:bg-[#4A3932] text-[#FFF9F2] text-sm font-semibold tracking-wider uppercase transition-all shadow-lg hover:shadow-2xl hover:-translate-y-0.5 flex items-center justify-center gap-2 group border border-[#D6B878]/40 sheen-overlay"
                >
                  <span>Explore Hijabs</span>
                  <ArrowRight className="w-4 h-4 text-[#D6B878] group-hover:translate-x-1.5 transition-transform" />
                </Link>

                <Link
                  href="/hand-art"
                  className="w-full sm:w-auto px-8 py-4 rounded-full bg-white/90 hover:bg-[#F4EBDD] text-[#342722] text-sm font-semibold tracking-wider uppercase transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5 border border-[#D6B878]/60 flex items-center justify-center gap-2 group"
                >
                  <Sparkles className="w-4 h-4 text-[#B89A58] group-hover:rotate-12 transition-transform" />
                  <span>Discover Hand Art</span>
                </Link>
              </div>

              {/* Trust Badges */}
              <div className="pt-6 grid grid-cols-3 gap-4 border-t border-[#D6B878]/30 max-w-md mx-auto lg:mx-0 text-left">
                <div className="transition-transform hover:scale-105">
                  <div className="font-serif-luxury text-lg font-bold text-[#342722]">100%</div>
                  <div className="text-[11px] text-[#8C7654] uppercase tracking-wider">Original Craft</div>
                </div>
                <div className="transition-transform hover:scale-105">
                  <div className="font-serif-luxury text-lg font-bold text-[#342722]">7 Days</div>
                  <div className="text-[11px] text-[#8C7654] uppercase tracking-wider">Custom Creation</div>
                </div>
                <div className="transition-transform hover:scale-105">
                  <div className="font-serif-luxury text-lg font-bold text-[#342722]">COD</div>
                  <div className="text-[11px] text-[#8C7654] uppercase tracking-wider">All Bangladesh</div>
                </div>
              </div>
            </div>

            {/* Right Editorial Campaign Artwork with 3D Tilt & Floating Badge */}
            <div className="lg:col-span-6">
              <LuxuryHeroVisual />
            </div>
          </div>
        </div>
      </section>

      {/* 2. FEATURED COLLECTIONS */}
      <MotionReveal>
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs uppercase tracking-[0.25em] text-[#8C7654] font-semibold">
              CURATED SELECTIONS
            </span>
            <h2 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-[#342722] mt-2">
              Featured Collections
            </h2>
            <PearlDivider className="my-4" />
            <p className="text-sm text-[#342722]/70">
              From daily breathable modesty to ceremonial splendor, explore creations made with devotion.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {collections.map((col, idx) => (
              <Link
                key={idx}
                href={col.href}
                className="group relative rounded-2xl overflow-hidden aspect-[3/4] bg-[#342722] shadow-md hover:shadow-2xl transition-all duration-500 border border-[#D6B878]/30 sheen-overlay hover:-translate-y-1.5"
              >
                <img
                  src={col.image}
                  alt={col.title}
                  className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-108"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#342722]/90 via-[#342722]/30 to-transparent" />

                <div className="absolute top-4 left-4">
                  <span className="px-2.5 py-1 text-[10px] font-bold tracking-widest text-[#342722] bg-[#D6B878] rounded-full uppercase shadow">
                    {col.tag}
                  </span>
                </div>

                <div className="absolute bottom-6 left-6 right-6 space-y-1.5 text-white">
                  <h3 className="font-serif-luxury text-xl font-bold group-hover:text-[#D6B878] transition-colors">
                    {col.title}
                  </h3>
                  <p className="text-xs text-[#E7D8C5]/80 line-clamp-1">
                    {col.subtitle}
                  </p>
                  <div className="pt-2 flex items-center gap-1.5 text-xs text-[#D6B878] font-semibold tracking-wider uppercase">
                    <span>Explore Collection</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </MotionReveal>

      {/* 3. SIGNATURE SECTION: THE PEARL EDIT */}
      <MotionReveal delay={0.1}>
        <section className="bg-gradient-to-r from-[#F4EBDD]/70 via-[#FFF9F2] to-[#F4EBDD]/70 py-20 border-y border-[#D6B878]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Visual Mosaic Column */}
            <div className="lg:col-span-6 relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="rounded-2xl overflow-hidden shadow-lg aspect-[4/5] border border-[#D6B878]/40 bg-white">
                    <img
                      src="/images/eternal6/crops/blossom-pink-pearl-embroidery.jpg"
                      alt="Blossom Pink Pearl Hijab"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="rounded-2xl overflow-hidden shadow-lg aspect-square border border-[#D6B878]/40 bg-white">
                    <img
                      src="/images/eternal6/crops/emerald-forest-zafran-embroidery.jpg"
                      alt="Emerald Forest Hand Embroidery"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="space-y-4 pt-8">
                  <div className="rounded-2xl overflow-hidden shadow-lg aspect-square border border-[#D6B878]/40 bg-white">
                    <img
                      src="/images/eternal6/crops/dark-emerald-pearl-scallop.jpg"
                      alt="Dark Emerald Pearl Scallop Hijab"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="rounded-2xl overflow-hidden shadow-lg aspect-[4/5] border border-[#D6B878]/40 bg-white">
                    <img
                      src="/images/eternal6/805314166_122115560925417938_1637008765454708263_n.jpg"
                      alt="Eternal 6 Royal Azure Duo"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Editorial Story Column */}
            <div className="lg:col-span-6 space-y-6 lg:pl-6">
              <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#8C7654] font-semibold">
                <Sparkles className="w-4 h-4 text-[#D6B878]" />
                SIGNATURE BOUTIQUE EDIT
              </div>

              <h2 className="font-serif-luxury text-3xl sm:text-5xl font-bold text-[#342722] leading-tight">
                The Pearl Edit
              </h2>

              <p className="text-base text-[#342722]/80 leading-relaxed">
                Pearls (*moti*) symbolize pure elegance and modest grace. In <strong>The Pearl Edit</strong>, our artisans hand-stitch luminous seed pearls into delicate scalloped lace borders, floral bouquets, and bespoke calligraphic veils.
              </p>

              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#D6B878]/20 flex items-center justify-center mt-0.5 text-[#8C6E33] font-bold text-xs">
                    ✓
                  </div>
                  <span className="text-sm text-[#342722]/85">
                    Hand-anchored moti pearl beads that will not loosen during normal wear
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#D6B878]/20 flex items-center justify-center mt-0.5 text-[#8C6E33] font-bold text-xs">
                    ✓
                  </div>
                  <span className="text-sm text-[#342722]/85">
                    Premium textured Zafran and flowing Korean Georgette fabrics
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#D6B878]/20 flex items-center justify-center mt-0.5 text-[#8C6E33] font-bold text-xs">
                    ✓
                  </div>
                  <span className="text-sm text-[#342722]/85">
                    Coordinated gift-ready packaging with signature brass metal pins
                  </span>
                </div>
              </div>

              <div className="pt-4">
                <Link
                  href="/collections/the-pearl-edit"
                  className="inline-flex items-center gap-3 px-8 py-3.5 rounded-full bg-[#342722] hover:bg-[#4A3932] text-[#FFF9F2] text-sm font-semibold tracking-wider uppercase transition-all shadow-md hover:shadow-xl hover:-translate-y-0.5 group sheen-overlay"
                >
                  <span>Explore The Pearl Edit</span>
                  <ArrowRight className="w-4 h-4 text-[#D6B878] group-hover:translate-x-1.5 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      </MotionReveal>

      {/* 4. BESTSELLERS & NEW ARRIVALS */}
      <MotionReveal>
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
            <div>
              <span className="text-xs uppercase tracking-[0.25em] text-[#8C7654] font-semibold">
                HAUTE MODESTY
              </span>
              <h2 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-[#342722] mt-1">
                Bestsellers & New Arrivals
              </h2>
              <p className="text-sm text-[#342722]/70 mt-1">
                Authentic products with transparent pricing in Bangladeshi Taka (৳).
              </p>
            </div>
            <Link
              href="/shop"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#8C6E33] hover:text-[#342722] transition-colors group"
            >
              <span>View All Products ({bestsellers.length}+)</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {bestsellers.map((product) => (
              <ProductCard
                key={product.id}
                product={product as unknown as ProductItem}
              />
            ))}
          </div>
        </section>
      </MotionReveal>

      {/* 5. HAND-ART & MEHENDI SHOWCASE */}
      <MotionReveal>
        <section className="relative overflow-hidden bg-[#342722] text-[#F4EBDD] py-20 sm:py-28 rounded-3xl mx-4 sm:mx-6 lg:mx-8 shadow-2xl border border-[#D6B878]/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              {/* Text & CTAs */}
              <div className="lg:col-span-5 space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#4A3932] text-[#D6B878] text-xs font-semibold tracking-widest uppercase border border-[#D6B878]/30">
                  <Palette className="w-3.5 h-3.5" />
                  ATELIER MEHENDI SERVICES
                </div>

                <h2 className="font-serif-luxury text-3xl sm:text-5xl font-bold text-white leading-tight">
                  Artistry at Your <br />
                  <span className="text-[#D6B878] luster-animated italic font-serif">Fingertips.</span>
                </h2>

                <p className="text-sm sm:text-base text-[#E7D8C5]/80 leading-relaxed">
                  Discover intricate mehendi and hand-art designs created for meaningful moments, celebrations, and personal expression. From full bridal ceremonies across Chittagong to festive Eid parties and sacred Islamic calligraphy canvases.
                </p>

                <div className="pt-2 flex flex-col sm:flex-row gap-4">
                  <Link
                    href="/hand-art/book"
                    className="px-7 py-3.5 rounded-full bg-[#D6B878] hover:bg-[#B89A58] text-[#342722] text-xs font-bold uppercase tracking-wider transition-all shadow-md hover:shadow-xl hover:-translate-y-0.5 flex items-center justify-center gap-2 group sheen-overlay"
                  >
                    <span>Book Appointment</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                  </Link>
                  <Link
                    href="/hand-art"
                    className="px-7 py-3.5 rounded-full bg-[#4A3932] hover:bg-[#5C483F] text-white text-xs font-semibold uppercase tracking-wider transition-all hover:-translate-y-0.5 flex items-center justify-center border border-[#D6B878]/30"
                  >
                    <span>View Full Portfolio</span>
                  </Link>
                </div>
              </div>

              {/* Service Cards Grid */}
              <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-5">
                {services.map((srv) => (
                  <div
                    key={srv.id}
                    className="bg-[#2D211C] p-5 rounded-2xl border border-[#D6B878]/30 hover:border-[#D6B878] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl flex flex-col justify-between space-y-4 group"
                  >
                    <div className="space-y-3">
                      <div className="aspect-[4/3] rounded-xl overflow-hidden bg-[#1A110D]">
                        <img src={srv.image} alt={srv.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-108" />
                      </div>
                      <h3 className="font-serif-luxury text-base font-semibold text-white group-hover:text-[#D6B878] transition-colors">
                        {srv.title}
                      </h3>
                      <p className="text-xs text-[#E7D8C5]/70 line-clamp-2">
                        {srv.description}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-[#D6B878]/20 flex items-center justify-between text-xs">
                      <span className="font-mono text-[#D6B878] font-bold">
                        {srv.startingPrice ? `From ৳${srv.startingPrice}` : "Consultation"}
                      </span>
                      <span className="text-[#E7D8C5]/60 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {srv.duration}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </MotionReveal>

      {/* 6. BRAND VALUES (FOUR UNDERSTATED FEATURES + CUSTOM HIJABS) */}
      <MotionReveal>
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="text-xs uppercase tracking-[0.25em] text-[#8C7654] font-semibold">
              THE ETERNAL STANDARD
            </span>
            <h2 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-[#342722] mt-1">
              Our Brand Values
            </h2>
            <PearlDivider className="my-4" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="luxury-card p-6 rounded-2xl space-y-3 text-center sm:text-left hover:-translate-y-1.5 transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-[#F4EBDD] flex items-center justify-center text-[#B89A58] mx-auto sm:mx-0">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="font-serif-luxury text-lg font-bold text-[#342722]">Timeless Style</h3>
              <p className="text-xs text-[#342722]/75 leading-relaxed">
                Designs that transcend fleeting trends. Silhouettes and palettes intended to look as graceful decades from now as they do today.
              </p>
            </div>

            <div className="luxury-card p-6 rounded-2xl space-y-3 text-center sm:text-left hover:-translate-y-1.5 transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-[#F4EBDD] flex items-center justify-center text-[#B89A58] mx-auto sm:mx-0">
                <Shield className="w-6 h-6" />
              </div>
              <h3 className="font-serif-luxury text-lg font-bold text-[#342722]">Thoughtful Selection</h3>
              <p className="text-xs text-[#342722]/75 leading-relaxed">
                Breathable Zafran fabrics, featherlight Korean Georgette, and Muna Jori chosen specifically for Bangladesh’s tropical climate.
              </p>
            </div>

            <div className="luxury-card p-6 rounded-2xl space-y-3 text-center sm:text-left hover:-translate-y-1.5 transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-[#F4EBDD] flex items-center justify-center text-[#B89A58] mx-auto sm:mx-0">
                <Palette className="w-6 h-6" />
              </div>
              <h3 className="font-serif-luxury text-lg font-bold text-[#342722]">Creative Artistry</h3>
              <p className="text-xs text-[#342722]/75 leading-relaxed">
                Hand stone setting, Karchupi needlecraft, natural block printing, and custom Bengali & Arabic family name calligraphy.
              </p>
            </div>

            <div className="luxury-card p-6 rounded-2xl space-y-3 text-center sm:text-left hover:-translate-y-1.5 transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-[#F4EBDD] flex items-center justify-center text-[#B89A58] mx-auto sm:mx-0">
                <Heart className="w-6 h-6" />
              </div>
              <h3 className="font-serif-luxury text-lg font-bold text-[#342722]">Personal Service</h3>
              <p className="text-xs text-[#342722]/75 leading-relaxed">
                Direct WhatsApp styling concierge, custom 7-day atelier creations, and attentive doorstep delivery across Chattogram and beyond.
              </p>
            </div>
          </div>
        </section>
      </MotionReveal>

      {/* 7. AUTHENTIC CUSTOMER PROOF & REVIEWS */}
      <MotionReveal>
        <section className="bg-[#F4EBDD]/40 py-20 border-t border-[#D6B878]/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-xl mx-auto mb-12">
              <span className="text-xs uppercase tracking-[0.25em] text-[#8C7654] font-semibold">
                VOICES OF OUR PATRONS
              </span>
              <h2 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-[#342722] mt-1">
                Customer Reviews
              </h2>
              <PearlDivider className="my-4" />
              <p className="text-xs text-[#8C7654]">
                Authentic feedback from verified customers and social media orders.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {reviews.map((rev) => (
                <div
                  key={rev.id}
                  className="bg-white p-6 rounded-2xl border border-[#D6B878]/30 shadow-sm flex flex-col justify-between space-y-4 hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
                >
                  <div className="space-y-3">
                    <div className="flex items-center gap-1 text-[#D6B878]">
                      {Array.from({ length: rev.rating }).map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                    <p className="text-xs sm:text-sm text-[#342722]/85 italic leading-relaxed">
                      “{rev.comment}”
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#D6B878]/20 flex items-center justify-between text-xs">
                    <div>
                      <span className="font-semibold text-[#342722] block">{rev.customerName}</span>
                      <span className="text-[#8C7654] text-[11px]">{rev.location}</span>
                    </div>
                    {rev.isVerified && (
                      <span className="text-[10px] bg-emerald-50 text-emerald-700 font-medium px-2 py-0.5 rounded-full border border-emerald-200">
                        Verified Buyer
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Screenshot Showcase of Facebook review */}
            <div className="mt-12 p-6 rounded-2xl bg-white border border-[#D6B878]/40 shadow-sm max-w-xl mx-auto flex flex-col sm:flex-row items-center gap-6 hover:shadow-md transition-shadow">
              <div className="w-32 h-24 rounded-lg overflow-hidden border border-[#D6B878]/30 flex-shrink-0 bg-[#342722]">
                <img
                  src="/images/eternal6/802964754_122115124659417938_5118599167599239360_n.jpg"
                  alt="Verified Facebook Review"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="space-y-1 text-center sm:text-left">
                <span className="text-[11px] font-bold text-[#8C6E33] uppercase tracking-wider">
                  Direct Facebook Patron Testimonial
                </span>
                <p className="text-xs text-[#342722]/80 italic">
                  “কাপড়ের কোয়ালিটি এবং ডিজাইন দুইটাই গতানুগতিক ধারার থেকে ভিন্ন... সারপ্রাইজ গিফটা দারুণ ছিলো!”
                </p>
                <div className="text-[11px] text-[#8C7654]">
                  From official Eternal 6 - Timeless Elegance Facebook community
                </div>
              </div>
            </div>
          </div>
        </section>
      </MotionReveal>
    </div>
  );
}
