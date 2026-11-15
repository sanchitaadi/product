"use client";

import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import {
  Zap,
  ArrowRight,
  Flame,
  Clock,
  Heart,
  Star,
  Sparkles,
  Check,
  Maximize2,
  Calendar,
  Users,
  ChevronRight,
  Smile,
  Music,
} from "lucide-react";
import confetti from "canvas-confetti";
import ConceptBHeader from "@/components/concept-b/Header";
import ConceptBFooter from "@/components/concept-b/Footer";
import ConceptBFoodCard from "@/components/concept-b/FoodCard";
import RetroLoader from "@/components/concept-b/RetroLoader";
import RetroSoundProvider, { useRetroSound } from "@/components/concept-b/RetroSoundFX";
import RetroCustomCursor from "@/components/concept-b/RetroCustomCursor";
import RetroScrollProgress from "@/components/concept-b/RetroScrollProgress";
import CinematicLightbox, { LightboxItem } from "@/components/shared/CinematicLightbox";
import PageTransition from "@/components/shared/PageTransition";
import * as api from "@/lib/api";

function ConceptBHomePageContent() {
  const [bestsellers, setBestsellers] = useState<any[]>([]);
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeLightboxItem, setActiveLightboxItem] = useState<LightboxItem | null>(null);
  const [dietFilter, setDietFilter] = useState<"all" | "veg" | "non-veg">("all");
  const [activeStoryChapter, setActiveStoryChapter] = useState(0);

  // Reservation form state
  const [resForm, setResForm] = useState({
    name: "",
    phone: "",
    email: "",
    date: "",
    time: "20:00",
    guests: 2,
  });
  const [resSuccess, setResSuccess] = useState(false);
  const [resSubmitting, setResSubmitting] = useState(false);

  const { playCoin, playPop, playBoing, playClick } = useRetroSound();

  useEffect(() => {
    Promise.all([api.getMenu({ bestseller: "1" }), api.getReviews(6)])
      .then(([menuRes, revRes]) => {
        if (menuRes.success && Array.isArray(menuRes.items)) {
          setBestsellers(menuRes.items.slice(0, 8));
        }
        if (revRes.success && Array.isArray(revRes.reviews)) {
          setReviews(revRes.reviews);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  const handleReservationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resForm.name || !resForm.phone || !resForm.date) return;
    setResSubmitting(true);
    try {
      const res = await api.createReservation({
        name: resForm.name,
        phone: resForm.phone,
        email: resForm.email,
        reservation_date: resForm.date,
        reservation_time: resForm.time,
        guests: resForm.guests,
        seating_area: "Retro Booth",
        special_requests: "Vinyl Booth Seating Request — Concept B",
        concept_source: "Concept B — Retro Gen-Z",
      });
      if (res.success) {
        setResSuccess(true);
        playCoin();
        try {
          confetti({
            particleCount: 50,
            spread: 70,
            origin: { y: 0.6 },
            colors: ["#FFE15D", "#FF2A55", "#000000", "#FFFFFF"],
          });
        } catch {
          // ignore
        }
      }
    } catch {
      // ignore
    } finally {
      setResSubmitting(false);
    }
  };

  const storyChapters = [
    {
      id: "ch-1",
      number: "ACT 01",
      tagline: "48-HOUR COLD FERMENTATION",
      title: "Wild Yeast & Italian Caputo Flour",
      desc: "Our pizza dough doesn't take shortcuts. It rests in refrigerated chambers for two full days, allowing slow enzymatic breakdown of complex starches. The payoff? Unbelievable leopard blisters, airy lightness, and zero heavy bloating.",
      badge: "🌾 100% UNBLEACHED CAPUTO 00",
      image: "/images/margherita-pizza.webp",
      highlight: "AIRY CORNICIONE CRUST",
    },
    {
      id: "ch-2",
      number: "ACT 02",
      tagline: "500°C VOLCANIC STONE OVEN",
      title: "90-Second Scorched Blistering",
      desc: "Inside our custom dual-flame stone oven, pizzas cook at blistering temperatures. The dough expands instantly into crisp, pillowy crusts with caramelized micro-bubbles while maintaining an ultra-juicy, fresh center.",
      badge: "🔥 500°C STONE-BAKED FLASH",
      image: "/images/wild-mushroom-pizza.webp",
      highlight: "LEOPARD-SPOTTED CHAR",
    },
    {
      id: "ch-3",
      number: "ACT 03",
      tagline: "FRESH PUGLIESE CHEESE PULL",
      title: "Molten Fior Di Latte & Cold EVOO",
      desc: "We tear creamy fior di latte mozzarella by hand, melt it over sweet San Marzano tomato reductions, and crown every slice with torn sweet basil and cold-pressed extra virgin olive oil from southern Italy.",
      badge: "🧀 AUTHENTIC MOZZARELLA PULL",
      image: "/images/pink-sauce-pasta.webp",
      highlight: "MAXIMUM CHEESE STRETCH",
    },
  ];

  const filteredBestsellers = bestsellers.filter((item) => {
    if (dietFilter === "veg") return Number(item.is_veg) === 1;
    if (dietFilter === "non-veg") return Number(item.is_veg) === 0;
    return true;
  });

  return (
    <div className="bg-[#FFF9EC] min-h-screen text-black flex flex-col font-sans selection:bg-[#FFE15D] selection:text-black relative overflow-x-clip">
      {/* Full-Screen Website Loader */}
      <RetroLoader isReady={!loading} />

      {/* Retro Scroll Progress Bar */}
      <RetroScrollProgress />

      {/* Desktop Custom Cursor with Sparkler */}
      <RetroCustomCursor />

      {/* Navigation Header */}
      <ConceptBHeader />

      {/* -------------------------------------------------------------
          1. EXTREME RETRO HERO SECTION 4.0
      ------------------------------------------------------------- */}
      <section className="py-12 md:py-20 border-b-4 border-black relative overflow-hidden bg-[#FFF9EC]">
        {/* Halftone Comic Dots & Subtle CRT Grain */}
        <div className="absolute inset-0 pattern-comic-halftone opacity-25 pointer-events-none" />
        <div className="absolute inset-0 retro-grain opacity-25 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
          {/* Left Hero Typography & CTA Block */}
          <div className="lg:col-span-7 space-y-6">
            {/* Retro Pill Badge with Pop Animation */}
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FFE15D] border-2 border-black text-xs font-retro-bold font-black uppercase tracking-wider shadow-[3px_3px_0px_#000] rotate-[-1deg]"
            >
              <Zap className="w-4 h-4 fill-black text-black animate-bounce" />
              <span>DELHI&apos;S HOTTEST 90s RETRO PIZZA &bull; POP OPEN!</span>
            </motion.div>

            {/* Kinetic Oversized Headline */}
            <div className="space-y-1">
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="font-retro-bold font-black text-6xl sm:text-7xl lg:text-8xl leading-[0.9] tracking-tight uppercase"
              >
                <span className="block hover:translate-x-1 transition-transform">CRUNCH.</span>
                <span className="text-[#FF2A55] bg-white px-3 py-1 border-[3.5px] border-black shadow-[6px_6px_0px_#000] inline-block my-2 rotate-1 hover:-rotate-1 transition-transform cursor-pointer">
                  CHEESE.
                </span>
                <span className="block text-pop-cherry">CUTE VIBES.</span>
              </motion.h1>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="text-sm sm:text-base font-bold text-stone-800 max-w-lg leading-relaxed"
            >
              Serving 48-hour slow-fermented artisan sourdough pizzas, cheese-drenched rigatoni, iced matcha cloud foam, and triple-stacked burgers in New Delhi. No frozen nonsense, ever.
            </motion.p>

            {/* Bouncy CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap items-center gap-4 pt-2"
            >
              <Link
                href="/concept-b/menu/"
                onClick={playCoin}
                className="px-8 py-4 bg-[#FF2A55] hover:bg-[#E60033] text-white font-retro-bold font-black text-sm uppercase tracking-wider rounded-2xl border-[3.5px] border-black shadow-[6px_6px_0px_#000] hover:translate-x-[-3px] hover:translate-y-[-3px] hover:shadow-[9px_9px_0px_#000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0px_#000] transition-all flex items-center gap-3"
              >
                <span>GET FOOD NOW 🍕</span>
                <ArrowRight className="w-5 h-5 stroke-[3]" />
              </Link>

              <Link
                href="/concept-b/reservations/"
                onClick={playPop}
                className="px-8 py-4 bg-[#FFE15D] hover:bg-[#FFD600] text-black font-retro-bold font-black text-sm uppercase tracking-wider rounded-2xl border-[3.5px] border-black shadow-[5px_5px_0px_#000] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[7px_7px_0px_#000] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[2px_2px_0px_#000] transition-all flex items-center gap-2"
              >
                <Users className="w-4 h-4 stroke-[2.5]" />
                <span>BOOK VINYL BOOTH</span>
              </Link>
            </motion.div>

            {/* Floating Live Indicator */}
            <div className="pt-2 flex items-center gap-3 text-xs font-retro-bold font-black">
              <span className="flex h-3 w-3 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
              </span>
              <span>KITCHEN IS OPEN &bull; DISPATCHING IN 18-22 MINS</span>
            </div>
          </div>

          {/* Right Hero Visual: 3D Interactive Framed Masterpiece */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, rotate: 2 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-5 relative"
          >
            {/* The Main Food Frame */}
            <div
              onClick={() => {
                playPop();
                setActiveLightboxItem({
                  id: "hero-b",
                  name: "Classic Neapolitan Margherita",
                  category: "Wood-Fired Pizza",
                  image_url: "/images/margherita-pizza.webp",
                  price: 349,
                  calories: 680,
                  preparation_time: "18-20 mins",
                  description:
                    "Slow-fermented 48-hour sourdough base, San Marzano tomato reduction, fior di latte mozzarella, fragrant sweet basil & cold-pressed EVOO.",
                  conceptTheme: "retro",
                });
              }}
              className="bg-white p-4 rounded-3xl border-4 border-black shadow-[10px_10px_0px_#000] hover:shadow-[14px_14px_0px_#FF2A55] transition-all relative group cursor-pointer"
            >
              <div className="aspect-square rounded-2xl overflow-hidden border-2 border-black relative bg-[#FFE15D]">
                <img
                  src="/images/margherita-pizza.webp"
                  alt="Peachy Plate Signature Pizza"
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 animate-ken-burns"
                />

                {/* Lightbox Expand Badge */}
                <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="px-4 py-2 rounded-xl bg-[#FFE15D] text-black border-2 border-black font-retro-bold font-black text-xs uppercase shadow-[3px_3px_0px_#000] flex items-center gap-1.5">
                    <Maximize2 className="w-4 h-4 stroke-[3]" />
                    <span>CLICK FOR FULLSCREEN</span>
                  </span>
                </div>
              </div>

              {/* Caption Bar with Price Tag */}
              <div className="mt-4 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-retro-bold font-black uppercase tracking-wider text-[#FF2A55] block">
                    ★ CROWN JEWEL
                  </span>
                  <h3 className="font-retro-bold font-black text-2xl text-black">
                    SOURDOUGH MARGHERITA
                  </h3>
                </div>
                <div className="bg-[#FFE15D] text-black font-retro-bold font-black text-xl px-4 py-2 rounded-xl border-2 border-black shadow-[3px_3px_0px_#000] rotate-2">
                  ₹349
                </div>
              </div>
            </div>

            {/* Rotating Retro Starburst Sticker */}
            <div className="absolute -top-6 -right-6 sm:-right-8 w-24 h-24 bg-[#FFE15D] rounded-full border-[3.5px] border-black flex flex-col items-center justify-center text-center font-retro-bold font-black text-[11px] leading-tight shadow-[5px_5px_0px_#000] animate-spin-slow z-20 select-none">
              <span>100%</span>
              <span className="text-[#FF2A55]">FRESH</span>
              <span>DAILY</span>
            </div>

            {/* Comic Speech Bubble Sticker */}
            <div className="absolute -bottom-6 -left-6 bg-white border-[3px] border-black p-3.5 rounded-2xl shadow-[5px_5px_0px_#000] rotate-[-6deg] z-20 max-w-[190px] select-none">
              <p className="text-xs font-black text-black leading-tight font-retro-bold">
                &ldquo;BEST AIRY CRUST IN DELHI!&rdquo; 🤤
              </p>
            </div>

            {/* Floating Cherry Sticker */}
            <motion.div
              animate={{ y: [-4, 4, -4], rotate: [-4, 4, -4] }}
              transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
              className="absolute -top-8 left-10 bg-[#FF2A55] text-white p-2 rounded-xl border-2 border-black shadow-[3px_3px_0px_#000] z-20 text-xl font-retro-bold select-none"
            >
              🍒
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* -------------------------------------------------------------
          2. DUAL OPPOSITE-DIRECTION INFINITE RETRO MARQUEES
      ------------------------------------------------------------- */}
      {/* Marquee Track 1 (Going Left) */}
      <div className="bg-[#121212] text-[#FFE15D] text-xs font-retro-bold font-black uppercase py-2.5 overflow-hidden border-b-2 border-black flex items-center select-none">
        <div className="animate-marquee whitespace-nowrap flex items-center gap-6">
          <span>★ 90s RETRO DINER WORLD</span>
          <span className="text-[#FF2A55]">●</span>
          <span>48-HR SOURDOUGH PIZZAS</span>
          <span className="text-[#FF2A55]">●</span>
          <span>AIRY CRUST &amp; LEOPARD SPOTS</span>
          <span className="text-[#FF2A55]">●</span>
          <span>CHERRY CRUSH &amp; MATCHA CLOUD</span>
          <span className="text-[#FF2A55]">●</span>
          <span>PARISIAN MACARONS &amp; NY CAKE</span>
          <span className="text-[#FF2A55]">●</span>
          <span>★ 90s RETRO DINER WORLD</span>
          <span className="text-[#FF2A55]">●</span>
          <span>48-HR SOURDOUGH PIZZAS</span>
          <span className="text-[#FF2A55]">●</span>
          <span>AIRY CRUST &amp; LEOPARD SPOTS</span>
        </div>
      </div>

      {/* Marquee Track 2 (Going Right / Reverse) */}
      <div className="bg-[#FF2A55] text-white text-xs font-retro-bold font-black uppercase py-2 overflow-hidden border-b-4 border-black flex items-center select-none">
        <div className="animate-marquee-reverse whitespace-nowrap flex items-center gap-6">
          <span>⚡ USE CODE &apos;PEACHY20&apos; FOR 20% OFF</span>
          <span className="text-[#FFE15D]">★</span>
          <span>FAST DELIVERY ACROSS NEW DELHI</span>
          <span className="text-[#FFE15D]">★</span>
          <span>TABLES AT 24 GARDEN AVENUE</span>
          <span className="text-[#FFE15D]">★</span>
          <span>100% VEG &amp; HALAL OPTIONS READY</span>
          <span className="text-[#FFE15D]">★</span>
          <span>⚡ USE CODE &apos;PEACHY20&apos; FOR 20% OFF</span>
          <span className="text-[#FFE15D]">★</span>
          <span>FAST DELIVERY ACROSS NEW DELHI</span>
        </div>
      </div>

      {/* -------------------------------------------------------------
          3. PINNED EDITORIAL STORYTELLING: 48-HOUR CRUST CHRONICLES
      ------------------------------------------------------------- */}
      <section className="py-20 md:py-28 border-b-4 border-black bg-[#FFE15D]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
            <span className="font-retro-bold text-xs font-black uppercase tracking-widest text-white bg-black px-4 py-1.5 rounded-full shadow-[3px_3px_0px_#FF2A55] inline-block">
              ⚡ OUR RETRO CRAFT CHRONICLES
            </span>
            <h2 className="font-retro-bold font-black text-4xl sm:text-6xl text-black uppercase">
              HOW WE SLICE IT DIFFERENT
            </h2>
            <p className="text-xs sm:text-sm font-bold text-stone-900 max-w-md mx-auto">
              Explore the 3 acts of our 48-hour sourdough craft. Click through the timeline below.
            </p>

            {/* Chapter Selector Tabs */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
              {storyChapters.map((ch, idx) => (
                <button
                  key={ch.id}
                  onClick={() => {
                    playClick();
                    setActiveStoryChapter(idx);
                  }}
                  className={`px-5 py-2.5 rounded-2xl border-2 border-black font-retro-bold font-black text-xs uppercase tracking-wider transition-all ${
                    activeStoryChapter === idx
                      ? "bg-[#FF2A55] text-white shadow-[4px_4px_0px_#000] scale-105"
                      : "bg-white text-black hover:bg-stone-100 shadow-[2px_2px_0px_#000]"
                  }`}
                >
                  <span>{ch.number}: {ch.tagline.split(" ")[0]}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Active Story Chapter Display */}
          <div className="bg-white rounded-3xl border-4 border-black p-6 sm:p-12 shadow-[12px_12px_0px_#000] grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Story Text */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 bg-[#FFE15D] text-black border-2 border-black rounded-lg text-xs font-retro-bold font-black">
                  {storyChapters[activeStoryChapter].number}
                </span>
                <span className="text-xs font-retro-bold font-black uppercase text-[#FF2A55]">
                  {storyChapters[activeStoryChapter].tagline}
                </span>
              </div>

              <h3 className="font-retro-bold font-black text-3xl sm:text-5xl text-black uppercase leading-tight">
                {storyChapters[activeStoryChapter].title}
              </h3>

              <p className="text-sm font-semibold text-stone-700 leading-relaxed max-w-xl">
                {storyChapters[activeStoryChapter].desc}
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-3">
                <span className="px-3.5 py-1.5 bg-black text-[#FFE15D] border-2 border-black rounded-xl text-xs font-retro-bold font-black">
                  {storyChapters[activeStoryChapter].badge}
                </span>
                <span className="px-3.5 py-1.5 bg-[#FF2A55] text-white border-2 border-black rounded-xl text-xs font-retro-bold font-black">
                  ★ {storyChapters[activeStoryChapter].highlight}
                </span>
              </div>
            </div>

            {/* Story Image Frame */}
            <div className="lg:col-span-5">
              <div
                onClick={() => {
                  playPop();
                  setActiveLightboxItem({
                    id: storyChapters[activeStoryChapter].id,
                    name: storyChapters[activeStoryChapter].title,
                    category: storyChapters[activeStoryChapter].tagline,
                    image_url: storyChapters[activeStoryChapter].image,
                    description: storyChapters[activeStoryChapter].desc,
                    conceptTheme: "retro",
                  });
                }}
                className="bg-[#FFE15D] p-3 rounded-2xl border-4 border-black shadow-[6px_6px_0px_#000] cursor-pointer group"
              >
                <div className="aspect-[4/3] rounded-xl overflow-hidden border-2 border-black relative bg-black">
                  <img
                    src={storyChapters[activeStoryChapter].image}
                    alt={storyChapters[activeStoryChapter].title}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="p-2 rounded-xl bg-white text-black border-2 border-black font-retro-bold font-black text-xs shadow-[2px_2px_0px_#000]">
                      CLICK TO INSPECT
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------
          4. THE HITLIST (DYNAMIC BESTSELLER DISHES)
      ------------------------------------------------------------- */}
      <section className="py-20 md:py-28 border-b-4 border-black bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
            <div>
              <span className="font-retro-bold text-xs font-black uppercase tracking-widest text-[#FF2A55] bg-[#FFF9EC] border-2 border-black px-3.5 py-1 rounded-full shadow-[2px_2px_0px_#000] inline-block mb-3">
                🔥 THE HITLIST &bull; BESTSELLERS
              </span>
              <h2 className="font-retro-bold font-black text-4xl sm:text-6xl text-black uppercase">
                WHAT EVERYONE&apos;S ORDERING
              </h2>
            </div>

            {/* Diet Filter Pills */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  playClick();
                  setDietFilter("all");
                }}
                className={`px-4 py-2 rounded-xl border-2 border-black font-retro-bold font-black text-xs uppercase tracking-wider transition ${
                  dietFilter === "all"
                    ? "bg-[#FF2A55] text-white shadow-[3px_3px_0px_#000]"
                    : "bg-[#FFF9EC] text-black hover:bg-stone-100"
                }`}
              >
                ALL HITS
              </button>
              <button
                onClick={() => {
                  playClick();
                  setDietFilter("veg");
                }}
                className={`px-4 py-2 rounded-xl border-2 border-black font-retro-bold font-black text-xs uppercase tracking-wider transition ${
                  dietFilter === "veg"
                    ? "bg-[#48BB78] text-white shadow-[3px_3px_0px_#000]"
                    : "bg-[#FFF9EC] text-black hover:bg-stone-100"
                }`}
              >
                🌱 100% VEG
              </button>
              <button
                onClick={() => {
                  playClick();
                  setDietFilter("non-veg");
                }}
                className={`px-4 py-2 rounded-xl border-2 border-black font-retro-bold font-black text-xs uppercase tracking-wider transition ${
                  dietFilter === "non-veg"
                    ? "bg-[#FF6B35] text-white shadow-[3px_3px_0px_#000]"
                    : "bg-[#FFF9EC] text-black hover:bg-stone-100"
                }`}
              >
                🍗 NON-VEG
              </button>
            </div>
          </div>

          {/* Cards Grid with 3D Tilt Physics */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className="h-80 bg-[#FFF9EC] rounded-3xl border-4 border-black animate-pulse"
                />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredBestsellers.map((item) => (
                <ConceptBFoodCard
                  key={item.id}
                  item={item}
                  onOpenLightbox={setActiveLightboxItem}
                />
              ))}
            </div>
          )}

          <div className="text-center pt-12">
            <Link
              href="/concept-b/menu/"
              onClick={playCoin}
              className="inline-flex items-center gap-3 px-8 py-4 bg-[#FFE15D] hover:bg-[#FFD600] text-black font-retro-bold font-black text-sm uppercase tracking-wider rounded-2xl border-[3.5px] border-black shadow-[6px_6px_0px_#000] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[9px_9px_0px_#000] transition"
            >
              <span>VIEW FULL PEACHY MENU (20+ ITEMS) 🍕</span>
              <ArrowRight className="w-5 h-5 stroke-[3]" />
            </Link>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------
          5. SIDE-SCROLLING SLICE & VINYL VAULT REEL
      ------------------------------------------------------------- */}
      <section className="py-20 md:py-28 border-b-4 border-black bg-[#121212] text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <span className="font-retro-bold text-xs font-black uppercase tracking-widest text-[#121212] bg-[#FFE15D] border-2 border-black px-3.5 py-1 rounded-full shadow-[2px_2px_0px_#FF2A55] inline-block">
              📸 VINYL VAULT &bull; SNAP DROP
            </span>
            <h2 className="font-retro-bold font-black text-4xl sm:text-6xl uppercase tracking-tight text-[#FFE15D]">
              LATE NIGHT SLICE &amp; RECORD VAULT
            </h2>
            <p className="text-xs sm:text-sm font-semibold text-stone-300 max-w-lg">
              Swipe across our Delhi diner scenes, blistered sourdough crusts, and neon booth aesthetic. Click any frame to inspect in full-screen cinema mode.
            </p>
          </div>
          <span className="font-retro-bold text-xs font-black text-[#FF2A55] bg-white px-3 py-1.5 rounded-xl border-2 border-black shrink-0">
            ★ HORIZONTAL FEED &bull; SWIPE / SCROLL →
          </span>
        </div>

        {/* Side-Scrolling Horizontal Container */}
        <div className="overflow-x-auto pb-6 px-6 no-scrollbar">
          <div className="flex gap-6 w-max">
            {[
              {
                id: "vault-1",
                title: "THE NEON BOOTH",
                category: "Diner Vibes",
                img: "/images/restaurant-dining.webp",
                desc: "Our signature high-energy vinyl booth seating in New Delhi.",
              },
              {
                id: "vault-2",
                title: "TRUFFLE CRUST BAKE",
                category: "Wood-Fired Pizza",
                img: "/images/wild-mushroom-pizza.webp",
                desc: "48-hour fermented wild mushroom truffle pizza fresh out of the 500°C oven.",
              },
              {
                id: "vault-3",
                title: "MATCHA CLOUD LATTE",
                category: "Cold Sips",
                img: "/images/matcha-cloud-latte.webp",
                desc: "Velvety strawberry cold foam poured over ceremonial Uji green matcha.",
              },
              {
                id: "vault-4",
                title: "PARISIAN SWEET DROP",
                category: "Sweet Treats",
                img: "/images/parisian-macarons.webp",
                desc: "Handcrafted ganache macarons with damask rose and lavender honey.",
              },
              {
                id: "vault-5",
                title: "TRUFFLE PARMESAN CRUNCH",
                category: "Hand-Cut Fries",
                img: "/images/truffle-fries.webp",
                desc: "Crispy golden Russets tossed in aromatic black truffle oil & Maldon salt.",
              },
              {
                id: "vault-6",
                title: "STRAWBERRY CHANTILLY",
                category: "Baked Desserts",
                img: "/images/strawberry-cheesecake.webp",
                desc: "Silky New York style baked cheesecake on buttery graham crust.",
              },
            ].map((shot, idx) => (
              <div
                key={shot.id}
                onClick={() => {
                  playPop();
                  setActiveLightboxItem({
                    id: shot.id,
                    name: shot.title,
                    category: shot.category,
                    image_url: shot.img,
                    description: shot.desc,
                    conceptTheme: "retro",
                  });
                }}
                className="w-72 sm:w-80 bg-white text-black p-3.5 rounded-3xl border-4 border-black space-y-3 cursor-pointer group hover:translate-y-[-4px] hover:shadow-[8px_8px_0px_#FFE15D] transition-all shrink-0 select-none"
              >
                <div className="aspect-square rounded-2xl overflow-hidden border-2 border-black bg-stone-100 relative">
                  <img
                    src={shot.img}
                    alt={shot.title}
                    className="w-full h-full object-cover group-hover:scale-108 transition duration-500"
                  />
                  <div className="absolute inset-0 bg-black/35 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="text-[10px] font-retro-bold font-black bg-[#FFE15D] text-black px-3 py-1.5 rounded-xl border-2 border-black shadow-[2px_2px_0px_#000]">
                      CLICK TO EXPAND
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between font-retro-bold font-black text-xs pt-1">
                  <span>{shot.title}</span>
                  <span className="text-[#FF2A55] font-mono">FRAME 0{idx + 1}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------
          6. THE VIBE CHECK (3 COMIC FEATURE CARDS)
      ------------------------------------------------------------- */}
      <section className="py-20 md:py-28 border-b-4 border-black bg-[#FFF9EC]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="font-retro-bold text-xs font-black uppercase tracking-widest text-white bg-[#FF2A55] border-2 border-black px-4 py-1.5 rounded-full shadow-[3px_3px_0px_#000] inline-block">
              THE VIBE CHECK
            </span>
            <h2 className="font-retro-bold font-black text-4xl sm:text-6xl text-black uppercase">
              WHY PEACHY PLATE HITS DIFFERENT
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 01 */}
            <div className="bg-white rounded-3xl border-4 border-black p-8 shadow-[6px_6px_0px_#000] hover:translate-y-[-4px] hover:shadow-[10px_10px_0px_#000] transition-all space-y-4 relative">
              <div className="w-14 h-14 rounded-2xl bg-[#FFE15D] border-2 border-black flex items-center justify-center font-retro-bold font-black text-2xl shadow-[3px_3px_0px_#000]">
                01
              </div>
              <h3 className="font-retro-bold font-black text-2xl text-black">
                ZERO COMPROMISE INGREDIENTS
              </h3>
              <p className="text-xs font-bold text-stone-700 leading-relaxed">
                Real Pugliese burrata, imported Italian Caputo flour, cold-harvest olive oils, and zero fake oils or fillers. We cook for flavor, not corporate spreadsheets.
              </p>
            </div>

            {/* Feature 02 */}
            <div className="bg-[#FFE15D] rounded-3xl border-4 border-black p-8 shadow-[6px_6px_0px_#000] hover:translate-y-[-4px] hover:shadow-[10px_10px_0px_#000] transition-all space-y-4 relative rotate-1">
              <div className="w-14 h-14 rounded-2xl bg-[#FF2A55] text-white border-2 border-black flex items-center justify-center font-retro-bold font-black text-2xl shadow-[3px_3px_0px_#000]">
                02
              </div>
              <h3 className="font-retro-bold font-black text-2xl text-black">
                48-HOUR SOURDOUGH FERMENT
              </h3>
              <p className="text-xs font-bold text-black leading-relaxed">
                Our dough rests in refrigerated fermentation chambers for two full days. The result? Unbelievable leopard-spotting, airy crusts, and zero bloating after eating.
              </p>
            </div>

            {/* Feature 03 */}
            <div className="bg-white rounded-3xl border-4 border-black p-8 shadow-[6px_6px_0px_#000] hover:translate-y-[-4px] hover:shadow-[10px_10px_0px_#000] transition-all space-y-4 relative">
              <div className="w-14 h-14 rounded-2xl bg-[#FF6B35] text-white border-2 border-black flex items-center justify-center font-retro-bold font-black text-2xl shadow-[3px_3px_0px_#000]">
                03
              </div>
              <h3 className="font-retro-bold font-black text-2xl text-black">
                90s RETRO DINER MOODS
              </h3>
              <p className="text-xs font-bold text-stone-700 leading-relaxed">
                Neon signs, vinyl booths, curated indie synth-pop beats, and aesthetic food packaging that looks incredible on your camera roll.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------
          7. IN-PAGE VINYL BOOTH RESERVATIONS BOOKING SUITE
      ------------------------------------------------------------- */}
      <section className="py-20 md:py-28 border-b-4 border-black bg-[#FF2A55] text-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="bg-[#FFE15D] text-black rounded-3xl border-4 border-black p-8 sm:p-12 shadow-[12px_12px_0px_#000]">
            <div className="max-w-xl mx-auto text-center space-y-3 mb-10">
              <span className="font-retro-bold text-xs font-black uppercase tracking-widest bg-white border-2 border-black px-3.5 py-1 rounded-full shadow-[2px_2px_0px_#000] inline-block">
                ⚡ VINYL BOOTH PASS
              </span>
              <h3 className="font-retro-bold font-black text-4xl sm:text-5xl uppercase leading-none">
                RESERVE YOUR BOOTH IN NEW DELHI
              </h3>
              <p className="text-xs sm:text-sm font-bold text-stone-800">
                Friday and Saturday booths fill up fast. Lock in your spot for wood-fired pizza and neon diner vibes!
              </p>
            </div>

            {resSuccess ? (
              <div className="p-8 text-center bg-white rounded-2xl border-4 border-black space-y-4">
                <Check className="w-12 h-12 text-[#48BB78] mx-auto stroke-[3]" />
                <h4 className="font-retro-bold font-black text-3xl uppercase">
                  BOOTH INQUIRY REGISTERED! 🍕
                </h4>
                <p className="text-xs font-bold text-stone-700 max-w-md mx-auto">
                  Our diner host will ring {resForm.phone} within 2 hours to confirm your booth placement.
                </p>
                <button
                  onClick={() => setResSuccess(false)}
                  className="px-6 py-2.5 bg-[#FF2A55] text-white font-retro-bold font-black text-xs uppercase rounded-xl border-2 border-black shadow-[2px_2px_0px_#000]"
                >
                  Book Another Table
                </button>
              </div>
            ) : (
              <form onSubmit={handleReservationSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-[11px] font-retro-bold font-black uppercase mb-1">
                      Guest Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={resForm.name}
                      onChange={(e) => setResForm({ ...resForm, name: e.target.value })}
                      placeholder="e.g. Rahul Sharma"
                      className="w-full bg-white border-2 border-black rounded-xl px-4 py-3 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-[#FF2A55]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-retro-bold font-black uppercase mb-1">
                      Mobile Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={resForm.phone}
                      onChange={(e) => setResForm({ ...resForm, phone: e.target.value })}
                      placeholder="+91 98765 00000"
                      className="w-full bg-white border-2 border-black rounded-xl px-4 py-3 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-[#FF2A55]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-retro-bold font-black uppercase mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={resForm.email}
                      onChange={(e) => setResForm({ ...resForm, email: e.target.value })}
                      placeholder="rahul@example.com"
                      className="w-full bg-white border-2 border-black rounded-xl px-4 py-3 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-[#FF2A55]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-retro-bold font-black uppercase mb-1">
                      Date of Visit *
                    </label>
                    <input
                      type="date"
                      required
                      value={resForm.date}
                      onChange={(e) => setResForm({ ...resForm, date: e.target.value })}
                      className="w-full bg-white border-2 border-black rounded-xl px-4 py-3 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-[#FF2A55]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-retro-bold font-black uppercase mb-1">
                      Sitting Time *
                    </label>
                    <select
                      value={resForm.time}
                      onChange={(e) => setResForm({ ...resForm, time: e.target.value })}
                      className="w-full bg-white border-2 border-black rounded-xl px-4 py-3 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-[#FF2A55]"
                    >
                      <option value="13:00">1:00 PM (Lunch)</option>
                      <option value="14:00">2:00 PM (Lunch)</option>
                      <option value="19:30">7:30 PM (Dinner)</option>
                      <option value="20:30">8:30 PM (Prime Dinner)</option>
                      <option value="21:30">9:30 PM (Late Slices)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-retro-bold font-black uppercase mb-1">
                      Booth Crew Size *
                    </label>
                    <select
                      value={resForm.guests}
                      onChange={(e) => setResForm({ ...resForm, guests: Number(e.target.value) })}
                      className="w-full bg-white border-2 border-black rounded-xl px-4 py-3 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-[#FF2A55]"
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8].map((g) => (
                        <option key={g} value={g}>
                          {g} {g === 1 ? "Person" : "People"}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="pt-2 text-center">
                  <button
                    type="submit"
                    disabled={resSubmitting}
                    className="px-10 py-4 bg-[#FF2A55] hover:bg-[#E60033] text-white font-retro-bold font-black text-sm uppercase tracking-wider rounded-2xl border-[3.5px] border-black shadow-[5px_5px_0px_#000] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[8px_8px_0px_#000] transition disabled:opacity-50"
                  >
                    {resSubmitting ? "REGISTERING BOOTH..." : "LOCK IN MY VINYL BOOTH ★"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------
          8. COMIC SPEECH BUBBLE FAN REVIEWS
      ------------------------------------------------------------- */}
      <section className="py-20 md:py-28 border-b-4 border-black bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-2">
            <span className="font-retro-bold text-xs font-black uppercase tracking-widest text-white bg-[#FF2A55] border-2 border-black px-4 py-1.5 rounded-full shadow-[3px_3px_0px_#000] inline-block">
              FAN REVIEWS &bull; VERIFIED PATRONS
            </span>
            <h2 className="font-retro-bold font-black text-4xl sm:text-6xl text-black uppercase">
              DON&apos;T JUST TAKE OUR WORD FOR IT
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {reviews.slice(0, 3).map((rev, idx) => (
              <div
                key={rev.id}
                className={`p-6 rounded-3xl border-4 border-black shadow-[6px_6px_0px_#000] space-y-4 hover:translate-y-[-3px] transition ${
                  idx % 2 === 0 ? "bg-[#FFF9EC] rotate-[-1deg]" : "bg-[#FFE15D] rotate-1"
                }`}
              >
                <div className="flex text-amber-500 gap-1">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} className="w-4 h-4 fill-black stroke-black" />
                  ))}
                </div>

                <p className="font-retro-bold font-bold text-base text-black leading-snug">
                  &ldquo;{rev.review_text}&rdquo;
                </p>

                <div className="pt-4 border-t-2 border-black/20 flex items-center justify-between font-retro-bold font-black text-xs">
                  <span>{rev.customer_name}</span>
                  <span className="bg-white px-2.5 py-1 rounded-lg border-2 border-black text-[10px]">
                    {rev.dish_recommended || "Sourdough Pizza"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <ConceptBFooter />

      {/* Full-Screen Cinematic Lightbox */}
      <CinematicLightbox
        item={activeLightboxItem}
        onClose={() => setActiveLightboxItem(null)}
      />
    </div>
  );
}

export default function ConceptBHomePage() {
  return (
    <RetroSoundProvider>
      <ConceptBHomePageContent />
    </RetroSoundProvider>
  );
}
