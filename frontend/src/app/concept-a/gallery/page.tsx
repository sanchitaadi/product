"use client";

import React, { useState } from "react";
import ConceptAHeader from "@/components/concept-a/Header";
import ConceptAFooter from "@/components/concept-a/Footer";
import CinematicLightbox, { LightboxItem } from "@/components/shared/CinematicLightbox";

export default function ConceptAGalleryPage() {
  const [filter, setFilter] = useState("all");
  const [activeLightboxItem, setActiveLightboxItem] = useState<LightboxItem | null>(null);

  const images = [
    { src: "/images/hero-coquette.webp", title: "Signature Table Feast", tag: "ambiance", span: "md:col-span-2 md:row-span-2" },
    { src: "/images/pink-sauce-pasta.webp", title: "Velvety Rosa Pasta", tag: "mains", span: "" },
    { src: "/images/strawberry-cheesecake.webp", title: "New York Chantilly Cake", tag: "sweets", span: "" },
    { src: "/images/margherita-pizza.webp", title: "48h Sourdough Margherita", tag: "sourdough", span: "" },
    { src: "/images/lotus-biscoff-shake.webp", title: "Belgian Biscoff Shake", tag: "drinks", span: "" },
    { src: "/images/burrata-bruschetta.webp", title: "Peach & Whipped Ricotta", tag: "mains", span: "md:col-span-2" },
    { src: "/images/restaurant-dining.webp", title: "Pastel Conservatory", tag: "ambiance", span: "" },
    { src: "/images/matcha-cloud-latte.webp", title: "Uji Matcha Blossom Cloud", tag: "drinks", span: "" },
    { src: "/images/parisian-macarons.webp", title: "Damask Rose Macarons", tag: "sweets", span: "" },
    { src: "/images/citrus-salmon.webp", title: "Pan-Seared Salmon", tag: "mains", span: "" },
    { src: "/images/truffle-fries.webp", title: "Aged Parmesan Truffle Fries", tag: "mains", span: "" },
    { src: "/images/restaurant-interior.webp", title: "Garden Ave Atelier", tag: "ambiance", span: "" },
  ];

  const filtered = filter === "all" ? images : images.filter((img) => img.tag === filter);

  return (
    <div className="bg-[#FFF8F9] min-h-screen text-[#3D2D2E] flex flex-col">
      <ConceptAHeader />

      <section className="pt-10 pb-6 border-b border-rose-100 bg-[#FFF0F3]/40">
        <div className="max-w-7xl mx-auto px-6 text-center space-y-2">
          <span className="text-xs font-bold text-[#E07A86] uppercase tracking-wider block">
            🎀 Pinterest Visual Board
          </span>
          <h1 className="font-coquette-serif font-black text-3xl sm:text-4xl text-[#3D2D2E]">
            Editorial Mood & Feasts
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 max-w-md mx-auto">
            A curated photographic collection of our kitchen creations, floral ambiance, and handcrafted moments.
          </p>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
            {[
              { id: "all", label: "All Pins" },
              { id: "sourdough", label: "Sourdough & Pizzas" },
              { id: "mains", label: "Pastas & Plates" },
              { id: "sweets", label: "Patisserie & Sweets" },
              { id: "drinks", label: "Shakes & Lattes" },
              { id: "ambiance", label: "Garden Conservatory" },
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => setFilter(t.id)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition ${
                  filter === t.id
                    ? "bg-[#E07A86] text-white shadow-sm"
                    : "bg-white text-gray-600 hover:bg-rose-50 border border-rose-200"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 flex-1">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 auto-rows-[240px]">
            {filtered.map((img, i) => (
              <div
                key={i}
                onClick={() =>
                  setActiveLightboxItem({
                    id: `gallery-a-${i}`,
                    name: img.title,
                    category: img.tag.toUpperCase(),
                    image_url: img.src,
                    description: "High-resolution kitchen and conservatory capture at 24 Garden Avenue.",
                    conceptTheme: "coquette",
                  })
                }
                className={`relative rounded-3xl overflow-hidden group border-2 border-white shadow-md bg-rose-50 cursor-pointer ${img.span}`}
              >
                <img
                  src={img.src}
                  alt={img.title}
                  className="w-full h-full object-cover group-hover:scale-108 transition duration-700"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "/images/fallback-food.svg";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition duration-300 flex flex-col justify-end p-5 text-white">
                  <span className="text-[10px] uppercase font-bold text-rose-300 tracking-wider">
                    Click to View Cinema 🎀
                  </span>
                  <h4 className="font-coquette-serif font-bold text-base">{img.title}</h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ConceptAFooter />

      {/* Cinematic Lightbox */}
      <CinematicLightbox
        item={activeLightboxItem}
        onClose={() => setActiveLightboxItem(null)}
      />
    </div>
  );
}
