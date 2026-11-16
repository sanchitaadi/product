"use client";

import React, { useState } from "react";
import { Zap, Maximize2, Sparkles } from "lucide-react";
import ConceptCHeader from "@/components/concept-c/Header";
import ConceptCFooter from "@/components/concept-c/Footer";
import CinematicLightbox, { LightboxItem } from "@/components/shared/CinematicLightbox";

export default function ConceptCGalleryPage() {
  const [filter, setFilter] = useState("all");
  const [activeLightboxItem, setActiveLightboxItem] = useState<LightboxItem | null>(null);

  const images = [
    { id: 1, src: "/images/heroes/pop-art-hero.jpg", title: "WARHOL FLAVOR DROP COLLECTION", tag: "sauces", span: "md:col-span-2 md:row-span-2" },
    { id: 2, src: "/images/products/habanero-hot-sauce.jpg", title: "ELECTRIC HABANERO POP GLAZE", tag: "sauces", span: "" },
    { id: 3, src: "/images/products/chili-crunch-jar.jpg", title: "SICHUAN UMAMI CHILI CRUNCH", tag: "sauces", span: "" },
    { id: 4, src: "/images/products/blood-orange-ginger-nectar.jpg", title: "SMOKED CHIPOTLE FIG FINISH", tag: "sauces", span: "" },
    { id: 5, src: "/images/products/prebiotic-white-peach-soda.jpg", title: "CITRUS YUZU BOTANICAL TONIC", tag: "drinks", span: "" },
    { id: 6, src: "/images/products/tomato-tapenade.jpg", title: "HEIRLOOM SUN-DRIED TAPENADE", tag: "sauces", span: "md:col-span-2" },
    { id: 7, src: "/images/products/spiced-millet-crackers.jpg", title: "ANCIENT MILLET POP CRACKERS", tag: "snacks", span: "" },
    { id: 8, src: "/images/products/blood-orange-ginger-nectar.jpg", title: "BLOOD ORANGE BOTANICAL FIZZ", tag: "drinks", span: "" },
    { id: 9, src: "/images/products/superfood-trail-mix.jpg", title: "FIERY SPICED SEED CRUNCH", tag: "snacks", span: "" },
  ];

  const filtered = filter === "all" ? images : images.filter((img) => img.tag === filter);

  return (
    <div className="bg-[#FFFDF7] min-h-screen text-[#111111] flex flex-col font-sans selection:bg-[#FFE600] selection:text-black">
      <ConceptCHeader />

      {/* Pop Art Gallery Banner */}
      <section className="bg-[#FFE600] text-black py-16 border-b-4 border-black text-center space-y-3 relative">
        <span className="bg-[#FF007F] text-white text-xs font-black uppercase px-3 py-1 border-2 border-black inline-block -rotate-2">
          ⚡ VISUAL VAULT ⚡
        </span>
        <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tight">
          THE POP ART VAULT
        </h1>
        <p className="text-sm font-bold text-black/80 max-w-lg mx-auto">
          A high-contrast visual archive of our collectible hot sauces, chili crunch jars, and botanical drinks.
        </p>

        {/* Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-6">
          {[
            { id: "all", label: "All Works" },
            { id: "sauces", label: "Hot Sauces & Dips" },
            { id: "snacks", label: "Street Snacks" },
            { id: "drinks", label: "Botanical Tonics" },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setFilter(t.id)}
              className={`px-4 py-2 text-xs font-black uppercase border-2 border-black transition-all ${
                filter === t.id
                  ? "bg-[#0047FF] text-white shadow-[3px_3px_0px_#FF007F] -translate-y-0.5"
                  : "bg-white text-black hover:bg-[#FF007F] hover:text-white"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </section>

      {/* Gallery Grid */}
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
                  conceptTheme: "popart",
                })
              }
              className={`group relative overflow-hidden border-4 border-black bg-black cursor-pointer shadow-[6px_6px_0px_#000] hover:shadow-[10px_10px_0px_#FF007F] hover:-translate-x-1 hover:-translate-y-1 transition-all duration-200 ${item.span}`}
            >
              <img
                src={item.src}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-6">
                <span className="bg-[#FFE600] text-black text-[10px] font-black uppercase px-2 py-0.5 inline-block self-start border border-black mb-1">
                  {item.tag}
                </span>
                <h3 className="text-xl font-black uppercase text-white leading-tight">
                  {item.title}
                </h3>
              </div>

              <div className="absolute top-3 right-3 bg-[#FF007F] text-white p-2 border-2 border-black opacity-0 group-hover:opacity-100 transition-opacity">
                <Maximize2 className="w-4 h-4 stroke-[3]" />
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

      <ConceptCFooter />
    </div>
  );
}
