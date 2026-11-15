"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, Heart, Sparkles } from "lucide-react";
import ConceptCHeader from "@/components/concept-c/Header";
import ConceptCFooter from "@/components/concept-c/Footer";
import ConceptCFoodCard from "@/components/concept-c/FoodCard";
import CinematicLightbox, { LightboxItem } from "@/components/shared/CinematicLightbox";
import { useWishlist } from "@/context/WishlistContext";
import * as api from "@/lib/api";

export default function ConceptCWishlistPage() {
  const { wishlistIds } = useWishlist();
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeLightboxItem, setActiveLightboxItem] = useState<LightboxItem | null>(null);

  useEffect(() => {
    setLoading(true);
    api
      .getWishlist()
      .then((res) => {
        if (res.success && Array.isArray(res.items)) {
          setItems(res.items);
        } else {
          setItems([]);
        }
      })
      .finally(() => setLoading(false));
  }, [wishlistIds]);

  return (
    <div className="bg-[#FFFDF7] min-h-screen text-[#111111] flex flex-col font-sans selection:bg-[#FFE600] selection:text-black">
      <ConceptCHeader />

      {/* Banner */}
      <section className="bg-[#FF007F] text-white py-16 border-b-4 border-black text-center space-y-3 relative">
        <span className="bg-[#FFE600] text-black text-xs font-black uppercase px-3 py-1 border-2 border-black inline-block -rotate-2">
          ★ FAVORITE POP ART DISHES ★
        </span>
        <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tight">
          YOUR SAVED POP COLLECTION ({items.length})
        </h1>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-16 flex-1 w-full">
        {loading ? (
          <div className="py-24 text-center font-black text-2xl text-[#0047FF]">
            FETCHING SAVED CREATIONS...
          </div>
        ) : items.length === 0 ? (
          <div className="py-20 text-center max-w-md mx-auto space-y-6 bg-white border-4 border-black p-10 shadow-[8px_8px_0px_#FFE600]">
            <span className="text-6xl">❤️</span>
            <h2 className="text-3xl font-black uppercase tracking-tight">
              NO SAVED DISHES YET!
            </h2>
            <p className="text-sm font-bold text-gray-700">
              Tap the heart icon on any dish across the menu to pin it to your personal tasting board.
            </p>
            <Link
              href="/concept-c/menu/"
              className="inline-block bg-[#0047FF] hover:bg-[#FF007F] text-white font-black uppercase text-xs px-8 py-3.5 border-2 border-black shadow-[3px_3px_0px_#000] transition-colors"
            >
              BROWSE POP MENU &rarr;
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {items.map((dish) => (
              <ConceptCFoodCard
                key={dish.id}
                item={dish}
                onOpenLightbox={(item) => setActiveLightboxItem(item)}
              />
            ))}
          </div>
        )}
      </main>

      <CinematicLightbox
        item={activeLightboxItem}
        onClose={() => setActiveLightboxItem(null)}
      />

      <ConceptCFooter />
    </div>
  );
}
