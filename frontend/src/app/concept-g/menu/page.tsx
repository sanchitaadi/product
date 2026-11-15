"use client";

import React, { useEffect, useState, useMemo } from "react";
import { Search, Star, Ticket, Sparkles } from "lucide-react";
import ConceptGHeader from "@/components/concept-g/Header";
import ConceptGFooter from "@/components/concept-g/Footer";
import ConceptGFoodCard from "@/components/concept-g/FoodCard";
import CinematicLightbox, { LightboxItem } from "@/components/shared/CinematicLightbox";
import * as api from "@/lib/api";

export default function ConceptGMenuPage() {
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
    <div className="bg-[#FFFDD0] min-h-screen text-[#5C0614] flex flex-col font-sans selection:bg-[#FFD54F] selection:text-[#5C0614]">
      <ConceptGHeader />

      {/* Carnival Header Banner */}
      <section className="bg-[#FFFDF5] py-16 border-b-6 border-[#C41E3A] text-center space-y-4 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#FFD54F] text-[#5C0614] font-black text-xs uppercase tracking-widest rounded-full border-2 border-[#5C0614] shadow-[3px_3px_0px_#C41E3A]">
            <Ticket className="w-3.5 h-3.5" />
            THE MIDWAY CARTE &bull; ALL ATTRACTIONS ADMITTED
          </div>
          <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-[#5C0614] font-serif">
            Circus Attraction Menu
          </h1>
          <p className="text-xs sm:text-sm text-[#5C0614]/80 font-medium max-w-lg mx-auto">
            Step right up! Experience our full lineup of wood-fired pizzas, carousel pastas, crisp midway appetizers, and fairground confections.
          </p>
        </div>
      </section>

      {/* Control Strip */}
      <section className="sticky top-20 z-30 bg-[#FFFDD0] border-b-3 border-[#C41E3A] py-4 px-4 sm:px-6 shadow-sm">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Categories */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto overflow-x-auto pb-1">
            <button
              onClick={() => setSelectedCat("all")}
              className={`px-4 py-1.5 text-xs font-black uppercase tracking-wider rounded-full border-2 transition-all ${
                selectedCat === "all"
                  ? "bg-[#C41E3A] text-white border-[#5C0614] shadow-[3px_3px_0px_#FFD54F]"
                  : "bg-white text-[#5C0614] border-[#5C0614] hover:bg-[#FFD54F]"
              }`}
            >
              ALL ATTRACTIONS ({items.length})
            </button>
            {categories.map((c) => (
              <button
                key={c.id || c.name}
                onClick={() => setSelectedCat(c.name)}
                className={`px-4 py-1.5 text-xs font-black uppercase tracking-wider rounded-full border-2 transition-all ${
                  selectedCat.toLowerCase() === c.name?.toLowerCase()
                    ? "bg-[#C41E3A] text-white border-[#5C0614] shadow-[3px_3px_0px_#FFD54F]"
                    : "bg-white text-[#5C0614] border-[#5C0614] hover:bg-[#FFD54F]"
                }`}
              >
                {c.name}
              </button>
            ))}
          </div>

          {/* Search, Veg, Sort */}
          <div className="flex items-center gap-3 w-full md:w-auto justify-end">
            <div className="relative flex-1 md:w-56">
              <input
                type="text"
                placeholder="Search midway food..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white border-2 border-[#5C0614] rounded-full p-2 pl-8 text-xs font-bold text-[#5C0614] outline-none focus:border-[#C41E3A]"
              />
              <Search className="w-3.5 h-3.5 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
            </div>

            <button
              onClick={() => setVegOnly(!vegOnly)}
              className={`px-3.5 py-2 text-xs font-black uppercase tracking-wider rounded-full border-2 border-[#5C0614] transition-all shrink-0 ${
                vegOnly
                  ? "bg-[#22C55E] text-white shadow-[2px_2px_0px_#5C0614]"
                  : "bg-white text-[#5C0614] hover:bg-gray-100"
              }`}
            >
              VEG ONLY 🥬
            </button>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-white border-2 border-[#5C0614] rounded-full p-2 text-xs font-bold text-[#5C0614] outline-none shrink-0"
            >
              <option value="default">SORT: DEFAULT</option>
              <option value="price-asc">FARE: LOW &rarr; HIGH</option>
              <option value="price-desc">FARE: HIGH &rarr; LOW</option>
            </select>
          </div>
        </div>
      </section>

      {/* Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-12 flex-1 w-full">
        {loading ? (
          <div className="py-24 text-center font-black text-sm text-[#C41E3A] tracking-widest">
            RAISING THE BIG TOP MARQUEE...
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="py-20 text-center max-w-md mx-auto space-y-4 bg-white border-4 border-[#C41E3A] rounded-3xl p-8 shadow-[8px_8px_0px_#5C0614]">
            <span className="text-5xl">🎪</span>
            <h3 className="text-2xl font-black uppercase text-[#5C0614] font-serif">No Attractions Located</h3>
            <p className="text-xs text-[#5C0614]/80 font-medium">
              No carnival items match your active search or diet filters.
            </p>
            <button
              onClick={() => {
                setSelectedCat("all");
                setSearchQuery("");
                setVegOnly(false);
              }}
              className="px-6 py-2.5 bg-[#C41E3A] text-white font-black text-xs uppercase rounded-full border-2 border-[#5C0614]"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredItems.map((dish) => (
              <ConceptGFoodCard
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

      <ConceptGFooter />
    </div>
  );
}
