"use client";

import React, { useState } from "react";
import ConceptBHeader from "@/components/concept-b/Header";
import ConceptBFooter from "@/components/concept-b/Footer";
import RetroSoundProvider, { useRetroSound } from "@/components/concept-b/RetroSoundFX";
import RetroCustomCursor from "@/components/concept-b/RetroCustomCursor";
import RetroScrollProgress from "@/components/concept-b/RetroScrollProgress";
import CinematicLightbox, { LightboxItem } from "@/components/shared/CinematicLightbox";

function ConceptBGalleryContent() {
  const [filter, setFilter] = useState("all");
  const [activeLightboxItem, setActiveLightboxItem] = useState<LightboxItem | null>(null);
  const { playClick, playPop } = useRetroSound();

  const images = [
    { src: "/images/heroes/snackattack-hero.jpg", title: "THE BODEGA SNACK WALL", tag: "crisps", span: "md:col-span-2 md:row-span-2", desc: "Our signature mountain of air-popped sorghum puffs, kettle chips, and street snacks." },
    { src: "/images/products/gourmet-sorghum-crisps.jpg", title: "TRUFFLE SORGHUM CRISPS", tag: "crisps", span: "", desc: "Ultra-light ancient Andean sorghum crisps dusted with Italian summer black truffle." },
    { src: "/images/products/prebiotic-white-peach-soda.jpg", title: "PREBIOTIC WHITE PEACH SODA", tag: "sodas", span: "", desc: "Cold-pressed ripe white peach puree and chicory root prebiotic fiber on ice." },
    { src: "/images/products/kettle-sea-salt-chips.jpg", title: "KETTLE SEA SALT CRISPS", tag: "crisps", span: "", desc: "Thick-cut golden farm potatoes kettle-fried in non-GMO sunflower oil." },
    { src: "/images/products/blood-orange-ginger-nectar.jpg", title: "BLOOD ORANGE BOTANICAL NECTAR", tag: "sodas", span: "", desc: "Sicilian blood oranges cold-pressed with Himalayan fiery ginger and crisp mountain bubbles." },
    { src: "/images/products/spiced-millet-crackers.jpg", title: "SPICED MILLET CRACKERS", tag: "crisps", span: "md:col-span-2", desc: "Sprouted foxtail and finger millets seasoned with garden rosemary and cracked pepper." },
    { src: "/images/products/smoked-beef-jerky.jpg", title: "HICKORY HERB SMOKED JERKY", tag: "protein", span: "", desc: "Prime cured lean strips slow-smoked over hickory wood with 22g protein per pack." },
    { src: "/images/products/cacao-energy-bites.jpg", title: "WILD CACAO ENERGY BITES", tag: "protein", span: "", desc: "Cold-pressed energy bites made with raw cacao nibs, dates, and sprouted pumpkin seeds." },
    { src: "/images/heroes/retro-bodega-hero.jpg", title: "RETRO BODEGA DISPENSARY", tag: "vibe", span: "", desc: "Clean label, zero palm oil snacks ready for pan-India dispatch from our bodega warehouse." },
    { src: "/images/products/cocoa-hazelnut-cookies.jpg", title: "COCOA CRUNCH DROPS", tag: "crisps", span: "", desc: "Crunchy double-baked cocoa drops with roasted Turkish hazelnut praline." },
  ];

  const filtered = filter === "all" ? images : images.filter((img) => img.tag === filter);

  return (
    <div className="bg-[#FFF9EC] min-h-screen text-black flex flex-col font-sans selection:bg-[#FFE15D] selection:text-black relative overflow-x-clip">
      {/* Top Retro Scroll Progress */}
      <RetroScrollProgress />

      {/* Desktop Custom Cursor */}
      <RetroCustomCursor />

      {/* Header */}
      <ConceptBHeader />

      {/* Hero Strip */}
      <section className="py-12 bg-[#FFE15D] border-b-4 border-black relative overflow-hidden">
        <div className="absolute inset-0 pattern-comic-halftone opacity-20 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 text-center space-y-3 relative z-10">
          <span className="px-4 py-1.5 bg-black text-[#FFE15D] text-xs font-retro-bold font-black uppercase tracking-wider inline-block rounded-xl border-2 border-black shadow-[3px_3px_0px_#FF2A55]">
            ⚡ SOCIAL FEED &bull; SNAP DROP
          </span>
          <h1 className="font-retro-bold font-black text-4xl sm:text-6xl uppercase tracking-tight text-black">
            THE PHOTO FEED 📸
          </h1>
          <p className="text-xs sm:text-sm font-bold text-stone-900 max-w-md mx-auto">
            Raw snack snaps, nitrogen-flushed bags, and cold prebiotic cans ready to ship pan-India.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
            {[
              { id: "all", label: "ALL SNAPS" },
              { id: "crisps", label: "POPPED CRISPS" },
              { id: "sodas", label: "PREBIOTIC SODAS" },
              { id: "protein", label: "PROTEIN & JERKY" },
              { id: "vibe", label: "BODEGA VIBE" },
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => {
                  playClick();
                  setFilter(t.id);
                }}
                className={`px-4 py-2 rounded-xl text-xs font-retro-bold font-black uppercase tracking-wider border-2 border-black transition ${
                  filter === t.id
                    ? "bg-[#FF2A55] text-white shadow-[3px_3px_0px_#000]"
                    : "bg-white text-black hover:bg-stone-100"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Dynamic Grid */}
      <section className="py-12 md:py-16 flex-1">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 auto-rows-[280px]">
            {filtered.map((img, idx) => (
              <div
                key={idx}
                onClick={() => {
                  playPop();
                  setActiveLightboxItem({
                    id: `gallery-b-${idx}`,
                    name: img.title,
                    category: img.tag.toUpperCase(),
                    image_url: img.src,
                    description: img.desc,
                    conceptTheme: "retro",
                  });
                }}
                className={`group relative rounded-3xl overflow-hidden border-4 border-black bg-white shadow-[6px_6px_0px_#000] hover:shadow-[10px_10px_0px_#FF2A55] hover:translate-y-[-3px] transition-all cursor-pointer ${img.span}`}
              >
                <img
                  src={img.src}
                  alt={img.title}
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "/images/fallback-food.svg";
                  }}
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-5 text-white">
                  <span className="text-[10px] font-retro-bold font-black text-[#FFE15D] uppercase tracking-wider">
                    {img.tag}
                  </span>
                  <h4 className="font-retro-bold font-black text-xl text-white uppercase">
                    {img.title}
                  </h4>
                  <p className="text-[11px] font-semibold text-stone-200 line-clamp-1 mt-0.5">
                    {img.desc}
                  </p>
                  <span className="mt-2 inline-flex items-center gap-1 text-[10px] font-retro-bold font-black bg-[#FFE15D] text-black px-2.5 py-1 rounded-lg border border-black w-max">
                    CLICK FOR CINEMA VIEW
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <ConceptBFooter />

      {/* Cinema Lightbox */}
      <CinematicLightbox
        item={activeLightboxItem}
        onClose={() => setActiveLightboxItem(null)}
      />
    </div>
  );
}

export default function ConceptBGalleryPage() {
  return (
    <RetroSoundProvider>
      <ConceptBGalleryContent />
    </RetroSoundProvider>
  );
}
