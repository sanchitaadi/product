"use client";

import React from "react";
import Link from "next/link";
import { Leaf, ArrowRight, Sparkles } from "lucide-react";
import ConceptDHeader from "@/components/concept-d/Header";
import ConceptDFooter from "@/components/concept-d/Footer";

export default function ConceptDAboutPage() {
  return (
    <div className="bg-[#FDFBF7] min-h-screen text-[#1E3F20] flex flex-col font-serif selection:bg-[#7B8E78] selection:text-white">
      <ConceptDHeader />

      {/* Hero Banner */}
      <section className="bg-[#F2EFE9] py-20 border-b border-[#5E6B4E]/20 text-center space-y-3">
        <span className="text-[11px] uppercase tracking-widest text-[#7B8E78] block">
          Our Farmstead Heritage &bull; Est. 2026
        </span>
        <h1 className="text-4xl sm:text-6xl font-normal text-[#1E3F20] tracking-tight">
          Rooted in the Living Soil
        </h1>
        <p className="text-xs sm:text-sm text-[#5E6B4E] max-w-lg mx-auto font-light leading-relaxed">
          Peachy Earth was founded as a regenerative organic farmstead where heritage pantry provisions are cultivated slowly, cold-pressed with reverence, and bottled without chemicals.
        </p>
      </section>

      {/* Stories */}
      <section className="py-24 px-4 sm:px-6 max-w-7xl mx-auto w-full space-y-24">
        {/* Story 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-4">
            <span className="text-xs uppercase tracking-widest text-[#C86D51] block">
              I. The Seed &amp; The Hearth
            </span>
            <h2 className="text-3xl sm:text-4xl font-normal text-[#1E3F20] leading-tight">
              Honoring Ancient Emmer Wheat and Stone-Cold Milling
            </h2>
            <p className="text-xs sm:text-sm text-[#5E6B4E] leading-relaxed font-light">
              We reject industrial roller-milled flours stripped of their nutrients. In our farmstead mill, every grain of ancient Khapli emmer wheat is stone-milled slowly on natural granite millstones to preserve the living germ, vitamin E, and natural aromatic oils.
            </p>
            <div className="p-6 bg-[#F2EFE9] rounded-2xl border border-[#5E6B4E]/20 text-xs text-[#5E6B4E] space-y-1">
              <span className="font-semibold text-[#1E3F20] block">Provenance Notes</span>
              <p>Non-hybridized ancient heirloom grain varieties nurtured by women farmer cooperatives in the lower Himalayas.</p>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="rounded-3xl overflow-hidden border border-[#5E6B4E]/20 shadow-xl">
              <img
                src="/images/restaurant-kitchen.webp"
                alt="Baking with stone-ground flour"
                className="w-full aspect-[4/3] object-cover"
              />
            </div>
          </div>
        </div>

        {/* Story 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 order-2 lg:order-1">
            <div className="rounded-3xl overflow-hidden border border-[#5E6B4E]/20 shadow-xl">
              <img
                src="/images/restaurant-garden.webp"
                alt="Greenhouse Conservatory Dining"
                className="w-full aspect-[4/3] object-cover"
              />
            </div>
          </div>

          <div className="lg:col-span-6 order-1 lg:order-2 space-y-4">
            <span className="text-xs uppercase tracking-widest text-[#C86D51] block">
              II. The Farmland Sanctuary
            </span>
            <h2 className="text-3xl sm:text-4xl font-normal text-[#1E3F20] leading-tight">
              Pure Pantry Provisions for Mindful Homes
            </h2>
            <p className="text-xs sm:text-sm text-[#5E6B4E] leading-relaxed font-light">
              From unfiltered extra virgin olive oil cold-pressed within 3 hours of olive picking to raw multi-floral forest honey, every jar is sealed in amber glass to shield delicate antioxidants from light degradation.
            </p>
            <div className="pt-2">
              <Link
                href="/concept-d/reservations/"
                className="inline-flex items-center gap-2 bg-[#5E6B4E] hover:bg-[#4E5B3F] text-[#FDFBF7] text-xs font-sans uppercase tracking-widest px-6 py-3 rounded-full transition-colors"
              >
                <span>Wholesale &amp; Farm Share Inquiries</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <ConceptDFooter />
    </div>
  );
}
