"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Sparkles, Zap, ShieldCheck } from "lucide-react";

export default function PresentationHubPage() {
  const concepts = [
    {
      id: "concept-a",
      title: "Concept A — Coquette Pinterest",
      badge: "Dreamy • Blush • Feminine",
      tagline: "Soft peach hues, delicate ribbons, handcrafted floral aesthetics, and Pinterest-worthy dining.",
      color: "from-[#FFE5D9] via-[#FFF0F3] to-[#FFCAD4]",
      accent: "#E07A86",
      border: "border-2 border-pink-200/80 shadow-md",
      icon: "🎀",
      link: "/concept-a/",
      features: ["Floating bows & stars", "Playfair Display typography", "Rounded card aesthetics", "Soft cloud shadows"],
      previewImg: "/images/hero-coquette.webp",
    },
    {
      id: "concept-b",
      title: "Concept B — Retro Gen-Z 4.0",
      badge: "Vibrant • Cherry • Neo-Brutalist",
      tagline: "Arcade intro, 8-bit Web Audio synthesizer, 3D cursor tilt cards, and dual continuous marquees.",
      color: "from-[#FFE15D] via-[#FFF4D2] to-[#FF6B35]/20",
      accent: "#FF2A55",
      border: "border-4 border-black shadow-[6px_6px_0px_#000]",
      icon: "⚡",
      link: "/concept-b/",
      features: ["8-Bit Web Audio SFX Synthesizer", "Full-screen Arcade Loading Screen", "3D Cursor Tilt Food Cards", "Dual continuous marquees"],
      previewImg: "/images/hero-retro.webp",
    },
    {
      id: "concept-c",
      title: "Concept C — Maximalist Pop Art",
      badge: "Electric • Graphic • Expressive",
      tagline: "Andy Warhol pop art, Memphis Milano color blocks, oversized typography, and loud culinary design.",
      color: "from-[#FF007F] via-[#FFE600] to-[#0047FF]",
      accent: "#FF007F",
      border: "border-4 border-black shadow-[6px_6px_0px_#FF007F]",
      icon: "🎨",
      link: "/concept-c/",
      features: ["High-voltage color-blocking", "Warhol poster food cards", "Collage hero composition", "VIP neon booth reservations"],
      previewImg: "/images/hero-retro.webp",
    },
    {
      id: "concept-d",
      title: "Concept D — Organic Earth",
      badge: "Botanical • Farm-to-Table • Artisanal",
      tagline: "Sage green, ancient stone-milled grains, 48-hour cold sourdough, and greenhouse conservatory dining.",
      color: "from-[#7B8E78] via-[#F2EFE9] to-[#C86D51]",
      accent: "#5E6B4E",
      border: "border-2 border-[#5E6B4E]/30 shadow-md",
      icon: "🌿",
      link: "/concept-d/",
      features: ["Serene botanical typography", "Ancient stone-milled provenance", "Greenhouse conservatory bookings", "Regenerative farm storytelling"],
      previewImg: "/images/restaurant-garden.webp",
    },
    {
      id: "concept-e",
      title: "Concept E — Metro Bites",
      badge: "Underground • Railway • Express",
      tagline: "Metro stations, split-flap departure boards, interactive foodway maps, and fast-casual railway dining.",
      color: "from-[#08142C] via-[#0D1F42] to-[#D71920]",
      accent: "#FFD100",
      border: "border-4 border-[#FFD100] shadow-[6px_6px_0px_#D71920]",
      icon: "🚆",
      link: "/concept-e/",
      features: ["Interactive Food Metro Map", "Mechanical split-flap timetable", "Perforated railway ticket cards", "First-class carriage reservations"],
      previewImg: "/images/restaurant-interior.webp",
    },
    {
      id: "concept-f",
      title: "Concept F — Manga Bites",
      badge: "Shonen • Comic • Dynamic",
      tagline: "Japanese manga comic panels, animated speed lines, sound effect badges, and wood-fired shonen dining.",
      color: "from-black via-[#D7263D] to-[#FFE600]",
      accent: "#D7263D",
      border: "border-4 border-black shadow-[6px_6px_0px_#D7263D]",
      icon: "🍜",
      link: "/concept-f/",
      features: ["Manga speed-line intro", "Comic sound effect badges", "Serialized chapter storyboards", "Table ink booth bookings"],
      previewImg: "/images/margherita-pizza.webp",
    },
    {
      id: "concept-g",
      title: "Concept G — Circus Social",
      badge: "Carnival • Marquee • Big Top",
      tagline: "Vintage circus marquees, chasing bulb lights, golden admission tickets, and fairground culinary wonders.",
      color: "from-[#5C0614] via-[#C41E3A] to-[#FFD54F]",
      accent: "#FFD54F",
      border: "border-4 border-[#C41E3A] shadow-[6px_6px_0px_#5C0614]",
      icon: "🎪",
      link: "/concept-g/",
      features: ["Chasing marquee bulb lights", "Circus tent striped styling", "Attraction-style carte categories", "Ringside golden ticket booking"],
      previewImg: "/images/restaurant-interior.webp",
    },
  ];

  return (
    <div className="min-h-screen bg-[#FFFDF9] text-[#121212] selection:bg-rose-200 selection:text-rose-900 pb-24">
      {/* Top Banner */}
      <header className="border-b border-black/5 bg-white/70 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-3xl">🍑</span>
            <div>
              <span className="font-serif font-black tracking-wider text-xl text-[#2B2118]">
                PEACHY PLATE
              </span>
              <span className="text-[10px] uppercase tracking-widest text-[#E07A86] block font-bold">
                Next.js 2.0 • 7 Premium Concept Systems
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/admin/"
              className="text-xs font-bold px-4 py-2.5 rounded-full bg-slate-900 text-white hover:bg-black transition flex items-center gap-1.5 shadow-sm"
            >
              <span>Admin SaaS Portal</span>
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
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-50 border border-rose-200/60 text-rose-800 text-xs font-bold tracking-wide uppercase mb-6"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#E07A86]" />
          <span>Interactive Client Direction Showcase &bull; 7 Distinct Concepts</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-6xl font-serif font-black tracking-tight text-[#2B2118] leading-[1.15]"
        >
          Seven Distinct Digital Flavors for{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E07A86] via-[#FF6B35] to-[#FF2A55]">
            Peachy Plate
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto mt-5 leading-relaxed"
        >
          All seven concepts share the same battle-tested PHP 8+ engine, MySQL database, live ordering cart, real-time customizations, and SaaS admin dashboard. Select any concept below to experience its fully articulated 13-page restaurant ordering system.
        </motion.p>
      </section>

      {/* 7 Cards Showcase Grid */}
      <section className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-4">
        {concepts.map((concept, idx) => (
          <motion.div
            key={concept.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 + idx * 0.06 }}
            className={`rounded-3xl overflow-hidden border flex flex-col justify-between transition hover:-translate-y-2 duration-300 ${concept.border} bg-white`}
          >
            <div>
              {/* Image Preview */}
              <div className="relative h-48 overflow-hidden group">
                <img
                  src={concept.previewImg}
                  alt={concept.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent flex flex-col justify-end p-4 text-white">
                  <span className="text-2xl mb-1">{concept.icon}</span>
                  <span className="text-[10px] uppercase tracking-wider font-bold text-amber-300">
                    {concept.badge}
                  </span>
                  <h3 className="text-base font-bold font-serif leading-tight">{concept.title}</h3>
                </div>
              </div>

              {/* Content */}
              <div className="p-4 space-y-3">
                <p className="text-xs text-gray-600 leading-relaxed line-clamp-3">{concept.tagline}</p>

                <div className="space-y-1.5 pt-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block">
                    Design DNA Highlights
                  </span>
                  <ul className="text-[11px] space-y-1 text-gray-700">
                    {concept.features.map((feat, fidx) => (
                      <li key={fidx} className="flex items-start gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full mt-1 shrink-0" style={{ backgroundColor: concept.accent }} />
                        <span className="leading-tight">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Action Button */}
            <div className="p-4 pt-0">
              <Link
                href={concept.link}
                className="w-full py-3 rounded-2xl font-bold text-xs text-center flex items-center justify-center gap-1.5 transition bg-black text-white hover:bg-gray-800 shadow-md uppercase tracking-wider"
              >
                <span>Launch {concept.title.split("—")[1]?.trim() || "Concept"}</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </motion.div>
        ))}
      </section>

      {/* Admin Highlight Strip */}
      <section className="max-w-7xl mx-auto px-6 mt-16">
        <div className="p-8 sm:p-12 rounded-3xl bg-slate-900 text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl">
          <div className="space-y-3 max-w-xl">
            <span className="text-xs uppercase tracking-widest text-indigo-400 font-bold flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4" /> Restaurant SaaS Management Suite
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold font-serif">
              Unified Back-Office Dashboard
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              Real-time revenue metrics, live order status progression, menu CRUD, instant availability toggles, coupon management, table bookings, and customer profiles powered by MySQL.
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
