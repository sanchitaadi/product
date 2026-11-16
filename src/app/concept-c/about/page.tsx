"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Zap, Sparkles, Flame, Eye, Heart } from "lucide-react";
import ConceptCHeader from "@/components/concept-c/Header";
import ConceptCFooter from "@/components/concept-c/Footer";

export default function ConceptCAboutPage() {
  return (
    <div className="bg-[#FFFDF7] min-h-screen text-[#111111] flex flex-col font-sans selection:bg-[#FFE600] selection:text-black">
      <ConceptCHeader />

      {/* Manifesto Hero */}
      <section className="bg-[#0047FF] text-white py-20 border-b-4 border-black relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center space-y-4 relative z-10">
          <span className="bg-[#FFE600] text-black text-xs font-black uppercase px-3 py-1 border-2 border-black inline-block -rotate-2">
            ★ THE FLAVOR MANIFESTO ★
          </span>
          <h1 className="text-4xl sm:text-7xl font-black uppercase tracking-tighter text-white">
            REJECT THE ORDINARY. <br />
            <span className="text-[#FFE600]">EAT IN FULL COLOR.</span>
          </h1>
          <p className="text-base sm:text-lg font-bold text-white/90 max-w-2xl mx-auto leading-relaxed">
            We built Peachy Pop as an antidote to bland, chemical-laden condiment aisles and boring snack bags. Food is pop art &mdash; vibrant, loud, punchy, and 100% clean-label.
          </p>
        </div>
      </section>

      {/* Pillars Section */}
      <section className="py-20 px-4 sm:px-6 max-w-7xl mx-auto w-full space-y-20">
        {/* Story 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 space-y-4">
            <span className="bg-[#FF007F] text-white text-xs font-black uppercase px-2.5 py-0.5 border border-black inline-block">
              ACT 01 &bull; THE FLAVOR LAB
            </span>
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-black">
              AN ARCHIVE OF CHILI &amp; SPICE EXPERIMENTS
            </h2>
            <p className="text-sm sm:text-base font-bold text-gray-700 leading-relaxed">
              We started with a simple belief: packaged condiments and snacks shouldn&apos;t be loaded with fillers and artificial dyes. In our pilot flavor lab, we slow-roast fermented peppers, cold-press aromatic seeds, and create mouth-igniting chili crunch jars sealed in collector-edition packaging.
            </p>
            <div className="p-4 bg-[#FFE600] border-3 border-black text-xs font-black uppercase shadow-[4px_4px_0px_#000]">
              &ldquo;ART IS WHAT YOU CAN GET AWAY WITH — AND GASTRONOMY IS THE GREATEST ART OF ALL.&rdquo;
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative bg-black border-4 border-black p-3 shadow-[8px_8px_0px_#FF007F]">
              <img
                src="/images/heroes/pop-art-hero.jpg"
                alt="Pop Art Bottling Lab"
                className="w-full aspect-[4/3] object-cover border-2 border-white"
              />
              <span className="absolute bottom-6 right-6 bg-[#0047FF] text-white text-xs font-black uppercase px-3 py-1 border-2 border-black rotate-3">
                🔥 SMALL-BATCH BOTTLING
              </span>
            </div>
          </div>
        </div>

        {/* Story 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 order-2 lg:order-1">
            <div className="relative bg-black border-4 border-black p-3 shadow-[8px_8px_0px_#0047FF]">
              <img
                src="/images/products/habanero-hot-sauce.jpg"
                alt="Pop Art Condiment Packaging"
                className="w-full aspect-[4/3] object-cover border-2 border-white"
              />
              <span className="absolute top-6 left-6 bg-[#FFE600] text-black text-xs font-black uppercase px-3 py-1 border-2 border-black -rotate-3">
                🎨 PACKAGING EXHIBITIONS
              </span>
            </div>
          </div>

          <div className="lg:col-span-6 order-1 lg:order-2 space-y-4">
            <span className="bg-[#0047FF] text-white text-xs font-black uppercase px-2.5 py-0.5 border border-black inline-block">
              ACT 02 &bull; PACKAGING ART
            </span>
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-black">
              WHERE CONTEMPORARY ART MEETS GOURMET PANTRY
            </h2>
            <p className="text-sm sm:text-base font-bold text-gray-700 leading-relaxed">
              Every bottle label, pouch wrap, and tin can was commissioned from contemporary poster artists, typography designers, and screenprinters. We turn your kitchen shelves into a living modern art museum.
            </p>
            <div className="flex items-center gap-4 pt-2">
              <Link
                href="/concept-c/reservations/"
                className="bg-[#FF007F] hover:bg-black text-white font-black uppercase text-xs px-6 py-3 border-2 border-black shadow-[3px_3px_0px_#000] transition-colors"
              >
                WHOLESALE &amp; STOCKIST INQUIRY
              </Link>
              <Link
                href="/concept-c/gallery/"
                className="bg-white hover:bg-[#FFE600] text-black font-black uppercase text-xs px-6 py-3 border-2 border-black shadow-[3px_3px_0px_#000] transition-colors"
              >
                VIEW PACKAGING VAULT &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>

      <ConceptCFooter />
    </div>
  );
}
