"use client";

import React from "react";
import { motion } from "framer-motion";
import { Heart, Plus, Sparkles, Clock, Train, Maximize2, Ticket } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import * as api from "@/lib/api";

export default function ConceptEFoodCard({
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
      transition={{ duration: 0.4 }}
      className="group bg-[#08142C] border-3 border-[#FFD100] rounded-xl overflow-hidden flex flex-col justify-between shadow-[6px_6px_0px_#D71920] hover:shadow-[10px_10px_0px_#000] hover:-translate-x-1 hover:-translate-y-1 transition-all duration-200 relative text-white font-mono"
    >
      {/* Top Railway Ticket Header */}
      <div className="bg-[#050D1C] px-3.5 py-1.5 flex items-center justify-between text-[10px] font-black uppercase tracking-widest border-b-2 border-[#FFD100]/40">
        <span className="flex items-center gap-1.5 text-[#FFD100]">
          <Train className="w-3.5 h-3.5 text-[#D71920]" />
          <span>{item.category || "EXPRESS CARTE"}</span>
        </span>
        <span className="text-gray-400 font-mono text-[9px]">
          TKT #{String(item.id).padStart(4, "0")}
        </span>
      </div>

      <div>
        {/* Photo Viewport */}
        <div
          onClick={() => onOpenLightbox && onOpenLightbox({ ...item, conceptTheme: "metro" })}
          className={`relative aspect-[4/3] overflow-hidden bg-black ${
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
              <span className="p-3 bg-[#FFD100] text-[#08142C] border-2 border-black font-black uppercase text-xs flex items-center gap-1.5 shadow-[3px_3px_0px_#000] scale-90 group-hover:scale-100 transition-transform">
                <Maximize2 className="w-4 h-4 stroke-[3]" />
                <span>INSPECT TICKET</span>
              </span>
            )}
          </div>

          {/* Platform Badges */}
          <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 items-start z-10 pointer-events-none">
            {item.is_bestseller == 1 && (
              <span className="px-2.5 py-0.5 bg-[#D71920] text-white text-[9px] uppercase font-black border border-white shadow-[2px_2px_0px_#000] flex items-center gap-1">
                <Sparkles className="w-2.5 h-2.5" />
                EXPRESS HIT
              </span>
            )}
            <span
              className={`px-2 py-0.5 text-[8.5px] uppercase font-black border border-white shadow-[2px_2px_0px_#000] ${
                item.is_veg == 1
                  ? "bg-[#00A859] text-white"
                  : "bg-[#D71920] text-white"
              }`}
            >
              {item.is_veg == 1 ? "🌱 GREEN COACH (VEG)" : "🍗 DINING CAR (MEAT)"}
            </span>
          </div>

          {/* Wishlist Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleWishlist(item.id);
            }}
            className={`absolute top-2.5 right-2.5 p-2 rounded-full border border-white transition-all shadow-[2px_2px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 z-10 ${
              isFav
                ? "bg-[#D71920] text-white"
                : "bg-[#08142C]/80 text-[#FFD100] hover:bg-[#FFD100] hover:text-black"
            }`}
            aria-label="Add to travel itinerary"
          >
            <Heart className={`w-3.5 h-3.5 ${isFav ? "fill-current" : ""}`} />
          </button>

          {/* Prep Time */}
          {item.preparation_time && (
            <div className="absolute bottom-2 left-2.5 bg-black/85 text-[#FFD100] text-[9px] font-bold px-2 py-0.5 rounded border border-[#FFD100]/40 flex items-center gap-1">
              <Clock className="w-2.5 h-2.5" />
              <span>TRANSIT: {item.preparation_time}</span>
            </div>
          )}
        </div>

        {/* Content Section */}
        <div className="p-4 space-y-2">
          <div className="flex items-center justify-between text-[9px] text-[#FFD100] uppercase tracking-wider">
            <span>PLATFORM 02 &bull; COACH A</span>
            <span className="text-gray-400 font-mono">SEAT CONFIRMED</span>
          </div>

          <h3 className="text-lg font-black uppercase tracking-tight text-white leading-tight line-clamp-1 group-hover:text-[#FFD100] transition-colors">
            {item.name}
          </h3>

          <p className="text-xs text-gray-300 font-sans line-clamp-2 leading-relaxed">
            {item.description || "Freshly fired upon order dispatch, served hot in authentic railway dining style."}
          </p>
        </div>
      </div>

      {/* Ticket Perforated Divider */}
      <div className="relative border-t-2 border-dashed border-[#FFD100]/40 my-1">
        <div className="absolute -top-2.5 -left-3 w-5 h-5 rounded-full bg-[#050D1C] border border-[#FFD100]/40" />
        <div className="absolute -top-2.5 -right-3 w-5 h-5 rounded-full bg-[#050D1C] border border-[#FFD100]/40" />
      </div>

      {/* Action Footer */}
      <div className="p-4 pt-2 flex items-center justify-between gap-3 bg-[#050D1C]">
        <div>
          <span className="text-[9px] uppercase font-bold text-gray-400 block tracking-wider">
            TICKET FARE
          </span>
          <span className="text-lg font-black text-[#FFD100]">
            {api.formatPrice(item.price)}
          </span>
        </div>

        <button
          onClick={() => openCustomization(item)}
          className="bg-[#D71920] hover:bg-[#FFD100] hover:text-black text-white font-mono font-black uppercase text-xs px-4 py-2.5 rounded-lg border border-white shadow-[2px_2px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all flex items-center gap-1.5"
        >
          <Ticket className="w-3.5 h-3.5" />
          <span>BOARD</span>
        </button>
      </div>
    </motion.article>
  );
}
