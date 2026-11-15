"use client";

import React, { useState } from "react";
import { CheckCircle2, Leaf, Clock, Users, Calendar } from "lucide-react";
import ConceptDHeader from "@/components/concept-d/Header";
import ConceptDFooter from "@/components/concept-d/Footer";
import { useToast } from "@/context/ToastContext";
import * as api from "@/lib/api";

export default function ConceptDReservationsPage() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [time, setTime] = useState("07:30 PM");
  const [guests, setGuests] = useState(2);
  const [seating, setSeating] = useState("Greenhouse Glasshouse");
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
        concept_source: "Concept D - Organic Earth",
      });
      if (res.success) {
        setConfirmed(true);
        showToast("Conservatory table confirmed.", "success");
      } else {
        showToast(res.error || "Reservation failed", "error");
      }
    } catch {
      showToast("Unable to process table request.", "error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-[#FDFBF7] min-h-screen text-[#1E3F20] flex flex-col font-serif selection:bg-[#7B8E78] selection:text-white">
      <ConceptDHeader />

      {/* Banner */}
      <section className="bg-[#F2EFE9] py-16 border-b border-[#5E6B4E]/20 text-center space-y-3">
        <span className="text-[11px] uppercase tracking-widest text-[#7B8E78] block">
          Table Hospitality
        </span>
        <h1 className="text-4xl sm:text-6xl font-normal text-[#1E3F20] tracking-tight">
          Reserve a Conservatory Table
        </h1>
        <p className="text-xs sm:text-sm text-[#5E6B4E] max-w-md mx-auto font-light leading-relaxed">
          Join us among living botanicals, soft acoustic folk tunes, and seasonal degustations.
        </p>
      </section>

      {/* Booking Form Card */}
      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-16 flex-1 w-full">
        <div className="bg-white rounded-3xl border border-[#5E6B4E]/25 p-8 sm:p-12 shadow-xl space-y-8">
          {confirmed ? (
            <div className="py-12 text-center space-y-4">
              <span className="text-5xl block">🌿</span>
              <h2 className="text-2xl font-normal text-[#1E3F20]">
                We Look Forward to Welcoming You
              </h2>
              <p className="text-xs text-[#5E6B4E] max-w-md mx-auto leading-relaxed">
                Your reservation for {guests} guests on {date} at {time} in the {seating} has been logged. An email dispatch has been sent.
              </p>
              <button
                onClick={() => setConfirmed(false)}
                className="mt-4 bg-[#5E6B4E] hover:bg-[#4E5B3F] text-white text-xs font-sans uppercase tracking-widest px-6 py-3 rounded-full transition-colors"
              >
                Reserve Another Date
              </button>
            </div>
          ) : (
            <form onSubmit={handleBooking} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#5E6B4E] mb-1">
                    Patron Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Robin Harford"
                    className="w-full bg-[#FDFBF7] border border-[#5E6B4E]/30 rounded-xl p-3 text-xs focus:border-[#5E6B4E] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#5E6B4E] mb-1">
                    Contact Phone *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full bg-[#FDFBF7] border border-[#5E6B4E]/30 rounded-xl p-3 text-xs focus:border-[#5E6B4E] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#5E6B4E] mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="robin@foraging.com"
                    className="w-full bg-[#FDFBF7] border border-[#5E6B4E]/30 rounded-xl p-3 text-xs focus:border-[#5E6B4E] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#5E6B4E] mb-1">
                    Reservation Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full bg-[#FDFBF7] border border-[#5E6B4E]/30 rounded-xl p-3 text-xs focus:border-[#5E6B4E] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#5E6B4E] mb-1">
                    Seating Time *
                  </label>
                  <select
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full bg-[#FDFBF7] border border-[#5E6B4E]/30 rounded-xl p-3 text-xs focus:border-[#5E6B4E] outline-none"
                  >
                    {[
                      "12:00 PM",
                      "01:00 PM",
                      "02:00 PM",
                      "07:00 PM",
                      "07:30 PM",
                      "08:30 PM",
                      "09:30 PM",
                    ].map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#5E6B4E] mb-1">
                    Party Size *
                  </label>
                  <select
                    value={guests}
                    onChange={(e) => setGuests(Number(e.target.value))}
                    className="w-full bg-[#FDFBF7] border border-[#5E6B4E]/30 rounded-xl p-3 text-xs focus:border-[#5E6B4E] outline-none"
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
                <label className="block text-xs uppercase tracking-wider text-[#5E6B4E] mb-1">
                  Seating Area
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {["Greenhouse Glasshouse", "Courtyard Olive Grove", "Artisan Hearth"].map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setSeating(s)}
                      className={`p-3 text-xs rounded-xl border transition-all ${
                        seating === s
                          ? "bg-[#5E6B4E] text-[#FDFBF7] border-[#5E6B4E]"
                          : "bg-[#FDFBF7] text-[#1E3F20] border-[#5E6B4E]/25 hover:border-[#5E6B4E]"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-[#5E6B4E] mb-1">
                  Special Notes or Dietary Preferences
                </label>
                <textarea
                  rows={3}
                  value={requests}
                  onChange={(e) => setRequests(e.target.value)}
                  placeholder="Gluten sensitivity, quiet table, anniversary celebration..."
                  className="w-full bg-[#FDFBF7] border border-[#5E6B4E]/30 rounded-xl p-3 text-xs focus:border-[#5E6B4E] outline-none"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-[#5E6B4E] hover:bg-[#4E5B3F] text-[#FDFBF7] text-xs font-sans uppercase tracking-widest py-4 rounded-full transition-all shadow-md"
              >
                {submitting ? "Booking..." : "Confirm Table Reservation &rarr;"}
              </button>
            </form>
          )}
        </div>
      </main>

      <ConceptDFooter />
    </div>
  );
}
