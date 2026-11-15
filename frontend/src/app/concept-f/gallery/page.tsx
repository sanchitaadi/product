"use client";

import React, { useState } from "react";
import { Zap, Maximize2, Sparkles } from "lucide-react";
import ConceptFHeader from "@/components/concept-f/Header";
import ConceptFFooter from "@/components/concept-f/Footer";
import CinematicLightbox, { LightboxItem } from "@/components/shared/CinematicLightbox";

export default function ConceptFGalleryPage() {
  const [filter, setFilter] = useState("all");
  const [activeLightboxItem, setActiveLightboxItem] = useState<LightboxItem | null>(null);

  const images = [
    { id: 1, src: "/images/restaurant-interior.webp", title: "Akihabara Comic Saloon", sfx: "ざわ... ZAWA", tag: "saloon", span: "md:col-span-2 md:row-span-2" },
    { id: 2, src: "/images/margherita-pizza.webp", title: "Hearth Dragon Sourdough", sfx: "DON!!", tag: "hearth", span: "" },
    { id: 3, src: "/images/burrata-bruschetta.webp", title: "Peach Burrata Crostini", sfx: "CRUNCH!!", tag: "plates", span: "" },
    { id: 4, src: "/images/pink-sauce-pasta.webp", title: "Rosa Rigatoni Extrusion", sfx: "UMAI!!", tag: "plates", span: "" },
    { id: 5, src: "/images/restaurant-kitchen.webp", title: "Dough Inking Table", sfx: "GOGO!!", tag: "hearth", span: "" },
    { id: 6, src: "/images/citrus-salmon.webp", title: "Wild Catch Teriyaki Glaze", sfx: "DELICIOUS!!", tag: "plates", span: "md:col-span-2" },
    { id: 7, src: "/images/strawberry-cheesecake.webp", title: "Tokyo Velvet Cheesecake", sfx: "DOKI-DOKI!!", tag: "desserts", span: "" },
    { id: 8, src: "/images/velvet-cold-coffee.webp", title: "Nitro Shonen Cold Brew", sfx: "FLASH!!", tag: "beverages", span: "" },
    { id: 9, src: "/images/restaurant-garden.webp", title: "Lantern Terrace Courtyard", sfx: "PEACE!!", tag: "saloon", span: "" },
  ];

  const filtered = filter === "all" ? images : images.filter((img) => img.tag === filter);

  return (
    <div className="bg-[#FFFDF7] min-h-screen text-black flex flex-col font-sans selection:bg-[#FFE600] selection:text-black">
      <ConceptFHeader />

      {/* Manga Header Banner */}
      <section className="bg-white py-16 border-b-4 border-black text-center space-y-4 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-10 [background:repeating-conic-gradient(#000_0_2deg,transparent_2deg_10deg)]" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#FFE600] text-black font-black text-xs uppercase tracking-widest border-2 border-black shadow-[3px_3px_0px_#000] -rotate-1">
            <Zap className="w-3.5 h-3.5 text-[#D7263D] fill-[#D7263D]" />
            OMAKE VAULT &bull; CHAPTER 03
          </div>
          <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-black">
            Visual Manga Archives
          </h1>
          <p className="text-xs sm:text-sm text-gray-700 font-bold max-w-lg mx-auto">
            High-contrast photography from our open hearth kitchen, animated dining booths, and signature comic dishes.
          </p>

          {/* Filters */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-6">
            {[
              { id: "all", label: "ALL PANELS" },
              { id: "saloon", label: "COMIC SALOON" },
              { id: "hearth", label: "HEARTH OVENS" },
              { id: "plates", label: "EXPRESS PLATES" },
              { id: "desserts", label: "SWEET ENDINGS" },
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => setFilter(t.id)}
                className={`px-5 py-2 text-xs font-black uppercase tracking-wider border-2 transition-all ${
                  filter === t.id
                    ? "bg-black text-[#FFE600] border-black shadow-[3px_3px_0px_#D7263D]"
                    : "bg-white text-black border-black hover:bg-[#FFE600]"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
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
                  category: item.sfx,
                  image_url: item.src,
                  conceptTheme: "manga",
                })
              }
              className={`group relative overflow-hidden border-4 border-black bg-white cursor-pointer shadow-[6px_6px_0px_#000] hover:shadow-[10px_10px_0px_#D7263D] hover:-translate-x-1 hover:-translate-y-1 transition-all duration-300 ${item.span}`}
            >
              <img
                src={item.src}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700 ease-out"
              />

              {/* Manga Panel Sound Effect Badge */}
              <div className="absolute top-3 left-3 px-3 py-1 bg-[#FFE600] text-black font-black text-xs uppercase border-2 border-black shadow-[3px_3px_0px_#000] rotate-[-2deg]">
                {item.sfx}
              </div>

              {/* Bottom Caption Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 text-white">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#FFE600] font-black">
                  {item.tag.toUpperCase()}
                </span>
                <h3 className="text-lg font-black uppercase tracking-tight">
                  {item.title}
                </h3>
              </div>

              <div className="absolute top-3 right-3 p-2 bg-white text-black border-2 border-black opacity-0 group-hover:opacity-100 transition-opacity">
                <Maximize2 className="w-4 h-4" />
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

      <ConceptFFooter />
    </div>
  );
}
