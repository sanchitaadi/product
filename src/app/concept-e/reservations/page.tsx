"use client";

import React, { useState } from "react";
import { Train, Clock, Package, Building2, CheckCircle2, Ticket, ShieldCheck, MapPin, Download } from "lucide-react";
import ConceptEHeader from "@/components/concept-e/Header";
import ConceptEFooter from "@/components/concept-e/Footer";
import { useToast } from "@/context/ToastContext";
import * as api from "@/lib/api";

export default function ConceptEWholesalePage() {
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [inquiryType, setInquiryType] = useState("Station Kiosk & Transit Hub Retail");
  const [volume, setVolume] = useState("Standard Cargo (100–300 units)");
  const [targetDate, setTargetDate] = useState("");
  const [city, setCity] = useState("New Delhi");
  const [notes, setNotes] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [manifestNo, setManifestNo] = useState("");

  const { showToast } = useToast();

  const handleWholesaleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !email || !company) {
      showToast("PLEASE FILL ALL REQUIRED CARGO DISPATCH FIELDS.", "error");
      return;
    }
    setSubmitting(true);
    try {
      const res = await api.createReservation({
        name,
        phone,
        email,
        reservation_date: targetDate || new Date().toISOString().split("T")[0],
        reservation_time: "Cargo Dispatch",
        guests: volume.includes("100–300") ? 200 : volume.includes("300–800") ? 500 : 1200,
        seating_area: `${company} — ${inquiryType}`,
        special_requests: `[City: ${city}] [Volume: ${volume}] ${notes}`.trim(),
        concept_source: "Concept E — Metro Bites Cargo Wholesale",
      });
      if (res.success) {
        setConfirmed(true);
        setManifestNo(`CARGO-METRO-${Math.floor(1000 + Math.random() * 9000)}`);
        showToast("RAILWAY CARGO MANIFEST RECORDED!", "success");
      } else {
        showToast(res.error || "Manifest request failed", "error");
      }
    } catch {
      showToast("Unable to process transit wholesale consignment.", "error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-[#08142C] min-h-screen text-[#F8F6F0] flex flex-col font-sans">
      <ConceptEHeader />

      {/* Station Ticker */}
      <div className="bg-[#FFD100] text-[#08142C] font-mono font-black text-xs uppercase py-2 px-4 border-b-2 border-black flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="bg-[#D71920] text-white px-2 py-0.5 rounded text-[10px] border border-black shadow-[2px_2px_0px_#000]">
            🚆 METRO FREIGHT & WHOLESALE
          </span>
          <span className="hidden sm:inline">COMMERCIAL FOODWAY PROVISIONS & COMMUTER PANTRY LOGISTICS</span>
        </div>
        <span className="bg-[#08142C] text-[#FFD100] px-2 py-0.5 text-[10px] font-mono font-black border border-black">
          RAPID RAIL TRANSIT FREIGHT
        </span>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12 flex-1 w-full">
        {confirmed ? (
          <div className="max-w-xl mx-auto bg-[#0E2042] border-4 border-[#FFD100] p-8 sm:p-10 shadow-[8px_8px_0px_#D71920] text-center space-y-6">
            <div className="inline-block p-4 bg-[#FFD100] text-[#08142C] border-2 border-black shadow-[4px_4px_0px_#000] text-3xl font-mono">
              🚆📦
            </div>

            <div>
              <span className="px-3 py-1 bg-[#D71920] text-white text-xs font-mono font-bold uppercase tracking-wider rounded">
                CARGO MANIFEST #{manifestNo}
              </span>
              <h2 className="text-3xl font-black font-mono uppercase tracking-tight mt-3 text-white">
                CARGO CONSIGNMENT BOOKED
              </h2>
              <p className="text-xs text-gray-300 font-mono mt-2">
                ATTN: <strong>{name}</strong>. CENTRAL TERMINAL FREIGHT OFFICE HAS QUEUED YOUR WHOLESALE TARIFF AND LINE SHEET FOR TRANSMISSION TO <strong>{email}</strong>.
              </p>
            </div>

            <div className="p-5 bg-[#08142C] border-2 border-[#FFD100]/50 text-left space-y-2 text-xs font-mono">
              <div className="flex justify-between border-b border-white/10 pb-1.5">
                <span className="text-gray-400">CONSIGNEE:</span>
                <span className="font-bold text-white">{company}</span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-1.5">
                <span className="text-gray-400">TERMINAL OUTLET:</span>
                <span className="font-bold text-[#FFD100]">{inquiryType}</span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-1.5">
                <span className="text-gray-400">FREIGHT VOLUME:</span>
                <span className="font-bold text-white">{volume}</span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-1.5">
                <span className="text-gray-400">DISPATCH TERMINAL:</span>
                <span className="font-bold text-white">{city}</span>
              </div>
              {notes && (
                <div className="pt-1 text-[11px] text-gray-400 font-mono italic">
                  CONSIGNMENT SPECS: &ldquo;{notes}&rdquo;
                </div>
              )}
            </div>

            <button
              onClick={() => setConfirmed(false)}
              className="w-full py-4 bg-[#FFD100] text-[#08142C] font-mono font-black uppercase text-sm border-2 border-black shadow-[4px_4px_0px_#D71920] hover:bg-white transition"
            >
              FILE ANOTHER CARGO CONSIGNMENT &crarr;
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Form */}
            <form onSubmit={handleWholesaleSubmit} className="lg:col-span-2 bg-[#0E2042] border-4 border-[#FFD100] p-6 sm:p-8 shadow-[8px_8px_0px_#D71920] space-y-5">
              <div className="border-b-2 border-white/10 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <span className="text-[10px] font-mono font-black uppercase bg-[#D71920] text-white px-2 py-0.5 rounded inline-block mb-1">
                    PLATFORM 01 FREIGHT DESK
                  </span>
                  <h1 className="text-2xl sm:text-3xl font-mono font-black uppercase tracking-tight text-white">
                    WHOLESALE & COMMERCIAL CARGO INQUIRY
                  </h1>
                </div>
                <span className="text-xs font-mono font-bold bg-[#FFD100] text-[#08142C] px-3 py-1 rounded">
                  PALLET TARIFF
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
                <div>
                  <label className="block mb-1 uppercase tracking-wider text-gray-300">DISPATCH OFFICER / BUYER *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Vikram Mehra"
                    className="w-full p-3 border-2 border-[#FFD100]/60 bg-[#08142C] text-white focus:outline-none focus:border-[#FFD100]"
                  />
                </div>

                <div>
                  <label className="block mb-1 uppercase tracking-wider text-gray-300">CONSIGNEE COMPANY / STORE *</label>
                  <input
                    type="text"
                    required
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="e.g. Metro Express Hub Mart"
                    className="w-full p-3 border-2 border-[#FFD100]/60 bg-[#08142C] text-white focus:outline-none focus:border-[#FFD100]"
                  />
                </div>

                <div>
                  <label className="block mb-1 uppercase tracking-wider text-gray-300">BUSINESS EMAIL *</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="procurement@metrohub.example"
                    className="w-full p-3 border-2 border-[#FFD100]/60 bg-[#08142C] text-white focus:outline-none focus:border-[#FFD100]"
                  />
                </div>

                <div>
                  <label className="block mb-1 uppercase tracking-wider text-gray-300">PHONE / TELEGRAPH *</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98100 98765"
                    className="w-full p-3 border-2 border-[#FFD100]/60 bg-[#08142C] text-white focus:outline-none focus:border-[#FFD100]"
                  />
                </div>

                <div>
                  <label className="block mb-1 uppercase tracking-wider text-gray-300">OUTLET / TRANSIT TYPE</label>
                  <select
                    value={inquiryType}
                    onChange={(e) => setInquiryType(e.target.value)}
                    className="w-full p-3 border-2 border-[#FFD100]/60 bg-[#08142C] text-white focus:outline-none font-mono"
                  >
                    <option value="Station Kiosk & Transit Hub Retail">Station Kiosk & Transit Hub Retail</option>
                    <option value="Airport Concierge & Rail Travel Catering">Airport Concierge & Rail Travel Catering</option>
                    <option value="Highway Express Foodway Dispensary">Highway Express Foodway Dispensary</option>
                    <option value="Corporate Commuter Pantry & Canteen">Corporate Commuter Pantry & Canteen</option>
                    <option value="Urban Micro-Fulfilment Network">Urban Micro-Fulfilment Network</option>
                  </select>
                </div>

                <div>
                  <label className="block mb-1 uppercase tracking-wider text-gray-300">FREIGHT VOLUME TIER</label>
                  <select
                    value={volume}
                    onChange={(e) => setVolume(e.target.value)}
                    className="w-full p-3 border-2 border-[#FFD100]/60 bg-[#08142C] text-white focus:outline-none font-mono"
                  >
                    <option value="Express Sample Crate (20–50 units)">Express Sample Crate (20–50 units)</option>
                    <option value="Standard Cargo (100–300 units)">Standard Cargo (100–300 units)</option>
                    <option value="Carriage Pallet (300–800 units)">Carriage Pallet (300–800 units)</option>
                    <option value="Commercial Freight (1,000+ units)">Commercial Freight (1,000+ units)</option>
                  </select>
                </div>

                <div>
                  <label className="block mb-1 uppercase tracking-wider text-gray-300">TARGET DISPATCH DATE</label>
                  <input
                    type="date"
                    value={targetDate}
                    onChange={(e) => setTargetDate(e.target.value)}
                    min={new Date().toISOString().split("T")[0]}
                    className="w-full p-3 border-2 border-[#FFD100]/60 bg-[#08142C] text-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block mb-1 uppercase tracking-wider text-gray-300">DESTINATION STATION CITY</label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="e.g. New Delhi, Mumbai, Kolkata"
                    className="w-full p-3 border-2 border-[#FFD100]/60 bg-[#08142C] text-white focus:outline-none"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block mb-1 uppercase tracking-wider text-gray-300">
                    CONSIGNMENT SPECIFICATIONS & MERCHANDISING REQUESTS
                  </label>
                  <textarea
                    rows={3}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="e.g. Requesting 300 units of express meal pouches, canned cold brew elixirs, and branded railway wire displays for 4 station kiosks..."
                    className="w-full p-3 border-2 border-[#FFD100]/60 bg-[#08142C] text-white focus:outline-none focus:border-[#FFD100]"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-4 bg-[#D71920] hover:bg-[#B3141A] text-white font-mono font-black uppercase text-sm border-2 border-[#FFD100] shadow-[4px_4px_0px_#000] transition disabled:opacity-50"
              >
                {submitting ? "RECORDING MANIFEST..." : "SUBMIT CARGO FREIGHT MANIFEST 🚆📦"}
              </button>
            </form>

            {/* Sidebar */}
            <div className="space-y-6 font-mono text-xs">
              <div className="bg-[#0E2042] border-2 border-[#FFD100] p-6 shadow-[6px_6px_0px_#D71920] space-y-4">
                <span className="text-[10px] font-black uppercase bg-[#FFD100] text-[#08142C] px-2 py-0.5 rounded inline-block">
                  RAPID RAIL ADVANTAGE
                </span>
                <h3 className="text-xl font-black uppercase text-white">
                  WHY STOCK METRO BITES?
                </h3>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start gap-2">
                    <span className="text-[#FFD100]">▶</span>
                    <span><strong>HIGH COMMUTER VELOCITY:</strong> Grab-and-go packaging optimized for busy commuter retail.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#FFD100]">▶</span>
                    <span><strong>12-MONTH SHELF STABILITY:</strong> Nitrogen-purged ambient pouches requiring no refrigerated cold chain.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#FFD100]">▶</span>
                    <span><strong>BARCODE & SCAN-READY:</strong> Fully compliant EAN barcodes, FSSAI nutrition labels, and MSRP tags.</span>
                  </li>
                </ul>
              </div>

              <div className="bg-[#08142C] border-2 border-white/20 p-6 space-y-2">
                <p className="text-[10px] text-gray-400 uppercase">CENTRAL FREIGHT DISPATCH TERMINAL</p>
                <p className="text-base font-bold text-[#FFD100]">cargo@peachyplate.example</p>
                <p className="text-gray-300">TELEPHONE: +91 98765 43210 (24/7 CARGO DESK)</p>
              </div>
            </div>
          </div>
        )}
      </div>

      <ConceptEFooter />
    </div>
  );
}
