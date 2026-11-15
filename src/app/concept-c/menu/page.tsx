"use client";

import React, { useEffect, useState, useMemo } from "react";
import { Search, Filter, Sparkles, Zap, Flame, Utensils } from "lucide-react";
import ConceptCHeader from "@/components/concept-c/Header";
import ConceptCFooter from "@/components/concept-c/Footer";
import ConceptCFoodCard from "@/components/concept-c/FoodCard";
import CinematicLightbox, { LightboxItem } from "@/components/shared/CinematicLightbox";
import * as api from "@/lib/api";

export default function ConceptCMenuPage() {
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
    <div className="bg-[#FFFDF7] min-h-screen text-[#111111] flex flex-col font-sans selection:bg-[#FFE600] selection:text-black">
      <ConceptCHeader />

      {/* Pop Art Menu Hero Banner */}
      <section className="bg-[#FF007F] text-white py-16 md:py-20 border-b-4 border-black relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center space-y-4 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-black text-[#FFE600] text-xs font-black uppercase tracking-widest border border-white">
            <Zap className="w-4 h-4 fill-current" />
            <span>EXPRESSIVE CULINARY CATALOGUE</span>
          </div>

          <h1 className="text-4xl sm:text-7xl font-black uppercase tracking-tighter text-white">
            THE POP ART MENU
          </h1>

          <p className="text-sm sm:text-base font-bold text-white/90 max-w-xl mx-auto">
            Bold recipes inspired by modern art movements, fiery artisan kitchens, and vibrant street food sensations.
          </p>
        </div>

        {/* Diagonal Pop Shapes */}
        <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-[#FFE600] border-4 border-black rotate-12 pointer-events-none" />
        <div className="absolute -top-8 -right-8 w-32 h-32 bg-[#0047FF] border-4 border-black -rotate-12 pointer-events-none" />
      </section>

      {/* Search & Filter Controls */}
      <section className="bg-white border-b-4 border-black py-6 px-4 sm:px-6 sticky top-20 z-30 shadow-md">
        <div className="max-w-7xl mx-auto space-y-4">
          <div className="flex flex-col md:flex-row items-center gap-4 justify-between">
            {/* Search Input */}
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-black stroke-[3]" />
              <input
                type="text"
                placeholder="Search dishes or ingredients..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-[#FFFDF7] border-3 border-black text-xs font-black placeholder-gray-500 focus:bg-[#FFE600]/20 focus:outline-none shadow-[2px_2px_0px_#000]"
              />
            </div>

            {/* Diet Filter and Sort */}
            <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-end">
              {/* Diet Switcher */}
              <div className="flex items-center border-3 border-black bg-[#FFFDF7] p-1 shadow-[2px_2px_0px_#000]">
                {["all", "veg", "non-veg"].map((d) => (
                  <button
                    key={d}
                    onClick={() => setDietFilter(d)}
                    className={`px-3 py-1 text-xs font-black uppercase transition-colors ${
                      dietFilter === d
                        ? "bg-[#0047FF] text-white"
                        : "text-black hover:bg-[#FFE600]"
                    }`}
                  >
                    {d === "all" ? "All" : d === "veg" ? "🌱 Veg" : "🍗 Meat"}
                  </button>
                ))}
              </div>

              {/* Sort By Dropdown */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-[#FFFDF7] border-3 border-black px-3 py-2 text-xs font-black uppercase focus:outline-none shadow-[2px_2px_0px_#000]"
              >
                <option value="default">Sort: Recommended</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            <button
              onClick={() => setSelectedCategory("all")}
              className={`px-4 py-1.5 text-xs font-black uppercase whitespace-nowrap border-2 border-black transition-all ${
                selectedCategory === "all"
                  ? "bg-[#FFE600] text-black shadow-[3px_3px_0px_#000] -translate-y-0.5"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              All Categories
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id || cat.name}
                onClick={() => setSelectedCategory(cat.name)}
                className={`px-4 py-1.5 text-xs font-black uppercase whitespace-nowrap border-2 border-black transition-all ${
                  selectedCategory.toLowerCase() === cat.name.toLowerCase()
                    ? "bg-[#FF007F] text-white shadow-[3px_3px_0px_#000] -translate-y-0.5"
                    : "bg-white text-gray-700 hover:bg-gray-100"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Food Grid Showcase */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-12 flex-1 w-full">
        <div className="mb-6 flex items-center justify-between text-xs font-black uppercase text-gray-500">
          <span>Showing {filteredItems.length} Pop Creations</span>
          {dietFilter !== "all" && (
            <span className="text-[#FF007F] font-black">
              Filtered: {dietFilter.toUpperCase()}
            </span>
          )}
        </div>

        {loading ? (
          <div className="py-24 text-center font-black text-2xl text-[#0047FF]">
            PREPARING POP ART PLATES...
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="py-24 text-center space-y-4 bg-white border-4 border-black p-12 shadow-[6px_6px_0px_#000]">
            <span className="text-5xl">🎨</span>
            <h3 className="text-2xl font-black uppercase">No Pop Dishes Found</h3>
            <p className="text-sm font-bold text-gray-600">
              Try adjusting your search query or reset your filters.
            </p>
            <button
              onClick={() => {
                setSearch("");
                setSelectedCategory("all");
                setDietFilter("all");
              }}
              className="bg-[#FFE600] text-black font-black uppercase text-xs px-6 py-2.5 border-2 border-black shadow-[3px_3px_0px_#000]"
            >
              RESET FILTERS
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((dish) => (
              <ConceptCFoodCard
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

      <ConceptCFooter />
    </div>
  );
}
