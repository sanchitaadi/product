"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Trash2, Plus, Minus, ArrowRight, ArrowLeft, Zap, ShoppingBag } from "lucide-react";
import ConceptFHeader from "@/components/concept-f/Header";
import ConceptFFooter from "@/components/concept-f/Footer";
import { useCart } from "@/context/CartContext";
import * as api from "@/lib/api";

export default function ConceptFCartPage() {
  const { cart, updateQty, removeItem, clearCart, applyCoupon, removeCoupon } = useCart();
  const [couponInput, setCouponInput] = useState("");
  const [couponLoading, setCouponLoading] = useState(false);

  const handleApplyCoupon = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    setCouponLoading(true);
    await applyCoupon(couponInput.trim());
    setCouponLoading(false);
  };

  return (
    <div className="bg-[#FFFDF7] min-h-screen text-black flex flex-col font-sans selection:bg-[#FFE600] selection:text-black">
      <ConceptFHeader />

      {/* Manga Header Banner */}
      <section className="bg-white py-16 border-b-4 border-black text-center space-y-4 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#FFE600] text-black font-black text-xs uppercase tracking-widest border-2 border-black shadow-[3px_3px_0px_#000] -rotate-1">
            <ShoppingBag className="w-3.5 h-3.5 text-[#D7263D]" />
            COMIC PROVISIONS &bull; MANIFEST SUMMARY
          </div>
          <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-black">
            Your Manga Basket ({cart.total_count})
          </h1>
          <p className="text-xs sm:text-sm text-gray-700 font-bold max-w-lg mx-auto">
            Review your selected comic feast items before dispatching to our stone hearth kitchen.
          </p>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-16 flex-1 w-full">
        {cart.items.length === 0 ? (
          <div className="py-20 text-center max-w-md mx-auto space-y-6 bg-white border-4 border-black p-10 shadow-[10px_10px_0px_#000]">
            <span className="text-5xl">🍜</span>
            <h2 className="text-2xl font-black uppercase text-black">Comic Basket Empty</h2>
            <p className="text-xs text-gray-700 font-bold leading-relaxed">
              You haven&apos;t added any manga dishes to your order yet. Step into Chapter 01 to begin!
            </p>
            <Link
              href="/concept-f/menu/"
              className="inline-block bg-[#D7263D] hover:bg-[#b51f33] text-white text-xs font-black uppercase tracking-widest px-8 py-3.5 border-3 border-black shadow-[4px_4px_0px_#FFE600] transition-transform active:translate-x-1 active:translate-y-1"
            >
              Browse Comic Menu &rarr;
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Items Column */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b-3 border-black font-mono text-xs font-black">
                <span className="text-black">
                  {cart.total_count} DISH{cart.total_count === 1 ? "" : "ES"} IN COMIC BASKET
                </span>
                <button
                  onClick={clearCart}
                  className="text-[#D7263D] hover:underline uppercase"
                >
                  Clear All
                </button>
              </div>

              <div className="space-y-4">
                {cart.items.map((item) => (
                  <div
                    key={item.cart_key}
                    className="p-5 bg-white border-3 border-black flex flex-col sm:flex-row items-center justify-between gap-4 shadow-[4px_4px_0px_#000] hover:shadow-[6px_6px_0px_#D7263D] transition-all"
                  >
                    <div className="flex items-center gap-4 w-full sm:w-auto">
                      {item.image_url && (
                        <img
                          src={api.resolveImageUrl(item.image_url)}
                          alt={item.name}
                          className="w-16 h-16 object-cover border-2 border-black shrink-0"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = "/images/fallback-food.svg";
                          }}
                        />
                      )}
                      <div>
                        <span className="px-2 py-0.5 bg-[#FFE600] text-black font-black text-[9px] border border-black uppercase inline-block mb-1">
                          {item.category || "CARTE"}
                        </span>
                        <h3 className="text-base font-black uppercase text-black leading-tight">
                          {item.name}
                        </h3>
                        <p className="text-xs font-mono text-gray-500 font-bold">
                          Unit: {api.formatPrice(item.item_price)}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between w-full sm:w-auto gap-6">
                      {/* Qty */}
                      <div className="flex items-center border-2 border-black bg-[#FFFDF7]">
                        <button
                          onClick={() => updateQty(item.cart_key, item.quantity - 1)}
                          className="p-2 text-black hover:bg-[#FFE600] transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3.5 h-3.5 stroke-[3]" />
                        </button>
                        <span className="px-3 text-xs font-black text-black">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQty(item.cart_key, item.quantity + 1)}
                          className="p-2 text-black hover:bg-[#FFE600] transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3.5 h-3.5 stroke-[3]" />
                        </button>
                      </div>

                      <span className="font-black text-sm text-black min-w-[70px] text-right font-mono">
                        {api.formatPrice(item.line_total)}
                      </span>

                      <button
                        onClick={() => removeItem(item.cart_key)}
                        className="text-gray-400 hover:text-[#D7263D] transition-colors"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-4">
                <Link
                  href="/concept-f/menu/"
                  className="inline-flex items-center gap-2 text-xs font-black text-black hover:text-[#D7263D] uppercase"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Add More Items from Manga Carte
                </Link>
              </div>
            </div>

            {/* Summary Box */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-white border-4 border-black p-6 sm:p-8 space-y-6 shadow-[8px_8px_0px_#000]">
                <div className="flex items-center justify-between border-b-2 border-black pb-4">
                  <div className="flex items-center gap-2">
                    <Zap className="w-5 h-5 text-[#D7263D]" />
                    <h3 className="text-lg font-black uppercase text-black">
                      Comic Order Total
                    </h3>
                  </div>
                  <span className="px-2 py-0.5 bg-[#FFE600] text-black font-mono text-[10px] font-black uppercase border border-black">
                    VOL. 07
                  </span>
                </div>

                <div className="space-y-3 font-mono text-xs font-bold">
                  <div className="flex justify-between text-gray-700">
                    <span>SUBTOTAL:</span>
                    <span className="text-black font-black">{api.formatPrice(cart.subtotal)}</span>
                  </div>

                  {cart.discount_amount > 0 && (
                    <div className="flex justify-between text-[#22C55E]">
                      <span>DISCOUNT VOUCHER:</span>
                      <span className="font-black">-{api.formatPrice(cart.discount_amount)}</span>
                    </div>
                  )}

                  <div className="flex justify-between text-gray-700">
                    <span>EXPRESS COURIER:</span>
                    <span className="text-black font-black">
                      {cart.subtotal >= cart.free_delivery_threshold || cart.delivery_fee === 0
                        ? "FREE (COMPLIMENTARY)"
                        : api.formatPrice(cart.delivery_fee)}
                    </span>
                  </div>

                  <div className="border-t-3 border-black pt-3 flex justify-between items-baseline">
                    <span className="text-sm font-black uppercase text-black">TOTAL CHARGE:</span>
                    <span className="text-2xl font-black text-[#D7263D]">{api.formatPrice(cart.total)}</span>
                  </div>
                </div>

                {/* Coupon Input */}
                <form onSubmit={handleApplyCoupon} className="space-y-2 pt-2">
                  <label className="block text-[11px] font-black text-black uppercase">
                    Shonen Voucher Code:
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="e.g. MANGA10 or SHONEN"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                      className="flex-1 bg-[#FFFDF7] border-2 border-black p-2.5 text-xs font-bold text-black outline-none focus:border-[#D7263D]"
                    />
                    <button
                      type="submit"
                      disabled={couponLoading}
                      className="px-4 py-2.5 bg-[#FFE600] text-black font-black text-xs uppercase border-2 border-black hover:bg-black hover:text-white transition-colors"
                    >
                      {couponLoading ? "..." : "APPLY"}
                    </button>
                  </div>
                  {cart.coupon_code && (
                    <div className="flex items-center justify-between text-xs font-bold text-[#22C55E] pt-1">
                      <span>Voucher: {cart.coupon_code} (-{api.formatPrice(cart.discount_amount)})</span>
                      <button
                        type="button"
                        onClick={removeCoupon}
                        className="text-[#D7263D] underline text-[10px]"
                      >
                        Remove
                      </button>
                    </div>
                  )}
                </form>

                {/* Checkout CTA */}
                <Link
                  href="/concept-f/checkout/"
                  className="w-full block text-center bg-[#D7263D] hover:bg-[#b51f33] text-white text-xs font-black uppercase tracking-widest py-4 border-3 border-black shadow-[4px_4px_0px_#FFE600] transition-all hover:translate-x-0.5 hover:translate-y-0.5"
                >
                  PROCEED TO COMIC CHECKOUT &rarr;
                </Link>
              </div>
            </div>
          </div>
        )}
      </main>

      <ConceptFFooter />
    </div>
  );
}
