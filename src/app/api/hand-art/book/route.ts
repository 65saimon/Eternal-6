import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

function isValidBdPhone(phone: string): boolean {
  const clean = phone.replace(/[\s\-\(\)]/g, "");
  const bdRegex = /^(?:\+?880|0)?1[3-9]\d{8}$/;
  return bdRegex.test(clean);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      customerName,
      phone,
      email,
      serviceName,
      serviceCategory,
      eventDate,
      eventTime,
      locationArea,
      designPreference,
      referenceImage,
      notes,
    } = body;

    if (!customerName || !customerName.trim()) {
      return NextResponse.json({ success: false, error: "Customer name is required" }, { status: 400 });
    }
    if (!phone || !isValidBdPhone(phone)) {
      return NextResponse.json({ success: false, error: "Valid Bangladeshi phone number is required" }, { status: 400 });
    }
    if (!eventDate || !eventTime) {
      return NextResponse.json({ success: false, error: "Event date and preferred time are required" }, { status: 400 });
    }
    if (!locationArea || !locationArea.trim()) {
      return NextResponse.json({ success: false, error: "Event location/area is required" }, { status: 400 });
    }

    // Generate unique booking reference: BK6-XXXX
    const randomHex = Math.floor(1000 + Math.random() * 9000).toString();
    const bookingReference = `BK6-${randomHex}`;

    const booking = await prisma.handArtBooking.create({
      data: {
        bookingReference,
        customerName: customerName.trim(),
        phone: phone.trim(),
        email: email?.trim() || null,
        serviceName: serviceName || "Mehendi & Hand Art Consultation",
        serviceCategory: serviceCategory || "bridal",
        eventDate,
        eventTime,
        locationArea: locationArea.trim(),
        designPreference: designPreference?.trim() || null,
        referenceImage: referenceImage || null,
        notes: notes?.trim() || null,
        status: "pending",
      },
    });

    return NextResponse.json({
      success: true,
      booking: {
        id: booking.id,
        bookingReference: booking.bookingReference,
        customerName: booking.customerName,
        serviceName: booking.serviceName,
        eventDate: booking.eventDate,
        eventTime: booking.eventTime,
        status: booking.status,
      },
    });
  } catch (error: any) {
    console.error("Hand art booking error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to submit booking request" },
      { status: 500 }
    );
  }
}
