import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyAdminAuth } from "@/lib/admin-auth";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    if (!await verifyAdminAuth(request)) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();

    const updateData: any = {};
    if (body.name !== undefined) updateData.name = body.name;
    if (body.price !== undefined) updateData.price = Number(body.price);
    if (body.salePrice !== undefined) updateData.salePrice = body.salePrice ? Number(body.salePrice) : null;
    if (body.stock !== undefined) updateData.stock = Number(body.stock);
    if (body.material !== undefined) updateData.material = body.material;
    if (body.collection !== undefined) updateData.collection = body.collection;
    if (body.category !== undefined) updateData.category = body.category;
    if (body.description !== undefined) updateData.description = body.description;
    if (body.careInstructions !== undefined) updateData.careInstructions = body.careInstructions;
    if (body.sku !== undefined) updateData.sku = body.sku;
    if (body.isPublished !== undefined) updateData.isPublished = Boolean(body.isPublished);
    if (body.isFeatured !== undefined) updateData.isFeatured = Boolean(body.isFeatured);
    if (body.isPearlEdit !== undefined) updateData.isPearlEdit = Boolean(body.isPearlEdit);
    if (body.images !== undefined) updateData.images = typeof body.images === "string" ? body.images : JSON.stringify(body.images);

    const updated = await prisma.product.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json({ success: true, product: updated });
  } catch (error: any) {
    console.error("Admin product update error:", error);
    return NextResponse.json({ success: false, error: "Failed to update product" }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    if (!await verifyAdminAuth(request)) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    // Archive or unpublish to preserve order history, or soft delete
    const archived = await prisma.product.update({
      where: { id },
      data: { isPublished: false },
    });

    return NextResponse.json({ success: true, message: "Product archived successfully", product: archived });
  } catch (error: any) {
    console.error("Admin product delete error:", error);
    return NextResponse.json({ success: false, error: "Failed to archive product" }, { status: 500 });
  }
}
