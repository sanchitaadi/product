"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Trash2, Plus, Minus, ArrowRight, Tag, ArrowLeft, Train, Ticket } from "lucide-react";
import ConceptEHeader from "@/components/concept-e/Header";
import ConceptEFooter from "@/components/concept-e/Footer";
import { useCart } from "@/context/CartContext";
import * as api from "@/lib/api";

export default function ConceptECartPage() {
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
    <div className="bg-[#08142C] min-h-screen text-[#F8F6F0] flex flex-col font-sans selection:bg-[#FFD100] selection:text-[#08142C]">
      <ConceptEHeader />

      {/* Station Signboard Banner */}
      <section className="bg-[#050D1C] py-16 border-b-4 border-[#FFD100] relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#FFD100] text-[#08142C] font-mono text-xs font-black uppercase tracking-widest rounded">
            <Ticket className="w-3.5 h-3.5 text-[#D71920]" />
            TRANSIT BASKET &bull; MANIFEST SUMMARY
          </div>
          <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-[#F8F6F0]">
            Carriage Provisions ({cart.total_count})
          </h1>
          <p className="text-sm sm:text-base text-[#94A3B8] max-w-xl mx-auto font-mono">
            Review your passenger dining orders before dispatching to Platform 01 hearth ovens.
          </p>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-16 flex-1 w-full">
        {cart.items.length === 0 ? (
          <div className="py-20 text-center max-w-md mx-auto space-y-6 bg-[#0D1F42] rounded-2xl p-10 border-2 border-[#334155] shadow-xl">
            <span className="text-5xl">🚆</span>
            <h2 className="text-2xl font-black uppercase tracking-tight text-white">Carriage Basket Empty</h2>
            <p className="text-xs text-[#94A3B8] font-mono leading-relaxed">
              You have not added any express dishes to your transit order yet. Explore our station menu and board the flavor train!
            </p>
            <Link
              href="/concept-e/menu/"
              className="inline-block bg-[#D71920] hover:bg-[#b01318] text-white text-xs font-mono font-black uppercase tracking-widest px-8 py-3.5 rounded border-2 border-[#FFD100] shadow-[4px_4px_0px_#FFD100] transition-transform active:translate-x-1 active:translate-y-1"
            >
              Browse Station Menu &rarr;
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Items Column */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b-2 border-[#334155] font-mono text-xs">
                <span className="text-[#94A3B8]">
                  {cart.total_count} DISH{cart.total_count === 1 ? "" : "ES"} LOGGED ON MANIFEST
                </span>
                <button
                  onClick={clearCart}
                  className="text-[#D71920] hover:text-white transition-colors uppercase font-bold"
                >
                  Clear Manifest
                </button>
              </div>

              <div className="space-y-4">
                {cart.items.map((item) => (
                  <div
                    key={item.cart_key}
                    className="p-5 bg-[#0D1F42] rounded-xl border-2 border-[#334155] flex flex-col sm:flex-row items-center justify-between gap-4 shadow hover:border-[#FFD100] transition-colors"
                  >
                    <div className="flex items-center gap-4 w-full sm:w-auto">
                      {item.image_url && (
                        <img
                          src={api.resolveImageUrl(item.image_url)}
                          alt={item.name}
                          className="w-16 h-16 rounded-lg object-cover border border-[#FFD100]/40 shrink-0"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = "/images/fallback-food.svg";
                          }}
                        />
                      )}
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="px-2 py-0.5 bg-[#FFD100] text-[#08142C] font-mono text-[9px] font-black rounded uppercase">
                            PLATFORM ITEM
                          </span>
                        </div>
                        <h3 className="text-base font-black uppercase tracking-tight text-white">
                          {item.name}
                        </h3>
                        <p className="text-xs font-mono text-[#94A3B8]">
                          Unit Fare: {api.formatPrice(item.item_price)}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between w-full sm:w-auto gap-6">
                      {/* Quantity Controller */}
                      <div className="flex items-center border-2 border-[#334155] rounded bg-[#08142C]">
                        <button
                          onClick={() => updateQty(item.cart_key, item.quantity - 1)}
                          className="p-2 text-[#94A3B8] hover:text-[#FFD100] transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-3 text-xs font-mono font-black text-white">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQty(item.cart_key, item.quantity + 1)}
                          className="p-2 text-[#94A3B8] hover:text-[#FFD100] transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <span className="font-mono font-black text-sm text-[#FFD100] min-w-[70px] text-right">
                        {api.formatPrice(item.line_total)}
                      </span>

                      <button
                        onClick={() => removeItem(item.cart_key)}
                        className="text-[#94A3B8] hover:text-[#D71920] transition-colors"
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
                  href="/concept-e/menu/"
                  className="inline-flex items-center gap-2 text-xs font-mono text-[#94A3B8] hover:text-[#FFD100] transition-colors uppercase font-bold"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Add More Items from Station Carte
                </Link>
              </div>
            </div>

            {/* Boarding Summary Pass */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-[#050D1C] rounded-2xl border-4 border-[#FFD100] p-6 sm:p-8 space-y-6 shadow-[8px_8px_0px_#D71920]">
                <div className="flex items-center justify-between border-b-2 border-[#334155] pb-4">
                  <div className="flex items-center gap-2">
                    <Train className="w-5 h-5 text-[#FFD100]" />
                    <h3 className="text-lg font-black uppercase tracking-tight text-white">
                      Transit Fare Receipt
                    </h3>
                  </div>
                  <span className="px-2 py-0.5 bg-[#D71920] text-white font-mono text-[10px] font-bold rounded uppercase">
                    PASSENGER COPY
                  </span>
                </div>

                {/* Subtotals */}
                <div className="space-y-3 font-mono text-xs">
                  <div className="flex justify-between text-[#94A3B8]">
                    <span>BASE TICKET FARE:</span>
                    <span className="text-white font-bold">{api.formatPrice(cart.subtotal)}</span>
                  </div>

                  {cart.discount_amount > 0 && (
                    <div className="flex justify-between text-[#4ADE80]">
                      <span>TRANSIT CONCESSION:</span>
                      <span className="font-bold">-{api.formatPrice(cart.discount_amount)}</span>
                    </div>
                  )}

                  <div className="flex justify-between text-[#94A3B8]">
                    <span>EXPRESS COURIER / TRANSIT:</span>
                    <span className="text-white font-bold">
                      {cart.subtotal >= cart.free_delivery_threshold || cart.delivery_fee === 0
                        ? "FREE (COMPLIMENTARY)"
                        : api.formatPrice(cart.delivery_fee)}
                    </span>
                  </div>

                  <div className="border-t-2 border-[#334155] pt-3 flex justify-between items-baseline">
                    <span className="text-sm font-black uppercase text-white">TOTAL BOARDING FARE:</span>
                    <span className="text-2xl font-black text-[#FFD100]">{api.formatPrice(cart.total)}</span>
                  </div>
                </div>

                {/* Coupon Code Input */}
                <form onSubmit={handleApplyCoupon} className="space-y-2 pt-2">
                  <label className="block text-[11px] font-mono font-bold text-[#94A3B8] uppercase">
                    Travel Voucher / Concession Pass:
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="e.g. METRO10 or EXPRESS"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                      className="flex-1 bg-[#08142C] border-2 border-[#334155] focus:border-[#FFD100] rounded p-2.5 text-xs font-mono text-white outline-none"
                    />
                    <button
                      type="submit"
                      disabled={couponLoading}
                      className="px-4 py-2.5 bg-[#FFD100] hover:bg-[#e6bd00] text-[#08142C] font-mono text-xs font-black uppercase rounded transition-colors"
                    >
                      {couponLoading ? "..." : "APPLY"}
                    </button>
                  </div>
                  {cart.coupon_code && (
                    <div className="flex items-center justify-between text-xs font-mono text-[#4ADE80] pt-1">
                      <span>Voucher Applied: {cart.coupon_code} (-{api.formatPrice(cart.discount_amount)})</span>
                      <button
                        type="button"
                        onClick={removeCoupon}
                        className="text-[#D71920] underline text-[10px]"
                      >
                        Remove
                      </button>
                    </div>
                  )}
                </form>

                {/* Checkout CTA */}
                <Link
                  href="/concept-e/checkout/"
                  className="w-full block text-center bg-[#D71920] hover:bg-[#b01318] text-white text-xs font-mono font-black uppercase tracking-widest py-4 rounded border-2 border-[#FFD100] shadow-[4px_4px_0px_#FFD100] transition-all hover:translate-x-0.5 hover:translate-y-0.5"
                >
                  PROCEED TO PLATFORM CHECKOUT &rarr;
                </Link>
              </div>
            </div>
          </div>
        )}
      </main>

      <ConceptEFooter />
    </div>
  );
}
