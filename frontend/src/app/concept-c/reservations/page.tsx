"use client";

import React, { useState } from "react";
import { CheckCircle2, Zap, Clock, Users, Calendar } from "lucide-react";
import ConceptCHeader from "@/components/concept-c/Header";
import ConceptCFooter from "@/components/concept-c/Footer";
import { useToast } from "@/context/ToastContext";
import * as api from "@/lib/api";

export default function ConceptCReservationsPage() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [time, setTime] = useState("08:00 PM");
  const [guests, setGuests] = useState(2);
  const [seating, setSeating] = useState("Pop Neon Booth");
  const [requests, setRequests] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  const { showToast } = useToast();

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
        concept_source: "Concept C - Maximalist Pop Art",
      });
      if (res.success) {
        setConfirmed(true);
        showToast("Pop Art Booth reserved successfully!", "success");
      } else {
        showToast(res.error || "Reservation failed", "error");
      }
    } catch {
      showToast("Network error reserving booth.", "error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-[#FFFDF7] min-h-screen text-[#111111] flex flex-col font-sans selection:bg-[#FFE600] selection:text-black">
      <ConceptCHeader />

      {/* Header Banner */}
      <section className="bg-[#FF007F] text-white py-16 border-b-4 border-black text-center space-y-3 relative overflow-hidden">
        <span className="bg-[#FFE600] text-black text-xs font-black uppercase px-3 py-1 border-2 border-black inline-block -rotate-2">
          ⚡ VIP BOOTH BOOKING ⚡
        </span>
        <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tight">
          LOCK IN YOUR POP BOOTH
        </h1>
        <p className="text-sm font-bold text-white/90 max-w-md mx-auto">
          Private booths, neon art installations, and curated tasting menus for you and your crew.
        </p>
      </section>

      {/* Main Reservation Box */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-16 flex-1 w-full">
        <div className="bg-white border-4 border-black p-8 sm:p-12 shadow-[10px_10px_0px_#0047FF]">
          {confirmed ? (
            <div className="text-center py-12 space-y-6">
              <div className="w-20 h-20 bg-[#FFE600] border-4 border-black rounded-full flex items-center justify-center mx-auto text-4xl shadow-[4px_4px_0px_#000]">
                🎉
              </div>
              <h2 className="text-3xl font-black uppercase">
                YOU&apos;RE ON THE POP VIP LIST!
              </h2>
              <p className="text-sm font-bold text-gray-700 max-w-md mx-auto">
                We have registered your reservation for {guests} guests on {date} at {time}. A confirmation SMS has been dispatched.
              </p>
              <button
                onClick={() => setConfirmed(false)}
                className="bg-[#0047FF] hover:bg-[#FF007F] text-white font-black uppercase text-xs px-6 py-3 border-2 border-black shadow-[3px_3px_0px_#000] transition-colors"
              >
                BOOK ANOTHER EXPERIENCE &rarr;
              </button>
            </div>
          ) : (
            <form onSubmit={handleBooking} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-black uppercase mb-1.5">
                    Lead Guest Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Keith Haring"
                    className="w-full bg-[#FFFDF7] border-3 border-black p-3 text-xs font-bold focus:bg-[#FFE600]/20 focus:outline-none shadow-[2px_2px_0px_#000]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-black uppercase mb-1.5">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full bg-[#FFFDF7] border-3 border-black p-3 text-xs font-bold focus:bg-[#FFE600]/20 focus:outline-none shadow-[2px_2px_0px_#000]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-black uppercase mb-1.5">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="keith@popart.com"
                    className="w-full bg-[#FFFDF7] border-3 border-black p-3 text-xs font-bold focus:bg-[#FFE600]/20 focus:outline-none shadow-[2px_2px_0px_#000]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-black uppercase mb-1.5">
                    Reservation Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full bg-[#FFFDF7] border-3 border-black p-3 text-xs font-bold focus:bg-[#FFE600]/20 focus:outline-none shadow-[2px_2px_0px_#000]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-black uppercase mb-1.5">
                    Time Slot *
                  </label>
                  <select
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full bg-[#FFFDF7] border-3 border-black p-3 text-xs font-bold focus:bg-[#FFE600]/20 focus:outline-none shadow-[2px_2px_0px_#000]"
                  >
                    {[
                      "12:00 PM",
                      "01:00 PM",
                      "02:00 PM",
                      "07:00 PM",
                      "08:00 PM",
                      "09:00 PM",
                      "10:00 PM",
                    ].map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-black uppercase mb-1.5">
                    Guest Count *
                  </label>
                  <select
                    value={guests}
                    onChange={(e) => setGuests(Number(e.target.value))}
                    className="w-full bg-[#FFFDF7] border-3 border-black p-3 text-xs font-bold focus:bg-[#FFE600]/20 focus:outline-none shadow-[2px_2px_0px_#000]"
                  >
                    {[1, 2, 3, 4, 5, 6, 8, 10, 12].map((g) => (
                      <option key={g} value={g}>
                        {g} {g === 1 ? "Guest" : "Guests"}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-black uppercase mb-1.5">
                  Seating Experience
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {["Pop Neon Booth", "Artist Loft", "Patio Lounge"].map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setSeating(s)}
                      className={`p-3 text-xs font-black uppercase border-3 border-black transition-all ${
                        seating === s
                          ? "bg-[#FFE600] text-black shadow-[3px_3px_0px_#000]"
                          : "bg-white text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-black uppercase mb-1.5">
                  Special Requests / Dietary Notes
                </label>
                <textarea
                  rows={3}
                  value={requests}
                  onChange={(e) => setRequests(e.target.value)}
                  placeholder="Birthday celebration, allergy notes, surprise cake..."
                  className="w-full bg-[#FFFDF7] border-3 border-black p-3 text-xs font-bold focus:bg-[#FFE600]/20 focus:outline-none shadow-[2px_2px_0px_#000]"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-[#FFE600] hover:bg-[#FF007F] hover:text-white text-black font-black uppercase text-sm py-4 border-4 border-black shadow-[6px_6px_0px_#000] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all"
              >
                {submitting ? "SECURING VIP SPOT..." : "CONFIRM BOOTH RESERVATION &rarr;"}
              </button>
            </form>
          )}
        </div>
      </main>

      <ConceptCFooter />
    </div>
  );
}
