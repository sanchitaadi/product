"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Trash2, Plus, Minus, ArrowRight, Tag, ArrowLeft, ShoppingBag } from "lucide-react";
import ConceptCHeader from "@/components/concept-c/Header";
import ConceptCFooter from "@/components/concept-c/Footer";
import { useCart } from "@/context/CartContext";
import * as api from "@/lib/api";

export default function ConceptCCartPage() {
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
    <div className="bg-[#FFFDF7] min-h-screen text-[#111111] flex flex-col font-sans selection:bg-[#FFE600] selection:text-black">
      <ConceptCHeader />

      {/* Cart Banner */}
      <section className="bg-[#FFE600] text-black py-16 border-b-4 border-black text-center space-y-3 relative">
        <span className="bg-[#FF007F] text-white text-xs font-black uppercase px-3 py-1 border-2 border-black inline-block -rotate-2">
          ⚡ POP CRATE CHECKOUT ⚡
        </span>
        <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tight">
          YOUR POP FOOD CRATE ({cart.total_count})
        </h1>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-16 flex-1 w-full">
        {cart.items.length === 0 ? (
          <div className="py-20 text-center max-w-md mx-auto space-y-6 bg-white border-4 border-black p-10 shadow-[8px_8px_0px_#FF007F]">
            <span className="text-6xl">🎨</span>
            <h2 className="text-3xl font-black uppercase tracking-tight">
              YOUR CRATE IS EMPTY!
            </h2>
            <p className="text-sm font-bold text-gray-700">
              Load up on handcrafted sourdough pizzas, gourmet pastas, and signature nitro brews.
            </p>
            <Link
              href="/concept-c/menu/"
              className="inline-block bg-[#0047FF] hover:bg-[#FF007F] text-white font-black uppercase text-xs px-8 py-3.5 border-2 border-black shadow-[3px_3px_0px_#000] transition-colors"
            >
              EXPLORE POP MENU &rarr;
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Items Column */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center justify-between pb-2 border-b-2 border-black">
                <span className="text-xs font-black uppercase text-gray-500">
                  {cart.total_count} ITEM{cart.total_count === 1 ? "" : "S"} READY
                </span>
                <button
                  onClick={clearCart}
                  className="text-xs font-black uppercase text-[#FF007F] hover:underline"
                >
                  CLEAR ENTIRE CRATE
                </button>
              </div>

              {cart.items.map((item) => (
                <div
                  key={item.cart_key}
                  className="bg-white border-4 border-black p-4 sm:p-5 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between shadow-[4px_4px_0px_#000]"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={api.resolveImageUrl(item.image_url)}
                      alt={item.name}
                      className="w-20 h-20 object-cover border-2 border-black shrink-0"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "/images/fallback-food.svg";
                      }}
                    />
                    <div>
                      <h3 className="font-black text-base uppercase text-black leading-tight">
                        {item.name}
                      </h3>
                      <span className="text-[11px] font-black uppercase text-[#0047FF]">
                        {item.category}
                      </span>
                      <p className="text-sm font-black text-[#FF007F] mt-1">
                        {api.formatPrice(item.line_total)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
                    {/* Qty Controls */}
                    <div className="flex items-center border-2 border-black bg-[#FFE600]">
                      <button
                        onClick={() => updateQty(item.cart_key, item.quantity - 1)}
                        className="p-1.5 hover:bg-black hover:text-white transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3.5 h-3.5 stroke-[3]" />
                      </button>
                      <span className="px-3 text-xs font-black font-mono">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQty(item.cart_key, item.quantity + 1)}
                        className="p-1.5 hover:bg-black hover:text-white transition-colors"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3.5 h-3.5 stroke-[3]" />
                      </button>
                    </div>

                    <button
                      onClick={() => removeItem(item.cart_key)}
                      className="p-2 text-black hover:text-[#FF007F] transition-colors"
                      aria-label="Remove item"
                    >
                      <Trash2 className="w-4 h-4 stroke-[2.5]" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary Column */}
            <div className="lg:col-span-5">
              <div className="bg-[#FFE600] border-4 border-black p-6 sm:p-8 shadow-[8px_8px_0px_#000] space-y-6">
                <h2 className="text-2xl font-black uppercase tracking-tight pb-3 border-b-2 border-black">
                  ORDER SUMMARY
                </h2>

                {/* Coupon Code Input */}
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <input
                    type="text"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    placeholder="ENTER COUPON CODE"
                    className="flex-1 bg-white border-2 border-black px-3 py-2 text-xs font-black uppercase focus:outline-none"
                  />
                  <button
                    type="submit"
                    disabled={couponLoading}
                    className="bg-black hover:bg-[#FF007F] text-white px-4 py-2 text-xs font-black uppercase transition-colors"
                  >
                    APPLY
                  </button>
                </form>

                {cart.coupon_code && (
                  <div className="bg-white border-2 border-black p-2.5 flex items-center justify-between text-xs font-black">
                    <span className="text-[#0047FF]">
                      COUPON: {cart.coupon_code} (-{api.formatPrice(cart.discount_amount)})
                    </span>
                    <button
                      onClick={removeCoupon}
                      className="text-[#FF007F] hover:underline"
                    >
                      REMOVE
                    </button>
                  </div>
                )}

                {/* Calculation Lines */}
                <div className="space-y-2.5 text-xs font-black uppercase border-b-2 border-black pb-4">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>{api.formatPrice(cart.subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Delivery Fee</span>
                    <span>
                      {cart.subtotal >= cart.free_delivery_threshold
                        ? "FREE"
                        : api.formatPrice(cart.delivery_fee)}
                    </span>
                  </div>
                  {cart.discount_amount > 0 && (
                    <div className="flex justify-between text-[#FF007F]">
                      <span>Discount</span>
                      <span>-{api.formatPrice(cart.discount_amount)}</span>
                    </div>
                  )}
                </div>

                <div className="flex justify-between items-center text-xl font-black">
                  <span>TOTAL DUE</span>
                  <span className="text-2xl">{api.formatPrice(cart.total)}</span>
                </div>

                <Link
                  href="/concept-c/checkout/"
                  className="block text-center w-full bg-[#FF007F] hover:bg-[#0047FF] text-white font-black uppercase text-base py-4 border-4 border-black shadow-[4px_4px_0px_#000] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all"
                >
                  PROCEED TO POP CHECKOUT &rarr;
                </Link>
              </div>
            </div>
          </div>
        )}
      </main>

      <ConceptCFooter />
    </div>
  );
}
