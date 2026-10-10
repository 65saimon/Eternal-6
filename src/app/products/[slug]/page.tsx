import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { ProductCard, ProductItem } from "@/components/shop/ProductCard";
import { ProductDetailClient } from "./ProductDetailClient";
import { PearlDivider } from "@/components/ui/PearlDivider";
import { ChevronRight } from "lucide-react";

export const revalidate = 60;

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const product = await prisma.product.findUnique({
    where: { slug },
  });

  if (!product) {
    notFound();
  }

  // Related products
  const related = await prisma.product.findMany({
    where: {
      isPublished: true,
      id: { not: product.id },
      OR: [
        { collection: product.collection },
        { material: product.material },
      ],
    },
    take: 4,
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-14 space-y-16">
      {/* Breadcrumbs */}
      <nav className="flex items-center space-x-2 text-xs text-[#8C7654]">
        <Link href="/" className="hover:text-[#342722]">Home</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link href="/shop" className="hover:text-[#342722]">Shop</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link href={`/collections/${product.collection.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`} className="hover:text-[#342722]">
          {product.collection}
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-[#342722] font-semibold truncate max-w-xs">{product.name}</span>
      </nav>

      {/* Main Product Showcase Client Component */}
      <ProductDetailClient product={product as unknown as ProductItem} />

      {/* Related Products */}
      {related.length > 0 && (
        <section className="pt-10 border-t border-[#D6B878]/30">
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-xs uppercase tracking-[0.25em] text-[#8C7654] font-semibold">
              COMPLETE THE ENSEMBLE
            </span>
            <h2 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-[#342722] mt-1">
              You May Also Adore
            </h2>
            <PearlDivider className="my-3" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {related.map((item) => (
              <ProductCard key={item.id} product={item as unknown as ProductItem} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
