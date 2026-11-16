"use client";

import React from "react";
import { motion } from "framer-motion";
import { Heart, Plus, Sparkles, Clock, Flame, Maximize2, Zap } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import * as api from "@/lib/api";

export default function ConceptCFoodCard({
  item,
  onOpenLightbox,
}: {
  item: any;
  onOpenLightbox?: (item: any) => void;
}) {
  const { openCustomization } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const isFav = isInWishlist(item.id);

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4 }}
      className="group bg-[#FFFDF7] border-4 border-black flex flex-col justify-between shadow-[6px_6px_0px_#FF007F] hover:shadow-[10px_10px_0px_#0047FF] hover:-translate-x-1 hover:-translate-y-1 transition-all duration-200 relative overflow-hidden"
    >
      {/* Top Graphic Stripe */}
      <div className="bg-black text-white px-3 py-1 flex items-center justify-between text-[11px] font-black uppercase tracking-widest border-b-2 border-black">
        <span className="flex items-center gap-1.5 text-[#FFE600]">
          <Zap className="w-3.5 h-3.5 fill-current" />
          <span>{item.category || "Pop Dish"}</span>
        </span>
        <span className="bg-[#FF007F] text-white px-2 py-0.2 rounded-full font-mono text-[10px]">
          № {String(item.id).padStart(2, "0")}
        </span>
      </div>

      <div>
        {/* Visual Poster Frame */}
        <div
          onClick={() => onOpenLightbox && onOpenLightbox({ ...item, conceptTheme: "popart" })}
          className={`relative aspect-[4/3] overflow-hidden bg-[#FFE600]/20 border-b-4 border-black ${
            onOpenLightbox ? "cursor-pointer" : ""
          }`}
        >
          <img
            src={api.resolveImageUrl(item.image_url)}
            alt={item.name}
            className="w-full h-full object-cover group-hover:scale-105 group-hover:rotate-1 transition-transform duration-300"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "/images/fallback-food.svg";
            }}
          />

          {/* Quick Enlarge Scrim */}
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
            {onOpenLightbox && (
              <span className="p-3 bg-[#FFE600] text-black border-2 border-black font-black uppercase text-xs flex items-center gap-1.5 shadow-[3px_3px_0px_#000] scale-90 group-hover:scale-100 transition-transform">
                <Maximize2 className="w-4 h-4 stroke-[3]" />
                <span>EXPAND ART</span>
              </span>
            )}
          </div>

          {/* Pop Badges */}
          <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5 items-start z-10 pointer-events-none">
            {item.is_bestseller == 1 && (
              <span className="px-2.5 py-0.5 bg-[#FF007F] text-white text-[9px] uppercase font-black border-2 border-black shadow-[2px_2px_0px_#000] flex items-center gap-1">
                <Sparkles className="w-3 h-3 fill-current" />
                POP HIT
              </span>
            )}
            <span
              className={`px-2 py-0.5 text-[8.5px] uppercase font-black border-2 border-black shadow-[2px_2px_0px_#000] ${
                item.is_veg == 1
                  ? "bg-[#FFE600] text-black"
                  : "bg-[#FF1E27] text-white"
              }`}
            >
              {item.is_veg == 1 ? "🌱 100% VEG" : "🍗 SAVORY MEAT"}
            </span>
          </div>

          {/* Wishlist Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleWishlist(item.id);
            }}
            className={`absolute top-2.5 right-2.5 p-2 rounded-full border-2 border-black transition-all shadow-[2px_2px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 z-10 ${
              isFav
                ? "bg-[#FF007F] text-white"
                : "bg-white text-black hover:bg-[#FFE600]"
            }`}
            aria-label="Add to Popart Wishlist"
          >
            <Heart className={`w-4 h-4 ${isFav ? "fill-current" : ""}`} />
          </button>

          {/* Net weight tag */}
          <div className="absolute bottom-2 left-2 bg-black/90 text-[#FFE600] text-[9.5px] font-black px-2 py-0.5 rounded border border-white/20 flex items-center gap-1 font-mono">
            <span>PACK: {item.net_weight || "250g Jar"}</span>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-4 space-y-2">
          <div className="flex items-center justify-between text-[10px] font-black uppercase text-[#0047FF]">
            <span>SHELF: {item.shelf_life || "12 MONTHS"}</span>
            <span className="bg-[#FFE600] text-black px-1.5 py-0.5 text-[9px] font-mono border border-black">
              {item.dietary_tags ? item.dietary_tags.split(",")[0] : "CLEAN LABEL"}
            </span>
          </div>

          <h3 className="text-xl font-black uppercase tracking-tight text-[#111111] leading-tight line-clamp-1 group-hover:text-[#FF007F] transition-colors">
            {item.name}
          </h3>

          <p className="text-xs font-medium text-gray-700 line-clamp-2 leading-relaxed">
            {item.description || "An explosion of bold spices and high-flavor artistry designed for modern tastebuds."}
          </p>
        </div>
      </div>

      {/* Bottom Action Footer */}
      <div className="p-4 pt-2 border-t-2 border-black/10 flex items-center justify-between gap-3 bg-[#FFFDF7]">
        <div>
          <span className="text-[9px] font-black uppercase text-gray-400 block tracking-wider">
            PER UNIT
          </span>
          <span className="text-xl font-black text-black">
            {api.formatPrice(item.price)}
          </span>
        </div>

        <button
          onClick={() => openCustomization(item)}
          className="bg-[#FFE600] hover:bg-[#FF007F] hover:text-white text-black font-black uppercase text-xs px-4 py-2.5 border-2 border-black shadow-[3px_3px_0px_#000] active:shadow-none active:translate-x-0.5 active:translate-y-0.5 transition-all flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4 stroke-[3]" />
          <span>POP PACK • ADD</span>
        </button>
      </div>
    </motion.article>
  );
}
