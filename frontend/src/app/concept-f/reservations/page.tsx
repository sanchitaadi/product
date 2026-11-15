"use client";

import React, { useState } from "react";
import { Zap, Clock, Users, Calendar, CheckCircle2, ShieldCheck, MapPin } from "lucide-react";
import ConceptFHeader from "@/components/concept-f/Header";
import ConceptFFooter from "@/components/concept-f/Footer";
import { useToast } from "@/context/ToastContext";
import * as api from "@/lib/api";

export default function ConceptFReservationsPage() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [time, setTime] = useState("07:30 PM");
  const [guests, setGuests] = useState(2);
  const [seating, setSeating] = useState("Shonen Action Booth (Booth 01)");
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
        concept_source: "Concept F - Manga Bites",
      });
      if (res.success) {
        setConfirmed(true);
        showToast("Manga booth reserved successfully! いただきます", "success");
      } else {
        showToast(res.error || "Reservation request failed", "error");
      }
    } catch {
      showToast("Unable to process comic booth reservation.", "error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-[#FFFDF7] min-h-screen text-black flex flex-col font-sans selection:bg-[#FFE600] selection:text-black">
      <ConceptFHeader />

      {/* Manga Header Banner */}
      <section className="bg-white py-16 border-b-4 border-black text-center space-y-4 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-10 [background:repeating-conic-gradient(#000_0_2deg,transparent_2deg_10deg)]" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#FFE600] text-black font-black text-xs uppercase tracking-widest border-2 border-black shadow-[3px_3px_0px_#000] -rotate-1">
            <Zap className="w-3.5 h-3.5 text-[#D7263D] fill-[#D7263D]" />
            BOOTH INK &bull; TABLE RESERVATIONS
          </div>
          <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-black">
            Book Your Comic Booth
          </h1>
          <p className="text-xs sm:text-sm text-gray-700 font-bold max-w-lg mx-auto">
            Reserve private dining booths surrounded by hand-drawn manga murals, ambient anime lighting, and wood-fired table service.
          </p>
        </div>
      </section>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-16 flex-1 w-full">
        {confirmed ? (
          <div className="bg-white border-4 border-black p-8 sm:p-14 text-center space-y-6 shadow-[12px_12px_0px_#D7263D] max-w-2xl mx-auto">
            <div className="w-20 h-20 bg-[#FFE600] border-3 border-black text-black flex items-center justify-center mx-auto text-3xl font-black shadow-[4px_4px_0px_#000]">
              <CheckCircle2 className="w-10 h-10 text-black" />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-black uppercase tracking-widest text-[#D7263D] block font-mono">
                BOOTH ASSIGNED &bull; RESERVATION CONFIRMED
              </span>
              <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-black">
                You&apos;re In, {name}!
              </h2>
              <p className="text-xs sm:text-sm text-gray-700 font-bold max-w-md mx-auto">
                Your comic dining booth has been logged in our studio records. Present this confirmation upon entry.
              </p>
            </div>

            {/* Comic Confirmation Certificate */}
            <div className="p-6 bg-[#FFFDF7] border-3 border-black text-left font-mono text-xs space-y-3 shadow-[4px_4px_0px_#000]">
              <div className="flex justify-between border-b border-black/20 pb-2">
                <span className="text-gray-500 font-bold">BOOTH LOCATION:</span>
                <span className="text-black font-black">{seating}</span>
              </div>
              <div className="flex justify-between border-b border-black/20 pb-2">
                <span className="text-gray-500 font-bold">DATE &amp; ARRIVAL:</span>
                <span className="text-black font-black">{date} &bull; {time}</span>
              </div>
              <div className="flex justify-between border-b border-black/20 pb-2">
                <span className="text-gray-500 font-bold">GUESTS LOGGED:</span>
                <span className="text-black font-black">{guests} Dining Hero{guests > 1 ? "es" : ""}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 font-bold">STATUS:</span>
                <span className="text-[#22C55E] font-black">CONFIRMED (TABLE HELD)</span>
              </div>
            </div>

            <button
              onClick={() => setConfirmed(false)}
              className="inline-block bg-[#D7263D] hover:bg-[#b51f33] text-white text-xs font-black uppercase tracking-widest px-8 py-3.5 border-3 border-black shadow-[4px_4px_0px_#000] transition-transform active:translate-x-1 active:translate-y-1"
            >
              Book Another Table &rarr;
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Form */}
            <div className="lg:col-span-7 bg-white border-4 border-black p-8 sm:p-10 shadow-[8px_8px_0px_#000]">
              <div className="flex items-center gap-2 mb-6 pb-4 border-b-3 border-black">
                <Zap className="w-5 h-5 text-[#D7263D]" />
                <h2 className="text-xl font-black uppercase tracking-wider text-black">
                  Table Ink Booking Pass
                </h2>
              </div>

              <form onSubmit={handleBooking} className="space-y-5 text-xs font-bold">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-black uppercase mb-1">
                      Guest / Hero Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Kenji Tanaka"
                      className="w-full bg-[#FFFDF7] border-2 border-black focus:border-[#D7263D] rounded p-3 text-black outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-black uppercase mb-1">
                      Mobile Line *
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      className="w-full bg-[#FFFDF7] border-2 border-black focus:border-[#D7263D] rounded p-3 text-black outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-black uppercase mb-1">
                    Official Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="hero@mangabites.org"
                    className="w-full bg-[#FFFDF7] border-2 border-black focus:border-[#D7263D] rounded p-3 text-black outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-black uppercase mb-1">
                      Date *
                    </label>
                    <input
                      type="date"
                      required
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full bg-[#FFFDF7] border-2 border-black focus:border-[#D7263D] rounded p-3 text-black outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-black uppercase mb-1">
                      Time Slot *
                    </label>
                    <select
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      className="w-full bg-[#FFFDF7] border-2 border-black focus:border-[#D7263D] rounded p-3 text-black outline-none"
                    >
                      {["12:30 PM", "01:30 PM", "02:30 PM", "07:00 PM", "07:30 PM", "08:30 PM", "09:30 PM"].map((t) => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-black uppercase mb-1">
                      Heroes (Seats) *
                    </label>
                    <input
                      type="number"
                      min={1}
                      max={12}
                      required
                      value={guests}
                      onChange={(e) => setGuests(parseInt(e.target.value) || 1)}
                      className="w-full bg-[#FFFDF7] border-2 border-black focus:border-[#D7263D] rounded p-3 text-black outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-black uppercase mb-1">
                    Booth Atmosphere Selection
                  </label>
                  <select
                    value={seating}
                    onChange={(e) => setSeating(e.target.value)}
                    className="w-full bg-[#FFFDF7] border-2 border-black focus:border-[#D7263D] rounded p-3 text-black outline-none"
                  >
                    <option value="Shonen Action Booth (Booth 01)">
                      Shonen Action Booth (Booth 01) &bull; Bold Murals &amp; Sound FX
                    </option>
                    <option value="Manga Studio Drawing Table (Booth 02)">
                      Manga Studio Drawing Table (Booth 02) &bull; Open Kitchen View
                    </option>
                    <option value="Neon Akihabara Saloon (Booth 03)">
                      Neon Akihabara Saloon (Booth 03) &bull; Cyberpunk Ambient Neon
                    </option>
                    <option value="Courtyard Lantern Veranda (Booth 04)">
                      Courtyard Lantern Veranda (Booth 04) &bull; Al Fresco Dining
                    </option>
                  </select>
                </div>

                <div>
                  <label className="block text-black uppercase mb-1">
                    Special Inking Instructions (Dietary / Celebrations)
                  </label>
                  <textarea
                    rows={3}
                    value={requests}
                    onChange={(e) => setRequests(e.target.value)}
                    placeholder="Birthday shout-out, extra spicy chili crunch, gluten-friendly pasta..."
                    className="w-full bg-[#FFFDF7] border-2 border-black focus:border-[#D7263D] rounded p-3 text-black outline-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-[#D7263D] hover:bg-[#b51f33] text-white font-black uppercase text-xs tracking-widest py-4 border-3 border-black shadow-[5px_5px_0px_#FFE600] transition-all disabled:opacity-50"
                >
                  {submitting ? "SEALING COMIC BOOTH..." : "CONFIRM BOOTH RESERVATION &rarr;"}
                </button>
              </form>
            </div>

            {/* Sidebar Guidelines */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-[#FFFDF7] border-4 border-black p-6 sm:p-8 space-y-4 shadow-[6px_6px_0px_#000]">
                <span className="px-3 py-1 bg-[#FFE600] text-black font-mono text-[10px] font-black uppercase border border-black">
                  STUDIO POLICIES
                </span>
                <h3 className="text-xl font-black uppercase tracking-tight text-black">
                  Booth Etiquette
                </h3>
                <ul className="space-y-3 text-xs text-gray-700 font-bold">
                  <li className="flex items-start gap-2">
                    <span className="text-[#D7263D]">&bull;</span>
                    <span>Reserved booths held up to 15 minutes past scheduled time.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#D7263D]">&bull;</span>
                    <span>Complimentary manga sketchpads and felt-tip markers provided at every table.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#D7263D]">&bull;</span>
                    <span>For parties greater than 8, please give our dispatch desk 24-hour advance notice.</span>
                  </li>
                </ul>
              </div>

              <div className="bg-black text-white border-3 border-black p-6 shadow-[6px_6px_0px_#FFE600] space-y-2">
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-[#FFE600]" />
                  <div>
                    <h4 className="text-sm font-black uppercase text-[#FFE600]">Studio Location</h4>
                    <p className="text-xs text-gray-300 font-mono">Radial 3, Inner Circle, Connaught Place, New Delhi</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <ConceptFFooter />
    </div>
  );
}
