"use client";

import React, { useEffect, useState, useMemo } from "react";
import { Search, Sparkles, SlidersHorizontal, ArrowUpDown } from "lucide-react";
import ConceptAHeader from "@/components/concept-a/Header";
import ConceptAFooter from "@/components/concept-a/Footer";
import ConceptAFoodCard from "@/components/concept-a/FoodCard";
import * as api from "@/lib/api";

export default function ConceptAMenuPage() {
  const [items, setItems] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

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
    <div className="bg-[#FFF8F9] min-h-screen text-[#3D2D2E] flex flex-col">
      <ConceptAHeader />

      {/* Page Hero */}
      <section className="pt-12 pb-8 border-b border-rose-100 bg-[#FFF0F3]/40">
        <div className="max-w-7xl mx-auto px-6 text-center space-y-3">
          <span className="px-3 py-1 rounded-full bg-white border border-rose-200 text-[#E07A86] text-xs font-bold uppercase tracking-wider inline-block">
            🎀 Boutique Pantry &amp; Confections Shop
          </span>
          <h1 className="font-coquette-serif font-black text-4xl sm:text-5xl text-[#3D2D2E]">
            Artisanal Packaged Pantry
          </h1>
          <p className="text-xs sm:text-sm text-gray-600 max-w-lg mx-auto">
            Small-batch fruit preserves, stone-milled biscuits, slow-simmered sauces, and bean-to-bar chocolates in collectible pastel jars.
          </p>
        </div>
      </section>

      {/* Filter & Search Bar */}
      <section className="py-6 border-b border-rose-100 bg-white sticky top-[68px] z-20 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 space-y-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search Input */}
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search pantry jars, snacks, confections..."
                className="w-full pl-10 pr-4 py-2.5 rounded-full border border-rose-200 bg-rose-50/40 text-xs focus:outline-none focus:ring-2 focus:ring-[#E07A86]"
              />
            </div>

            {/* Diet & Sort Controls */}
            <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-end">
              {/* Diet Pills */}
              <div className="flex items-center gap-1 bg-rose-50/70 p-1 rounded-full border border-rose-200">
                <button
                  onClick={() => setDietFilter("all")}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold transition ${
                    dietFilter === "all" ? "bg-[#E07A86] text-white" : "text-gray-600"
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setDietFilter("veg")}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold transition ${
                    dietFilter === "veg" ? "bg-emerald-600 text-white" : "text-emerald-800"
                  }`}
                >
                  Veg 🟢
                </button>
                <button
                  onClick={() => setDietFilter("non-veg")}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold transition ${
                    dietFilter === "non-veg" ? "bg-rose-600 text-white" : "text-rose-800"
                  }`}
                >
                  Non-Veg 🔴
                </button>
              </div>

              {/* Sort Selector */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 rounded-full border border-rose-200 bg-white text-xs font-semibold text-gray-700 focus:outline-none"
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
              className={`px-4 py-2 rounded-full text-xs font-bold tracking-wide whitespace-nowrap transition ${
                selectedCategory === "all"
                  ? "bg-[#E07A86] text-white shadow-sm"
                  : "bg-rose-50/60 text-[#3D2D2E] hover:bg-rose-100/60 border border-rose-200/60"
              }`}
            >
              All Dishes ({items.length})
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.name)}
                className={`px-4 py-2 rounded-full text-xs font-bold tracking-wide whitespace-nowrap transition ${
                  selectedCategory.toLowerCase() === cat.name.toLowerCase()
                    ? "bg-[#E07A86] text-white shadow-sm"
                    : "bg-rose-50/60 text-[#3D2D2E] hover:bg-rose-100/60 border border-rose-200/60"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Menu Catalog Grid */}
      <section className="py-12 flex-1">
        <div className="max-w-7xl mx-auto px-6">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <div key={n} className="h-80 bg-white rounded-3xl animate-pulse border border-rose-100" />
              ))}
            </div>
          ) : filteredItems.length === 0 ? (
            <div className="py-20 text-center space-y-4">
              <span className="text-4xl">🧁</span>
              <h3 className="font-coquette-serif font-bold text-xl text-gray-800">
                No culinary matches found
              </h3>
              <p className="text-xs text-gray-500 max-w-sm mx-auto">
                Try loosening your search keywords or reset category filters to view all fresh items.
              </p>
              <button
                onClick={() => {
                  setSearch("");
                  setSelectedCategory("all");
                  setDietFilter("all");
                }}
                className="px-6 py-2.5 rounded-full bg-[#E07A86] text-white text-xs font-bold"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredItems.map((item) => (
                <ConceptAFoodCard key={item.id} item={item} />
              ))}
            </div>
          )}
        </div>
      </section>

      <ConceptAFooter />
    </div>
  );
}
