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
  const [inquiryType, setInquiryType] = useState("Corporate Executive Gifting & Boardroom Suites");
  const [volume, setVolume] = useState("Curated Gifting (50–200 units)");
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
        reservation_time: "Luxury Gifting",
        guests: volume.includes("50–200") ? 100 : volume.includes("200–500") ? 350 : volume.includes("500") ? 1000 : 25,
        seating_area: `${company} — ${inquiryType}`,
        special_requests: `[City: ${city}] [Volume: ${volume}] ${notes}`.trim(),
        concept_source: "Concept A — Maison Reserve Gifting",
      });
      if (res.success) {
        setConfirmed(true);
        setTicketId(`MR-${Math.floor(1000 + Math.random() * 9000)}`);
        showToast("Luxury gifting inquiry registered successfully. ✦", "success");
      } else {
        showToast(res.error || "Could not register luxury gifting inquiry.", "error");
      }
    } catch {
      showToast("Concierge network issue. Please email concierge@maisonreserve.example directly.", "error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-[#0A0B0E] min-h-screen text-[#F7F5F0] flex flex-col font-sans selection:bg-[#C5A059] selection:text-[#0A0B0E]">
      <ConceptAHeader />

      {/* Hero Banner */}
      <section className="pt-16 pb-12 border-b border-[#C5A059]/20 bg-[#0E1015]">
        <div className="max-w-7xl mx-auto px-6 text-center space-y-3">
          <span className="text-xs font-mono font-bold text-[#C5A059] uppercase tracking-widest block">
            ✦ Private Stockist &bull; Luxury Corporate Gifting Desk
          </span>
          <h1 className="font-serif font-black text-3xl sm:text-5xl text-[#F7F5F0] tracking-tight">
            Corporate Gifting &amp; Private Stockist Suites
          </h1>
          <p className="text-xs sm:text-sm text-[#A89F91] max-w-xl mx-auto font-light">
            Partner with Maison Reserve to curate wax-sealed wooden gift chests, boardroom confectionery suites, or luxury hotel pantry provisions shipped directly across India with cold-chain care.
          </p>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="py-16 flex-1">
        <div className="max-w-5xl mx-auto px-6">
          {confirmed ? (
            <div className="bg-[#13151A] rounded-2xl p-8 sm:p-12 border border-[#C5A059]/40 shadow-2xl text-center space-y-6 max-w-xl mx-auto">
              <div className="w-16 h-16 rounded-full bg-[#16181F] text-[#C5A059] border border-[#C5A059]/40 flex items-center justify-center mx-auto text-2xl">
                ✦
              </div>

              <div>
                <span className="text-xs uppercase font-mono font-bold text-[#C5A059] tracking-widest">
                  Concierge Docket Received
                </span>
                <h2 className="font-serif font-black text-2xl sm:text-3xl text-[#F7F5F0] mt-1">
                  Reference: #{ticketId}
                </h2>
                <p className="text-xs text-[#A89F91] mt-2 leading-relaxed">
                  Thank you, <strong>{name}</strong>! Our corporate gifting concierge will dispatch the Maison Reserve Lookbook, wholesale tiers, and private tasting kit options to <strong>{email}</strong> within 24 hours.
                </p>
              </div>

              <div className="p-6 rounded-xl bg-[#0A0B0E] border border-[#C5A059]/20 text-left space-y-2.5 text-xs text-[#D1C7BD] font-mono">
                <div className="flex justify-between border-b border-[#C5A059]/10 pb-2">
                  <span className="text-gray-500">Corporate Account:</span>
                  <span className="font-bold text-[#F7F5F0]">{company}</span>
                </div>
                <div className="flex justify-between border-b border-[#C5A059]/10 pb-2">
                  <span className="text-gray-500">Suite Scope:</span>
                  <span className="font-bold text-[#F7F5F0]">{inquiryType}</span>
                </div>
                <div className="flex justify-between border-b border-[#C5A059]/10 pb-2">
                  <span className="text-gray-500">Volume Batch:</span>
                  <span className="font-bold text-[#C5A059]">{volume}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Destination:</span>
                  <span className="font-bold text-[#F7F5F0]">{city}</span>
                </div>
              </div>

              <button
                onClick={() => setConfirmed(false)}
                className="px-6 py-2.5 rounded-xl bg-[#16181F] border border-[#C5A059]/40 text-[#C5A059] text-xs font-mono font-bold uppercase tracking-wider hover:bg-[#C5A059] hover:text-[#0A0B0E] transition"
              >
                Submit Another Inquiry
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              {/* Left Column: Form */}
              <div className="lg:col-span-2 bg-[#13151A] rounded-2xl p-6 sm:p-10 border border-[#C5A059]/30 shadow-xl">
                <form onSubmit={handleWholesaleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="text-xs font-mono font-bold text-[#D1C7BD] uppercase tracking-wider block mb-1.5">
                        Contact Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Julian Sterling"
                        className="w-full bg-[#0A0B0E] border border-[#C5A059]/30 text-xs text-[#F7F5F0] px-4 py-3 rounded-xl focus:outline-none focus:border-[#C5A059]"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-mono font-bold text-[#D1C7BD] uppercase tracking-wider block mb-1.5">
                        Company / Entity *
                      </label>
                      <input
                        type="text"
                        required
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        placeholder="e.g. Sterling Heritage Capital"
                        className="w-full bg-[#0A0B0E] border border-[#C5A059]/30 text-xs text-[#F7F5F0] px-4 py-3 rounded-xl focus:outline-none focus:border-[#C5A059]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="text-xs font-mono font-bold text-[#D1C7BD] uppercase tracking-wider block mb-1.5">
                        Business Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="concierge@company.com"
                        className="w-full bg-[#0A0B0E] border border-[#C5A059]/30 text-xs text-[#F7F5F0] px-4 py-3 rounded-xl focus:outline-none focus:border-[#C5A059]"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-mono font-bold text-[#D1C7BD] uppercase tracking-wider block mb-1.5">
                        Phone / WhatsApp *
                      </label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+91 98765 43210"
                        className="w-full bg-[#0A0B0E] border border-[#C5A059]/30 text-xs text-[#F7F5F0] px-4 py-3 rounded-xl focus:outline-none focus:border-[#C5A059]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="text-xs font-mono font-bold text-[#D1C7BD] uppercase tracking-wider block mb-1.5">
                        Program Scope
                      </label>
                      <select
                        value={inquiryType}
                        onChange={(e) => setInquiryType(e.target.value)}
                        className="w-full bg-[#0A0B0E] border border-[#C5A059]/30 text-xs text-[#F7F5F0] px-4 py-3 rounded-xl focus:outline-none focus:border-[#C5A059]"
                      >
                        <option>Corporate Executive Gifting &amp; Boardroom Suites</option>
                        <option>Luxury 5-Star Hotel Mini-Bar Provisions</option>
                        <option>High-End Gourmet Larder &amp; Boutique Stockist</option>
                        <option>Private Label Cacao &amp; Honeycomb Curation</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-xs font-mono font-bold text-[#D1C7BD] uppercase tracking-wider block mb-1.5">
                        Estimated Volume
                      </label>
                      <select
                        value={volume}
                        onChange={(e) => setVolume(e.target.value)}
                        className="w-full bg-[#0A0B0E] border border-[#C5A059]/30 text-xs text-[#F7F5F0] px-4 py-3 rounded-xl focus:outline-none focus:border-[#C5A059]"
                      >
                        <option>Curated Gifting (50–200 units)</option>
                        <option>Boutique Stockist (200–500 units)</option>
                        <option>Large Enterprise Suite (500+ units)</option>
                        <option>Sample Tasting Kit Evaluation (10 units)</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="text-xs font-mono font-bold text-[#D1C7BD] uppercase tracking-wider block mb-1.5">
                        Dispatch Destination (City)
                      </label>
                      <input
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder="e.g. Mumbai, New Delhi, Bengaluru"
                        className="w-full bg-[#0A0B0E] border border-[#C5A059]/30 text-xs text-[#F7F5F0] px-4 py-3 rounded-xl focus:outline-none focus:border-[#C5A059]"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-mono font-bold text-[#D1C7BD] uppercase tracking-wider block mb-1.5">
                        Required In-Hand Date
                      </label>
                      <input
                        type="date"
                        value={targetDate}
                        onChange={(e) => setTargetDate(e.target.value)}
                        className="w-full bg-[#0A0B0E] border border-[#C5A059]/30 text-xs text-[#F7F5F0] px-4 py-3 rounded-xl focus:outline-none focus:border-[#C5A059]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-mono font-bold text-[#D1C7BD] uppercase tracking-wider block mb-1.5">
                      Customization Notes / Special Instructions
                    </label>
                    <textarea
                      rows={3}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="e.g. Requesting black wax-seal stamps with custom company crests..."
                      className="w-full bg-[#0A0B0E] border border-[#C5A059]/30 text-xs text-[#F7F5F0] px-4 py-3 rounded-xl focus:outline-none focus:border-[#C5A059]"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-[#C5A059] via-[#D4AF37] to-[#B38F46] text-[#0A0B0E] font-bold text-xs uppercase tracking-widest shadow-xl shadow-[#C5A059]/20 hover:brightness-110 transition disabled:opacity-50"
                  >
                    {submitting ? "Transmitting Docket..." : "Transmit Gifting Inquiry ✦"}
                  </button>
                </form>
              </div>

              {/* Right Column: Benefits Sidebar */}
              <div className="space-y-6">
                <div className="bg-[#13151A] rounded-2xl p-6 border border-[#C5A059]/30 space-y-4">
                  <h3 className="font-serif font-bold text-base text-[#F7F5F0] tracking-wide flex items-center gap-2">
                    <span className="text-[#C5A059]">✦</span> Stockist Tier Privileges
                  </h3>
                  <ul className="text-xs space-y-3 text-[#A89F91]">
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
                      <span>Direct wholesale margins up to 45% off retail MSRP.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
                      <span>Climate-controlled insulated shipping across all Tier-1 and Tier-2 Indian hubs.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
                      <span>Custom laser-engraved wooden chests and metallic seal embossing.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
                      <span>Dedicated sommelier account manager and replenishment scheduling.</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-[#13151A] rounded-2xl p-6 border border-[#C5A059]/30 space-y-3 text-xs text-[#D1C7BD]">
                  <h4 className="font-serif font-bold text-sm text-[#F7F5F0]">Direct Concierge Line</h4>
                  <p className="flex items-center gap-2 text-gray-400">
                    <Phone className="w-4 h-4 text-[#C5A059]" />
                    <span>+91 98765 43210 (Direct Gifting Desk)</span>
                  </p>
                  <p className="flex items-center gap-2 text-gray-400">
                    <Mail className="w-4 h-4 text-[#C5A059]" />
                    <span>concierge@maisonreserve.example</span>
                  </p>
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
