"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles, Plus, Clock, Flame, ShieldCheck } from "lucide-react";
import { useCart } from "@/context/CartContext";
import * as api from "@/lib/api";

export interface LightboxItem {
  id: number | string;
  name: string;
  category?: string;
  image_url: string;
  description?: string;
  price?: number;
  preparation_time?: string;
  calories?: number | string;
  is_veg?: number | boolean;
  is_bestseller?: number | boolean;
  net_weight?: string;
  shelf_life?: string;
  conceptTheme?: "coquette" | "retro" | "popart" | "earth" | "metro" | "manga" | "circus" | "luxury";
}

interface CinematicLightboxProps {
  item: LightboxItem | null;
  onClose: () => void;
}

export default function CinematicLightbox({ item, onClose }: CinematicLightboxProps) {
  const { openCustomization } = useCart();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (item) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [item, onClose]);

  if (!item) return null;

  const isCoquette = item.conceptTheme === "coquette";
  const isRetro = item.conceptTheme === "retro";
  const isPopArt = item.conceptTheme === "popart";
  const isEarth = item.conceptTheme === "earth";
  const isMetro = item.conceptTheme === "metro";
  const isManga = item.conceptTheme === "manga";
  const isCircus = item.conceptTheme === "circus";
  const isLuxury = item.conceptTheme === "luxury" || (!isCoquette && !isRetro && !isPopArt && !isEarth && !isMetro && !isManga && !isCircus);

  return (
    <AnimatePresence>
      <motion.div
        key="cinematic-lightbox-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.35 }}
        onClick={onClose}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-black/92 backdrop-blur-2xl"
      >
        {/* Modal Window Container */}
        <motion.div
          key="cinematic-lightbox-content"
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 20 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          onClick={(e) => e.stopPropagation()}
          className={`relative w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-3xl shadow-2xl flex flex-col md:flex-row overflow-hidden border ${
            isManga
              ? "bg-[#FFFDF7] border-4 border-black text-black shadow-[12px_12px_0px_#D7263D] font-sans"
              : isCircus
              ? "bg-[#FFFDD0] border-4 border-[#C41E3A] text-[#3D0C11] shadow-[12px_12px_0px_#FFD54F]"
              : isMetro
              ? "bg-[#08142C] border-4 border-[#FFD100] text-[#F8F6F0] shadow-[12px_12px_0px_#D71920]"
              : isPopArt
              ? "bg-[#FFFDF7] border-4 border-black text-[#111111] shadow-[12px_12px_0px_#FF007F]"
              : isEarth
              ? "bg-[#FDFBF7] border-2 border-[#5E6B4E]/30 text-[#1E3F20]"
              : isRetro
              ? "bg-[#FFF9EC] border-4 border-black text-black shadow-[12px_12px_0px_#000]"
              : isCoquette
              ? "bg-[#FFF8F9] border-2 border-rose-200 text-[#3D2D2E]"
              : "bg-[#140E0C] border border-[#C5A059]/40 text-[#FAF7F2]"
          }`}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className={`absolute top-4 right-4 z-20 p-2.5 rounded-full transition-transform active:scale-90 ${
              isManga
                ? "bg-[#D7263D] text-white border-2 border-black hover:bg-black hover:text-white"
                : isCircus
                ? "bg-[#C41E3A] text-white border-2 border-[#FFD54F] hover:bg-[#FFD54F] hover:text-[#C41E3A]"
                : isMetro
                ? "bg-[#D71920] text-white border-2 border-[#FFD100] hover:bg-[#FFD100] hover:text-black"
                : isPopArt
                ? "bg-[#FFE600] text-black border-2 border-black hover:bg-[#FF007F] hover:text-white"
                : isEarth
                ? "bg-[#5E6B4E]/10 hover:bg-[#5E6B4E] hover:text-[#FDFBF7] text-[#5E6B4E] border border-[#5E6B4E]/20"
                : isRetro
                ? "bg-[#FF2A55] text-white border-2 border-black hover:rotate-90"
                : isCoquette
                ? "bg-white/80 hover:bg-white text-gray-700 hover:text-rose-500 border border-rose-200"
                : "bg-white/10 hover:bg-white/20 text-[#C5A059] border border-[#C5A059]/30"
            }`}
            aria-label="Close Lightbox"
          >
            <X className="w-5 h-5 stroke-[2.5]" />
          </button>

          {/* High-Resolution Cinematic Image Showcase */}
          <div className="relative md:w-7/12 aspect-[4/3] md:aspect-auto overflow-hidden bg-black flex items-center justify-center">
            <motion.img
              initial={{ scale: 1.1 }}
              animate={{ scale: 1.0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              src={api.resolveImageUrl(item.image_url)}
              alt={item.name}
              className="w-full h-full object-cover animate-ken-burns select-none"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "/images/fallback-food.svg";
              }}
            />
            {/* Cinematic subtle vignette */}
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/60 via-transparent to-black/20" />

            {/* Tag badge */}
            {item.category && (
              <div className="absolute bottom-4 left-4">
                <span
                  className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest backdrop-blur-md ${
                    isMetro
                      ? "bg-[#FFD100] text-[#08142C] font-mono border-2 border-white font-black"
                      : isPopArt
                      ? "bg-[#0047FF] text-white border-2 border-black shadow-[2px_2px_0px_#000]"
                      : isEarth
                      ? "bg-[#5E6B4E] text-[#FDFBF7] shadow-sm"
                      : isRetro
                      ? "bg-[#FFE15D] text-black border-2 border-black shadow-[2px_2px_0px_#000]"
                      : isCoquette
                      ? "bg-white/90 text-[#E07A86] border border-rose-200"
                      : "bg-[#140E0C]/90 text-[#C5A059] border border-[#C5A059]/40"
                  }`}
                >
                  {item.category}
                </span>
              </div>
            )}
          </div>

          {/* Details & Culinary Description */}
          <div className="md:w-5/12 p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                {item.is_bestseller ? (
                  <span
                    className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      isMetro
                        ? "bg-[#D71920] text-white font-mono border border-white"
                        : isPopArt
                        ? "bg-[#FF007F] text-white border border-black shadow-[2px_2px_0px_#FFE600]"
                        : isEarth
                        ? "bg-[#C86D51]/15 text-[#C86D51] border border-[#C86D51]/30"
                        : isRetro
                        ? "bg-[#FF2A55] text-white"
                        : isCoquette
                        ? "bg-rose-100 text-rose-800"
                        : "bg-[#C5A059]/20 text-[#C5A059] border border-[#C5A059]/30"
                    }`}
                  >
                    <Sparkles className="w-3 h-3" />
                    <span>Bestseller</span>
                  </span>
                ) : null}

                {item.is_veg !== undefined && (
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wider ${
                      item.is_veg
                        ? "bg-emerald-950/40 text-emerald-400 border border-emerald-500/30"
                        : "bg-rose-950/40 text-rose-400 border border-rose-500/30"
                    }`}
                  >
                    {item.is_veg ? "🌱 Vegetarian" : "🍗 Non-Veg"}
                  </span>
                )}
              </div>

              <div>
                <h3
                  className={`text-2xl sm:text-3xl font-bold leading-snug ${
                    isMetro
                      ? "font-mono font-black uppercase tracking-tight text-[#FFD100]"
                      : isPopArt
                      ? "font-black uppercase tracking-tight text-[#111111]"
                      : isEarth
                      ? "font-serif text-[#1E3F20]"
                      : isRetro
                      ? "font-retro-bold uppercase tracking-tight"
                      : isCoquette
                      ? "font-coquette-serif"
                      : "font-luxury-serif font-normal text-[#FAF7F2]"
                  }`}
                >
                  {item.name}
                </h3>
                {isCoquette && (
                  <p className="font-script text-lg text-[#E07A86] mt-0.5">
                    freshly handcrafted with patience ♡
                  </p>
                )}
                {isPopArt && (
                  <p className="text-xs font-black uppercase text-[#FF6B00] tracking-widest mt-0.5">
                    ★ POP-ART HOUSE RECIPE ★
                  </p>
                )}
                {isEarth && (
                  <p className="font-serif italic text-xs text-[#7B8E78] mt-0.5">
                    sustainably harvested & farm-sourced
                  </p>
                )}
                {isMetro && (
                  <p className="font-mono text-xs text-[#FFD100] tracking-widest uppercase mt-0.5">
                    🚆 PLATFORM 01 &bull; EXPRESS GOURMET LOCO
                  </p>
                )}
              </div>

              <p
                className={`text-xs sm:text-sm leading-relaxed ${
                  isLuxury ? "text-stone-300 font-light" : isEarth ? "text-[#5E6B4E]" : "text-gray-600"
                }`}
              >
                {item.description ||
                  "A celebrated house creation simmered with authentic regional ingredients, imported olive oils, and farm-fresh herbs."}
              </p>

              {/* Prep & Calories micro stats */}
              <div className="flex items-center gap-4 text-xs pt-2">
                {item.preparation_time && (
                  <div className="flex items-center gap-1.5 opacity-80">
                    <Clock className="w-3.5 h-3.5 text-amber-500" />
                    <span>{item.preparation_time}</span>
                  </div>
                )}
                {item.calories && (
                  <div className="flex items-center gap-1.5 opacity-80">
                    <Flame className="w-3.5 h-3.5 text-rose-500" />
                    <span>{item.calories} kcal</span>
                  </div>
                )}
              </div>
            </div>

            {/* Price & Action Button */}
            <div
              className={`pt-5 border-t flex items-center justify-between gap-4 ${
                isMetro
                  ? "border-[#FFD100]/30"
                  : isPopArt
                  ? "border-black"
                  : isEarth
                  ? "border-[#5E6B4E]/20"
                  : isLuxury
                  ? "border-[#C5A059]/20"
                  : isRetro
                  ? "border-black"
                  : "border-rose-100"
              }`}
            >
              {item.price ? (
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-wider opacity-60 block">
                    Degustation Price
                  </span>
                  <span
                    className={`text-xl sm:text-2xl font-bold ${
                      isMetro
                        ? "font-mono font-black text-[#FFD100]"
                        : isPopArt
                        ? "font-black text-[#FF007F]"
                        : isEarth
                        ? "font-serif text-[#C86D51]"
                        : isLuxury
                        ? "font-luxury-serif text-[#C5A059]"
                        : isRetro
                        ? "font-retro-bold"
                        : "font-coquette-serif text-[#3D2D2E]"
                    }`}
                  >
                    {api.formatPrice(item.price)}
                  </span>
                </div>
              ) : (
                <div />
              )}

              {item.id && typeof item.id === "number" && (
                <button
                  onClick={() => {
                    openCustomization(item);
                    onClose();
                  }}
                  className={`px-5 py-3 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all shadow-lg active:scale-95 ${
                    isMetro
                      ? "bg-[#D71920] hover:bg-[#B3141A] text-white border-2 border-[#FFD100] font-mono shadow-[4px_4px_0px_#000]"
                      : isPopArt
                      ? "bg-[#FFE600] text-black border-2 border-black shadow-[4px_4px_0px_#000] hover:bg-[#FF007F] hover:text-white"
                      : isEarth
                      ? "bg-[#5E6B4E] hover:bg-[#4E5B3F] text-[#FDFBF7] shadow-md font-serif"
                      : isRetro
                      ? "bg-[#FFE15D] text-black border-2 border-black shadow-[4px_4px_0px_#000] hover:bg-[#FFD600]"
                      : isCoquette
                      ? "bg-gradient-to-r from-[#E07A86] to-[#F59E0B] text-white shadow-rose-300/50 hover:opacity-95"
                      : "bg-[#C5A059] text-[#140E0C] hover:bg-[#D4AF67] shadow-[#C5A059]/20 animate-shimmer"
                  }`}
                >
                  <Plus className="w-4 h-4 stroke-[2.5]" />
                  <span>Order &bull; Customize</span>
                </button>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
