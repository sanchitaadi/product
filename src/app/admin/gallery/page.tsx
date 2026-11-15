"use client";

import React, { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { useToast } from "@/context/ToastContext";
import { Image as ImageIcon, Copy, Check, Filter } from "lucide-react";
import * as api from "@/lib/api";

export default function AdminGalleryPage() {
  const { showToast } = useToast();
  const [copiedPath, setCopiedPath] = useState<string | null>(null);
  const [categoryFilter, setCategoryFilter] = useState("all");

  const mediaAssets = [
    { name: "Burrata Bruschetta", path: "images/burrata-bruschetta.webp", category: "starters" },
    { name: "Avocado Tartine", path: "images/avocado-tartine.webp", category: "starters" },
    { name: "Calamari Fritti", path: "images/calamari-fritti.webp", category: "starters" },
    { name: "Artisan Margherita", path: "images/margherita-pizza.webp", category: "mains" },
    { name: "Wild Mushroom Pizza", path: "images/wild-mushroom-pizza.webp", category: "mains" },
    { name: "Truffle Tagliolini", path: "images/truffle-tagliolini.webp", category: "mains" },
    { name: "Saffron Risotto", path: "images/saffron-risotto.webp", category: "mains" },
    { name: "Peach Hibiscus Cooler", path: "images/peach-hibiscus-cooler.webp", category: "beverages" },
    { name: "Velvet Cold Coffee", path: "images/velvet-cold-coffee.webp", category: "beverages" },
    { name: "Matcha Cloud Latte", path: "images/matcha-cloud-latte.webp", category: "beverages" },
    { name: "Lotus Biscoff Shake", path: "images/lotus-biscoff-shake.webp", category: "beverages" },
    { name: "Parisian Macarons", path: "images/parisian-macarons.webp", category: "desserts" },
    { name: "Strawberry Cheesecake", path: "images/strawberry-cheesecake.webp", category: "desserts" },
    { name: "Tiramisu Paradiso", path: "images/espresso-tiramisu.webp", category: "desserts" },
    { name: "Restaurant Interior Arch", path: "images/restaurant-interior.webp", category: "ambience" },
    { name: "Garden Veranda Seating", path: "images/restaurant-dining.webp", category: "ambience" },
    { name: "Artisanal Espresso Bar", path: "images/restaurant-garden.webp", category: "ambience" },
    { name: "Pastry Atelier Showcase", path: "images/restaurant-kitchen.webp", category: "ambience" },
  ];

  const handleCopy = (path: string) => {
    navigator.clipboard.writeText(path);
    setCopiedPath(path);
    showToast("Image path copied to clipboard!", "success");
    setTimeout(() => setCopiedPath(null), 2000);
  };

  const filtered = mediaAssets.filter(
    (a) => categoryFilter === "all" || a.category === categoryFilter
  );

  return (
    <AdminLayout
      title="Media Asset Gallery"
      subtitle="Preview optimized WebP food and dining photography assets used throughout the platform."
    >
      {/* Filter Tabs */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm mb-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2">
          {["all", "starters", "mains", "desserts", "beverages", "ambience"].map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold capitalize transition ${
                categoryFilter === cat
                  ? "bg-indigo-600 text-white shadow-sm"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        <p className="text-xs text-slate-500">
          Showing <span className="font-bold text-slate-800">{filtered.length}</span> verified
          assets
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filtered.map((asset, idx) => (
          <div
            key={idx}
            className="group bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition flex flex-col"
          >
            <div className="relative aspect-square overflow-hidden bg-slate-100">
              <img
                src={api.resolveImageUrl(asset.path)}
                alt={asset.name}
                className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    "/images/fallback-food.svg";
                }}
              />
              <span className="absolute top-3 left-3 bg-black/60 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md">
                {asset.category}
              </span>
            </div>

            <div className="p-4 flex-1 flex flex-col justify-between">
              <div>
                <h4 className="font-bold text-slate-900 text-sm line-clamp-1">{asset.name}</h4>
                <p className="text-[11px] font-mono text-slate-400 truncate mt-1">{asset.path}</p>
              </div>

              <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[10px] text-slate-400 uppercase font-semibold">WebP 800x800</span>
                <button
                  onClick={() => handleCopy(asset.path)}
                  className="inline-flex items-center gap-1 px-2.5 py-1.5 bg-slate-100 hover:bg-indigo-50 text-slate-700 hover:text-indigo-600 rounded-lg text-xs font-semibold transition"
                >
                  {copiedPath === asset.path ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      Copied
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      Copy Path
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </AdminLayout>
  );
}
