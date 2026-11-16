"use client";

import React, { useState } from "react";
import ConceptAHeader from "@/components/concept-a/Header";
import ConceptAFooter from "@/components/concept-a/Footer";
import CinematicLightbox, { LightboxItem } from "@/components/shared/CinematicLightbox";

export default function ConceptAGalleryPage() {
  const [filter, setFilter] = useState("all");
  const [activeLightboxItem, setActiveLightboxItem] = useState<LightboxItem | null>(null);

  const images = [
    { src: "/images/heroes/noir-reserve-hero.jpg", title: "Grand Cru Malabar Cacao Pods & Slabs", tag: "cacao", span: "md:col-span-2 md:row-span-2" },
    { src: "/images/products/noir-cacao-bar.jpg", title: "Single-Estate 85% Bean-to-Bar Foil Bar", tag: "cacao", span: "" },
    { src: "/images/products/noir-truffle-honey.jpg", title: "Raw Himalayan Wild Honeycomb Hex Jar", tag: "honey", span: "" },
    { src: "/images/products/noir-coffee-elixir.jpg", title: "Cold-Drip Arabica Coffee Elixir in UV Glass", tag: "elixirs", span: "" },
    { src: "/images/products/cocoa-hazelnut-cookies.jpg", title: "24K Gold-Dusted Normandy Butter Sablés", tag: "sables", span: "" },
    { src: "/images/products/malabar-dark-chocolate-74.jpg", title: "Malabar 74% Dark Confection Slab", tag: "cacao", span: "md:col-span-2" },
    { src: "/images/products/uji-matcha-tin.jpg", title: "Ceremonial Grade Uji Matcha Canister", tag: "elixirs", span: "" },
    { src: "/images/products/cold-pressed-olive-oil.jpg", title: "Single-Estate Finishing EVOO Bottle", tag: "honey", span: "" },
    { src: "/images/heroes/noir-reserve-hero.jpg", title: "Cold-Chain Wooden Gift Chest Assembly", tag: "gifting", span: "" },
  ];

  const filtered = filter === "all" ? images : images.filter((img) => img.tag === filter);

  return (
    <div className="bg-[#0A0B0E] min-h-screen text-[#F7F5F0] flex flex-col selection:bg-[#C5A059] selection:text-[#0A0B0E]">
      <ConceptAHeader />

      <section className="pt-16 pb-10 border-b border-[#C5A059]/20 bg-[#0E1015]">
        <div className="max-w-7xl mx-auto px-6 text-center space-y-3">
          <span className="text-xs font-mono font-bold text-[#C5A059] uppercase tracking-widest block">
            ✦ Visual Tasting Vault &bull; Packaging Archive
          </span>
          <h1 className="font-serif font-black text-3xl sm:text-5xl text-[#F7F5F0] tracking-tight">
            Reserve Pantry &amp; Packaging Vault
          </h1>
          <p className="text-xs sm:text-sm text-[#A89F91] max-w-md mx-auto font-light">
            A photographic archive of our gold-foil dark chocolates, wax-sealed honeycombs, and cold-chain gifting suites.
          </p>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
            {[
              { id: "all", label: "All Archives" },
              { id: "cacao", label: "Single-Estate Cacao" },
              { id: "honey", label: "Wild Honeycombs" },
              { id: "sables", label: "Gold Sablés Tins" },
              { id: "elixirs", label: "Cold-Drip Elixirs" },
              { id: "gifting", label: "Luxury Gift Chests" },
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => setFilter(t.id)}
                className={`px-4 py-2 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition ${
                  filter === t.id
                    ? "bg-[#C5A059] text-[#0A0B0E] shadow-md shadow-[#C5A059]/20"
                    : "bg-[#13151A] text-[#A89F91] hover:bg-[#1C1F27] hover:text-white border border-[#C5A059]/30"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 flex-1">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 auto-rows-[250px]">
            {filtered.map((img, i) => (
              <div
                key={i}
                onClick={() =>
                  setActiveLightboxItem({
                    id: `gallery-a-${i}`,
                    name: img.title,
                    category: img.tag.toUpperCase(),
                    image_url: img.src,
                    description: "High-resolution packaged reserve inspection from the central packaging atelier.",
                    conceptTheme: "luxury",
                  })
                }
                className={`relative rounded-2xl overflow-hidden group border border-[#C5A059]/30 shadow-lg bg-[#13151A] cursor-pointer ${img.span}`}
              >
                <img
                  src={img.src}
                  alt={img.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "/images/products/noir-cacao-bar.jpg";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition duration-300 flex flex-col justify-end p-5 text-white">
                  <span className="text-[10px] uppercase font-mono font-bold text-[#C5A059] tracking-widest">
                    Inspect Artifact ✦
                  </span>
                  <h4 className="font-serif font-bold text-base text-[#F7F5F0] mt-1">{img.title}</h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ConceptAFooter />

      <CinematicLightbox
        item={activeLightboxItem}
        onClose={() => setActiveLightboxItem(null)}
      />
    </div>
  );
}
