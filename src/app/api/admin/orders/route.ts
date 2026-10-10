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

    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const source = searchParams.get("source");

    const where: any = {};
    if (status && status !== "all") where.orderStatus = status;
    if (source && source !== "all") where.sourceChannel = source;

    const orders = await prisma.order.findMany({
      where,
      orderBy: { createdAt: "desc" },
      include: { items: true },
    });

    return NextResponse.json({ success: true, count: orders.length, orders });
  } catch (error: any) {
    console.error("Admin orders get error:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch orders" }, { status: 500 });
  }
}

// Manual order-entry workflow for orders received through Facebook Messenger or WhatsApp
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
      customerName,
      phone,
      email,
      district,
      area,
      fullAddress,
      paymentMethod = "cod",
      sourceChannel = "facebook", // "facebook" | "whatsapp" | "admin"
      items,
      notes,
    } = body;

    if (!customerName || !phone || !items || items.length === 0) {
      return NextResponse.json({ success: false, error: "Missing required order fields" }, { status: 400 });
    }

    const productIds = items.map((i: any) => i.productId);
    const dbProducts = await prisma.product.findMany({
      where: { id: { in: productIds } },
    });
    const productMap = new Map(dbProducts.map((p) => [p.id, p]));

    let calculatedSubtotal = 0;
    const validatedItems = [];

    for (const item of items) {
      const dbProduct = productMap.get(item.productId);
      const unitPrice = dbProduct
        ? (dbProduct.salePrice && dbProduct.salePrice > 0 ? dbProduct.salePrice : dbProduct.price)
        : Number(item.price) || 0;

      calculatedSubtotal += unitPrice * item.quantity;
      validatedItems.push({
        productId: dbProduct ? dbProduct.id : null,
        productName: dbProduct ? dbProduct.name : item.productName || "Custom Item",
        variantName: item.variantName || "Standard",
        price: unitPrice,
        quantity: item.quantity,
        image: dbProduct ? JSON.parse(dbProduct.images)[0] : "/images/logo/logo-emblem.svg",
      });
    }

    const isChittagong = district?.toLowerCase().includes("chittagong") || district?.toLowerCase().includes("chattogram");
    const deliveryCharge = calculatedSubtotal >= 2500 ? 0 : isChittagong ? 70 : 130;
    const total = calculatedSubtotal + deliveryCharge;

    const randomHex = Math.floor(1000 + Math.random() * 9000).toString();
    const orderNumber = `ET6-MANUAL-${randomHex}`;

    const order = await prisma.order.create({
      data: {
        orderNumber,
        customerName: customerName.trim(),
        phone: phone.trim(),
        email: email?.trim() || null,
        district: district || "Chattogram",
        area: area || "City",
        fullAddress: fullAddress || "Order taken via " + sourceChannel,
        paymentMethod,
        paymentStatus: paymentMethod === "cod" ? "pending" : "paid",
        orderStatus: "confirmed",
        sourceChannel,
        subtotal: calculatedSubtotal,
        deliveryCharge,
        discount: 0,
        total,
        notes: notes || `Created manually from ${sourceChannel} inquiry`,
        items: {
          create: validatedItems,
        },
      },
      include: { items: true },
    });

    return NextResponse.json({ success: true, order });
  } catch (error: any) {
    console.error("Manual order creation error:", error);
    return NextResponse.json({ success: false, error: "Failed to record manual order" }, { status: 500 });
  }
}
