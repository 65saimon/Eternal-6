import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    const product = await prisma.product.findUnique({
      where: { slug },
    });

    if (!product) {
      return NextResponse.json(
        { success: false, error: "Product not found" },
        { status: 404 }
      );
    }

    // Get related products from same collection or category
    const related = await prisma.product.findMany({
      where: {
        isPublished: true,
        id: { not: product.id },
        OR: [
          { collection: product.collection },
          { material: product.material },
          { category: product.category },
        ],
      },
      take: 4,
    });

    return NextResponse.json({ success: true, product, related });
  } catch (error: any) {
    console.error("Error fetching product by slug:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch product" },
      { status: 500 }
    );
  }
}
