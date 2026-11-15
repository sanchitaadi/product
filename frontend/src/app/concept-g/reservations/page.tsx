"use client";

import React, { useState } from "react";
import { Star, Ticket, Clock, Users, Calendar, CheckCircle2, MapPin } from "lucide-react";
import ConceptGHeader from "@/components/concept-g/Header";
import ConceptGFooter from "@/components/concept-g/Footer";
import { useToast } from "@/context/ToastContext";
import * as api from "@/lib/api";

export default function ConceptGReservationsPage() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [time, setTime] = useState("07:30 PM");
  const [guests, setGuests] = useState(2);
  const [seating, setSeating] = useState("Center Ring Royal Booth (Box 01)");
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
        concept_source: "Concept G - Circus Social",
      });
      if (res.success) {
        setConfirmed(true);
        showToast("Ringside table pass confirmed! Welcome to the show!", "success");
      } else {
        showToast(res.error || "Reservation request failed", "error");
      }
    } catch {
      showToast("Unable to process ticket booth reservation.", "error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-[#FFFDD0] min-h-screen text-[#5C0614] flex flex-col font-sans selection:bg-[#FFD54F] selection:text-[#5C0614]">
      <ConceptGHeader />

      {/* Header Banner */}
      <section className="bg-[#FFFDF5] py-16 border-b-6 border-[#C41E3A] text-center space-y-4 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#FFD54F] text-[#5C0614] font-black text-xs uppercase tracking-widest rounded-full border-2 border-[#5C0614] shadow-[3px_3px_0px_#C41E3A]">
            <Ticket className="w-3.5 h-3.5" />
            TICKET BOOTH &bull; RINGSIDE RESERVED ADMISSION
          </div>
          <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-[#5C0614] font-serif">
            Book Your Ringside Table
          </h1>
          <p className="text-xs sm:text-sm text-[#5C0614]/80 font-medium max-w-lg mx-auto">
            Reserve your personal box or carousel booth beneath the glowing marquee lights. Priority seating and complimentary carnival popcorn included.
          </p>
        </div>
      </section>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-16 flex-1 w-full">
        {confirmed ? (
          <div className="bg-white border-6 border-[#C41E3A] rounded-3xl p-8 sm:p-14 text-center space-y-6 shadow-[12px_12px_0px_#5C0614] max-w-2xl mx-auto">
            <div className="w-20 h-20 bg-[#FFD54F] border-3 border-[#5C0614] rounded-full text-[#5C0614] flex items-center justify-center mx-auto text-3xl font-black shadow-md">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-black uppercase tracking-widest text-[#C41E3A] block font-mono">
                BOX ASSIGNED &bull; GOLDEN TICKET SEALED
              </span>
              <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-[#5C0614] font-serif">
                Welcome to the Show, {name}!
              </h2>
              <p className="text-xs sm:text-sm text-[#5C0614]/80 font-medium max-w-md mx-auto">
                Your ringside table has been reserved at our Connaught Place big top. Present your digital ticket pass at the velvet curtain entrance.
              </p>
            </div>

            {/* Golden Ticket View */}
            <div className="p-6 bg-[#FFFDD0] border-3 border-[#5C0614] rounded-2xl text-left font-mono text-xs space-y-3 shadow-sm">
              <div className="flex justify-between border-b border-[#5C0614]/20 pb-2">
                <span className="text-[#5C0614]/70 font-bold">BOX SELECTION:</span>
                <span className="text-[#5C0614] font-black">{seating}</span>
              </div>
              <div className="flex justify-between border-b border-[#5C0614]/20 pb-2">
                <span className="text-[#5C0614]/70 font-bold">CURTAIN TIME:</span>
                <span className="text-[#5C0614] font-black">{date} &bull; {time}</span>
              </div>
              <div className="flex justify-between border-b border-[#5C0614]/20 pb-2">
                <span className="text-[#5C0614]/70 font-bold">SPECTATORS:</span>
                <span className="text-[#5C0614] font-black">{guests} Guest{guests > 1 ? "s" : ""}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#5C0614]/70 font-bold">ADMISSION:</span>
                <span className="text-[#22C55E] font-black">CONFIRMED (SEAT HELD)</span>
              </div>
            </div>

            <button
              onClick={() => setConfirmed(false)}
              className="inline-block bg-[#C41E3A] hover:bg-[#a3162c] text-white text-xs font-black uppercase tracking-widest px-8 py-3.5 rounded-full border-2 border-[#FFD54F] shadow-[4px_4px_0px_#5C0614] transition-transform active:scale-95"
            >
              Book Another Box &rarr;
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Form */}
            <div className="lg:col-span-7 bg-white border-4 border-[#C41E3A] rounded-3xl p-8 sm:p-10 shadow-[8px_8px_0px_#5C0614]">
              <div className="flex items-center gap-2 mb-6 pb-4 border-b-2 border-[#5C0614]/20">
                <Ticket className="w-5 h-5 text-[#C41E3A]" />
                <h2 className="text-xl font-black uppercase tracking-wider text-[#5C0614] font-serif">
                  Golden Ticket Booking
                </h2>
              </div>

              <form onSubmit={handleBooking} className="space-y-5 text-xs font-bold">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[#5C0614] uppercase mb-1">
                      Spectator Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Lady Clara Sterling"
                      className="w-full bg-[#FFFDD0] border-2 border-[#5C0614] focus:border-[#C41E3A] rounded-xl p-3 text-[#5C0614] outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[#5C0614] uppercase mb-1">
                      Contact Line / Mobile *
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      className="w-full bg-[#FFFDD0] border-2 border-[#5C0614] focus:border-[#C41E3A] rounded-xl p-3 text-[#5C0614] outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[#5C0614] uppercase mb-1">
                    Electronic Mail *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="spectator@circussocial.org"
                    className="w-full bg-[#FFFDD0] border-2 border-[#5C0614] focus:border-[#C41E3A] rounded-xl p-3 text-[#5C0614] outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-[#5C0614] uppercase mb-1">
                      Show Date *
                    </label>
                    <input
                      type="date"
                      required
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full bg-[#FFFDD0] border-2 border-[#5C0614] focus:border-[#C41E3A] rounded-xl p-3 text-[#5C0614] outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[#5C0614] uppercase mb-1">
                      Curtain Time *
                    </label>
                    <select
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      className="w-full bg-[#FFFDD0] border-2 border-[#5C0614] focus:border-[#C41E3A] rounded-xl p-3 text-[#5C0614] outline-none"
                    >
                      {["12:30 PM", "01:30 PM", "02:30 PM", "07:00 PM", "07:30 PM", "08:30 PM", "09:30 PM"].map((t) => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[#5C0614] uppercase mb-1">
                      Spectators (Seats) *
                    </label>
                    <input
                      type="number"
                      min={1}
                      max={12}
                      required
                      value={guests}
                      onChange={(e) => setGuests(parseInt(e.target.value) || 1)}
                      className="w-full bg-[#FFFDD0] border-2 border-[#5C0614] focus:border-[#C41E3A] rounded-xl p-3 text-[#5C0614] outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[#5C0614] uppercase mb-1">
                    Midway Box Selection
                  </label>
                  <select
                    value={seating}
                    onChange={(e) => setSeating(e.target.value)}
                    className="w-full bg-[#FFFDD0] border-2 border-[#5C0614] focus:border-[#C41E3A] rounded-xl p-3 text-[#5C0614] outline-none"
                  >
                    <option value="Center Ring Royal Booth (Box 01)">
                      Center Ring Royal Booth (Box 01) &bull; Prime Marquee View
                    </option>
                    <option value="Carousel Tiered Table (Box 02)">
                      Carousel Tiered Table (Box 02) &bull; Kinetic Light Show
                    </option>
                    <option value="Acrobat Observation Terrace (Box 03)">
                      Acrobat Observation Terrace (Box 03) &bull; Open Kitchen View
                    </option>
                    <option value="Midway Courtyard Lantern Veranda (Box 04)">
                      Midway Courtyard Lantern Veranda (Box 04) &bull; Al Fresco Dining
                    </option>
                  </select>
                </div>

                <div>
                  <label className="block text-[#5C0614] uppercase mb-1">
                    Special Requests (Anniversaries / Dietary Restrictions)
                  </label>
                  <textarea
                    rows={3}
                    value={requests}
                    onChange={(e) => setRequests(e.target.value)}
                    placeholder="Celebrating birthday, need high chair, wheat-free pasta..."
                    className="w-full bg-[#FFFDD0] border-2 border-[#5C0614] focus:border-[#C41E3A] rounded-xl p-3 text-[#5C0614] outline-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-[#C41E3A] hover:bg-[#a3162c] text-white font-black uppercase text-xs tracking-widest py-4 rounded-full border-2 border-[#FFD54F] shadow-[4px_4px_0px_#5C0614] transition-all disabled:opacity-50"
                >
                  {submitting ? "SEALING GOLDEN TICKET..." : "CONFIRM RINGSIDE TABLE TICKET &rarr;"}
                </button>
              </form>
            </div>

            {/* Sidebar Guidelines */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-[#FFFDF5] border-4 border-[#C41E3A] rounded-3xl p-6 sm:p-8 space-y-4 shadow-[6px_6px_0px_#5C0614]">
                <span className="px-3 py-1 bg-[#FFD54F] text-[#5C0614] font-mono text-[10px] font-black uppercase rounded-full border border-[#5C0614]">
                  SHOWROOM POLICIES
                </span>
                <h3 className="text-xl font-black uppercase tracking-tight text-[#5C0614] font-serif">
                  Big Top Rules
                </h3>
                <ul className="space-y-3 text-xs text-[#5C0614]/85 font-bold">
                  <li className="flex items-start gap-2">
                    <span className="text-[#C41E3A]">&bull;</span>
                    <span>Reserved tables held up to 15 minutes past scheduled curtain call.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#C41E3A]">&bull;</span>
                    <span>All ringside admissions include complimentary circus popcorn &amp; flavored sodas.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#C41E3A]">&bull;</span>
                    <span>For entire big top private tent charters (up to 80 guests), contact Guest Relations.</span>
                  </li>
                </ul>
              </div>

              <div className="bg-[#5C0614] text-white rounded-3xl p-6 border-2 border-[#FFD54F] shadow-md space-y-2">
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-[#FFD54F]" />
                  <div>
                    <h4 className="text-sm font-black uppercase text-[#FFD54F]">Flagship Tent</h4>
                    <p className="text-xs text-[#FFFDD0]/80 font-mono">Connaught Circus Outer Circle, New Delhi</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <ConceptGFooter />
    </div>
  );
}
