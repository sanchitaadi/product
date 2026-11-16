"use client";

import React, { useState } from "react";
import { Building2, Package, Sparkles, CheckCircle2, ShieldCheck, Download, Mail, Phone, Truck } from "lucide-react";
import ConceptAHeader from "@/components/concept-a/Header";
import ConceptAFooter from "@/components/concept-a/Footer";
import { useToast } from "@/context/ToastContext";
import * as api from "@/lib/api";

export default function ConceptAWholesalePage() {
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [inquiryType, setInquiryType] = useState("Boutique Retailer & Gourmet Grocery");
  const [volume, setVolume] = useState("Starter Wholesale (50–200 units)");
  const [targetDate, setTargetDate] = useState("");
  const [city, setCity] = useState("New Delhi");
  const [notes, setNotes] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [ticketId, setTicketId] = useState("");

  const { showToast } = useToast();

  const handleWholesaleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !email || !company) {
      showToast("Please fill all required business contact fields.", "error");
      return;
    }
    setSubmitting(true);
    try {
      const res = await api.createReservation({
        name,
        phone,
        email,
        reservation_date: targetDate || new Date().toISOString().split("T")[0],
        reservation_time: "Wholesale",
        guests: volume.includes("50–200") ? 100 : volume.includes("200–500") ? 350 : volume.includes("500") ? 1000 : 10,
        seating_area: `${company} — ${inquiryType}`,
        special_requests: `[City: ${city}] [Volume: ${volume}] ${notes}`.trim(),
        concept_source: "Concept A — Coquette Wholesale",
      });
      if (res.success) {
        setConfirmed(true);
        setTicketId(`WS-${Math.floor(1000 + Math.random() * 9000)}`);
        showToast("Wholesale inquiry registered with love! 🎀", "success");
      } else {
        showToast(res.error || "Could not register wholesale inquiry.", "error");
      }
    } catch {
      showToast("Wholesale network issue. Please email wholesale@peachyplate.example directly.", "error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-[#FFF8F9] min-h-screen text-[#3D2D2E] flex flex-col font-sans">
      <ConceptAHeader />

      {/* Hero Banner */}
      <section className="pt-10 pb-6 border-b border-rose-100 bg-[#FFF0F3]/50">
        <div className="max-w-7xl mx-auto px-6 text-center space-y-2">
          <span className="text-xs font-bold text-[#E07A86] uppercase tracking-wider block">
            🎀 Small-Batch Pantry & Gourmet Distribution
          </span>
          <h1 className="font-coquette-serif font-black text-3xl sm:text-4xl text-[#3D2D2E]">
            Wholesale & Bulk Orders
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 max-w-xl mx-auto">
            Partner with Peachy Plate to stock our artisanal preserves, handcrafted sweet confections, and signature pantry provisions in your cafe, boutique grocery, or corporate gifting hampers.
          </p>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="py-12 flex-1">
        <div className="max-w-5xl mx-auto px-6">
          {confirmed ? (
            <div className="bg-white rounded-3xl p-8 sm:p-12 border border-rose-100 shadow-xl text-center space-y-6 max-w-xl mx-auto">
              <div className="w-16 h-16 rounded-full bg-rose-50 text-[#E07A86] flex items-center justify-center mx-auto text-2xl shadow-inner">
                🎀
              </div>

              <div>
                <span className="text-xs uppercase font-bold text-[#E07A86] tracking-wider">
                  Wholesale Inquiry Received
                </span>
                <h2 className="font-coquette-serif font-black text-2xl sm:text-3xl text-gray-900 mt-1">
                  Reference: #{ticketId}
                </h2>
                <p className="text-xs text-gray-500 mt-2">
                  Thank you, <strong>{name}</strong>! Our wholesale distribution concierge will dispatch our B2B Product Line Sheet, wholesale price schedule, and tasting sample options to <strong>{email}</strong> within 24 hours.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-[#FFF8F9] border border-rose-100 text-left space-y-2.5 text-xs">
                <div className="flex justify-between border-b border-rose-100 pb-2">
                  <span className="text-gray-400">Business / Company</span>
                  <span className="font-bold text-gray-900">{company}</span>
                </div>
                <div className="flex justify-between border-b border-rose-100 pb-2">
                  <span className="text-gray-400">Inquiry Type</span>
                  <span className="font-bold text-gray-900">{inquiryType}</span>
                </div>
                <div className="flex justify-between border-b border-rose-100 pb-2">
                  <span className="text-gray-400">Estimated Volume</span>
                  <span className="font-bold text-[#E07A86]">{volume}</span>
                </div>
                <div className="flex justify-between border-b border-rose-100 pb-2">
                  <span className="text-gray-400">Fulfillment City</span>
                  <span className="font-bold text-gray-900">{city}</span>
                </div>
                {notes && (
                  <div className="pt-1 text-gray-600 italic">
                    Special Notes: &ldquo;{notes}&rdquo;
                  </div>
                )}
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={() => setConfirmed(false)}
                  className="px-6 py-3 rounded-full bg-rose-50 border border-rose-200 text-xs font-bold text-[#E07A86] hover:bg-rose-100 transition"
                >
                  Submit Another Inquiry
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Form (2 cols) */}
              <form onSubmit={handleWholesaleSubmit} className="lg:col-span-2 bg-white rounded-3xl p-6 sm:p-8 border border-rose-100 shadow-sm space-y-5">
                <div className="border-b border-rose-100 pb-3 flex items-center justify-between">
                  <h3 className="font-coquette-serif font-bold text-xl text-gray-900 flex items-center gap-2">
                    <Building2 className="w-5 h-5 text-[#E07A86]" />
                    <span>Business & Distribution Inquiry</span>
                  </h3>
                  <span className="text-[11px] font-bold text-[#E07A86] bg-rose-50 px-2.5 py-1 rounded-full border border-rose-200">
                    B2B & Bulk Pricing
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="font-bold text-gray-700 block mb-1">Contact Person Name *</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Aanya Sharma"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-rose-200 bg-rose-50/30 focus:outline-none focus:ring-1 focus:ring-[#E07A86]"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-gray-700 block mb-1">Company / Brand / Store *</label>
                    <input
                      type="text"
                      required
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder="e.g. Blossom Gourmet Deli"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-rose-200 bg-rose-50/30 focus:outline-none focus:ring-1 focus:ring-[#E07A86]"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-gray-700 block mb-1">Business Email *</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="wholesale@yourstore.com"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-rose-200 bg-rose-50/30 focus:outline-none focus:ring-1 focus:ring-[#E07A86]"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-gray-700 block mb-1">Phone / WhatsApp *</label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98112 34567"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-rose-200 bg-rose-50/30 focus:outline-none focus:ring-1 focus:ring-[#E07A86]"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-gray-700 block mb-1">Inquiry / Business Type</label>
                    <select
                      value={inquiryType}
                      onChange={(e) => setInquiryType(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-rose-200 bg-white focus:outline-none"
                    >
                      <option value="Boutique Retailer & Gourmet Grocery">Boutique Retailer & Gourmet Grocery</option>
                      <option value="Specialty Cafe & Beverage Program">Specialty Cafe & Beverage Program</option>
                      <option value="Corporate Gifting & Event Hampers">Corporate Gifting & Event Hampers</option>
                      <option value="E-Commerce & Subscription Box Partner">E-Commerce & Subscription Box Partner</option>
                      <option value="Hospitality & Hotel Minibar Supply">Hospitality & Hotel Minibar Supply</option>
                    </select>
                  </div>

                  <div>
                    <label className="font-bold text-gray-700 block mb-1">Estimated Order Quantity</label>
                    <select
                      value={volume}
                      onChange={(e) => setVolume(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-rose-200 bg-white focus:outline-none"
                    >
                      <option value="Sample Tasting Kit (5–10 units)">Sample Tasting Kit (5–10 units)</option>
                      <option value="Starter Wholesale (50–200 units)">Starter Wholesale (50–200 units)</option>
                      <option value="Case Distribution (200–500 units)">Case Distribution (200–500 units)</option>
                      <option value="Commercial Pallet (500–2,000+ units)">Commercial Pallet (500–2,000+ units)</option>
                    </select>
                  </div>

                  <div>
                    <label className="font-bold text-gray-700 block mb-1">Target Delivery Date</label>
                    <input
                      type="date"
                      value={targetDate}
                      onChange={(e) => setTargetDate(e.target.value)}
                      min={new Date().toISOString().split("T")[0]}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-rose-200 bg-rose-50/30 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-gray-700 block mb-1">Destination City</label>
                    <input
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="e.g. Mumbai, Bengaluru, New Delhi"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-rose-200 bg-rose-50/30 focus:outline-none"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="font-bold text-gray-700 block mb-1">
                      Product Interests, Custom Packaging or Gifting Notes
                    </label>
                    <textarea
                      rows={3}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="e.g. We are curating 150 luxury holiday hampers for Diwali corporate gifting. Interested in Signature Peach Bellini Jams and Parisian Macaron boxes with custom ribbon branding..."
                      className="w-full px-3.5 py-2.5 rounded-xl border border-rose-200 bg-rose-50/30 focus:outline-none focus:ring-1 focus:ring-[#E07A86]"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-4 rounded-full bg-gradient-to-r from-[#E07A86] to-[#F59E0B] text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-rose-200/50 hover:opacity-95 disabled:opacity-50 transition"
                >
                  {submitting ? "Transmitting Wholesale Request..." : "Request Wholesale Catalog & Sample Kit 🎀"}
                </button>
              </form>

              {/* Wholesale Benefits Sidebar */}
              <div className="space-y-4">
                <div className="p-6 rounded-3xl bg-white border border-rose-100 shadow-sm space-y-4 text-xs text-gray-600">
                  <h4 className="font-coquette-serif font-bold text-sm text-[#3D2D2E] flex items-center gap-2">
                    <Package className="w-4 h-4 text-[#E07A86]" />
                    <span>Wholesale Partner Perks</span>
                  </h4>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <span className="text-[#E07A86] font-bold">✓</span>
                      <span><strong>Tiered B2B Margins:</strong> 35% to 50% wholesale discount schedules for verified stockists.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#E07A86] font-bold">✓</span>
                      <span><strong>Small-Batch Freshness:</strong> Every batch sealed in food-grade airtight jars with 12-month shelf life.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#E07A86] font-bold">✓</span>
                      <span><strong>Custom Co-Branding:</strong> Custom pastel ribbons, wax seals, and corporate brand cards available for 100+ units.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#E07A86] font-bold">✓</span>
                      <span><strong>Nationwide Cold/Dry Freight:</strong> Secure padded shipping across all major Indian metro hubs.</span>
                    </li>
                  </ul>
                </div>

                <div className="p-6 rounded-3xl bg-rose-50/60 border border-rose-100 shadow-sm space-y-2 text-xs">
                  <h4 className="font-coquette-serif font-bold text-sm text-[#3D2D2E]">
                    Direct Wholesale Desk
                  </h4>
                  <p className="text-gray-500 text-[11px]">
                    Have urgent pallet or custom procurement inquiries? Reach our wholesale team directly:
                  </p>
                  <p className="font-semibold text-gray-800">wholesale@peachyplate.example</p>
                  <p className="font-semibold text-gray-800">+91 98765 43210 (Mon–Fri 9am–6pm)</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      <ConceptAFooter />
    </div>
  );
}
