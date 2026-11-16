"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Star, Calendar, Clock, Users, Sparkles, Zap, Flame, Award, Heart } from "lucide-react";
import ConceptCHeader from "@/components/concept-c/Header";
import ConceptCFooter from "@/components/concept-c/Footer";
import ConceptCFoodCard from "@/components/concept-c/FoodCard";
import CinematicLightbox, { LightboxItem } from "@/components/shared/CinematicLightbox";
import * as api from "@/lib/api";
import { useToast } from "@/context/ToastContext";

export default function ConceptCHomePage() {
  const { showToast } = useToast();
  const [signatureDishes, setSignatureDishes] = useState<any[]>([]);
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeLightboxItem, setActiveLightboxItem] = useState<LightboxItem | null>(null);

  // VIP Booth Reservation State
  const [resForm, setResForm] = useState({
    name: "",
    phone: "",
    email: "",
    reservation_date: new Date().toISOString().split("T")[0],
    reservation_time: "19:30",
    guests: 2,
    seating_area: "Pop Art Neon Booth",
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
        concept_source: "Concept C - Maximalist Pop Art",
      });
      if (res.success) {
        setResSuccess(true);
        showToast("Your VIP Pop Art Booth has been secured!", "success");
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
    <div className="bg-[#FFFDF7] min-h-screen text-[#111111] flex flex-col font-sans selection:bg-[#FFE600] selection:text-black">
      <ConceptCHeader />

      {/* -------------------------------------------------------------
          1. MAXIMALIST POP ART HERO SECTION
      ------------------------------------------------------------- */}
      <section className="relative overflow-hidden border-b-4 border-black bg-[#FFE600]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 md:py-24 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Hero Column: Oversized Kinetic Headlines */}
          <div className="lg:col-span-7 space-y-6 z-10">
            {/* Pop Sticker Badges */}
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="px-3.5 py-1 bg-[#FF007F] text-white text-xs font-black uppercase tracking-widest border-2 border-black -rotate-2 shadow-[3px_3px_0px_#000]">
                ⚡ ART YOU CAN EAT
              </span>
              <span className="px-3.5 py-1 bg-[#0047FF] text-white text-xs font-black uppercase tracking-widest border-2 border-black rotate-1 shadow-[3px_3px_0px_#000]">
                ★ 100% HYPER-FLAVOR
              </span>
              <span className="px-3 py-1 bg-white text-black text-xs font-black uppercase tracking-wider border-2 border-black -rotate-1 shadow-[2px_2px_0px_#000]">
                WARHOL x STREET GOURMET
              </span>
            </div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-5xl sm:text-7xl xl:text-8xl font-black uppercase tracking-tighter leading-[0.9] text-black"
            >
              TASTE THE <br />
              <span className="text-white bg-[#FF007F] px-3 py-1 border-4 border-black inline-block shadow-[6px_6px_0px_#000] rotate-1">
                LOUD
              </span>{" "}
              REVOLUTION
            </motion.h1>

            <p className="text-base sm:text-lg font-bold text-black max-w-xl leading-relaxed">
              Where pop-art editorial visuals meet high-voltage pantry craft. Bold small-batch chili crunch, fiery artisan condiments, popped street crisps, and botanical fizzy drinks.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-4">
              <Link
                href="/concept-c/menu/"
                className="bg-[#0047FF] hover:bg-[#FF007F] text-white font-black uppercase text-sm px-8 py-4 border-4 border-black shadow-[6px_6px_0px_#000] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all flex items-center gap-2"
              >
                <span>SHOP POP FLAVOR DROPS</span>
                <ArrowRight className="w-5 h-5 stroke-[3]" />
              </Link>
              <Link
                href="/concept-c/reservations/"
                className="bg-white hover:bg-black hover:text-white text-black font-black uppercase text-sm px-6 py-4 border-4 border-black shadow-[6px_6px_0px_#000] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all"
              >
                WHOLESALE &amp; STOCKIST &rarr;
              </Link>
            </div>
          </div>

          {/* Right Hero Column: Visual Pop-Art Collage */}
          <div className="lg:col-span-5 relative">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="relative mx-auto max-w-md"
            >
              {/* Offset Background Color Block */}
              <div className="absolute inset-0 bg-[#0047FF] border-4 border-black translate-x-4 translate-y-4 shadow-[8px_8px_0px_#000]" />
              
              {/* Main Image Frame */}
              <div className="relative bg-[#FFFDF7] border-4 border-black p-3 shadow-2xl">
                <img
                  src="/images/hero-retro.webp"
                  alt="Peachy Pop Art Dish"
                  className="w-full aspect-square object-cover border-2 border-black"
                />

                <div className="absolute -top-6 -right-6 bg-[#FF007F] text-white font-black text-center p-3 border-3 border-black shadow-[4px_4px_0px_#000] rotate-12">
                  <span className="block text-[10px] tracking-widest uppercase">HIT №</span>
                  <span className="text-2xl font-black">01</span>
                </div>

                <div className="absolute -bottom-5 -left-5 bg-[#FFE600] text-black font-black text-xs px-4 py-2 border-3 border-black shadow-[4px_4px_0px_#000] -rotate-6">
                  💥 CRAFTED WITH FIRE
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Continuous Kinetic Marquee */}
        <div className="bg-black text-[#FFE600] py-3 border-t-4 border-black overflow-hidden flex whitespace-nowrap font-black text-sm uppercase tracking-widest">
          <div className="flex animate-marquee gap-8 items-center shrink-0">
            <span>⚡ ELECTRIC FLAVORS</span>
            <span>&bull;</span>
            <span>🎨 POP ART COLLECTIBLE PACKS</span>
            <span>&bull;</span>
            <span>🔥 FIERY CHILI CRUNCH JARS</span>
            <span>&bull;</span>
            <span>🥤 BOTANICAL CRAFT FIZZ</span>
            <span>&bull;</span>
            <span>★ ZERO ARTIFICIAL PRESERVATIVES</span>
            <span>&bull;</span>
            <span>🥨 AIR-POPPED STREET CRISPS</span>
            <span>&bull;</span>
          </div>
          <div className="flex animate-marquee gap-8 items-center shrink-0" aria-hidden="true">
            <span>⚡ ELECTRIC FLAVORS</span>
            <span>&bull;</span>
            <span>🎨 POP ART COLLECTIBLE PACKS</span>
            <span>&bull;</span>
            <span>🔥 FIERY CHILI CRUNCH JARS</span>
            <span>&bull;</span>
            <span>🥤 BOTANICAL CRAFT FIZZ</span>
            <span>&bull;</span>
            <span>★ ZERO ARTIFICIAL PRESERVATIVES</span>
            <span>&bull;</span>
            <span>🥨 AIR-POPPED STREET CRISPS</span>
            <span>&bull;</span>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------
          2. COLOR-BLOCKED MANIFESTO (3-COLUMNS)
      ------------------------------------------------------------- */}
      <section className="border-b-4 border-black">
        <div className="grid grid-cols-1 md:grid-cols-3">
          {/* Block 1: Electric Pink */}
          <div className="bg-[#FF007F] text-white p-8 sm:p-12 border-b-4 md:border-b-0 md:border-r-4 border-black space-y-4">
            <span className="text-4xl">🎨</span>
            <div className="bg-black text-[#FFE600] text-[10px] font-black uppercase px-2 py-0.5 inline-block">
              PILLAR 01
            </div>
            <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight leading-tight">
              Packaging Art
            </h3>
            <p className="text-sm font-medium leading-relaxed opacity-95">
              Every jar, can, and snack pouch is created as a collectible pop-art print. High-voltage graphics that bring museum exhibition swagger to retail grocery shelves.
            </p>
          </div>

          {/* Block 2: Cobalt Blue */}
          <div className="bg-[#0047FF] text-white p-8 sm:p-12 border-b-4 md:border-b-0 md:border-r-4 border-black space-y-4">
            <span className="text-4xl">⚡</span>
            <div className="bg-black text-[#FFE600] text-[10px] font-black uppercase px-2 py-0.5 inline-block">
              PILLAR 02
            </div>
            <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight leading-tight">
              Hyper Flavor
            </h3>
            <p className="text-sm font-medium leading-relaxed opacity-95">
              Slow-fermented botanical chilis, fire-roasted peppers, unrefined cold-pressed oils, and intense umami crunch with zero chemical additives or preservatives.
            </p>
          </div>

          {/* Block 3: Tangerine Orange */}
          <div className="bg-[#FF6B00] text-white p-8 sm:p-12 space-y-4">
            <span className="text-4xl">💥</span>
            <div className="bg-black text-[#FFE600] text-[10px] font-black uppercase px-2 py-0.5 inline-block">
              PILLAR 03
            </div>
            <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight leading-tight">
              No Boring Pantries
            </h3>
            <p className="text-sm font-medium leading-relaxed opacity-95">
              Food should be energetic, daring, and unapologetically delicious. We engineer flavor profiles that ignite noodles, tacos, dips, and midnight cravings.
            </p>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------
          3. FEATURED SIGNATURE POP HITS
      ------------------------------------------------------------- */}
      <section className="py-20 px-4 sm:px-6 max-w-7xl mx-auto w-full">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12 border-b-4 border-black pb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-[#0047FF] text-white text-[10px] font-black uppercase px-2.5 py-0.5 border border-black shadow-[2px_2px_0px_#000]">
                CROWD FAVORITES
              </span>
              <span className="text-xs font-black uppercase tracking-wider text-gray-500">
                &bull; FRESHLY KITCHEN FIRED
              </span>
            </div>
            <h2 className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-black">
              POP HIT SIGNATURES
            </h2>
          </div>

          <Link
            href="/concept-c/menu/"
            className="self-start sm:self-auto bg-[#FFE600] hover:bg-[#FF007F] hover:text-white text-black font-black uppercase text-xs px-6 py-3 border-3 border-black shadow-[4px_4px_0px_#000] transition-colors"
          >
            VIEW FULL MENU &rarr;
          </Link>
        </div>

        {loading ? (
          <div className="py-20 text-center font-black text-xl text-[#0047FF]">
            LOADING POP CREATIONS...
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {signatureDishes.map((dish) => (
              <ConceptCFoodCard
                key={dish.id}
                item={dish}
                onOpenLightbox={(item) => setActiveLightboxItem(item)}
              />
            ))}
          </div>
        )}
      </section>

      {/* -------------------------------------------------------------
          4. VIP BOOTH RESERVATIONS SECTION
      ------------------------------------------------------------- */}
      <section className="bg-[#0047FF] text-white border-y-4 border-black py-20 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto bg-[#FFFDF7] text-black border-4 border-black p-8 sm:p-12 shadow-[12px_12px_0px_#FFE600]">
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-10">
            <span className="bg-[#FF007F] text-white text-xs font-black uppercase px-3 py-1 border-2 border-black inline-block -rotate-2">
              ★ B2B &amp; DESIGN STORE STOCKISTS ★
            </span>
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-black">
              WHOLESALE &amp; STOCKIST ORDERS
            </h2>
            <p className="text-sm font-bold text-gray-700">
              Stock our collectible pop-art chili crunch bottles, hot sauces, and craft fizz in your boutique, design store, museum shop, or gourmet supermarket!
            </p>
          </div>

          {resSuccess ? (
            <div className="bg-[#FFE600] p-8 border-4 border-black text-center space-y-4 shadow-[6px_6px_0px_#000]">
              <span className="text-5xl">🎉</span>
              <h3 className="text-2xl font-black uppercase">
                STOCKIST APPLICATION RECEIVED!
              </h3>
              <p className="text-sm font-bold">
                We have sent our full wholesale product catalog and line sheet to your email. Our brand director will ring you shortly!
              </p>
              <button
                onClick={() => setResSuccess(false)}
                className="bg-[#0047FF] text-white text-xs font-black uppercase px-6 py-2.5 border-2 border-black shadow-[3px_3px_0px_#000]"
              >
                SUBMIT ANOTHER APPLICATION
              </button>
            </div>
          ) : (
            <form onSubmit={handleReservationSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-black uppercase mb-1">
                    Store / Company Name
                  </label>
                  <input
                    type="text"
                    required
                    value={resForm.name}
                    onChange={(e) => setResForm({ ...resForm, name: e.target.value })}
                    placeholder="Pop Modern Gourmet"
                    className="w-full bg-[#FFE600]/20 border-3 border-black p-3 text-sm font-bold focus:bg-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-black uppercase mb-1">
                    Contact Phone Number
                  </label>
                  <input
                    type="tel"
                    required
                    value={resForm.phone}
                    onChange={(e) => setResForm({ ...resForm, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                    className="w-full bg-[#FFE600]/20 border-3 border-black p-3 text-sm font-bold focus:bg-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-black uppercase mb-1">
                    Buyer Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={resForm.email}
                    onChange={(e) => setResForm({ ...resForm, email: e.target.value })}
                    placeholder="buyer@popmodern.com"
                    className="w-full bg-[#FFE600]/20 border-3 border-black p-3 text-sm font-bold focus:bg-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-black uppercase mb-1">
                    Earliest Stocking Date
                  </label>
                  <input
                    type="date"
                    required
                    value={resForm.reservation_date}
                    onChange={(e) => setResForm({ ...resForm, reservation_date: e.target.value })}
                    className="w-full bg-[#FFE600]/20 border-3 border-black p-3 text-sm font-bold focus:bg-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-black uppercase mb-1">
                    Retail Channel
                  </label>
                  <select
                    value={resForm.reservation_time}
                    onChange={(e) => setResForm({ ...resForm, reservation_time: e.target.value })}
                    className="w-full bg-[#FFE600]/20 border-3 border-black p-3 text-sm font-bold focus:bg-white focus:outline-none"
                  >
                    <option value="Design Boutique &amp; Museum Gift Shop">Design Boutique &amp; Museum Shop</option>
                    <option value="Gourmet Food Hall &amp; Deli">Gourmet Food Hall &amp; Deli</option>
                    <option value="Online D2C Marketplace">Online D2C Marketplace</option>
                    <option value="Cafe / Espresso Bar Retail Shelf">Cafe / Bar Retail Shelf</option>
                    <option value="Corporate / PR Gifting Client">Corporate / PR Gifting Client</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-black uppercase mb-1">
                    Initial Case Volume
                  </label>
                  <select
                    value={resForm.guests}
                    onChange={(e) => setResForm({ ...resForm, guests: Number(e.target.value) })}
                    className="w-full bg-[#FFE600]/20 border-3 border-black p-3 text-sm font-bold focus:bg-white focus:outline-none"
                  >
                    <option value={5}>Starter Pack (5 Cases - 120 Units)</option>
                    <option value={15}>Boutique Display (15 Cases - 360 Units)</option>
                    <option value={30}>Full Endcap Display (30 Cases - 720 Units)</option>
                    <option value={60}>Pallet Order (60+ Cases - 1,440+ Units)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-black uppercase mb-1">
                  Primary Product Category of Interest
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {["Artisan Chili &amp; Sauces", "Air-Popped Street Snacks", "Botanical Fizzy Cans"].map((area) => (
                    <button
                      type="button"
                      key={area}
                      onClick={() => setResForm({ ...resForm, seating_area: area })}
                      className={`p-3 text-xs font-black uppercase border-3 border-black text-center transition-all ${
                        resForm.seating_area === area
                          ? "bg-[#FF007F] text-white shadow-[4px_4px_0px_#000]"
                          : "bg-white text-black hover:bg-[#FFE600]"
                      }`}
                    >
                      {area.replace("&amp;", "&")}
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                disabled={resSubmitting}
                className="w-full bg-[#FFE600] hover:bg-[#FF007F] hover:text-white text-black font-black uppercase text-base py-4 border-4 border-black shadow-[6px_6px_0px_#000] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all"
              >
                {resSubmitting ? "TRANSMITTING APPLICATION..." : "REQUEST WHOLESALE CATALOG &amp; LINE SHEET &rarr;"}
              </button>
            </form>
          )}
        </div>
      </section>

      {/* -------------------------------------------------------------
          5. POP ART REVIEWS SECTION
      ------------------------------------------------------------- */}
      <section className="py-20 px-4 sm:px-6 max-w-7xl mx-auto w-full">
        <div className="text-center max-w-xl mx-auto mb-12 space-y-2">
          <span className="bg-[#FFE600] text-black text-xs font-black uppercase px-3 py-1 border-2 border-black inline-block">
            ★ VERIFIED CRITICS & FOODIES ★
          </span>
          <h2 className="text-4xl sm:text-5xl font-black uppercase tracking-tight text-black">
            WHAT PEOPLE SAY
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.slice(0, 3).map((rev, idx) => (
            <div
              key={rev.id || idx}
              className={`p-6 border-4 border-black shadow-[6px_6px_0px_#000] flex flex-col justify-between space-y-4 ${
                idx === 0
                  ? "bg-[#FFFDF7] -rotate-1"
                  : idx === 1
                  ? "bg-[#FFE600] rotate-1"
                  : "bg-[#FFFDF7] -rotate-1"
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center gap-1 text-black">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < (rev.rating || 5) ? "fill-black text-black" : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-sm font-bold text-black leading-relaxed">
                  &ldquo;{rev.comment || "An unforgettable sensory feast! The bold decor combined with mind-blowing sourdough pizza is unmatched."}&rdquo;
                </p>
              </div>

              <div className="pt-4 border-t-2 border-black flex items-center justify-between">
                <div>
                  <span className="font-black text-xs uppercase block text-black">
                    {rev.customer_name || "Food Critic"}
                  </span>
                  <span className="text-[10px] font-mono text-gray-600">
                    {rev.created_at ? new Date(rev.created_at).toLocaleDateString() : "Verified Diner"}
                  </span>
                </div>
                <span className="text-2xl">🔥</span>
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

      <ConceptCFooter />
    </div>
  );
}
