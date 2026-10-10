import React from "react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { PearlDivider } from "@/components/ui/PearlDivider";
import {
  Palette,
  Sparkles,
  Clock,
  Calendar,
  CheckCircle2,
  ArrowRight,
  Phone,
  ShieldCheck
} from "lucide-react";

export const revalidate = 60;

export default async function HandArtPage() {
  const services = await prisma.handArtService.findMany({
    where: { isPublished: true },
    orderBy: { createdAt: "asc" },
  });

  return (
    <div className="space-y-16 pb-20">
      {/* Hero Header */}
      <section className="relative bg-gradient-to-b from-[#342722] via-[#2A1E19] to-[#342722] text-[#F4EBDD] py-20 px-4 sm:px-8 overflow-hidden border-b-2 border-[#D6B878]/40">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#D6B878]/10 blur-3xl rounded-full pointer-events-none" />

        <div className="max-w-4xl mx-auto text-center relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#4A3932] border border-[#D6B878]/30 text-xs uppercase tracking-widest text-[#D6B878] font-semibold">
            <Palette className="w-3.5 h-3.5" />
            <span>CEREMONIAL & BRIDAL ARTISTRY</span>
          </div>

          <h1 className="font-serif-luxury text-4xl sm:text-5xl font-bold text-white">
            Mehendi & Hand Art Boutique
          </h1>

          <p className="font-serif italic text-lg sm:text-xl text-[#D6B878]">
            Intricate patterns created for life’s most cherished celebrations
          </p>

          <p className="text-xs sm:text-sm text-[#E7D8C5]/85 leading-relaxed max-w-2xl mx-auto pt-2">
            Eternal 6 provides bespoke bridal mehendi, Arabic contemporary styling, minimal chic motifs, and sacred Islamic calligraphy art across Chittagong and Bangladesh.
          </p>

          <div className="pt-4 flex justify-center gap-4">
            <Link
              href="/hand-art/book"
              className="px-8 py-3.5 rounded-full bg-[#D6B878] hover:bg-[#B89A58] text-[#342722] text-xs font-bold uppercase tracking-wider transition-all shadow-lg flex items-center gap-2"
            >
              <span>Book Appointment</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-xl mx-auto">
          <span className="text-xs uppercase tracking-[0.25em] text-[#8C7654] font-semibold">
            SERVICE CATEGORIES
          </span>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-[#342722] mt-1">
            Artistry Packages
          </h2>
          <PearlDivider className="my-3" />
          <p className="text-xs text-[#342722]/70">
            Appointments are scheduled with dedicated lead times. Customization available for every bride and occasion.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((srv) => (
            <div
              key={srv.id}
              className="bg-white rounded-3xl overflow-hidden border border-[#D6B878]/30 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-[16/10] overflow-hidden bg-[#F4EBDD]">
                  <img
                    src={srv.image}
                    alt={srv.title}
                    className="w-full h-full object-cover object-center"
                  />
                  <div className="absolute top-3 left-3 bg-[#342722]/80 backdrop-blur-sm text-[#D6B878] text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full border border-[#D6B878]/40">
                    {srv.category}
                  </div>
                </div>

                <div className="p-6 space-y-3">
                  <h3 className="font-serif-luxury text-xl font-bold text-[#342722]">
                    {srv.title}
                  </h3>

                  <p className="text-xs text-[#342722]/80 leading-relaxed">
                    {srv.description}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0 space-y-4">
                <div className="flex items-center justify-between text-xs py-3 border-t border-[#D6B878]/20">
                  <div className="space-y-0.5">
                    <span className="text-[10px] text-[#8C7654] uppercase tracking-wider block">Estimated Duration</span>
                    <span className="font-medium text-[#342722] flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-[#B89A58]" />
                      {srv.duration}
                    </span>
                  </div>

                  <div className="text-right space-y-0.5">
                    <span className="text-[10px] text-[#8C7654] uppercase tracking-wider block">Starting Rate</span>
                    <span className="font-mono text-base font-bold text-[#342722]">
                      {srv.startingPrice ? `৳${srv.startingPrice.toLocaleString()}` : "Custom Quote"}
                    </span>
                  </div>
                </div>

                <Link
                  href={`/hand-art/book?service=${encodeURIComponent(srv.title)}`}
                  className="w-full py-3 rounded-full bg-[#342722] hover:bg-[#4A3932] text-[#FFF9F2] text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-2 group"
                >
                  <span>Book This Service</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#D6B878] group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Booking Reassurance / Guidelines */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#F4EBDD]/50 rounded-3xl p-8 sm:p-12 border border-[#D6B878]/40 space-y-6">
          <div className="max-w-2xl">
            <span className="text-xs uppercase tracking-[0.25em] text-[#8C7654] font-semibold">
              ATELIER PROTOCOLS
            </span>
            <h3 className="font-serif-luxury text-2xl font-bold text-[#342722] mt-1">
              What to Expect With Eternal 6 Mehendi Art
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-2">
            <div className="space-y-2">
              <div className="font-bold text-xs uppercase tracking-wider text-[#8C6E33] flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#B89A58]" />
                <span>100% Organic Henna</span>
              </div>
              <p className="text-xs text-[#342722]/80 leading-relaxed">
                We use pure, chemical-free henna cones infused with therapeutic cajeput and eucalyptus oils for a deep burgundy stain without skin irritation.
              </p>
            </div>

            <div className="space-y-2">
              <div className="font-bold text-xs uppercase tracking-wider text-[#8C6E33] flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-[#B89A58]" />
                <span>Atelier or Venue Visit</span>
              </div>
              <p className="text-xs text-[#342722]/80 leading-relaxed">
                Artists are available for bridal visits across Chittagong metropolitan areas, or private sessions at our atelier.
              </p>
            </div>

            <div className="space-y-2">
              <div className="font-bold text-xs uppercase tracking-wider text-[#8C6E33] flex items-center gap-1.5">
                <Phone className="w-4 h-4 text-[#B89A58]" />
                <span>Advance Consultation</span>
              </div>
              <p className="text-xs text-[#342722]/80 leading-relaxed">
                After form submission, our stylist contacts you via WhatsApp or phone to finalize design sketches, motifs, and appointment time.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
