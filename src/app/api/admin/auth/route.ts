import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminCredentials, verifyAdminAuth } from "@/lib/admin-auth";

// Check session status & current admin ID
export async function GET(request: NextRequest) {
  try {
    const isAuthenticated = await verifyAdminAuth(request);
    if (!isAuthenticated) {
      return NextResponse.json({ authenticated: false }, { status: 401 });
    }

    const { adminId } = await getAdminCredentials();
    return NextResponse.json({
      authenticated: true,
      adminId,
    });
  } catch (error) {
    return NextResponse.json({ authenticated: false, error: "Failed to check auth" }, { status: 500 });
  }
}

// Admin Login
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { username, password, key } = body;
    const { adminId, adminPassword } = await getAdminCredentials();
    const fallbackKey = process.env.ADMIN_KEY || "eternal6_luxury_admin_2026";

    let isValid = false;

    // 1. Dual field login: username & password
    if (username !== undefined && password !== undefined) {
      const matchUser =
        username.trim().toLowerCase() === adminId.toLowerCase() ||
        username.trim().toLowerCase() === "admin";
      const matchPass =
        password === adminPassword || password === fallbackKey;

      isValid = matchUser && matchPass;
    }
    // 2. Passphrase-only login (legacy/fallback)
    else if (key) {
      isValid = key === adminPassword || key === fallbackKey;
    }

    if (!isValid) {
      return NextResponse.json(
        { success: false, error: "Invalid Admin ID or Password." },
        { status: 401 }
      );
    }

    const response = NextResponse.json({
      success: true,
      message: "Admin authenticated successfully",
      adminId,
    });

    // Set HTTP-only cookie with the active admin password
    response.cookies.set("eternal6_admin_token", adminPassword, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Admin login error:", error);
    return NextResponse.json(
      { success: false, error: "Authentication failed" },
      { status: 500 }
    );
  }
}

// Change Admin ID & Password
export async function PATCH(request: NextRequest) {
  try {
    const isAuthenticated = await verifyAdminAuth(request);
    if (!isAuthenticated) {
      return NextResponse.json(
        { success: false, error: "Unauthorized. Please log in first." },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { currentPassword, newAdminId, newPassword } = body;
    const { adminId, adminPassword } = await getAdminCredentials();
    const fallbackKey = process.env.ADMIN_KEY || "eternal6_luxury_admin_2026";

    // Verify current password for safety
    if (!currentPassword || (currentPassword !== adminPassword && currentPassword !== fallbackKey)) {
      return NextResponse.json(
        { success: false, error: "Current password does not match." },
        { status: 400 }
      );
    }

    // Validate new password if provided
    if (newPassword && newPassword.length < 6) {
      return NextResponse.json(
        { success: false, error: "New password must be at least 6 characters." },
        { status: 400 }
      );
    }

    // Update Admin ID if provided
    let updatedAdminId = adminId;
    if (newAdminId && newAdminId.trim()) {
      updatedAdminId = newAdminId.trim();
      await prisma.siteSetting.upsert({
        where: { key: "admin_id" },
        update: { value: updatedAdminId },
        create: {
          key: "admin_id",
          value: updatedAdminId,
          description: "Administrator Login Username / ID",
        },
      });
    }

    // Update Admin Password if provided
    let updatedPassword = adminPassword;
    if (newPassword && newPassword.trim()) {
      updatedPassword = newPassword.trim();
      await prisma.siteSetting.upsert({
        where: { key: "admin_password" },
        update: { value: updatedPassword },
        create: {
          key: "admin_password",
          value: updatedPassword,
          description: "Administrator Login Secret Password",
        },
      });
    }

    const response = NextResponse.json({
      success: true,
      message: "Admin credentials successfully updated!",
      adminId: updatedAdminId,
    });

    // Update session cookie with the new password so the admin stays logged in
    response.cookies.set("eternal6_admin_token", updatedPassword, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Change credentials error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update administrator credentials." },
      { status: 500 }
    );
  }
}
