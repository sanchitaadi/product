"use client";

import React, { useEffect, useState, useMemo } from "react";
import { Search, Sparkles, SlidersHorizontal, ArrowUpDown } from "lucide-react";
import ConceptAHeader from "@/components/concept-a/Header";
import ConceptAFooter from "@/components/concept-a/Footer";
import ConceptAFoodCard from "@/components/concept-a/FoodCard";
import CinematicLightbox, { LightboxItem } from "@/components/shared/CinematicLightbox";
import * as api from "@/lib/api";
import { CONCEPT_A_BRAND } from "@/lib/concept-catalogs";

export default function ConceptAMenuPage() {
  const [items, setItems] = useState<any[]>(CONCEPT_A_BRAND.products);
  const [categories, setCategories] = useState<any[]>(CONCEPT_A_BRAND.categories);
  const [activeLightboxItem, setActiveLightboxItem] = useState<LightboxItem | null>(null);

  // Filters
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [dietFilter, setDietFilter] = useState("all");
  const [sortBy, setSortBy] = useState("default");

  useEffect(() => {
    setItems(CONCEPT_A_BRAND.products);
    setCategories(CONCEPT_A_BRAND.categories);
  }, []);

  const filteredItems = useMemo(() => {
    let result = [...items];

    // Search
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (i) => i.name.toLowerCase().includes(q) || i.description.toLowerCase().includes(q)
      );
    }

    // Category
    if (selectedCategory !== "all") {
      result = result.filter((i) => i.category.toLowerCase() === selectedCategory.toLowerCase());
    }

    // Diet
    if (dietFilter === "veg") {
      result = result.filter((i) => Number(i.is_veg) === 1);
    } else if (dietFilter === "non-veg") {
      result = result.filter((i) => Number(i.is_veg) === 0);
    }

    // Sort
    if (sortBy === "price-low") {
      result.sort((a, b) => Number(a.price) - Number(b.price));
    } else if (sortBy === "price-high") {
      result.sort((a, b) => Number(b.price) - Number(a.price));
    }

    return result;
  }, [items, search, selectedCategory, dietFilter, sortBy]);

  return (
    <div className="bg-[#0A0B0E] min-h-screen text-[#F7F5F0] flex flex-col selection:bg-[#C5A059] selection:text-[#0A0B0E]">
      <ConceptAHeader />

      {/* Page Hero */}
      <section className="pt-16 pb-12 border-b border-[#C5A059]/20 bg-[#0E1015]">
        <div className="max-w-7xl mx-auto px-6 text-center space-y-3">
          <span className="px-3.5 py-1 rounded-full bg-[#16181F] border border-[#C5A059]/40 text-[#C5A059] text-xs font-mono font-bold uppercase tracking-widest inline-block">
            ✦ Haute Cacao &bull; Reserve Pantry Vault
          </span>
          <h1 className="font-serif font-black text-4xl sm:text-5xl text-[#F7F5F0] tracking-tight">
            Curated Reserve Catalog
          </h1>
          <p className="text-xs sm:text-sm text-[#A89F91] max-w-lg mx-auto font-light">
            Single-estate 85% bean-to-bar cacao blocks, wild honeycomb jars, 24K gold-dusted sablés, and cold-extracted coffee elixirs sealed in luxury packaging.
          </p>
        </div>
      </section>

      {/* Filter & Search Bar */}
      <section className="py-6 border-b border-[#C5A059]/20 bg-[#13151A] sticky top-[68px] z-20 shadow-xl">
        <div className="max-w-7xl mx-auto px-6 space-y-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search Input */}
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search dark cacao, honeycomb, sablés..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#C5A059]/30 bg-[#0A0B0E] text-[#F7F5F0] placeholder-gray-500 text-xs focus:outline-none focus:border-[#C5A059]"
              />
            </div>

            {/* Diet & Sort Controls */}
            <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-end">
              {/* Diet Pills */}
              <div className="flex items-center gap-1 bg-[#0A0B0E] p-1 rounded-xl border border-[#C5A059]/30">
                <button
                  onClick={() => setDietFilter("all")}
                  className={`px-3 py-1 rounded-lg text-xs font-mono transition ${
                    dietFilter === "all"
                      ? "bg-[#C5A059] text-[#0A0B0E] font-bold"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setDietFilter("veg")}
                  className={`px-3 py-1 rounded-lg text-xs font-mono transition ${
                    dietFilter === "veg"
                      ? "bg-[#C5A059] text-[#0A0B0E] font-bold"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  🌱 Vegan / Plant-Based
                </button>
              </div>

              {/* Sort Dropdown */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-[#0A0B0E] border border-[#C5A059]/30 rounded-xl px-3 py-2 text-xs font-mono text-[#F7F5F0] focus:outline-none focus:border-[#C5A059]"
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
              className={`px-4 py-1.5 rounded-full text-xs font-mono tracking-wider uppercase transition whitespace-nowrap ${
                selectedCategory === "all"
                  ? "bg-[#C5A059] text-[#0A0B0E] font-bold shadow-md shadow-[#C5A059]/20"
                  : "bg-[#0A0B0E] text-[#A89F91] border border-[#C5A059]/20 hover:text-white hover:border-[#C5A059]"
              }`}
            >
              All Provisions ({items.length})
            </button>
            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() => setSelectedCategory(c.name)}
                className={`px-4 py-1.5 rounded-full text-xs font-mono tracking-wider uppercase transition whitespace-nowrap ${
                  selectedCategory.toLowerCase() === c.name.toLowerCase()
                    ? "bg-[#C5A059] text-[#0A0B0E] font-bold shadow-md shadow-[#C5A059]/20"
                    : "bg-[#0A0B0E] text-[#A89F91] border border-[#C5A059]/20 hover:text-white hover:border-[#C5A059]"
                }`}
              >
                {c.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16 max-w-7xl mx-auto px-6 flex-1 w-full">
        {filteredItems.length === 0 ? (
          <div className="text-center py-20 bg-[#13151A] rounded-2xl border border-[#C5A059]/30">
            <span className="text-3xl text-[#C5A059]">✦</span>
            <h3 className="font-serif font-bold text-lg text-[#F7F5F0] mt-3">
              No Reserve Provisions Found
            </h3>
            <p className="text-xs text-[#A89F91] mt-1">
              Try adjusting your search terms or dietary filter.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item) => (
              <ConceptAFoodCard
                key={item.id}
                item={item}
                onOpenLightbox={(dish) => setActiveLightboxItem(dish)}
              />
            ))}
          </div>
        )}
      </section>

      <ConceptAFooter />

      <CinematicLightbox
        item={activeLightboxItem}
        onClose={() => setActiveLightboxItem(null)}
      />
    </div>
  );
}
