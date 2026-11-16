"use client";

import React, { useState } from "react";
import { Star, Ticket, Package, Building2, CheckCircle2, ShieldCheck, Download, Sparkles } from "lucide-react";
import ConceptGHeader from "@/components/concept-g/Header";
import ConceptGFooter from "@/components/concept-g/Footer";
import { useToast } from "@/context/ToastContext";
import * as api from "@/lib/api";

export default function ConceptGWholesalePage() {
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [inquiryType, setInquiryType] = useState("Festival Concession & Theme Park Retail");
  const [volume, setVolume] = useState("Carnival Trunk (100–300 units)");
  const [targetDate, setTargetDate] = useState("");
  const [city, setCity] = useState("New Delhi");
  const [notes, setNotes] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [ticketNo, setTicketNo] = useState("");

  const { showToast } = useToast();

  const handleWholesaleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !email || !company) {
      showToast("PLEASE COMPLETE ALL CARNIVAL CONCESSION FIELDS! 🎪", "error");
      return;
    }
    setSubmitting(true);
    try {
      const res = await api.createReservation({
        name,
        phone,
        email,
        reservation_date: targetDate || new Date().toISOString().split("T")[0],
        reservation_time: "Circus Wholesale",
        guests: volume.includes("100–300") ? 200 : volume.includes("300–800") ? 500 : 1500,
        seating_area: `${company} — ${inquiryType}`,
        special_requests: `[City: ${city}] [Volume: ${volume}] ${notes}`.trim(),
        concept_source: "Concept G — Circus Social Wholesale",
      });
      if (res.success) {
        setConfirmed(true);
        setTicketNo(`GOLDEN-CONCESSION-${Math.floor(1000 + Math.random() * 9000)}`);
        showToast("GOLDEN WHOLESALE TICKET REGISTERED! 🎟️", "success");
      } else {
        showToast(res.error || "Wholesale request failed", "error");
      }
    } catch {
      showToast("Unable to process carnival wholesale consignment.", "error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-[#FFFDD0] min-h-screen text-[#3D0C11] flex flex-col font-sans selection:bg-[#C41E3A] selection:text-white">
      <ConceptGHeader />

      {/* Marquee Banner */}
      <div className="bg-[#5C0614] text-[#FFD54F] py-2 px-4 font-black text-xs uppercase tracking-widest border-b-4 border-[#C41E3A] flex items-center justify-between select-none">
        <div className="flex items-center gap-3">
          <span className="bg-[#FFD54F] text-[#3D0C11] px-2 py-0.5 rounded text-[10px] font-black border border-[#3D0C11] shadow-[2px_2px_0px_#000]">
            🎪 BIG TOP WHOLESALE & CONCESSIONS
          </span>
          <span className="hidden sm:inline">GOURMET POPCORN TUBS, SPICED CARAMEL JARS & FAIRGROUND SWEETS</span>
        </div>
        <span className="bg-[#C41E3A] text-white px-3 py-0.5 rounded-full text-[10px] font-black border border-[#FFD54F]">
          ADMIT ONE WHOLESALER
        </span>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12 flex-1 w-full">
        {confirmed ? (
          <div className="max-w-xl mx-auto bg-white border-4 border-[#C41E3A] p-8 sm:p-10 shadow-[10px_10px_0px_#FFD54F] rounded-3xl text-center space-y-6">
            <div className="inline-block p-4 bg-[#FFD54F] text-[#3D0C11] border-3 border-[#C41E3A] rounded-full shadow-[4px_4px_0px_#C41E3A] text-3xl">
              🎟️✨
            </div>

            <div>
              <span className="px-3 py-1 bg-[#C41E3A] text-[#FFD54F] text-xs font-black uppercase tracking-wider rounded-full">
                PASS #{ticketNo}
              </span>
              <h2 className="text-3xl font-black uppercase tracking-tight mt-3 text-[#3D0C11]">
                WHOLESALE PASS ISSUED!
              </h2>
              <p className="text-xs text-gray-700 font-bold mt-2">
                STEP RIGHT UP, <strong>{name}</strong>! THE BIG TOP CONCESSION HEADQUARTERS IS DISPATCHING THE MASTER WHOLESALE PRICE LIST & TASTING HAMPER DETAILS TO <strong>{email}</strong>.
              </p>
            </div>

            <div className="p-5 bg-[#FFFEEA] border-3 border-dashed border-[#C41E3A] rounded-2xl text-left space-y-2 text-xs font-mono">
              <div className="flex justify-between border-b border-[#C41E3A]/20 pb-1.5">
                <span className="font-bold text-gray-600">RETAIL VENUE:</span>
                <span className="font-black text-[#3D0C11]">{company}</span>
              </div>
              <div className="flex justify-between border-b border-[#C41E3A]/20 pb-1.5">
                <span className="font-bold text-gray-600">CONCESSION FORMAT:</span>
                <span className="font-black text-[#C41E3A]">{inquiryType}</span>
              </div>
              <div className="flex justify-between border-b border-[#C41E3A]/20 pb-1.5">
                <span className="font-bold text-gray-600">VOLUME TIER:</span>
                <span className="font-black text-[#3D0C11]">{volume}</span>
              </div>
              <div className="flex justify-between border-b border-[#C41E3A]/20 pb-1.5">
                <span className="font-bold text-gray-600">DESTINATION:</span>
                <span className="font-black text-[#3D0C11]">{city}</span>
              </div>
              {notes && (
                <div className="pt-1 text-[11px] text-gray-700 font-mono italic">
                  &ldquo;{notes}&rdquo;
                </div>
              )}
            </div>

            <button
              onClick={() => setConfirmed(false)}
              className="w-full py-4 bg-[#FFD54F] text-[#3D0C11] font-black uppercase text-sm border-3 border-[#C41E3A] rounded-full shadow-[4px_4px_0px_#C41E3A] hover:bg-[#C41E3A] hover:text-[#FFD54F] transition"
            >
              ORDER ANOTHER CONCESSION PASS &crarr;
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Form */}
            <form onSubmit={handleWholesaleSubmit} className="lg:col-span-2 bg-white border-4 border-[#C41E3A] p-6 sm:p-8 shadow-[8px_8px_0px_#FFD54F] rounded-3xl space-y-5">
              <div className="border-b-4 border-[#FFD54F] pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <span className="text-[10px] font-black uppercase bg-[#C41E3A] text-[#FFD54F] px-2 py-0.5 rounded-full inline-block mb-1">
                    BIG TOP TICKET BOOTH
                  </span>
                  <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-[#3D0C11]">
                    CONCESSIONS & WHOLESALE INQUIRY
                  </h1>
                </div>
                <span className="text-xs font-black bg-[#FFD54F] text-[#3D0C11] px-3 py-1 rounded-full self-start sm:self-auto border border-[#C41E3A]">
                  CARNIVAL BULK
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-bold">
                <div>
                  <label className="block mb-1 uppercase tracking-wider text-[#3D0C11]">RINGMASTER / BUYER *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Kabir Chawla"
                    className="w-full p-3 border-3 border-[#C41E3A]/40 rounded-xl bg-[#FFFEEA] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#C41E3A]"
                  />
                </div>

                <div>
                  <label className="block mb-1 uppercase tracking-wider text-[#3D0C11]">VENUE / COMPANY / THEME PARK *</label>
                  <input
                    type="text"
                    required
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="e.g. Wonder Fair Concessions"
                    className="w-full p-3 border-3 border-[#C41E3A]/40 rounded-xl bg-[#FFFEEA] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#C41E3A]"
                  />
                </div>

                <div>
                  <label className="block mb-1 uppercase tracking-wider text-[#3D0C11]">BUSINESS EMAIL *</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="wholesale@wonderfair.example"
                    className="w-full p-3 border-3 border-[#C41E3A]/40 rounded-xl bg-[#FFFEEA] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#C41E3A]"
                  />
                </div>

                <div>
                  <label className="block mb-1 uppercase tracking-wider text-[#3D0C11]">PHONE NUMBER *</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98112 34567"
                    className="w-full p-3 border-3 border-[#C41E3A]/40 rounded-xl bg-[#FFFEEA] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#C41E3A]"
                  />
                </div>

                <div>
                  <label className="block mb-1 uppercase tracking-wider text-[#3D0C11]">VENUE / CONCESSION FORMAT</label>
                  <select
                    value={inquiryType}
                    onChange={(e) => setInquiryType(e.target.value)}
                    className="w-full p-3 border-3 border-[#C41E3A]/40 rounded-xl bg-white focus:outline-none"
                  >
                    <option value="Festival Concession & Theme Park Retail">Festival Concession & Theme Park Retail</option>
                    <option value="Cinema & Luxury Theatre Snack Lounge">Cinema & Luxury Theatre Snack Lounge</option>
                    <option value="Carnival Holiday Corporate Gifting">Carnival Holiday Corporate Gifting</option>
                    <option value="Gourmet Candy Store & Sweet Boutique">Gourmet Candy Store & Sweet Boutique</option>
                    <option value="Midway Event Pop-Up & Wedding Hamper">Midway Event Pop-Up & Wedding Hamper</option>
                  </select>
                </div>

                <div>
                  <label className="block mb-1 uppercase tracking-wider text-[#3D0C11]">ESTIMATED BULK VOLUME</label>
                  <select
                    value={volume}
                    onChange={(e) => setVolume(e.target.value)}
                    className="w-full p-3 border-3 border-[#C41E3A]/40 rounded-xl bg-white focus:outline-none"
                  >
                    <option value="Sample Midway Box (25–50 units)">Sample Midway Box (25–50 units)</option>
                    <option value="Carnival Trunk (100–300 units)">Carnival Trunk (100–300 units)</option>
                    <option value="Big Top Master Case (300–800 units)">Big Top Master Case (300–800 units)</option>
                    <option value="Grand Finale Pallet (1,000+ units)">Grand Finale Pallet (1,000+ units)</option>
                  </select>
                </div>

                <div>
                  <label className="block mb-1 uppercase tracking-wider text-[#3D0C11]">TARGET EVENT / DELIVERY DATE</label>
                  <input
                    type="date"
                    value={targetDate}
                    onChange={(e) => setTargetDate(e.target.value)}
                    min={new Date().toISOString().split("T")[0]}
                    className="w-full p-3 border-3 border-[#C41E3A]/40 rounded-xl bg-[#FFFEEA] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block mb-1 uppercase tracking-wider text-[#3D0C11]">DESTINATION CITY</label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="e.g. Mumbai, Goa, Bengaluru, Delhi"
                    className="w-full p-3 border-3 border-[#C41E3A]/40 rounded-xl bg-[#FFFEEA] focus:outline-none"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block mb-1 uppercase tracking-wider text-[#3D0C11]">
                    CONCESSION SWEETS, CARAMEL TUBS OR SPECIAL PACKAGING SPECS
                  </label>
                  <textarea
                    rows={3}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="e.g. Ordering 250 units of gourmet popcorn tins and spiced caramel jars in custom circus red-and-white striped gift boxes..."
                    className="w-full p-3 border-3 border-[#C41E3A]/40 rounded-xl bg-[#FFFEEA] focus:outline-none focus:ring-2 focus:ring-[#C41E3A]"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-4 bg-[#C41E3A] hover:bg-[#A3162C] text-white font-black uppercase text-sm border-3 border-[#FFD54F] rounded-full shadow-[4px_4px_0px_#FFD54F] transition disabled:opacity-50"
              >
                {submitting ? "ISSUING WHOLESALE PASS..." : "SUBMIT CONCESSION INQUIRY & GET TASTING HAMPER 🎟️🎪"}
              </button>
            </form>

            {/* Sidebar */}
            <div className="space-y-6">
              <div className="bg-[#FFD54F] border-4 border-[#C41E3A] p-6 shadow-[6px_6px_0px_#C41E3A] rounded-3xl space-y-4">
                <span className="text-[10px] font-black uppercase bg-[#C41E3A] text-white px-2.5 py-0.5 rounded-full inline-block">
                  CARNIVAL PERKS
                </span>
                <h3 className="text-xl font-black uppercase text-[#3D0C11]">
                  WHY STOCK CIRCUS SOCIAL?
                </h3>
                <ul className="space-y-3 text-xs font-bold text-[#3D0C11]">
                  <li className="flex items-start gap-2">
                    <span className="text-[#C41E3A]">★</span>
                    <span><strong>CARNIVAL NOVELTY PACKAGING:</strong> Arched ticket posters, collector tins, and golden foil badges that sell on sight.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#C41E3A]">★</span>
                    <span><strong>100% GOURMET ARTISANAL:</strong> Real clarified butter, organic cane sugars, and authentic Madagascar vanilla.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#C41E3A]">★</span>
                    <span><strong>FAST REPLENISHMENT:</strong> Priority wholesale dispatch within 48 hours for active retail stockists.</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white border-3 border-[#C41E3A] p-6 rounded-2xl shadow-[4px_4px_0px_#FFD54F] text-xs font-bold space-y-2">
                <p className="uppercase text-gray-500 text-[10px]">CIRCUS CONCESSIONS HEADQUARTERS</p>
                <p className="text-base font-black text-[#C41E3A]">concessions@peachyplate.example</p>
                <p className="text-[#3D0C11]">PHONE: +91 98765 43210 (MON–SAT 10AM–7PM)</p>
              </div>
            </div>
          </div>
        )}
      </div>

      <ConceptGFooter />
    </div>
  );
}
