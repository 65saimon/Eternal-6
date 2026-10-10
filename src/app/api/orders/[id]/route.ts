import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Search by internal UUID or public orderNumber
    const order = await prisma.order.findFirst({
      where: {
        OR: [{ id }, { orderNumber: id }],
      },
      include: {
        items: true,
      },
    });

    if (!order) {
      return NextResponse.json(
        { success: false, error: "Order not found" },
        { status: 404 }
      );
    }

    // Mask phone number slightly for public safety if not authenticated
    const maskedPhone =
      order.phone.length > 6
        ? order.phone.substring(0, 4) + "****" + order.phone.substring(order.phone.length - 3)
        : order.phone;

    return NextResponse.json({
      success: true,
      order: {
        ...order,
        phone: maskedPhone,
      },
    });
  } catch (error: any) {
    console.error("Error fetching order confirmation:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch order details" },
      { status: 500 }
    );
  }
}
