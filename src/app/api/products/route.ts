import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const collection = searchParams.get("collection");
    const material = searchParams.get("material");
    const search = searchParams.get("q");
    const pearlEdit = searchParams.get("pearlEdit");
    const featured = searchParams.get("featured");
    const sort = searchParams.get("sort") || "newest";

    const where: any = {
      isPublished: true,
    };

    if (category && category !== "All") {
      where.category = category;
    }

    if (collection && collection !== "All") {
      where.collection = collection;
    }

    if (material && material !== "All") {
      where.material = material;
    }

    if (pearlEdit === "true") {
      where.isPearlEdit = true;
    }

    if (featured === "true") {
      where.isFeatured = true;
    }

    if (search) {
      where.OR = [
        { name: { contains: search } },
        { description: { contains: search } },
        { material: { contains: search } },
        { collection: { contains: search } },
      ];
    }

    let orderBy: any = { createdAt: "desc" };
    if (sort === "price-asc") {
      orderBy = { price: "asc" };
    } else if (sort === "price-desc") {
      orderBy = { price: "desc" };
    } else if (sort === "name") {
      orderBy = { name: "asc" };
    }

    const products = await prisma.product.findMany({
      where,
      orderBy,
    });

    return NextResponse.json({ success: true, count: products.length, products });
  } catch (error: any) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}
