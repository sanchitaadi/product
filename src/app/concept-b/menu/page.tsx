"use client";

import React, { useEffect, useState, useMemo } from "react";
import { Search, Zap, SlidersHorizontal, ArrowUpDown, Sparkles } from "lucide-react";
import ConceptBHeader from "@/components/concept-b/Header";
import ConceptBFooter from "@/components/concept-b/Footer";
import ConceptBFoodCard from "@/components/concept-b/FoodCard";
import RetroSoundProvider, { useRetroSound } from "@/components/concept-b/RetroSoundFX";
import RetroCustomCursor from "@/components/concept-b/RetroCustomCursor";
import RetroScrollProgress from "@/components/concept-b/RetroScrollProgress";
import CinematicLightbox, { LightboxItem } from "@/components/shared/CinematicLightbox";
import * as api from "@/lib/api";

function ConceptBMenuContent() {
  const [items, setItems] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeLightboxItem, setActiveLightboxItem] = useState<LightboxItem | null>(null);

  // Filters
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [dietFilter, setDietFilter] = useState("all");
  const [sortBy, setSortBy] = useState("default");

  const { playClick, playPop, playCoin } = useRetroSound();

  useEffect(() => {
    setLoading(true);
    api
      .getMenu()
      .then((res) => {
        if (res.success) {
          setItems(res.items || []);
          setCategories(res.categories || []);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  const filteredItems = useMemo(() => {
    let result = [...items];

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (i) => i.name.toLowerCase().includes(q) || i.description.toLowerCase().includes(q)
      );
    }

    if (selectedCategory !== "all") {
      result = result.filter((i) => i.category.toLowerCase() === selectedCategory.toLowerCase());
    }

    if (dietFilter === "veg") {
      result = result.filter((i) => Number(i.is_veg) === 1);
    } else if (dietFilter === "non-veg") {
      result = result.filter((i) => Number(i.is_veg) === 0);
    }

    if (sortBy === "price-low") {
      result.sort((a, b) => Number(a.price) - Number(b.price));
    } else if (sortBy === "price-high") {
      result.sort((a, b) => Number(b.price) - Number(a.price));
    }

    return result;
  }, [items, search, selectedCategory, dietFilter, sortBy]);

  return (
    <div className="bg-[#FFF9EC] min-h-screen text-black flex flex-col font-sans selection:bg-[#FFE15D] selection:text-black relative overflow-x-clip">
      {/* Top Retro Scroll Progress */}
      <RetroScrollProgress />

      {/* Desktop Custom Cursor */}
      <RetroCustomCursor />

      {/* Concept B Header */}
      <ConceptBHeader />

      {/* Hero Strip with Comic Banner */}
      <section className="py-12 md:py-16 bg-[#FFE15D] border-b-4 border-black relative overflow-hidden">
        <div className="absolute inset-0 pattern-comic-halftone opacity-20 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 text-center space-y-3 relative z-10">
          <span className="px-4 py-1.5 bg-black text-[#FFE15D] text-xs font-retro-bold font-black uppercase tracking-wider inline-block rounded-xl border-2 border-black shadow-[3px_3px_0px_#FF2A55]">
            ⚡ BODEGA SNACK DROP &bull; 20+ PACKAGED GOODS
          </span>
          <h1 className="font-retro-bold font-black text-4xl sm:text-7xl text-black uppercase tracking-tight">
            THE OFFICIAL SNACK LINEUP
          </h1>
          <p className="text-xs sm:text-sm font-bold text-stone-900 max-w-lg mx-auto">
            Air-popped sorghum crisps, slow-roasted chili crunch, prebiotic botanical fizz cans, and dark chocolate drops shipped direct.
          </p>
        </div>
      </section>

      {/* Filter and Search Bar Strip */}
      <section className="py-6 bg-white border-b-4 border-black sticky top-0 z-30 shadow-md">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-black absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search crisps, chili jars, sodas, sweets..."
              className="w-full bg-[#FFF9EC] border-2 border-black rounded-2xl pl-11 pr-4 py-2.5 text-xs font-bold text-black focus:outline-none focus:ring-2 focus:ring-[#FF2A55] shadow-[2px_2px_0px_#000]"
            />
          </div>

          {/* Quick Diet & Sort Controls */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Diet Pills */}
            <div className="inline-flex rounded-xl border-2 border-black bg-[#FFF9EC] p-1 shadow-[2px_2px_0px_#000]">
              <button
                onClick={() => {
                  playClick();
                  setDietFilter("all");
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-retro-bold font-black uppercase tracking-wider transition ${
                  dietFilter === "all" ? "bg-black text-white" : "text-black hover:bg-stone-200"
                }`}
              >
                ALL
              </button>
              <button
                onClick={() => {
                  playClick();
                  setDietFilter("veg");
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-retro-bold font-black uppercase tracking-wider transition ${
                  dietFilter === "veg" ? "bg-[#48BB78] text-white" : "text-black hover:bg-stone-200"
                }`}
              >
                🌱 VEG
              </button>
              <button
                onClick={() => {
                  playClick();
                  setDietFilter("non-veg");
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-retro-bold font-black uppercase tracking-wider transition ${
                  dietFilter === "non-veg" ? "bg-[#FF6B35] text-white" : "text-black hover:bg-stone-200"
                }`}
              >
                🍗 NON-VEG
              </button>
            </div>

            {/* Price Sorting */}
            <select
              value={sortBy}
              onChange={(e) => {
                playClick();
                setSortBy(e.target.value);
              }}
              className="bg-[#FFF9EC] border-2 border-black rounded-xl px-3 py-2 text-xs font-retro-bold font-black text-black focus:outline-none shadow-[2px_2px_0px_#000]"
            >
              <option value="default">SORT: FEATURED</option>
              <option value="price-low">PRICE: LOW TO HIGH</option>
              <option value="price-high">PRICE: HIGH TO LOW</option>
            </select>
          </div>
        </div>

        {/* Category Carousel Scroll */}
        <div className="max-w-7xl mx-auto px-6 mt-4 overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-2 pb-1">
            <button
              onClick={() => {
                playClick();
                setSelectedCategory("all");
              }}
              className={`px-4 py-2 rounded-xl text-xs font-retro-bold font-black uppercase tracking-wider whitespace-nowrap border-2 border-black transition-all ${
                selectedCategory === "all"
                  ? "bg-[#FF2A55] text-white shadow-[3px_3px_0px_#000] scale-105"
                  : "bg-white text-black hover:bg-[#FFE15D]"
              }`}
            >
              ★ ALL ITEMS ({items.length})
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  playClick();
                  setSelectedCategory(cat.name);
                }}
                className={`px-4 py-2 rounded-xl text-xs font-retro-bold font-black uppercase tracking-wider whitespace-nowrap border-2 border-black transition-all ${
                  selectedCategory.toLowerCase() === cat.name.toLowerCase()
                    ? "bg-[#FF2A55] text-white shadow-[3px_3px_0px_#000] scale-105"
                    : "bg-white text-black hover:bg-[#FFE15D]"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Food Cards Grid */}
      <section className="py-12 md:py-16 flex-1">
        <div className="max-w-7xl mx-auto px-6">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <div
                  key={n}
                  className="h-80 bg-white rounded-3xl border-4 border-black animate-pulse"
                />
              ))}
            </div>
          ) : filteredItems.length === 0 ? (
            <div className="py-20 text-center space-y-4 bg-white rounded-3xl border-4 border-black p-8 shadow-[8px_8px_0px_#000]">
              <span className="text-5xl">🍕</span>
              <h3 className="font-retro-bold font-black text-3xl text-black uppercase">
                NO CRUNCHY BITES MATCH THIS SEARCH
              </h3>
              <p className="text-xs font-bold text-stone-600 max-w-sm mx-auto">
                Try searching for pizza, fries, latte, or reset the search query to see the entire menu.
              </p>
              <button
                onClick={() => {
                  playPop();
                  setSearch("");
                  setSelectedCategory("all");
                  setDietFilter("all");
                }}
                className="px-6 py-3 rounded-2xl bg-[#FF2A55] text-white text-xs font-retro-bold font-black uppercase border-2 border-black shadow-[3px_3px_0px_#000]"
              >
                RESET ALL FILTERS ★
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredItems.map((item) => (
                <ConceptBFoodCard
                  key={item.id}
                  item={item}
                  onOpenLightbox={setActiveLightboxItem}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <ConceptBFooter />

      {/* Full-Screen Cinema Lightbox */}
      <CinematicLightbox
        item={activeLightboxItem}
        onClose={() => setActiveLightboxItem(null)}
      />
    </div>
  );
}

export default function ConceptBMenuPage() {
  return (
    <RetroSoundProvider>
      <ConceptBMenuContent />
    </RetroSoundProvider>
  );
}
