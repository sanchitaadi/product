"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Heart, ArrowRight, Package } from "lucide-react";
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
    <div className="bg-[#0A0B0E] min-h-screen text-[#F7F5F0] flex flex-col selection:bg-[#C5A059] selection:text-[#0A0B0E]">
      <ConceptAHeader />

      <section className="pt-16 pb-10 border-b border-[#C5A059]/20 bg-[#0E1015]">
        <div className="max-w-7xl mx-auto px-6">
          <span className="text-xs font-mono font-bold text-[#C5A059] uppercase tracking-widest block mb-1">
            ✦ Client Private Vault &bull; Saved Provisions
          </span>
          <h1 className="font-serif font-black text-3xl sm:text-4xl text-[#F7F5F0]">
            Saved Reserve Provisions ({items.length})
          </h1>
        </div>
      </section>

      <section className="py-16 flex-1">
        <div className="max-w-7xl mx-auto px-6">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((n) => (
                <div key={n} className="h-80 bg-[#13151A] rounded-2xl animate-pulse border border-[#C5A059]/30" />
              ))}
            </div>
          ) : items.length === 0 ? (
            <div className="py-24 text-center max-w-md mx-auto space-y-4">
              <span className="text-4xl text-[#C5A059]">✦</span>
              <h2 className="font-serif font-bold text-2xl text-[#F7F5F0]">
                No Saved Provisions Yet
              </h2>
              <p className="text-xs text-[#A89F91] leading-relaxed font-light">
                Click the heart on any single-estate dark cacao block, honeycomb jar, or sablés tin to save to your personal client vault.
              </p>
              <Link
                href="/concept-a/menu/"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#C5A059] via-[#D4AF37] to-[#B38F46] text-[#0A0B0E] text-xs font-bold uppercase tracking-widest shadow-xl shadow-[#C5A059]/20 hover:brightness-110 transition"
              >
                <span>Browse Reserve Provisions</span>
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
