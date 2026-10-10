import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const reviews = await prisma.customerReview.findMany({
      where: { isFeatured: true },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ success: true, reviews });
  } catch (error: any) {
    console.error("Reviews error:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch reviews" }, { status: 500 });
  }
}
