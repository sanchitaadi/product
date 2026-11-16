"use client";

import React, { useState } from "react";
import { Zap, Package, Building2, CheckCircle2, ShieldCheck, Download, Sparkles } from "lucide-react";
import ConceptFHeader from "@/components/concept-f/Header";
import ConceptFFooter from "@/components/concept-f/Footer";
import { useToast } from "@/context/ToastContext";
import * as api from "@/lib/api";

export default function ConceptFWholesalePage() {
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [inquiryType, setInquiryType] = useState("Anime Cafe & Manga Book Lounge");
  const [volume, setVolume] = useState("Starter Guild Pack (100–300 units)");
  const [targetDate, setTargetDate] = useState("");
  const [city, setCity] = useState("New Delhi");
  const [notes, setNotes] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [contractId, setContractId] = useState("");

  const { showToast } = useToast();

  const handleWholesaleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !email || !company) {
      showToast("PLEASE FILL ALL GUILD REGISTRATION FIELDS! ドドド", "error");
      return;
    }
    setSubmitting(true);
    try {
      const res = await api.createReservation({
        name,
        phone,
        email,
        reservation_date: targetDate || new Date().toISOString().split("T")[0],
        reservation_time: "Guild Wholesale",
        guests: volume.includes("100–300") ? 200 : volume.includes("300–800") ? 500 : 1500,
        seating_area: `${company} — ${inquiryType}`,
        special_requests: `[City: ${city}] [Volume: ${volume}] ${notes}`.trim(),
        concept_source: "Concept F — Manga Bites Guild Wholesale",
      });
      if (res.success) {
        setConfirmed(true);
        setContractId(`GUILD-SHONEN-${Math.floor(1000 + Math.random() * 9000)}`);
        showToast("SHONEN GUILD WHOLESALE FILED! DON!!", "success");
      } else {
        showToast(res.error || "Guild registration failed", "error");
      }
    } catch {
      showToast("Guild network communication error.", "error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-[#FEFBF6] min-h-screen text-black flex flex-col font-sans selection:bg-[#D7263D] selection:text-white">
      <ConceptFHeader />

      {/* Comic Action Sound Bar */}
      <div className="bg-[#D7263D] text-white py-1.5 px-4 font-black text-xs uppercase tracking-widest border-b-4 border-black flex items-center justify-between select-none">
        <div className="flex items-center gap-3">
          <span className="bg-black text-[#FFE600] px-2 py-0.5 text-[10px] border border-black shadow-[2px_2px_0px_#000]">
            ⚡ CHAPTER 07: B2B GUILD PROVISIONING
          </span>
          <span className="hidden sm:inline">AUTHENTIC RAMEN KITS, MATCHA TINS & ANIME CONFECTIONERY</span>
        </div>
        <span className="bg-white text-black px-2 py-0.5 text-[10px] font-black border border-black">
          ドドド... DON!!
        </span>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12 flex-1 w-full">
        {confirmed ? (
          <div className="max-w-xl mx-auto bg-white border-4 border-black p-8 sm:p-10 shadow-[10px_10px_0px_#D7263D] text-center space-y-6">
            <div className="inline-block p-4 bg-[#FFE600] border-4 border-black shadow-[4px_4px_0px_#000] text-3xl">
              🍜⚡
            </div>

            <div>
              <span className="px-3 py-1 bg-black text-[#FFE600] text-xs font-black uppercase tracking-wider font-mono">
                GUILD CONTRACT #{contractId}
              </span>
              <h2 className="text-3xl font-black uppercase tracking-tight mt-3">
                WHOLESALE CONTRACT SEALED!
              </h2>
              <p className="text-xs text-gray-700 font-bold mt-2">
                ARIGATO, <strong>{name}</strong>! THE PEACHY SHONEN GUILD COURIERS ARE TRANSMITTING THE FULL MANGA PANTRY LINE SHEET TO <strong>{email}</strong>.
              </p>
            </div>

            <div className="p-5 bg-[#FFFDF7] border-3 border-black text-left space-y-2 text-xs font-mono">
              <div className="flex justify-between border-b-2 border-dashed border-black pb-1.5">
                <span className="font-bold text-gray-600">STORE / GUILD:</span>
                <span className="font-black">{company}</span>
              </div>
              <div className="flex justify-between border-b-2 border-dashed border-black pb-1.5">
                <span className="font-bold text-gray-600">OUTLET TYPE:</span>
                <span className="font-black text-[#D7263D]">{inquiryType}</span>
              </div>
              <div className="flex justify-between border-b-2 border-dashed border-black pb-1.5">
                <span className="font-bold text-gray-600">ORDER VOLUME:</span>
                <span className="font-black">{volume}</span>
              </div>
              <div className="flex justify-between border-b-2 border-dashed border-black pb-1.5">
                <span className="font-bold text-gray-600">DESTINATION:</span>
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
              className="w-full py-4 bg-[#D7263D] text-white font-black uppercase text-sm border-4 border-black shadow-[4px_4px_0px_#000] hover:bg-black hover:text-[#FFE600] transition"
            >
              FILE ANOTHER GUILD CONTRACT &crarr;
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Form */}
            <form onSubmit={handleWholesaleSubmit} className="lg:col-span-2 bg-white border-4 border-black p-6 sm:p-8 shadow-[8px_8px_0px_#000] space-y-5">
              <div className="border-b-4 border-black pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <span className="text-[10px] font-black uppercase bg-[#D7263D] text-white px-2 py-0.5 border-2 border-black inline-block mb-1">
                    SHONEN DISTRIBUTION HQ
                  </span>
                  <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight">
                    GUILD WHOLESALE & STOCKIST INQUIRY
                  </h1>
                </div>
                <span className="text-xs font-black bg-[#FFE600] text-black px-3 py-1 border-2 border-black font-mono self-start sm:self-auto">
                  UP TO 45% MARGIN
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-bold">
                <div>
                  <label className="block mb-1 uppercase tracking-wider">GUILD MASTER / BUYER *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Kenji Tanaka"
                    className="w-full p-3 border-3 border-black bg-[#FEFBF6] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#D7263D]"
                  />
                </div>

                <div>
                  <label className="block mb-1 uppercase tracking-wider">STORE / CAFE / EVENT *</label>
                  <input
                    type="text"
                    required
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="e.g. Neo-Tokyo Manga Cafe"
                    className="w-full p-3 border-3 border-black bg-[#FEFBF6] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#D7263D]"
                  />
                </div>

                <div>
                  <label className="block mb-1 uppercase tracking-wider">BUSINESS EMAIL *</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="wholesale@neotokyo.example"
                    className="w-full p-3 border-3 border-black bg-[#FEFBF6] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#D7263D]"
                  />
                </div>

                <div>
                  <label className="block mb-1 uppercase tracking-wider">PHONE / WHATSAPP *</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98112 34567"
                    className="w-full p-3 border-3 border-black bg-[#FEFBF6] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#D7263D]"
                  />
                </div>

                <div>
                  <label className="block mb-1 uppercase tracking-wider">OUTLET / VENUE FORMAT</label>
                  <select
                    value={inquiryType}
                    onChange={(e) => setInquiryType(e.target.value)}
                    className="w-full p-3 border-3 border-black bg-white focus:outline-none font-mono"
                  >
                    <option value="Anime Cafe & Manga Book Lounge">Anime Cafe & Manga Book Lounge</option>
                    <option value="Comic Book Store & Pop Culture Retail">Comic Book Store & Pop Culture Retail</option>
                    <option value="Japanese Snack Box Subscription Brand">Japanese Snack Box Subscription Brand</option>
                    <option value="Gaming Arena & Cosplay Convention Booth">Gaming Arena & Cosplay Convention Booth</option>
                    <option value="Asian Specialty Grocery & Supermarket">Asian Specialty Grocery & Supermarket</option>
                  </select>
                </div>

                <div>
                  <label className="block mb-1 uppercase tracking-wider">ESTIMATED PROVISION VOLUME</label>
                  <select
                    value={volume}
                    onChange={(e) => setVolume(e.target.value)}
                    className="w-full p-3 border-3 border-black bg-white focus:outline-none font-mono"
                  >
                    <option value="Sample Guild Crate (25–50 units)">Sample Guild Crate (25–50 units)</option>
                    <option value="Starter Guild Pack (100–300 units)">Starter Guild Pack (100–300 units)</option>
                    <option value="Master Shonen Case (300–800 units)">Master Shonen Case (300–800 units)</option>
                    <option value="Full Caravan Pallet (1,000+ units)">Full Caravan Pallet (1,000+ units)</option>
                  </select>
                </div>

                <div>
                  <label className="block mb-1 uppercase tracking-wider">TARGET DISPATCH DATE</label>
                  <input
                    type="date"
                    value={targetDate}
                    onChange={(e) => setTargetDate(e.target.value)}
                    min={new Date().toISOString().split("T")[0]}
                    className="w-full p-3 border-3 border-black bg-[#FEFBF6] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block mb-1 uppercase tracking-wider">DESTINATION CITY</label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="e.g. Bengaluru, Mumbai, Pune, Delhi"
                    className="w-full p-3 border-3 border-black bg-[#FEFBF6] focus:outline-none"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block mb-1 uppercase tracking-wider">
                    SPECIFIC DISH KITS, MATCHA TINS OR COLLECTIBLE PACKAGING SPECS
                  </label>
                  <textarea
                    rows={3}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="e.g. Looking to stock 200 units of artisan ramen kits, matcha cloud powders, and comic sound-effect snack tins..."
                    className="w-full p-3 border-3 border-black bg-[#FEFBF6] focus:outline-none focus:ring-2 focus:ring-[#D7263D]"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-4 bg-[#D7263D] text-white font-black uppercase text-sm border-4 border-black shadow-[6px_6px_0px_#000] hover:bg-black hover:text-[#FFE600] transition disabled:opacity-50"
              >
                {submitting ? "RECORDING GUILD MANIFEST..." : "SUBMIT GUILD CONTRACT & REQUEST SAMPLE CRATE ⚡"}
              </button>
            </form>

            {/* Sidebar */}
            <div className="space-y-6">
              <div className="bg-[#FFE600] border-4 border-black p-6 shadow-[6px_6px_0px_#000] space-y-4">
                <span className="text-[10px] font-black uppercase bg-black text-[#FFE600] px-2 py-0.5 border border-black inline-block">
                  GUILD ADVANTAGE
                </span>
                <h3 className="text-xl font-black uppercase">
                  WHY STOCK MANGA BITES?
                </h3>
                <ul className="space-y-3 text-xs font-bold">
                  <li className="flex items-start gap-2">
                    <span className="text-[#D7263D]">▶</span>
                    <span><strong>AUTHENTIC FORMULATIONS:</strong> Real dashi broths, Japanese wheat noodles, and ceremonial grade Uji matcha.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#D7263D]">▶</span>
                    <span><strong>VIRAL UNBOXING FACTOR:</strong> Action manga panel outer packaging with collector issue numbers.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#D7263D]">▶</span>
                    <span><strong>HIGH-MARGIN GUILD TIERS:</strong> Up to 45% margin schedules with promotional manga stickers included.</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white border-4 border-black p-6 shadow-[6px_6px_0px_#D7263D] text-xs font-bold space-y-2 font-mono">
                <p className="uppercase text-gray-500 text-[10px]">PEACHY SHONEN GUILD DISPATCH</p>
                <p className="text-base font-black text-[#D7263D]">guild@peachyplate.example</p>
                <p>TELEPHONE: +91 98765 43210</p>
              </div>
            </div>
          </div>
        )}
      </div>

      <ConceptFFooter />
    </div>
  );
}
