import React from "react";
import Link from "next/link";
import { PearlDivider } from "@/components/ui/PearlDivider";
import { EternalLogo } from "@/components/brand/EternalLogo";
import {
  Sparkles,
  Shield,
  Palette,
  Heart,
  MapPin,
  Clock,
  ArrowRight
} from "lucide-react";

export default function AboutPage() {
  return (
    <div className="space-y-16 pb-20">
      {/* Editorial Header */}
      <section className="bg-gradient-to-b from-[#FFF9F2] to-[#F4EBDD]/60 py-16 sm:py-24 border-b border-[#D6B878]/30 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-6">
          <div className="flex justify-center mb-4">
            <EternalLogo height={50} withLink={false} />
          </div>

          <span className="text-xs uppercase tracking-[0.28em] text-[#8C7654] font-semibold">
            THE ATELIER STORY
          </span>

          <h1 className="font-serif-luxury text-4xl sm:text-5xl lg:text-6xl font-bold text-[#342722] leading-tight">
            Timeless Elegance, <br />
            <span className="gold-gradient-text italic font-serif">Rooted in Chattogram.</span>
          </h1>

          <p className="text-sm sm:text-base text-[#342722]/80 leading-relaxed max-w-2xl mx-auto">
            Eternal 6 was founded in Chittagong to bring elevated modest couture to modern women across Bangladesh. We blend ancestral hand-embroidery, luminous moti pearl craft, and breathable fabrics into garments designed to endure.
          </p>
        </div>
      </section>

      {/* Narrative & Craftsmanship Column */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs uppercase tracking-[0.25em] text-[#8C7654] font-semibold">
              OUR INSPIRATION
            </span>
            <h2 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-[#342722]">
              The Moti (Pearl) & The Signature 6
            </h2>
            <PearlDivider className="my-2" count={2} />

            <p className="text-xs sm:text-sm text-[#342722]/80 leading-relaxed">
              In Persian and South Asian poetic tradition, the pearl (*moti*) represents inner grace, dignity, and purity. It is an ornament that never shouts; it quietly captivates.
            </p>

            <p className="text-xs sm:text-sm text-[#342722]/80 leading-relaxed">
              The number <strong>6</strong> in our brand symbol evokes continuous harmony—the six folds of a perfectly styled drape, the hexagonal symmetry found in Islamic floral geometry, and the lifelong commitment to timeless style rather than disposable seasonal trends.
            </p>

            <div className="p-5 rounded-2xl bg-[#FFF9F2] border border-[#D6B878]/50 space-y-2">
              <h4 className="font-serif-luxury text-sm font-bold text-[#342722] flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#B89A58]" />
                <span>Custom Hijabs — Maximum 7 Days Creation Time</span>
              </h4>
              <p className="text-xs text-[#342722]/75 leading-relaxed">
                Choose your desired fabric, color, stone work density, or family name embroidery. Our Chittagong atelier brings your vision to life within seven days.
              </p>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-[#D6B878]/40 aspect-[4/5] bg-[#342722]">
              <img
                src="/images/eternal6/794296029_122114004009417938_616685417208810421_n.jpg"
                alt="Eternal 6 Atelier & Craftsmanship"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#342722]/80 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-6 left-6 right-6 text-white text-xs space-y-1">
                <span className="font-bold text-[#D6B878] uppercase tracking-wider text-[11px] block">
                  Official Atelier Release
                </span>
                <p className="text-[#E7D8C5]/90">
                  “Handmade, Unique & Distinct, Affordable Luxury.”
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pillars */}
      <section className="bg-white py-16 border-y border-[#D6B878]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-xl mx-auto">
            <span className="text-xs uppercase tracking-[0.25em] text-[#8C7654] font-semibold">
              OUR PILLARS
            </span>
            <h2 className="font-serif-luxury text-3xl font-bold text-[#342722] mt-1">
              Why Women Choose Eternal 6
            </h2>
            <PearlDivider className="my-3" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-2xl bg-[#FFF9F2] border border-[#D6B878]/30 space-y-3">
              <div className="w-10 h-10 rounded-full bg-[#F4EBDD] flex items-center justify-center text-[#B89A58]">
                <Shield className="w-5 h-5" />
              </div>
              <h3 className="font-serif-luxury text-lg font-bold text-[#342722]">
                Fabric Integrity
              </h3>
              <p className="text-xs text-[#342722]/80 leading-relaxed">
                We select premium Zafran, breathable Korean Georgette, and shimmering Muna Jori fabrics tested specifically for softness, airflow, and drape stability.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#FFF9F2] border border-[#D6B878]/30 space-y-3">
              <div className="w-10 h-10 rounded-full bg-[#F4EBDD] flex items-center justify-center text-[#B89A58]">
                <Palette className="w-5 h-5" />
              </div>
              <h3 className="font-serif-luxury text-lg font-bold text-[#342722]">
                Ceremonial Artistry
              </h3>
              <p className="text-xs text-[#342722]/80 leading-relaxed">
                Beyond veils, we practice organic mehendi artistry and miniature Islamic calligraphy on canvas, honoring South Asian bridal heritage.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#FFF9F2] border border-[#D6B878]/30 space-y-3">
              <div className="w-10 h-10 rounded-full bg-[#F4EBDD] flex items-center justify-center text-[#B89A58]">
                <MapPin className="w-5 h-5" />
              </div>
              <h3 className="font-serif-luxury text-lg font-bold text-[#342722]">
                Local Care in Chattogram
              </h3>
              <p className="text-xs text-[#342722]/80 leading-relaxed">
                Operating directly in Chittagong with fast, reliable doorstep delivery, personalized WhatsApp consultations, and verified Cash on Delivery.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Box */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-6">
        <h2 className="font-serif-luxury text-3xl font-bold text-[#342722]">
          Experience Eternal 6
        </h2>
        <p className="text-xs sm:text-sm text-[#342722]/75 max-w-md mx-auto">
          Explore our latest collection of handcrafted stone-work hijabs or schedule a personal mehendi styling consultation.
        </p>
        <div className="flex justify-center gap-4">
          <Link
            href="/shop"
            className="px-8 py-3.5 rounded-full bg-[#342722] hover:bg-[#4A3932] text-[#FFF9F2] text-xs font-bold uppercase tracking-wider transition-all shadow-md flex items-center gap-2"
          >
            <span>Browse Catalog</span>
            <ArrowRight className="w-4 h-4 text-[#D6B878]" />
          </Link>
        </div>
      </section>
    </div>
  );
}
