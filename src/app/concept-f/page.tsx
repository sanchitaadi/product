"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Zap, Star, ShieldCheck, Heart, Flame, Clock, Maximize2 } from "lucide-react";
import ConceptFHeader from "@/components/concept-f/Header";
import ConceptFFooter from "@/components/concept-f/Footer";
import ConceptFFoodCard from "@/components/concept-f/FoodCard";
import MangaLoader from "@/components/concept-f/MangaLoader";
import CinematicLightbox, { LightboxItem } from "@/components/shared/CinematicLightbox";
import * as api from "@/lib/api";

export default function ConceptFHomePage() {
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
    <div className="bg-[#FFFDF7] min-h-screen text-black flex flex-col font-sans selection:bg-[#FFE600] selection:text-black">
      <MangaLoader />
      <ConceptFHeader />

      {/* MANGA CINEMATIC HERO SECTION */}
      <section className="relative overflow-hidden border-b-4 border-black bg-white py-16 lg:py-24">
        {/* Manga Speed Lines Dynamic Background */}
        <div className="absolute inset-0 pointer-events-none opacity-10 [background:repeating-conic-gradient(#000_0_2deg,transparent_2deg_10deg)]" />
        <div className="absolute inset-0 pointer-events-none opacity-5 bg-[radial-gradient(#000_1.5px,transparent_1.5px)] [background-size:12px_12px]" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Comic Narrative & Typography */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#FFE600] text-black font-black text-xs uppercase tracking-widest border-2 border-black shadow-[3px_3px_0px_#000] -rotate-1">
              <Zap className="w-3.5 h-3.5 text-[#D7263D] fill-[#D7263D]" />
              <span>CHAPTER 01 &bull; THE CULINARY BATTLE BEGINS</span>
            </div>

            <h1 className="text-4xl sm:text-6xl xl:text-7xl font-black uppercase tracking-tighter text-black leading-[0.95]">
              TASTE THE DRAMA. <br />
              <span className="text-[#D7263D] relative inline-block">
                FEEL THE CRUNCH!
                <span className="absolute -top-3 -right-6 px-2 py-0.5 bg-[#FFE600] text-black text-xs font-black rotate-12 border border-black">
                  UMAI!!
                </span>
              </span>
            </h1>

            <p className="text-sm sm:text-base text-gray-700 font-bold max-w-xl leading-relaxed">
              Welcome to Peachy Plate Manga Bites &mdash; where artisanal Italian sourdough meets dynamic Japanese comic art direction. Sizzling hearth crusts, hand-rolled pastas, and vibrant onomatopoeic flavors!
            </p>

            {/* CTAs with Comic Shading */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href="/concept-f/menu/"
                className="px-8 py-4 bg-[#D7263D] hover:bg-[#b51f33] text-white font-black text-xs uppercase tracking-widest border-3 border-black shadow-[5px_5px_0px_#000] hover:translate-x-0.5 hover:translate-y-0.5 transition-all inline-flex items-center gap-2"
              >
                <span>OPEN COMIC MENU</span>
                <ArrowRight className="w-4 h-4 stroke-[3]" />
              </Link>

              <Link
                href="/concept-f/reservations/"
                className="px-7 py-4 bg-white hover:bg-[#FFE600] text-black font-black text-xs uppercase tracking-widest border-3 border-black shadow-[5px_5px_0px_#000] hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
              >
                RESERVE BOOTH TABLE &rarr;
              </Link>
            </div>

            {/* Sound Effect Quotes Strip */}
            <div className="pt-4 flex items-center gap-4 text-xs font-black font-mono">
              <span className="px-2 py-1 bg-black text-white">ドドド...</span>
              <span className="text-gray-600">OVER 10,000+ CHAPTERS SERVED FRESH</span>
            </div>
          </div>

          {/* Right Column: Hero Comic Panel Composition */}
          <div className="lg:col-span-5 relative">
            <div className="relative border-4 border-black bg-white shadow-[12px_12px_0px_#000] overflow-hidden group">
              {/* Main Manga Food Illustration / Photography */}
              <img
                src="/images/margherita-pizza.webp"
                alt="Signature Manga Sourdough Hearth"
                className="w-full aspect-[4/3] object-cover group-hover:scale-105 transition-transform duration-700"
              />

              {/* Action Burst Badge */}
              <div className="absolute top-4 right-4 bg-[#FFE600] text-black font-black text-xs px-3 py-1.5 border-3 border-black shadow-[3px_3px_0px_#000] rotate-6">
                🔥 HEARTH FIRED!
              </div>

              {/* Japanese Watermark */}
              <div className="absolute bottom-4 left-4 bg-black text-white font-black text-xs px-3 py-1 border-2 border-white shadow-[3px_3px_0px_#D7263D]">
                特製ピザ &bull; MARGHERITA SUPREME
              </div>
            </div>

            {/* Staggered Dialogue Bubble */}
            <div className="absolute -bottom-6 -left-6 bg-white border-3 border-black p-3.5 shadow-[5px_5px_0px_#D7263D] max-w-xs rotate-[-2deg] hidden sm:block">
              <span className="text-[10px] font-black uppercase text-[#D7263D] block">
                CHEF&apos;S SHOUT OUT:
              </span>
              <p className="text-xs font-black text-black">
                &ldquo;Fermented 48 hours for maximum shonen crunch power!&rdquo;
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* MANGA STRIP 3-PANEL STORYBOARD */}
      <section className="py-16 bg-[#FFFDF7] border-b-4 border-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <span className="px-3 py-1 bg-[#D7263D] text-white font-black text-[10px] uppercase tracking-widest border border-black inline-block">
              THE 3-STEP FEAST MANIFESTO
            </span>
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-black">
              HOW MANGA BITES WORKS
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                step: "PANEL 01",
                title: "SELECT YOUR WEAPON",
                jp: "選ぶ",
                desc: "Choose from ancient sourdough hearth pizzas, hand-extruded rigatoni, and decadent matcha treats.",
                icon: "🥢",
                badge: "CRUNCH!!",
              },
              {
                step: "PANEL 02",
                title: "STOKE THE FIRE",
                jp: "焼く",
                desc: "Every order is fired on-demand at 480°C with organic stone-ground grain and imported fior di latte.",
                icon: "🔥",
                badge: "BOOM!!",
              },
              {
                step: "PANEL 03",
                title: "EXPRESS DISPATCH",
                jp: "届く",
                desc: "High-speed courier transit straight to your doorstep or first-class dining booth in 30 minutes.",
                icon: "⚡",
                badge: "FAST!!",
              },
            ].map((p, idx) => (
              <div
                key={idx}
                className="bg-white border-4 border-black p-6 sm:p-8 space-y-4 shadow-[6px_6px_0px_#000] hover:shadow-[10px_10px_0px_#D7263D] transition-all hover:-translate-y-1"
              >
                <div className="flex items-center justify-between border-b-2 border-black pb-3">
                  <span className="text-xs font-black text-[#D7263D] font-mono">{p.step}</span>
                  <span className="px-2 py-0.5 bg-[#FFE600] text-black font-black text-[10px] border border-black">
                    {p.badge}
                  </span>
                </div>
                <div className="text-4xl">{p.icon}</div>
                <div>
                  <span className="text-[10px] font-bold text-gray-500 uppercase">{p.jp}</span>
                  <h3 className="text-xl font-black uppercase text-black">{p.title}</h3>
                </div>
                <p className="text-xs text-gray-700 leading-relaxed font-medium">
                  {p.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED MANGA DISHES (FROM REAL BACKEND) */}
      <section className="py-20 bg-white border-b-4 border-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12 gap-4">
            <div className="space-y-2">
              <span className="px-3 py-1 bg-[#FFE600] text-black font-black text-[10px] uppercase tracking-widest border border-black inline-block">
                WEEKLY BESTSELLER CHAPTERS
              </span>
              <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-black">
                Signature Comic Carte
              </h2>
              <p className="text-xs sm:text-sm text-gray-600 font-bold max-w-lg">
                Freshly fetched from the unified backend database. Customized with real-time add-to-cart controls.
              </p>
            </div>

            <Link
              href="/concept-f/menu/"
              className="px-6 py-3 bg-black hover:bg-[#D7263D] text-white font-black text-xs uppercase tracking-widest border-2 border-black shadow-[4px_4px_0px_#FFE600] transition-colors"
            >
              EXPLORE FULL 20+ DISH CARTE &rarr;
            </Link>
          </div>

          {loading ? (
            <div className="py-24 text-center font-black text-sm text-[#D7263D] tracking-widest">
              INKING MANGA PANELS FROM BACKEND...
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {dishes.map((dish) => (
                <ConceptFFoodCard
                  key={dish.id}
                  item={dish}
                  onOpenLightbox={(item) => setActiveLightboxItem(item)}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* RESERVATION / BOOTH CALLOUT STRIP */}
      <section className="py-16 bg-[#FFE600] border-b-4 border-black relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center space-y-6 relative z-10">
          <span className="px-4 py-1.5 bg-black text-[#FFE600] font-black text-xs uppercase tracking-widest border-2 border-black inline-block">
            VIP MANGA BOOTHS &bull; TABLE RESERVATIONS
          </span>
          <h2 className="text-3xl sm:text-6xl font-black uppercase tracking-tight text-black max-w-3xl mx-auto leading-tight">
            BOOK YOUR SEAT IN THE COMIC SALOON
          </h2>
          <p className="text-sm font-bold text-gray-800 max-w-md mx-auto">
            Reserve priority seating with authentic comic book wall art, neon Japanese signage, and full table service.
          </p>
          <div className="pt-2">
            <Link
              href="/concept-f/reservations/"
              className="inline-block px-10 py-4 bg-[#D7263D] hover:bg-[#b51f33] text-white font-black text-xs uppercase tracking-widest border-3 border-black shadow-[6px_6px_0px_#000] hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
            >
              CLAIM YOUR TABLE INK &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      <CinematicLightbox
        item={activeLightboxItem}
        onClose={() => setActiveLightboxItem(null)}
      />

      <ConceptFFooter />
    </div>
  );
}
