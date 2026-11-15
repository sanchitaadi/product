"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Train, Heart, Ticket, ArrowRight } from "lucide-react";
import ConceptEHeader from "@/components/concept-e/Header";
import ConceptEFooter from "@/components/concept-e/Footer";
import ConceptEFoodCard from "@/components/concept-e/FoodCard";
import CinematicLightbox, { LightboxItem } from "@/components/shared/CinematicLightbox";
import { useWishlist } from "@/context/WishlistContext";
import * as api from "@/lib/api";

export default function ConceptEWishlistPage() {
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
    <div className="bg-[#08142C] min-h-screen text-[#F8F6F0] flex flex-col font-sans selection:bg-[#FFD100] selection:text-[#08142C]">
      <ConceptEHeader />

      {/* Station Signboard Banner */}
      <section className="bg-[#050D1C] py-16 border-b-4 border-[#FFD100] relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#FFD100] text-[#08142C] font-mono text-xs font-black uppercase tracking-widest rounded">
            <Heart className="w-3.5 h-3.5 text-[#D71920] fill-[#D71920]" />
            SAVED ITINERARY &bull; PASSENGER SELECTIONS
          </div>
          <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-[#F8F6F0]">
            Travel Wishlist ({items.length})
          </h1>
          <p className="text-sm sm:text-base text-[#94A3B8] max-w-xl mx-auto font-mono">
            Dishes saved for your upcoming journeys along the Metro Bites railway route.
          </p>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-16 flex-1 w-full">
        {loading ? (
          <div className="py-24 text-center font-mono text-sm text-[#FFD100] tracking-widest">
            SCANNING PASSENGER ITINERARY ARCHIVES...
          </div>
        ) : items.length === 0 ? (
          <div className="py-20 text-center max-w-md mx-auto space-y-6 bg-[#0D1F42] rounded-2xl p-10 border-2 border-[#334155] shadow-xl">
            <span className="text-5xl">🎟️</span>
            <h2 className="text-2xl font-black uppercase tracking-tight text-white">No Saved Itinerary Dishes</h2>
            <p className="text-xs text-[#94A3B8] font-mono leading-relaxed">
              Tap the ticket bookmark heart on any dish across our station carte to save it for your next train journey.
            </p>
            <Link
              href="/concept-e/menu/"
              className="inline-block bg-[#D71920] hover:bg-[#b01318] text-white text-xs font-mono font-black uppercase tracking-widest px-8 py-3.5 rounded border-2 border-[#FFD100] shadow-[4px_4px_0px_#FFD100] transition-transform active:translate-x-1 active:translate-y-1"
            >
              Explore Station Carte &rarr;
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {items.map((dish) => (
              <ConceptEFoodCard
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

      <ConceptEFooter />
    </div>
  );
}
