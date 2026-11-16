"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight, Tag, Sparkles } from "lucide-react";
import { useCart } from "@/context/CartContext";
import * as api from "@/lib/api";

export default function CartDrawer() {
  const {
    cart,
    isDrawerOpen,
    closeDrawer,
    updateQty,
    removeItem,
    applyCoupon,
    removeCoupon,
    conceptTheme,
  } = useCart();
  const [couponInput, setCouponInput] = useState("");
  const [couponLoading, setCouponLoading] = useState(false);

  const handleApplyCoupon = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    setCouponLoading(true);
    await applyCoupon(couponInput.trim());
    setCouponLoading(false);
  };

  const isRetro = conceptTheme === "retro" || conceptTheme === "concept-b";
  const isPopArt = conceptTheme === "popart" || conceptTheme === "concept-c";
  const isEarth = conceptTheme === "earth" || conceptTheme === "concept-d";
  const isMetro = conceptTheme === "metro" || conceptTheme === "concept-e";
  const isManga = conceptTheme === "manga" || conceptTheme === "concept-f";
  const isCircus = conceptTheme === "circus" || conceptTheme === "concept-g";
  const isLuxury = conceptTheme === "luxury" || conceptTheme === "coquette" || conceptTheme === "concept-a";

  const drawerBg = isManga
    ? "bg-[#FFFDF7] border-l-4 border-black text-black font-sans shadow-2xl"
    : isCircus
    ? "bg-[#FFFDD0] border-l-4 border-[#C41E3A] text-[#3D0C11] shadow-2xl"
    : isMetro
    ? "bg-[#08142C] border-l-4 border-[#FFD100] text-[#F8F6F0]"
    : isRetro
    ? "bg-[#FFF9EC] border-l-4 border-black text-black"
    : isPopArt
    ? "bg-[#FFFDF7] border-l-4 border-black text-black"
    : isEarth
    ? "bg-[#FDFBF7] border-l-2 border-[#5E6B4E]/30 text-[#1E3F20]"
    : "bg-[#0A0B0E] border-l border-[#C5A059]/30 text-[#F7F5F0]";

  const btnCheckout = isManga
    ? "bg-[#D7263D] hover:bg-[#b51f33] text-white border-3 border-black shadow-[4px_4px_0px_#000] font-black uppercase text-xs tracking-wider rounded-none"
    : isCircus
    ? "bg-[#C41E3A] hover:bg-[#A3162C] text-white border-2 border-[#FFD54F] shadow-[4px_4px_0px_#FFD54F] font-black uppercase text-xs tracking-wider rounded-full"
    : isMetro
    ? "bg-[#D71920] hover:bg-[#B3141A] text-white border-2 border-[#FFD100] shadow-[3px_3px_0px_#000] font-mono uppercase text-xs tracking-wider font-bold rounded-xl"
    : isRetro
    ? "bg-[#FF2A55] text-white border-2 border-black shadow-[4px_4px_0px_#000] hover:translate-x-0.5 hover:translate-y-0.5 active:shadow-none"
    : isPopArt
    ? "bg-[#FF007F] text-white border-2 border-black shadow-[4px_4px_0px_#0047FF] hover:translate-x-0.5 hover:translate-y-0.5 font-black uppercase text-xs tracking-wider"
    : isEarth
    ? "bg-[#5E6B4E] hover:bg-[#4E5B3F] text-white rounded-2xl shadow-md text-xs font-bold tracking-wider uppercase"
    : "bg-gradient-to-r from-[#C5A059] via-[#D4AF37] to-[#B38F46] text-[#0A0B0E] font-bold uppercase text-xs tracking-widest shadow-xl shadow-[#C5A059]/20 hover:brightness-110 rounded-xl";

  const conceptRoute = isManga
    ? "/concept-f"
    : isCircus
    ? "/concept-g"
    : isMetro
    ? "/concept-e"
    : isRetro
    ? "/concept-b"
    : isPopArt
    ? "/concept-c"
    : isEarth
    ? "/concept-d"
    : "/concept-a";

  const checkoutUrl = `${conceptRoute}/checkout/`;
  const menuUrl = `${conceptRoute}/menu/`;

  const amountForFreeDelivery = Math.max(0, cart.free_delivery_threshold - cart.subtotal);
  const freeDeliveryProgress = Math.min(100, (cart.subtotal / cart.free_delivery_threshold) * 100);

  return (
    <AnimatePresence>
      {isDrawerOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeDrawer}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
          />

          {/* Drawer Panel */}
          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 280 }}
              className={`w-screen max-w-md flex flex-col shadow-2xl ${drawerBg}`}
            >
              {/* Header */}
              <div className="p-6 border-b border-black/10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      isMetro
                        ? "bg-[#FFD100] text-[#08142C] border-2 border-white"
                        : isRetro
                        ? "bg-[#FFE15D] border-2 border-black"
                        : isPopArt
                        ? "bg-[#FF007F] text-white border-2 border-black"
                        : isEarth
                        ? "bg-[#5E6B4E] text-[#FDFBF7]"
                        : "bg-rose-100 text-rose-600"
                    }`}
                  >
                    <ShoppingBag className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="font-serif font-bold text-lg text-[#2B2118]">
                      Your Feast Box
                    </h2>
                    <span className="text-xs text-gray-500 font-medium">
                      {cart.total_count} {cart.total_count === 1 ? "dish" : "dishes"} selected
                    </span>
                  </div>
                </div>

                <button
                  onClick={closeDrawer}
                  className="p-2 rounded-full hover:bg-black/5 text-gray-500 hover:text-black transition"
                  aria-label="Close cart"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Free Delivery Bar */}
              <div className="px-6 py-3 bg-amber-500/10 border-b border-black/5 flex flex-col gap-1.5">
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span>
                    {amountForFreeDelivery > 0 ? (
                      <>
                        Add <strong className="text-amber-800">₹{amountForFreeDelivery.toFixed(0)}</strong> more for FREE delivery! 🛵
                      </>
                    ) : (
                      <span className="text-emerald-700 font-bold flex items-center gap-1">
                        <Sparkles className="w-3.5 h-3.5" /> Congratulations! You unlocked FREE Delivery!
                      </span>
                    )}
                  </span>
                  <span>{freeDeliveryProgress.toFixed(0)}%</span>
                </div>
                <div className="w-full h-1.5 bg-black/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-amber-500 transition-all duration-300 rounded-full"
                    style={{ width: `${freeDeliveryProgress}%` }}
                  />
                </div>
              </div>

              {/* Items List */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {cart.items.length === 0 ? (
                  <div className="py-20 flex flex-col items-center justify-center text-center">
                    <div className="w-20 h-20 rounded-full bg-rose-50 flex items-center justify-center mb-4 text-3xl">
                      🧁
                    </div>
                    <h3 className="font-serif text-lg font-bold text-gray-800">
                      Your Feast Box is Empty
                    </h3>
                    <p className="text-xs text-gray-500 mt-1 max-w-xs">
                      Handcrafted sourdough pizzas, velvet cold coffees, and sweet desserts are waiting!
                    </p>
                    <Link
                      href={menuUrl}
                      onClick={closeDrawer}
                      className={`mt-6 px-6 py-3 font-semibold text-xs uppercase tracking-wider rounded-xl transition ${btnCheckout}`}
                    >
                      Explore Menu
                    </Link>
                  </div>
                ) : (
                  cart.items.map((item) => (
                    <motion.div
                      key={item.cart_key}
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className={`p-4 rounded-2xl border flex gap-3.5 ${
                        isMetro
                          ? "bg-[#0E2042] border-2 border-[#FFD100]/40 text-white shadow-md"
                          : isRetro
                          ? "bg-white border-2 border-black shadow-[2px_2px_0px_#000]"
                          : isPopArt
                          ? "bg-white border-2 border-black shadow-[2px_2px_0px_#FF007F]"
                          : isEarth
                          ? "bg-white border border-[#5E6B4E]/20"
                          : "bg-white border border-rose-100 shadow-sm"
                      }`}
                    >
                      <img
                        src={api.resolveImageUrl(item.image_url)}
                        alt={item.name}
                        className="w-16 h-16 rounded-xl object-cover shrink-0 border border-black/5"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = "/images/fallback-food.svg";
                        }}
                      />

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <h4 className="text-sm font-bold text-gray-900 truncate">
                            {item.name}
                          </h4>
                          <button
                            onClick={() => removeItem(item.cart_key)}
                            className="text-gray-400 hover:text-rose-500 p-1"
                            title="Remove item"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {/* Customizations summary */}
                        {item.customization_options && item.customization_options.length > 0 && (
                          <p className="text-[11px] text-gray-500 line-clamp-1 mt-0.5">
                            {item.customization_options.map((o) => o.name).join(", ")}
                          </p>
                        )}
                        {item.special_instructions && (
                          <p className="text-[11px] text-amber-700 italic line-clamp-1">
                            Note: {item.special_instructions}
                          </p>
                        )}

                        <div className="flex items-center justify-between mt-3">
                          <span className="font-bold text-sm text-[#2B2118]">
                            {api.formatPrice(item.line_total)}
                          </span>

                          <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
                            <button
                              onClick={() => updateQty(item.cart_key, item.quantity - 1)}
                              className="w-6 h-6 rounded flex items-center justify-center hover:bg-white text-gray-700 transition"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="text-xs font-bold w-4 text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQty(item.cart_key, item.quantity + 1)}
                              className="w-6 h-6 rounded flex items-center justify-center hover:bg-white text-gray-700 transition"
                              aria-label="Increase quantity"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>

              {/* Footer Summary & Checkout */}
              {cart.items.length > 0 && (
                <div className="p-6 border-t border-black/10 bg-black/[0.02] space-y-4">
                  {/* Promo Code Form */}
                  {cart.coupon_code ? (
                    <div className="flex items-center justify-between p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-800">
                      <div className="flex items-center gap-2">
                        <Tag className="w-4 h-4 text-emerald-600" />
                        <span>
                          Promo <strong>{cart.coupon_code}</strong> active (-₹{cart.discount_amount.toFixed(2)})
                        </span>
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
                      <div className="relative flex-1">
                        <Tag className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                        <input
                          type="text"
                          value={couponInput}
                          onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                          placeholder="Coupon (e.g. PEACHY20)"
                          className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-black/15 bg-white uppercase font-mono tracking-wider focus:outline-none focus:ring-1 focus:ring-rose-400"
                        />
                      </div>
                      <button
                        type="submit"
                        disabled={couponLoading || !couponInput.trim()}
                        className="px-4 py-2 bg-black text-white text-xs font-bold rounded-xl hover:bg-gray-800 disabled:opacity-40 transition"
                      >
                        {couponLoading ? "..." : "Apply"}
                      </button>
                    </form>
                  )}

                  {/* Calculations */}
                  <div className="space-y-1.5 text-xs text-gray-600">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span className="font-semibold text-gray-900">{api.formatPrice(cart.subtotal)}</span>
                    </div>
                    {cart.discount_amount > 0 && (
                      <div className="flex justify-between text-emerald-600 font-medium">
                        <span>Discount</span>
                        <span>-{api.formatPrice(cart.discount_amount)}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span>Delivery Fee</span>
                      <span>
                        {cart.delivery_fee === 0 ? (
                          <span className="text-emerald-600 font-bold uppercase">Free</span>
                        ) : (
                          api.formatPrice(cart.delivery_fee)
                        )}
                      </span>
                    </div>
                    <div className="flex justify-between pt-2 border-t border-black/10 text-base font-bold text-[#2B2118]">
                      <span>Total Amount</span>
                      <span>{api.formatPrice(cart.total)}</span>
                    </div>
                  </div>

                  {/* Checkout Button */}
                  <Link
                    href={checkoutUrl}
                    onClick={closeDrawer}
                    className={`w-full py-4 font-bold text-center flex items-center justify-center gap-2 transition ${btnCheckout}`}
                  >
                    <span>Proceed to Checkout</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                  <div className="text-center">
                    <Link
                      href={`${conceptRoute}/cart/`}
                      onClick={closeDrawer}
                      className="text-xs text-gray-500 hover:text-black underline tracking-wide"
                    >
                      View Dedicated Cart Page
                    </Link>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
