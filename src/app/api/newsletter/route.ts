import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();
    if (!email || !email.includes("@")) {
      return NextResponse.json({ success: false, error: "Valid email is required" }, { status: 400 });
    }

    // Save newsletter subscription as a site setting or dedicated entry
    await prisma.siteSetting.upsert({
      where: { key: `newsletter_${email.toLowerCase().trim()}` },
      update: { value: new Date().toISOString() },
      create: {
        key: `newsletter_${email.toLowerCase().trim()}`,
        value: new Date().toISOString(),
        description: "Newsletter subscriber",
      },
    });

    return NextResponse.json({ success: true, message: "Subscribed successfully" });
  } catch (error: any) {
    console.error("Newsletter error:", error);
    return NextResponse.json({ success: false, error: "Subscription failed" }, { status: 500 });
  }
}
