"use client";

import React, { useState } from "react";
import { CheckCircle2, Zap, Package, Building2, Sparkles, Download, Mail, Phone } from "lucide-react";
import ConceptCHeader from "@/components/concept-c/Header";
import ConceptCFooter from "@/components/concept-c/Footer";
import { useToast } from "@/context/ToastContext";
import * as api from "@/lib/api";

export default function ConceptCWholesalePage() {
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [inquiryType, setInquiryType] = useState("Pop Art Gallery & Design Concept Store");
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
      showToast("PLEASE FILL ALL REQUIRED FIELDS! 💥", "error");
      return;
    }
    setSubmitting(true);
    try {
      const res = await api.createReservation({
        name,
        phone,
        email,
        reservation_date: targetDate || new Date().toISOString().split("T")[0],
        reservation_time: "Pop Wholesale",
        guests: volume.includes("50–200") ? 100 : volume.includes("200–500") ? 350 : 1000,
        seating_area: `${company} — ${inquiryType}`,
        special_requests: `[City: ${city}] [Volume: ${volume}] ${notes}`.trim(),
        concept_source: "Concept C — Maximalist Pop Art Wholesale",
      });
      if (res.success) {
        setConfirmed(true);
        setTicketId(`POP-WS-${Math.floor(1000 + Math.random() * 9000)}`);
        showToast("POP WHOLESALE INQUIRY REGISTERED! 💥", "success");
      } else {
        showToast(res.error || "Submission failed", "error");
      }
    } catch {
      showToast("Network error submitting wholesale inquiry.", "error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-[#FFFDF7] min-h-screen text-black flex flex-col font-sans selection:bg-[#FF007F] selection:text-white">
      <ConceptCHeader />

      {/* Pop Top Ticker */}
      <div className="bg-[#FFE600] text-black font-black text-xs uppercase py-2 px-4 border-b-4 border-black flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="bg-[#FF007F] text-white px-2 py-0.5 text-[10px] border border-black shadow-[2px_2px_0px_#000]">
            ⚡ B2B POP ART DISTRIBUTION
          </span>
          <span className="hidden sm:inline">HIGH-VOLTAGE ARTISANAL FOOD PACKAGING & WHOLESALE TIERS</span>
        </div>
        <span className="bg-[#0047FF] text-white px-2 py-0.5 text-[10px] font-black border border-black shadow-[2px_2px_0px_#000]">
          STOCK OUR BOLD PANTRY
        </span>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12 flex-1 w-full">
        {confirmed ? (
          <div className="max-w-xl mx-auto bg-white border-4 border-black p-8 sm:p-10 shadow-[10px_10px_0px_#FF007F] text-center space-y-6">
            <div className="inline-block p-4 bg-[#FFE600] border-4 border-black shadow-[4px_4px_0px_#000] text-3xl">
              🎨💥
            </div>

            <div>
              <span className="px-3 py-1 bg-black text-[#FFE600] text-xs font-black uppercase tracking-wider font-mono">
                REF: #{ticketId}
              </span>
              <h2 className="text-3xl font-black uppercase tracking-tight mt-3">
                POP ART WHOLESALE LOCKED!
              </h2>
              <p className="text-xs text-gray-700 font-bold mt-2">
                EXCELLENT, <strong>{name}</strong>! OUR POP PRODUCT SPECIALIST WILL TRANSMIT YOUR EXCLUSIVE WHOLESALE LINE SHEET & PROMOTIONAL DISPLAY RACK DETAILS TO <strong>{email}</strong>.
              </p>
            </div>

            <div className="p-5 bg-[#FFFDF7] border-3 border-black text-left space-y-2 text-xs font-mono">
              <div className="flex justify-between border-b-2 border-dashed border-black pb-1.5">
                <span className="font-bold text-gray-600">RETAIL STORE:</span>
                <span className="font-black">{company}</span>
              </div>
              <div className="flex justify-between border-b-2 border-dashed border-black pb-1.5">
                <span className="font-bold text-gray-600">STORE TYPE:</span>
                <span className="font-black text-[#FF007F]">{inquiryType}</span>
              </div>
              <div className="flex justify-between border-b-2 border-dashed border-black pb-1.5">
                <span className="font-bold text-gray-600">QUANTITY TIER:</span>
                <span className="font-black">{volume}</span>
              </div>
              <div className="flex justify-between border-b-2 border-dashed border-black pb-1.5">
                <span className="font-bold text-gray-600">TARGET CITY:</span>
                <span className="font-black">{city}</span>
              </div>
              {notes && (
                <div className="pt-1 text-[11px] text-gray-700 font-mono italic">
                  &ldquo;{notes}&rdquo;
                </div>
              )}
            </div>

            <button
              onClick={() => setConfirmed(false)}
              className="w-full py-4 bg-[#FFE600] text-black font-black uppercase text-sm border-4 border-black shadow-[4px_4px_0px_#000] hover:bg-[#FF007F] hover:text-white transition"
            >
              SUBMIT ANOTHER INQUIRY &crarr;
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Form */}
            <form onSubmit={handleWholesaleSubmit} className="lg:col-span-2 bg-white border-4 border-black p-6 sm:p-8 shadow-[8px_8px_0px_#FF007F] space-y-5">
              <div className="border-b-4 border-black pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <span className="text-[10px] font-black uppercase bg-[#0047FF] text-white px-2 py-0.5 border-2 border-black inline-block mb-1">
                    OFFICIAL WHOLESALE DESK
                  </span>
                  <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight">
                    POP WHOLESALE & STOCKIST INQUIRY
                  </h1>
                </div>
                <span className="text-xs font-black bg-[#FFE600] text-black px-3 py-1 border-2 border-black font-mono self-start sm:self-auto">
                  HIGH MARGINS
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-bold">
                <div>
                  <label className="block mb-1 uppercase tracking-wider">CONTACT NAME *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Maya Sen"
                    className="w-full p-3 border-3 border-black bg-[#FFFDF7] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#FF007F]"
                  />
                </div>

                <div>
                  <label className="block mb-1 uppercase tracking-wider">STORE / CONCEPT SPACE *</label>
                  <input
                    type="text"
                    required
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="e.g. Neon Gallery Deli"
                    className="w-full p-3 border-3 border-black bg-[#FFFDF7] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#FF007F]"
                  />
                </div>

                <div>
                  <label className="block mb-1 uppercase tracking-wider">BUSINESS EMAIL *</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="maya@neongallery.example"
                    className="w-full p-3 border-3 border-black bg-[#FFFDF7] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#FF007F]"
                  />
                </div>

                <div>
                  <label className="block mb-1 uppercase tracking-wider">PHONE NUMBER *</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98112 34567"
                    className="w-full p-3 border-3 border-black bg-[#FFFDF7] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#FF007F]"
                  />
                </div>

                <div>
                  <label className="block mb-1 uppercase tracking-wider">STORE FORMAT</label>
                  <select
                    value={inquiryType}
                    onChange={(e) => setInquiryType(e.target.value)}
                    className="w-full p-3 border-3 border-black bg-white focus:outline-none font-mono"
                  >
                    <option value="Pop Art Gallery & Design Concept Store">Pop Art Gallery & Design Concept Store</option>
                    <option value="Specialty Cafe & Modern Deli">Specialty Cafe & Modern Deli</option>
                    <option value="High-End Department Store Stockist">High-End Department Store Stockist</option>
                    <option value="Corporate Creative Gifting Hampers">Corporate Creative Gifting Hampers</option>
                    <option value="Gourmet Food Hall & Pop-Up">Gourmet Food Hall & Pop-Up</option>
                  </select>
                </div>

                <div>
                  <label className="block mb-1 uppercase tracking-wider">ESTIMATED VOLUME</label>
                  <select
                    value={volume}
                    onChange={(e) => setVolume(e.target.value)}
                    className="w-full p-3 border-3 border-black bg-white focus:outline-none font-mono"
                  >
                    <option value="Sample Pack (20–40 units)">Sample Pack (20–40 units)</option>
                    <option value="Starter Wholesale (50–200 units)">Starter Wholesale (50–200 units)</option>
                    <option value="Master Case (200–500 units)">Master Case (200–500 units)</option>
                    <option value="Commercial Pallet (500+ units)">Commercial Pallet (500+ units)</option>
                  </select>
                </div>

                <div>
                  <label className="block mb-1 uppercase tracking-wider">TARGET DELIVERY DATE</label>
                  <input
                    type="date"
                    value={targetDate}
                    onChange={(e) => setTargetDate(e.target.value)}
                    min={new Date().toISOString().split("T")[0]}
                    className="w-full p-3 border-3 border-black bg-[#FFFDF7] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block mb-1 uppercase tracking-wider">DESTINATION CITY</label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="e.g. Mumbai, Bengaluru, Delhi"
                    className="w-full p-3 border-3 border-black bg-[#FFFDF7] focus:outline-none"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block mb-1 uppercase tracking-wider">
                    SPECIFIC PRODUCT INTERESTS OR PRIVATE PACKAGING NOTES
                  </label>
                  <textarea
                    rows={3}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="e.g. We want to stock Warhol Margherita Pizza kits, Truffle Fries seasoning shakers, and Cold Brew Elixirs for our museum shop..."
                    className="w-full p-3 border-3 border-black bg-[#FFFDF7] focus:outline-none focus:ring-2 focus:ring-[#FF007F]"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-4 bg-[#FF007F] text-white font-black uppercase text-sm border-4 border-black shadow-[6px_6px_0px_#000] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition disabled:opacity-50"
              >
                {submitting ? "SUBMITTING POP WHOLESALE..." : "REQUEST WHOLESALE CATALOG & LINE SHEET 💥"}
              </button>
            </form>

            {/* Sidebar */}
            <div className="space-y-6">
              <div className="bg-[#FFE600] border-4 border-black p-6 shadow-[6px_6px_0px_#000] space-y-4">
                <span className="text-[10px] font-black uppercase bg-black text-[#FFE600] px-2 py-0.5 border border-black inline-block">
                  POP PARTNER ADVANTAGE
                </span>
                <h3 className="text-xl font-black uppercase">
                  WHY STOCK MAXIMALIST POP ART?
                </h3>
                <ul className="space-y-2 text-xs font-bold">
                  <li className="flex items-start gap-2">
                    <span className="text-[#FF007F]">⚡</span>
                    <span><strong>INSTANT EYE-MAGNET:</strong> High-saturation packaging stops foot traffic in retail aisles.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#FF007F]">⚡</span>
                    <span><strong>TIERED B2B DISCOUNTS:</strong> Up to 45% margin structure on case orders.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#FF007F]">⚡</span>
                    <span><strong>ECO-FRIENDLY POP TINS:</strong> Recyclable collectible tins that customers reuse and display.</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white border-4 border-black p-6 shadow-[6px_6px_0px_#0047FF] text-xs font-bold space-y-2 font-mono">
                <p className="uppercase text-gray-500 text-[10px]">POP ART WHOLESALE DISPATCH</p>
                <p className="text-base font-black text-[#0047FF]">wholesale@peachyplate.example</p>
                <p>PHONE: +91 98765 43210</p>
              </div>
            </div>
          </div>
        )}
      </div>

      <ConceptCFooter />
    </div>
  );
}
