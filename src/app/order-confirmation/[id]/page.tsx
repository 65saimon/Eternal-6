import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { PearlDivider } from "@/components/ui/PearlDivider";
import {
  CheckCircle,
  Truck,
  Phone,
  Printer,
  Calendar,
  Sparkles,
  MapPin,
  ShieldCheck
} from "lucide-react";
import { PrintInvoiceButton } from "./PrintInvoiceButton";
import { EternalLogo } from "@/components/brand/EternalLogo";

export default async function OrderConfirmationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const order = await prisma.order.findFirst({
    where: {
      OR: [{ id }, { orderNumber: id }],
    },
    include: {
      items: true,
    },
  });

  if (!order) {
    notFound();
  }

  // Mask phone for customer privacy
  const maskedPhone =
    order.phone.length > 6
      ? order.phone.substring(0, 4) + "****" + order.phone.substring(order.phone.length - 3)
      : order.phone;

  const whatsappMsg = `Hello Eternal 6! I have placed an order with Order Reference: ${order.orderNumber}. Could you please confirm the dispatch status?`;
  const whatsappUrl = `https://wa.me/8801606266496?text=${encodeURIComponent(whatsappMsg)}`;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 space-y-10">
      {/* Success Banner */}
      <div className="bg-white rounded-3xl p-8 sm:p-10 border border-[#D6B878]/40 shadow-xl text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center mx-auto">
          <CheckCircle className="w-9 h-9" />
        </div>

        <span className="text-xs uppercase tracking-[0.25em] text-[#8C7654] font-semibold block">
          THANK YOU FOR CHOOSING ETERNAL 6
        </span>

        <h1 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-[#342722]">
          Your Order Has Been Confirmed
        </h1>

        <div className="inline-flex items-center gap-2 bg-[#FFF9F2] border border-[#D6B878] px-4 py-2 rounded-full font-mono text-sm font-bold text-[#342722]">
          <span>Order Ref:</span>
          <span className="text-[#B89A58]">{order.orderNumber}</span>
        </div>

        <p className="text-xs sm:text-sm text-[#342722]/80 max-w-lg mx-auto leading-relaxed">
          We have received your modest luxury order. Our Chattogram atelier is preparing your pieces with our signature pearl wrapping.
        </p>

        {/* Action Buttons */}
        <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
          <PrintInvoiceButton />

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-2.5 rounded-full bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs font-semibold uppercase tracking-wider shadow transition-colors flex items-center gap-2"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>Confirm on WhatsApp</span>
          </a>

          <Link
            href="/track-order"
            className="px-6 py-2.5 rounded-full bg-[#342722] hover:bg-[#4A3932] text-[#FFF9F2] text-xs font-semibold uppercase tracking-wider transition-colors"
          >
            Track Parcel
          </Link>
        </div>
      </div>

      {/* Invoice Details Card */}
      <div id="printable-order" className="bg-white rounded-3xl p-6 sm:p-8 border border-[#D6B878]/30 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#D6B878]/30 gap-4">
          <div className="flex items-center gap-4">
            <EternalLogo height={38} withLink={false} />
            <div className="hidden sm:block h-8 w-[1px] bg-[#D6B878]/40" />
            <div>
              <h2 className="font-serif-luxury text-lg font-bold text-[#342722]">
                Official Invoice
              </h2>
              <div className="text-xs text-[#8C7654]">
                Placed on {new Date(order.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
              </div>
            </div>
          </div>
          <div className="text-xs bg-[#FFF9F2] border border-[#D6B878] px-3.5 py-1 rounded-full font-semibold text-[#8C6E33] w-fit">
            Status: {order.orderStatus.toUpperCase()}
          </div>
        </div>

        {/* Delivery & Payment details grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs text-[#342722]/80 bg-[#FFF9F2]/60 p-4 rounded-2xl border border-[#D6B878]/20">
          <div className="space-y-1">
            <span className="font-bold text-[#342722] uppercase tracking-wider text-[11px] block">
              Delivery Information:
            </span>
            <p><strong>Recipient:</strong> {order.customerName}</p>
            <p><strong>Contact:</strong> {maskedPhone}</p>
            <p><strong>Address:</strong> {order.fullAddress}, {order.area}, {order.district}</p>
            {order.deliveryInstructions && (
              <p><strong>Notes:</strong> {order.deliveryInstructions}</p>
            )}
          </div>

          <div className="space-y-1">
            <span className="font-bold text-[#342722] uppercase tracking-wider text-[11px] block">
              Payment Information:
            </span>
            <p><strong>Method:</strong> {order.paymentMethod.toUpperCase()}</p>
            <p><strong>Payment Status:</strong> {order.paymentStatus}</p>
            {order.paymentTxnId && (
              <p><strong>Transaction ID:</strong> <span className="font-mono">{order.paymentTxnId}</span></p>
            )}
            <p><strong>Channel:</strong> {order.sourceChannel}</p>
          </div>
        </div>

        {/* Itemized Table */}
        <div className="divide-y divide-[#D6B878]/20">
          {order.items.map((item) => (
            <div key={item.id} className="py-3.5 flex items-center justify-between gap-4 text-xs">
              <div className="flex items-center gap-3">
                {item.image && (
                  <img src={item.image} alt="" className="w-12 h-14 rounded-lg object-cover border border-[#D6B878]/30" />
                )}
                <div>
                  <h4 className="font-medium text-[#342722]">{item.productName}</h4>
                  <div className="text-[11px] text-[#8C7654]">
                    {item.variantName || "Standard"} • Qty: {item.quantity}
                  </div>
                </div>
              </div>
              <div className="font-mono font-bold text-[#342722]">
                ৳{(item.price * item.quantity).toLocaleString()}
              </div>
            </div>
          ))}
        </div>

        {/* Financial Summary */}
        <div className="pt-4 border-t border-[#D6B878]/30 space-y-2 text-xs text-[#342722]/80">
          <div className="flex justify-between">
            <span>Subtotal:</span>
            <span className="font-mono font-bold text-[#342722]">৳{order.subtotal.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span>Delivery Charge:</span>
            <span className="font-mono">
              {order.deliveryCharge === 0 ? "FREE" : `৳${order.deliveryCharge}`}
            </span>
          </div>
          <div className="flex justify-between text-base font-bold text-[#342722] border-t border-[#D6B878]/30 pt-3">
            <span>Grand Total:</span>
            <span className="font-mono text-xl text-[#342722]">৳{order.total.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
