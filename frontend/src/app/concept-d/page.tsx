"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Leaf, Sparkles, Clock, Calendar, Users, CheckCircle2, Heart } from "lucide-react";
import ConceptDHeader from "@/components/concept-d/Header";
import ConceptDFooter from "@/components/concept-d/Footer";
import ConceptDFoodCard from "@/components/concept-d/FoodCard";
import CinematicLightbox, { LightboxItem } from "@/components/shared/CinematicLightbox";
import * as api from "@/lib/api";
import { useToast } from "@/context/ToastContext";

export default function ConceptDHomePage() {
  const { showToast } = useToast();
  const [signatureDishes, setSignatureDishes] = useState<any[]>([]);
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeLightboxItem, setActiveLightboxItem] = useState<LightboxItem | null>(null);

  // Reservation State
  const [resForm, setResForm] = useState({
    name: "",
    phone: "",
    email: "",
    reservation_date: new Date().toISOString().split("T")[0],
    reservation_time: "19:30",
    guests: 2,
    seating_area: "Greenhouse Conservatory",
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
        concept_source: "Concept D - Organic Earth",
      });
      if (res.success) {
        setResSuccess(true);
        showToast("Your conservatory table has been reserved.", "success");
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
    <div className="bg-[#FDFBF7] min-h-screen text-[#1E3F20] flex flex-col font-serif selection:bg-[#7B8E78] selection:text-white">
      <ConceptDHeader />

      {/* -------------------------------------------------------------
          1. SERENE BOTANICAL HERO SECTION
      ------------------------------------------------------------- */}
      <section className="relative overflow-hidden bg-[#F2EFE9] py-20 lg:py-28 border-b border-[#5E6B4E]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#5E6B4E]/10 text-[#5E6B4E] text-xs tracking-wider uppercase">
              <Leaf className="w-3.5 h-3.5" />
              <span>Regenerative Farm-to-Table &bull; Est. 2026</span>
            </div>

            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="text-4xl sm:text-6xl xl:text-7xl font-normal leading-[1.1] text-[#1E3F20] tracking-tight"
            >
              Grounded by Nature. <br />
              <span className="italic text-[#C86D51]">Crafted by Patience.</span>
            </motion.h1>

            <p className="text-base sm:text-lg text-[#5E6B4E] font-light leading-relaxed max-w-xl">
              An organic sanctuary celebrating ancient stone-milled grains, cold-pressed olive oils, and hand-foraged botanical herbs harvested fresh each dawn.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-4">
              <Link
                href="/concept-d/menu/"
                className="bg-[#5E6B4E] hover:bg-[#4E5B3F] text-[#FDFBF7] text-xs uppercase tracking-widest px-8 py-4 rounded-full shadow-md hover:shadow-lg transition-all flex items-center gap-2 font-sans"
              >
                <span>View Harvest Carte</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/concept-d/reservations/"
                className="bg-transparent hover:bg-[#5E6B4E]/10 text-[#1E3F20] text-xs uppercase tracking-widest px-8 py-4 rounded-full border border-[#5E6B4E]/30 transition-all font-sans"
              >
                Reserve a Table
              </Link>
            </div>
          </div>

          {/* Right Image Frame with Botanical Styling */}
          <div className="lg:col-span-5 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative mx-auto max-w-md rounded-3xl overflow-hidden shadow-2xl border-2 border-[#5E6B4E]/20"
            >
              <img
                src="/images/restaurant-garden.webp"
                alt="Peachy Earth Greenhouse Conservatory"
                className="w-full aspect-[4/5] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex flex-col justify-end p-6 text-[#FDFBF7]">
                <span className="text-[10px] tracking-widest uppercase text-[#A3B8A0]">
                  Conservatory Dining Room
                </span>
                <h3 className="text-xl font-normal">
                  Dine Among Blooming Citrus &amp; Wild Flora
                </h3>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------
          2. INGREDIENT PROVENANCE (3-COLUMNS)
      ------------------------------------------------------------- */}
      <section className="py-20 px-4 sm:px-6 max-w-7xl mx-auto w-full">
        <div className="text-center max-w-xl mx-auto space-y-3 mb-16">
          <span className="text-[11px] font-serif uppercase tracking-widest text-[#7B8E78] block">
            Harvest Philosophy
          </span>
          <h2 className="text-3xl sm:text-5xl font-normal text-[#1E3F20] tracking-tight">
            Rooted in True Sustainability
          </h2>
          <p className="text-xs sm:text-sm text-[#5E6B4E] leading-relaxed">
            We partner exclusively with zero-pesticide smallholder farmers across northern India.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-[#F2EFE9] p-8 rounded-2xl border border-[#5E6B4E]/15 space-y-3">
            <span className="text-3xl">🌾</span>
            <h3 className="text-xl font-medium text-[#1E3F20]">48-Hour Cold Sourdough</h3>
            <p className="text-xs text-[#5E6B4E] leading-relaxed font-light">
              Our wild yeast starter has been nurtured daily for 7 years. Slow cold maturation breaks down gluten and yields a tender, gut-friendly crust.
            </p>
          </div>

          <div className="bg-[#F2EFE9] p-8 rounded-2xl border border-[#5E6B4E]/15 space-y-3">
            <span className="text-3xl">🫒</span>
            <h3 className="text-xl font-medium text-[#1E3F20]">First Cold Pressing</h3>
            <p className="text-xs text-[#5E6B4E] leading-relaxed font-light">
              Single-variety extra virgin olive nectar sourced from Mediterranean and Himalayan micro-groves, pressed within 6 hours of harvest.
            </p>
          </div>

          <div className="bg-[#F2EFE9] p-8 rounded-2xl border border-[#5E6B4E]/15 space-y-3">
            <span className="text-3xl">🌱</span>
            <h3 className="text-xl font-medium text-[#1E3F20]">Living Microgreens</h3>
            <p className="text-xs text-[#5E6B4E] leading-relaxed font-light">
              Clipped table-side from our interior conservatory beds just moments before reaching your plate, bursting with chlorophyll and aroma.
            </p>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------
          3. FEATURED HARVEST SIGNATURES
      ------------------------------------------------------------- */}
      <section className="bg-[#F2EFE9] py-20 px-4 sm:px-6 border-y border-[#5E6B4E]/20">
        <div className="max-w-7xl mx-auto w-full">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
            <div>
              <span className="text-xs uppercase tracking-widest text-[#7B8E78] block mb-1">
                Seasonal Degustation
              </span>
              <h2 className="text-3xl sm:text-5xl font-normal text-[#1E3F20]">
                Botanical Harvest Highlights
              </h2>
            </div>

            <Link
              href="/concept-d/menu/"
              className="self-start sm:self-auto text-xs uppercase tracking-widest text-[#C86D51] hover:underline flex items-center gap-1 font-sans"
            >
              <span>Explore Complete Carte</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {loading ? (
            <div className="py-20 text-center font-serif text-lg text-[#5E6B4E]">
              GATHERING BOTANICAL HARVEST...
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {signatureDishes.map((dish) => (
                <ConceptDFoodCard
                  key={dish.id}
                  item={dish}
                  onOpenLightbox={(item) => setActiveLightboxItem(item)}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* -------------------------------------------------------------
          4. CONSERVATORY TABLE RESERVATION
      ------------------------------------------------------------- */}
      <section className="py-20 px-4 sm:px-6 max-w-4xl mx-auto w-full">
        <div className="bg-white rounded-3xl border border-[#5E6B4E]/25 p-8 sm:p-12 shadow-xl space-y-8">
          <div className="text-center space-y-2">
            <span className="text-xs uppercase tracking-widest text-[#7B8E78] block">
              Greenhouse Dining
            </span>
            <h2 className="text-3xl sm:text-4xl font-normal text-[#1E3F20]">
              Reserve Your Botanical Table
            </h2>
            <p className="text-xs text-[#5E6B4E] max-w-md mx-auto">
              Enjoy peaceful seating surrounded by heritage fig trees, climbing jasmine, and soft ambient natural light.
            </p>
          </div>

          {resSuccess ? (
            <div className="p-8 bg-[#F2EFE9] rounded-2xl text-center space-y-3">
              <span className="text-4xl">🌿</span>
              <h3 className="text-xl font-medium text-[#1E3F20]">
                Your Reservation is Confirmed
              </h3>
              <p className="text-xs text-[#5E6B4E]">
                We have registered your party. We look forward to welcoming you to the conservatory.
              </p>
              <button
                onClick={() => setResSuccess(false)}
                className="mt-2 text-xs uppercase text-[#C86D51] font-sans hover:underline"
              >
                Reserve Another Table
              </button>
            </div>
          ) : (
            <form onSubmit={handleReservationSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#5E6B4E] mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={resForm.name}
                    onChange={(e) => setResForm({ ...resForm, name: e.target.value })}
                    placeholder="Evelyn Thorne"
                    className="w-full bg-[#FDFBF7] border border-[#5E6B4E]/30 rounded-xl p-3 text-xs focus:border-[#5E6B4E] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#5E6B4E] mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    required
                    value={resForm.phone}
                    onChange={(e) => setResForm({ ...resForm, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                    className="w-full bg-[#FDFBF7] border border-[#5E6B4E]/30 rounded-xl p-3 text-xs focus:border-[#5E6B4E] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#5E6B4E] mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={resForm.email}
                    onChange={(e) => setResForm({ ...resForm, email: e.target.value })}
                    placeholder="evelyn@botanical.com"
                    className="w-full bg-[#FDFBF7] border border-[#5E6B4E]/30 rounded-xl p-3 text-xs focus:border-[#5E6B4E] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#5E6B4E] mb-1">
                    Date
                  </label>
                  <input
                    type="date"
                    required
                    value={resForm.reservation_date}
                    onChange={(e) => setResForm({ ...resForm, reservation_date: e.target.value })}
                    className="w-full bg-[#FDFBF7] border border-[#5E6B4E]/30 rounded-xl p-3 text-xs focus:border-[#5E6B4E] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#5E6B4E] mb-1">
                    Time
                  </label>
                  <input
                    type="time"
                    required
                    value={resForm.reservation_time}
                    onChange={(e) => setResForm({ ...resForm, reservation_time: e.target.value })}
                    className="w-full bg-[#FDFBF7] border border-[#5E6B4E]/30 rounded-xl p-3 text-xs focus:border-[#5E6B4E] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#5E6B4E] mb-1">
                    Guests
                  </label>
                  <select
                    value={resForm.guests}
                    onChange={(e) => setResForm({ ...resForm, guests: Number(e.target.value) })}
                    className="w-full bg-[#FDFBF7] border border-[#5E6B4E]/30 rounded-xl p-3 text-xs focus:border-[#5E6B4E] outline-none"
                  >
                    {[1, 2, 3, 4, 5, 6, 8, 10, 12].map((n) => (
                      <option key={n} value={n}>
                        {n} {n === 1 ? "Guest" : "Guests"}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-[#5E6B4E] mb-1">
                  Seating Ambiance
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {["Greenhouse Conservatory", "Courtyard Olive Grove", "Artisan Hearth"].map((area) => (
                    <button
                      key={area}
                      type="button"
                      onClick={() => setResForm({ ...resForm, seating_area: area })}
                      className={`p-3 text-xs rounded-xl border transition-all ${
                        resForm.seating_area === area
                          ? "bg-[#5E6B4E] text-[#FDFBF7] border-[#5E6B4E]"
                          : "bg-[#FDFBF7] text-[#1E3F20] border-[#5E6B4E]/30 hover:border-[#5E6B4E]"
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
                className="w-full bg-[#5E6B4E] hover:bg-[#4E5B3F] text-[#FDFBF7] text-xs font-sans uppercase tracking-widest py-4 rounded-full transition-all"
              >
                {resSubmitting ? "Registering..." : "Confirm Conservatory Table"}
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Lightbox */}
      <CinematicLightbox
        item={activeLightboxItem}
        onClose={() => setActiveLightboxItem(null)}
      />

      <ConceptDFooter />
    </div>
  );
}
