"use client";

import React from "react";
import { motion } from "framer-motion";
import { Heart, Plus, Sparkles, Clock, Zap, Maximize2 } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import * as api from "@/lib/api";

export default function ConceptFFoodCard({
  item,
  onOpenLightbox,
}: {
  item: any;
  onOpenLightbox?: (item: any) => void;
}) {
  const { openCustomization } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const isFav = isInWishlist(item.id);

  // Decorative Japanese sound-effect tags
  const soundEffects = ["UMAI!! 美味い", "DOKI-DOKI!!", "CRUNCH!!", "DELICIOUS!!", "SAIKOU!! 最高"];
  const randomSfx = soundEffects[item.id % soundEffects.length];

  return (
    <motion.article
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4 }}
      className="group bg-white border-4 border-black rounded-none flex flex-col justify-between shadow-[6px_6px_0px_#000] hover:shadow-[10px_10px_0px_#D7263D] hover:-translate-x-1 hover:-translate-y-1 transition-all duration-200 relative text-black font-sans"
    >
      {/* Top Manga Header Strip */}
      <div className="bg-black text-white px-3.5 py-1.5 flex items-center justify-between text-[10px] font-black uppercase tracking-wider">
        <span className="flex items-center gap-1.5 text-[#FFE600]">
          <span>⚡</span>
          <span>{item.category || "MANGA DISH"}</span>
        </span>
        <span className="font-mono text-[#FFFDF7] text-[9px]">
          PANEL #{String(item.id).padStart(2, "0")}
        </span>
      </div>

      <div>
        {/* Photo Viewport with Halftone Underlay */}
        <div
          onClick={() => onOpenLightbox && onOpenLightbox({ ...item, conceptTheme: "manga" })}
          className={`relative aspect-[4/3] overflow-hidden bg-[#FFFDF7] border-b-3 border-black ${
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
              <span className="px-3 py-1 bg-[#FFE600] text-black font-black text-xs uppercase border-2 border-black flex items-center gap-1 shadow-[3px_3px_0px_#000]">
                <Maximize2 className="w-3.5 h-3.5" />
                <span>INSPECT PANEL</span>
              </span>
            )}
          </div>

          {/* Sound Effect Speech Bubble */}
          <div className="absolute top-2 left-2 px-2.5 py-1 bg-[#FFE600] text-black font-black text-[10px] uppercase border-2 border-black shadow-[2px_2px_0px_#000] rotate-[-3deg]">
            {randomSfx}
          </div>

          {/* Wishlist Heart Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleWishlist(item.id);
            }}
            className="absolute top-2 right-2 p-2 bg-white text-black hover:text-[#D7263D] border-2 border-black shadow-[2px_2px_0px_#000] active:scale-90 transition-all"
            aria-label="Save to Wishlist"
          >
            <Heart
              className={`w-4 h-4 ${
                isFav ? "fill-[#D7263D] text-[#D7263D]" : ""
              }`}
            />
          </button>

          {/* Veg / Non-Veg Badge & Net Weight */}
          <div className="absolute bottom-2 left-2 flex items-center gap-1.5">
            <span
              className={`px-2 py-0.5 text-[9px] font-black uppercase tracking-wider border-2 border-black ${
                item.is_veg
                  ? "bg-[#22C55E] text-white"
                  : "bg-[#D7263D] text-white"
              }`}
            >
              {item.is_veg ? "VEG 🥬" : "NON-VEG 🍗"}
            </span>
            <span className="px-2 py-0.5 text-[9px] font-black uppercase bg-black text-[#FFE600] border-2 border-white">
              {item.net_weight || "250g Jar"}
            </span>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-4 space-y-2">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-black text-base uppercase tracking-tight text-black group-hover:text-[#D7263D] transition-colors leading-snug">
              {item.name}
            </h3>
            <span className="font-black text-base text-black bg-[#FFE600] px-2 py-0.5 border-2 border-black shrink-0">
              {api.formatPrice(item.price)}
            </span>
          </div>

          <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed">
            {item.description}
          </p>
        </div>
      </div>

      {/* Bottom CTA Button */}
      <div className="p-4 pt-0">
        <button
          onClick={() => openCustomization(item)}
          className="w-full py-3 bg-[#D7263D] hover:bg-[#b51f33] text-white font-black uppercase text-xs tracking-wider border-2 border-black shadow-[4px_4px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all flex items-center justify-center gap-1.5"
        >
          <Plus className="w-4 h-4 stroke-[3]" />
          <span>PROVISION PACK • ADD</span>
        </button>
      </div>
    </motion.article>
  );
}
