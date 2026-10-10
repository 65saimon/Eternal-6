"use client";

import React, { useState } from "react";
import { PearlDivider } from "@/components/ui/PearlDivider";
import { Sparkles, X, Eye } from "lucide-react";

interface GalleryItem {
  id: string;
  title: string;
  category: "Campaigns" | "Hand Art" | "The Pearl Edit" | "Craftsmanship";
  image: string;
  description: string;
}

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "g1",
    title: "Timeless Elegance Campaign Duo",
    category: "Campaigns",
    image: "/images/eternal6/801035952_122115620427417938_1668672352969936787_n.jpg",
    description: "Editorial campaign showcasing breathable Zafran block prints in soft rose and warm sand.",
  },
  {
    id: "g2",
    title: "Royal Azure Floral Duo",
    category: "Campaigns",
    image: "/images/eternal6/805314166_122115560925417938_1637008765454708263_n.jpg",
    description: "Artisanal hand fabric paint work outlined in glittering gold thread.",
  },
  {
    id: "g3",
    title: "Atelier Handcraft & Swatches",
    category: "Craftsmanship",
    image: "/images/eternal6/794296029_122114004009417938_616685417208810421_n.jpg",
    description: "Meticulous tailoring, fabric testing, and 7-day custom creation process in Chittagong.",
  },
  {
    id: "g4",
    title: "Blossom Pink Moti Pearl Lace",
    category: "The Pearl Edit",
    image: "/images/eternal6/crops/blossom-pink-pearl-embroidery.jpg",
    description: "Hand-anchored pearl beads nestled inside scalloped botanical lace borders.",
  },
  {
    id: "g5",
    title: "Dark Emerald Pearl Scallops",
    category: "The Pearl Edit",
    image: "/images/eternal6/crops/dark-emerald-pearl-scallop.jpg",
    description: "Regal forest green Zafran drape accented with pure white moti pearls.",
  },
  {
    id: "g6",
    title: "Ruby Red Karchupi Needlecraft",
    category: "Campaigns",
    image: "/images/eternal6/crops/ruby-red-zafran-karchupi.jpg",
    description: "Traditional South Asian gold thread chainwork for bridal receptions.",
  },
  {
    id: "g7",
    title: "Sunshine Yellow Bedazzling Stone Work",
    category: "The Pearl Edit",
    image: "/images/eternal6/crops/sunshine-yellow-muna-jori.jpg",
    description: "Textured Muna Jori fabric embellished with radiant stone clusters.",
  },
  {
    id: "g8",
    title: "Sacred Kaaba Canvas & Calligraphic Veil",
    category: "Hand Art",
    image: "/images/eternal6/842034237_122121242289417938_3343087035543472055_n.jpg",
    description: "Hand-painted acrylic miniature Kaaba art canvas paired with personalized calligraphic embroidery.",
  },
  {
    id: "g9",
    title: "Bespoke Calligraphy Name Embroidery",
    category: "Craftsmanship",
    image: "/images/eternal6/839167560_122121242229417938_2917651611701043024_n.jpg",
    description: "Bengali and Arabic family names hand-stitched into pure silk-georgette keepsake veils.",
  },
  {
    id: "g10",
    title: "Ivory Magenta Mirror Florets",
    category: "Campaigns",
    image: "/images/eternal6/crops/ivory-magenta-mirror-work.jpg",
    description: "Lightweight block prints with hand-set reflective mirrors.",
  },
  {
    id: "g11",
    title: "Royal Teal Tiara Crystal Work",
    category: "Campaigns",
    image: "/images/eternal6/crops/royal-teal-floral-tiara.jpg",
    description: "Integrated forehead tiara crystal embroidery framing the face seamlessly.",
  },
  {
    id: "g12",
    title: "Patron Voice — Authentic Testimonial",
    category: "Craftsmanship",
    image: "/images/eternal6/802964754_122115124659417938_5118599167599239360_n.jpg",
    description: "Authentic feedback praising unique fabric design, comfort, and surprise packaging gift.",
  },
];

export default function GalleryPage() {
  const [activeTab, setActiveTab] = useState<string>("All");
  const [lightboxItem, setLightboxItem] = useState<GalleryItem | null>(null);

  const tabs = ["All", "Campaigns", "The Pearl Edit", "Craftsmanship", "Hand Art"];

  const filteredItems = activeTab === "All"
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter((item) => item.category === activeTab);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 space-y-12">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto">
        <span className="text-xs uppercase tracking-[0.25em] text-[#8C7654] font-semibold">
          VISUAL PROVENANCE
        </span>
        <h1 className="font-serif-luxury text-3xl sm:text-5xl font-bold text-[#342722] mt-1">
          Brand & Design Gallery
        </h1>
        <PearlDivider className="my-4" />
        <p className="text-xs sm:text-sm text-[#342722]/70">
          A visual journey through Eternal 6 editorial campaigns, artisanal hijab embroidery, hand-painted mehendi and sacred art.
        </p>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-5 py-2 rounded-full text-xs font-semibold tracking-wider transition-all ${
              activeTab === tab
                ? "bg-[#342722] text-[#FFF9F2] shadow-md"
                : "bg-white text-[#342722]/80 hover:bg-[#F4EBDD] border border-[#D6B878]/30"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            onClick={() => setLightboxItem(item)}
            className="group relative rounded-2xl overflow-hidden aspect-[4/5] bg-[#342722] cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300 border border-[#D6B878]/30"
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#342722]/85 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5 text-white">
              <span className="text-[10px] uppercase tracking-widest text-[#D6B878] font-bold">
                {item.category}
              </span>
              <h3 className="font-serif-luxury text-sm font-semibold mt-1">
                {item.title}
              </h3>
              <p className="text-[11px] text-[#E7D8C5]/80 line-clamp-2 mt-1">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {lightboxItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setLightboxItem(null)}
        >
          <div
            className="relative max-w-4xl max-h-[90vh] bg-[#FFF9F2] rounded-3xl overflow-hidden shadow-2xl border border-[#D6B878] flex flex-col md:flex-row"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setLightboxItem(null)}
              className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-white/80 hover:bg-white text-[#342722] flex items-center justify-center shadow"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-full md:w-3/5 bg-black flex items-center justify-center aspect-[4/5] md:aspect-auto">
              <img
                src={lightboxItem.image}
                alt={lightboxItem.title}
                className="max-h-[80vh] w-auto object-contain"
              />
            </div>

            <div className="w-full md:w-2/5 p-6 sm:p-8 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <span className="text-xs uppercase tracking-widest text-[#8C7654] font-bold">
                  {lightboxItem.category}
                </span>
                <h2 className="font-serif-luxury text-2xl font-bold text-[#342722]">
                  {lightboxItem.title}
                </h2>
                <PearlDivider className="my-2" count={2} />
                <p className="text-xs text-[#342722]/80 leading-relaxed">
                  {lightboxItem.description}
                </p>
              </div>

              <div className="pt-4 border-t border-[#D6B878]/30">
                <p className="text-[11px] text-[#8C7654]">
                  Eternal 6 Atelier • Chattogram, Bangladesh
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
