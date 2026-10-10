import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const { orderNumber, phone } = await request.json();

    if (!orderNumber || !phone) {
      return NextResponse.json(
        { success: false, error: "Both order number and phone number are required" },
        { status: 400 }
      );
    }

    const cleanInputPhone = phone.replace(/[\s\-\(\)]/g, "").slice(-10);

    const order = await prisma.order.findUnique({
      where: { orderNumber: orderNumber.trim() },
      include: {
        items: true,
      },
    });

    if (!order) {
      return NextResponse.json(
        { success: false, error: "No order found matching the provided reference" },
        { status: 404 }
      );
    }

    const cleanOrderPhone = order.phone.replace(/[\s\-\(\)]/g, "").slice(-10);
    if (cleanInputPhone !== cleanOrderPhone) {
      return NextResponse.json(
        { success: false, error: "Order reference and phone number do not match" },
        { status: 403 }
      );
    }

    return NextResponse.json({
      success: true,
      order: {
        id: order.id,
        orderNumber: order.orderNumber,
        customerName: order.customerName,
        district: order.district,
        area: order.area,
        paymentMethod: order.paymentMethod,
        paymentStatus: order.paymentStatus,
        orderStatus: order.orderStatus,
        total: order.total,
        deliveryCharge: order.deliveryCharge,
        createdAt: order.createdAt,
        items: order.items.map((i) => ({
          productName: i.productName,
          variantName: i.variantName,
          price: i.price,
          quantity: i.quantity,
          image: i.image,
        })),
      },
    });
  } catch (error: any) {
    console.error("Order tracking error:", error);
    return NextResponse.json(
      { success: false, error: "An error occurred while tracking the order" },
      { status: 500 }
    );
  }
}
