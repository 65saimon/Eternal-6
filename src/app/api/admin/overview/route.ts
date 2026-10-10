import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const adminCookie = request.cookies.get("eternal6_admin_token")?.value;
    const authHeader = request.headers.get("Authorization")?.replace("Bearer ", "");
    const expectedKey = process.env.ADMIN_KEY || "eternal6_luxury_admin_2026";

    if (adminCookie !== expectedKey && authHeader !== expectedKey) {
      return NextResponse.json({ success: false, error: "Unauthorized access" }, { status: 401 });
    }

    // 1. Orders today
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);

    const ordersToday = await prisma.order.count({
      where: { createdAt: { gte: startOfToday } },
    });

    // 2. Orders awaiting confirmation
    const awaitingConfirmation = await prisma.order.count({
      where: { orderStatus: "pending" },
    });

    // 3. Paid / Completed revenue (excluding cancelled)
    const paidOrders = await prisma.order.findMany({
      where: {
        paymentStatus: "paid",
        orderStatus: { not: "cancelled" },
      },
      select: { total: true },
    });
    const paidRevenue = paidOrders.reduce((sum, o) => sum + o.total, 0);

    // 4. Outstanding COD orders (COD payment status is pending or awaiting verification)
    const outstandingCodOrders = await prisma.order.findMany({
      where: {
        paymentMethod: "cod",
        paymentStatus: { in: ["pending", "awaiting_verification"] },
        orderStatus: { not: "cancelled" },
      },
      select: { total: true },
    });
    const outstandingCodAmount = outstandingCodOrders.reduce((sum, o) => sum + o.total, 0);
    const outstandingCodCount = outstandingCodOrders.length;

    // 5. Low-stock products (< 10 units)
    const lowStockProducts = await prisma.product.findMany({
      where: { stock: { lt: 10 } },
      select: { id: true, name: true, sku: true, stock: true },
    });

    // 6. Pending hand-art bookings
    const pendingBookingsCount = await prisma.handArtBooking.count({
      where: { status: "pending" },
    });

    // 7. Recent 10 orders
    const recentOrders = await prisma.order.findMany({
      take: 10,
      orderBy: { createdAt: "desc" },
      include: { items: true },
    });

    // 8. Order source distribution
    const allOrders = await prisma.order.findMany({
      select: { sourceChannel: true, total: true },
    });
    const sourceDistribution: Record<string, number> = {
      website: 0,
      facebook: 0,
      whatsapp: 0,
      admin: 0,
    };
    for (const ord of allOrders) {
      const channel = ord.sourceChannel || "website";
      sourceDistribution[channel] = (sourceDistribution[channel] || 0) + 1;
    }

    return NextResponse.json({
      success: true,
      metrics: {
        ordersToday,
        awaitingConfirmation,
        paidRevenue,
        outstandingCodAmount,
        outstandingCodCount,
        lowStockCount: lowStockProducts.length,
        lowStockProducts,
        pendingBookingsCount,
        totalOrdersCount: allOrders.length,
        sourceDistribution,
      },
      recentOrders,
    });
  } catch (error: any) {
    console.error("Admin overview error:", error);
    return NextResponse.json({ success: false, error: "Failed to load dashboard overview" }, { status: 500 });
  }
}
