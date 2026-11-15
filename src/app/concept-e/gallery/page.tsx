"use client";

import React, { useState } from "react";
import { Train, Maximize2, Compass } from "lucide-react";
import ConceptEHeader from "@/components/concept-e/Header";
import ConceptEFooter from "@/components/concept-e/Footer";
import CinematicLightbox, { LightboxItem } from "@/components/shared/CinematicLightbox";

export default function ConceptEGalleryPage() {
  const [filter, setFilter] = useState("all");
  const [activeLightboxItem, setActiveLightboxItem] = useState<LightboxItem | null>(null);

  const images = [
    { id: 1, src: "/images/restaurant-interior.webp", title: "Central Concourse Hall", platform: "PF 01", tag: "concourse", span: "md:col-span-2 md:row-span-2" },
    { id: 2, src: "/images/burrata-bruschetta.webp", title: "Junction Burrata Crostini", platform: "PF 02", tag: "dishes", span: "" },
    { id: 3, src: "/images/margherita-pizza.webp", title: "Locomotive Hearth Pizza", platform: "PF 03", tag: "hearth", span: "" },
    { id: 4, src: "/images/citrus-salmon.webp", title: "First-Class Wild Salmon", platform: "PF 01", tag: "dishes", span: "" },
    { id: 5, src: "/images/restaurant-garden.webp", title: "Vintage Carriage Saloon", platform: "PF 04", tag: "concourse", span: "" },
    { id: 6, src: "/images/pink-sauce-pasta.webp", title: "Express Rosa Rigatoni", platform: "PF 02", tag: "dishes", span: "md:col-span-2" },
    { id: 7, src: "/images/velvet-cold-coffee.webp", title: "Commuter Cold Brew Nitro", platform: "PF 05", tag: "cellar", span: "" },
    { id: 8, src: "/images/strawberry-cheesecake.webp", title: "Terminal Velvet Cheesecake", platform: "PF 02", tag: "dishes", span: "" },
    { id: 9, src: "/images/restaurant-kitchen.webp", title: "Engine Room Dispatch Line", platform: "PF 06", tag: "hearth", span: "" },
  ];

  const filtered = filter === "all" ? images : images.filter((img) => img.tag === filter);

  return (
    <div className="bg-[#08142C] min-h-screen text-[#F8F6F0] flex flex-col font-sans selection:bg-[#FFD100] selection:text-[#08142C]">
      <ConceptEHeader />

      {/* Station Signboard Banner */}
      <section className="bg-[#050D1C] py-16 border-b-4 border-[#FFD100] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#FFD100_1px,transparent_1px)] [background-size:16px_16px]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#FFD100] text-[#08142C] font-mono text-xs font-black uppercase tracking-widest rounded">
            <Train className="w-3.5 h-3.5 text-[#D71920]" />
            WAYFINDING &bull; VISUAL TERMINAL ARCHIVES
          </div>
          <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-[#F8F6F0]">
            Concourse Gallery
          </h1>
          <p className="text-sm sm:text-base text-[#94A3B8] max-w-xl mx-auto font-mono">
            High-speed documentation of our heritage railway concourse, hearth ovens, and express culinary destinations.
          </p>

          {/* Line Route Filter Badges */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-6">
            {[
              { id: "all", label: "ALL LINES" },
              { id: "concourse", label: "STATION CONCOURSE" },
              { id: "dishes", label: "EXPRESS PLATES" },
              { id: "hearth", label: "ENGINE ROOM HEARTH" },
              { id: "cellar", label: "BEVERAGE DEPOT" },
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => setFilter(t.id)}
                className={`px-5 py-2 text-xs font-mono font-bold uppercase tracking-wider rounded border-2 transition-all ${
                  filter === t.id
                    ? "bg-[#D71920] text-white border-[#D71920] shadow-[3px_3px_0px_#FFD100]"
                    : "bg-[#0D1F42] text-[#94A3B8] border-[#334155] hover:border-[#FFD100] hover:text-[#FFD100]"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
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
                  category: item.platform,
                  image_url: item.src,
                  conceptTheme: "metro",
                })
              }
              className={`group relative overflow-hidden rounded-xl border-2 border-[#334155] bg-[#050D1C] cursor-pointer shadow-lg hover:border-[#FFD100] hover:shadow-[6px_6px_0px_#D71920] transition-all duration-300 ${item.span}`}
            >
              <img
                src={item.src}
                alt={item.title}
                className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out"
              />

              {/* Station Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#08142C] via-transparent to-transparent opacity-80 group-hover:opacity-95 transition-opacity duration-300 flex flex-col justify-end p-6">
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2 py-0.5 bg-[#FFD100] text-[#08142C] font-mono text-[10px] font-black rounded uppercase">
                    {item.platform}
                  </span>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#D71920] font-bold">
                    {item.tag}
                  </span>
                </div>
                <h3 className="text-lg font-black text-white uppercase tracking-tight">
                  {item.title}
                </h3>
              </div>

              <div className="absolute top-3 right-3 p-2 rounded bg-[#08142C]/90 border border-[#FFD100] text-[#FFD100] opacity-0 group-hover:opacity-100 transition-opacity">
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

      <ConceptEFooter />
    </div>
  );
}
