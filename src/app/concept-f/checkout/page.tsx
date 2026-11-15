"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Zap, Check, Lock, ArrowRight, MapPin, ShieldCheck, AlertCircle } from "lucide-react";
import ConceptFHeader from "@/components/concept-f/Header";
import ConceptFFooter from "@/components/concept-f/Footer";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/context/ToastContext";
import * as api from "@/lib/api";

export default function ConceptFCheckoutPage() {
  const router = useRouter();
  const { cart, refreshCart } = useCart();
  const { customer, addresses } = useAuth();
  const { showToast } = useToast();

  const [orderType, setOrderType] = useState<"delivery" | "takeaway">("delivery");
  const [paymentMethod, setPaymentMethod] = useState<"cod" | "pay_at_pickup">("cod");

  // Fields
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("New Delhi");
  const [pincode, setPincode] = useState("");
  const [landmark, setLandmark] = useState("");
  const [instructions, setInstructions] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (customer) {
      setName(customer.full_name || "");
      setEmail(customer.email || "");
      setPhone(customer.phone || "");
    }
    if (addresses && addresses.length > 0) {
      const def = addresses.find((a) => a.is_default) || addresses[0];
      setAddress(def.address_line || "");
      setCity(def.city || "New Delhi");
      setPincode(def.pincode || "");
      setLandmark(def.landmark || "");
    }
  }, [customer, addresses]);

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!name.trim()) {
      setErrorMsg("Please specify recipient hero name.");
      return;
    }
    if (phone.length < 8) {
      setErrorMsg("Please provide a valid contact phone.");
      return;
    }
    if (orderType === "delivery" && (!address.trim() || !pincode.trim())) {
      setErrorMsg("Please provide delivery street address and pincode.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await api.createOrder({
        name,
        phone,
        email,
        order_type: orderType,
        payment_method: paymentMethod,
        address: orderType === "delivery" ? address : undefined,
        city: orderType === "delivery" ? city : undefined,
        pincode: orderType === "delivery" ? pincode : undefined,
        landmark: orderType === "delivery" ? landmark : undefined,
        special_instructions: instructions,
        concept_source: "Concept F - Manga Bites",
      });

      if (res.success && res.order) {
        showToast("Comic order dispatched to hearth ovens!", "success");
        await refreshCart();
        router.push(`/concept-f/order-confirmation/?order_number=${res.order.order_number}`);
      } else {
        setErrorMsg(res.error || "Failed to issue comic order.");
        showToast(res.error || "Order dispatch error", "error");
      }
    } catch {
      setErrorMsg("Unable to process comic dispatch.");
      showToast("Dispatch network error", "error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-[#FFFDF7] min-h-screen text-black flex flex-col font-sans selection:bg-[#FFE600] selection:text-black">
      <ConceptFHeader />

      {/* Manga Header Banner */}
      <section className="bg-white py-16 border-b-4 border-black text-center space-y-4 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#FFE600] text-black font-black text-xs uppercase tracking-widest border-2 border-black shadow-[3px_3px_0px_#000] -rotate-1">
            <ShieldCheck className="w-3.5 h-3.5 text-[#D7263D]" />
            DISPATCH GATE &bull; CHECKOUT AUTHORIZATION
          </div>
          <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-black">
            Manga Checkout
          </h1>
          <p className="text-xs sm:text-sm text-gray-700 font-bold max-w-lg mx-auto">
            Confirm your delivery coordinates, contact credentials, and payment mode before we fire up the ovens.
          </p>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-16 flex-1 w-full">
        {cart.items.length === 0 ? (
          <div className="py-20 text-center max-w-md mx-auto space-y-6 bg-white border-4 border-black p-10">
            <span className="text-5xl">🍜</span>
            <h2 className="text-2xl font-black uppercase text-black">No Active Manifest</h2>
            <p className="text-xs text-gray-600 font-bold">
              Your basket is empty. Browse Chapter 01 to add dishes.
            </p>
            <Link
              href="/concept-f/menu/"
              className="inline-block bg-[#D7263D] text-white text-xs font-black uppercase tracking-widest px-8 py-3.5 border-2 border-black"
            >
              Return to Carte &rarr;
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Form Fields */}
            <div className="lg:col-span-7 space-y-8 text-xs font-bold">
              {errorMsg && (
                <div className="p-4 bg-red-100 border-3 border-[#D7263D] rounded flex items-center gap-3 text-red-900">
                  <AlertCircle className="w-5 h-5 text-[#D7263D] shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* Transit Mode Selection */}
              <div className="bg-white border-4 border-black p-6 space-y-4 shadow-[6px_6px_0px_#000]">
                <span className="text-[#D7263D] font-black uppercase tracking-wider block text-sm">
                  1. SELECT TRANSIT MODE
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => {
                      setOrderType("delivery");
                      setPaymentMethod("cod");
                    }}
                    className={`p-4 border-3 text-left transition-all ${
                      orderType === "delivery"
                        ? "bg-[#FFE600] border-black shadow-[4px_4px_0px_#000]"
                        : "bg-[#FFFDF7] border-black opacity-70 hover:opacity-100"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-black text-sm uppercase text-black">Express Shonen Courier</span>
                      {orderType === "delivery" && <Check className="w-4 h-4 text-black stroke-[3]" />}
                    </div>
                    <p className="text-[11px] text-gray-700 font-medium">
                      High-speed motorcycle courier direct to your door in 30 minutes.
                    </p>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setOrderType("takeaway");
                      setPaymentMethod("pay_at_pickup");
                    }}
                    className={`p-4 border-3 text-left transition-all ${
                      orderType === "takeaway"
                        ? "bg-[#FFE600] border-black shadow-[4px_4px_0px_#000]"
                        : "bg-[#FFFDF7] border-black opacity-70 hover:opacity-100"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-black text-sm uppercase text-black">Studio Counter Pickup</span>
                      {orderType === "takeaway" && <Check className="w-4 h-4 text-black stroke-[3]" />}
                    </div>
                    <p className="text-[11px] text-gray-700 font-medium">
                      Pick up fresh from Connaught Place kitchen pass in 20 minutes.
                    </p>
                  </button>
                </div>
              </div>

              {/* Guest Info */}
              <div className="bg-white border-4 border-black p-6 space-y-4 shadow-[6px_6px_0px_#000]">
                <span className="text-[#D7263D] font-black uppercase tracking-wider block text-sm">
                  2. HERO CREDENTIALS
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-black uppercase mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Kenji Tanaka"
                      className="w-full bg-[#FFFDF7] border-2 border-black p-3 text-black outline-none focus:border-[#D7263D]"
                    />
                  </div>

                  <div>
                    <label className="block text-black uppercase mb-1">
                      Mobile Line *
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      className="w-full bg-[#FFFDF7] border-2 border-black p-3 text-black outline-none focus:border-[#D7263D]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-black uppercase mb-1">
                    Electronic Mail *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="hero@mangabites.org"
                    className="w-full bg-[#FFFDF7] border-2 border-black p-3 text-black outline-none focus:border-[#D7263D]"
                  />
                </div>
              </div>

              {/* Address (if delivery) */}
              {orderType === "delivery" && (
                <div className="bg-white border-4 border-black p-6 space-y-4 shadow-[6px_6px_0px_#000]">
                  <span className="text-[#D7263D] font-black uppercase tracking-wider block text-sm">
                    3. DESTINATION STREET ADDRESS
                  </span>
                  <div>
                    <label className="block text-black uppercase mb-1">
                      Street / Flat / Block *
                    </label>
                    <input
                      type="text"
                      required
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="e.g. Flat 402, Sakura Apartments, Barakhamba"
                      className="w-full bg-[#FFFDF7] border-2 border-black p-3 text-black outline-none focus:border-[#D7263D]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-black uppercase mb-1">City</label>
                      <input
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="w-full bg-[#FFFDF7] border-2 border-black p-3 text-black outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-black uppercase mb-1">Pincode *</label>
                      <input
                        type="text"
                        required
                        value={pincode}
                        onChange={(e) => setPincode(e.target.value)}
                        placeholder="110001"
                        className="w-full bg-[#FFFDF7] border-2 border-black p-3 text-black outline-none focus:border-[#D7263D]"
                      />
                    </div>
                    <div>
                      <label className="block text-black uppercase mb-1">Landmark</label>
                      <input
                        type="text"
                        value={landmark}
                        onChange={(e) => setLandmark(e.target.value)}
                        placeholder="Near Metro Gate 2"
                        className="w-full bg-[#FFFDF7] border-2 border-black p-3 text-black outline-none"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Payment Method */}
              <div className="bg-white border-4 border-black p-6 space-y-4 shadow-[6px_6px_0px_#000]">
                <span className="text-[#D7263D] font-black uppercase tracking-wider block text-sm">
                  {orderType === "delivery" ? "4" : "3"}. PAYMENT AUTHORIZATION
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {orderType === "delivery" ? (
                    <button
                      type="button"
                      onClick={() => setPaymentMethod("cod")}
                      className={`p-4 border-3 text-left transition-all ${
                        paymentMethod === "cod"
                          ? "bg-[#FFE600] border-black shadow-[4px_4px_0px_#000]"
                          : "bg-[#FFFDF7] border-black"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-black uppercase text-black">Cash / UPI on Delivery</span>
                        <Check className="w-4 h-4 text-black stroke-[3]" />
                      </div>
                      <span className="text-[10px] text-gray-700">Settle directly with rider upon arrival.</span>
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setPaymentMethod("pay_at_pickup")}
                      className={`p-4 border-3 text-left transition-all ${
                        paymentMethod === "pay_at_pickup"
                          ? "bg-[#FFE600] border-black shadow-[4px_4px_0px_#000]"
                          : "bg-[#FFFDF7] border-black"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-black uppercase text-black">Pay at Studio Counter</span>
                        <Check className="w-4 h-4 text-black stroke-[3]" />
                      </div>
                      <span className="text-[10px] text-gray-700">Card or Cash at pickup counter.</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Instructions */}
              <div>
                <label className="block text-black uppercase mb-1">
                  Kitchen / Delivery Notes (Optional)
                </label>
                <textarea
                  rows={2}
                  value={instructions}
                  onChange={(e) => setInstructions(e.target.value)}
                  placeholder="Extra napkins, ring bell twice, keep chili oil separate..."
                  className="w-full bg-[#FFFDF7] border-2 border-black p-3 text-black outline-none focus:border-[#D7263D]"
                />
              </div>
            </div>

            {/* Sidebar Summary */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-white border-4 border-black p-6 sm:p-8 space-y-6 shadow-[8px_8px_0px_#000] sticky top-28">
                <div className="flex items-center justify-between border-b-2 border-black pb-4">
                  <div className="flex items-center gap-2">
                    <Zap className="w-5 h-5 text-[#D7263D]" />
                    <h3 className="text-lg font-black uppercase text-black">Comic Manifest</h3>
                  </div>
                  <span className="px-2 py-0.5 bg-[#FFE600] text-black font-mono text-[10px] font-black uppercase border border-black">
                    VOL. 07
                  </span>
                </div>

                {/* Items */}
                <div className="max-h-60 overflow-y-auto space-y-2 pr-1 font-mono text-xs">
                  {cart.items.map((it) => (
                    <div key={it.cart_key} className="flex justify-between items-center text-gray-700 border-b border-black/10 pb-2">
                      <span className="truncate pr-2 font-bold">
                        {it.quantity}x {it.name}
                      </span>
                      <span className="text-black font-black shrink-0">{api.formatPrice(it.line_total)}</span>
                    </div>
                  ))}
                </div>

                {/* Totals */}
                <div className="space-y-2 font-mono text-xs font-bold border-t-3 border-black pt-4">
                  <div className="flex justify-between text-gray-700">
                    <span>SUBTOTAL:</span>
                    <span className="text-black font-black">{api.formatPrice(cart.subtotal)}</span>
                  </div>
                  {cart.discount_amount > 0 && (
                    <div className="flex justify-between text-[#22C55E]">
                      <span>VOUCHER:</span>
                      <span className="font-black">-{api.formatPrice(cart.discount_amount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-gray-700">
                    <span>COURIER TRANSIT:</span>
                    <span className="text-black font-black">
                      {orderType === "takeaway" || cart.subtotal >= cart.free_delivery_threshold || cart.delivery_fee === 0
                        ? "FREE (COMPLIMENTARY)"
                        : api.formatPrice(cart.delivery_fee)}
                    </span>
                  </div>
                  <div className="border-t-3 border-black pt-3 flex justify-between items-baseline">
                    <span className="text-sm font-black uppercase text-black">TOTAL DUE:</span>
                    <span className="text-2xl font-black text-[#D7263D]">{api.formatPrice(cart.total)}</span>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-[#D7263D] hover:bg-[#b51f33] text-white text-xs font-black uppercase tracking-widest py-4 border-3 border-black shadow-[4px_4px_0px_#FFE600] transition-all disabled:opacity-50"
                >
                  {submitting ? "SEALING COMIC DISPATCH..." : "DISPATCH MANGA ORDER &rarr;"}
                </button>
              </div>
            </div>
          </form>
        )}
      </main>

      <ConceptFFooter />
    </div>
  );
}
