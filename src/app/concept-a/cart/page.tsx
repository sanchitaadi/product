"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Trash2, Plus, Minus, ArrowRight, Tag, ShoppingBag, ArrowLeft, Sparkles } from "lucide-react";
import ConceptAHeader from "@/components/concept-a/Header";
import ConceptAFooter from "@/components/concept-a/Footer";
import { useCart } from "@/context/CartContext";
import * as api from "@/lib/api";

export default function ConceptACartPage() {
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

  const amountForFreeDelivery = Math.max(0, cart.free_delivery_threshold - cart.subtotal);
  const freeDeliveryProgress = Math.min(100, (cart.subtotal / cart.free_delivery_threshold) * 100);

  return (
    <div className="bg-[#FFF8F9] min-h-screen text-[#3D2D2E] flex flex-col">
      <ConceptAHeader />

      <section className="pt-10 pb-6 border-b border-rose-100 bg-[#FFF0F3]/40">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
            <Link href="/concept-a/" className="hover:text-[#E07A86]">Home</Link>
            <span>&bull;</span>
            <Link href="/concept-a/menu/" className="hover:text-[#E07A86]">Menu</Link>
            <span>&bull;</span>
            <span className="text-[#E07A86] font-semibold">Feast Box</span>
          </div>
          <h1 className="font-coquette-serif font-black text-3xl sm:text-4xl text-[#3D2D2E]">
            Your Feast Box ({cart.total_count})
          </h1>
        </div>
      </section>

      <section className="py-12 flex-1">
        <div className="max-w-7xl mx-auto px-6">
          {cart.items.length === 0 ? (
            <div className="py-24 text-center max-w-md mx-auto space-y-4">
              <span className="text-5xl">🧁</span>
              <h2 className="font-coquette-serif font-bold text-2xl text-gray-800">
                Your Feast Box is Currently Empty
              </h2>
              <p className="text-xs text-gray-500 leading-relaxed">
                Explore our slow-fermented pizzas, burrata bruschettas, and signature shakes to begin your feast.
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
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              {/* Items List (2 cols) */}
              <div className="lg:col-span-2 space-y-4">
                {/* Free delivery badge banner */}
                <div className="p-4 rounded-2xl bg-white border border-amber-200/60 shadow-sm space-y-2">
                  <div className="flex justify-between text-xs font-bold text-gray-800">
                    <span>
                      {amountForFreeDelivery > 0 ? (
                        <>Add ₹{amountForFreeDelivery.toFixed(0)} more for FREE Delivery! 🛵</>
                      ) : (
                        <span className="text-emerald-700 flex items-center gap-1">
                          <Sparkles className="w-4 h-4 text-emerald-600" /> Free delivery unlocked!
                        </span>
                      )}
                    </span>
                    <span>{freeDeliveryProgress.toFixed(0)}%</span>
                  </div>
                  <div className="w-full h-2 bg-rose-50 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#E07A86] to-[#F59E0B] transition-all duration-300"
                      style={{ width: `${freeDeliveryProgress}%` }}
                    />
                  </div>
                </div>

                {cart.items.map((item) => (
                  <div
                    key={item.cart_key}
                    className="p-5 rounded-3xl bg-white border border-rose-100 shadow-sm flex flex-col sm:flex-row gap-5 items-start sm:items-center justify-between"
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src={api.resolveImageUrl(item.image_url)}
                        alt={item.name}
                        className="w-20 h-20 rounded-2xl object-cover shrink-0 border border-black/5"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = "/images/fallback-food.svg";
                        }}
                      />
                      <div>
                        <span className="text-[10px] uppercase font-bold text-[#E07A86] tracking-wider">
                          {item.category}
                        </span>
                        <h3 className="font-coquette-serif font-bold text-lg text-gray-900">
                          {item.name}
                        </h3>
                        {item.customization_options && item.customization_options.length > 0 && (
                          <p className="text-xs text-gray-500 mt-0.5">
                            {item.customization_options.map((o) => o.name).join(", ")}
                          </p>
                        )}
                        {item.special_instructions && (
                          <p className="text-xs text-amber-700 italic mt-0.5">
                            &ldquo;{item.special_instructions}&rdquo;
                          </p>
                        )}
                        <span className="text-xs font-semibold text-gray-500 block mt-1">
                          {api.formatPrice(item.item_price)} each
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-6 w-full sm:w-auto justify-between sm:justify-end border-t sm:border-t-0 pt-3 sm:pt-0 border-rose-50">
                      {/* Stepper */}
                      <div className="flex items-center gap-2.5 bg-rose-50/70 p-1 rounded-full border border-rose-200/60">
                        <button
                          onClick={() => updateQty(item.cart_key, item.quantity - 1)}
                          className="w-7 h-7 rounded-full bg-white flex items-center justify-center hover:bg-rose-100 text-gray-700 transition shadow-sm"
                          aria-label="Decrease"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="text-xs font-bold w-5 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQty(item.cart_key, item.quantity + 1)}
                          className="w-7 h-7 rounded-full bg-white flex items-center justify-center hover:bg-rose-100 text-gray-700 transition shadow-sm"
                          aria-label="Increase"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="text-right">
                        <span className="font-coquette-serif font-bold text-base text-[#3D2D2E] block">
                          {api.formatPrice(item.line_total)}
                        </span>
                        <button
                          onClick={() => removeItem(item.cart_key)}
                          className="text-[11px] text-gray-400 hover:text-rose-600 transition flex items-center gap-1 mt-0.5"
                        >
                          <Trash2 className="w-3 h-3" />
                          <span>Remove</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}

                <div className="flex items-center justify-between pt-2">
                  <Link
                    href="/concept-a/menu/"
                    className="inline-flex items-center gap-2 text-xs font-bold text-[#E07A86] hover:underline"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Continue Dining Selection</span>
                  </Link>

                  <button
                    onClick={clearCart}
                    className="text-xs text-gray-400 hover:text-rose-600 transition underline"
                  >
                    Clear Feast Box
                  </button>
                </div>
              </div>

              {/* Order Summary (1 col) */}
              <div className="space-y-6">
                <div className="p-6 rounded-3xl bg-white border border-rose-100 shadow-sm space-y-5">
                  <h3 className="font-coquette-serif font-bold text-lg text-[#3D2D2E]">
                    Order Summary
                  </h3>

                  {/* Promo Form */}
                  {cart.coupon_code ? (
                    <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Tag className="w-4 h-4 text-emerald-600" />
                        <span>Promo <strong>{cart.coupon_code}</strong> active</span>
                      </div>
                      <button
                        onClick={removeCoupon}
                        className="text-emerald-700 underline font-semibold hover:text-emerald-900"
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleApplyCoupon} className="flex gap-2">
                      <input
                        type="text"
                        value={couponInput}
                        onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                        placeholder="Coupon code"
                        className="flex-1 px-3 py-2 text-xs rounded-xl border border-rose-200 bg-rose-50/30 uppercase font-mono tracking-wider focus:outline-none focus:ring-1 focus:ring-[#E07A86]"
                      />
                      <button
                        type="submit"
                        disabled={couponLoading || !couponInput.trim()}
                        className="px-4 py-2 rounded-xl bg-[#3D2D2E] text-white text-xs font-bold hover:bg-black disabled:opacity-50 transition"
                      >
                        Apply
                      </button>
                    </form>
                  )}

                  {/* Price Line Items */}
                  <div className="space-y-2.5 text-xs text-gray-600 border-t border-rose-50 pt-4">
                    <div className="flex justify-between">
                      <span>Dishes Subtotal</span>
                      <span className="font-semibold text-gray-900">{api.formatPrice(cart.subtotal)}</span>
                    </div>

                    {cart.discount_amount > 0 && (
                      <div className="flex justify-between text-emerald-600 font-semibold">
                        <span>Coupon Savings</span>
                        <span>-{api.formatPrice(cart.discount_amount)}</span>
                      </div>
                    )}

                    <div className="flex justify-between">
                      <span>Express Delivery</span>
                      <span>
                        {cart.delivery_fee === 0 ? (
                          <span className="text-emerald-600 font-bold uppercase">Free</span>
                        ) : (
                          api.formatPrice(cart.delivery_fee)
                        )}
                      </span>
                    </div>

                    <div className="flex justify-between pt-3 border-t border-rose-100 text-lg font-bold text-[#3D2D2E]">
                      <span className="font-coquette-serif">Total Due</span>
                      <span className="font-coquette-serif">{api.formatPrice(cart.total)}</span>
                    </div>
                  </div>

                  {/* Checkout CTA */}
                  <Link
                    href="/concept-a/checkout/"
                    className="w-full py-4 rounded-full bg-gradient-to-r from-[#E07A86] to-[#F59E0B] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-rose-200/50 hover:opacity-95 transition"
                  >
                    <span>Proceed to Secure Checkout</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                  <p className="text-[11px] text-gray-400 text-center leading-relaxed">
                    ✨ Encrypted payment &bull; Fresh packaging &bull; Live SMS updates
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      <ConceptAFooter />
    </div>
  );
}
