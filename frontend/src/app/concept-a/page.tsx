"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight, Heart, Star, Clock, Award, ShieldCheck, Package, CheckCircle2 } from "lucide-react";
import ConceptAHeader from "@/components/concept-a/Header";
import ConceptAFooter from "@/components/concept-a/Footer";
import ConceptAFoodCard from "@/components/concept-a/FoodCard";
import CinematicLightbox, { LightboxItem } from "@/components/shared/CinematicLightbox";
import PageTransition from "@/components/shared/PageTransition";
import * as api from "@/lib/api";
import { CONCEPT_A_BRAND } from "@/lib/concept-catalogs";

export default function ConceptAHomePage() {
  const [featured, setFeatured] = useState<any[]>(CONCEPT_A_BRAND.products);
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeLightboxItem, setActiveLightboxItem] = useState<LightboxItem | null>(null);

  useEffect(() => {
    api.getReviews(6).then((revRes) => {
      if (revRes.success && Array.isArray(revRes.reviews)) {
        setReviews(revRes.reviews);
      }
    });
  }, []);

  return (
    <div className="bg-[#0A0B0E] min-h-screen text-[#F7F5F0] flex flex-col selection:bg-[#C5A059] selection:text-[#0A0B0E]">
      <ConceptAHeader />

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-24 md:py-28 border-b border-[#C5A059]/20">
        {/* Subtle Ambient Gold Glows */}
        <div className="absolute top-1/4 left-10 w-96 h-96 bg-[#C5A059]/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Hero Left Content */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#16181F] border border-[#C5A059]/40 text-[#C5A059] text-xs font-semibold tracking-widest uppercase shadow-sm"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>{CONCEPT_A_BRAND.heroBadge}</span>
            </motion.div>

            <div>
              <span className="font-serif italic text-xl sm:text-2xl text-[#C5A059] block mb-2 tracking-wide">
                ~ Curated Reserve Pantry Provisions ~
              </span>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.5 }}
                className="font-serif font-black text-4xl sm:text-6xl text-[#F7F5F0] leading-[1.12] tracking-tight"
              >
                {CONCEPT_A_BRAND.heroHeadline} <em className="text-[#C5A059] not-italic font-normal">{CONCEPT_A_BRAND.heroHeadlineEm}</em>
              </motion.h1>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-base sm:text-lg text-[#D1C7BD] leading-relaxed max-w-xl font-light"
            >
              {CONCEPT_A_BRAND.heroDescription}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="flex flex-wrap items-center gap-4 pt-2"
            >
              <Link
                href="/concept-a/menu/"
                className="px-8 py-4 rounded-xl bg-gradient-to-r from-[#C5A059] via-[#D4AF37] to-[#B38F46] text-[#0A0B0E] font-bold text-xs uppercase tracking-widest shadow-lg shadow-[#C5A059]/20 hover:brightness-110 transition flex items-center gap-2 group"
              >
                <span>Explore Reserve Collection</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                href="/concept-a/reservations/"
                className="px-7 py-4 rounded-xl bg-[#16181F] hover:bg-[#1C1F27] text-[#D1C7BD] hover:text-[#C5A059] border border-[#C5A059]/40 text-xs font-semibold uppercase tracking-wider shadow-sm transition flex items-center gap-2"
              >
                <span>Corporate &amp; Luxury Gifting</span>
                <span className="text-[#C5A059]">✦</span>
              </Link>
            </motion.div>

            {/* Micro Stats */}
            <div className="pt-6 border-t border-[#C5A059]/20 grid grid-cols-3 gap-4 max-w-md">
              <div className="bg-[#13151A] p-3.5 rounded-xl border border-[#C5A059]/30">
                <span className="font-serif font-bold text-xl text-[#F7F5F0] block">85%</span>
                <span className="text-[10px] text-[#A89F91] uppercase tracking-wider font-mono">Grand Cru Cacao</span>
              </div>
              <div className="bg-[#13151A] p-3.5 rounded-xl border border-[#C5A059]/30">
                <span className="font-serif font-bold text-xl text-[#F7F5F0] block">100%</span>
                <span className="text-[10px] text-[#A89F91] uppercase tracking-wider font-mono">Single Estate</span>
              </div>
              <div className="bg-[#13151A] p-3.5 rounded-xl border border-[#C5A059]/30">
                <span className="font-serif font-bold text-xl text-[#F7F5F0] block">Cold-Chain</span>
                <span className="text-[10px] text-[#A89F91] uppercase tracking-wider font-mono">Pan-India Dispatch</span>
              </div>
            </div>

            {/* Scroll Indicator */}
            <div className="pt-2 flex items-center gap-2 text-xs font-mono text-[#C5A059]/80 uppercase tracking-widest">
              <span>Scroll down to inspect our reserve pantry vault</span>
              <span className="text-sm animate-bounce">↓</span>
            </div>
          </div>

          {/* Hero Right Luxury Card Showcase */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="relative"
          >
            {/* Primary Main Photograph */}
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border-2 border-[#C5A059]/40 bg-[#16181F]">
              <img
                src={CONCEPT_A_BRAND.heroImage}
                alt="Maison Reserve Luxury Pantry"
                className="w-full h-full object-cover animate-ken-burns scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0B0E]/80 via-transparent to-transparent" />
              
              <div className="absolute top-4 left-4 px-3.5 py-1.5 rounded-full bg-[#0A0B0E]/90 backdrop-blur-md text-[11px] font-semibold text-[#C5A059] border border-[#C5A059]/40 shadow-sm flex items-center gap-1.5">
                <span>✦</span>
                <span className="tracking-wider uppercase">Maison Reserve Vault Edition</span>
              </div>
            </div>

            {/* Overlapping Floating Cacao Bar (Clickable Lightbox) */}
            <motion.div
              initial={{ opacity: 0, rotate: 4, scale: 0.85 }}
              animate={{ opacity: 1, rotate: 4, scale: 1 }}
              transition={{ delay: 0.35, duration: 0.6 }}
              whileHover={{ rotate: 0, scale: 1.05 }}
              onClick={() =>
                setActiveLightboxItem({
                  id: 101,
                  name: "Single-Estate 85% Bean-to-Bar Dark Cacao",
                  category: "Bean-to-Bar Cacao Blocks",
                  image_url: "/images/products/noir-cacao-bar.jpg",
                  price: 380,
                  description:
                    "Velvety single-origin dark chocolate crafted from shaded Malabar forest cacao pods. Infused with crunchy roasted cocoa nibs and dusted with smoked sea salt crystals.",
                  net_weight: "80g Gold-Foil Bar",
                  shelf_life: "18 Months",
                  is_veg: 1,
                  is_bestseller: 1,
                  conceptTheme: "luxury",
                })
              }
              className="absolute -top-6 -right-4 sm:-right-8 w-40 sm:w-48 bg-[#13151A] p-3 rounded-2xl shadow-2xl border border-[#C5A059]/50 hidden sm:block z-20 cursor-pointer transition-all duration-300"
            >
              <div className="aspect-square rounded-xl overflow-hidden mb-2 bg-[#0A0B0E]">
                <img
                  src="/images/products/noir-cacao-bar.jpg"
                  alt="Single-Estate Cacao Bar"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="font-serif text-xs text-[#C5A059] text-center leading-tight tracking-wider uppercase font-semibold">
                85% Malabar Cacao Bar ✦
              </p>
            </motion.div>

            {/* Floating Review Badge */}
            <motion.div
              whileHover={{ y: -4 }}
              className="absolute -bottom-6 -left-4 sm:-left-8 bg-[#13151A]/95 backdrop-blur-md p-4 rounded-2xl border border-[#C5A059]/40 shadow-2xl max-w-xs hidden sm:flex items-center gap-3 z-20"
            >
              <div className="w-12 h-12 rounded-full overflow-hidden bg-[#16181F] shrink-0 border border-[#C5A059]/50">
                <img src="/images/avatar-1.webp" alt="Reviewer" className="w-full h-full object-cover" />
              </div>
              <div>
                <div className="flex text-[#D4AF37] text-xs">★★★★★</div>
                <p className="text-xs font-serif text-[#F7F5F0] line-clamp-1 mt-0.5">
                  &ldquo;{CONCEPT_A_BRAND.heroReview.quote}&rdquo;
                </p>
                <span className="text-[10px] text-[#A89F91] font-mono">{CONCEPT_A_BRAND.heroReview.author} &bull; {CONCEPT_A_BRAND.heroReview.role}</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Featured Reserve Catalog */}
      <section className="py-24 bg-[#0E1015] border-b border-[#C5A059]/20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-xl mx-auto mb-16 space-y-3">
            <span className="text-xs uppercase tracking-[0.2em] text-[#C5A059] font-bold flex items-center justify-center gap-2 font-mono">
              <span>✦</span> ATELIER RESERVE PANTRY BATCHES <span>✦</span>
            </span>
            <h2 className="font-serif font-black text-3xl sm:text-4xl text-[#F7F5F0] tracking-tight">
              Curated Packaged Provisions
            </h2>
            <p className="text-xs sm:text-sm text-[#A89F91] font-light">
              Single-estate dark chocolates, raw mountain honeycomb jars, gold-dusted butter sablés, and cold-extracted Arabica elixirs sealed for long shelf-life.
            </p>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((n) => (
                <div key={n} className="h-80 bg-[#16181F] rounded-2xl animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featured.map((item) => (
                <ConceptAFoodCard
                  key={item.id}
                  item={item}
                  onOpenLightbox={(dish) => setActiveLightboxItem(dish)}
                />
              ))}
            </div>
          )}

          <div className="mt-14 text-center">
            <Link
              href="/concept-a/menu/"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-[#16181F] hover:bg-[#C5A059] text-[#C5A059] hover:text-[#0A0B0E] border border-[#C5A059]/40 font-bold text-xs uppercase tracking-widest transition shadow-md"
            >
              <span>Explore Complete Reserve Catalog</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* CPG Packaging Vault & Quality Standards */}
      <section className="py-24 bg-[#0A0B0E] border-b border-[#C5A059]/20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-xl mx-auto mb-16 space-y-3">
            <span className="font-serif italic text-2xl text-[#C5A059] block">
              ~ The Reserve Standard ~
            </span>
            <h2 className="font-serif font-black text-3xl sm:text-4xl text-[#F7F5F0] tracking-tight">
              Haute Packaging &amp; Climate Preservation
            </h2>
            <p className="text-xs sm:text-sm text-[#A89F91]">
              Every provision is packaged in specialized airtight materials designed to preserve volatile aromas and prevent oxidation during transit.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Vault 1 */}
            <div
              onClick={() =>
                setActiveLightboxItem({
                  id: 101,
                  name: "Single-Estate 85% Bean-to-Bar Dark Cacao",
                  category: "Bean-to-Bar Cacao Blocks",
                  image_url: "/images/products/noir-cacao-bar.jpg",
                  price: 380,
                  description:
                    "Velvety single-origin dark chocolate crafted from shaded Malabar forest cacao pods. Infused with crunchy roasted cocoa nibs and dusted with smoked sea salt crystals.",
                  net_weight: "80g Gold-Foil Bar",
                  shelf_life: "18 Months",
                  is_veg: 1,
                  is_bestseller: 1,
                  conceptTheme: "luxury",
                })
              }
              className="relative bg-[#13151A] p-4 rounded-2xl border border-[#C5A059]/30 hover:border-[#C5A059] hover:-translate-y-2 transition-all duration-300 cursor-pointer group"
            >
              <div className="aspect-[4/5] rounded-xl overflow-hidden mb-3 relative bg-[#0A0B0E]">
                <img
                  src="/images/products/noir-cacao-bar.jpg"
                  alt="85% Cacao Bar"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="text-[10px] font-bold bg-[#C5A059] text-[#0A0B0E] px-3 py-1 rounded-full uppercase tracking-wider">
                    Inspect Foil ✦
                  </span>
                </div>
              </div>
              <span className="text-[10px] uppercase font-mono font-bold tracking-widest text-[#C5A059] block mb-1">
                ✦ Gold-Foil Wrapped
              </span>
              <h4 className="font-serif font-bold text-base text-[#F7F5F0]">
                85% Malabar Dark Cacao
              </h4>
              <p className="text-xs text-[#A89F91] mt-1 font-light">
                Nitrogen-sealed in matte noir gift carton
              </p>
            </div>

            {/* Vault 2 */}
            <div
              onClick={() =>
                setActiveLightboxItem({
                  id: 102,
                  name: "24K Gold-Dusted Normandy Butter Sablés",
                  category: "Gold-Dusted French Sablés",
                  image_url: "/images/products/cocoa-hazelnut-cookies.jpg",
                  price: 349,
                  description:
                    "Melt-in-your-mouth French cultured butter sablés loaded with roasted Turkish hazelnut praline, pure Belgian dark cocoa butter, and edible 24K gold dust.",
                  net_weight: "200g Luxury Tin",
                  shelf_life: "9 Months",
                  is_veg: 1,
                  is_bestseller: 1,
                  conceptTheme: "luxury",
                })
              }
              className="relative bg-[#13151A] p-4 rounded-2xl border border-[#C5A059]/30 hover:border-[#C5A059] hover:-translate-y-2 transition-all duration-300 sm:translate-y-4 cursor-pointer group"
            >
              <div className="aspect-[4/5] rounded-xl overflow-hidden mb-3 relative bg-[#0A0B0E]">
                <img
                  src="/images/products/cocoa-hazelnut-cookies.jpg"
                  alt="Gold Sablés"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="text-[10px] font-bold bg-[#C5A059] text-[#0A0B0E] px-3 py-1 rounded-full uppercase tracking-wider">
                    Inspect Tin ✦
                  </span>
                </div>
              </div>
              <span className="text-[10px] uppercase font-mono font-bold tracking-widest text-[#C5A059] block mb-1">
                ✦ Embossed Tin Caddy
              </span>
              <h4 className="font-serif font-bold text-base text-[#F7F5F0]">
                24K Gold Butter Sablés
              </h4>
              <p className="text-xs text-[#A89F91] mt-1 font-light">
                Airtight reusable caddy keeps crunch for 9 months
              </p>
            </div>

            {/* Vault 3 */}
            <div
              onClick={() =>
                setActiveLightboxItem({
                  id: 103,
                  name: "Raw Himalayan Wild Honeycomb Reserve",
                  category: "Reserve Wild Honeycombs",
                  image_url: "/images/products/noir-truffle-honey.jpg",
                  price: 520,
                  description:
                    "Pristine raw wild honeycomb cut directly from Himalayan forest hives. Infused with black winter truffle shavings and sealed in hexagonal heavy glass.",
                  net_weight: "350g Hexagonal Jar",
                  shelf_life: "24 Months",
                  is_veg: 1,
                  is_bestseller: 1,
                  conceptTheme: "luxury",
                })
              }
              className="relative bg-[#13151A] p-4 rounded-2xl border border-[#C5A059]/30 hover:border-[#C5A059] hover:-translate-y-2 transition-all duration-300 cursor-pointer group"
            >
              <div className="aspect-[4/5] rounded-xl overflow-hidden mb-3 relative bg-[#0A0B0E]">
                <img
                  src="/images/products/noir-truffle-honey.jpg"
                  alt="Wild Honeycomb"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="text-[10px] font-bold bg-[#C5A059] text-[#0A0B0E] px-3 py-1 rounded-full uppercase tracking-wider">
                    Inspect Jar ✦
                  </span>
                </div>
              </div>
              <span className="text-[10px] uppercase font-mono font-bold tracking-widest text-[#C5A059] block mb-1">
                ✦ Wax-Sealed Hex Jar
              </span>
              <h4 className="font-serif font-bold text-base text-[#F7F5F0]">
                Himalayan Honeycomb
              </h4>
              <p className="text-xs text-[#A89F91] mt-1 font-light">
                Wax-dipped lid preserves active enzymes &amp; aromatics
              </p>
            </div>

            {/* Vault 4 */}
            <div
              onClick={() =>
                setActiveLightboxItem({
                  id: 104,
                  name: "Cold-Drip Arabica Espresso Elixir",
                  category: "Cold-Drip Elixirs & Teas",
                  image_url: "/images/products/noir-coffee-elixir.jpg",
                  price: 440,
                  description:
                    "24-hour slow ice-drip concentrate of shade-grown Coorg estate Arabica. Bottled in violet UV-protective glass with natural botanical glycerin.",
                  net_weight: "250ml UV Glass",
                  shelf_life: "12 Months",
                  is_veg: 1,
                  is_bestseller: 1,
                  conceptTheme: "luxury",
                })
              }
              className="relative bg-[#13151A] p-4 rounded-2xl border border-[#C5A059]/30 hover:border-[#C5A059] hover:-translate-y-2 transition-all duration-300 sm:translate-y-4 cursor-pointer group"
            >
              <div className="aspect-[4/5] rounded-xl overflow-hidden mb-3 relative bg-[#0A0B0E]">
                <img
                  src="/images/products/noir-coffee-elixir.jpg"
                  alt="Cold-Drip Elixir"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="text-[10px] font-bold bg-[#C5A059] text-[#0A0B0E] px-3 py-1 rounded-full uppercase tracking-wider">
                    Inspect Bottle ✦
                  </span>
                </div>
              </div>
              <span className="text-[10px] uppercase font-mono font-bold tracking-widest text-[#C5A059] block mb-1">
                ✦ UV Miron Glass
              </span>
              <h4 className="font-serif font-bold text-base text-[#F7F5F0]">
                Cold-Drip Coffee Elixir
              </h4>
              <p className="text-xs text-[#A89F91] mt-1 font-light">
                Violet glass blocks harmful light spectrum to protect notes
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CPG Philosophy & Production Atelier */}
      <section className="py-24 bg-[#0E1015]">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative aspect-[4/3] rounded-3xl overflow-hidden border-2 border-[#C5A059]/40 shadow-2xl bg-[#16181F]">
            <img
              src="/images/heroes/noir-reserve-hero.jpg"
              alt="Maison Reserve Processing Atelier"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-4 right-4 bg-[#0A0B0E]/90 backdrop-blur-sm px-4 py-1.5 rounded-full text-xs font-mono text-[#C5A059] border border-[#C5A059]/40 shadow-sm">
              Cold-Chain Processing Atelier ✦
            </div>
          </div>

          <div className="space-y-6">
            <span className="text-xs uppercase tracking-[0.2em] text-[#C5A059] font-mono font-bold">
              Clean Label Formulation &bull; Zero Compromise
            </span>
            <h2 className="font-serif font-black text-3xl sm:text-4xl text-[#F7F5F0]">
              Single-Estate Sourcing, 72-Hour Stone Conching, and Climate-Insulated Cases
            </h2>
            <p className="text-sm text-[#D1C7BD] leading-relaxed font-light">
              At Maison Reserve, we elevate packaged pantry goods into collector-grade experiences. We refuse hydrogenated palm oils, artificial sweeteners, and synthetic preservatives. Our dark chocolates are stone-conched with pure cocoa butter for 72 continuous hours, and every dispatch box features custom insulated liners and gel packs for perfect doorstep arrival anywhere in India.
            </p>
            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-[#13151A] border border-[#C5A059]/30">
                <CheckCircle2 className="w-5 h-5 text-[#C5A059] mb-2" />
                <h4 className="font-serif font-bold text-xs uppercase tracking-wider text-[#F7F5F0]">100% Clean Formulation</h4>
                <p className="text-[11px] text-[#A89F91] mt-1">Single-origin cacao, raw honey, Normandy butter, fleur de sel</p>
              </div>
              <div className="p-4 rounded-xl bg-[#13151A] border border-[#C5A059]/30">
                <Award className="w-5 h-5 text-[#C5A059] mb-2" />
                <h4 className="font-serif font-bold text-xs uppercase tracking-wider text-[#F7F5F0]">Extended Ambient Shelf-Life</h4>
                <p className="text-[11px] text-[#A89F91] mt-1">Hermetically sealed for 12 to 24 months of peak aroma</p>
              </div>
            </div>
            <Link
              href="/concept-a/about/"
              className="inline-flex items-center gap-2 text-xs font-bold text-[#C5A059] hover:underline uppercase tracking-wider font-mono"
            >
              <span>Explore Our Bean-to-Bar Process</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Sommelier & Connoisseur Reviews */}
      <section className="py-24 bg-[#0A0B0E] border-t border-[#C5A059]/20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-lg mx-auto mb-16 space-y-2">
            <span className="text-xs uppercase tracking-[0.2em] text-[#C5A059] font-mono font-bold">
              Connoisseur Endorsements
            </span>
            <h2 className="font-serif font-black text-3xl sm:text-4xl text-[#F7F5F0]">
              Notes from Discerning Patrons
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviews.slice(0, 3).map((rev) => (
              <div
                key={rev.id}
                className="p-6 rounded-2xl bg-[#13151A] border border-[#C5A059]/30 shadow-lg flex flex-col justify-between hover:border-[#C5A059] transition"
              >
                <div>
                  <div className="flex text-[#D4AF37] text-sm mb-3">
                    {"★".repeat(Number(rev.rating) || 5)}
                  </div>
                  <p className="text-xs text-[#D1C7BD] leading-relaxed italic font-serif">
                    &ldquo;{rev.review_text}&rdquo;
                  </p>
                </div>
                <div className="pt-4 mt-4 border-t border-[#C5A059]/20 flex items-center justify-between">
                  <div>
                    <span className="font-bold text-xs block text-[#F7F5F0]">{rev.customer_name}</span>
                    <span className="text-[10px] text-[#A89F91] font-mono">Pantry Batch: {rev.dish_recommended || "Single-Estate 85% Cacao"}</span>
                  </div>
                  <span className="text-xs text-[#C5A059]">✦ VERIFIED</span>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/concept-a/reviews/"
              className="text-xs font-mono font-bold text-[#C5A059] hover:underline uppercase tracking-widest"
            >
              Inspect All Client Tasting Notes &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* Private Stockist & Corporate Gifting Section */}
      <section className="py-20 bg-gradient-to-r from-[#0D0E11] via-[#16181F] to-[#0D0E11] border-t border-[#C5A059]/30">
        <div className="max-w-5xl mx-auto px-6 text-center space-y-6">
          <span className="text-2xl text-[#C5A059]">✦ ✦ ✦</span>
          <h2 className="font-serif font-black text-3xl sm:text-5xl text-[#F7F5F0] tracking-tight">
            Curating Bespoke Corporate Suites or High-End Gifting?
          </h2>
          <p className="text-sm text-[#D1C7BD] max-w-xl mx-auto font-light leading-relaxed">
            Inquire for custom wax-sealed wooden gift chests, 5-star hotel mini-bar suites, and private label gourmet curation delivered across India.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              href="/concept-a/reservations/"
              className="px-8 py-4 rounded-xl bg-gradient-to-r from-[#C5A059] via-[#D4AF37] to-[#B38F46] text-[#0A0B0E] font-bold text-xs uppercase tracking-widest shadow-xl shadow-[#C5A059]/20 hover:brightness-110 transition"
            >
              Inquire Corporate &amp; Luxury Gifting
            </Link>
            <Link
              href="/concept-a/menu/"
              className="px-8 py-4 rounded-xl bg-[#16181F] text-[#F7F5F0] border border-[#C5A059]/40 font-bold text-xs uppercase tracking-widest shadow-sm hover:bg-[#1C1F27] hover:text-[#C5A059] transition"
            >
              Shop D2C Pantry Units
            </Link>
          </div>
        </div>
      </section>

      <ConceptAFooter />

      {/* Luxury Cinematic Lightbox */}
      <CinematicLightbox
        item={activeLightboxItem}
        onClose={() => setActiveLightboxItem(null)}
      />
    </div>
  );
}
