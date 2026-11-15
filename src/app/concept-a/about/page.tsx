"use client";

import React from "react";
import Link from "next/link";
import { Sparkles, Heart, ChefHat, Award, ArrowRight } from "lucide-react";
import ConceptAHeader from "@/components/concept-a/Header";
import ConceptAFooter from "@/components/concept-a/Footer";

export default function ConceptAAboutPage() {
  return (
    <div className="bg-[#FFF8F9] min-h-screen text-[#3D2D2E] flex flex-col">
      <ConceptAHeader />

      <section className="pt-12 pb-16 border-b border-rose-100 bg-[#FFF0F3]/40">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-4">
          <span className="text-xs font-bold text-[#E07A86] uppercase tracking-wider block">
            🎀 The Origin & Philosophy
          </span>
          <h1 className="font-coquette-serif font-black text-4xl sm:text-5xl text-[#3D2D2E] leading-tight">
            A Love Affair with Dough, Cream & Ribbons
          </h1>
          <p className="text-sm text-gray-600 leading-relaxed max-w-2xl mx-auto">
            Founded in 2026 at 24 Garden Avenue, Peachy Plate was born out of a desire to create a sanctuary where high culinary technique meets warm, dreamy Pinterest aesthetics.
          </p>
        </div>
      </section>

      <section className="py-20 flex-1">
        <div className="max-w-7xl mx-auto px-6 space-y-20">
          {/* Story Block 1 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-5">
              <span className="text-xs font-bold uppercase tracking-wider text-[#E07A86]">
                Our Kitchen Heritage
              </span>
              <h2 className="font-coquette-serif font-bold text-3xl sm:text-4xl text-[#3D2D2E]">
                48-Hour Fermentation & Bronze-Die Pastas
              </h2>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                We believe that food made with patience simply tastes better. Our sourdough pizza dough rests for 48 hours to create a crust that is airy, blistered, and easy on the digestion. Our bronze-die rigatoni and tagliolini grip our velvety pink rosa sauce like an embrace.
              </p>
              <div className="p-5 rounded-2xl bg-white border border-rose-100 shadow-sm space-y-2 text-xs">
                <span className="font-bold text-gray-900 block">✨ Pure Ingredients</span>
                <p className="text-gray-500">San Marzano tomatoes, imported Pugliese burrata, farm-fresh basil, and raw mountain honey.</p>
              </div>
            </div>

            <div className="aspect-[4/3] rounded-3xl overflow-hidden border-4 border-white shadow-xl">
              <img src="/images/restaurant-kitchen.webp" alt="Kitchen Crafting" className="w-full h-full object-cover" />
            </div>
          </div>

          {/* Story Block 2 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1 aspect-[4/3] rounded-3xl overflow-hidden border-4 border-white shadow-xl">
              <img src="/images/restaurant-garden.webp" alt="Garden Avenue Dining" className="w-full h-full object-cover" />
            </div>

            <div className="order-1 lg:order-2 space-y-5">
              <span className="text-xs font-bold uppercase tracking-wider text-[#E07A86]">
                The Atmosphere
              </span>
              <h2 className="font-coquette-serif font-bold text-3xl sm:text-4xl text-[#3D2D2E]">
                Pastel Comfort for Special Memories
              </h2>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                Whether you are celebrating a graduation, sharing a birthday with best friends, or enjoying a quiet solo afternoon latte with a good novel, Peachy Plate was designed to wrap you in warmth and sweet memories.
              </p>
              <Link
                href="/concept-a/reservations/"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#E07A86] to-[#F59E0B] text-white text-xs font-bold uppercase tracking-wider shadow-md"
              >
                <span>Reserve a Conservatory Table</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <ConceptAFooter />
    </div>
  );
}
