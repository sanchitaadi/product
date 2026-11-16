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
import { CONCEPT_B_BRAND } from "@/lib/concept-catalogs";

function ConceptBHomePageContent() {
  const [bestsellers, setBestsellers] = useState<any[]>(CONCEPT_B_BRAND.products);
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeLightboxItem, setActiveLightboxItem] = useState<LightboxItem | null>(null);
  const [dietFilter, setDietFilter] = useState<"all" | "veg" | "non-veg">("all");
  const [activeStoryChapter, setActiveStoryChapter] = useState(0);

  // Reservation form state
  const [resForm, setResForm] = useState({
    name: "",
    phone: "",
    email: "",
    date: "",
    time: "Retail Gourmet Shelf",
    guests: 5,
  });
  const [resSuccess, setResSuccess] = useState(false);
  const [resSubmitting, setResSubmitting] = useState(false);

  const { playCoin, playPop, playBoing, playClick } = useRetroSound();

  useEffect(() => {
    api.getReviews(6).then((revRes) => {
      if (revRes.success && Array.isArray(revRes.reviews)) {
        setReviews(revRes.reviews);
      }
    });
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
        seating_area: "Wholesale Inquiry",
        special_requests: "B2B Bodega Wholesale Inquiry — Super Crunch Co.",
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
      tagline: "AIR-POPPED GRAIN CRUNCH",
      title: "Ancient Grains & Non-GMO Sorghum",
      desc: "Our snack puffs don't take shortcuts. We air-pop ancient millets and sorghum at high velocity with zero deep-frying. The payoff? Incredible crunch, clean plant fiber, and zero heavy trans-fat greasy aftertaste.",
      badge: "🌾 100% NON-GMO ANCIENT GRAINS",
      image: "/images/products/gourmet-sorghum-crisps.jpg",
      highlight: "FEATHER-LIGHT CRUNCH",
    },
    {
      id: "ch-2",
      number: "ACT 02",
      tagline: "BATCH KETTLE PROCESS",
      title: "Batch Kettle Chips & Sea Salt",
      desc: "Every batch of thick-cut potato crisps is kettle-cooked in small vats using non-GMO sunflower oil, dusted with coarse sea salt flakes and tangy malt vinegar.",
      badge: "🥔 THICK-CUT BATCH CHIPS",
      image: "/images/products/kettle-sea-salt-chips.jpg",
      highlight: "CRUNCH MULTIPLIER",
    },
    {
      id: "ch-3",
      number: "ACT 03",
      tagline: "PREBIOTIC BOTANICAL FIZZ",
      title: "Cold Prebiotic Soda in Recyclable Cans",
      desc: "Crisp white peach purees paired with chicory root prebiotic fiber and sparkling mountain bubbles. Packed into airtight recyclable cans for 12 months of ice-cold refreshment.",
      badge: "🥤 12-MONTH SHELF STABILITY",
      image: "/images/products/prebiotic-white-peach-soda.jpg",
      highlight: "GUT-FRIENDLY REFRESH",
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
              <span>90s RETRO SNACK BODEGA &bull; POP OPEN THE CRUNCH!</span>
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
                  FIZZ.
                </span>
                <span className="block text-pop-cherry">SNACK HARD.</span>
              </motion.h1>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="text-sm sm:text-base font-bold text-stone-800 max-w-lg leading-relaxed"
            >
              Air-popped sorghum crisps, slow-roasted chili crunch jars, prebiotic botanical sodas, and bean-to-bar chocolate drops. 100% clean ingredients, zero palm oil, pure 90s bodega magic.
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
                <span>SHOP SNACK DROPS 🥨</span>
                <ArrowRight className="w-5 h-5 stroke-[3]" />
              </Link>

              <Link
                href="/concept-b/reservations/"
                onClick={playPop}
                className="px-8 py-4 bg-[#FFE15D] hover:bg-[#FFD600] text-black font-retro-bold font-black text-sm uppercase tracking-wider rounded-2xl border-[3.5px] border-black shadow-[5px_5px_0px_#000] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[7px_7px_0px_#000] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[2px_2px_0px_#000] transition-all flex items-center gap-2"
              >
                <Users className="w-4 h-4 stroke-[2.5]" />
                <span>WHOLESALE BODEGA SUPPLY</span>
              </Link>
            </motion.div>

            {/* Floating Live Indicator */}
            <div className="pt-2 flex items-center gap-3 text-xs font-retro-bold font-black">
              <span className="flex h-3 w-3 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
              </span>
              <span>WAREHOUSE IS PACKING &bull; DISPATCHING ORDERS PAN-INDIA</span>
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
                  name: "Black Summer Truffle Sorghum Crisps",
                  category: "Air-Popped Ancient Grains",
                  image_url: "/images/products/gourmet-sorghum-crisps.jpg",
                  price: 249,
                  calories: 135,
                  preparation_time: "150g Nitrogen Pouch",
                  description:
                    "Ultra-light, crunchy whole grain crisps created through slow indirect ceramic popping. Seasoned with hand-harvested grey sea salt and wild Italian black truffle essence.",
                  conceptTheme: "retro",
                });
              }}
              className="bg-white p-4 rounded-3xl border-4 border-black shadow-[10px_10px_0px_#000] hover:shadow-[14px_14px_0px_#FF2A55] transition-all relative group cursor-pointer"
            >
              <div className="aspect-square rounded-2xl overflow-hidden border-2 border-black relative bg-[#FFE15D]">
                <img
                  src="/images/products/gourmet-sorghum-crisps.jpg"
                  alt="Super Crunch Co. Truffle Sorghum Crisps"
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
                    ★ BODEGA BESTSELLER
                  </span>
                  <h3 className="font-retro-bold font-black text-2xl text-black">
                    TRUFFLE SORGHUM CRISPS
                  </h3>
                </div>
                <div className="bg-[#FFE15D] text-black font-retro-bold font-black text-xl px-4 py-2 rounded-xl border-2 border-black shadow-[3px_3px_0px_#000] rotate-2">
                  ₹249
                </div>
              </div>
            </div>

            {/* Rotating Retro Starburst Sticker */}
            <div className="absolute -top-6 -right-6 sm:-right-8 w-24 h-24 bg-[#FFE15D] rounded-full border-[3.5px] border-black flex flex-col items-center justify-center text-center font-retro-bold font-black text-[11px] leading-tight shadow-[5px_5px_0px_#000] animate-spin-slow z-20 select-none">
              <span>100%</span>
              <span className="text-[#FF2A55]">AIR</span>
              <span>POPPED</span>
            </div>

            {/* Comic Speech Bubble Sticker */}
            <div className="absolute -bottom-6 -left-6 bg-white border-[3px] border-black p-3.5 rounded-2xl shadow-[5px_5px_0px_#000] rotate-[-6deg] z-20 max-w-[190px] select-none">
              <p className="text-xs font-black text-black leading-tight font-retro-bold">
                &ldquo;10/10 CRUNCH ZERO GREASE!&rdquo; 🤤
              </p>
            </div>

            {/* Floating Cherry Sticker */}
            <motion.div
              animate={{ y: [-4, 4, -4], rotate: [-4, 4, -4] }}
              transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
              className="absolute -top-8 left-10 bg-[#FF2A55] text-white p-2 rounded-xl border-2 border-black shadow-[3px_3px_0px_#000] z-20 text-xl font-retro-bold select-none"
            >
              🥨
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
          <span>★ 90s RETRO SNACK BODEGA</span>
          <span className="text-[#FF2A55]">●</span>
          <span>AIR-POPPED SORGHUM CRISPS</span>
          <span className="text-[#FF2A55]">●</span>
          <span>PREBIOTIC WHITE PEACH SODA</span>
          <span className="text-[#FF2A55]">●</span>
          <span>BATCH KETTLE CHIPS</span>
          <span className="text-[#FF2A55]">●</span>
          <span>HICKORY HERB SMOKED JERKY</span>
          <span className="text-[#FF2A55]">●</span>
          <span>★ 90s RETRO SNACK BODEGA</span>
          <span className="text-[#FF2A55]">●</span>
          <span>AIR-POPPED SORGHUM CRISPS</span>
          <span className="text-[#FF2A55]">●</span>
          <span>NITROGEN FRESHNESS SEALED</span>
        </div>
      </div>

      {/* Marquee Track 2 (Going Right / Reverse) */}
      <div className="bg-[#FF2A55] text-white text-xs font-retro-bold font-black uppercase py-2 overflow-hidden border-b-4 border-black flex items-center select-none">
        <div className="animate-marquee-reverse whitespace-nowrap flex items-center gap-6">
          <span>⚡ USE CODE &apos;CRUNCH20&apos; FOR 20% OFF</span>
          <span className="text-[#FFE15D]">★</span>
          <span>PAN-INDIA FAST EXPRESS SHIPPING</span>
          <span className="text-[#FFE15D]">★</span>
          <span>WHOLESALE CARTONS &amp; B2B SUPPLY</span>
          <span className="text-[#FFE15D]">★</span>
          <span>100% CLEAN LABEL CPG GOODS</span>
          <span className="text-[#FFE15D]">★</span>
          <span>⚡ USE CODE &apos;CRUNCH20&apos; FOR 20% OFF</span>
          <span className="text-[#FFE15D]">★</span>
          <span>PAN-INDIA FAST EXPRESS SHIPPING</span>
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
              HOW WE POP IT DIFFERENT
            </h2>
            <p className="text-xs sm:text-sm font-bold text-stone-900 max-w-md mx-auto">
              Explore the 3 acts of our snack popping &amp; nitrogen-sealed craft. Click through the timeline below.
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
              Swipe across our bodega shelves, air-popped sorghum batches, cold prebiotic cans, and high-protein snack drops. Click any frame to inspect in full-screen cinema mode.
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
                title: "AIR-POPPED SORGHUM POUCHES",
                category: "Ancient Grains",
                img: "/images/products/gourmet-sorghum-crisps.jpg",
                desc: "Nitrogen-flushed high-velocity popped sorghum with black truffle essence.",
              },
              {
                id: "vault-2",
                title: "BATCH KETTLE SEA SALT CHIPS",
                category: "Kettle Crisps",
                img: "/images/products/kettle-sea-salt-chips.jpg",
                desc: "Thick-cut golden farm potatoes batch kettle-fried in non-GMO sunflower oil.",
              },
              {
                id: "vault-3",
                title: "PREBIOTIC WHITE PEACH SODA",
                category: "Cold Fizz",
                img: "/images/products/prebiotic-white-peach-soda.jpg",
                desc: "Real orchard white peach puree with chicory root prebiotics in cold recyclable cans.",
              },
              {
                id: "vault-4",
                title: "SPICED MILLET CRACKERS",
                category: "Ancient Grains",
                img: "/images/products/spiced-millet-crackers.jpg",
                desc: "Sprouted foxtail and finger millets seasoned with rosemary and crushed pepper.",
              },
              {
                id: "vault-5",
                title: "BLOOD ORANGE BOTANICAL NECTAR",
                category: "Craft Fizz",
                img: "/images/products/blood-orange-ginger-nectar.jpg",
                desc: "Sicilian blood oranges cold-pressed with Himalayan ginger root and sparkling water.",
              },
              {
                id: "vault-6",
                title: "SMOKED SAVORY PEPPER JERKY",
                category: "High Protein",
                img: "/images/products/smoked-beef-jerky.jpg",
                desc: "Hickory-wood smoked lean strips cured with sea salt and cracked black pepper.",
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
                12-MONTH NITROGEN FRESH SEAL
              </h3>
              <p className="text-xs font-bold text-black leading-relaxed">
                Our crunchy snacks are nitrogen-flushed and hot-sealed in multi-layer foil pouches. Zero soggy chips, zero stale crackers, and 100% shatter-crunch in every single bite.
              </p>
            </div>

            {/* Feature 03 */}
            <div className="bg-white rounded-3xl border-4 border-black p-8 shadow-[6px_6px_0px_#000] hover:translate-y-[-4px] hover:shadow-[10px_10px_0px_#000] transition-all space-y-4 relative">
              <div className="w-14 h-14 rounded-2xl bg-[#FF6B35] text-white border-2 border-black flex items-center justify-center font-retro-bold font-black text-2xl shadow-[3px_3px_0px_#000]">
                03
              </div>
              <h3 className="font-retro-bold font-black text-2xl text-black">
                90s RETRO BODEGA CANS &amp; DROPS
              </h3>
              <p className="text-xs font-bold text-stone-700 leading-relaxed">
                Collectible tin cans, holographic comic stickers, limited monthly snack flavors, and retro soda typography that looks iconic on pantry shelves.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------
          7. IN-PAGE B2B WHOLESALE & BULK BODEGA DISPENSARY ORDERS
      ------------------------------------------------------------- */}
      <section className="py-20 md:py-28 border-b-4 border-black bg-[#FF2A55] text-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="bg-[#FFE15D] text-black rounded-3xl border-4 border-black p-8 sm:p-12 shadow-[12px_12px_0px_#000]">
            <div className="max-w-xl mx-auto text-center space-y-3 mb-10">
              <span className="font-retro-bold text-xs font-black uppercase tracking-widest bg-white border-2 border-black px-3.5 py-1 rounded-full shadow-[2px_2px_0px_#000] inline-block">
                ⚡ B2B &amp; BULK DISPENSARY
              </span>
              <h3 className="font-retro-bold font-black text-4xl sm:text-5xl uppercase leading-none">
                STOCK PEACHY PLATE IN YOUR STORE OR CAFE
              </h3>
              <p className="text-xs sm:text-sm font-bold text-stone-800">
                Inquire for wholesale carton pricing, retail distribution rights, office pantry subscriptions, and event snack drops!
              </p>
            </div>

            {resSuccess ? (
              <div className="p-8 text-center bg-white rounded-2xl border-4 border-black space-y-4">
                <Check className="w-12 h-12 text-[#48BB78] mx-auto stroke-[3]" />
                <h4 className="font-retro-bold font-black text-3xl uppercase">
                  WHOLESALE INQUIRY REGISTERED! 🥨
                </h4>
                <p className="text-xs font-bold text-stone-700 max-w-md mx-auto">
                  Our wholesale distribution team will dispatch our B2B catalog and ring {resForm.phone} within 2 hours.
                </p>
                <button
                  onClick={() => setResSuccess(false)}
                  className="px-6 py-2.5 bg-[#FF2A55] text-white font-retro-bold font-black text-xs uppercase rounded-xl border-2 border-black shadow-[2px_2px_0px_#000]"
                >
                  Submit Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleReservationSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-[11px] font-retro-bold font-black uppercase mb-1">
                      Business / Store Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={resForm.name}
                      onChange={(e) => setResForm({ ...resForm, name: e.target.value })}
                      placeholder="e.g. Neon Bodega Cafe"
                      className="w-full bg-white border-2 border-black rounded-xl px-4 py-3 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-[#FF2A55]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-retro-bold font-black uppercase mb-1">
                      Contact Mobile Number *
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
                      Business Email
                    </label>
                    <input
                      type="email"
                      value={resForm.email}
                      onChange={(e) => setResForm({ ...resForm, email: e.target.value })}
                      placeholder="buyer@store.com"
                      className="w-full bg-white border-2 border-black rounded-xl px-4 py-3 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-[#FF2A55]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-retro-bold font-black uppercase mb-1">
                      Target Delivery Date *
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
                      Channel Type *
                    </label>
                    <select
                      value={resForm.time}
                      onChange={(e) => setResForm({ ...resForm, time: e.target.value })}
                      className="w-full bg-white border-2 border-black rounded-xl px-4 py-3 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-[#FF2A55]"
                    >
                      <option value="Retail Gourmet Shelf">Retail Gourmet Shelf</option>
                      <option value="Cafe / Bar Counter">Cafe / Bar Counter</option>
                      <option value="Corporate Snack Pantry">Corporate Snack Pantry</option>
                      <option value="Online / E-Commerce Stockist">Online / E-Commerce Stockist</option>
                      <option value="Festival / Event Pop-Up">Festival / Event Pop-Up</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-retro-bold font-black uppercase mb-1">
                      Initial Case Quantity *
                    </label>
                    <select
                      value={resForm.guests}
                      onChange={(e) => setResForm({ ...resForm, guests: Number(e.target.value) })}
                      className="w-full bg-white border-2 border-black rounded-xl px-4 py-3 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-[#FF2A55]"
                    >
                      <option value={5}>Starter Trial (5 Cases - 120 Packs)</option>
                      <option value={15}>Boutique Store (15 Cases - 360 Packs)</option>
                      <option value={30}>Supermarket Shelf (30 Cases - 720 Packs)</option>
                      <option value={60}>Master Distributor (60+ Cases - Master Cartons)</option>
                    </select>
                  </div>
                </div>

                <div className="pt-2 text-center">
                  <button
                    type="submit"
                    disabled={resSubmitting}
                    className="px-10 py-4 bg-[#FF2A55] hover:bg-[#E60033] text-white font-retro-bold font-black text-sm uppercase tracking-wider rounded-2xl border-[3.5px] border-black shadow-[5px_5px_0px_#000] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[8px_8px_0px_#000] transition disabled:opacity-50"
                  >
                    {resSubmitting ? "TRANSMITTING INQUIRY..." : "REQUEST WHOLESALE CATALOG &amp; PRICING ★"}
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
                    {rev.dish_recommended || "Truffle Sorghum Crisps"}
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
