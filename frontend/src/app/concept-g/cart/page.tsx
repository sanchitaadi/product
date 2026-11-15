"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Trash2, Plus, Minus, ArrowRight, ArrowLeft, Ticket, Star } from "lucide-react";
import ConceptGHeader from "@/components/concept-g/Header";
import ConceptGFooter from "@/components/concept-g/Footer";
import { useCart } from "@/context/CartContext";
import * as api from "@/lib/api";

export default function ConceptGCartPage() {
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
    <div className="bg-[#FFFDD0] min-h-screen text-[#5C0614] flex flex-col font-sans selection:bg-[#FFD54F] selection:text-[#5C0614]">
      <ConceptGHeader />

      {/* Header Banner */}
      <section className="bg-[#FFFDF5] py-16 border-b-6 border-[#C41E3A] text-center space-y-4 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#FFD54F] text-[#5C0614] font-black text-xs uppercase tracking-widest rounded-full border-2 border-[#5C0614] shadow-[3px_3px_0px_#C41E3A]">
            <Ticket className="w-3.5 h-3.5" />
            ADMISSION STUBS &bull; TICKET COLLECTION
          </div>
          <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-[#5C0614] font-serif">
            Your Carnival Basket ({cart.total_count})
          </h1>
          <p className="text-xs sm:text-sm text-[#5C0614]/80 font-medium max-w-lg mx-auto">
            Review your collection of admission tickets and feast orders before heading to the entrance turnstile.
          </p>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-16 flex-1 w-full">
        {cart.items.length === 0 ? (
          <div className="py-20 text-center max-w-md mx-auto space-y-6 bg-white border-4 border-[#C41E3A] rounded-3xl p-10 shadow-[10px_10px_0px_#5C0614]">
            <span className="text-5xl">🎪</span>
            <h2 className="text-2xl font-black uppercase text-[#5C0614] font-serif">Your Ticket Basket is Empty</h2>
            <p className="text-xs text-[#5C0614]/80 font-medium leading-relaxed">
              You haven&apos;t added any carnival attractions or treats yet. Visit the Big Top Carte to begin!
            </p>
            <Link
              href="/concept-g/menu/"
              className="inline-block bg-[#C41E3A] hover:bg-[#a3162c] text-white text-xs font-black uppercase tracking-widest px-8 py-3.5 rounded-full border-2 border-[#FFD54F] shadow-[4px_4px_0px_#5C0614] transition-transform active:scale-95"
            >
              Browse Attractions &rarr;
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Items Column */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b-2 border-[#5C0614]/20 font-mono text-xs font-black">
                <span className="text-[#5C0614]">
                  {cart.total_count} ADMISSION TICKET{cart.total_count === 1 ? "" : "S"} HELD
                </span>
                <button
                  onClick={clearCart}
                  className="text-[#C41E3A] hover:underline uppercase"
                >
                  Clear All Tickets
                </button>
              </div>

              <div className="space-y-4">
                {cart.items.map((item) => (
                  <div
                    key={item.cart_key}
                    className="p-5 bg-white border-4 border-[#C41E3A] rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-4 shadow-[4px_4px_0px_#5C0614] hover:shadow-[6px_6px_0px_#FFD54F] transition-all"
                  >
                    <div className="flex items-center gap-4 w-full sm:w-auto">
                      {item.image_url && (
                        <img
                          src={api.resolveImageUrl(item.image_url)}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded-2xl border-2 border-[#5C0614] shrink-0"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = "/images/fallback-food.svg";
                          }}
                        />
                      )}
                      <div>
                        <span className="px-2.5 py-0.5 bg-[#FFD54F] text-[#5C0614] font-black text-[9px] rounded-full uppercase inline-block mb-1">
                          {item.category || "ATTRACTION"}
                        </span>
                        <h3 className="text-base font-black uppercase text-[#5C0614] font-serif leading-tight">
                          {item.name}
                        </h3>
                        <p className="text-xs font-mono text-[#5C0614]/70 font-bold">
                          Fare: {api.formatPrice(item.item_price)}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between w-full sm:w-auto gap-6">
                      {/* Qty */}
                      <div className="flex items-center border-2 border-[#5C0614] rounded-full bg-[#FFFDD0] px-2 py-0.5">
                        <button
                          onClick={() => updateQty(item.cart_key, item.quantity - 1)}
                          className="p-1.5 text-[#5C0614] hover:text-[#C41E3A] transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3.5 h-3.5 stroke-[3]" />
                        </button>
                        <span className="px-3 text-xs font-black text-[#5C0614] font-mono">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQty(item.cart_key, item.quantity + 1)}
                          className="p-1.5 text-[#5C0614] hover:text-[#C41E3A] transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3.5 h-3.5 stroke-[3]" />
                        </button>
                      </div>

                      <span className="font-black text-sm text-[#5C0614] min-w-[70px] text-right font-mono">
                        {api.formatPrice(item.line_total)}
                      </span>

                      <button
                        onClick={() => removeItem(item.cart_key)}
                        className="text-[#5C0614]/50 hover:text-[#C41E3A] transition-colors"
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
                  href="/concept-g/menu/"
                  className="inline-flex items-center gap-2 text-xs font-black text-[#5C0614] hover:text-[#C41E3A] uppercase"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Add More Attractions from Carte
                </Link>
              </div>
            </div>

            {/* Summary Box */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-white border-4 border-[#C41E3A] rounded-3xl p-6 sm:p-8 space-y-6 shadow-[8px_8px_0px_#5C0614]">
                <div className="flex items-center justify-between border-b-2 border-[#5C0614]/20 pb-4">
                  <div className="flex items-center gap-2">
                    <Ticket className="w-5 h-5 text-[#C41E3A]" />
                    <h3 className="text-lg font-black uppercase text-[#5C0614] font-serif">
                      Admission Receipt
                    </h3>
                  </div>
                  <span className="px-2.5 py-0.5 bg-[#FFD54F] text-[#5C0614] font-mono text-[10px] font-black uppercase rounded-full border border-[#5C0614]">
                    BIG TOP PASS
                  </span>
                </div>

                <div className="space-y-3 font-mono text-xs font-bold">
                  <div className="flex justify-between text-[#5C0614]/80">
                    <span>TICKETS SUBTOTAL:</span>
                    <span className="text-[#5C0614] font-black">{api.formatPrice(cart.subtotal)}</span>
                  </div>

                  {cart.discount_amount > 0 && (
                    <div className="flex justify-between text-[#22C55E]">
                      <span>CARNIVAL CONCESSION:</span>
                      <span className="font-black">-{api.formatPrice(cart.discount_amount)}</span>
                    </div>
                  )}

                  <div className="flex justify-between text-[#5C0614]/80">
                    <span>MIDWAY COURIER:</span>
                    <span className="text-[#5C0614] font-black">
                      {cart.subtotal >= cart.free_delivery_threshold || cart.delivery_fee === 0
                        ? "FREE (COMPLIMENTARY)"
                        : api.formatPrice(cart.delivery_fee)}
                    </span>
                  </div>

                  <div className="border-t-3 border-[#5C0614] pt-3 flex justify-between items-baseline">
                    <span className="text-sm font-black uppercase text-[#5C0614]">TOTAL DUE:</span>
                    <span className="text-2xl font-black text-[#C41E3A]">{api.formatPrice(cart.total)}</span>
                  </div>
                </div>

                {/* Coupon Input */}
                <form onSubmit={handleApplyCoupon} className="space-y-2 pt-2">
                  <label className="block text-[11px] font-black text-[#5C0614] uppercase">
                    Carnival Pass / Voucher:
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="e.g. CIRCUS10 or MIDWAY"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                      className="flex-1 bg-[#FFFDD0] border-2 border-[#5C0614] rounded-full p-2.5 text-xs font-bold text-[#5C0614] outline-none focus:border-[#C41E3A]"
                    />
                    <button
                      type="submit"
                      disabled={couponLoading}
                      className="px-5 py-2.5 bg-[#FFD54F] text-[#5C0614] font-black text-xs uppercase rounded-full border-2 border-[#5C0614] hover:bg-[#5C0614] hover:text-white transition-colors"
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
                        className="text-[#C41E3A] underline text-[10px]"
                      >
                        Remove
                      </button>
                    </div>
                  )}
                </form>

                {/* Checkout CTA */}
                <Link
                  href="/concept-g/checkout/"
                  className="w-full block text-center bg-[#C41E3A] hover:bg-[#a3162c] text-white text-xs font-black uppercase tracking-widest py-4 rounded-full border-2 border-[#FFD54F] shadow-[4px_4px_0px_#5C0614] transition-all hover:scale-[1.01] active:scale-95"
                >
                  PROCEED TO CARNIVAL CHECKOUT &rarr;
                </Link>
              </div>
            </div>
          </div>
        )}
      </main>

      <ConceptGFooter />
    </div>
  );
}
