"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Trash2, Plus, Minus, ArrowRight, Tag, ShoppingBag, ArrowLeft, Sparkles, Package } from "lucide-react";
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
    <div className="bg-[#0A0B0E] min-h-screen text-[#F7F5F0] flex flex-col selection:bg-[#C5A059] selection:text-[#0A0B0E]">
      <ConceptAHeader />

      <section className="pt-16 pb-10 border-b border-[#C5A059]/20 bg-[#0E1015]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-2 text-xs font-mono text-gray-400 mb-2">
            <Link href="/concept-a/" className="hover:text-[#C5A059]">Home</Link>
            <span>&bull;</span>
            <Link href="/concept-a/menu/" className="hover:text-[#C5A059]">Reserve Collection</Link>
            <span>&bull;</span>
            <span className="text-[#C5A059] font-bold">Dispatch Hamper</span>
          </div>
          <h1 className="font-serif font-black text-3xl sm:text-4xl text-[#F7F5F0]">
            Your Reserve Dispatch Hamper ({cart.total_count})
          </h1>
        </div>
      </section>

      <section className="py-16 flex-1">
        <div className="max-w-7xl mx-auto px-6">
          {cart.items.length === 0 ? (
            <div className="py-24 text-center max-w-md mx-auto space-y-4">
              <span className="text-4xl text-[#C5A059]">✦</span>
              <h2 className="font-serif font-bold text-2xl text-[#F7F5F0]">
                Your Reserve Hamper is Empty
              </h2>
              <p className="text-xs text-[#A89F91] leading-relaxed font-light">
                Explore our 85% single-estate dark chocolates, raw Himalayan honeycombs, and 24K gold sablés to curate your luxury shipment.
              </p>
              <Link
                href="/concept-a/menu/"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#C5A059] via-[#D4AF37] to-[#B38F46] text-[#0A0B0E] text-xs font-bold uppercase tracking-widest shadow-xl shadow-[#C5A059]/20 hover:brightness-110 transition"
              >
                <span>Browse Reserve Collection</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Cart Items List */}
              <div className="lg:col-span-2 space-y-4">
                {/* Free Delivery Bar */}
                <div className="p-4 rounded-xl bg-[#13151A] border border-[#C5A059]/30 space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono">
                    {amountForFreeDelivery > 0 ? (
                      <span className="text-[#D1C7BD]">
                        Add <strong className="text-[#C5A059]">{api.formatPrice(amountForFreeDelivery)}</strong> more for <strong className="text-[#F7F5F0]">Free Climate-Controlled Dispatch</strong>
                      </span>
                    ) : (
                      <span className="text-[#C5A059] font-bold flex items-center gap-1.5">
                        <span>✦</span> Qualified for Free Express Climate Dispatch Across India!
                      </span>
                    )}
                    <span className="text-gray-500">{Math.round(freeDeliveryProgress)}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-[#0A0B0E] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#C5A059] to-[#D4AF37] transition-all duration-300"
                      style={{ width: `${freeDeliveryProgress}%` }}
                    />
                  </div>
                </div>

                {/* Items */}
                <div className="bg-[#13151A] rounded-2xl border border-[#C5A059]/30 overflow-hidden divide-y divide-[#C5A059]/15">
                  {cart.items.map((item) => (
                    <div key={item.cart_key} className="p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <img
                          src={api.resolveImageUrl(item.image_url)}
                          alt={item.name}
                          className="w-16 h-16 rounded-xl object-cover border border-[#C5A059]/30 bg-[#0A0B0E]"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = "/images/products/noir-cacao-bar.jpg";
                          }}
                        />
                        <div>
                          <h4 className="font-serif font-bold text-sm text-[#F7F5F0]">{item.name}</h4>
                          {item.special_instructions && (
                            <span className="text-[11px] text-[#A89F91] font-mono block">
                              Pack: {item.special_instructions}
                            </span>
                          )}
                          <span className="text-xs font-serif font-bold text-[#C5A059]">
                            {api.formatPrice(item.item_price)} each
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-6 w-full sm:w-auto justify-between">
                        {/* Qty Selector */}
                        <div className="flex items-center gap-2 bg-[#0A0B0E] border border-[#C5A059]/30 px-2 py-1 rounded-lg">
                          <button
                            onClick={() => updateQty(item.cart_key, item.quantity - 1)}
                            className="p-1 text-gray-400 hover:text-white"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="text-xs font-mono font-bold w-6 text-center text-[#F7F5F0]">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQty(item.cart_key, item.quantity + 1)}
                            className="p-1 text-gray-400 hover:text-white"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <span className="font-serif font-bold text-sm text-[#F7F5F0] min-w-16 text-right">
                          {api.formatPrice(item.line_total)}
                        </span>

                        <button
                          onClick={() => removeItem(item.cart_key)}
                          className="text-gray-500 hover:text-red-400 p-1"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-2">
                  <Link
                    href="/concept-a/menu/"
                    className="inline-flex items-center gap-2 text-xs font-mono text-[#C5A059] hover:underline"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Continue Selecting Provisions</span>
                  </Link>
                  <button
                    onClick={clearCart}
                    className="text-xs font-mono text-gray-500 hover:text-red-400 underline"
                  >
                    Clear Hamper
                  </button>
                </div>
              </div>

              {/* Order Summary & Coupon */}
              <div className="space-y-6">
                <div className="bg-[#13151A] rounded-2xl p-6 border border-[#C5A059]/30 space-y-4">
                  <h3 className="font-serif font-bold text-base text-[#F7F5F0] tracking-wide">
                    Dispatch Summary
                  </h3>

                  <div className="space-y-2.5 text-xs font-mono text-[#D1C7BD] border-b border-[#C5A059]/20 pb-4">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Provisions Subtotal:</span>
                      <span>{api.formatPrice(cart.subtotal)}</span>
                    </div>
                    {cart.discount_amount > 0 && (
                      <div className="flex justify-between text-[#C5A059]">
                        <span>Privilege Discount:</span>
                        <span>-{api.formatPrice(cart.discount_amount)}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-gray-400">Packaging &amp; Cold-Chain:</span>
                      <span>
                        {cart.delivery_fee === 0 ? (
                          <span className="text-[#C5A059] font-bold">FREE</span>
                        ) : (
                          api.formatPrice(cart.delivery_fee)
                        )}
                      </span>
                    </div>
                  </div>

                  <div className="flex justify-between font-serif font-bold text-lg text-[#F7F5F0] pt-1">
                    <span>Total Amount:</span>
                    <span className="text-[#C5A059]">{api.formatPrice(cart.total)}</span>
                  </div>

                  {/* Coupon Form */}
                  <div className="pt-2">
                    {cart.coupon_code ? (
                      <div className="p-3 bg-[#0A0B0E] rounded-xl border border-[#C5A059]/40 flex items-center justify-between text-xs font-mono">
                        <span className="text-[#C5A059] font-bold">
                          Code: {cart.coupon_code} (-{api.formatPrice(cart.discount_amount)})
                        </span>
                        <button
                          onClick={removeCoupon}
                          className="text-gray-500 hover:text-red-400 text-[10px] underline"
                        >
                          Remove
                        </button>
                      </div>
                    ) : (
                      <form onSubmit={handleApplyCoupon} className="flex gap-2">
                        <input
                          type="text"
                          value={couponInput}
                          onChange={(e) => setCouponInput(e.target.value)}
                          placeholder="Coupon: RESERVE20"
                          className="flex-1 bg-[#0A0B0E] border border-[#C5A059]/30 text-xs px-3 py-2 rounded-xl text-[#F7F5F0] uppercase font-mono focus:outline-none focus:border-[#C5A059]"
                        />
                        <button
                          type="submit"
                          disabled={couponLoading}
                          className="px-4 py-2 bg-[#16181F] border border-[#C5A059]/40 text-[#C5A059] text-xs font-mono font-bold uppercase rounded-xl hover:bg-[#C5A059] hover:text-[#0A0B0E] transition"
                        >
                          Apply
                        </button>
                      </form>
                    )}
                  </div>

                  <Link
                    href="/concept-a/checkout/"
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-[#C5A059] via-[#D4AF37] to-[#B38F46] text-[#0A0B0E] font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-xl shadow-[#C5A059]/20 hover:brightness-110 transition"
                  >
                    <span>Proceed to Cold-Chain Dispatch</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
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
