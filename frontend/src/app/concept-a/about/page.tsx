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
            🎀 The Origin &amp; Purity Philosophy
          </span>
          <h1 className="font-coquette-serif font-black text-4xl sm:text-5xl text-[#3D2D2E] leading-tight">
            A Love Affair with French Preserves, Cocoa &amp; Ribbons
          </h1>
          <p className="text-sm text-gray-600 leading-relaxed max-w-2xl mx-auto">
            Founded in 2026, Peachy Plate was born out of a desire to rescue pantry shelves from ultra-processed additives. We craft small-batch fruit preserves, stone-milled biscuits, and artisanal confections that taste like home and look like art.
          </p>
        </div>
      </section>

      <section className="py-20 flex-1">
        <div className="max-w-7xl mx-auto px-6 space-y-20">
          {/* Story Block 1 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-5">
              <span className="text-xs font-bold uppercase tracking-wider text-[#E07A86]">
                Our Atelier Heritage
              </span>
              <h2 className="font-coquette-serif font-bold text-3xl sm:text-4xl text-[#3D2D2E]">
                Copper-Kettle Cooking &amp; Real Vanilla Pods
              </h2>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                We believe that food packaged for the pantry shouldn&apos;t compromise on fresh craft. Our white peach compotes and slow-simmered tomato marinara sauces are stirred in traditional open copper kettles in small batches of no more than 60 jars at a time.
              </p>
              <div className="p-5 rounded-2xl bg-white border border-rose-100 shadow-sm space-y-2 text-xs">
                <span className="font-bold text-gray-900 block">✨ Clean Label Standards</span>
                <p className="text-gray-500">Zero artificial colors, zero corn syrup, zero palm oil. Hot-filled in reusable glass jars with foil tamper seals.</p>
              </div>
            </div>

            <div className="aspect-[4/3] rounded-3xl overflow-hidden border-4 border-white shadow-xl">
              <img src="/images/heroes/coquette-pantry-hero.jpg" alt="Atelier Crafting" className="w-full h-full object-cover" />
            </div>
          </div>

          {/* Story Block 2 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1 aspect-[4/3] rounded-3xl overflow-hidden border-4 border-white shadow-xl">
              <img src="/images/products/cocoa-hazelnut-cookies.jpg" alt="Artisan Butter Sablés & Preserves" className="w-full h-full object-cover" />
            </div>

            <div className="order-1 lg:order-2 space-y-5">
              <span className="text-xs font-bold uppercase tracking-wider text-[#E07A86]">
                Gifting &amp; Wholesale
              </span>
              <h2 className="font-coquette-serif font-bold text-3xl sm:text-4xl text-[#3D2D2E]">
                Crafted for Aesthetic Hampers &amp; Fine Grocers
              </h2>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                Whether you are curating luxury corporate hampers, stocking boutique coffee bar retail shelves, or sending a loved one an indulgent sweet box, each parcel is packed with eco-cushioning and hand-tied with our signature peach ribbon.
              </p>
              <Link
                href="/concept-a/reservations/"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#E07A86] to-[#F59E0B] text-white text-xs font-bold uppercase tracking-wider shadow-md"
              >
                <span>Wholesale &amp; Bulk Gifting Inquiries</span>
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
