import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const services = await prisma.handArtService.findMany({
      where: { isPublished: true },
      orderBy: { createdAt: "asc" },
    });
    return NextResponse.json({ success: true, services });
  } catch (error: any) {
    console.error("Error fetching hand art services:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch services" },
      { status: 500 }
    );
  }
}
