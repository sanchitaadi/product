"use client";

import React, { useEffect, useState, useMemo } from "react";
import { Search, Sparkles, SlidersHorizontal, Zap } from "lucide-react";
import ConceptFHeader from "@/components/concept-f/Header";
import ConceptFFooter from "@/components/concept-f/Footer";
import ConceptFFoodCard from "@/components/concept-f/FoodCard";
import CinematicLightbox, { LightboxItem } from "@/components/shared/CinematicLightbox";
import * as api from "@/lib/api";

export default function ConceptFMenuPage() {
  const [items, setItems] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [selectedCat, setSelectedCat] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [vegOnly, setVegOnly] = useState(false);
  const [sortBy, setSortBy] = useState("default");
  const [loading, setLoading] = useState(true);
  const [activeLightboxItem, setActiveLightboxItem] = useState<LightboxItem | null>(null);

  useEffect(() => {
    api
      .getMenu()
      .then((res) => {
        if (res.success && Array.isArray(res.items)) {
          setItems(res.items);
        }
        if (res.success && Array.isArray(res.categories)) {
          setCategories(res.categories);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  const filteredItems = useMemo(() => {
    let result = [...items];

    if (selectedCat !== "all") {
      result = result.filter(
        (it) => it.category?.toLowerCase() === selectedCat.toLowerCase()
      );
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (it) =>
          it.name?.toLowerCase().includes(q) ||
          it.description?.toLowerCase().includes(q) ||
          it.category?.toLowerCase().includes(q)
      );
    }

    if (vegOnly) {
      result = result.filter((it) => it.is_veg == 1);
    }

    if (sortBy === "price-asc") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-desc") {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [items, selectedCat, searchQuery, vegOnly, sortBy]);

  return (
    <div className="bg-[#FFFDF7] min-h-screen text-black flex flex-col font-sans selection:bg-[#FFE600] selection:text-black">
      <ConceptFHeader />

      {/* Manga Header Banner */}
      <section className="bg-white py-16 border-b-4 border-black text-center space-y-4 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-10 [background:repeating-conic-gradient(#000_0_2deg,transparent_2deg_10deg)]" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#FFE600] text-black font-black text-xs uppercase tracking-widest border-2 border-black shadow-[3px_3px_0px_#000] -rotate-1">
            <Zap className="w-3.5 h-3.5 text-[#D7263D] fill-[#D7263D]" />
            WEEKLY SHONEN CARTE &bull; CHAPTER 01
          </div>
          <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-black">
            Comic Food Anthology
          </h1>
          <p className="text-xs sm:text-sm text-gray-700 font-bold max-w-lg mx-auto">
            Browse our complete serialized carte of sourdough pizzas, hand-extruded pasta bowls, and manga-style desserts.
          </p>
        </div>
      </section>

      {/* Filter and Control Bar */}
      <section className="sticky top-20 z-30 bg-[#FFFDF7] border-b-3 border-black py-4 px-4 sm:px-6 shadow-sm">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto overflow-x-auto pb-1">
            <button
              onClick={() => setSelectedCat("all")}
              className={`px-4 py-1.5 text-xs font-black uppercase tracking-wider border-2 transition-all ${
                selectedCat === "all"
                  ? "bg-black text-[#FFE600] border-black shadow-[3px_3px_0px_#D7263D]"
                  : "bg-white text-black border-black hover:bg-[#FFE600]"
              }`}
            >
              ALL CHAPTERS ({items.length})
            </button>
            {categories.map((c) => (
              <button
                key={c.id || c.name}
                onClick={() => setSelectedCat(c.name)}
                className={`px-4 py-1.5 text-xs font-black uppercase tracking-wider border-2 transition-all ${
                  selectedCat.toLowerCase() === c.name?.toLowerCase()
                    ? "bg-black text-[#FFE600] border-black shadow-[3px_3px_0px_#D7263D]"
                    : "bg-white text-black border-black hover:bg-[#FFE600]"
                }`}
              >
                {c.name}
              </button>
            ))}
          </div>

          {/* Search, Veg, & Sort Controls */}
          <div className="flex items-center gap-3 w-full md:w-auto justify-end">
            {/* Search */}
            <div className="relative flex-1 md:w-56">
              <input
                type="text"
                placeholder="Search comic dishes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white border-2 border-black rounded p-2 pl-8 text-xs font-bold text-black outline-none focus:border-[#D7263D]"
              />
              <Search className="w-3.5 h-3.5 text-gray-500 absolute left-2.5 top-1/2 -translate-y-1/2" />
            </div>

            {/* Veg Toggle */}
            <button
              onClick={() => setVegOnly(!vegOnly)}
              className={`px-3 py-2 text-xs font-black uppercase tracking-wider border-2 border-black rounded transition-all shrink-0 ${
                vegOnly
                  ? "bg-[#22C55E] text-white shadow-[2px_2px_0px_#000]"
                  : "bg-white text-black hover:bg-gray-100"
              }`}
            >
              VEG ONLY 🥬
            </button>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-white border-2 border-black rounded p-2 text-xs font-bold text-black outline-none shrink-0"
            >
              <option value="default">SORT: DEFAULT</option>
              <option value="price-asc">PRICE: LOW &rarr; HIGH</option>
              <option value="price-desc">PRICE: HIGH &rarr; LOW</option>
            </select>
          </div>
        </div>
      </section>

      {/* Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-12 flex-1 w-full">
        {loading ? (
          <div className="py-24 text-center font-black text-sm text-[#D7263D] tracking-widest">
            INKING MANGA PANELS FROM BACKEND...
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="py-20 text-center max-w-md mx-auto space-y-4 bg-white border-4 border-black p-8 shadow-[8px_8px_0px_#000]">
            <span className="text-5xl">🍜</span>
            <h3 className="text-2xl font-black uppercase text-black">No Panels Located</h3>
            <p className="text-xs text-gray-600 font-bold">
              No comic dishes match your active search or diet filters.
            </p>
            <button
              onClick={() => {
                setSelectedCat("all");
                setSearchQuery("");
                setVegOnly(false);
              }}
              className="px-6 py-2.5 bg-[#D7263D] text-white font-black text-xs uppercase border-2 border-black"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredItems.map((dish) => (
              <ConceptFFoodCard
                key={dish.id}
                item={dish}
                onOpenLightbox={(item) => setActiveLightboxItem(item)}
              />
            ))}
          </div>
        )}
      </main>

      {/* Lightbox */}
      <CinematicLightbox
        item={activeLightboxItem}
        onClose={() => setActiveLightboxItem(null)}
      />

      <ConceptFFooter />
    </div>
  );
}
