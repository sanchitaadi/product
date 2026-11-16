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
    { id: 1, src: "/images/heroes/organic-earth-hero.jpg", title: "Single-Estate Olive Grove Harvest", tag: "harvest", span: "md:col-span-2 md:row-span-2" },
    { id: 2, src: "/images/products/cold-pressed-olive-oil.jpg", title: "First Cold-Pressed Extra Virgin Olive Oil", tag: "oils", span: "" },
    { id: 3, src: "/images/products/khapli-emmer-flour.jpg", title: "Stone-Ground Khapli Ancient Emmer Flour", tag: "grains", span: "" },
    { id: 4, src: "/images/products/raw-forest-honey.jpg", title: "Raw Himalayan Wildflower Forest Honey", tag: "harvest", span: "" },
    { id: 5, src: "/images/products/kashmiri-walnuts.jpg", title: "Hand-Cracked Kashmiri Jumbo Walnuts", tag: "nuts", span: "" },
    { id: 6, src: "/images/products/roasted-mamra-almonds.jpg", title: "Royal Mamra Slow-Roasted Almonds", tag: "nuts", span: "md:col-span-2" },
    { id: 7, src: "/images/products/maple-pecan-granola.jpg", title: "Ancient Grain Toasted Maple Granola", tag: "grains", span: "" },
    { id: 8, src: "/images/products/white-peach-jam.jpg", title: "Sun-Ripened Orchard Peach Compote", tag: "harvest", span: "" },
    { id: 9, src: "/images/heroes/organic-earth-hero.jpg", title: "Regenerative Living Soils & Harvest Table", tag: "harvest", span: "" },
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
          Farmland Harvest Impressions
        </h1>
        <p className="text-xs sm:text-sm text-[#5E6B4E] max-w-md mx-auto font-light leading-relaxed">
          Glimpses of our heritage olive extraction, granite stone milling, and pure living soil provisions.
        </p>

        {/* Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-6 text-xs">
          {[
            { id: "all", label: "All Harvests" },
            { id: "oils", label: "Cold-Pressed Oils" },
            { id: "grains", label: "Ancient Milled Flours" },
            { id: "nuts", label: "Orchard Nuts & Granola" },
            { id: "harvest", label: "Raw Honey & Compotes" },
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
