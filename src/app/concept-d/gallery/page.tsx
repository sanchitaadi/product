"use client";

import React, { useState } from "react";
import { Leaf, Maximize2 } from "lucide-react";
import ConceptDHeader from "@/components/concept-d/Header";
import ConceptDFooter from "@/components/concept-d/Footer";
import CinematicLightbox, { LightboxItem } from "@/components/shared/CinematicLightbox";

export default function ConceptDGalleryPage() {
  const [filter, setFilter] = useState("all");
  const [activeLightboxItem, setActiveLightboxItem] = useState<LightboxItem | null>(null);

  const images = [
    { id: 1, src: "/images/restaurant-garden.webp", title: "Conservatory Glasshouse", tag: "grounds", span: "md:col-span-2 md:row-span-2" },
    { id: 2, src: "/images/burrata-bruschetta.webp", title: "Garden Peach Burrata", tag: "plates", span: "" },
    { id: 3, src: "/images/margherita-pizza.webp", title: "Ancient Sourdough Hearth", tag: "hearth", span: "" },
    { id: 4, src: "/images/citrus-salmon.webp", title: "Herb Roasted Wild Catch", tag: "plates", span: "" },
    { id: 5, src: "/images/restaurant-interior.webp", title: "Linen Candlelit Salon", tag: "grounds", span: "" },
    { id: 6, src: "/images/pink-sauce-pasta.webp", title: "Hand-Rolled Rosa Pasta", tag: "plates", span: "md:col-span-2" },
    { id: 7, src: "/images/velvet-cold-coffee.webp", title: "Single-Origin Cold Extraction", tag: "cellar", span: "" },
    { id: 8, src: "/images/strawberry-cheesecake.webp", title: "Wild Berry Crème Gateau", tag: "plates", span: "" },
    { id: 9, src: "/images/restaurant-kitchen.webp", title: "Morning Dough Shaping", tag: "hearth", span: "" },
  ];

  const filtered = filter === "all" ? images : images.filter((img) => img.tag === filter);

  return (
    <div className="bg-[#FDFBF7] min-h-screen text-[#1E3F20] flex flex-col font-serif selection:bg-[#7B8E78] selection:text-white">
      <ConceptDHeader />

      {/* Gallery Header */}
      <section className="bg-[#F2EFE9] py-16 border-b border-[#5E6B4E]/20 text-center space-y-3">
        <span className="text-[11px] uppercase tracking-widest text-[#7B8E78] block">
          Visual Anthology
        </span>
        <h1 className="text-4xl sm:text-6xl font-normal text-[#1E3F20] tracking-tight">
          Conservatory Impressions
        </h1>
        <p className="text-xs sm:text-sm text-[#5E6B4E] max-w-md mx-auto font-light leading-relaxed">
          Glimpses of our sunlit greenhouse, seasonal bread bakes, and calm botanical interiors.
        </p>

        {/* Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-6 text-xs">
          {[
            { id: "all", label: "All Impressions" },
            { id: "grounds", label: "Greenhouse Grounds" },
            { id: "plates", label: "Harvest Plates" },
            { id: "hearth", label: "Sourdough Hearth" },
            { id: "cellar", label: "Natural Cellar" },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setFilter(t.id)}
              className={`px-4 py-1.5 rounded-full border transition-all ${
                filter === t.id
                  ? "bg-[#5E6B4E] text-[#FDFBF7] border-[#5E6B4E]"
                  : "bg-[#FDFBF7] text-[#5E6B4E] border-[#5E6B4E]/25 hover:border-[#5E6B4E]"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </section>

      {/* Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-12 flex-1 w-full">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[280px]">
          {filtered.map((item) => (
            <div
              key={item.id}
              onClick={() =>
                setActiveLightboxItem({
                  id: item.id,
                  name: item.title,
                  category: item.tag.toUpperCase(),
                  image_url: item.src,
                  conceptTheme: "earth",
                })
              }
              className={`group relative overflow-hidden rounded-2xl border border-[#5E6B4E]/20 bg-[#F2EFE9] cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300 ${item.span}`}
            >
              <img
                src={item.src}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 text-white">
                <span className="text-[10px] tracking-widest uppercase text-[#A3B8A0]">
                  {item.tag}
                </span>
                <h3 className="text-lg font-normal leading-tight">
                  {item.title}
                </h3>
              </div>

              <div className="absolute top-3 right-3 p-2 rounded-full bg-white/80 text-[#1E3F20] opacity-0 group-hover:opacity-100 transition-opacity">
                <Maximize2 className="w-3.5 h-3.5" />
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Lightbox */}
      <CinematicLightbox
        item={activeLightboxItem}
        onClose={() => setActiveLightboxItem(null)}
      />

      <ConceptDFooter />
    </div>
  );
}
