"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Zap, Flame, ArrowRight, Star, Heart, Sparkles, Maximize2 } from "lucide-react";
import ConceptBHeader from "@/components/concept-b/Header";
import ConceptBFooter from "@/components/concept-b/Footer";
import RetroSoundProvider, { useRetroSound } from "@/components/concept-b/RetroSoundFX";
import RetroCustomCursor from "@/components/concept-b/RetroCustomCursor";
import RetroScrollProgress from "@/components/concept-b/RetroScrollProgress";
import CinematicLightbox, { LightboxItem } from "@/components/shared/CinematicLightbox";

function ConceptBAboutContent() {
  const [activeLightboxItem, setActiveLightboxItem] = useState<LightboxItem | null>(null);
  const { playCoin, playPop } = useRetroSound();

  return (
    <div className="bg-[#FFF9EC] min-h-screen text-black flex flex-col font-sans selection:bg-[#FFE15D] selection:text-black relative overflow-x-clip">
      {/* Top Retro Scroll Progress */}
      <RetroScrollProgress />

      {/* Desktop Custom Cursor */}
      <RetroCustomCursor />

      {/* Header */}
      <ConceptBHeader />

      {/* Hero Strip with Comic Banner */}
      <section className="py-14 md:py-20 bg-[#FFE15D] border-b-4 border-black relative overflow-hidden">
        <div className="absolute inset-0 pattern-comic-halftone opacity-25 pointer-events-none" />
        <div className="max-w-4xl mx-auto px-6 text-center space-y-4 relative z-10">
          <span className="px-4 py-1.5 bg-black text-[#FFE15D] text-xs font-retro-bold font-black uppercase tracking-wider inline-block rounded-xl border-2 border-black shadow-[3px_3px_0px_#FF2A55]">
            ⚡ THE RETRO ZINE &bull; ORIGIN STORY
          </span>
          <h1 className="font-retro-bold font-black text-4xl sm:text-7xl uppercase tracking-tight text-black">
            BUILT FOR FLAVOR JUNKIES
          </h1>
          <p className="text-sm sm:text-base font-bold text-stone-900 max-w-xl mx-auto leading-relaxed">
            We got sick of sterile beige cafes with lukewarm pizza and watery coffee. Peachy Plate was engineered in 2026 to be the loudest, crispiest culinary spot in Delhi.
          </p>
        </div>
      </section>

      {/* Main Magazine Story Sections */}
      <section className="py-20 flex-1">
        <div className="max-w-7xl mx-auto px-6 space-y-24">
          {/* Section 01 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <span className="text-xs font-retro-bold font-black uppercase text-[#FF2A55] tracking-widest bg-white border-2 border-black px-3 py-1 rounded-md inline-block shadow-[2px_2px_0px_#000]">
                ACT 01 // THE DOUGH EXPERIMENT
              </span>
              <h2 className="font-retro-bold font-black text-4xl sm:text-5xl leading-tight uppercase">
                48-HOUR NATURAL SOURDOUGH BUBBLE CRUST
              </h2>
              <p className="text-sm font-semibold text-stone-700 leading-relaxed">
                We ferment our dough for 2 full days using Italian unbleached Caputo flour. That means huge blistered air pockets, an insane chew, and zero bloat afterwards. Flash-baked at 500°C over hardwood fire in 90 seconds.
              </p>
              <div className="p-5 rounded-2xl bg-white border-4 border-black shadow-[5px_5px_0px_#000] text-xs font-bold space-y-1">
                <span className="text-[#FF2A55] font-retro-bold font-black text-sm block">
                  ⚡ SAN MARZANO REDUCTION
                </span>
                <span className="text-stone-700 font-semibold">
                  Real imported Italian plum tomatoes simmered with cold-harvest olive oil, garlic confit & freshly plucked sweet basil.
                </span>
              </div>
            </div>

            <div
              onClick={() => {
                playPop();
                setActiveLightboxItem({
                  id: "about-kitchen",
                  name: "The 500°C Fire Hearth",
                  category: "Kitchen Atelier",
                  image_url: "/images/restaurant-kitchen.webp",
                  description: "Our kitchen crew firing 48-hour sourdough Neapolitan pizzas at 500°C in New Delhi.",
                  conceptTheme: "retro",
                });
              }}
              className="aspect-[4/3] rounded-3xl overflow-hidden border-4 border-black shadow-[10px_10px_0px_#000] relative cursor-pointer group"
            >
              <img
                src="/images/restaurant-kitchen.webp"
                alt="Kitchen Prep"
                className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="px-4 py-2 rounded-xl bg-[#FFE15D] text-black border-2 border-black font-retro-bold font-black text-xs uppercase shadow-[2px_2px_0px_#000]">
                  CLICK TO VIEW FULLSCREEN
                </span>
              </div>
            </div>
          </div>

          {/* Section 02 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div
              onClick={() => {
                playPop();
                setActiveLightboxItem({
                  id: "about-dining",
                  name: "The Neon Diner Booths",
                  category: "Ambiance",
                  image_url: "/images/restaurant-dining.webp",
                  description: "Custom vintage diner booths, indie synth-pop records, and neon glow at 24 Garden Avenue.",
                  conceptTheme: "retro",
                });
              }}
              className="order-2 lg:order-1 aspect-[4/3] rounded-3xl overflow-hidden border-4 border-black shadow-[10px_10px_0px_#000] relative cursor-pointer group"
            >
              <img
                src="/images/restaurant-dining.webp"
                alt="Delhi Pop Dining"
                className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="px-4 py-2 rounded-xl bg-[#FFE15D] text-black border-2 border-black font-retro-bold font-black text-xs uppercase shadow-[2px_2px_0px_#000]">
                  CLICK TO VIEW FULLSCREEN
                </span>
              </div>
            </div>

            <div className="order-1 lg:order-2 space-y-6">
              <span className="text-xs font-retro-bold font-black uppercase text-[#FF2A55] tracking-widest bg-white border-2 border-black px-3 py-1 rounded-md inline-block shadow-[2px_2px_0px_#000]">
                ACT 02 // CULTURE FIRST
              </span>
              <h2 className="font-retro-bold font-black text-4xl sm:text-5xl leading-tight uppercase">
                NEON LIGHTS, INDIE BEATS &amp; ZERO PRETENSE
              </h2>
              <p className="text-sm font-semibold text-stone-700 leading-relaxed">
                Food should be an experience, not a chore. We built Peachy Plate with custom retro vinyl booths, vintage arcade posters, analog sound systems, and a crew that loves food as much as you do.
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <span className="px-3.5 py-1.5 bg-[#FFE15D] text-black border-2 border-black rounded-xl text-xs font-retro-bold font-black shadow-[2px_2px_0px_#000]">
                  🎸 INDIE SYNTH-POP PLAYLISTS
                </span>
                <span className="px-3.5 py-1.5 bg-[#FF2A55] text-white border-2 border-black rounded-xl text-xs font-retro-bold font-black shadow-[2px_2px_0px_#000]">
                  ⚡ VINYL BOOTH SEATING
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Strip */}
      <section className="py-16 bg-[#121212] text-white text-center border-t-4 border-black space-y-4">
        <h3 className="font-retro-bold font-black text-3xl sm:text-5xl uppercase text-[#FFE15D]">
          HUNGRY YET? GRAB A SLICE
        </h3>
        <p className="text-xs sm:text-sm font-bold text-stone-400 max-w-md mx-auto">
          Explore our wood-fired sourdough pizzas, loaded pastas, and ice cold matcha lattes.
        </p>
        <div className="pt-2">
          <Link
            href="/concept-b/menu/"
            onClick={playCoin}
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#FF2A55] hover:bg-[#E60033] text-white font-retro-bold font-black text-xs uppercase tracking-wider rounded-2xl border-2 border-black shadow-[4px_4px_0px_#FFE15D] hover:translate-x-[-2px] hover:translate-y-[-2px] transition"
          >
            <span>BROWSE THE FULL MENU 🍕</span>
            <ArrowRight className="w-4 h-4 stroke-[3]" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <ConceptBFooter />

      {/* Cinema Lightbox */}
      <CinematicLightbox
        item={activeLightboxItem}
        onClose={() => setActiveLightboxItem(null)}
      />
    </div>
  );
}

export default function ConceptBAboutPage() {
  return (
    <RetroSoundProvider>
      <ConceptBAboutContent />
    </RetroSoundProvider>
  );
}
