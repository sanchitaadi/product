"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Trash2, Plus, Minus, ArrowRight, Tag, ArrowLeft, Leaf } from "lucide-react";
import ConceptDHeader from "@/components/concept-d/Header";
import ConceptDFooter from "@/components/concept-d/Footer";
import { useCart } from "@/context/CartContext";
import * as api from "@/lib/api";

export default function ConceptDCartPage() {
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
    <div className="bg-[#FDFBF7] min-h-screen text-[#1E3F20] flex flex-col font-serif selection:bg-[#7B8E78] selection:text-white">
      <ConceptDHeader />

      {/* Cart Banner */}
      <section className="bg-[#F2EFE9] py-16 border-b border-[#5E6B4E]/20 text-center space-y-3">
        <span className="text-[11px] uppercase tracking-widest text-[#7B8E78] block">
          Table Selections
        </span>
        <h1 className="text-4xl sm:text-6xl font-normal text-[#1E3F20] tracking-tight">
          Your Harvest Basket ({cart.total_count})
        </h1>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-16 flex-1 w-full">
        {cart.items.length === 0 ? (
          <div className="py-20 text-center max-w-md mx-auto space-y-6 bg-[#F2EFE9] rounded-3xl p-10 border border-[#5E6B4E]/20">
            <span className="text-5xl">🌾</span>
            <h2 className="text-2xl font-normal">Your Basket is Currently Empty</h2>
            <p className="text-xs text-[#5E6B4E] leading-relaxed">
              Explore our seasonal carte of ancient sourdough pizzas, garden appetizers, and botanical drinks.
            </p>
            <Link
              href="/concept-d/menu/"
              className="inline-block bg-[#5E6B4E] hover:bg-[#4E5B3F] text-[#FDFBF7] text-xs font-sans uppercase tracking-widest px-8 py-3.5 rounded-full transition-colors"
            >
              Browse Seasonal Carte &rarr;
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Items Column */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-[#5E6B4E]/20">
                <span className="text-xs text-[#7B8E78]">
                  {cart.total_count} artisanal dish{cart.total_count === 1 ? "" : "es"} in basket
                </span>
                <button
                  onClick={clearCart}
                  className="text-xs text-[#C86D51] hover:underline"
                >
                  Empty Entire Basket
                </button>
              </div>

              {cart.items.map((item) => (
                <div
                  key={item.cart_key}
                  className="bg-white rounded-2xl border border-[#5E6B4E]/20 p-4 sm:p-5 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between shadow-xs"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={api.resolveImageUrl(item.image_url)}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-xl border border-[#5E6B4E]/20 shrink-0"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "/images/fallback-food.svg";
                      }}
                    />
                    <div>
                      <h3 className="font-medium text-base text-[#1E3F20]">
                        {item.name}
                      </h3>
                      <span className="text-[10px] text-[#7B8E78] uppercase tracking-wider">
                        {item.category}
                      </span>
                      <p className="text-sm font-medium text-[#C86D51] mt-1">
                        {api.formatPrice(item.line_total)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
                    {/* Qty */}
                    <div className="flex items-center border border-[#5E6B4E]/30 rounded-full bg-[#FDFBF7] px-2 py-0.5">
                      <button
                        onClick={() => updateQty(item.cart_key, item.quantity - 1)}
                        className="p-1 text-[#5E6B4E] hover:text-[#1E3F20]"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-2.5 text-xs font-sans font-medium">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQty(item.cart_key, item.quantity + 1)}
                        className="p-1 text-[#5E6B4E] hover:text-[#1E3F20]"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <button
                      onClick={() => removeItem(item.cart_key)}
                      className="p-1.5 text-[#5E6B4E] hover:text-[#C86D51] transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div className="lg:col-span-5">
              <div className="bg-[#F2EFE9] rounded-3xl border border-[#5E6B4E]/20 p-6 sm:p-8 space-y-6">
                <h2 className="text-xl font-normal pb-3 border-b border-[#5E6B4E]/20">
                  Harvest Basket Summary
                </h2>

                {/* Coupon */}
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <input
                    type="text"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    placeholder="Coupon code"
                    className="flex-1 bg-white border border-[#5E6B4E]/30 rounded-full px-4 py-2 text-xs focus:border-[#5E6B4E] outline-none"
                  />
                  <button
                    type="submit"
                    disabled={couponLoading}
                    className="bg-[#5E6B4E] hover:bg-[#4E5B3F] text-white px-5 py-2 text-xs rounded-full font-sans uppercase tracking-wider"
                  >
                    Apply
                  </button>
                </form>

                {cart.coupon_code && (
                  <div className="bg-white rounded-xl p-2.5 flex items-center justify-between text-xs border border-[#5E6B4E]/20">
                    <span className="text-[#5E6B4E]">
                      Code: {cart.coupon_code} (-{api.formatPrice(cart.discount_amount)})
                    </span>
                    <button
                      onClick={removeCoupon}
                      className="text-[#C86D51] hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                )}

                <div className="space-y-2.5 text-xs border-b border-[#5E6B4E]/20 pb-4">
                  <div className="flex justify-between text-[#5E6B4E]">
                    <span>Subtotal</span>
                    <span>{api.formatPrice(cart.subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-[#5E6B4E]">
                    <span>Artisanal Courier Fee</span>
                    <span>
                      {cart.subtotal >= cart.free_delivery_threshold
                        ? "Complimentary"
                        : api.formatPrice(cart.delivery_fee)}
                    </span>
                  </div>
                  {cart.discount_amount > 0 && (
                    <div className="flex justify-between text-[#C86D51]">
                      <span>Seasonal Courtesy Discount</span>
                      <span>-{api.formatPrice(cart.discount_amount)}</span>
                    </div>
                  )}
                </div>

                <div className="flex justify-between items-center text-lg font-medium">
                  <span>Total Amount</span>
                  <span className="text-2xl text-[#1E3F20]">{api.formatPrice(cart.total)}</span>
                </div>

                <Link
                  href="/concept-d/checkout/"
                  className="block text-center w-full bg-[#5E6B4E] hover:bg-[#4E5B3F] text-[#FDFBF7] font-sans text-xs uppercase tracking-widest py-4 rounded-full shadow-md transition-all"
                >
                  Proceed to Table Checkout &rarr;
                </Link>
              </div>
            </div>
          </div>
        )}
      </main>

      <ConceptDFooter />
    </div>
  );
}
