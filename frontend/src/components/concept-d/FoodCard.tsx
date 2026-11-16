"use client";

import React from "react";
import { motion } from "framer-motion";
import { Heart, Plus, Sparkles, Clock, Leaf, Maximize2 } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import * as api from "@/lib/api";

export default function ConceptDFoodCard({
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
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="group bg-[#FDFBF7] border border-[#5E6B4E]/20 rounded-2xl overflow-hidden flex flex-col justify-between hover:border-[#5E6B4E]/50 hover:shadow-lg transition-all duration-300 relative"
    >
      <div>
        {/* Visual Botanical Image Frame */}
        <div
          onClick={() => onOpenLightbox && onOpenLightbox({ ...item, conceptTheme: "earth" })}
          className={`relative aspect-[4/3] overflow-hidden bg-[#F2EFE9] ${
            onOpenLightbox ? "cursor-pointer" : ""
          }`}
        >
          <img
            src={api.resolveImageUrl(item.image_url)}
            alt={item.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "/images/fallback-food.svg";
            }}
          />

          {/* Gentle Natural Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            {onOpenLightbox && (
              <span className="p-2.5 rounded-full bg-[#FDFBF7]/90 text-[#1E3F20] backdrop-blur-sm shadow-md scale-90 group-hover:scale-100 transition-transform">
                <Maximize2 className="w-4 h-4" />
              </span>
            )}
          </div>

          {/* Botanical Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1 items-start z-10 pointer-events-none">
            {item.is_bestseller == 1 && (
              <span className="px-2.5 py-0.5 rounded-full bg-[#C86D51] text-white text-[9px] font-serif uppercase tracking-wider shadow-sm flex items-center gap-1">
                <Sparkles className="w-2.5 h-2.5" />
                Harvest Signature
              </span>
            )}
            <span className="px-2.5 py-0.5 rounded-full bg-[#FDFBF7]/90 backdrop-blur-sm text-[#1E3F20] text-[8.5px] font-medium border border-[#5E6B4E]/20">
              {item.is_veg == 1 ? "🌱 Organic Veg" : "🌾 Farm Sourced"}
            </span>
          </div>

          {/* Wishlist Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleWishlist(item.id);
            }}
            className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-sm transition-all duration-200 z-10 ${
              isFav
                ? "bg-[#C86D51] text-white"
                : "bg-[#FDFBF7]/85 text-[#1E3F20] hover:bg-[#5E6B4E] hover:text-white"
            }`}
            aria-label="Add to botanical favorites"
          >
            <Heart className={`w-3.5 h-3.5 ${isFav ? "fill-current" : ""}`} />
          </button>

          {/* Harvest Net Weight Tag */}
          <div className="absolute bottom-2.5 left-3 bg-[#1E3F20]/90 text-[#FDFBF7] text-[9.5px] font-sans px-2.5 py-0.5 rounded-full flex items-center gap-1.5 backdrop-blur-xs border border-[#7B8E78]/30">
            <span>📦 {item.net_weight || "250g Glass Jar"}</span>
            <span className="text-[#A3B8A0]">• {item.shelf_life || "12 Months"}</span>
          </div>
        </div>

        {/* Story & Ingredients */}
        <div className="p-5 space-y-2">
          <div className="flex items-center justify-between text-[10px] uppercase tracking-widest text-[#7B8E78] font-serif">
            <span>{item.category || "Pantry Provisions"}</span>
            <span className="flex items-center gap-1 text-[#5E6B4E]">
              <Leaf className="w-2.5 h-2.5" />
              <span>{item.dietary_tags ? item.dietary_tags.split(",")[0] : "100% Organic"}</span>
            </span>
          </div>

          <h3 className="font-serif text-xl font-medium text-[#1E3F20] leading-snug group-hover:text-[#C86D51] transition-colors">
            {item.name}
          </h3>

          <p className="text-xs text-[#5E6B4E] font-light leading-relaxed line-clamp-2">
            {item.description || "Freshly gathered seasonal botanicals, stone-ground flours, and cold-pressed extra virgin olive oil."}
          </p>
        </div>
      </div>

      {/* Action Footer */}
      <div className="p-5 pt-3 border-t border-[#5E6B4E]/15 flex items-center justify-between gap-3 bg-[#FDFBF7]">
        <div>
          <span className="text-[9px] uppercase font-serif tracking-wider text-[#7B8E78] block">
            Single Jar / Pack
          </span>
          <span className="font-serif text-lg font-medium text-[#1E3F20]">
            {api.formatPrice(item.price)}
          </span>
        </div>

        <button
          onClick={() => openCustomization(item)}
          className="bg-[#5E6B4E] hover:bg-[#4E5B3F] text-[#FDFBF7] font-serif text-xs px-4 py-2 rounded-full shadow-sm hover:shadow transition-all flex items-center gap-1.5 active:scale-95"
        >
          <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
          <span>Select Harvest Pack</span>
        </button>
      </div>
    </motion.article>
  );
}
