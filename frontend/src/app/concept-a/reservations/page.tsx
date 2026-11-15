"use client";

import React, { useState } from "react";
import { Calendar, Clock, Users, MapPin, Sparkles, CheckCircle2 } from "lucide-react";
import ConceptAHeader from "@/components/concept-a/Header";
import ConceptAFooter from "@/components/concept-a/Footer";
import { useToast } from "@/context/ToastContext";
import * as api from "@/lib/api";

export default function ConceptAReservationsPage() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("07:30 PM");
  const [guests, setGuests] = useState(2);
  const [seating, setSeating] = useState("Indoor Conservatory");
  const [requests, setRequests] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [ticketId, setTicketId] = useState("");

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
        concept_source: "Concept A — Coquette Pinterest",
      });
      if (res.success) {
        setConfirmed(true);
        setTicketId(`RES-${Math.floor(1000 + Math.random() * 9000)}`);
        showToast("Table reserved with love! 🎀", "success");
      } else {
        showToast(res.error || "Could not reserve table.", "error");
      }
    } catch {
      showToast("Reservation network issue. Please call directly.", "error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-[#FFF8F9] min-h-screen text-[#3D2D2E] flex flex-col">
      <ConceptAHeader />

      <section className="pt-10 pb-6 border-b border-rose-100 bg-[#FFF0F3]/40">
        <div className="max-w-7xl mx-auto px-6 text-center space-y-2">
          <span className="text-xs font-bold text-[#E07A86] uppercase tracking-wider block">
            🎀 Candlelight & Ribbons
          </span>
          <h1 className="font-coquette-serif font-black text-3xl sm:text-4xl text-[#3D2D2E]">
            Table Reservations
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 max-w-md mx-auto">
            Book our pastel indoor conservatory or blossom garden terrace for date nights, birthdays, and celebrations.
          </p>
        </div>
      </section>

      <section className="py-12 flex-1">
        <div className="max-w-4xl mx-auto px-6">
          {confirmed ? (
            <div className="bg-white rounded-3xl p-8 sm:p-12 border border-rose-100 shadow-xl text-center space-y-6 max-w-xl mx-auto">
              <div className="w-16 h-16 rounded-full bg-rose-50 text-[#E07A86] flex items-center justify-center mx-auto text-2xl shadow-inner">
                🎀
              </div>

              <div>
                <span className="text-xs uppercase font-bold text-[#E07A86] tracking-wider">
                  Reservation Confirmed
                </span>
                <h2 className="font-coquette-serif font-black text-3xl text-gray-900 mt-1">
                  We Can&apos;t Wait to Host You!
                </h2>
                <p className="text-xs text-gray-500 mt-2">
                  A confirmation SMS has been dispatched to <strong>{phone}</strong>.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-[#FFF8F9] border border-rose-100 text-left space-y-3 text-xs">
                <div className="flex justify-between border-b border-rose-100 pb-2">
                  <span className="text-gray-400">Patron Name</span>
                  <span className="font-bold text-gray-900">{name}</span>
                </div>
                <div className="flex justify-between border-b border-rose-100 pb-2">
                  <span className="text-gray-400">Date & Time</span>
                  <span className="font-bold text-gray-900">{date} at {time}</span>
                </div>
                <div className="flex justify-between border-b border-rose-100 pb-2">
                  <span className="text-gray-400">Guests</span>
                  <span className="font-bold text-gray-900">{guests} Persons</span>
                </div>
                <div className="flex justify-between border-b border-rose-100 pb-2">
                  <span className="text-gray-400">Seating Area</span>
                  <span className="font-bold text-[#E07A86]">{seating}</span>
                </div>
                {requests && (
                  <div className="pt-1 text-gray-600 italic">
                    Note: &ldquo;{requests}&rdquo;
                  </div>
                )}
              </div>

              <button
                onClick={() => setConfirmed(false)}
                className="px-8 py-3 rounded-full bg-rose-50 border border-rose-200 text-xs font-bold text-[#E07A86] hover:bg-rose-100 transition"
              >
                Make Another Reservation
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Form (2 cols) */}
              <form onSubmit={handleBooking} className="lg:col-span-2 bg-white rounded-3xl p-6 sm:p-8 border border-rose-100 shadow-sm space-y-5">
                <h3 className="font-coquette-serif font-bold text-xl text-gray-900">
                  Select Date, Guests & Preference
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="font-bold text-gray-700 block mb-1">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Aanya Sharma"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-rose-200 bg-rose-50/30 focus:outline-none focus:ring-1 focus:ring-[#E07A86]"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-gray-700 block mb-1">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98112 34567"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-rose-200 bg-rose-50/30 focus:outline-none focus:ring-1 focus:ring-[#E07A86]"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="font-bold text-gray-700 block mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="aanya@example.com"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-rose-200 bg-rose-50/30 focus:outline-none focus:ring-1 focus:ring-[#E07A86]"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-gray-700 block mb-1">Reservation Date *</label>
                    <input
                      type="date"
                      required
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      min={new Date().toISOString().split("T")[0]}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-rose-200 bg-rose-50/30 focus:outline-none focus:ring-1 focus:ring-[#E07A86]"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-gray-700 block mb-1">Time Slot</label>
                    <select
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-rose-200 bg-white focus:outline-none"
                    >
                      <option value="12:30 PM">12:30 PM (Lunch)</option>
                      <option value="01:30 PM">01:30 PM (Lunch)</option>
                      <option value="04:00 PM">04:00 PM (High Tea)</option>
                      <option value="07:00 PM">07:00 PM (Dinner)</option>
                      <option value="08:00 PM">08:00 PM (Dinner)</option>
                      <option value="09:00 PM">09:00 PM (Dinner)</option>
                    </select>
                  </div>

                  <div>
                    <label className="font-bold text-gray-700 block mb-1">Guests</label>
                    <select
                      value={guests}
                      onChange={(e) => setGuests(Number(e.target.value))}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-rose-200 bg-white focus:outline-none"
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8, 10, 12].map((g) => (
                        <option key={g} value={g}>
                          {g} {g === 1 ? "Guest (Solo dining)" : "Guests"}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="font-bold text-gray-700 block mb-1">Seating Area</label>
                    <select
                      value={seating}
                      onChange={(e) => setSeating(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-rose-200 bg-white focus:outline-none"
                    >
                      <option value="Indoor Conservatory">Indoor Conservatory (Pastel Velvet)</option>
                      <option value="Garden Floral Terrace">Garden Floral Terrace (Open Air)</option>
                      <option value="Private Salon Booth">Private Salon Booth (Romantic)</option>
                    </select>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="font-bold text-gray-700 block mb-1">
                      Celebration Notes / Dietary Requests
                    </label>
                    <textarea
                      rows={2}
                      value={requests}
                      onChange={(e) => setRequests(e.target.value)}
                      placeholder="e.g. Birthday celebration, please prepare dessert with candle..."
                      className="w-full px-3.5 py-2.5 rounded-xl border border-rose-200 bg-rose-50/30 focus:outline-none focus:ring-1 focus:ring-[#E07A86]"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-4 rounded-full bg-gradient-to-r from-[#E07A86] to-[#F59E0B] text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-rose-200/50 hover:opacity-95 disabled:opacity-50 transition"
                >
                  {submitting ? "Reserving Salon..." : "Confirm Table Booking 🎀"}
                </button>
              </form>

              {/* Info Sidebar (1 col) */}
              <div className="space-y-4">
                <div className="aspect-[4/3] rounded-3xl overflow-hidden border border-rose-100 shadow-sm">
                  <img src="/images/restaurant-dining.webp" alt="Conservatory Dining" className="w-full h-full object-cover" />
                </div>
                <div className="p-6 rounded-3xl bg-white border border-rose-100 shadow-sm space-y-3 text-xs text-gray-600">
                  <h4 className="font-coquette-serif font-bold text-sm text-[#3D2D2E]">
                    Hospitality Notes
                  </h4>
                  <ul className="space-y-2">
                    <li>&bull; Tables held for 15 minutes past booking time.</li>
                    <li>&bull; Complimentary welcome botanical cooler on arrival.</li>
                    <li>&bull; Valet parking available on Garden Avenue.</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      <ConceptAFooter />
    </div>
  );
}
