"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Star, Ticket, Sparkles, CheckCircle2 } from "lucide-react";
import ConceptGHeader from "@/components/concept-g/Header";
import ConceptGFooter from "@/components/concept-g/Footer";
import ConceptGFoodCard from "@/components/concept-g/FoodCard";
import CircusLoader from "@/components/concept-g/CircusLoader";
import CinematicLightbox, { LightboxItem } from "@/components/shared/CinematicLightbox";
import * as api from "@/lib/api";

export default function ConceptGHomePage() {
  const [dishes, setDishes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeLightboxItem, setActiveLightboxItem] = useState<LightboxItem | null>(null);

  useEffect(() => {
    api
      .getMenu()
      .then((res) => {
        if (res.success && Array.isArray(res.items)) {
          setDishes(res.items.slice(0, 8));
        }
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="bg-[#FFFDD0] min-h-screen text-[#5C0614] flex flex-col font-sans selection:bg-[#FFD54F] selection:text-[#5C0614]">
      <CircusLoader />
      <ConceptGHeader />

      {/* GRAND CARNIVAL ENTRANCE HERO */}
      <section className="relative overflow-hidden border-b-6 border-[#C41E3A] bg-[#FFFDF5] py-16 lg:py-24">
        {/* Subtle Circus Tent Stripes Overlay */}
        <div className="absolute inset-0 pointer-events-none opacity-10 [background:repeating-linear-gradient(45deg,#C41E3A_0_20px,transparent_20px_40px)]" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Narrative Column */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#FFD54F] text-[#5C0614] font-black text-xs uppercase tracking-widest rounded-full border-2 border-[#5C0614] shadow-[3px_3px_0px_#C41E3A]">
              <Star className="w-3.5 h-3.5 fill-[#5C0614]" />
              <span>THE GREATEST RESTAURANT SPECTACLE ON EARTH</span>
            </div>

            <h1 className="text-4xl sm:text-6xl xl:text-7xl font-black uppercase tracking-tight text-[#5C0614] font-serif leading-[1.05]">
              STEP RIGHT UP TO <br />
              <span className="text-[#C41E3A] relative inline-block">
                THE PEACHY BIG TOP!
                <span className="absolute -top-3 -right-6 px-3 py-1 bg-[#FFD54F] text-[#5C0614] text-xs font-black rounded-full border border-[#5C0614] rotate-12 shadow-sm">
                  SHOWTIME! 🎪
                </span>
              </span>
            </h1>

            <p className="text-sm sm:text-base text-[#5C0614]/85 font-medium max-w-xl leading-relaxed">
              Experience dining transformed into a vintage amusement park. Wood-fired big top sourdough pizzas, spinning carousel pastas, and decadent midway sweets beneath the warm glow of chasing marquee lights.
            </p>

            {/* Action CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href="/concept-g/menu/"
                className="px-8 py-4 bg-[#C41E3A] hover:bg-[#a3162c] text-white font-black text-xs uppercase tracking-widest rounded-full border-2 border-[#FFD54F] shadow-[4px_4px_0px_#5C0614] hover:scale-[1.02] active:scale-95 transition-all inline-flex items-center gap-2"
              >
                <Ticket className="w-4 h-4 text-[#FFD54F]" />
                <span>EXPLORE ALL ATTRACTIONS</span>
              </Link>

              <Link
                href="/concept-g/reservations/"
                className="px-8 py-4 bg-white hover:bg-[#FFD54F] text-[#5C0614] font-black text-xs uppercase tracking-widest rounded-full border-2 border-[#5C0614] shadow-[4px_4px_0px_#C41E3A] hover:scale-[1.02] active:scale-95 transition-all"
              >
                BOOK TICKET BOOTH &rarr;
              </Link>
            </div>

            {/* Showtime Feature Bar */}
            <div className="pt-4 flex items-center gap-4 text-xs font-bold font-mono">
              <span className="px-3 py-1 bg-[#5C0614] text-[#FFD54F] rounded-full">
                DAILY CURTAIN CALL: 11:30 AM
              </span>
              <span className="text-[#5C0614]/70">ALL SEATS ADMITTED WITH COMPLIMENTARY POPCORN</span>
            </div>
          </div>

          {/* Hero Composition Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative border-6 border-[#C41E3A] bg-[#FFFDD0] rounded-3xl shadow-[12px_12px_0px_#5C0614] overflow-hidden group">
              <img
                src="/images/restaurant-interior.webp"
                alt="Circus Social Dining Saloon"
                className="w-full aspect-[4/3] object-cover group-hover:scale-105 transition-transform duration-700"
              />

              <div className="absolute top-4 right-4 bg-[#FFD54F] text-[#5C0614] font-black text-xs px-3 py-1.5 rounded-full border-2 border-[#5C0614] shadow-md flex items-center gap-1.5">
                <Star className="w-3.5 h-3.5 fill-[#5C0614]" />
                <span>CENTER RING SPECIAL</span>
              </div>

              <div className="absolute bottom-4 left-4 bg-[#5C0614] text-white font-black text-xs px-4 py-2 rounded-2xl border-2 border-[#FFD54F]">
                MARGHERITA PARADE &bull; HEARTH FIRED
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3 CARNIVAL ATTRACTION ZONES STRIP */}
      <section className="py-16 bg-[#FFFDD0] border-b-6 border-[#C41E3A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <span className="px-3 py-1 bg-[#C41E3A] text-white font-black text-[10px] uppercase tracking-widest rounded-full inline-block">
              ENTER THE MIDWAY
            </span>
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-[#5C0614] font-serif">
              THREE SPECTACULAR ACTS
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                ring: "ACT ONE: THE OVEN",
                title: "PIZZA PARADE",
                desc: "Hand-tossed sourdough blistered in our fiery dome hearth oven with organic toppings and fior di latte.",
                icon: "🎪",
                badge: "CRUNCH!!",
              },
              {
                ring: "ACT TWO: THE PASTA",
                title: "CAROUSEL NOODLES",
                desc: "Freshly extruded bronze-cut pastas twirled with pink cream, wild forest truffle, and slow-braised sauces.",
                icon: "🎠",
                badge: "SILKY!!",
              },
              {
                ring: "ACT THREE: THE FINALE",
                title: "SUGAR WONDERLAND",
                desc: "Fairground carnival desserts, velvety Basque cheesecakes, and spun sugar cold brew nitro concoctions.",
                icon: "🎡",
                badge: "SWEET!!",
              },
            ].map((act, idx) => (
              <div
                key={idx}
                className="bg-white border-4 border-[#C41E3A] rounded-3xl p-6 sm:p-8 space-y-4 shadow-[6px_6px_0px_#5C0614] hover:shadow-[10px_10px_0px_#FFD54F] transition-all hover:-translate-y-1"
              >
                <div className="flex items-center justify-between border-b-2 border-[#5C0614]/20 pb-3">
                  <span className="text-xs font-black text-[#C41E3A] font-mono">{act.ring}</span>
                  <span className="px-2.5 py-0.5 bg-[#FFD54F] text-[#5C0614] font-black text-[10px] rounded-full border border-[#5C0614]">
                    {act.badge}
                  </span>
                </div>
                <div className="text-4xl">{act.icon}</div>
                <h3 className="text-xl font-black uppercase text-[#5C0614] font-serif">{act.title}</h3>
                <p className="text-xs text-[#5C0614]/80 leading-relaxed font-medium">
                  {act.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED CARNIVAL DISHES */}
      <section className="py-20 bg-white border-b-6 border-[#C41E3A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12 gap-4">
            <div className="space-y-2">
              <span className="px-3 py-1 bg-[#FFD54F] text-[#5C0614] font-black text-[10px] uppercase tracking-widest rounded-full inline-block">
                CENTER RING BESTSELLERS
              </span>
              <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-[#5C0614] font-serif">
                Big Top Carte Attractions
              </h2>
              <p className="text-xs sm:text-sm text-[#5C0614]/80 font-medium max-w-lg">
                Freshly fetched from the unified backend database with real-time availability and add-to-cart controls.
              </p>
            </div>

            <Link
              href="/concept-g/menu/"
              className="px-6 py-3 bg-[#C41E3A] hover:bg-[#a3162c] text-white font-black text-xs uppercase tracking-widest rounded-full border-2 border-[#FFD54F] shadow-[4px_4px_0px_#5C0614] transition-colors"
            >
              EXPLORE ALL CARTE ATTRACTIONS &rarr;
            </Link>
          </div>

          {loading ? (
            <div className="py-24 text-center font-black text-sm text-[#C41E3A] tracking-widest">
              RAISING THE BIG TOP MARQUEE...
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {dishes.map((dish) => (
                <ConceptGFoodCard
                  key={dish.id}
                  item={dish}
                  onOpenLightbox={(item) => setActiveLightboxItem(item)}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* TICKET BOOTH RESERVATION CALLOUT STRIP */}
      <section className="py-16 bg-[#FFD54F] border-b-6 border-[#C41E3A] text-center space-y-6">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-4">
          <span className="px-4 py-1.5 bg-[#5C0614] text-[#FFD54F] font-black text-xs uppercase tracking-widest rounded-full inline-block">
            RESERVED SEATING &bull; TICKET BOOTH
          </span>
          <h2 className="text-3xl sm:text-6xl font-black uppercase tracking-tight text-[#5C0614] font-serif leading-tight">
            BOOK YOUR RINGSIDE TABLE
          </h2>
          <p className="text-sm font-bold text-[#5C0614]/80 max-w-md mx-auto">
            Secure priority seating in our Carousel Booth, Center Ring Saloon, or Lantern Garden. Every reserved table includes a complimentary carnival snack basket.
          </p>
          <div className="pt-2">
            <Link
              href="/concept-g/reservations/"
              className="inline-block px-10 py-4 bg-[#C41E3A] hover:bg-[#a3162c] text-white font-black text-xs uppercase tracking-widest rounded-full border-2 border-white shadow-[6px_6px_0px_#5C0614] transition-transform active:scale-95"
            >
              CLAIM YOUR CARNIVAL PASS &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <CinematicLightbox
        item={activeLightboxItem}
        onClose={() => setActiveLightboxItem(null)}
      />

      <ConceptGFooter />
    </div>
  );
}
