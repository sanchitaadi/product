"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Zap, ArrowRight } from "lucide-react";
import ConceptBHeader from "@/components/concept-b/Header";
import ConceptBFooter from "@/components/concept-b/Footer";
import ConceptBFoodCard from "@/components/concept-b/FoodCard";
import { useWishlist } from "@/context/WishlistContext";
import * as api from "@/lib/api";

export default function ConceptBWishlistPage() {
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
    <div className="bg-[#FFF9EC] min-h-screen text-black flex flex-col font-sans">
      <ConceptBHeader />

      <section className="py-8 bg-[#FFE15D] border-b-4 border-black">
        <div className="max-w-7xl mx-auto px-6">
          <span className="text-[10px] font-black uppercase tracking-wider text-black block mb-1">
            ⚡ SAVED DROPS
          </span>
          <h1 className="font-retro-bold font-black text-3xl sm:text-5xl uppercase tracking-tight">
            SAVED CRAVINGS ({items.length})
          </h1>
        </div>
      </section>

      <section className="py-12 flex-1">
        <div className="max-w-7xl mx-auto px-6">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((n) => (
                <div key={n} className="h-80 bg-white rounded-2xl border-2 border-black animate-pulse" />
              ))}
            </div>
          ) : items.length === 0 ? (
            <div className="py-24 text-center max-w-md mx-auto space-y-4">
              <span className="text-5xl">⚡</span>
              <h2 className="font-retro-bold font-black text-3xl">NO SAVED DROPS YET</h2>
              <p className="text-xs font-semibold text-gray-700">
                Hit the heart button on any food card to bookmark it for later!
              </p>
              <Link
                href="/concept-b/menu/"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-[#FF2A55] text-white border-2 border-black font-black text-xs uppercase tracking-wider shadow-[4px_4px_0px_#000]"
              >
                <span>EXPLORE DROPS</span>
                <ArrowRight className="w-4 h-4 stroke-[3]" />
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {items.map((item) => (
                <ConceptBFoodCard key={item.id} item={item} />
              ))}
            </div>
          )}
        </div>
      </section>

      <ConceptBFooter />
    </div>
  );
}
