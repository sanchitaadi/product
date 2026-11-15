"use client";

import React from "react";
import Link from "next/link";
import { Zap, ArrowRight, Sparkles, Heart } from "lucide-react";
import ConceptFHeader from "@/components/concept-f/Header";
import ConceptFFooter from "@/components/concept-f/Footer";

export default function ConceptFAboutPage() {
  const chapters = [
    {
      num: "EPISODE 01",
      title: "THE FLOUR ALCHEMIST",
      jp: "生地の錬金術師",
      sfx: "ざわ... ZAWA",
      desc: "Our story begins at 4:00 AM with stone-ground heritage wheat and wild natural sourdough mother. Fermented for 48 hours to unlock maximum airy crust pockets and digestible richness.",
      quote: "“Dough is not merely an ingredient; it is a living character with personality and spirit!”",
      img: "/images/restaurant-kitchen.webp",
    },
    {
      num: "EPISODE 02",
      title: "THE FIRE DRAGON HEARTH",
      jp: "炎の炉",
      sfx: "ゴオオオ... ROAR!!",
      desc: "Inside our bespoke stone dome oven, dried applewood and oak fire up to an incandescent 480°C. In just 90 seconds, the raw circle transforms into blistered, leopard-spotted perfection.",
      quote: "“When the fire roars, the crust dances. That is the essence of hearth shonen energy!”",
      img: "/images/margherita-pizza.webp",
    },
    {
      num: "EPISODE 03",
      title: "THE COMIC DINING SALOON",
      jp: "漫画酒場",
      sfx: "ドドド... DON!!",
      desc: "Connaught Place, New Delhi meets Akihabara. We created a space lined with hand-inked manga murals, Japanese neon signage, retro arcade corners, and first-class velvet booths.",
      quote: "“A restaurant where eating feels like turning the pages of your favorite manga magazine.”",
      img: "/images/restaurant-interior.webp",
    },
    {
      num: "EPISODE 04",
      title: "THE SOUND OF UMAMI",
      jp: "旨味の響き",
      sfx: "美味しい!! UMAI!!",
      desc: "From the first snap of our sourdough crust to the creamy silkiness of wild mushroom truffle rigatoni, every plate delivers undeniable, comic-worthy happiness.",
      quote: "“Every guest leaves with a full belly and the energy of a manga protagonist!”",
      img: "/images/restaurant-garden.webp",
    },
  ];

  return (
    <div className="bg-[#FFFDF7] min-h-screen text-black flex flex-col font-sans selection:bg-[#FFE600] selection:text-black">
      <ConceptFHeader />

      {/* Manga Header Banner */}
      <section className="bg-white py-16 border-b-4 border-black text-center space-y-4 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-10 [background:repeating-conic-gradient(#000_0_2deg,transparent_2deg_10deg)]" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#FFE600] text-black font-black text-xs uppercase tracking-widest border-2 border-black shadow-[3px_3px_0px_#000] -rotate-1">
            <Zap className="w-3.5 h-3.5 text-[#D7263D] fill-[#D7263D]" />
            ORIGIN STORY &bull; CHAPTER 02
          </div>
          <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-black">
            The Legend of Manga Bites
          </h1>
          <p className="text-xs sm:text-sm text-gray-700 font-bold max-w-lg mx-auto">
            How a passion for wood-fired Italian artisanal dough fused with Japanese manga storytelling.
          </p>
        </div>
      </section>

      {/* Chapter Story Panels */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-16 flex-1 w-full space-y-16">
        {chapters.map((ch, idx) => {
          const isEven = idx % 2 === 1;
          return (
            <div
              key={ch.num}
              className={`grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white border-4 border-black p-6 sm:p-10 shadow-[10px_10px_0px_#000] ${
                isEven ? "lg:flex-row-reverse" : ""
              }`}
            >
              {/* Image Panel */}
              <div className={`lg:col-span-5 relative ${isEven ? "lg:order-2" : ""}`}>
                <div className="border-3 border-black overflow-hidden bg-black shadow-[6px_6px_0px_#D7263D] relative group">
                  <img
                    src={ch.img}
                    alt={ch.title}
                    className="w-full aspect-[4/3] object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-3 left-3 bg-[#FFE600] text-black font-black text-xs px-2.5 py-1 border-2 border-black shadow-[2px_2px_0px_#000]">
                    {ch.sfx}
                  </div>
                </div>
              </div>

              {/* Text Dialogue Panel */}
              <div className={`lg:col-span-7 space-y-4 ${isEven ? "lg:order-1" : ""}`}>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 bg-black text-[#FFE600] font-mono text-[10px] font-black uppercase">
                    {ch.num}
                  </span>
                  <span className="text-xs font-black text-gray-400 uppercase font-mono">
                    {ch.jp}
                  </span>
                </div>

                <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-black">
                  {ch.title}
                </h2>

                <p className="text-sm text-gray-700 font-medium leading-relaxed">
                  {ch.desc}
                </p>

                {/* Comic Speech Bubble Quote */}
                <div className="p-4 bg-[#FFFDF7] border-2 border-black relative rounded-xl shadow-[3px_3px_0px_#000]">
                  <p className="text-xs font-black text-black italic">
                    {ch.quote}
                  </p>
                </div>
              </div>
            </div>
          );
        })}

        {/* Bottom CTA Panel */}
        <div className="p-10 bg-[#FFE600] border-4 border-black text-center space-y-6 shadow-[10px_10px_0px_#000]">
          <h3 className="text-3xl sm:text-5xl font-black uppercase text-black">
            BECOME PART OF OUR STORY
          </h3>
          <p className="text-xs sm:text-sm font-bold text-gray-800 max-w-md mx-auto">
            Order your favorite comic dishes online or reserve a table booth in our New Delhi studio dining room.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/concept-f/menu/"
              className="px-8 py-3.5 bg-black text-white font-black text-xs uppercase tracking-widest border-2 border-black shadow-[4px_4px_0px_#D7263D] hover:bg-[#D7263D] transition-colors"
            >
              EXPLORE THE CARTE &rarr;
            </Link>
            <Link
              href="/concept-f/reservations/"
              className="px-8 py-3.5 bg-white text-black font-black text-xs uppercase tracking-widest border-2 border-black shadow-[4px_4px_0px_#000] hover:bg-gray-100 transition-colors"
            >
              BOOK COMIC BOOTH &rarr;
            </Link>
          </div>
        </div>
      </main>

      <ConceptFFooter />
    </div>
  );
}
