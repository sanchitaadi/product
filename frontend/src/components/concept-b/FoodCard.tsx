"use client";

import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Heart, Plus, Flame, Clock, Sparkles, Maximize2, Check } from "lucide-react";
import confetti from "canvas-confetti";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useRetroSound } from "@/components/concept-b/RetroSoundFX";
import * as api from "@/lib/api";

export default function ConceptBFoodCard({
  item,
  onOpenLightbox,
}: {
  item: any;
  onOpenLightbox?: (item: any) => void;
}) {
  const { openCustomization } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { playCoin, playPop } = useRetroSound();

  const isFav = isInWishlist(item.id);
  const [justAdded, setJustAdded] = useState(false);

  // 3D Tilt State
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    // Calculate subtle tilt angle
    const rotateX = ((y - centerY) / centerY) * -7;
    const rotateY = ((x - centerX) / centerX) * 7;
    setTilt({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    playCoin();

    // Trigger mini confetti burst
    try {
      const rect = (e.target as HTMLElement).getBoundingClientRect();
      const x = (rect.left + rect.width / 2) / window.innerWidth;
      const y = (rect.top + rect.height / 2) / window.innerHeight;
      confetti({
        particleCount: 22,
        spread: 45,
        origin: { x, y },
        colors: ["#FFE15D", "#FF2A55", "#000000", "#FFFFFF"],
      });
    } catch {
      // ignore
    }

    setJustAdded(true);
    openCustomization(item);
    setTimeout(() => setJustAdded(false), 1400);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: "transform 0.12s ease-out",
      }}
      className="bg-[#FFF9EC] rounded-3xl border-[3.5px] border-black p-5 flex flex-col justify-between shadow-[6px_6px_0px_#000] hover:shadow-[10px_10px_0px_#FF2A55] transition-shadow relative group select-none"
    >
      <div>
        {/* Image Frame with Vintage Border & Stickers */}
        <div
          onClick={() => {
            playPop();
            if (onOpenLightbox) onOpenLightbox({ ...item, conceptTheme: "retro" });
          }}
          className={`relative aspect-[4/3] rounded-2xl overflow-hidden mb-4 border-[2.5px] border-black bg-stone-100 ${
            onOpenLightbox ? "cursor-pointer" : ""
          }`}
        >
          <img
            src={api.resolveImageUrl(item.image_url)}
            alt={item.name}
            className="w-full h-full object-cover group-hover:scale-108 group-hover:rotate-1 transition-transform duration-500 ease-out"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "/images/fallback-food.svg";
            }}
          />

          {/* Quick Zoom Indicator */}
          {onOpenLightbox && (
            <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <span className="p-2.5 rounded-xl bg-[#FFE15D] text-black border-2 border-black shadow-[3px_3px_0px_#000] flex items-center gap-1.5 font-retro-bold font-black text-[10px] uppercase">
                <Maximize2 className="w-3.5 h-3.5 stroke-[3]" />
                <span>EXPAND SNAP</span>
              </span>
            </div>
          )}

          {/* Retro Starburst Bestseller Badge */}
          {item.is_bestseller == 1 && (
            <div className="absolute top-2.5 left-2.5 z-10">
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-[#FF2A55] text-white text-[10px] font-retro-bold font-black uppercase tracking-wider rounded-lg border-2 border-black shadow-[2px_2px_0px_#000] -rotate-3 animate-starburst">
                <Flame className="w-3.5 h-3.5 fill-current" />
                HOT SELLER!
              </span>
            </div>
          )}

          {/* Diet Sticker */}
          <div className="absolute bottom-2.5 left-2.5 z-10">
            <span
              className={`text-[9px] font-retro-bold font-black uppercase px-2.5 py-1 rounded-md border-2 border-black shadow-[2px_2px_0px_#000] ${
                item.is_veg == 1
                  ? "bg-[#48BB78] text-white"
                  : "bg-[#FF6B35] text-white"
              }`}
            >
              {item.is_veg == 1 ? "🌱 100% VEG" : "🍗 NON-VEG"}
            </span>
          </div>

          {/* Tilted Vintage Price Tag Sticker */}
          <div className="absolute top-2.5 right-2.5 z-10">
            <div className="bg-[#FFE15D] text-black border-2 border-black font-retro-bold font-black text-sm px-3 py-1 rounded-xl shadow-[3px_3px_0px_#000] rotate-6 group-hover:rotate-0 transition-transform">
              {api.formatPrice(item.price)}
            </div>
          </div>

          {/* Wishlist Heart */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              playPop();
              toggleWishlist(item.id);
            }}
            className={`absolute bottom-2.5 right-2.5 p-2 rounded-xl border-2 border-black shadow-[2px_2px_0px_#000] transition active:scale-90 z-10 ${
              isFav
                ? "bg-[#FF2A55] text-white"
                : "bg-white text-black hover:bg-[#FFE15D]"
            }`}
            aria-label="Save retro fav"
          >
            <Heart className={`w-3.5 h-3.5 ${isFav ? "fill-current" : ""}`} />
          </button>
        </div>

        {/* Content */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-[10px] font-retro-bold font-black uppercase tracking-widest text-[#FF2A55]">
            <span className="bg-white px-2 py-0.5 rounded border border-black shadow-[1.5px_1.5px_0px_#000]">
              {item.category}
            </span>
            <span className="font-mono text-black/80 flex items-center gap-1 font-black">
              <span>📦 {item.net_weight || "150G POUCH"}</span>
            </span>
          </div>

          <h3 className="font-retro-bold font-black text-2xl text-black leading-tight group-hover:text-[#FF2A55] transition-colors">
            {item.name}
          </h3>

          <p className="text-xs text-stone-700 font-semibold line-clamp-2 leading-relaxed">
            {item.description}
          </p>

          <div className="flex items-center gap-2 pt-1">
            <span className="text-[9px] font-retro-bold font-black uppercase bg-[#FFE15D] text-black px-2 py-0.5 rounded border border-black shadow-[1px_1px_0px_#000]">
              SHELF: {item.shelf_life || "9 MONTHS"}
            </span>
            {item.dietary_tags && (
              <span className="text-[9px] font-retro-bold font-bold uppercase text-stone-600">
                {item.dietary_tags.split(",")[0]}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Chunky Retro Action Footer */}
      <div className="pt-4 mt-4 border-t-2 border-black/15 flex items-center justify-between">
        <div className="text-[11px] font-mono font-black text-stone-600 bg-[#FFE15D]/40 px-2.5 py-0.5 rounded border border-black/20">
          PACK OPTION
        </div>

        <button
          onClick={handleAddToCart}
          className={`px-5 py-2.5 font-retro-bold font-black text-xs uppercase tracking-wider rounded-2xl border-2 border-black shadow-[3px_3px_0px_#000] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[5px_5px_0px_#000] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[1px_1px_0px_#000] transition-all flex items-center gap-1.5 ${
            justAdded
              ? "bg-[#48BB78] text-white"
              : "bg-[#FF2A55] hover:bg-[#E60033] text-white"
          }`}
        >
          {justAdded ? (
            <>
              <Check className="w-4 h-4 stroke-[3]" />
              <span>GRABBED! 🥨</span>
            </>
          ) : (
            <>
              <Plus className="w-4 h-4 stroke-[3]" />
              <span>SNACK DROP • PACK</span>
            </>
          )}
        </button>
      </div>
    </motion.div>
  );
}
