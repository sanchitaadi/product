"use client";

import React from "react";
import Link from "next/link";
import { Sparkles, ShieldCheck, Award, ArrowRight, CheckCircle2 } from "lucide-react";
import ConceptAHeader from "@/components/concept-a/Header";
import ConceptAFooter from "@/components/concept-a/Footer";

export default function ConceptAAboutPage() {
  return (
    <div className="bg-[#0A0B0E] min-h-screen text-[#F7F5F0] flex flex-col selection:bg-[#C5A059] selection:text-[#0A0B0E]">
      <ConceptAHeader />

      <section className="pt-16 pb-16 border-b border-[#C5A059]/20 bg-[#0E1015]">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-4">
          <span className="text-xs font-mono font-bold text-[#C5A059] uppercase tracking-widest block">
            ✦ The Maison Reserve Provenance &bull; Single-Estate Mastery
          </span>
          <h1 className="font-serif font-black text-4xl sm:text-5xl text-[#F7F5F0] leading-tight">
            Single-Estate Cacao, Wild Forest Hives &amp; Precision Conching
          </h1>
          <p className="text-sm text-[#A89F91] leading-relaxed max-w-2xl mx-auto font-light">
            Founded in 2026, Maison Reserve was conceived to deliver collector-grade pantry provisions and single-estate chocolates direct to discerning homes. Every slab and jar is crafted without compromise, using heirloom varieties, volcanic soils, and cold-chain integrity.
          </p>
        </div>
      </section>

      <section className="py-24 flex-1">
        <div className="max-w-7xl mx-auto px-6 space-y-24">
          {/* Story Block 1 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-5">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#C5A059]">
                ✦ Single-Estate Terroir
              </span>
              <h2 className="font-serif font-bold text-3xl sm:text-4xl text-[#F7F5F0]">
                72-Hour Granite Stone Conching &amp; Pure Cacao Butter
              </h2>
              <p className="text-xs sm:text-sm text-[#D1C7BD] leading-relaxed font-light">
                Our shaded Malabar forest cacao pods are harvested by generational farm hands, naturally wild-fermented in wooden sweat boxes, sun-dried on bamboo mats, and stone-conched with granite rollers for 72 continuous hours. No artificial emulsifiers, no defatted powder — only pure single-estate cacao and cold-pressed cacao butter.
              </p>
              <div className="p-5 rounded-xl bg-[#13151A] border border-[#C5A059]/30 space-y-2 text-xs">
                <span className="font-serif font-bold text-[#F7F5F0] block flex items-center gap-2">
                  <span className="text-[#C5A059]">✦</span> Zero Defatted Fillers &bull; Pure Clean Label
                </span>
                <p className="text-[#A89F91]">Hermetically sealed in multi-layer gold foil and rigid embossed boxes to preserve volatile fruit and floral terpenes for up to 18 months.</p>
              </div>
            </div>

            <div className="aspect-[4/3] rounded-3xl overflow-hidden border-2 border-[#C5A059]/40 shadow-2xl bg-[#16181F]">
              <img src="/images/heroes/noir-reserve-hero.jpg" alt="Maison Reserve Cacao Atelier" className="w-full h-full object-cover" />
            </div>
          </div>

          {/* Story Block 2 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1 aspect-[4/3] rounded-3xl overflow-hidden border-2 border-[#C5A059]/40 shadow-2xl bg-[#16181F]">
              <img src="/images/products/noir-truffle-honey.jpg" alt="Raw Himalayan Wild Honeycomb" className="w-full h-full object-cover" />
            </div>

            <div className="order-1 lg:order-2 space-y-5">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#C5A059]">
                ✦ Bespoke Curation
              </span>
              <h2 className="font-serif font-bold text-3xl sm:text-4xl text-[#F7F5F0]">
                Private Stockist Suites &amp; Luxury Corporate Chests
              </h2>
              <p className="text-xs sm:text-sm text-[#D1C7BD] leading-relaxed font-light">
                Whether curating executive gifting suites for boardrooms, stocking five-star hotel boutique larders, or delighting high-net-worth clients, each parcel is packed with temperature-buffering honeycomb inserts and sealed with authentic black wax stamps.
              </p>
              <Link
                href="/concept-a/reservations/"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-[#C5A059] via-[#D4AF37] to-[#B38F46] text-[#0A0B0E] text-xs font-bold uppercase tracking-widest shadow-xl shadow-[#C5A059]/20 hover:brightness-110 transition"
              >
                <span>Inquire Corporate &amp; Luxury Gifting</span>
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
