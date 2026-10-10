import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { key } = await request.json();
    const expectedKey = process.env.ADMIN_KEY || "eternal6_luxury_admin_2026";

    if (!key || key !== expectedKey) {
      return NextResponse.json({ success: false, error: "Invalid admin passphrase" }, { status: 401 });
    }

    const response = NextResponse.json({ success: true, message: "Admin authenticated" });

    // Set cookie
    response.cookies.set("eternal6_admin_token", expectedKey, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    });

    return response;
  } catch (error) {
    return NextResponse.json({ success: false, error: "Authentication failed" }, { status: 500 });
  }
}
