"use client";

import React, { useState } from "react";
import { Train, Clock, Users, Calendar, CheckCircle2, Ticket, ShieldCheck, MapPin } from "lucide-react";
import ConceptEHeader from "@/components/concept-e/Header";
import ConceptEFooter from "@/components/concept-e/Footer";
import { useToast } from "@/context/ToastContext";
import * as api from "@/lib/api";

export default function ConceptEReservationsPage() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [time, setTime] = useState("07:30 PM");
  const [guests, setGuests] = useState(2);
  const [seating, setSeating] = useState("First-Class Dining Car (Carriage A)");
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
        concept_source: "Concept E - Metro Bites",
      });
      if (res.success) {
        setConfirmed(true);
        showToast("First-Class Boarding Pass reserved successfully!", "success");
      } else {
        showToast(res.error || "Reservation request failed", "error");
      }
    } catch {
      showToast("Unable to process transit reservation.", "error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-[#08142C] min-h-screen text-[#F8F6F0] flex flex-col font-sans selection:bg-[#FFD100] selection:text-[#08142C]">
      <ConceptEHeader />

      {/* Station Signboard Banner */}
      <section className="bg-[#050D1C] py-16 border-b-4 border-[#FFD100] relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#FFD100] text-[#08142C] font-mono text-xs font-black uppercase tracking-widest rounded">
            <Ticket className="w-3.5 h-3.5 text-[#D71920]" />
            CONCOURSE TICKETING &bull; FIRST-CLASS CARRIAGE
          </div>
          <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-[#F8F6F0]">
            Carriage Reservations
          </h1>
          <p className="text-sm sm:text-base text-[#94A3B8] max-w-xl mx-auto font-mono">
            Secure reserved seating in our vintage dining saloon or platform observation deck. Priority boarding guaranteed.
          </p>
        </div>
      </section>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-16 flex-1 w-full">
        {confirmed ? (
          <div className="bg-[#0D1F42] border-4 border-[#FFD100] rounded-2xl p-8 sm:p-14 text-center space-y-6 shadow-[10px_10px_0px_#D71920] max-w-2xl mx-auto">
            <div className="w-20 h-20 rounded-full bg-[#FFD100] text-[#08142C] flex items-center justify-center mx-auto text-3xl font-black">
              <CheckCircle2 className="w-10 h-10 text-[#08142C]" />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#FFD100] block">
                BOARDING PASS ISSUED &bull; SEAT RESERVED
              </span>
              <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-[#F8F6F0]">
                Welcome Aboard, {name}
              </h2>
              <p className="text-sm text-[#94A3B8] font-mono leading-relaxed">
                Your first-class dining compartment has been logged on Platform 01. Present this digital transit confirmation upon arrival.
              </p>
            </div>

            {/* Boarding Pass Ticket View */}
            <div className="p-6 bg-[#08142C] rounded-xl border-2 border-dashed border-[#FFD100] text-left font-mono text-xs space-y-3">
              <div className="flex justify-between border-b border-[#334155] pb-2 text-[#94A3B8]">
                <span>CARRIAGE SELECTION:</span>
                <span className="text-[#FFD100] font-bold">{seating}</span>
              </div>
              <div className="flex justify-between border-b border-[#334155] pb-2 text-[#94A3B8]">
                <span>DATE &amp; DEPARTURE TIME:</span>
                <span className="text-white font-bold">{date} &bull; {time}</span>
              </div>
              <div className="flex justify-between border-b border-[#334155] pb-2 text-[#94A3B8]">
                <span>PASSENGER COUNT:</span>
                <span className="text-white font-bold">{guests} Passenger{guests > 1 ? "s" : ""}</span>
              </div>
              <div className="flex justify-between text-[#94A3B8]">
                <span>TRANSIT STATUS:</span>
                <span className="text-[#4ADE80] font-bold">CONFIRMED (ON TIME)</span>
              </div>
            </div>

            <button
              onClick={() => setConfirmed(false)}
              className="inline-block bg-[#D71920] hover:bg-[#b01318] text-white text-xs font-mono font-black uppercase tracking-widest px-8 py-3.5 rounded border-2 border-[#FFD100] shadow-[4px_4px_0px_#FFD100] transition-transform active:translate-x-1 active:translate-y-1"
            >
              Reserve Another Carriage &rarr;
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Form */}
            <div className="lg:col-span-7 bg-[#0D1F42] border-2 border-[#334155] rounded-2xl p-8 sm:p-10 shadow-xl">
              <div className="flex items-center gap-2 mb-6 pb-4 border-b border-[#334155]">
                <Train className="w-5 h-5 text-[#FFD100]" />
                <h2 className="text-xl font-black uppercase tracking-wider text-[#F8F6F0]">
                  Passenger Booking Pass
                </h2>
              </div>

              <form onSubmit={handleBooking} className="space-y-5 font-mono text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[#94A3B8] font-bold uppercase mb-2">
                      Passenger Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Captain Rajiv Verma"
                      className="w-full bg-[#08142C] border-2 border-[#334155] focus:border-[#FFD100] rounded p-3 text-white outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[#94A3B8] font-bold uppercase mb-2">
                      Contact Line / Mobile *
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      className="w-full bg-[#08142C] border-2 border-[#334155] focus:border-[#FFD100] rounded p-3 text-white outline-none transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[#94A3B8] font-bold uppercase mb-2">
                    Official Transit Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="passenger@railwayexpress.com"
                    className="w-full bg-[#08142C] border-2 border-[#334155] focus:border-[#FFD100] rounded p-3 text-white outline-none transition-colors"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-[#94A3B8] font-bold uppercase mb-2">
                      Travel Date *
                    </label>
                    <input
                      type="date"
                      required
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full bg-[#08142C] border-2 border-[#334155] focus:border-[#FFD100] rounded p-3 text-white outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[#94A3B8] font-bold uppercase mb-2">
                      Departure Time *
                    </label>
                    <select
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      className="w-full bg-[#08142C] border-2 border-[#334155] focus:border-[#FFD100] rounded p-3 text-white outline-none transition-colors"
                    >
                      {["12:00 PM", "01:00 PM", "02:00 PM", "07:00 PM", "07:30 PM", "08:00 PM", "09:00 PM", "10:00 PM"].map((t) => (
                        <option key={t} value={t} className="bg-[#08142C]">{t}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[#94A3B8] font-bold uppercase mb-2">
                      Passengers *
                    </label>
                    <input
                      type="number"
                      min={1}
                      max={12}
                      required
                      value={guests}
                      onChange={(e) => setGuests(parseInt(e.target.value) || 1)}
                      className="w-full bg-[#08142C] border-2 border-[#334155] focus:border-[#FFD100] rounded p-3 text-white outline-none transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[#94A3B8] font-bold uppercase mb-2">
                    Carriage / Compartment Selection
                  </label>
                  <select
                    value={seating}
                    onChange={(e) => setSeating(e.target.value)}
                    className="w-full bg-[#08142C] border-2 border-[#334155] focus:border-[#FFD100] rounded p-3 text-white outline-none transition-colors"
                  >
                    <option value="First-Class Dining Car (Carriage A)" className="bg-[#08142C]">
                      First-Class Dining Car (Carriage A) &bull; Velvet Booths
                    </option>
                    <option value="Platform Observation Deck (Carriage B)" className="bg-[#08142C]">
                      Platform Observation Deck (Carriage B) &bull; Trackside Views
                    </option>
                    <option value="Locomotive Boiler Saloon (Carriage C)" className="bg-[#08142C]">
                      Locomotive Boiler Saloon (Carriage C) &bull; Hearth Kitchen View
                    </option>
                    <option value="Express Concourse Counter (Carriage D)" className="bg-[#08142C]">
                      Express Concourse Counter (Carriage D) &bull; Fast-Casual Rail
                    </option>
                  </select>
                </div>

                <div>
                  <label className="block text-[#94A3B8] font-bold uppercase mb-2">
                    Dietary Requirements or Luggage Notes
                  </label>
                  <textarea
                    rows={3}
                    value={requests}
                    onChange={(e) => setRequests(e.target.value)}
                    placeholder="Special requests, anniversary celebration, wheat-free pasta..."
                    className="w-full bg-[#08142C] border-2 border-[#334155] focus:border-[#FFD100] rounded p-3 text-white outline-none transition-colors"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-[#D71920] hover:bg-[#b01318] text-white text-xs font-mono font-black uppercase tracking-widest py-4 rounded border-2 border-[#FFD100] shadow-[5px_5px_0px_#FFD100] transition-all disabled:opacity-50"
                >
                  {submitting ? "ISSUING BOARDING PASS..." : "CONFIRM FIRST-CLASS SEAT RESERVATION &rarr;"}
                </button>
              </form>
            </div>

            {/* Sidebar Information Board */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-[#050D1C] border-2 border-[#334155] rounded-2xl p-6 sm:p-8 space-y-4">
                <span className="px-3 py-1 bg-[#FFD100] text-[#08142C] font-mono text-[10px] font-black rounded uppercase">
                  TIMETABLE &bull; CARRIAGE POLICIES
                </span>
                <h3 className="text-xl font-black uppercase tracking-tight text-[#F8F6F0]">
                  Station Guidelines
                </h3>
                <ul className="space-y-3 text-xs text-[#94A3B8] font-mono">
                  <li className="flex items-start gap-2">
                    <span className="text-[#FFD100] font-black">&bull;</span>
                    <span>Reservations held up to 15 minutes past departure whistle.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#FFD100] font-black">&bull;</span>
                    <span>First-Class carriages include complimentary sparkling water and chef amuse-bouche.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#FFD100] font-black">&bull;</span>
                    <span>For private train charters exceeding 12 passengers, contact Concourse Dispatch.</span>
                  </li>
                </ul>
              </div>

              <div className="bg-[#0D1F42] border-2 border-[#FFD100] rounded-2xl p-6 space-y-3">
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-[#FFD100]" />
                  <div>
                    <h4 className="text-sm font-black uppercase text-white">Central Concourse Terminal</h4>
                    <p className="text-xs text-[#94A3B8] font-mono">Platform 01, Inner Circle, Connaught Place</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <ConceptEFooter />
    </div>
  );
}
