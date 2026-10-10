import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Validate Bangladeshi phone number (e.g. 01712345678, +8801812345678, 8801912345678)
function isValidBdPhone(phone: string): boolean {
  const clean = phone.replace(/[\s\-\(\)]/g, "");
  const bdRegex = /^(?:\+?880|0)?1[3-9]\d{8}$/;
  return bdRegex.test(clean);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      customerName,
      phone,
      email,
      district,
      area,
      fullAddress,
      deliveryInstructions,
      paymentMethod, // 'cod', 'bkash', 'nagad'
      paymentTxnId,
      sourceChannel = "website",
      items, // array of { productId, variantId, quantity }
      notes,
    } = body;

    // 1. Basic validation
    if (!customerName || !customerName.trim()) {
      return NextResponse.json({ success: false, error: "Customer name is required" }, { status: 400 });
    }
    if (!phone || !isValidBdPhone(phone)) {
      return NextResponse.json({ success: false, error: "Please enter a valid Bangladeshi phone number (e.g., 01812345678)" }, { status: 400 });
    }
    if (!district || !area || !fullAddress) {
      return NextResponse.json({ success: false, error: "Complete delivery address is required" }, { status: 400 });
    }
    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ success: false, error: "Shopping cart cannot be empty" }, { status: 400 });
    }

    // 2. Fetch products from database and calculate prices strictly on server
    const productIds = items.map((i: any) => i.productId);
    const dbProducts = await prisma.product.findMany({
      where: { id: { in: productIds } },
    });

    const productMap = new Map(dbProducts.map((p) => [p.id, p]));

    let calculatedSubtotal = 0;
    const validatedItems: {
      productId: string;
      productName: string;
      variantName: string | null;
      price: number;
      quantity: number;
      image: string;
    }[] = [];

    for (const item of items) {
      const dbProduct = productMap.get(item.productId);
      if (!dbProduct) {
        return NextResponse.json({ success: false, error: `Product not found: ${item.productId}` }, { status: 400 });
      }

      if (dbProduct.stock < item.quantity) {
        return NextResponse.json(
          { success: false, error: `Insufficient stock for "${dbProduct.name}". Only ${dbProduct.stock} available.` },
          { status: 400 }
        );
      }

      // Revalidate unit price from database (salePrice if available, else regular price)
      const unitPrice = dbProduct.salePrice && dbProduct.salePrice > 0 ? dbProduct.salePrice : dbProduct.price;
      calculatedSubtotal += unitPrice * item.quantity;

      let imagesArr: string[] = [];
      try {
        imagesArr = JSON.parse(dbProduct.images);
      } catch {
        imagesArr = ["/images/logo/logo-emblem.svg"];
      }

      validatedItems.push({
        productId: dbProduct.id,
        productName: dbProduct.name,
        variantName: item.variantName || "Standard",
        price: unitPrice,
        quantity: item.quantity,
        image: imagesArr[0] || "/images/logo/logo-emblem.svg",
      });
    }

    // 3. Calculate delivery charges server-side
    const isChittagong =
      district.toLowerCase().includes("chittagong") ||
      district.toLowerCase().includes("chattogram");

    const deliveryCharge = calculatedSubtotal >= 2500 ? 0 : isChittagong ? 70 : 130;
    const finalTotal = calculatedSubtotal + deliveryCharge;

    // 4. Generate unique non-sequential public order number
    const randomHex = Math.floor(1000 + Math.random() * 9000).toString();
    const orderNumber = `ET6-2026-${randomHex}`;

    // 5. Create Order and OrderItems in a transaction + update stock
    const newOrder = await prisma.$transaction(async (tx) => {
      const order = await tx.order.create({
        data: {
          orderNumber,
          customerName: customerName.trim(),
          phone: phone.trim(),
          email: email?.trim() || null,
          district: district.trim(),
          area: area.trim(),
          fullAddress: fullAddress.trim(),
          deliveryInstructions: deliveryInstructions?.trim() || null,
          paymentMethod: paymentMethod || "cod",
          paymentStatus: paymentMethod === "cod" ? "pending" : paymentTxnId ? "awaiting_verification" : "pending",
          orderStatus: "confirmed",
          sourceChannel: sourceChannel || "website",
          subtotal: calculatedSubtotal,
          deliveryCharge,
          discount: 0,
          total: finalTotal,
          notes: notes?.trim() || null,
          paymentTxnId: paymentTxnId?.trim() || null,
          items: {
            create: validatedItems.map((vi) => ({
              productId: vi.productId,
              productName: vi.productName,
              variantName: vi.variantName,
              price: vi.price,
              quantity: vi.quantity,
              image: vi.image,
            })),
          },
        },
        include: {
          items: true,
        },
      });

      // Deduct inventory
      for (const item of items) {
        await tx.product.update({
          where: { id: item.productId },
          data: {
            stock: { decrement: item.quantity },
          },
        });
      }

      return order;
    });

    return NextResponse.json({
      success: true,
      order: {
        id: newOrder.id,
        orderNumber: newOrder.orderNumber,
        customerName: newOrder.customerName,
        phone: newOrder.phone,
        total: newOrder.total,
        paymentMethod: newOrder.paymentMethod,
        orderStatus: newOrder.orderStatus,
        createdAt: newOrder.createdAt,
      },
    });
  } catch (error: any) {
    console.error("Order creation failed:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create order. Please try again." },
      { status: 500 }
    );
  }
}
