import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyAdminAuth } from "@/lib/admin-auth";

export async function GET(request: NextRequest) {
  try {
    if (!await verifyAdminAuth(request)) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const bookings = await prisma.handArtBooking.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ success: true, count: bookings.length, bookings });
  } catch (error: any) {
    console.error("Admin bookings error:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch bookings" }, { status: 500 });
  }
}
