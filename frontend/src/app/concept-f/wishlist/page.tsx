"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Zap, Heart, ArrowRight } from "lucide-react";
import ConceptFHeader from "@/components/concept-f/Header";
import ConceptFFooter from "@/components/concept-f/Footer";
import ConceptFFoodCard from "@/components/concept-f/FoodCard";
import CinematicLightbox, { LightboxItem } from "@/components/shared/CinematicLightbox";
import { useWishlist } from "@/context/WishlistContext";
import * as api from "@/lib/api";

export default function ConceptFWishlistPage() {
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
    <div className="bg-[#FFFDF7] min-h-screen text-black flex flex-col font-sans selection:bg-[#FFE600] selection:text-black">
      <ConceptFHeader />

      {/* Manga Header Banner */}
      <section className="bg-white py-16 border-b-4 border-black text-center space-y-4 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#FFE600] text-black font-black text-xs uppercase tracking-widest border-2 border-black shadow-[3px_3px_0px_#000] -rotate-1">
            <Heart className="w-3.5 h-3.5 text-[#D7263D] fill-[#D7263D]" />
            SAVED COMIC PANELS &bull; FAVORITES
          </div>
          <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-black">
            Manga Favorites ({items.length})
          </h1>
          <p className="text-xs sm:text-sm text-gray-700 font-bold max-w-lg mx-auto">
            Your personal collection of bookmarked comic dishes saved for your next studio feast.
          </p>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-16 flex-1 w-full">
        {loading ? (
          <div className="py-24 text-center font-black text-sm text-[#D7263D] tracking-widest">
            GATHERING BOOKMARKED COMIC PANELS...
          </div>
        ) : items.length === 0 ? (
          <div className="py-20 text-center max-w-md mx-auto space-y-6 bg-white border-4 border-black p-10 shadow-[10px_10px_0px_#000]">
            <span className="text-5xl">❤️</span>
            <h2 className="text-2xl font-black uppercase text-black">No Favorites Bookmarked</h2>
            <p className="text-xs text-gray-700 font-bold leading-relaxed">
              Tap the heart button on any dish across our comic carte to save it to your personal chapter!
            </p>
            <Link
              href="/concept-f/menu/"
              className="inline-block bg-[#D7263D] hover:bg-[#b51f33] text-white text-xs font-black uppercase tracking-widest px-8 py-3.5 border-3 border-black shadow-[4px_4px_0px_#FFE600] transition-transform active:translate-x-1 active:translate-y-1"
            >
              Browse Comic Carte &rarr;
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {items.map((dish) => (
              <ConceptFFoodCard
                key={dish.id}
                item={dish}
                onOpenLightbox={(item) => setActiveLightboxItem(item)}
              />
            ))}
          </div>
        )}
      </main>

      {/* Lightbox */}
      <CinematicLightbox
        item={activeLightboxItem}
        onClose={() => setActiveLightboxItem(null)}
      />

      <ConceptFFooter />
    </div>
  );
}
