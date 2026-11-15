"use client";

import React, { useState } from "react";
import { Star, Ticket, Maximize2, Sparkles } from "lucide-react";
import ConceptGHeader from "@/components/concept-g/Header";
import ConceptGFooter from "@/components/concept-g/Footer";
import CinematicLightbox, { LightboxItem } from "@/components/shared/CinematicLightbox";

export default function ConceptGGalleryPage() {
  const [filter, setFilter] = useState("all");
  const [activeLightboxItem, setActiveLightboxItem] = useState<LightboxItem | null>(null);

  const images = [
    { id: 1, src: "/images/restaurant-interior.webp", title: "Center Ring Big Top Saloon", act: "ACT 01", tag: "tent", span: "md:col-span-2 md:row-span-2" },
    { id: 2, src: "/images/margherita-pizza.webp", title: "Margherita Fire Dome Hearth", act: "ACT 02", tag: "hearth", span: "" },
    { id: 3, src: "/images/burrata-bruschetta.webp", title: "Burrata Peach Crostini", act: "ACT 03", tag: "plates", span: "" },
    { id: 4, src: "/images/pink-sauce-pasta.webp", title: "Carousel Rosa Rigatoni", act: "ACT 02", tag: "plates", span: "" },
    { id: 5, src: "/images/restaurant-kitchen.webp", title: "Pizzaiolo Dough Acrobats", act: "ACT 01", tag: "hearth", span: "" },
    { id: 6, src: "/images/citrus-salmon.webp", title: "Midway Citrus Salmon", act: "ACT 03", tag: "plates", span: "md:col-span-2" },
    { id: 7, src: "/images/strawberry-cheesecake.webp", title: "Sugar Wonderland Gateau", act: "ACT 04", tag: "sweets", span: "" },
    { id: 8, src: "/images/velvet-cold-coffee.webp", title: "Calliope Nitro Cold Brew", act: "ACT 04", tag: "sweets", span: "" },
    { id: 9, src: "/images/restaurant-garden.webp", title: "Courtyard Lantern Fair", act: "ACT 01", tag: "tent", span: "" },
  ];

  const filtered = filter === "all" ? images : images.filter((img) => img.tag === filter);

  return (
    <div className="bg-[#FFFDD0] min-h-screen text-[#5C0614] flex flex-col font-sans selection:bg-[#FFD54F] selection:text-[#5C0614]">
      <ConceptGHeader />

      {/* Header Banner */}
      <section className="bg-[#FFFDF5] py-16 border-b-6 border-[#C41E3A] text-center space-y-4 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#FFD54F] text-[#5C0614] font-black text-xs uppercase tracking-widest rounded-full border-2 border-[#5C0614] shadow-[3px_3px_0px_#C41E3A]">
            <Ticket className="w-3.5 h-3.5" />
            MIDWAY PHOTO VAULT &bull; VISUAL ATTRACTIONS
          </div>
          <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-[#5C0614] font-serif">
            Fairground Gallery
          </h1>
          <p className="text-xs sm:text-sm text-[#5C0614]/80 font-medium max-w-lg mx-auto">
            Take a visual tour through our big top dining room, acrobatic open hearth ovens, and carousel plate presentations.
          </p>

          {/* Filters */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-6">
            {[
              { id: "all", label: "ALL ATTRACTIONS" },
              { id: "tent", label: "THE BIG TOP" },
              { id: "hearth", label: "HEARTH OVENS" },
              { id: "plates", label: "CAROUSEL PLATES" },
              { id: "sweets", label: "SUGAR WONDERLAND" },
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => setFilter(t.id)}
                className={`px-5 py-2 text-xs font-black uppercase tracking-wider rounded-full border-2 transition-all ${
                  filter === t.id
                    ? "bg-[#C41E3A] text-white border-[#5C0614] shadow-[3px_3px_0px_#FFD54F]"
                    : "bg-white text-[#5C0614] border-[#5C0614] hover:bg-[#FFD54F]"
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
                  category: item.act,
                  image_url: item.src,
                  conceptTheme: "circus",
                })
              }
              className={`group relative overflow-hidden border-4 border-[#C41E3A] rounded-3xl bg-[#5C0614] cursor-pointer shadow-[6px_6px_0px_#5C0614] hover:shadow-[10px_10px_0px_#FFD54F] hover:-translate-x-1 hover:-translate-y-1 transition-all duration-300 ${item.span}`}
            >
              <img
                src={item.src}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700 ease-out"
              />

              {/* Act Badge */}
              <div className="absolute top-3 left-3 px-3 py-1 bg-[#FFD54F] text-[#5C0614] font-black text-xs uppercase rounded-full border border-[#5C0614] shadow-sm">
                {item.act}
              </div>

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#5C0614] via-[#5C0614]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 text-white">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#FFD54F] font-bold">
                  {item.tag.toUpperCase()}
                </span>
                <h3 className="text-lg font-black uppercase tracking-tight font-serif">
                  {item.title}
                </h3>
              </div>

              <div className="absolute top-3 right-3 p-2 rounded-full bg-white text-[#5C0614] border border-[#5C0614] opacity-0 group-hover:opacity-100 transition-opacity">
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

      <ConceptGFooter />
    </div>
  );
}
