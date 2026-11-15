"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Heart, ArrowRight, ShoppingBag } from "lucide-react";
import ConceptAHeader from "@/components/concept-a/Header";
import ConceptAFooter from "@/components/concept-a/Footer";
import ConceptAFoodCard from "@/components/concept-a/FoodCard";
import { useWishlist } from "@/context/WishlistContext";
import * as api from "@/lib/api";

export default function ConceptAWishlistPage() {
  const { wishlistIds } = useWishlist();
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

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
    <div className="bg-[#FFF8F9] min-h-screen text-[#3D2D2E] flex flex-col">
      <ConceptAHeader />

      <section className="pt-10 pb-6 border-b border-rose-100 bg-[#FFF0F3]/40">
        <div className="max-w-7xl mx-auto px-6">
          <span className="text-xs font-bold text-[#E07A86] uppercase tracking-wider block mb-1">
            🎀 Saved Cravings &bull; Wishlist
          </span>
          <h1 className="font-coquette-serif font-black text-3xl sm:text-4xl text-[#3D2D2E]">
            Your Saved Feasts ({items.length})
          </h1>
        </div>
      </section>

      <section className="py-12 flex-1">
        <div className="max-w-7xl mx-auto px-6">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((n) => (
                <div key={n} className="h-80 bg-white rounded-3xl animate-pulse border border-rose-100" />
              ))}
            </div>
          ) : items.length === 0 ? (
            <div className="py-24 text-center max-w-md mx-auto space-y-4">
              <span className="text-5xl">💖</span>
              <h2 className="font-coquette-serif font-bold text-2xl text-gray-800">
                No saved dishes yet
              </h2>
              <p className="text-xs text-gray-500 leading-relaxed">
                Click the heart icon on any pizza, pasta or shake to pin it to your secret wishlist.
              </p>
              <Link
                href="/concept-a/menu/"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#E07A86] to-[#F59E0B] text-white text-xs font-bold uppercase tracking-wider shadow-md hover:opacity-95 transition"
              >
                <span>Browse Menu</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {items.map((item) => (
                <ConceptAFoodCard key={item.id} item={item} />
              ))}
            </div>
          )}
        </div>
      </section>

      <ConceptAFooter />
    </div>
  );
}
