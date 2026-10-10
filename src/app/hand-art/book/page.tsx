"use client";

import React, { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { PearlDivider } from "@/components/ui/PearlDivider";
import {
  Calendar,
  Clock,
  MapPin,
  CheckCircle2,
  AlertCircle,
  Phone,
  Sparkles,
  ArrowRight,
  Send
} from "lucide-react";

function BookingFormContent() {
  const searchParams = useSearchParams();
  const preselectedService = searchParams.get("service") || "Bridal Mehendi Full Ceremony Package";

  const [formData, setFormData] = useState({
    customerName: "",
    phone: "",
    email: "",
    serviceName: preselectedService,
    serviceCategory: "bridal",
    eventDate: "",
    eventTime: "Morning (10:00 AM - 1:00 PM)",
    locationArea: "",
    designPreference: "",
    notes: "",
    consent: true,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [confirmedBooking, setConfirmedBooking] = useState<any>(null);

  const servicesList = [
    { title: "Bridal Mehendi Full Ceremony Package", category: "bridal" },
    { title: "Arabic Contemporary Hand Art", category: "arabic" },
    { title: "Minimal Floral Wrist & Finger Art", category: "minimal" },
    { title: "Engagement & Reception Hand Art", category: "bridal" },
    { title: "Festive & Eid Mehendi Styling", category: "festive" },
    { title: "Custom Islamic Calligraphy & Canvas Art", category: "custom" },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!formData.customerName.trim()) {
      setErrorMessage("Please enter your full name.");
      return;
    }

    if (!formData.phone.trim()) {
      setErrorMessage("Please enter a valid Bangladeshi contact number.");
      return;
    }

    if (!formData.eventDate) {
      setErrorMessage("Please select your preferred event date.");
      return;
    }

    if (!formData.locationArea.trim()) {
      setErrorMessage("Please provide your event location or area in Chittagong.");
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch("/api/hand-art/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to submit booking request.");
      }

      setConfirmedBooking(data.booking);
    } catch (err: any) {
      setErrorMessage(err.message || "An unexpected error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (confirmedBooking) {
    const whatsappMsg = `Hello Eternal 6! I have submitted a Mehendi Booking Request. Booking Ref: ${confirmedBooking.bookingReference} for ${confirmedBooking.serviceName} on ${confirmedBooking.eventDate}. Could you please confirm stylist availability?`;
    const whatsappUrl = `https://wa.me/8801606266496?text=${encodeURIComponent(whatsappMsg)}`;

    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center space-y-6">
        <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-9 h-9" />
        </div>

        <span className="text-xs uppercase tracking-[0.25em] text-[#8C7654] font-semibold block">
          REQUEST RECEIVED
        </span>

        <h1 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-[#342722]">
          Booking Request Submitted
        </h1>

        <div className="inline-flex items-center gap-2 bg-[#FFF9F2] border border-[#D6B878] px-4 py-2 rounded-full font-mono text-sm font-bold text-[#342722]">
          <span>Booking Ref:</span>
          <span className="text-[#B89A58]">{confirmedBooking.bookingReference}</span>
        </div>

        <p className="text-xs sm:text-sm text-[#342722]/80 max-w-lg mx-auto leading-relaxed">
          Thank you, <strong>{confirmedBooking.customerName}</strong>! Your appointment inquiry for <strong>{confirmedBooking.serviceName}</strong> on <strong>{confirmedBooking.eventDate}</strong> has been logged in our atelier system.
        </p>

        <div className="p-4 rounded-2xl bg-[#FFF9F2] border border-[#D6B878]/30 text-xs text-[#8C7654] max-w-md mx-auto">
          📌 <em>Note: Our lead mehendi artist will review current booking schedules and contact you on WhatsApp or phone to confirm final timings and design details.</em>
        </div>

        <div className="pt-4 flex flex-wrap justify-center gap-4">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-full bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs font-semibold uppercase tracking-wider shadow flex items-center gap-2"
          >
            <Phone className="w-4 h-4" />
            <span>Follow up on WhatsApp</span>
          </a>

          <Link
            href="/hand-art"
            className="px-6 py-3 rounded-full bg-[#342722] text-[#FFF9F2] text-xs font-semibold uppercase tracking-wider"
          >
            Return to Hand Art
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-8">
      <div className="text-center max-w-xl mx-auto">
        <span className="text-xs uppercase tracking-[0.25em] text-[#8C7654] font-semibold">
          ATELIER APPOINTMENT DESK
        </span>
        <h1 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-[#342722] mt-1">
          Book Mehendi & Hand Art
        </h1>
        <PearlDivider className="my-3" />
        <p className="text-xs sm:text-sm text-[#342722]/70">
          Provide your event details below. Our stylists will contact you within 24 hours to finalize slot confirmation and motif selections.
        </p>
      </div>

      {errorMessage && (
        <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-3">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-6 sm:p-10 border border-[#D6B878]/30 shadow-sm space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="text-xs font-semibold text-[#342722] block mb-1">
              Full Name <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.customerName}
              onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
              placeholder="e.g. Nusrat Jahan"
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#D6B878]/40 bg-[#FFF9F2] text-xs text-[#342722] focus:outline-none focus:border-[#B89A58]"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-[#342722] block mb-1">
              Contact Phone Number <span className="text-rose-500">*</span>
            </label>
            <input
              type="tel"
              required
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="e.g. 01812345678"
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#D6B878]/40 bg-[#FFF9F2] text-xs font-mono text-[#342722] focus:outline-none focus:border-[#B89A58]"
            />
          </div>
        </div>

        <div>
          <label className="text-xs font-semibold text-[#342722] block mb-1">
            Preferred Hand Art Service <span className="text-rose-500">*</span>
          </label>
          <select
            value={formData.serviceName}
            onChange={(e) => {
              const selected = servicesList.find((s) => s.title === e.target.value);
              setFormData({
                ...formData,
                serviceName: e.target.value,
                serviceCategory: selected?.category || "bridal",
              });
            }}
            className="w-full px-3.5 py-2.5 rounded-xl border border-[#D6B878]/40 bg-[#FFF9F2] text-xs text-[#342722] focus:outline-none focus:border-[#B89A58]"
          >
            {servicesList.map((srv, idx) => (
              <option key={idx} value={srv.title}>
                {srv.title}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="text-xs font-semibold text-[#342722] block mb-1">
              Event Date <span className="text-rose-500">*</span>
            </label>
            <input
              type="date"
              required
              value={formData.eventDate}
              onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#D6B878]/40 bg-[#FFF9F2] text-xs text-[#342722] focus:outline-none focus:border-[#B89A58]"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-[#342722] block mb-1">
              Preferred Time Window <span className="text-rose-500">*</span>
            </label>
            <select
              value={formData.eventTime}
              onChange={(e) => setFormData({ ...formData, eventTime: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#D6B878]/40 bg-[#FFF9F2] text-xs text-[#342722] focus:outline-none focus:border-[#B89A58]"
            >
              <option value="Morning (10:00 AM - 1:00 PM)">Morning (10:00 AM - 1:00 PM)</option>
              <option value="Afternoon (2:00 PM - 5:00 PM)">Afternoon (2:00 PM - 5:00 PM)</option>
              <option value="Evening (6:00 PM - 9:00 PM)">Evening (6:00 PM - 9:00 PM)</option>
              <option value="Night (Full Bridal Night Session)">Night (Full Bridal Night Session)</option>
            </select>
          </div>
        </div>

        <div>
          <label className="text-xs font-semibold text-[#342722] block mb-1">
            Event Location / Area in Chittagong <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            required
            value={formData.locationArea}
            onChange={(e) => setFormData({ ...formData, locationArea: e.target.value })}
            placeholder="e.g. GEC Circle, Panchlaish, Agrabad, Khulshi, or Atelier visit"
            className="w-full px-3.5 py-2.5 rounded-xl border border-[#D6B878]/40 bg-[#FFF9F2] text-xs text-[#342722] focus:outline-none focus:border-[#B89A58]"
          />
        </div>

        <div>
          <label className="text-xs font-semibold text-[#342722] block mb-1">
            Design Preference / Motif Ideas (Optional)
          </label>
          <input
            type="text"
            value={formData.designPreference}
            onChange={(e) => setFormData({ ...formData, designPreference: e.target.value })}
            placeholder="e.g. Traditional bridal jaali, Arabic negative space, minimal wrist cuff, bride & groom portrait"
            className="w-full px-3.5 py-2.5 rounded-xl border border-[#D6B878]/40 bg-[#FFF9F2] text-xs text-[#342722] focus:outline-none focus:border-[#B89A58]"
          />
        </div>

        <div>
          <label className="text-xs font-semibold text-[#342722] block mb-1">
            Additional Notes & Guest Count (Optional)
          </label>
          <textarea
            rows={3}
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            placeholder="Number of family members wanting mehendi, skin sensitivity notes, outfit color scheme..."
            className="w-full px-3.5 py-2.5 rounded-xl border border-[#D6B878]/40 bg-[#FFF9F2] text-xs text-[#342722] focus:outline-none focus:border-[#B89A58]"
          />
        </div>

        <div className="flex items-start gap-2 pt-2">
          <input
            type="checkbox"
            id="consent"
            required
            checked={formData.consent}
            onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
            className="mt-0.5 accent-[#B89A58]"
          />
          <label htmlFor="consent" className="text-xs text-[#342722]/80">
            I understand this request is subject to stylist schedule confirmation and that Eternal 6 will contact me to finalize deposit and appointment details.
          </label>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-4 rounded-full bg-[#342722] hover:bg-[#4A3932] disabled:opacity-60 text-[#FFF9F2] text-xs font-bold uppercase tracking-widest transition-all shadow-lg flex items-center justify-center gap-2 border border-[#D6B878]/40"
        >
          {isSubmitting ? (
            <span>Logging Appointment...</span>
          ) : (
            <>
              <Send className="w-4 h-4 text-[#D6B878]" />
              <span>Submit Booking Request</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
}

export default function BookHandArtPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-xs text-[#8C7654]">Loading booking desk...</div>}>
      <BookingFormContent />
    </Suspense>
  );
}
