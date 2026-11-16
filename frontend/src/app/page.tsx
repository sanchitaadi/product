"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Sparkles, Zap, ShieldCheck } from "lucide-react";

export default function PresentationHubPage() {
  const masterConcepts = [
    {
      id: "concept-a",
      title: "Sample 01: Maison Reserve (Haute Cacao & Luxury)",
      subtitle: "Single-Estate Bean-to-Bar Chocolates & Reserve Provisions",
      badge: "85% Grand Cru • Noir & Gold • Climate Cold-Chain",
      tagline: "Single-estate 85% dark cacao slabs, raw Himalayan wild honeycomb jars, 24K gold-dusted butter sablés, and cold-extracted coffee elixirs in matte noir luxury packaging.",
      color: "from-[#1A1C23] via-[#0D0E11] to-[#16181F]",
      accent: "#C5A059",
      border: "border-2 border-[#C5A059]/60 shadow-[6px_6px_0px_#C5A059]/40",
      icon: "✦",
      link: "/concept-a/",
      sampleHero: "Haute Cacao & Reserve Gourmet Pantry ✦",
      sampleProducts: ["Single-Estate 85% Bean-to-Bar Dark Cacao (80g)", "24K Gold-Dusted Normandy Butter Sablés (200g)", "Raw Himalayan Wild Honeycomb Hex Jar (350g)"],
      features: ["Gold-Foil Nitrogen Barrier Seals", "Climate-Insulated Express Air Courier", "Private Corporate Gifting & Hotel Suites", "72-Hour Granite Stone Conching"],
      previewImg: "/images/heroes/noir-reserve-hero.jpg",
    },
    {
      id: "concept-b",
      title: "Sample 02: Retro 90s Snack Bodega",
      subtitle: "Air-Popped Crisps & CPG Soda Dispensary",
      badge: "Air-Popped • High Crunch • 90s CPG",
      tagline: "Air-popped ancient sorghum crisps, kettle sea-salt potato chips, prebiotic botanical soda cans, and hickory-smoked savory jerky with 90s comic swagger.",
      color: "from-[#FFE15D] via-[#FFF4D2] to-[#FF6B35]/20",
      accent: "#FF2A55",
      border: "border-4 border-black shadow-[6px_6px_0px_#000]",
      icon: "⚡",
      link: "/concept-b/",
      sampleHero: "AIR-POPPED CRUNCH. PREBIOTIC FIZZ.",
      sampleProducts: ["Truffle Sorghum Air-Popped Crisps (150g)", "Prebiotic White Peach Botanical Soda (330ml)", "Kettle Sea Salt & Malt Crisps (140g)"],
      features: ["8-Bit Web Audio Sound Effects", "3D Cursor Tilt Product Cards", "Nitrogen-Flushed 12M Seal", "B2B Retail Shelf Distributor Pass"],
      previewImg: "/images/products/gourmet-sorghum-crisps.jpg",
    },
    {
      id: "concept-c",
      title: "Sample 03: Maximalist Pop Art Flavor Lab",
      subtitle: "Hyper-Flavor Hot Sauces & Street Dips",
      badge: "Hyper-Flavor • Graphic • D2C Drops",
      tagline: "Warhol-inspired hot sauce bottles, fiery artisan Sichuan chili crunch, sun-dried tapenades, and collectible packaging designed to disrupt the bland condiment aisle.",
      color: "from-[#FF007F] via-[#FFE600] to-[#0047FF]",
      accent: "#FF007F",
      border: "border-4 border-black shadow-[6px_6px_0px_#FF007F]",
      icon: "🎨",
      link: "/concept-c/",
      sampleHero: "TASTE THE LOUD REVOLUTION",
      sampleProducts: ["Electric Habanero Pop Glaze (250ml)", "Sichuan Umami Chili Crunch Jar (200g)", "Citrus Yuzu Fizz Botanical Tonic (330ml)"],
      features: ["Memphis Milano Color-Blocking", "Collector Edition Bottle Wraps", "Museum & Boutique Stockist Suite", "Hyper-Flavor Clean Formulations"],
      previewImg: "/images/heroes/pop-art-hero.jpg",
    },
    {
      id: "concept-d",
      title: "Sample 04: Pure Organic Earth",
      subtitle: "Regenerative Farmland Pantry Provisions",
      badge: "100% Organic • Single-Estate • Ancient Grains",
      tagline: "Stone-ground Khapli ancient emmer flour, cold-pressed single-estate extra virgin olive oil, raw Himalayan wildflower forest honey, and hand-cracked Kashmiri walnuts.",
      color: "from-[#7B8E78] via-[#F2EFE9] to-[#C86D51]",
      accent: "#5E6B4E",
      border: "border-2 border-[#5E6B4E]/40 shadow-[6px_6px_0px_#5E6B4E]/20",
      icon: "🌿",
      link: "/concept-d/",
      sampleHero: "Grounded by Nature. Packed with Patience.",
      sampleProducts: ["Single-Estate Cold-Pressed EVOO (500ml)", "Stone-Ground Khapli Emmer Flour (1kg)", "Raw Himalayan Wildflower Honey (350g)"],
      features: ["Granite Stone-Milling Provenance", "Dark Glass Polyphenol Protection", "Community Farm Share Subscription", "Zero Chemical Pesticides / GMOs"],
      previewImg: "/images/heroes/organic-earth-hero.jpg",
    },
  ];

  const extendedConcepts = [
    {
      id: "concept-e",
      title: "Concept E — Metro Bites",
      badge: "Express Cargo • Railway Packs",
      tagline: "Transit departure board timetable, interactive rail product line maps, and fast-dispatch pantry cargo.",
      link: "/concept-e/",
      icon: "🚆",
      accent: "#FFD100",
    },
    {
      id: "concept-f",
      title: "Concept F — Manga Bites",
      badge: "Shonen • Comic Packs",
      tagline: "Dynamic speed-line action, manga comic panels, and serialized artisan pantry provisioning.",
      link: "/concept-f/",
      icon: "🍜",
      accent: "#D7263D",
    },
    {
      id: "concept-g",
      title: "Concept G — Circus Social",
      badge: "Big Top • Fairground Treats",
      tagline: "Golden admission tickets, chasing marquee lights, and whimsical fairground confections.",
      link: "/concept-g/",
      icon: "🎪",
      accent: "#FFD54F",
    },
  ];

  return (
    <div className="min-h-screen bg-[#FFFDF9] text-[#121212] selection:bg-rose-200 selection:text-rose-900 pb-24">
      {/* Top Header */}
      <header className="border-b border-black/5 bg-white/80 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-3xl">🍑</span>
            <div>
              <span className="font-serif font-black tracking-wider text-xl text-[#2B2118]">
                PEACHY PLATE
              </span>
              <span className="text-[10px] uppercase tracking-widest text-[#E07A86] block font-bold">
                Food Product &amp; D2C Brand Ecosystem
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/admin/"
              className="text-xs font-bold px-4 py-2.5 rounded-full bg-slate-900 text-white hover:bg-black transition flex items-center gap-1.5 shadow-sm"
            >
              <span>Product &amp; Wholesale Admin</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-indigo-400" />
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Intro */}
      <section className="max-w-5xl mx-auto px-6 pt-16 pb-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-50 border border-amber-200/80 text-amber-900 text-xs font-bold tracking-wide uppercase mb-6"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-600" />
          <span>4 Fully Made Sample Food Product Designs &bull; Production Ready</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-6xl font-serif font-black tracking-tight text-[#2B2118] leading-[1.15]"
        >
          Four Ready Design Directions for{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E07A86] via-[#FF6B35] to-[#FF2A55]">
            Peachy Plate Food Products
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto mt-5 leading-relaxed"
        >
          We have fully converted the entire website architecture into a complete packaged food brand. Below are <strong>4 fully made, distinctive sample designs</strong> with authentic packaged product specifications (net weights, shelf life, pack bundle variants, and B2B wholesale portals).
        </motion.p>
      </section>

      {/* 4 MASTER FOOD PRODUCT DESIGN SAMPLES */}
      <section className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
        {masterConcepts.map((concept, idx) => (
          <motion.div
            key={concept.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 + idx * 0.08 }}
            className={`rounded-3xl overflow-hidden border flex flex-col justify-between transition hover:-translate-y-2 duration-300 ${concept.border} bg-white shadow-xl`}
          >
            <div>
              {/* Image Preview Banner */}
              <div className="relative h-60 overflow-hidden group">
                <img
                  src={concept.previewImg}
                  alt={concept.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-6 text-white">
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-3xl">{concept.icon}</span>
                    <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white/20 backdrop-blur-md border border-white/30 text-white">
                      {concept.badge}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold font-serif leading-tight">{concept.title}</h3>
                  <span className="text-xs text-amber-300 font-medium">{concept.subtitle}</span>
                </div>
              </div>

              {/* Body Content */}
              <div className="p-6 space-y-4">
                <p className="text-xs text-gray-600 leading-relaxed">{concept.tagline}</p>

                {/* Sample Products Pills */}
                <div className="p-3.5 bg-stone-50 rounded-2xl border border-stone-200/70 space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500 block">
                    Sample Product Lineup
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {concept.sampleProducts.map((p, pidx) => (
                      <span
                        key={pidx}
                        className="text-[11px] font-semibold bg-white border border-stone-200 px-2.5 py-1 rounded-lg text-stone-800 shadow-2xs"
                      >
                        {p}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Feature Checklist */}
                <div className="space-y-1.5 pt-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block">
                    Brand DNA &amp; E-Commerce Capabilities
                  </span>
                  <ul className="text-xs space-y-1.5 text-gray-700">
                    {concept.features.map((feat, fidx) => (
                      <li key={fidx} className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: concept.accent }} />
                        <span className="font-medium">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Launch Action Footer */}
            <div className="p-6 pt-0">
              <Link
                href={concept.link}
                className="w-full py-4 rounded-2xl font-bold text-xs text-center flex items-center justify-center gap-2 transition bg-black text-white hover:bg-gray-800 shadow-md uppercase tracking-wider"
              >
                <span>Launch {concept.title}</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        ))}
      </section>

      {/* Additional Specialized Concept Extensions */}
      <section className="max-w-7xl mx-auto px-6 mt-16 space-y-6">
        <div className="border-t border-stone-200 pt-10 text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-stone-400">
            Bonus Specialized Design Expressions
          </span>
          <h3 className="text-2xl font-serif font-bold text-stone-800 mt-1">
            Need More Experimental Flavor? 3 Additional Concepts
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {extendedConcepts.map((ext) => (
            <Link
              key={ext.id}
              href={ext.link}
              className="p-5 rounded-2xl bg-white border border-stone-200/80 hover:border-black shadow-sm hover:shadow-md transition-all flex items-center justify-between group"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xl">{ext.icon}</span>
                  <h4 className="font-bold text-sm text-stone-900 group-hover:text-[#E07A86] transition-colors">
                    {ext.title}
                  </h4>
                </div>
                <p className="text-xs text-stone-500 leading-snug line-clamp-2">{ext.tagline}</p>
              </div>
              <ArrowUpRight className="w-4 h-4 text-stone-400 group-hover:text-black group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0 ml-3" />
            </Link>
          ))}
        </div>
      </section>

      {/* Admin Highlight Strip */}
      <section className="max-w-7xl mx-auto px-6 mt-16">
        <div className="p-8 sm:p-12 rounded-3xl bg-slate-900 text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl">
          <div className="space-y-3 max-w-xl">
            <span className="text-xs uppercase tracking-widest text-indigo-400 font-bold flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4" /> CPG Product Catalog &amp; Wholesale Inquiries
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold font-serif">
              Unified Back-Office Management Suite
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              Real-time product inventory, single &amp; multi-pack bundle pricing, B2B wholesale order requests, dietary tag filtering, and customer profiles connected to MySQL.
            </p>
          </div>

          <Link
            href="/admin/"
            className="px-8 py-4 rounded-2xl bg-indigo-500 hover:bg-indigo-600 text-white font-bold text-sm tracking-wide transition flex items-center gap-2 shrink-0 shadow-lg"
          >
            <span>Open Admin Dashboard</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
