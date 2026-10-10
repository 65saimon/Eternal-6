import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const adminCookie = request.cookies.get("eternal6_admin_token")?.value;
    const authHeader = request.headers.get("Authorization")?.replace("Bearer ", "");
    const expectedKey = process.env.ADMIN_KEY || "eternal6_luxury_admin_2026";

    if (adminCookie !== expectedKey && authHeader !== expectedKey) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const products = await prisma.product.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ success: true, count: products.length, products });
  } catch (error: any) {
    console.error("Admin products error:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch products" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const adminCookie = request.cookies.get("eternal6_admin_token")?.value;
    const authHeader = request.headers.get("Authorization")?.replace("Bearer ", "");
    const expectedKey = process.env.ADMIN_KEY || "eternal6_luxury_admin_2026";

    if (adminCookie !== expectedKey && authHeader !== expectedKey) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const {
      name,
      slug,
      sku,
      description,
      category,
      collection,
      price,
      salePrice,
      material,
      careInstructions,
      stock,
      images,
      colors,
      variants,
      isPublished = true,
      isFeatured = false,
      isPearlEdit = false,
    } = body;

    if (!name || !price || !category || !collection) {
      return NextResponse.json({ success: false, error: "Missing required product fields" }, { status: 400 });
    }

    const finalSlug = slug || name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    const finalSku = sku || `ET6-${Math.floor(1000 + Math.random() * 9000)}`;

    const product = await prisma.product.create({
      data: {
        name,
        slug: finalSlug,
        sku: finalSku,
        description: description || "",
        category,
        collection,
        price: Number(price),
        salePrice: salePrice ? Number(salePrice) : null,
        material: material || "Georgette",
        careInstructions: careInstructions || null,
        stock: Number(stock) || 10,
        images: typeof images === "string" ? images : JSON.stringify(images || []),
        colors: typeof colors === "string" ? colors : JSON.stringify(colors || []),
        variants: typeof variants === "string" ? variants : JSON.stringify(variants || []),
        isPublished: Boolean(isPublished),
        isFeatured: Boolean(isFeatured),
        isPearlEdit: Boolean(isPearlEdit),
      },
    });

    return NextResponse.json({ success: true, product });
  } catch (error: any) {
    console.error("Admin product create error:", error);
    return NextResponse.json({ success: false, error: "Failed to create product" }, { status: 500 });
  }
}
