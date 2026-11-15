"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Trash2, Plus, Minus, ArrowRight, Tag, ShoppingBag, ArrowLeft, Zap } from "lucide-react";
import ConceptBHeader from "@/components/concept-b/Header";
import ConceptBFooter from "@/components/concept-b/Footer";
import RetroSoundProvider, { useRetroSound } from "@/components/concept-b/RetroSoundFX";
import RetroCustomCursor from "@/components/concept-b/RetroCustomCursor";
import RetroScrollProgress from "@/components/concept-b/RetroScrollProgress";
import { useCart } from "@/context/CartContext";
import * as api from "@/lib/api";

function ConceptBCartContent() {
  const { cart, updateQty, removeItem, clearCart, applyCoupon, removeCoupon } = useCart();
  const [couponInput, setCouponInput] = useState("");
  const [couponLoading, setCouponLoading] = useState(false);
  const { playCoin, playPop, playClick } = useRetroSound();

  const handleApplyCoupon = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    setCouponLoading(true);
    await applyCoupon(couponInput.trim());
    playCoin();
    setCouponLoading(false);
  };

  const amountForFreeDelivery = Math.max(0, cart.free_delivery_threshold - cart.subtotal);
  const freeDeliveryProgress = Math.min(100, (cart.subtotal / cart.free_delivery_threshold) * 100);

  return (
    <div className="bg-[#FFF9EC] min-h-screen text-black flex flex-col font-sans selection:bg-[#FFE15D] selection:text-black relative overflow-x-clip">
      {/* Top Retro Scroll Progress */}
      <RetroScrollProgress />

      {/* Desktop Custom Cursor */}
      <RetroCustomCursor />

      {/* Header */}
      <ConceptBHeader />

      <section className="py-10 bg-[#FFE15D] border-b-4 border-black relative overflow-hidden">
        <div className="absolute inset-0 pattern-comic-halftone opacity-20 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
          <div>
            <span className="text-[10px] font-retro-bold font-black uppercase tracking-wider text-black block mb-1">
              ⚡ REVIEW YOUR STACK
            </span>
            <h1 className="font-retro-bold font-black text-3xl sm:text-5xl uppercase tracking-tight">
              YOUR FEAST BAG ({cart.total_count})
            </h1>
          </div>
          <Link
            href="/concept-b/menu/"
            onClick={playPop}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-white border-2 border-black font-retro-bold font-black text-xs uppercase shadow-[3px_3px_0px_#000] hover:translate-x-[-1px] hover:translate-y-[-1px] transition shrink-0"
          >
            <ArrowLeft className="w-4 h-4 stroke-[3]" />
            <span>ADD MORE DROPS 🍕</span>
          </Link>
        </div>
      </section>

      <section className="py-12 md:py-16 flex-1">
        <div className="max-w-7xl mx-auto px-6">
          {cart.items.length === 0 ? (
            <div className="py-24 text-center max-w-md mx-auto space-y-4 bg-white p-8 rounded-3xl border-4 border-black shadow-[8px_8px_0px_#000]">
              <span className="text-5xl">⚡</span>
              <h2 className="font-retro-bold font-black text-3xl uppercase">YOUR BAG IS EMPTY!</h2>
              <p className="text-xs font-bold text-stone-600">
                You haven&apos;t added any pizzas, shakes or appetizers yet.
              </p>
              <Link
                href="/concept-b/menu/"
                onClick={playCoin}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-[#FF2A55] text-white font-retro-bold font-black text-xs uppercase border-2 border-black shadow-[3px_3px_0px_#000]"
              >
                <span>EXPLORE MENU NOW 🍕</span>
                <ArrowRight className="w-4 h-4 stroke-[3]" />
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
              {/* Items List */}
              <div className="lg:col-span-8 space-y-6">
                {/* Free Delivery Meter */}
                <div className="p-4 rounded-2xl bg-[#FFE15D] border-4 border-black shadow-[4px_4px_0px_#000] space-y-2">
                  <div className="flex items-center justify-between text-xs font-retro-bold font-black uppercase">
                    <span>
                      {amountForFreeDelivery <= 0 ? (
                        <span className="text-[#48BB78] flex items-center gap-1">
                          🎉 YOU UNLOCKED FREE DELIVERY!
                        </span>
                      ) : (
                        <span>
                          ADD {api.formatPrice(amountForFreeDelivery)} MORE FOR FREE DELIVERY
                        </span>
                      )}
                    </span>
                    <span className="font-mono">{freeDeliveryProgress.toFixed(0)}%</span>
                  </div>
                  <div className="w-full bg-white border-2 border-black rounded-lg h-3 overflow-hidden p-0.5">
                    <div
                      className="bg-[#FF2A55] h-full rounded"
                      style={{ width: `${freeDeliveryProgress}%` }}
                    />
                  </div>
                </div>

                {cart.items.map((item) => (
                  <div
                    key={item.cart_key}
                    className="p-5 rounded-3xl bg-white border-4 border-black shadow-[6px_6px_0px_#000] flex flex-col sm:flex-row gap-5 items-start sm:items-center justify-between"
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src={api.resolveImageUrl(item.image_url)}
                        alt={item.name}
                        className="w-20 h-20 rounded-2xl object-cover shrink-0 border-2 border-black bg-stone-100"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = "/images/fallback-food.svg";
                        }}
                      />
                      <div>
                        <span className="text-[10px] font-retro-bold font-black uppercase text-[#FF2A55] tracking-wider block">
                          {item.category}
                        </span>
                        <h3 className="font-retro-bold font-black text-xl text-black">
                          {item.name}
                        </h3>
                        {item.customization_options && item.customization_options.length > 0 && (
                          <p className="text-xs font-semibold text-stone-600 mt-0.5">
                            {item.customization_options.map((o) => o.name).join(", ")}
                          </p>
                        )}
                        {item.special_instructions && (
                          <p className="text-xs text-amber-900 font-bold italic mt-0.5">
                            Note: {item.special_instructions}
                          </p>
                        )}
                        <span className="text-xs font-bold text-stone-700 block mt-1">
                          {api.formatPrice(item.item_price)} each
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-6 w-full sm:w-auto justify-between sm:justify-end border-t-2 sm:border-t-0 pt-3 sm:pt-0 border-black/10">
                      {/* Stepper */}
                      <div className="flex items-center gap-2 bg-[#FFE15D] p-1 rounded-xl border-2 border-black">
                        <button
                          onClick={() => {
                            playPop();
                            updateQty(item.cart_key, item.quantity - 1);
                          }}
                          className="w-8 h-8 rounded-lg bg-white border-2 border-black flex items-center justify-center font-black hover:bg-stone-100"
                          aria-label="Decrease"
                        >
                          <Minus className="w-3.5 h-3.5 stroke-[3]" />
                        </button>
                        <span className="w-7 text-center font-retro-bold font-black text-sm">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => {
                            playPop();
                            updateQty(item.cart_key, item.quantity + 1);
                          }}
                          className="w-8 h-8 rounded-lg bg-white border-2 border-black flex items-center justify-center font-black hover:bg-stone-100"
                          aria-label="Increase"
                        >
                          <Plus className="w-3.5 h-3.5 stroke-[3]" />
                        </button>
                      </div>

                      <div className="text-right">
                        <span className="font-retro-bold font-black text-base text-black block">
                          {api.formatPrice(item.line_total)}
                        </span>
                        <button
                          onClick={() => {
                            playClick();
                            removeItem(item.cart_key);
                          }}
                          className="text-[11px] font-retro-bold font-black text-[#FF2A55] hover:underline"
                        >
                          REMOVE
                        </button>
                      </div>
                    </div>
                  </div>
                ))}

                <div className="flex justify-end">
                  <button
                    onClick={() => {
                      playClick();
                      clearCart();
                    }}
                    className="text-xs font-retro-bold font-black text-stone-600 hover:text-black underline uppercase"
                  >
                    Clear Entire Bag
                  </button>
                </div>
              </div>

              {/* Order Summary Side */}
              <div className="lg:col-span-4 space-y-6">
                <div className="p-6 sm:p-8 rounded-3xl bg-white border-4 border-black shadow-[8px_8px_0px_#000] space-y-5">
                  <h3 className="font-retro-bold font-black text-2xl uppercase border-b-2 border-black pb-3">
                    CHECKOUT STACK
                  </h3>

                  {/* Coupon Box */}
                  <form onSubmit={handleApplyCoupon} className="space-y-2">
                    <label className="block text-[11px] font-retro-bold font-black uppercase">
                      PROMO CODE
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={couponInput}
                        onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                        placeholder="e.g. PEACHY20"
                        className="flex-1 bg-[#FFF9EC] border-2 border-black rounded-xl px-3 py-2 text-xs font-retro-bold font-black uppercase focus:outline-none"
                      />
                      <button
                        type="submit"
                        disabled={couponLoading}
                        className="px-4 py-2 bg-[#FFE15D] text-black font-retro-bold font-black text-xs uppercase rounded-xl border-2 border-black shadow-[2px_2px_0px_#000]"
                      >
                        {couponLoading ? "..." : "APPLY"}
                      </button>
                    </div>
                  </form>

                  {cart.coupon_code && (
                    <div className="p-3 bg-emerald-50 border-2 border-emerald-500 rounded-xl flex items-center justify-between text-xs font-bold text-emerald-800">
                      <span>✓ {cart.coupon_code} (-₹{cart.discount_amount})</span>
                      <button
                        onClick={removeCoupon}
                        className="text-rose-600 hover:underline font-black"
                      >
                        Remove
                      </button>
                    </div>
                  )}

                  {/* Totals Breakdown */}
                  <div className="space-y-2.5 text-xs font-bold border-t-2 border-black/10 pt-4">
                    <div className="flex justify-between">
                      <span className="text-stone-600 font-semibold">Subtotal</span>
                      <span className="font-bold">{api.formatPrice(cart.subtotal)}</span>
                    </div>

                    {cart.discount_amount > 0 && (
                      <div className="flex justify-between text-emerald-700">
                        <span>Discount Savings</span>
                        <span>-{api.formatPrice(cart.discount_amount)}</span>
                      </div>
                    )}

                    <div className="flex justify-between">
                      <span className="text-stone-600 font-semibold">Delivery Charge</span>
                      <span>
                        {cart.delivery_fee === 0 ? (
                          <span className="text-[#48BB78] font-bold">FREE</span>
                        ) : (
                          api.formatPrice(cart.delivery_fee)
                        )}
                      </span>
                    </div>

                    <div className="flex justify-between text-base font-retro-bold font-black border-t-2 border-black pt-3">
                      <span>FINAL TOTAL</span>
                      <span className="text-[#FF2A55]">{api.formatPrice(cart.total)}</span>
                    </div>
                  </div>

                  <Link
                    href="/concept-b/checkout/"
                    onClick={playCoin}
                    className="w-full py-4 bg-[#FF2A55] hover:bg-[#E60033] text-white font-retro-bold font-black text-xs uppercase tracking-wider rounded-2xl border-[3px] border-black shadow-[4px_4px_0px_#000] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[6px_6px_0px_#000] transition flex items-center justify-center gap-2"
                  >
                    <span>CONTINUE TO CHECKOUT ★</span>
                    <ArrowRight className="w-4 h-4 stroke-[3]" />
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      <ConceptBFooter />
    </div>
  );
}

export default function ConceptBCartPage() {
  return (
    <RetroSoundProvider>
      <ConceptBCartContent />
    </RetroSoundProvider>
  );
}
