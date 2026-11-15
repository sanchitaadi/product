"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Train, Ticket, Clock, Calendar, Users, Sparkles, ShieldCheck, Star } from "lucide-react";
import ConceptEHeader from "@/components/concept-e/Header";
import ConceptEFooter from "@/components/concept-e/Footer";
import ConceptEFoodCard from "@/components/concept-e/FoodCard";
import DepartureBoard from "@/components/concept-e/DepartureBoard";
import MetroRouteMap from "@/components/concept-e/MetroRouteMap";
import MetroLoader from "@/components/concept-e/MetroLoader";
import CinematicLightbox, { LightboxItem } from "@/components/shared/CinematicLightbox";
import * as api from "@/lib/api";
import { useToast } from "@/context/ToastContext";

export default function ConceptEHomePage() {
  const { showToast } = useToast();
  const [signatureDishes, setSignatureDishes] = useState<any[]>([]);
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeLightboxItem, setActiveLightboxItem] = useState<LightboxItem | null>(null);

  // Reservation Form State
  const [resForm, setResForm] = useState({
    name: "",
    phone: "",
    email: "",
    reservation_date: new Date().toISOString().split("T")[0],
    reservation_time: "19:30",
    guests: 2,
    seating_area: "First-Class Dining Car",
    special_requests: "",
  });
  const [resSubmitting, setResSubmitting] = useState(false);
  const [resSuccess, setResSuccess] = useState(false);

  useEffect(() => {
    Promise.all([api.getMenu({ bestseller: "1" }), api.getReviews(6)])
      .then(([menuRes, revRes]) => {
        if (menuRes.success && Array.isArray(menuRes.items)) {
          setSignatureDishes(menuRes.items.slice(0, 6));
        }
        if (revRes.success && Array.isArray(revRes.reviews)) {
          setReviews(revRes.reviews);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  const handleReservationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setResSubmitting(true);
    try {
      const res = await api.createReservation({
        ...resForm,
        concept_source: "Concept E - Metro Bites",
      });
      if (res.success) {
        setResSuccess(true);
        showToast("First-Class dining car ticket confirmed!", "success");
      } else {
        showToast(res.error || "Reservation request failed", "error");
      }
    } catch {
      showToast("Error booking reservation", "error");
    } finally {
      setResSubmitting(false);
    }
  };

  return (
    <div className="bg-[#050D1C] min-h-screen text-white flex flex-col font-mono selection:bg-[#FFD100] selection:text-[#08142C]">
      {/* Metro Animated Sliding Doors Loading Screen */}
      <MetroLoader />

      <ConceptEHeader />

      {/* -------------------------------------------------------------
          1. CINEMATIC TRAIN STATION ENTRANCE HERO
      ------------------------------------------------------------- */}
      <section className="relative overflow-hidden border-b-4 border-[#FFD100] bg-[#08142C]">
        {/* Subway Tile Texture Background Subtle Grid */}
        <div
          className="absolute inset-0 opacity-15 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(#FFD100 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 md:py-24 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          {/* Left Text */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3.5 py-1 bg-[#D71920] text-white text-xs font-black uppercase tracking-widest border border-white shadow-[2px_2px_0px_#FFD100]">
                🚆 PLATFORM 01 &bull; NOW BOARDING
              </span>
              <span className="px-3.5 py-1 bg-[#FFD100] text-[#08142C] text-xs font-black uppercase tracking-widest border border-black shadow-[2px_2px_0px_#000]">
                EXPRESS FOODWAY
              </span>
            </div>

            <motion.h1
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl sm:text-6xl xl:text-7xl font-black uppercase tracking-tight text-white leading-[1.05]"
            >
              FAST-CASUAL <br />
              <span className="text-[#FFD100] underline decoration-[#D71920] decoration-4">
                METRO DINING
              </span>{" "}
              REIMAGINED
            </motion.h1>

            <p className="text-sm sm:text-base text-gray-300 font-sans max-w-xl leading-relaxed">
              Step onto the platform where vintage railway travel meets high-speed gourmet craft. Hand-stretched sourdough pizzas, express wok specials, and artisanal brews served hot at your station.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href="/concept-e/menu/"
                className="bg-[#D71920] hover:bg-[#B3141A] text-white font-mono font-black uppercase text-xs px-8 py-4 rounded-lg border-2 border-[#FFD100] shadow-[4px_4px_0px_#000] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all flex items-center gap-2"
              >
                <Ticket className="w-4 h-4" />
                <span>BOARD FLAVOR EXPRESS</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/concept-e/reservations/"
                className="bg-[#0D1F42] hover:bg-white hover:text-black text-white font-mono font-black uppercase text-xs px-6 py-4 rounded-lg border-2 border-white/40 shadow-[4px_4px_0px_#000] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all"
              >
                BOOK FIRST-CLASS SEAT
              </Link>
            </div>
          </div>

          {/* Right Train Graphic Frame */}
          <div className="lg:col-span-5 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7 }}
              className="relative mx-auto max-w-md bg-[#050D1C] border-4 border-[#FFD100] rounded-2xl p-3 shadow-[10px_10px_0px_#D71920]"
            >
              <img
                src="/images/restaurant-interior.webp"
                alt="Peachy Metro Concourse Dining"
                className="w-full aspect-[4/3] object-cover rounded-lg border-2 border-white/20"
              />

              <div className="absolute -top-4 -right-4 bg-[#D71920] text-white text-xs font-black uppercase px-3 py-1.5 border-2 border-white shadow-[3px_3px_0px_#000]">
                NEXT STOP: DELICIOUS
              </div>

              <div className="mt-3 p-3 bg-[#08142C] rounded-lg border border-white/10 flex items-center justify-between text-xs">
                <span className="text-[#FFD100]">● TRAIN ON APPROACH</span>
                <span className="text-gray-400">TRACK 2 &bull; 0 MINS</span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Live Train Route Marquee */}
        <div className="bg-[#D71920] text-white py-2 border-t-2 border-[#FFD100] overflow-hidden flex whitespace-nowrap text-xs font-black uppercase tracking-widest">
          <div className="flex animate-marquee gap-8 items-center shrink-0">
            <span>🚆 CENTRAL DEPOT</span>
            <span>&bull;</span>
            <span>🍕 PIZZA CENTRAL (PLATFORM 2)</span>
            <span>&bull;</span>
            <span>🍝 PASTA STREET EXPRESS</span>
            <span>&bull;</span>
            <span>🍰 DESSERT TERMINAL</span>
            <span>&bull;</span>
            <span>☕ SINGLE ORIGIN NITRO DEPOT</span>
            <span>&bull;</span>
            <span>★ ZERO PROCESSED ADDITIVES</span>
            <span>&bull;</span>
          </div>
          <div className="flex animate-marquee gap-8 items-center shrink-0" aria-hidden="true">
            <span>🚆 CENTRAL DEPOT</span>
            <span>&bull;</span>
            <span>🍕 PIZZA CENTRAL (PLATFORM 2)</span>
            <span>&bull;</span>
            <span>🍝 PASTA STREET EXPRESS</span>
            <span>&bull;</span>
            <span>🍰 DESSERT TERMINAL</span>
            <span>&bull;</span>
            <span>☕ SINGLE ORIGIN NITRO DEPOT</span>
            <span>&bull;</span>
            <span>★ ZERO PROCESSED ADDITIVES</span>
            <span>&bull;</span>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------
          2. LIVE DEPARTURE BOARD SECTION
      ------------------------------------------------------------- */}
      <section className="py-16 px-4 sm:px-6 max-w-7xl mx-auto w-full">
        <DepartureBoard />
      </section>

      {/* -------------------------------------------------------------
          3. INTERACTIVE FOOD METRO MAP
      ------------------------------------------------------------- */}
      <section className="py-8 px-4 sm:px-6 max-w-7xl mx-auto w-full">
        <MetroRouteMap
          activeCategory={activeCategory}
          onSelectCategory={(cat) => setActiveCategory(cat)}
        />
      </section>

      {/* -------------------------------------------------------------
          4. SIGNATURE RAILWAY DISHES
      ------------------------------------------------------------- */}
      <section className="py-16 px-4 sm:px-6 max-w-7xl mx-auto w-full">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10 pb-6 border-b-2 border-white/20">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="bg-[#D71920] text-white text-[10px] font-black uppercase px-2 py-0.5 border border-white">
                CARTE DU JOUR
              </span>
              <span className="text-xs text-[#FFD100] uppercase tracking-wider font-bold">
                HIGH SPEED WOOD-FIRE DISPATCH
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white">
              FEATURED EXPRESS FARE
            </h2>
          </div>

          <Link
            href="/concept-e/menu/"
            className="self-start sm:self-auto bg-[#FFD100] hover:bg-[#D71920] hover:text-white text-[#08142C] font-black uppercase text-xs px-6 py-3 rounded-lg border-2 border-black transition-colors"
          >
            ALL STATIONS CARTE &rarr;
          </Link>
        </div>

        {loading ? (
          <div className="py-20 text-center font-black text-xl text-[#FFD100]">
            LOADING METRO EXPRESS RECIPES...
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {signatureDishes.map((dish) => (
              <ConceptEFoodCard
                key={dish.id}
                item={dish}
                onOpenLightbox={(item) => setActiveLightboxItem(item)}
              />
            ))}
          </div>
        )}
      </section>

      {/* -------------------------------------------------------------
          5. FIRST-CLASS CARRIAGE TABLE RESERVATIONS
      ------------------------------------------------------------- */}
      <section className="py-16 px-4 sm:px-6 bg-[#08142C] border-y-4 border-[#FFD100]">
        <div className="max-w-4xl mx-auto bg-[#050D1C] border-4 border-[#FFD100] rounded-2xl p-8 sm:p-12 shadow-[12px_12px_0px_#D71920]">
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-10">
            <span className="bg-[#D71920] text-white text-xs font-black uppercase px-3 py-1 border border-white inline-block">
              ★ FIRST-CLASS CARRIAGE SEATING ★
            </span>
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white">
              BOOK YOUR DINING CARRIAGE
            </h2>
            <p className="text-xs sm:text-sm text-gray-300 font-sans">
              Reserve an authentic vintage train booth with brass lamps, mahogany trims, and dedicated table-side railway service.
            </p>
          </div>

          {resSuccess ? (
            <div className="bg-[#08142C] p-8 border-3 border-[#FFD100] rounded-xl text-center space-y-4">
              <span className="text-5xl">🎫</span>
              <h3 className="text-2xl font-black uppercase text-[#FFD100]">
                BOARDING PASS CONFIRMED!
              </h3>
              <p className="text-sm font-sans text-gray-300">
                Your first-class carriage table has been registered in the station logbook. SMS dispatch confirmed.
              </p>
              <button
                onClick={() => setResSuccess(false)}
                className="bg-[#D71920] text-white text-xs font-black uppercase px-6 py-2.5 rounded border border-white"
              >
                BOOK ANOTHER JOURNEY
              </button>
            </div>
          ) : (
            <form onSubmit={handleReservationSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-black uppercase text-gray-400 mb-1">
                    Passenger Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={resForm.name}
                    onChange={(e) => setResForm({ ...resForm, name: e.target.value })}
                    placeholder="Agatha Christie"
                    className="w-full bg-[#08142C] border-2 border-white/30 rounded p-2.5 text-xs text-white focus:border-[#FFD100] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-black uppercase text-gray-400 mb-1">
                    Contact Phone *
                  </label>
                  <input
                    type="tel"
                    required
                    value={resForm.phone}
                    onChange={(e) => setResForm({ ...resForm, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                    className="w-full bg-[#08142C] border-2 border-white/30 rounded p-2.5 text-xs text-white focus:border-[#FFD100] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-black uppercase text-gray-400 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={resForm.email}
                    onChange={(e) => setResForm({ ...resForm, email: e.target.value })}
                    placeholder="agatha@orient.com"
                    className="w-full bg-[#08142C] border-2 border-white/30 rounded p-2.5 text-xs text-white focus:border-[#FFD100] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-black uppercase text-gray-400 mb-1">
                    Travel Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={resForm.reservation_date}
                    onChange={(e) => setResForm({ ...resForm, reservation_date: e.target.value })}
                    className="w-full bg-[#08142C] border-2 border-white/30 rounded p-2.5 text-xs text-white focus:border-[#FFD100] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-black uppercase text-gray-400 mb-1">
                    Departure Time *
                  </label>
                  <input
                    type="time"
                    required
                    value={resForm.reservation_time}
                    onChange={(e) => setResForm({ ...resForm, reservation_time: e.target.value })}
                    className="w-full bg-[#08142C] border-2 border-white/30 rounded p-2.5 text-xs text-white focus:border-[#FFD100] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-black uppercase text-gray-400 mb-1">
                    Passenger Count *
                  </label>
                  <select
                    value={resForm.guests}
                    onChange={(e) => setResForm({ ...resForm, guests: Number(e.target.value) })}
                    className="w-full bg-[#08142C] border-2 border-white/30 rounded p-2.5 text-xs text-white focus:border-[#FFD100] outline-none"
                  >
                    {[1, 2, 3, 4, 5, 6, 8, 10, 12].map((num) => (
                      <option key={num} value={num}>
                        {num} {num === 1 ? "Passenger" : "Passengers"}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-black uppercase text-gray-400 mb-1">
                  Carriage Ambiance
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {["First-Class Dining Car", "Platform Observation Deck", "Steam Locomotive Saloon"].map((area) => (
                    <button
                      type="button"
                      key={area}
                      onClick={() => setResForm({ ...resForm, seating_area: area })}
                      className={`p-3 text-xs font-black uppercase rounded border-2 transition-all ${
                        resForm.seating_area === area
                          ? "bg-[#D71920] text-white border-[#FFD100] shadow-[2px_2px_0px_#000]"
                          : "bg-[#08142C] text-gray-300 border-white/20 hover:border-white"
                      }`}
                    >
                      {area}
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                disabled={resSubmitting}
                className="w-full bg-[#FFD100] hover:bg-[#D71920] hover:text-white text-[#08142C] font-black uppercase text-sm py-4 rounded-lg border-2 border-black shadow-[4px_4px_0px_#000] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all"
              >
                {resSubmitting ? "ISSUING TICKET..." : "ISSUE FIRST-CLASS BOARDING PASS &rarr;"}
              </button>
            </form>
          )}
        </div>
      </section>

      {/* -------------------------------------------------------------
          6. PASSENGER TRAVEL LOGBOOK REVIEWS
      ------------------------------------------------------------- */}
      <section className="py-16 px-4 sm:px-6 max-w-7xl mx-auto w-full">
        <div className="text-center max-w-xl mx-auto mb-12 space-y-2">
          <span className="bg-[#FFD100] text-[#08142C] text-xs font-black uppercase px-3 py-1 border border-black inline-block">
            ★ VERIFIED PASSENGER REVIEWS ★
          </span>
          <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white">
            COMMUTER TESTIMONIALS
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.slice(0, 3).map((rev, idx) => (
            <div
              key={rev.id || idx}
              className="bg-[#08142C] border-2 border-[#FFD100]/40 rounded-xl p-6 shadow-md flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center gap-1 text-[#FFD100]">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < (rev.rating || 5) ? "fill-current" : "text-gray-600"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-xs font-sans text-gray-200 leading-relaxed">
                  &ldquo;{rev.comment || "The fastest gourmet dining experience in town. Sourdough pizza arrived blistered and piping hot!"}&rdquo;
                </p>
              </div>

              <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs">
                <div>
                  <span className="font-black text-white uppercase block">
                    {rev.customer_name || "Commuter"}
                  </span>
                  <span className="text-[10px] text-gray-400">
                    PASSENGER &bull; VERIFIED
                  </span>
                </div>
                <span className="text-xl">🚆</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Lightbox */}
      <CinematicLightbox
        item={activeLightboxItem}
        onClose={() => setActiveLightboxItem(null)}
      />

      <ConceptEFooter />
    </div>
  );
}
