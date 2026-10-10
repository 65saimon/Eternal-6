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

    const bookings = await prisma.handArtBooking.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ success: true, count: bookings.length, bookings });
  } catch (error: any) {
    console.error("Admin bookings error:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch bookings" }, { status: 500 });
  }
}
