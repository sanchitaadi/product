"use client";

import React from "react";
import { motion } from "framer-motion";
import { Heart, Plus, Sparkles, Star, Ticket, Maximize2 } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import * as api from "@/lib/api";

export default function ConceptGFoodCard({
  item,
  onOpenLightbox,
}: {
  item: any;
  onOpenLightbox?: (item: any) => void;
}) {
  const { openCustomization } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const isFav = isInWishlist(item.id);

  // Creative Carnival attraction titles mapping
  const attractionLabels: Record<string, string> = {
    Pizzas: "PIZZA PARADE 🎪",
    Pasta: "CAROUSEL PASTA 🎠",
    Appetizers: "MIDWAY CRISPS 🍿",
    Desserts: "SUGAR WONDERLAND 🎡",
    Beverages: "CALLIOPE ELIXIRS 🥤",
  };
  const attractionTitle = attractionLabels[item.category] || "BIG TOP SPECIAL 🎪";

  return (
    <motion.article
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4 }}
      className="group bg-[#FFFDD0] border-4 border-[#C41E3A] rounded-3xl overflow-hidden flex flex-col justify-between shadow-[6px_6px_0px_#5C0614] hover:shadow-[10px_10px_0px_#FFD54F] hover:-translate-x-1 hover:-translate-y-1 transition-all duration-200 relative text-[#5C0614] font-sans"
    >
      {/* Top Carnival Banner */}
      <div className="bg-[#C41E3A] text-white px-4 py-1.5 flex items-center justify-between text-[10px] font-black uppercase tracking-wider border-b-2 border-[#FFD54F]">
        <span className="flex items-center gap-1.5 text-[#FFD54F]">
          <Star className="w-3 h-3 fill-[#FFD54F]" />
          <span>{attractionTitle}</span>
        </span>
        <span className="font-mono text-white/80 text-[9px]">
          TKT #{String(item.id).padStart(3, "0")}
        </span>
      </div>

      <div>
        {/* Photo Viewport */}
        <div
          onClick={() => onOpenLightbox && onOpenLightbox({ ...item, conceptTheme: "circus" })}
          className={`relative aspect-[4/3] overflow-hidden bg-[#5C0614] border-b-2 border-[#C41E3A] ${
            onOpenLightbox ? "cursor-pointer" : ""
          }`}
        >
          <img
            src={api.resolveImageUrl(item.image_url)}
            alt={item.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "/images/fallback-food.svg";
            }}
          />

          {/* Quick Enlarge Overlay */}
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            {onOpenLightbox && (
              <span className="px-3 py-1 bg-[#FFD54F] text-[#5C0614] font-black text-xs uppercase rounded-full border border-white flex items-center gap-1 shadow-md">
                <Maximize2 className="w-3.5 h-3.5" />
                <span>VIEW ATTRACTION</span>
              </span>
            )}
          </div>

          {/* Golden Ticket Badge */}
          <div className="absolute top-2 left-2 px-2.5 py-1 bg-[#FFD54F] text-[#5C0614] font-black text-[10px] uppercase rounded-full border border-[#5C0614] shadow-sm flex items-center gap-1">
            <Ticket className="w-3 h-3" />
            <span>ADMIT FLAVOR</span>
          </div>

          {/* Wishlist Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleWishlist(item.id);
            }}
            className="absolute top-2 right-2 p-2 rounded-full bg-white text-[#C41E3A] border border-[#5C0614] shadow-sm active:scale-90 transition-all"
            aria-label="Save to Wishlist"
          >
            <Heart
              className={`w-4 h-4 ${
                isFav ? "fill-[#C41E3A] text-[#C41E3A]" : ""
              }`}
            />
          </button>

          {/* Veg / Non-Veg Badge & Net Weight */}
          <div className="absolute bottom-2 left-2 flex items-center gap-1.5">
            <span
              className={`px-2 py-0.5 text-[9px] font-black uppercase tracking-wider rounded-full border border-white ${
                item.is_veg
                  ? "bg-[#22C55E] text-white"
                  : "bg-[#C41E3A] text-white"
              }`}
            >
              {item.is_veg ? "VEG 🥬" : "NON-VEG 🍗"}
            </span>
            <span className="px-2 py-0.5 text-[9px] font-black uppercase rounded-full bg-[#5C0614] text-[#FFD54F] border border-white/60">
              {item.net_weight || "250g Jar"}
            </span>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-4 space-y-2">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-serif font-black text-base uppercase tracking-tight text-[#5C0614] group-hover:text-[#C41E3A] transition-colors leading-snug">
              {item.name}
            </h3>
            <span className="font-mono font-black text-base text-[#C41E3A] bg-[#FFD54F] px-2.5 py-0.5 rounded-full border border-[#5C0614] shrink-0">
              {api.formatPrice(item.price)}
            </span>
          </div>

          <p className="text-xs text-[#5C0614]/80 line-clamp-2 leading-relaxed font-medium">
            {item.description}
          </p>
        </div>
      </div>

      {/* Bottom CTA Button */}
      <div className="p-4 pt-0">
        <button
          onClick={() => openCustomization(item)}
          className="w-full py-3 bg-[#C41E3A] hover:bg-[#a3162c] text-white font-black uppercase text-xs tracking-wider rounded-2xl border-2 border-[#FFD54F] shadow-[3px_3px_0px_#5C0614] active:translate-x-0.5 active:translate-y-0.5 transition-all flex items-center justify-center gap-1.5"
        >
          <Plus className="w-4 h-4 stroke-[3]" />
          <span>CARNIVAL PACK • ADD</span>
        </button>
      </div>
    </motion.article>
  );
}
