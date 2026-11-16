"use client";

import React, { useState } from "react";
import { CheckCircle2, Leaf, Package, Building2, Download, ShieldCheck, Mail, Phone, Sun } from "lucide-react";
import ConceptDHeader from "@/components/concept-d/Header";
import ConceptDFooter from "@/components/concept-d/Footer";
import { useToast } from "@/context/ToastContext";
import * as api from "@/lib/api";

export default function ConceptDWholesalePage() {
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [inquiryType, setInquiryType] = useState("Organic Grocer & Zero-Waste Pantry");
  const [volume, setVolume] = useState("Starter Harvest (50–150 units)");
  const [targetDate, setTargetDate] = useState("");
  const [city, setCity] = useState("New Delhi");
  const [notes, setNotes] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [refId, setRefId] = useState("");

  const { showToast } = useToast();

  const handleWholesaleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !email || !company) {
      showToast("Please provide all required farm partner details.", "error");
      return;
    }
    setSubmitting(true);
    try {
      const res = await api.createReservation({
        name,
        phone,
        email,
        reservation_date: targetDate || new Date().toISOString().split("T")[0],
        reservation_time: "Farm Wholesale",
        guests: volume.includes("50–150") ? 100 : volume.includes("150–400") ? 250 : 800,
        seating_area: `${company} — ${inquiryType}`,
        special_requests: `[City: ${city}] [Volume: ${volume}] ${notes}`.trim(),
        concept_source: "Concept D — Organic Earth Wholesale",
      });
      if (res.success) {
        setConfirmed(true);
        setRefId(`FARM-WS-${Math.floor(1000 + Math.random() * 9000)}`);
        showToast("Farm partnership inquiry recorded.", "success");
      } else {
        showToast(res.error || "Inquiry submission failed.", "error");
      }
    } catch {
      showToast("Network error submitting wholesale inquiry.", "error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-[#FDFBF7] min-h-screen text-[#1E3F20] flex flex-col font-serif selection:bg-[#7B8E78] selection:text-white">
      <ConceptDHeader />

      {/* Top Banner */}
      <section className="pt-10 pb-6 border-b border-[#5E6B4E]/20 bg-[#F2EFE9]/60 font-sans">
        <div className="max-w-7xl mx-auto px-6 text-center space-y-2">
          <span className="text-xs font-bold text-[#5E6B4E] uppercase tracking-widest flex items-center justify-center gap-1.5">
            <Leaf className="w-3.5 h-3.5 text-[#7B8E78]" />
            100% REGENERATIVE FARMLAND PROVISIONS &bull; DIRECT HARVEST WHOLESALE
          </span>
          <h1 className="font-serif font-bold text-3xl sm:text-4xl text-[#1E3F20]">
            Wholesale & Farm Share Inquiries
          </h1>
          <p className="text-xs sm:text-sm text-[#4A5D4E] max-w-xl mx-auto font-serif">
            Distribute our ancient stone-milled flours, cold-pressed virgin oils, wild forest honey, and organic pantry provisions in your organic store, farm-to-table kitchen, or sustainable corporate hampers.
          </p>
        </div>
      </section>

      <section className="py-12 flex-1 font-sans">
        <div className="max-w-5xl mx-auto px-6">
          {confirmed ? (
            <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#5E6B4E]/30 shadow-xl text-center space-y-6 max-w-xl mx-auto">
              <div className="w-16 h-16 rounded-full bg-[#EAE6DF] text-[#1E3F20] flex items-center justify-center mx-auto text-2xl shadow-inner">
                🌿
              </div>

              <div>
                <span className="text-xs uppercase font-bold text-[#5E6B4E] tracking-widest">
                  Farm Partnership Logged: #{refId}
                </span>
                <h2 className="font-serif font-bold text-2xl sm:text-3xl text-[#1E3F20] mt-1">
                  Thank You, {name}
                </h2>
                <p className="text-xs text-[#4A5D4E] mt-2 font-serif leading-relaxed">
                  Our harvest coordinator will transmit our seasonal crop availability schedule, organic lab certifications, and wholesale line sheets to <strong>{email}</strong> within one business day.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-[#FDFBF7] border border-[#5E6B4E]/20 text-left space-y-2.5 text-xs font-serif">
                <div className="flex justify-between border-b border-[#5E6B4E]/15 pb-2">
                  <span className="text-gray-500">Business / Store</span>
                  <span className="font-bold text-[#1E3F20]">{company}</span>
                </div>
                <div className="flex justify-between border-b border-[#5E6B4E]/15 pb-2">
                  <span className="text-gray-500">Store Format</span>
                  <span className="font-bold text-[#5E6B4E]">{inquiryType}</span>
                </div>
                <div className="flex justify-between border-b border-[#5E6B4E]/15 pb-2">
                  <span className="text-gray-500">Estimated Harvest Tier</span>
                  <span className="font-bold text-[#C86D51]">{volume}</span>
                </div>
                <div className="flex justify-between border-b border-[#5E6B4E]/15 pb-2">
                  <span className="text-gray-500">Delivery Destination</span>
                  <span className="font-bold text-[#1E3F20]">{city}</span>
                </div>
                {notes && (
                  <div className="pt-1 text-[#4A5D4E] italic">
                    Crop & Packaging Notes: &ldquo;{notes}&rdquo;
                  </div>
                )}
              </div>

              <button
                onClick={() => setConfirmed(false)}
                className="px-8 py-3 rounded-full bg-[#F2EFE9] border border-[#5E6B4E]/30 text-xs font-bold text-[#1E3F20] hover:bg-[#E2DDD5] transition"
              >
                Submit Another Farm Inquiry
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Form */}
              <form onSubmit={handleWholesaleSubmit} className="lg:col-span-2 bg-white rounded-3xl p-6 sm:p-8 border border-[#5E6B4E]/25 shadow-sm space-y-5">
                <div className="border-b border-[#5E6B4E]/20 pb-3 flex items-center justify-between">
                  <h3 className="font-serif font-bold text-xl text-[#1E3F20] flex items-center gap-2">
                    <Building2 className="w-5 h-5 text-[#5E6B4E]" />
                    <span>Farm Wholesale & Stockist Desk</span>
                  </h3>
                  <span className="text-[11px] font-bold text-[#1E3F20] bg-[#EAE6DF] px-2.5 py-1 rounded-full border border-[#5E6B4E]/30 font-sans">
                    Regenerative Organic
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-sans">
                  <div>
                    <label className="font-bold text-[#1E3F20] block mb-1">Partner / Buyer Name *</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Rohini Deshmukh"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#5E6B4E]/30 bg-[#FDFBF7] focus:outline-none focus:ring-1 focus:ring-[#5E6B4E]"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-[#1E3F20] block mb-1">Store / Cooperative / Restaurant *</label>
                    <input
                      type="text"
                      required
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder="e.g. Terra Organic Market"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#5E6B4E]/30 bg-[#FDFBF7] focus:outline-none focus:ring-1 focus:ring-[#5E6B4E]"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-[#1E3F20] block mb-1">Business Email *</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="wholesale@terramarket.example"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#5E6B4E]/30 bg-[#FDFBF7] focus:outline-none focus:ring-1 focus:ring-[#5E6B4E]"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-[#1E3F20] block mb-1">Phone / WhatsApp *</label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98200 12345"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#5E6B4E]/30 bg-[#FDFBF7] focus:outline-none focus:ring-1 focus:ring-[#5E6B4E]"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-[#1E3F20] block mb-1">Buyer / Outlet Type</label>
                    <select
                      value={inquiryType}
                      onChange={(e) => setInquiryType(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#5E6B4E]/30 bg-white focus:outline-none font-sans"
                    >
                      <option value="Organic Grocer & Zero-Waste Pantry">Organic Grocer & Zero-Waste Pantry</option>
                      <option value="Farm-to-Table Cafe & Bakery">Farm-to-Table Cafe & Bakery</option>
                      <option value="Sustainable Eco-Resort & Spa Minibar">Sustainable Eco-Resort & Spa Minibar</option>
                      <option value="Corporate Eco-Gifting Hampers">Corporate Eco-Gifting Hampers</option>
                      <option value="Community Supported Agriculture (CSA)">Community Supported Agriculture (CSA)</option>
                    </select>
                  </div>

                  <div>
                    <label className="font-bold text-[#1E3F20] block mb-1">Estimated Harvest Quantity</label>
                    <select
                      value={volume}
                      onChange={(e) => setVolume(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#5E6B4E]/30 bg-white focus:outline-none font-sans"
                    >
                      <option value="Sample Tasting Kit (10–20 units)">Sample Tasting Kit (10–20 units)</option>
                      <option value="Starter Harvest (50–150 units)">Starter Harvest (50–150 units)</option>
                      <option value="Pantry Pallet (150–400 units)">Pantry Pallet (150–400 units)</option>
                      <option value="Commercial Farm Share (500+ units)">Commercial Farm Share (500+ units)</option>
                    </select>
                  </div>

                  <div>
                    <label className="font-bold text-[#1E3F20] block mb-1">Target Delivery Date</label>
                    <input
                      type="date"
                      value={targetDate}
                      onChange={(e) => setTargetDate(e.target.value)}
                      min={new Date().toISOString().split("T")[0]}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#5E6B4E]/30 bg-[#FDFBF7] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-[#1E3F20] block mb-1">Destination City</label>
                    <input
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="e.g. Pune, Bengaluru, New Delhi"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#5E6B4E]/30 bg-[#FDFBF7] focus:outline-none"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="font-bold text-[#1E3F20] block mb-1">
                      Product Lines, Plastic-Free Packaging, or Custom Private Label Requests
                    </label>
                    <textarea
                      rows={3}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="e.g. We wish to order cold-pressed oils, sourdough kits, and artisan gnocchi in fully compostable glass jars with recycled paper labels..."
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#5E6B4E]/30 bg-[#FDFBF7] focus:outline-none focus:ring-1 focus:ring-[#5E6B4E]"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-4 rounded-full bg-[#1E3F20] text-white font-bold text-xs uppercase tracking-widest hover:bg-[#2c532f] transition disabled:opacity-50 font-sans shadow-md"
                >
                  {submitting ? "RECORDING HARVEST INQUIRY..." : "REQUEST SEASONAL CROP SCHEDULE & WHOLESALE LINE SHEET 🌿"}
                </button>
              </form>

              {/* Sidebar */}
              <div className="space-y-4">
                <div className="p-6 rounded-3xl bg-white border border-[#5E6B4E]/20 shadow-sm space-y-4 text-xs text-[#4A5D4E] font-sans">
                  <h4 className="font-serif font-bold text-sm text-[#1E3F20] flex items-center gap-2">
                    <Package className="w-4 h-4 text-[#7B8E78]" />
                    <span>The Organic Earth Promise</span>
                  </h4>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <span className="text-[#5E6B4E] font-bold">✓</span>
                      <span><strong>Zero Synthetic Additives:</strong> Free from preservatives, artificial binders, or seed oils.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#5E6B4E] font-bold">✓</span>
                      <span><strong>Batch Lab Analysis:</strong> Heavy metal & pesticide-free test reports with every wholesale pallet.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#5E6B4E] font-bold">✓</span>
                      <span><strong>Compostable & Glass:</strong> Packaged exclusively in recyclable amber glass & unbleached kraft paper.</span>
                    </li>
                  </ul>
                </div>

                <div className="p-6 rounded-3xl bg-[#F2EFE9] border border-[#5E6B4E]/20 shadow-sm space-y-2 text-xs font-sans">
                  <h4 className="font-serif font-bold text-sm text-[#1E3F20]">
                    Farm Stewardship Office
                  </h4>
                  <p className="text-[#4A5D4E] text-[11px]">
                    Direct farm supply & organic wholesale procurement:
                  </p>
                  <p className="font-semibold text-[#1E3F20]">harvest@peachyplate.example</p>
                  <p className="text-gray-600">+91 98765 43210 (Mon–Fri 8am–5pm)</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      <ConceptDFooter />
    </div>
  );
}
