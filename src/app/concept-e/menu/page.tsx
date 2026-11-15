"use client";

import React, { useEffect, useState, useMemo } from "react";
import { Search, Train, Filter, Sparkles } from "lucide-react";
import ConceptEHeader from "@/components/concept-e/Header";
import ConceptEFooter from "@/components/concept-e/Footer";
import ConceptEFoodCard from "@/components/concept-e/FoodCard";
import MetroRouteMap from "@/components/concept-e/MetroRouteMap";
import CinematicLightbox, { LightboxItem } from "@/components/shared/CinematicLightbox";
import * as api from "@/lib/api";

export default function ConceptEMenuPage() {
  const [items, setItems] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeLightboxItem, setActiveLightboxItem] = useState<LightboxItem | null>(null);

  // Filters
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [dietFilter, setDietFilter] = useState("all");
  const [sortBy, setSortBy] = useState("default");

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
        (i) => i.name.toLowerCase().includes(q) || i.description?.toLowerCase().includes(q)
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
    <div className="bg-[#050D1C] min-h-screen text-white flex flex-col font-mono selection:bg-[#FFD100] selection:text-[#08142C]">
      <ConceptEHeader />

      {/* Menu Banner */}
      <section className="bg-[#08142C] py-16 border-b-4 border-[#FFD100] text-center space-y-3 relative overflow-hidden">
        <span className="bg-[#D71920] text-white text-xs font-black uppercase px-3 py-1 border border-white inline-block">
          🚆 ALL-STATIONS FOODWAY CARTE 🚆
        </span>
        <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-white">
          THE METRO BITES CARTE
        </h1>
        <p className="text-xs sm:text-sm text-gray-300 max-w-lg mx-auto font-sans leading-relaxed">
          Order high-speed culinary preparations inspired by continental dining cars and station buffets.
        </p>
      </section>

      {/* Interactive Metro Route Map */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-10 w-full">
        <MetroRouteMap
          activeCategory={selectedCategory}
          onSelectCategory={(cat) => setSelectedCategory(cat)}
        />
      </section>

      {/* Search & Secondary Filter Controls */}
      <section className="bg-[#08142C] border-y-2 border-white/20 py-5 px-4 sm:px-6 sticky top-20 z-30 shadow-lg mt-8">
        <div className="max-w-7xl mx-auto space-y-4">
          <div className="flex flex-col md:flex-row items-center gap-4 justify-between">
            {/* Search Input */}
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#FFD100]" />
              <input
                type="text"
                placeholder="SEARCH DISHES OR STATIONS..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-[#050D1C] rounded border border-white/30 text-xs text-white placeholder-gray-500 focus:border-[#FFD100] outline-none"
              />
            </div>

            {/* Diet & Sort Switches */}
            <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-end">
              <div className="flex items-center bg-[#050D1C] border border-white/20 rounded p-1 text-xs">
                {["all", "veg", "non-veg"].map((d) => (
                  <button
                    key={d}
                    onClick={() => setDietFilter(d)}
                    className={`px-3 py-1 rounded transition-colors ${
                      dietFilter === d
                        ? "bg-[#D71920] text-white font-black"
                        : "text-gray-400 hover:text-white"
                    }`}
                  >
                    {d === "all" ? "ALL" : d === "veg" ? "🌱 VEG" : "🍗 MEAT"}
                  </button>
                ))}
              </div>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-[#050D1C] border border-white/30 px-3 py-2 text-xs uppercase text-white rounded outline-none"
              >
                <option value="default">SORT: SCHEDULED</option>
                <option value="price-low">FARE: LOW TO HIGH</option>
                <option value="price-high">FARE: HIGH TO LOW</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Food Cards Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-12 flex-1 w-full">
        <div className="mb-6 flex items-center justify-between text-xs text-gray-400">
          <span>CALLING DISHES: {filteredItems.length} SERVICES IN SERVICE</span>
          {dietFilter !== "all" && (
            <span className="text-[#FFD100] font-bold">
              FILTER: {dietFilter.toUpperCase()}
            </span>
          )}
        </div>

        {loading ? (
          <div className="py-24 text-center font-black text-xl text-[#FFD100]">
            LOADING METRO DISPATCH...
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="py-24 text-center space-y-4 bg-[#08142C] border-2 border-white/20 rounded-2xl p-12 max-w-md mx-auto">
            <span className="text-4xl">🚆</span>
            <h3 className="text-xl font-black uppercase text-white">No Services Found</h3>
            <p className="text-xs text-gray-400 font-sans">
              No train carriages found matching your search. Reset filters to view all stops.
            </p>
            <button
              onClick={() => {
                setSearch("");
                setSelectedCategory("all");
                setDietFilter("all");
              }}
              className="bg-[#FFD100] text-[#08142C] px-6 py-2 rounded text-xs font-black uppercase"
            >
              RESET SIGNALS
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((dish) => (
              <ConceptEFoodCard
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

      <ConceptEFooter />
    </div>
  );
}
