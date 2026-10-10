import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const adminCookie = request.cookies.get("eternal6_admin_token")?.value;
    const authHeader = request.headers.get("Authorization")?.replace("Bearer ", "");
    const expectedKey = process.env.ADMIN_KEY || "eternal6_luxury_admin_2026";

    if (adminCookie !== expectedKey && authHeader !== expectedKey) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();
    const { status, agreedPrice, notes } = body;

    const updateData: any = {};
    if (status) updateData.status = status; // "pending" | "approved" | "awaiting_response" | "completed" | "cancelled"
    if (agreedPrice !== undefined) updateData.agreedPrice = Number(agreedPrice);
    if (notes !== undefined) updateData.notes = notes;

    const updated = await prisma.handArtBooking.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json({ success: true, booking: updated });
  } catch (error: any) {
    console.error("Booking update error:", error);
    return NextResponse.json({ success: false, error: "Failed to update booking" }, { status: 500 });
  }
}
