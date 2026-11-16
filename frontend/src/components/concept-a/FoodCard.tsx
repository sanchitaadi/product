"use client";

import React from "react";
import { motion } from "framer-motion";
import { Heart, Plus, Sparkles, Clock, ShieldCheck, Maximize2, Package } from "lucide-react";
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
      whileHover={{ y: -5 }}
      className="relative bg-[#13151A] rounded-2xl p-4 border border-[#C5A059]/30 shadow-lg hover:shadow-[0_10px_30px_rgba(197,160,89,0.15)] hover:border-[#C5A059]/70 transition-all duration-300 flex flex-col justify-between group"
    >
      {/* Luxury Gold Corner Accent */}
      <div className="absolute top-0 right-0 w-8 h-8 overflow-hidden pointer-events-none">
        <div className="absolute transform rotate-45 bg-[#C5A059] text-[8px] font-bold py-0.5 right-[-35px] top-[18px] w-[100px] text-center text-[#0D0E11] opacity-60">
          RESERVE
        </div>
      </div>

      <div>
        {/* Luxury Image Frame */}
        <div
          onClick={() => onOpenLightbox && onOpenLightbox({ ...item, conceptTheme: "luxury" })}
          className={`relative aspect-[4/3] rounded-xl overflow-hidden mb-4 bg-[#0A0B0E] border border-[#C5A059]/20 ${
            onOpenLightbox ? "cursor-pointer" : ""
          }`}
        >
          <img
            src={api.resolveImageUrl(item.image_url)}
            alt={item.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "/images/products/noir-cacao-bar.jpg";
            }}
          />

          {/* Subtle dark gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

          {/* Quick Zoom Indicator */}
          {onOpenLightbox && (
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
              <span className="p-2.5 rounded-full bg-[#16181F]/90 text-[#C5A059] border border-[#C5A059]/50 shadow-md">
                <Maximize2 className="w-4 h-4" />
              </span>
            </div>
          )}

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5 items-start">
            {item.is_bestseller == 1 && (
              <span className="px-2.5 py-1 rounded-full bg-[#0D0E11]/90 backdrop-blur-md text-[#D4AF37] border border-[#C5A059]/60 text-[10px] font-bold uppercase tracking-widest flex items-center gap-1 shadow-sm">
                <span>✦</span> Bestseller
              </span>
            )}
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider border backdrop-blur-md bg-[#0D0E11]/80 text-[#A89F91] border-[#C5A059]/30">
              {item.is_veg == 1 ? "🌱 100% Plant Based" : "✦ Confection"}
            </span>
          </div>

          {/* Wishlist Button */}
          <button
            onClick={() => toggleWishlist(item.id)}
            className={`absolute top-3 right-3 p-2.5 rounded-full backdrop-blur-md transition-all duration-300 shadow-sm ${
              isFav
                ? "bg-[#C5A059] text-[#0D0E11] scale-110"
                : "bg-[#0D0E11]/80 text-[#D1C7BD] hover:text-[#C5A059] hover:bg-[#0D0E11] hover:scale-105 border border-[#C5A059]/30"
            }`}
            aria-label="Save to wishlist"
          >
            <Heart className={`w-3.5 h-3.5 ${isFav ? "fill-current" : ""}`} />
          </button>

          {/* Bottom Weight & Packaging Tag */}
          <div className="absolute bottom-2.5 left-3 px-2 py-0.5 rounded bg-[#0D0E11]/85 backdrop-blur-md text-[10px] font-mono text-[#C5A059] border border-[#C5A059]/30">
            {item.net_weight || "Sealed Luxury Unit"}
          </div>
        </div>

        {/* Content Details */}
        <div className="space-y-2 px-1">
          <div className="flex items-center justify-between text-[11px] text-[#A89F91]">
            <span className="text-[10px] tracking-wider uppercase font-semibold text-[#C5A059]">
              {item.category || "Reserve Pantry"}
            </span>
            <span className="text-[11px] text-[#D4AF37] font-medium tracking-tight">
              ★ {item.rating || "4.95"} ({item.reviewsCount || 120})
            </span>
          </div>

          <h3 className="font-serif font-bold text-base text-[#F7F5F0] group-hover:text-[#C5A059] transition-colors leading-snug">
            {item.name}
          </h3>

          <p className="text-xs text-[#A89F91] line-clamp-2 leading-relaxed">
            {item.description}
          </p>

          <div className="flex items-center gap-2 pt-1 text-[10px] text-gray-400 font-mono">
            <span>Shelf Life: {item.shelf_life || "12 Months"}</span>
            <span>&bull;</span>
            <span className="text-[#C5A059]">Cold-Chain Safe</span>
          </div>
        </div>
      </div>

      {/* Card Footer with Price and Pack Selector */}
      <div className="pt-3.5 mt-3 border-t border-[#C5A059]/20 flex items-center justify-between px-1">
        <div>
          <span className="text-[9px] uppercase font-bold text-gray-400 block tracking-widest leading-none">
            Retail Pack
          </span>
          <div className="flex items-baseline gap-1.5 mt-0.5">
            <span className="text-lg font-bold font-serif text-[#F7F5F0]">
              {api.formatPrice(item.price)}
            </span>
            {item.compareAtPrice && (
              <span className="text-xs text-gray-500 line-through">
                {api.formatPrice(item.compareAtPrice)}
              </span>
            )}
          </div>
        </div>

        <button
          onClick={() => openCustomization(item)}
          className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#C5A059] to-[#D4AF37] hover:brightness-110 text-[#0D0E11] font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-md shadow-[#C5A059]/20 transition-transform active:scale-95"
          aria-label={`Select packs for ${item.name}`}
        >
          <Package className="w-3.5 h-3.5" />
          <span>Select Pack</span>
        </button>
      </div>
    </motion.div>
  );
}
