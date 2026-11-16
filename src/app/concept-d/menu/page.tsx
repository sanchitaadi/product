"use client";

import React, { useEffect, useState, useMemo } from "react";
import { Search, Filter, Leaf, Sparkles } from "lucide-react";
import ConceptDHeader from "@/components/concept-d/Header";
import ConceptDFooter from "@/components/concept-d/Footer";
import ConceptDFoodCard from "@/components/concept-d/FoodCard";
import CinematicLightbox, { LightboxItem } from "@/components/shared/CinematicLightbox";
import { CONCEPT_D_BRAND } from "@/lib/concept-catalogs";
import * as api from "@/lib/api";

export default function ConceptDMenuPage() {
  const [items, setItems] = useState<any[]>(CONCEPT_D_BRAND.products);
  const [categories, setCategories] = useState<any[]>(CONCEPT_D_BRAND.categories);
  const [loading, setLoading] = useState(false);
  const [activeLightboxItem, setActiveLightboxItem] = useState<LightboxItem | null>(null);

  // Filters
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [dietFilter, setDietFilter] = useState("all");
  const [sortBy, setSortBy] = useState("default");

  useEffect(() => {
    setItems(CONCEPT_D_BRAND.products);
    setCategories(CONCEPT_D_BRAND.categories);
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
    <div className="bg-[#FDFBF7] min-h-screen text-[#1E3F20] flex flex-col font-serif selection:bg-[#7B8E78] selection:text-white">
      <ConceptDHeader />

      {/* Botanical Menu Banner */}
      <section className="bg-[#F2EFE9] py-16 md:py-20 border-b border-[#5E6B4E]/20 text-center space-y-3">
        <span className="text-[11px] uppercase tracking-widest text-[#7B8E78] block">
          Regenerative Farmland Harvest
        </span>
        <h1 className="text-4xl sm:text-6xl font-normal text-[#1E3F20] tracking-tight">
          The Harvest Pantry Shop
        </h1>
        <p className="text-xs sm:text-sm text-[#5E6B4E] max-w-lg mx-auto font-light leading-relaxed">
          Cold-pressed botanical oils, stone-milled ancient flours, raw wildflower honey, and wild-crafted pantry staples.
        </p>
      </section>

      {/* Filter Bar */}
      <section className="bg-[#FDFBF7] border-b border-[#5E6B4E]/15 py-5 px-4 sm:px-6 sticky top-20 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto space-y-4">
          <div className="flex flex-col md:flex-row items-center gap-4 justify-between">
            {/* Search */}
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#7B8E78]" />
              <input
                type="text"
                placeholder="Search pantry oils, honey, grains, tea..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-[#F2EFE9] rounded-full border border-[#5E6B4E]/20 text-xs text-[#1E3F20] placeholder-[#7B8E78] focus:border-[#5E6B4E] outline-none"
              />
            </div>

            {/* Diet & Sort */}
            <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-end">
              <div className="flex items-center bg-[#F2EFE9] rounded-full p-1 border border-[#5E6B4E]/20 text-xs">
                {["all", "veg", "non-veg"].map((d) => (
                  <button
                    key={d}
                    onClick={() => setDietFilter(d)}
                    className={`px-3 py-1 rounded-full transition-colors ${
                      dietFilter === d
                        ? "bg-[#5E6B4E] text-[#FDFBF7]"
                        : "text-[#5E6B4E] hover:text-[#1E3F20]"
                    }`}
                  >
                    {d === "all" ? "All" : d === "veg" ? "🌱 Organic Veg" : "🌾 Farm Cuts"}
                  </button>
                ))}
              </div>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-[#F2EFE9] rounded-full border border-[#5E6B4E]/20 px-4 py-2 text-xs text-[#1E3F20] outline-none"
              >
                <option value="default">Sort: Recommended</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none text-xs">
            <button
              onClick={() => setSelectedCategory("all")}
              className={`px-4 py-1.5 rounded-full whitespace-nowrap transition-all ${
                selectedCategory === "all"
                  ? "bg-[#5E6B4E] text-[#FDFBF7]"
                  : "bg-[#F2EFE9] text-[#5E6B4E] hover:bg-[#EAE5DC]"
              }`}
            >
              All Harvests
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id || cat.name}
                onClick={() => setSelectedCategory(cat.name)}
                className={`px-4 py-1.5 rounded-full whitespace-nowrap transition-all ${
                  selectedCategory.toLowerCase() === cat.name.toLowerCase()
                    ? "bg-[#5E6B4E] text-[#FDFBF7]"
                    : "bg-[#F2EFE9] text-[#5E6B4E] hover:bg-[#EAE5DC]"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Menu Cards Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-12 flex-1 w-full">
        <div className="mb-6 flex items-center justify-between text-xs text-[#7B8E78]">
          <span>Curated {filteredItems.length} seasonal offerings</span>
          {dietFilter !== "all" && (
            <span className="text-[#C86D51]">
              Filtered: {dietFilter.toUpperCase()}
            </span>
          )}
        </div>

        {loading ? (
          <div className="py-24 text-center text-lg text-[#5E6B4E]">
            GATHERING EARTH RECIPES...
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="py-24 text-center space-y-4 bg-[#F2EFE9] rounded-3xl p-12 max-w-md mx-auto">
            <span className="text-4xl">🌿</span>
            <h3 className="text-xl font-normal">No dishes located</h3>
            <p className="text-xs text-[#5E6B4E]">
              Adjust your search or reset filters to view all seasonal items.
            </p>
            <button
              onClick={() => {
                setSearch("");
                setSelectedCategory("all");
                setDietFilter("all");
              }}
              className="bg-[#5E6B4E] text-white px-6 py-2 rounded-full text-xs font-sans uppercase"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((dish) => (
              <ConceptDFoodCard
                key={dish.id}
                item={dish}
                onOpenLightbox={(item) => setActiveLightboxItem(item)}
              />
            ))}
          </div>
        )}
      </main>

      <CinematicLightbox
        item={activeLightboxItem}
        onClose={() => setActiveLightboxItem(null)}
      />

      <ConceptDFooter />
    </div>
  );
}
