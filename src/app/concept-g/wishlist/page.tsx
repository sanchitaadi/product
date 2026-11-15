"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Star, Ticket, Heart, ArrowRight } from "lucide-react";
import ConceptGHeader from "@/components/concept-g/Header";
import ConceptGFooter from "@/components/concept-g/Footer";
import ConceptGFoodCard from "@/components/concept-g/FoodCard";
import CinematicLightbox, { LightboxItem } from "@/components/shared/CinematicLightbox";
import { useWishlist } from "@/context/WishlistContext";
import * as api from "@/lib/api";

export default function ConceptGWishlistPage() {
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
    <div className="bg-[#FFFDD0] min-h-screen text-[#5C0614] flex flex-col font-sans selection:bg-[#FFD54F] selection:text-[#5C0614]">
      <ConceptGHeader />

      {/* Header Banner */}
      <section className="bg-[#FFFDF5] py-16 border-b-6 border-[#C41E3A] text-center space-y-4 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#FFD54F] text-[#5C0614] font-black text-xs uppercase tracking-widest rounded-full border-2 border-[#5C0614] shadow-[3px_3px_0px_#C41E3A]">
            <Heart className="w-3.5 h-3.5 fill-[#C41E3A] text-[#C41E3A]" />
            SAVED ATTRACTIONS &bull; SPECTATOR FAVORITES
          </div>
          <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-[#5C0614] font-serif">
            Carnival Favorites ({items.length})
          </h1>
          <p className="text-xs sm:text-sm text-[#5C0614]/80 font-medium max-w-lg mx-auto">
            Your personal collection of saved carnival dishes and treats bookmarked for upcoming visits to the Big Top.
          </p>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-16 flex-1 w-full">
        {loading ? (
          <div className="py-24 text-center font-black text-sm text-[#C41E3A] tracking-widest">
            COLLECTING SAVED FAIRGROUND TICKETS...
          </div>
        ) : items.length === 0 ? (
          <div className="py-20 text-center max-w-md mx-auto space-y-6 bg-white border-4 border-[#C41E3A] rounded-3xl p-10 shadow-[10px_10px_0px_#5C0614]">
            <span className="text-5xl">🎟️</span>
            <h2 className="text-2xl font-black uppercase text-[#5C0614] font-serif">No Attractions Bookmarked</h2>
            <p className="text-xs text-[#5C0614]/80 font-medium leading-relaxed">
              Tap the golden heart on any dish across our Big Top carte to save it for your next visit!
            </p>
            <Link
              href="/concept-g/menu/"
              className="inline-block bg-[#C41E3A] hover:bg-[#a3162c] text-white text-xs font-black uppercase tracking-widest px-8 py-3.5 rounded-full border-2 border-[#FFD54F] shadow-[4px_4px_0px_#5C0614] transition-transform active:scale-95"
            >
              Browse Carte Attractions &rarr;
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {items.map((dish) => (
              <ConceptGFoodCard
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

      <ConceptGFooter />
    </div>
  );
}
