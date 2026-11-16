"use client";

import React, { useState } from "react";
import { Zap, CheckCircle2, Package, Building2, Truck, Sparkles, ShoppingBag } from "lucide-react";
import confetti from "canvas-confetti";
import ConceptBHeader from "@/components/concept-b/Header";
import ConceptBFooter from "@/components/concept-b/Footer";
import RetroSoundProvider, { useRetroSound } from "@/components/concept-b/RetroSoundFX";
import RetroCustomCursor from "@/components/concept-b/RetroCustomCursor";
import RetroScrollProgress from "@/components/concept-b/RetroScrollProgress";
import { useToast } from "@/context/ToastContext";
import * as api from "@/lib/api";

function ConceptBWholesaleContent() {
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [inquiryType, setInquiryType] = useState("Retro Bodega & Snack Dispensary");
  const [volume, setVolume] = useState("Starter Pack (100–300 units)");
  const [targetDate, setTargetDate] = useState("");
  const [city, setCity] = useState("New Delhi");
  const [notes, setNotes] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [poNumber, setPoNumber] = useState("");

  const { showToast } = useToast();
  const { playCoin, playPop, playClick } = useRetroSound();

  const handleWholesaleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !email || !company) {
      showToast("FILL ALL BUSINESS DETAILS! 💥", "error");
      return;
    }
    setSubmitting(true);
    playClick();
    try {
      const res = await api.createReservation({
        name,
        phone,
        email,
        reservation_date: targetDate || new Date().toISOString().split("T")[0],
        reservation_time: "Wholesale PO",
        guests: volume.includes("100–300") ? 200 : volume.includes("300–800") ? 500 : 1500,
        seating_area: `${company} — ${inquiryType}`,
        special_requests: `[City: ${city}] [Volume: ${volume}] ${notes}`.trim(),
        concept_source: "Concept B — Retro Gen-Z Wholesale",
      });
      if (res.success) {
        setConfirmed(true);
        setPoNumber(`PO-90S-${Math.floor(1000 + Math.random() * 9000)}`);
        playCoin();
        try {
          confetti({
            particleCount: 60,
            spread: 80,
            origin: { y: 0.6 },
            colors: ["#FFE15D", "#FF2A55", "#000000", "#FFFFFF"],
          });
        } catch {
          // ignore
        }
        showToast("WHOLESALE PO GENERATED! ⚡", "success");
      } else {
        showToast(res.error || "Could not register PO.", "error");
      }
    } catch {
      showToast("Wholesale connection error.", "error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-[#FFF9EC] min-h-screen text-black flex flex-col font-sans selection:bg-[#FFE15D] selection:text-black relative overflow-x-clip">
      {/* Top Retro Scroll Progress */}
      <RetroScrollProgress />

      {/* Desktop Custom Cursor */}
      <RetroCustomCursor />

      <ConceptBHeader />

      {/* Retro Marquee Sub-Bar */}
      <div className="bg-[#FF2A55] text-white font-black text-xs uppercase py-2 px-4 border-b-4 border-black flex items-center justify-between font-retro-bold select-none">
        <div className="flex items-center gap-2">
          <span>⚡ B2B BODEGA & WHOLESALE DISPENSARY</span>
          <span>&bull;</span>
          <span className="hidden sm:inline">BULK CANDY, CRUNCHY SNACKS & SODA PALLETS</span>
        </div>
        <span className="bg-[#FFE15D] text-black px-2 py-0.5 text-[10px] font-black border-2 border-black">
          UP TO 45% OFF WHOLESALE
        </span>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12 flex-1 w-full">
        {confirmed ? (
          <div className="max-w-xl mx-auto bg-white border-4 border-black p-8 sm:p-10 shadow-[10px_10px_0px_#000] text-center space-y-6">
            <div className="inline-block p-4 bg-[#FFE15D] border-4 border-black shadow-[4px_4px_0px_#000] text-3xl">
              📦⚡
            </div>

            <div>
              <span className="px-3 py-1 bg-black text-[#FFE15D] text-xs font-black uppercase tracking-wider font-mono">
                PURCHASE ORDER FILED: {poNumber}
              </span>
              <h2 className="text-3xl font-black font-retro-bold uppercase tracking-tight mt-3">
                WHOLESALE DROP LOCKED IN!
              </h2>
              <p className="text-xs text-gray-700 font-bold mt-2">
                HELL YEAH, <strong>{name}</strong>! OUR WHOLESALE DISPENSARY TEAM IS PACKING YOUR RETRO CATALOG & PRICING SCHEDULE FOR <strong>{email}</strong>.
              </p>
            </div>

            <div className="p-5 bg-[#FFF9EC] border-3 border-black text-left space-y-2 text-xs font-mono">
              <div className="flex justify-between border-b-2 border-dashed border-black pb-1.5">
                <span className="font-bold text-gray-600">CLIENT STORE:</span>
                <span className="font-black">{company}</span>
              </div>
              <div className="flex justify-between border-b-2 border-dashed border-black pb-1.5">
                <span className="font-bold text-gray-600">INQUIRY CATEGORY:</span>
                <span className="font-black text-[#FF2A55]">{inquiryType}</span>
              </div>
              <div className="flex justify-between border-b-2 border-dashed border-black pb-1.5">
                <span className="font-bold text-gray-600">VOLUME TIER:</span>
                <span className="font-black text-[#000]">{volume}</span>
              </div>
              <div className="flex justify-between border-b-2 border-dashed border-black pb-1.5">
                <span className="font-bold text-gray-600">DISPATCH CITY:</span>
                <span className="font-black">{city}</span>
              </div>
              {notes && (
                <div className="pt-1 text-[11px] text-gray-700 font-mono italic">
                  &ldquo;{notes}&rdquo;
                </div>
              )}
            </div>

            <button
              onClick={() => {
                playPop();
                setConfirmed(false);
              }}
              className="w-full py-4 bg-[#FFE15D] text-black font-black uppercase text-sm border-4 border-black shadow-[4px_4px_0px_#000] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition active:bg-[#FF2A55] active:text-white"
            >
              FILE ANOTHER PURCHASE ORDER &crarr;
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Form */}
            <form onSubmit={handleWholesaleSubmit} className="lg:col-span-2 bg-white border-4 border-black p-6 sm:p-8 shadow-[8px_8px_0px_#000] space-y-5">
              <div className="border-b-4 border-black pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <span className="text-[10px] font-black uppercase bg-[#FF2A55] text-white px-2 py-0.5 border-2 border-black inline-block mb-1">
                    OFFICIAL DISPENSARY ORDER DESK
                  </span>
                  <h1 className="text-2xl sm:text-3xl font-black font-retro-bold uppercase tracking-tight">
                    WHOLESALE & BULK PURCHASE INQUIRY
                  </h1>
                </div>
                <span className="text-xs font-black bg-[#FFE15D] text-black px-3 py-1 border-2 border-black font-mono self-start sm:self-auto">
                  MIN. 100 UNITS
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-bold">
                <div>
                  <label className="block mb-1 uppercase tracking-wider">YOUR NAME *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Aryan Malhotra"
                    className="w-full p-3 border-3 border-black bg-[#FFF9EC] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#FF2A55]"
                  />
                </div>

                <div>
                  <label className="block mb-1 uppercase tracking-wider">STORE / VENUE / BRAND *</label>
                  <input
                    type="text"
                    required
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="e.g. Pixel Arcade & Cafe"
                    className="w-full p-3 border-3 border-black bg-[#FFF9EC] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#FF2A55]"
                  />
                </div>

                <div>
                  <label className="block mb-1 uppercase tracking-wider">BUSINESS EMAIL *</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="orders@pixelarcade.example"
                    className="w-full p-3 border-3 border-black bg-[#FFF9EC] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#FF2A55]"
                  />
                </div>

                <div>
                  <label className="block mb-1 uppercase tracking-wider">PHONE / WHATSAPP *</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98991 23456"
                    className="w-full p-3 border-3 border-black bg-[#FFF9EC] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#FF2A55]"
                  />
                </div>

                <div>
                  <label className="block mb-1 uppercase tracking-wider">STORE / CLIENT TYPE</label>
                  <select
                    value={inquiryType}
                    onChange={(e) => setInquiryType(e.target.value)}
                    className="w-full p-3 border-3 border-black bg-white focus:outline-none font-mono"
                  >
                    <option value="Retro Bodega & Snack Dispensary">Retro Bodega & Snack Dispensary</option>
                    <option value="Arcade Bar & Entertainment Venue">Arcade Bar & Entertainment Venue</option>
                    <option value="Streetwear Brand Pop-Up / Drop">Streetwear Brand Pop-Up / Drop</option>
                    <option value="College Campus Convenience Store">College Campus Convenience Store</option>
                    <option value="Festival & Music Event Stockist">Festival & Music Event Stockist</option>
                  </select>
                </div>

                <div>
                  <label className="block mb-1 uppercase tracking-wider">ESTIMATED VOLUME</label>
                  <select
                    value={volume}
                    onChange={(e) => setVolume(e.target.value)}
                    className="w-full p-3 border-3 border-black bg-white focus:outline-none font-mono"
                  >
                    <option value="Sample Pack (25–50 units)">Sample Pack (25–50 units)</option>
                    <option value="Starter Pack (100–300 units)">Starter Pack (100–300 units)</option>
                    <option value="Retail Master Case (300–800 units)">Retail Master Case (300–800 units)</option>
                    <option value="Pallet Drop (1,000+ units)">Pallet Drop (1,000+ units)</option>
                  </select>
                </div>

                <div>
                  <label className="block mb-1 uppercase tracking-wider">TARGET DELIVERY DATE</label>
                  <input
                    type="date"
                    value={targetDate}
                    onChange={(e) => setTargetDate(e.target.value)}
                    min={new Date().toISOString().split("T")[0]}
                    className="w-full p-3 border-3 border-black bg-[#FFF9EC] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block mb-1 uppercase tracking-wider">DESTINATION CITY</label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="e.g. Mumbai, Bengaluru, Delhi"
                    className="w-full p-3 border-3 border-black bg-[#FFF9EC] focus:outline-none"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block mb-1 uppercase tracking-wider">
                    SPECIFIC PRODUCT DROPS OR CUSTOM BUNDLE REQUESTS
                  </label>
                  <textarea
                    rows={3}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="e.g. Looking to stock 250 units of Lotus Biscoff Shakes, Retro Sourdough Snack Packs, and Truffle Fries in custom 90s packaging..."
                    className="w-full p-3 border-3 border-black bg-[#FFF9EC] focus:outline-none focus:ring-2 focus:ring-[#FF2A55]"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-4 bg-[#FF2A55] text-white font-black uppercase text-sm border-4 border-black shadow-[6px_6px_0px_#000] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition disabled:opacity-50 font-retro-bold"
              >
                {submitting ? "PROCESSING PO..." : "SUBMIT WHOLESALE PO & GET SAMPLE BOX ⚡"}
              </button>
            </form>

            {/* Sidebar */}
            <div className="space-y-6">
              <div className="bg-[#FFE15D] border-4 border-black p-6 shadow-[6px_6px_0px_#000] space-y-4">
                <span className="text-[10px] font-black uppercase bg-black text-[#FFE15D] px-2 py-0.5 border border-black inline-block">
                  WHY STOCK RETRO GEN-Z?
                </span>
                <h3 className="text-xl font-black font-retro-bold uppercase">
                  HIGH VELOCITY SNACK PERKS
                </h3>
                <ul className="space-y-2 text-xs font-bold">
                  <li className="flex items-start gap-2">
                    <span className="text-[#FF2A55]">▶</span>
                    <span><strong>HIGH-MARGIN B2B TIERS:</strong> Guaranteed 40%+ gross margins for retail stockists.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#FF2A55]">▶</span>
                    <span><strong>SHELF LIFE PROVEN:</strong> Sealed nitro-flushed foil packs & airtight tubs keep crispy for 180 days.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#FF2A55]">▶</span>
                    <span><strong>DISPLAY STAND INCLUDED:</strong> Free branded 90s arcade wireframe counter display with 200+ unit orders.</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white border-4 border-black p-6 shadow-[6px_6px_0px_#000] text-xs font-bold space-y-2 font-mono">
                <p className="uppercase text-gray-500 text-[10px]">DIRECT B2B DISPENSARY HOTLINE</p>
                <p className="text-base font-black text-[#FF2A55]">wholesale@peachyplate.example</p>
                <p>CALL / WHATSAPP: +91 98765 43210</p>
              </div>
            </div>
          </div>
        )}
      </div>

      <ConceptBFooter />
    </div>
  );
}

export default function ConceptBWholesalePage() {
  return (
    <RetroSoundProvider>
      <ConceptBWholesaleContent />
    </RetroSoundProvider>
  );
}
