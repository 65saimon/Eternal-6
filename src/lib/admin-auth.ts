import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";

export interface AdminCredentials {
  adminId: string;
  adminPassword: string;
}

export async function getAdminCredentials(): Promise<AdminCredentials> {
  try {
    const settings = await prisma.siteSetting.findMany({
      where: {
        key: { in: ["admin_id", "admin_password"] },
      },
    });

    const idSetting = settings.find((s: { key: string; value: string }) => s.key === "admin_id")?.value;
    const pwSetting = settings.find((s: { key: string; value: string }) => s.key === "admin_password")?.value;

    const adminId = idSetting?.trim() || "admin";
    const adminPassword =
      pwSetting?.trim() || process.env.ADMIN_KEY || "eternal6_luxury_admin_2026";

    return { adminId, adminPassword };
  } catch (err) {
    console.error("Error retrieving admin credentials:", err);
    return {
      adminId: "admin",
      adminPassword: process.env.ADMIN_KEY || "eternal6_luxury_admin_2026",
    };
  }
}

export async function verifyAdminAuth(request: NextRequest): Promise<boolean> {
  try {
    const adminCookie = request.cookies.get("eternal6_admin_token")?.value;
    const authHeader = request.headers.get("Authorization")?.replace("Bearer ", "");
    const token = adminCookie || authHeader;

    if (!token) return false;

    const { adminPassword } = await getAdminCredentials();
    const fallbackKey = process.env.ADMIN_KEY || "eternal6_luxury_admin_2026";

    return token === adminPassword || token === fallbackKey;
  } catch (err) {
    console.error("verifyAdminAuth error:", err);
    return false;
  }
}
