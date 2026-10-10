import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { ProductCard, ProductItem } from "@/components/shop/ProductCard";
import { PearlDivider } from "@/components/ui/PearlDivider";
import { Sparkles, ArrowLeft } from "lucide-react";

export const revalidate = 60;

interface CollectionMeta {
  title: string;
  tagline: string;
  description: string;
  coverImage: string;
  filterField: "collection" | "isPearlEdit";
  filterValue: string | boolean;
}

const COLLECTION_MAP: Record<string, CollectionMeta> = {
  "the-pearl-edit": {
    title: "The Pearl Edit",
    tagline: "Signature Moti & Scallop Lace Creations",
    description: "Our hallmark collection celebrating the timeless lustrous beauty of pearls. Features hand-set seed pearls nestled in scalloped lace borders, tone-on-tone embroidery, and bespoke calligraphy.",
    coverImage: "/images/eternal6/805314166_122115560925417938_1637008765454708263_n.jpg",
    filterField: "isPearlEdit",
    filterValue: true,
  },
  "everyday-elegance": {
    title: "Everyday Elegance",
    tagline: "Effortless Comfort in Breathable Zafran & Georgette",
    description: "Designed for modern living in Bangladesh's climate. Featherlight floral block prints, minimal crystal highlights, and versatile shades suitable for daily work, college, and casual outings.",
    coverImage: "/images/eternal6/crops/coral-rose-zafran-blockprint.jpg",
    filterField: "collection",
    filterValue: "Everyday Elegance",
  },
  "bridal-collection": {
    title: "Bridal Collection",
    tagline: "Bedazzling Crystals & Regal Karchupi Craftsmanship",
    description: "Grand couture drapes designed for wedding ceremonies, engagements, and festive celebrations. Intricate side-crown tiaras, multi-tiered crystal streams, and traditional Karchupi needlework.",
    coverImage: "/images/eternal6/crops/ruby-red-zafran-karchupi.jpg",
    filterField: "collection",
    filterValue: "Bridal Collection",
  },
  "premium-chiffon": {
    title: "Premium Chiffon & Georgette",
    tagline: "Fluid Drape with Scattered Lotus & Flora Stones",
    description: "Flowing elegance that stays in place all day. Features radiant floral stones, breathable non-slip texture, and rich jewel tones.",
    coverImage: "/images/eternal6/crops/crimson-red-georgette.jpg",
    filterField: "collection",
    filterValue: "Premium Chiffon",
  },
};

export default async function CollectionDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const meta = COLLECTION_MAP[slug] || {
    title: slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
    tagline: "Curated Modest Luxury",
    description: "Explore handcrafted creations tailored for timeless modesty.",
    coverImage: "/images/eternal6/801035952_122115620427417938_1668672352969936787_n.jpg",
    filterField: "collection" as const,
    filterValue: slug.replace(/-/g, " "),
  };

  const where: any = { isPublished: true };
  if (meta.filterField === "isPearlEdit") {
    where.isPearlEdit = true;
  } else {
    where.collection = {
      contains: String(meta.filterValue),
    };
  }

  const products = await prisma.product.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-12 pb-20">
      {/* Editorial Collection Banner */}
      <div className="relative bg-[#342722] text-[#FFF9F2] py-20 px-4 sm:px-8 overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <img src={meta.coverImage} alt={meta.title} className="w-full h-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#342722] via-[#342722]/80 to-transparent" />

        <div className="max-w-4xl mx-auto text-center relative z-10 space-y-4">
          <Link
            href="/shop"
            className="inline-flex items-center gap-1.5 text-xs text-[#D6B878] hover:text-white uppercase tracking-widest font-semibold mb-2 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to All Hijabs</span>
          </Link>

          <div className="flex items-center justify-center gap-2 text-xs uppercase tracking-[0.25em] text-[#D6B878]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>ETERNAL 6 EXCLUSIVE</span>
          </div>

          <h1 className="font-serif-luxury text-4xl sm:text-5xl font-bold text-white">
            {meta.title}
          </h1>

          <p className="font-serif italic text-lg sm:text-xl text-[#D6B878]">
            {meta.tagline}
          </p>

          <p className="text-xs sm:text-sm text-[#E7D8C5]/85 leading-relaxed max-w-2xl mx-auto pt-2">
            {meta.description}
          </p>
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#D6B878]/30">
          <span className="text-xs text-[#8C7654] uppercase tracking-wider font-semibold">
            {products.length} Confirmed Boutique Products
          </span>
          <Link
            href="/shop"
            className="text-xs text-[#B89A58] hover:underline font-semibold"
          >
            View Full Catalog →
          </Link>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-16 bg-white/70 rounded-2xl border border-[#D6B878]/30 space-y-3">
            <h3 className="font-serif-luxury text-xl font-bold text-[#342722]">
              New Creations Arriving Soon
            </h3>
            <p className="text-xs text-[#342722]/70">
              Our atelier is crafting new additions for this collection.
            </p>
            <Link
              href="/shop"
              className="inline-block px-6 py-2.5 rounded-full bg-[#342722] text-[#FFF9F2] text-xs font-semibold uppercase tracking-wider"
            >
              Browse Available Hijabs
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((p) => (
              <ProductCard key={p.id} product={p as unknown as ProductItem} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
