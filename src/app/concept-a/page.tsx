"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight, Heart, Star, Clock, ChefHat, Award, ShieldCheck } from "lucide-react";
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
    <div className="bg-[#FFF8F9] min-h-screen text-[#3D2D2E] flex flex-col">
      <ConceptAHeader />

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-10 pb-20 md:py-24">
        {/* Decorative Floating Bows & Sparkles */}
        <div className="absolute top-10 left-8 text-4xl animate-float-slow opacity-80 pointer-events-none">
          🎀
        </div>
        <div className="absolute top-36 right-12 text-3xl animate-pulse-glow opacity-90 pointer-events-none">
          ✨
        </div>
        <div className="absolute bottom-12 left-1/4 text-3xl animate-float-slow opacity-70 pointer-events-none">
          🌸
        </div>
        <div className="absolute top-1/2 right-1/3 text-2xl animate-float-reverse opacity-60 pointer-events-none">
          🍰
        </div>

        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Hero Left Content */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 border border-rose-200 text-[#E07A86] text-xs font-bold tracking-wide shadow-sm"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Coquette Atelier &bull; Gourmet Pantry &amp; Confections</span>
            </motion.div>

            <div>
              <span className="font-script text-2xl sm:text-3xl text-[#E07A86] block mb-1">
                ~ bonjour darling, welcome to ~
              </span>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.5 }}
                className="font-coquette-serif font-black text-4xl sm:text-6xl text-[#3D2D2E] leading-[1.12]"
              >
                Artisan Pantry Treats in <em className="text-[#E07A86] not-italic">Cute Jars 🎀</em>
              </motion.h1>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-base sm:text-lg text-gray-600 leading-relaxed max-w-xl"
            >
              Small-batch white peach preserves, French cultured butter sablés, delicate almond macarons, and single-origin dark chocolate slabs shipped fresh in ribbon gift boxes.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="flex flex-wrap items-center gap-4 pt-2"
            >
              <Link
                href="/concept-a/menu/"
                className="px-8 py-4 rounded-full bg-gradient-to-r from-[#E07A86] to-[#F59E0B] text-white font-bold text-sm tracking-wide shadow-lg shadow-rose-300/40 hover:opacity-95 transition flex items-center gap-2 group"
              >
                <span>Shop Pantry Collection</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                href="/concept-a/reservations/"
                className="px-7 py-4 rounded-full bg-white hover:bg-rose-50 text-[#3D2D2E] border border-rose-200 text-sm font-semibold tracking-wide shadow-sm transition flex items-center gap-2"
              >
                <span>Wholesale &amp; Gifting</span>
                <span>🎀</span>
              </Link>
            </motion.div>

            {/* Micro Stats */}
            <div className="pt-6 border-t border-rose-200/50 grid grid-cols-3 gap-4 max-w-md">
              <div className="bg-white/70 backdrop-blur-sm p-3 rounded-2xl border border-rose-100">
                <span className="font-coquette-serif font-bold text-2xl text-[#3D2D2E] block">4.9 ★</span>
                <span className="text-[10px] text-gray-500 uppercase tracking-wide font-medium">1,200+ Reviews</span>
              </div>
              <div className="bg-white/70 backdrop-blur-sm p-3 rounded-2xl border border-rose-100">
                <span className="font-coquette-serif font-bold text-2xl text-[#3D2D2E] block">100%</span>
                <span className="text-[10px] text-gray-500 uppercase tracking-wide font-medium">Clean Label</span>
              </div>
              <div className="bg-white/70 backdrop-blur-sm p-3 rounded-2xl border border-rose-100">
                <span className="font-coquette-serif font-bold text-2xl text-[#3D2D2E] block">Pan-India</span>
                <span className="text-[10px] text-gray-500 uppercase tracking-wide font-medium">Express Dispatch</span>
              </div>
            </div>

            {/* Romantic Animated Scroll Indicator */}
            <div className="pt-2 flex items-center gap-2 text-xs font-script text-[#E07A86]">
              <span>scroll down to explore our packaged confections &amp; pantry jars</span>
              <span className="text-sm animate-bounce">🎀</span>
            </div>
          </div>

          {/* Hero Right Layered Polaroid Collage */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="relative"
          >
            {/* Primary Main Photograph with Ken Burns camera movement */}
            <div className="relative aspect-[4/3] rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white">
              <img
                src={CONCEPT_A_BRAND.heroImage}
                alt="Maison Pêche Confectionery Atelier"
                className="w-full h-full object-cover animate-ken-burns scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              
              <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-md text-[11px] font-bold text-[#E07A86] shadow-sm flex items-center gap-1.5">
                <span>🎀</span>
                <span>The Maison Pêche Collection</span>
              </div>
            </div>

            {/* Overlapping Polaroid 1 - Top Right Dessert (Clickable Lightbox) */}
            <motion.div
              initial={{ opacity: 0, rotate: 6, scale: 0.85 }}
              animate={{ opacity: 1, rotate: 6, scale: 1 }}
              transition={{ delay: 0.35, duration: 0.6 }}
              whileHover={{ rotate: 0, scale: 1.05 }}
              onClick={() =>
                setActiveLightboxItem({
                  id: 102,
                  name: "Artisan French Cocoa & Hazelnut Sablés",
                  category: "Artisan Sablés & Biscuits",
                  image_url: "/images/products/cocoa-hazelnut-cookies.jpg",
                  price: 299,
                  description:
                    "Slow-baked melt-in-your-mouth French butter sablés loaded with roasted Turkish hazelnut praline, pure Belgian dark cocoa butter, and fleur de sel.",
                  net_weight: "200g Gift Box",
                  shelf_life: "6 Months",
                  is_veg: 1,
                  is_bestseller: 1,
                  conceptTheme: "coquette",
                })
              }
              className="absolute -top-6 -right-4 sm:-right-8 w-36 sm:w-44 bg-white p-3 rounded-2xl polaroid-shadow border border-rose-200/80 hidden sm:block z-20 cursor-pointer transition-all duration-300"
            >
              <div className="washi-tape" />
              <div className="aspect-square rounded-xl overflow-hidden mb-2">
                <img
                  src="/images/products/cocoa-hazelnut-cookies.jpg"
                  alt="Artisan Sablés"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="font-script text-base text-[#E07A86] text-center leading-tight">
                french butter sablés ♡
              </p>
            </motion.div>

            {/* Floating Review Badge */}
            <motion.div
              whileHover={{ y: -4 }}
              className="absolute -bottom-6 -left-4 sm:-left-8 bg-white/95 backdrop-blur-md p-4 rounded-2xl border border-rose-200 shadow-xl max-w-xs hidden sm:flex items-center gap-3 z-20"
            >
              <div className="w-12 h-12 rounded-full overflow-hidden bg-rose-100 shrink-0 border border-rose-200">
                <img src="/images/avatar-1.webp" alt="Reviewer" className="w-full h-full object-cover" />
              </div>
              <div>
                <div className="flex text-amber-400 text-xs">★★★★★</div>
                <p className="text-xs font-semibold text-gray-800 line-clamp-1 mt-0.5">
                  &ldquo;{CONCEPT_A_BRAND.heroReview.quote}&rdquo;
                </p>
                <span className="text-[10px] text-gray-500 font-medium">{CONCEPT_A_BRAND.heroReview.author} &bull; {CONCEPT_A_BRAND.heroReview.role}</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Featured Bestsellers */}
      <section className="py-20 bg-white border-y border-rose-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-xl mx-auto mb-14 space-y-2">
            <span className="text-xs uppercase tracking-widest text-[#E07A86] font-bold flex items-center justify-center gap-1.5">
              <span>🎀</span> Atelier Signature Pantry Batches <span>🎀</span>
            </span>
            <h2 className="font-coquette-serif font-black text-3xl sm:text-4xl text-[#3D2D2E]">
              Packaged Delicacies &amp; Cordials
            </h2>
            <p className="text-xs sm:text-sm text-gray-500">
              Slow-cooked fruit preserves, stone-ground butter cookies, single-origin cacao, and sparkling botanical drinks in glass bottles.
            </p>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((n) => (
                <div key={n} className="h-80 bg-rose-50/60 rounded-3xl animate-pulse" />
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

          <div className="mt-12 text-center">
            <Link
              href="/concept-a/menu/"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-rose-50 hover:bg-[#E07A86] text-[#E07A86] hover:text-white border border-rose-200 font-bold text-xs uppercase tracking-wider transition shadow-sm"
            >
              <span>Explore All Packaged Products</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* NEW: Coquette Moodboard & Aesthetic Moments */}
      <section className="py-20 bg-[#FFF8F9] border-b border-rose-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-xl mx-auto mb-14 space-y-2">
            <span className="font-script text-2xl text-[#E07A86] block">
              ~ pinned with love ~
            </span>
            <h2 className="font-coquette-serif font-black text-3xl sm:text-4xl text-[#3D2D2E]">
              Aesthetic Moments & Kitchen Secrets
            </h2>
            <p className="text-xs sm:text-sm text-gray-500">
              Behind our blush dining room: fresh botanicals, slow doughs, and Parisian patisserie artistry.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Pin 1 */}
            <div
              onClick={() =>
                setActiveLightboxItem({
                  id: 101,
                  name: "Signature White Peach & Blossom Jam",
                  category: "Orchard Preserves & Jams",
                  image_url: "/images/ingredients/wild-peach.jpg",
                  price: 289,
                  description:
                    "Artisanal small-batch fruit preserves slow-cooked in open copper kettles with organic orchard peaches, raw mountain honey, and natural citrus pectin.",
                  net_weight: "250g Glass Jar",
                  shelf_life: "12 Months",
                  is_veg: 1,
                  is_bestseller: 1,
                  conceptTheme: "coquette",
                })
              }
              className="relative bg-white p-4 rounded-[2rem] polaroid-shadow border border-rose-100/90 hover:-translate-y-2 transition-transform duration-300 cursor-pointer group"
            >
              <div className="washi-tape" />
              <div className="aspect-[4/5] rounded-2xl overflow-hidden mb-3 relative">
                <img
                  src="/images/ingredients/wild-peach.jpg"
                  alt="White Peach Preserve"
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-rose-900/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="text-[10px] font-bold bg-white text-[#E07A86] px-2.5 py-1 rounded-full shadow-sm">
                    View Preserve 🎀
                  </span>
                </div>
              </div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-[#E07A86] block mb-1">
                🎀 Signature Jar
              </span>
              <h4 className="font-coquette-serif font-bold text-base text-[#3D2D2E]">
                White Peach &amp; Blossom Jam
              </h4>
              <p className="font-script text-lg text-[#E07A86] mt-1">
                simmered in copper kettles ♡
              </p>
            </div>

            {/* Pin 2 */}
            <div
              onClick={() =>
                setActiveLightboxItem({
                  id: 102,
                  name: "Artisan French Cocoa & Hazelnut Sablés",
                  category: "Artisan Sablés & Biscuits",
                  image_url: "/images/products/cocoa-hazelnut-cookies.jpg",
                  price: 299,
                  description:
                    "Slow-baked melt-in-your-mouth French butter sablés loaded with roasted Turkish hazelnut praline, pure Belgian dark cocoa butter, and fleur de sel.",
                  net_weight: "200g Gift Box",
                  shelf_life: "6 Months",
                  is_veg: 1,
                  is_bestseller: 1,
                  conceptTheme: "coquette",
                })
              }
              className="relative bg-white p-4 rounded-[2rem] polaroid-shadow border border-rose-100/90 hover:-translate-y-2 transition-transform duration-300 sm:translate-y-4 cursor-pointer group"
            >
              <div className="washi-tape" />
              <div className="aspect-[4/5] rounded-2xl overflow-hidden mb-3 relative">
                <img
                  src="/images/products/cocoa-hazelnut-cookies.jpg"
                  alt="French Cocoa Sablés"
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-rose-900/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="text-[10px] font-bold bg-white text-[#E07A86] px-2.5 py-1 rounded-full shadow-sm">
                    View Sablés 🍪
                  </span>
                </div>
              </div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-[#E07A86] block mb-1">
                🍪 French Sablés
              </span>
              <h4 className="font-coquette-serif font-bold text-base text-[#3D2D2E]">
                Cocoa &amp; Hazelnut Sablés
              </h4>
              <p className="font-script text-lg text-[#E07A86] mt-1">
                slow-baked with normandy butter
              </p>
            </div>

            {/* Pin 3 */}
            <div
              onClick={() =>
                setActiveLightboxItem({
                  id: 103,
                  name: "Malabar Dark Chocolate 74% Block",
                  category: "Single-Origin Chocolates",
                  image_url: "/images/products/malabar-dark-chocolate-74.jpg",
                  price: 325,
                  description:
                    "Velvety bean-to-bar dark chocolate crafted from Malabar forest heritage cacao. Infused with crunchy roasted cocoa nibs and dusted with Himalayan rock salt.",
                  net_weight: "80g Artisanal Bar",
                  shelf_life: "12 Months",
                  is_veg: 1,
                  is_bestseller: 1,
                  conceptTheme: "coquette",
                })
              }
              className="relative bg-white p-4 rounded-[2rem] polaroid-shadow border border-rose-100/90 hover:-translate-y-2 transition-transform duration-300 cursor-pointer group"
            >
              <div className="washi-tape" />
              <div className="aspect-[4/5] rounded-2xl overflow-hidden mb-3 relative">
                <img
                  src="/images/products/malabar-dark-chocolate-74.jpg"
                  alt="Malabar Dark Chocolate"
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-rose-900/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="text-[10px] font-bold bg-white text-[#E07A86] px-2.5 py-1 rounded-full shadow-sm">
                    View Chocolate 🍫
                  </span>
                </div>
              </div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-[#E07A86] block mb-1">
                🍫 Bean-to-Bar
              </span>
              <h4 className="font-coquette-serif font-bold text-base text-[#3D2D2E]">
                Malabar 74% Dark Block
              </h4>
              <p className="font-script text-lg text-[#E07A86] mt-1">
                stone-ground for 72 hours
              </p>
            </div>

            {/* Pin 4 */}
            <div
              onClick={() =>
                setActiveLightboxItem({
                  id: 104,
                  name: "Damask Rose & Pistachio Macaron Box",
                  category: "Artisan Sablés & Biscuits",
                  image_url: "/images/parisian-macarons.webp",
                  price: 399,
                  description:
                    "Collector gift box of six delicate French almond macarons filled with aromatic Kannauj Damask rose buttercream and roasted Iranian pistachio ganache.",
                  net_weight: "130g Gift Box (6 Pcs)",
                  shelf_life: "30 Days",
                  is_veg: 1,
                  is_bestseller: 1,
                  conceptTheme: "coquette",
                })
              }
              className="relative bg-white p-4 rounded-[2rem] polaroid-shadow border border-rose-100/90 hover:-translate-y-2 transition-transform duration-300 sm:translate-y-4 cursor-pointer group"
            >
              <div className="washi-tape" />
              <div className="aspect-[4/5] rounded-2xl overflow-hidden mb-3 relative">
                <img
                  src="/images/parisian-macarons.webp"
                  alt="Parisian Sweet Treats"
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-rose-900/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="text-[10px] font-bold bg-white text-[#E07A86] px-2.5 py-1 rounded-full shadow-sm">
                    View Gift Box 🍰
                  </span>
                </div>
              </div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-[#E07A86] block mb-1">
                🍰 Luxury Gift Box
              </span>
              <h4 className="font-coquette-serif font-bold text-base text-[#3D2D2E]">
                Damask Rose Macaron Box
              </h4>
              <p className="font-script text-lg text-[#E07A86] mt-1">
                kannauj rose &amp; pistachio ganache
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy / Story Banner */}
      <section className="py-20 bg-[#FFF0F3]/60">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative aspect-[4/3] rounded-3xl overflow-hidden border-4 border-white shadow-xl">
            <img
              src="/images/heroes/flavourverse-hero.jpg"
              alt="Maison Pêche Confectionery Atelier"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-1.5 rounded-full text-xs font-script text-[#E07A86] shadow-sm">
              our confectionery atelier ♡
            </div>
          </div>

          <div className="space-y-6">
            <span className="text-xs uppercase tracking-widest text-[#E07A86] font-bold">
              Our Packaging &amp; Purity Standards
            </span>
            <h2 className="font-coquette-serif font-black text-3xl sm:text-4xl text-[#3D2D2E]">
              Small-Batch Preserves, Clean Formulas, and Pastel Ribbon Keepsakes 🎀
            </h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              At Peachy Plate, we craft packaged treats designed to turn your everyday snacking and cooking into an aesthetic ritual. We say no to palm oils, synthetic dyes, and artificial preservatives. Every jar is hot-filled in recycled glass, sealed with tamper-evident golden foil, and hand-tied with our signature cotton ribbon.
            </p>
            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-white border border-rose-200/60 shadow-xs">
                <ChefHat className="w-5 h-5 text-[#E07A86] mb-2" />
                <h4 className="font-bold text-xs uppercase tracking-wider text-gray-900">Clean Label</h4>
                <p className="text-[11px] text-gray-500 mt-1">100% real fruit, cold-pressed oils, and cane sugar</p>
              </div>
              <div className="p-4 rounded-2xl bg-white border border-rose-200/60 shadow-xs">
                <Award className="w-5 h-5 text-[#E07A86] mb-2" />
                <h4 className="font-bold text-xs uppercase tracking-wider text-gray-900">Extended Freshness</h4>
                <p className="text-[11px] text-gray-500 mt-1">Naturally shelf-stable for 6 to 18 months</p>
              </div>
            </div>
            <Link
              href="/concept-a/about/"
              className="inline-flex items-center gap-2 text-xs font-bold text-[#E07A86] hover:underline"
            >
              <span>Read Our Full Story</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Guest Reviews Carousel / Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-lg mx-auto mb-14 space-y-2">
            <span className="text-xs uppercase tracking-widest text-[#E07A86] font-bold">
              Pantry Testimonials
            </span>
            <h2 className="font-coquette-serif font-black text-3xl sm:text-4xl text-[#3D2D2E]">
              Love Letters from Pantry Aficionados
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviews.slice(0, 3).map((rev) => (
              <div
                key={rev.id}
                className="p-6 rounded-3xl bg-[#FFF8F9] border border-rose-100 shadow-sm flex flex-col justify-between hover:shadow-md transition"
              >
                <div>
                  <div className="flex text-amber-400 text-sm mb-3">
                    {"★".repeat(Number(rev.rating) || 5)}
                  </div>
                  <p className="text-xs text-gray-700 leading-relaxed italic">
                    &ldquo;{rev.review_text}&rdquo;
                  </p>
                </div>
                <div className="pt-4 mt-4 border-t border-rose-200/40 flex items-center justify-between">
                  <div>
                    <span className="font-bold text-xs block text-gray-900">{rev.customer_name}</span>
                    <span className="text-[10px] text-gray-400 font-medium">Loved {rev.dish_recommended || "Everything"}</span>
                  </div>
                  <span className="text-lg">🎀</span>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              href="/concept-a/reviews/"
              className="text-xs font-bold text-[#E07A86] hover:underline"
            >
              View All Customer Reviews &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* Reservation & Ordering CTA Strip */}
      <section className="py-16 bg-gradient-to-r from-[#FFE5D9] via-[#FFF0F3] to-[#FFCAD4] border-t border-rose-200/60">
        <div className="max-w-5xl mx-auto px-6 text-center space-y-6">
          <span className="text-3xl">🎀</span>
          <h2 className="font-coquette-serif font-black text-3xl sm:text-5xl text-[#3D2D2E]">
            Curating Boutique Gift Hampers or Stocking Shelves?
          </h2>
          <p className="text-sm text-gray-600 max-w-xl mx-auto">
            Order custom ribbon-tied holiday hampers, corporate snack boxes, or request wholesale distributor pricing.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/concept-a/reservations/"
              className="px-8 py-4 rounded-full bg-gradient-to-r from-[#E07A86] to-[#F59E0B] text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-rose-300/50 hover:opacity-95 transition"
            >
              Inquire Wholesale &amp; Gifting
            </Link>
            <Link
              href="/concept-a/menu/"
              className="px-8 py-4 rounded-full bg-white text-[#3D2D2E] border border-rose-200 font-bold text-xs uppercase tracking-wider shadow-sm hover:bg-rose-50 transition"
            >
              Shop Direct to Consumer
            </Link>
          </div>
        </div>
      </section>

      <ConceptAFooter />

      {/* Coquette Cinematic Lightbox */}
      <CinematicLightbox
        item={activeLightboxItem}
        onClose={() => setActiveLightboxItem(null)}
      />
    </div>
  );
}
