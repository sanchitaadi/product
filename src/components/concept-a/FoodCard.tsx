"use client";

import React from "react";
import { motion } from "framer-motion";
import { Heart, Plus, Sparkles, Clock, Flame, Maximize2 } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import * as api from "@/lib/api";

export default function ConceptAFoodCard({
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
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45 }}
      whileHover={{ y: -4 }}
      className="relative bg-white/95 rounded-[2rem] p-4 border border-[#FFCAD4]/70 shadow-sm hover:shadow-xl hover:shadow-rose-200/50 transition-all duration-300 flex flex-col justify-between group backdrop-blur-sm"
    >
      {/* Decorative Washi Tape */}
      <div className="washi-tape" />

      <div>
        {/* Polaroid-style Image Frame */}
        <div
          onClick={() => onOpenLightbox && onOpenLightbox({ ...item, conceptTheme: "coquette" })}
          className={`relative aspect-[4/3] rounded-2xl overflow-hidden mb-3.5 bg-gradient-to-tr from-rose-50 to-[#FFE5D9]/40 border border-rose-100/80 ${
            onOpenLightbox ? "cursor-pointer" : ""
          }`}
        >
          <img
            src={api.resolveImageUrl(item.image_url)}
            alt={item.name}
            className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "/images/fallback-food.svg";
            }}
          />

          {/* Quick Zoom Indicator */}
          {onOpenLightbox && (
            <div className="absolute inset-0 bg-rose-900/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
              <span className="p-2 rounded-full bg-white/90 text-[#E07A86] border border-rose-200 shadow-sm">
                <Maximize2 className="w-4 h-4" />
              </span>
            </div>
          )}

          {/* Aesthetic Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5 items-start">
            {item.is_bestseller == 1 && (
              <span className="px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-[#E07A86] border border-rose-200 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 shadow-sm">
                <span>🎀</span> Bestseller
              </span>
            )}
            <span
              className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider border backdrop-blur-md ${
                item.is_veg == 1
                  ? "bg-emerald-50/90 text-emerald-800 border-emerald-200"
                  : "bg-rose-50/90 text-rose-800 border-rose-200"
              }`}
            >
              {item.is_veg == 1 ? "🌱 Veg" : "🍗 Non-Veg"}
            </span>
          </div>

          {/* Romantic Heart Wishlist Button */}
          <button
            onClick={() => toggleWishlist(item.id)}
            className={`absolute top-3 right-3 p-2.5 rounded-full backdrop-blur-md transition-all duration-300 shadow-sm ${
              isFav
                ? "bg-[#E07A86] text-white scale-110 shadow-rose-300/50"
                : "bg-white/85 text-gray-500 hover:text-[#E07A86] hover:bg-white hover:scale-105"
            }`}
            aria-label="Save to wishlist"
          >
            <Heart className={`w-4 h-4 ${isFav ? "fill-current" : ""}`} />
          </button>

          {/* Bottom subtle mood tag */}
          <div className="absolute bottom-2.5 right-3 px-2 py-0.5 rounded-full bg-white/90 backdrop-blur-md text-[11px] font-script text-[#E07A86] shadow-xs">
            made fresh with love ♡
          </div>
        </div>

        {/* Content Details */}
        <div className="space-y-1.5 px-1.5">
          <div className="flex items-center justify-between text-[11px] text-gray-500">
            <div className="flex items-center gap-3">
              {item.preparation_time && (
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3 text-rose-400" />
                  <span>{item.preparation_time}</span>
                </span>
              )}
              {item.calories && (
                <span className="flex items-center gap-1">
                  <Flame className="w-3 h-3 text-rose-400" />
                  <span>{item.calories} kcal</span>
                </span>
              )}
            </div>
            <span className="text-xs text-rose-400/80 font-medium tracking-tight">
              ★ 4.9
            </span>
          </div>

          <h3 className="font-coquette-serif font-bold text-lg text-[#3D2D2E] group-hover:text-[#E07A86] transition-colors leading-snug">
            {item.name}
          </h3>

          <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">
            {item.description}
          </p>
        </div>
      </div>

      {/* Card Footer with Price and Customize Trigger */}
      <div className="pt-3.5 mt-3 border-t border-rose-100/70 flex items-center justify-between px-1.5">
        <div>
          <span className="text-[10px] uppercase font-bold text-gray-400 block tracking-wider leading-none">
            Price
          </span>
          <span className="text-lg font-bold font-coquette-serif text-[#3D2D2E]">
            {api.formatPrice(item.price)}
          </span>
        </div>

        <button
          onClick={() => openCustomization(item)}
          className="px-4 py-2.5 rounded-full bg-gradient-to-r from-[#FFF0F3] to-[#FFE5D9] hover:from-[#E07A86] hover:to-[#F59E0B] text-[#E07A86] hover:text-white border border-rose-200 hover:border-transparent text-xs font-bold tracking-wide transition-all duration-300 flex items-center gap-1.5 shadow-sm active:scale-95 group/btn"
        >
          <Plus className="w-3.5 h-3.5 group-hover/btn:rotate-90 transition-transform" />
          <span>Add &bull; Customize</span>
        </button>
      </div>
    </motion.div>
  );
}
