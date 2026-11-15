"use client";

import React, { useState } from "react";
import { Zap, CheckCircle2, Clock, Users, Calendar, Sparkles } from "lucide-react";
import confetti from "canvas-confetti";
import ConceptBHeader from "@/components/concept-b/Header";
import ConceptBFooter from "@/components/concept-b/Footer";
import RetroSoundProvider, { useRetroSound } from "@/components/concept-b/RetroSoundFX";
import RetroCustomCursor from "@/components/concept-b/RetroCustomCursor";
import RetroScrollProgress from "@/components/concept-b/RetroScrollProgress";
import { useToast } from "@/context/ToastContext";
import * as api from "@/lib/api";

function ConceptBReservationsContent() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("08:00 PM");
  const [guests, setGuests] = useState(4);
  const [seating, setSeating] = useState("Retro Booth");
  const [requests, setRequests] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  const { showToast } = useToast();
  const { playCoin, playPop, playClick } = useRetroSound();

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !email || !date) return;
    setSubmitting(true);
    try {
      const res = await api.createReservation({
        name,
        phone,
        email,
        reservation_date: date,
        reservation_time: time,
        guests,
        seating_area: seating,
        special_requests: requests,
        concept_source: "Concept B — Retro Gen-Z",
      });
      if (res.success) {
        setConfirmed(true);
        playCoin();
        try {
          confetti({
            particleCount: 50,
            spread: 70,
            origin: { y: 0.6 },
            colors: ["#FFE15D", "#FF2A55", "#000000", "#FFFFFF"],
          });
        } catch {
          // ignore
        }
        showToast("BOOTH SECURED! ⚡", "success");
      }
    } catch {
      showToast("Unable to lock booth.", "error");
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

      {/* Header */}
      <ConceptBHeader />

      <section className="py-12 bg-[#FFE15D] border-b-4 border-black relative overflow-hidden">
        <div className="absolute inset-0 pattern-comic-halftone opacity-20 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 text-center space-y-3 relative z-10">
          <span className="px-4 py-1.5 bg-black text-[#FFE15D] text-xs font-retro-bold font-black uppercase tracking-wider inline-block rounded-xl border-2 border-black shadow-[3px_3px_0px_#FF2A55]">
            ⚡ SECURE THE SPOT &bull; VINYL BOOTHS
          </span>
          <h1 className="font-retro-bold font-black text-4xl sm:text-6xl uppercase tracking-tight text-black">
            BOOK YOUR VINYL BOOTH
          </h1>
          <p className="text-xs sm:text-sm font-bold text-stone-900 max-w-md mx-auto">
            Friday &amp; Saturday nights fill fast. Grab your booth in advance.
          </p>
        </div>
      </section>

      <section className="py-12 md:py-16 flex-1">
        <div className="max-w-4xl mx-auto px-6">
          {confirmed ? (
            <div className="p-8 sm:p-12 text-center bg-white rounded-3xl border-4 border-black shadow-[10px_10px_0px_#000] space-y-4">
              <CheckCircle2 className="w-14 h-14 text-[#48BB78] mx-auto stroke-[3]" />
              <h2 className="font-retro-bold font-black text-3xl sm:text-4xl text-black uppercase">
                YOU&apos;RE LOCKED IN! ⚡
              </h2>
              <p className="text-xs sm:text-sm font-bold text-stone-700 max-w-md mx-auto">
                We sent a text to {phone} and confirmation to {email}. See you on {date} at {time}!
              </p>
              <button
                onClick={() => setConfirmed(false)}
                className="px-6 py-3 rounded-2xl bg-[#FF2A55] text-white text-xs font-retro-bold font-black uppercase border-2 border-black shadow-[3px_3px_0px_#000]"
              >
                BOOK ANOTHER BOOTH
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
              <form onSubmit={handleBooking} className="bg-white p-6 sm:p-8 rounded-3xl border-4 border-black shadow-[8px_8px_0px_#000] space-y-4 text-xs font-retro-bold font-black">
                <div>
                  <label className="block mb-1">CREW LEAD FULL NAME *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Aadi Saxena"
                    className="w-full px-4 py-2.5 rounded-xl border-2 border-black bg-[#FFF9EC] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block mb-1">MOBILE NUMBER (FOR SMS TICKET) *</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full px-4 py-2.5 rounded-xl border-2 border-black bg-[#FFF9EC] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block mb-1">EMAIL ADDRESS *</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="aadi@example.com"
                    className="w-full px-4 py-2.5 rounded-xl border-2 border-black bg-[#FFF9EC] focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block mb-1">DATE *</label>
                    <input
                      type="date"
                      required
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl border-2 border-black bg-[#FFF9EC] focus:outline-none text-xs"
                    />
                  </div>

                  <div>
                    <label className="block mb-1">TIME *</label>
                    <select
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl border-2 border-black bg-[#FFF9EC] focus:outline-none text-xs"
                    >
                      <option value="01:00 PM">01:00 PM (Lunch)</option>
                      <option value="02:00 PM">02:00 PM (Lunch)</option>
                      <option value="07:00 PM">07:00 PM (Early Dinner)</option>
                      <option value="08:00 PM">08:00 PM (Prime Time)</option>
                      <option value="09:30 PM">09:30 PM (Late Slices)</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block mb-1">PARTY SIZE *</label>
                    <select
                      value={guests}
                      onChange={(e) => setGuests(Number(e.target.value))}
                      className="w-full px-3 py-2.5 rounded-xl border-2 border-black bg-[#FFF9EC] focus:outline-none text-xs"
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8].map((g) => (
                        <option key={g} value={g}>
                          {g} {g === 1 ? "PERSON" : "PEOPLE"}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block mb-1">ZONE</label>
                    <select
                      value={seating}
                      onChange={(e) => setSeating(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl border-2 border-black bg-[#FFF9EC] focus:outline-none text-xs"
                    >
                      <option value="Retro Booth">VINYL BOOTH ⚡</option>
                      <option value="High-Top Bar">BAR COUNTER</option>
                      <option value="Outdoor Deck">GARDEN DECK</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block mb-1">SPECIAL REQUESTS</label>
                  <textarea
                    rows={2}
                    value={requests}
                    onChange={(e) => setRequests(e.target.value)}
                    placeholder="Birthday, anniversary, high-chair needed..."
                    className="w-full px-3 py-2 rounded-xl border-2 border-black bg-[#FFF9EC] focus:outline-none text-xs font-normal"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-4 rounded-2xl bg-[#FF2A55] text-white border-[3px] border-black font-retro-bold font-black text-xs uppercase tracking-wider shadow-[4px_4px_0px_#000] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[6px_6px_0px_#000] disabled:opacity-50 transition"
                >
                  {submitting ? "SECURING BOOTH..." : "LOCK BOOTH IN NOW ★"}
                </button>
              </form>

              <div className="space-y-4">
                <div className="aspect-[4/3] rounded-3xl overflow-hidden border-4 border-black shadow-[6px_6px_0px_#000]">
                  <img src="/images/restaurant-interior.webp" alt="Retro Dining Vibe" className="w-full h-full object-cover" />
                </div>
                <div className="p-6 rounded-3xl bg-[#FFE15D] border-4 border-black shadow-[6px_6px_0px_#000] space-y-2 text-xs font-bold">
                  <h4 className="font-retro-bold font-black text-sm uppercase">BOOTH RULES:</h4>
                  <p>&bull; Booths held for 15 mins after scheduled time.</p>
                  <p>&bull; Free high-speed Wi-Fi and phone chargers at every table.</p>
                  <p>&bull; Walk-in counter spots available based on floor space.</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      <ConceptBFooter />
    </div>
  );
}

export default function ConceptBReservationsPage() {
  return (
    <RetroSoundProvider>
      <ConceptBReservationsContent />
    </RetroSoundProvider>
  );
}
