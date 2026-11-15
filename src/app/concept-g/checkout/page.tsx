"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Star, Ticket, Check, Lock, ArrowRight, MapPin, ShieldCheck, AlertCircle } from "lucide-react";
import ConceptGHeader from "@/components/concept-g/Header";
import ConceptGFooter from "@/components/concept-g/Footer";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/context/ToastContext";
import * as api from "@/lib/api";

export default function ConceptGCheckoutPage() {
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
      setErrorMsg("Please specify spectator recipient name.");
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
        concept_source: "Concept G - Circus Social",
      });

      if (res.success && res.order) {
        showToast("Golden ticket order issued to carnival kitchen!", "success");
        await refreshCart();
        router.push(`/concept-g/order-confirmation/?order_number=${res.order.order_number}`);
      } else {
        setErrorMsg(res.error || "Failed to issue carnival ticket order.");
        showToast(res.error || "Order dispatch error", "error");
      }
    } catch {
      setErrorMsg("Unable to process carnival dispatch.");
      showToast("Dispatch network error", "error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-[#FFFDD0] min-h-screen text-[#5C0614] flex flex-col font-sans selection:bg-[#FFD54F] selection:text-[#5C0614]">
      <ConceptGHeader />

      {/* Header Banner */}
      <section className="bg-[#FFFDF5] py-16 border-b-6 border-[#C41E3A] text-center space-y-4 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#FFD54F] text-[#5C0614] font-black text-xs uppercase tracking-widest rounded-full border-2 border-[#5C0614] shadow-[3px_3px_0px_#C41E3A]">
            <ShieldCheck className="w-3.5 h-3.5" />
            ENTRANCE TURNSTILE &bull; CHECKOUT AUTHORIZATION
          </div>
          <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-[#5C0614] font-serif">
            Carnival Gate Checkout
          </h1>
          <p className="text-xs sm:text-sm text-[#5C0614]/80 font-medium max-w-lg mx-auto">
            Authorize your admission tickets, delivery coordinates, and payment before our hearth ovens take flight.
          </p>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-16 flex-1 w-full">
        {cart.items.length === 0 ? (
          <div className="py-20 text-center max-w-md mx-auto space-y-6 bg-white border-4 border-[#C41E3A] rounded-3xl p-10 shadow-[8px_8px_0px_#5C0614]">
            <span className="text-5xl">🎪</span>
            <h2 className="text-2xl font-black uppercase text-[#5C0614] font-serif">No Active Tickets</h2>
            <p className="text-xs text-[#5C0614]/80 font-medium">
              Your basket is empty. Please visit the Big Top Carte first.
            </p>
            <Link
              href="/concept-g/menu/"
              className="inline-block bg-[#C41E3A] text-white text-xs font-black uppercase tracking-widest px-8 py-3.5 rounded-full border-2 border-[#FFD54F]"
            >
              Return to Carte &rarr;
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Form Fields */}
            <div className="lg:col-span-7 space-y-8 text-xs font-bold">
              {errorMsg && (
                <div className="p-4 bg-red-100 border-3 border-[#C41E3A] rounded-2xl flex items-center gap-3 text-red-900">
                  <AlertCircle className="w-5 h-5 text-[#C41E3A] shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* Transit Mode Selection */}
              <div className="bg-white border-4 border-[#C41E3A] rounded-3xl p-6 space-y-4 shadow-[6px_6px_0px_#5C0614]">
                <span className="text-[#C41E3A] font-black uppercase tracking-wider block text-sm">
                  1. SELECT CARNIVAL DISPATCH MODE
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => {
                      setOrderType("delivery");
                      setPaymentMethod("cod");
                    }}
                    className={`p-4 rounded-2xl border-3 text-left transition-all ${
                      orderType === "delivery"
                        ? "bg-[#FFD54F] border-[#5C0614] shadow-[4px_4px_0px_#C41E3A]"
                        : "bg-[#FFFDD0] border-[#5C0614] opacity-70 hover:opacity-100"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-black text-sm uppercase text-[#5C0614]">Express Midway Courier</span>
                      {orderType === "delivery" && <Check className="w-4 h-4 text-[#5C0614] stroke-[3]" />}
                    </div>
                    <p className="text-[11px] text-[#5C0614]/80 font-medium">
                      Fast-courier delivery direct to your home or office tent in 30 minutes.
                    </p>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setOrderType("takeaway");
                      setPaymentMethod("pay_at_pickup");
                    }}
                    className={`p-4 rounded-2xl border-3 text-left transition-all ${
                      orderType === "takeaway"
                        ? "bg-[#FFD54F] border-[#5C0614] shadow-[4px_4px_0px_#C41E3A]"
                        : "bg-[#FFFDD0] border-[#5C0614] opacity-70 hover:opacity-100"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-black text-sm uppercase text-[#5C0614]">Turnstile Counter Pickup</span>
                      {orderType === "takeaway" && <Check className="w-4 h-4 text-[#5C0614] stroke-[3]" />}
                    </div>
                    <p className="text-[11px] text-[#5C0614]/80 font-medium">
                      Collect hot &amp; fresh from our Connaught Circus marquee pass in 20 minutes.
                    </p>
                  </button>
                </div>
              </div>

              {/* Spectator Credentials */}
              <div className="bg-white border-4 border-[#C41E3A] rounded-3xl p-6 space-y-4 shadow-[6px_6px_0px_#5C0614]">
                <span className="text-[#C41E3A] font-black uppercase tracking-wider block text-sm">
                  2. SPECTATOR CREDENTIALS
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[#5C0614] uppercase mb-1">
                      Spectator Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Lady Clara Sterling"
                      className="w-full bg-[#FFFDD0] border-2 border-[#5C0614] rounded-xl p-3 text-[#5C0614] outline-none focus:border-[#C41E3A]"
                    />
                  </div>

                  <div>
                    <label className="block text-[#5C0614] uppercase mb-1">
                      Mobile Line *
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      className="w-full bg-[#FFFDD0] border-2 border-[#5C0614] rounded-xl p-3 text-[#5C0614] outline-none focus:border-[#C41E3A]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[#5C0614] uppercase mb-1">
                    Electronic Mail *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="spectator@circussocial.org"
                    className="w-full bg-[#FFFDD0] border-2 border-[#5C0614] rounded-xl p-3 text-[#5C0614] outline-none focus:border-[#C41E3A]"
                  />
                </div>
              </div>

              {/* Address (if delivery) */}
              {orderType === "delivery" && (
                <div className="bg-white border-4 border-[#C41E3A] rounded-3xl p-6 space-y-4 shadow-[6px_6px_0px_#5C0614]">
                  <span className="text-[#C41E3A] font-black uppercase tracking-wider block text-sm">
                    3. DESTINATION STREET ADDRESS
                  </span>
                  <div>
                    <label className="block text-[#5C0614] uppercase mb-1">
                      Street / Flat / Colony *
                    </label>
                    <input
                      type="text"
                      required
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="e.g. 18 Kasturba Gandhi Marg, Flat 3B"
                      className="w-full bg-[#FFFDD0] border-2 border-[#5C0614] rounded-xl p-3 text-[#5C0614] outline-none focus:border-[#C41E3A]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-[#5C0614] uppercase mb-1">City</label>
                      <input
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="w-full bg-[#FFFDD0] border-2 border-[#5C0614] rounded-xl p-3 text-[#5C0614] outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[#5C0614] uppercase mb-1">Pincode *</label>
                      <input
                        type="text"
                        required
                        value={pincode}
                        onChange={(e) => setPincode(e.target.value)}
                        placeholder="110001"
                        className="w-full bg-[#FFFDD0] border-2 border-[#5C0614] rounded-xl p-3 text-[#5C0614] outline-none focus:border-[#C41E3A]"
                      />
                    </div>
                    <div>
                      <label className="block text-[#5C0614] uppercase mb-1">Landmark</label>
                      <input
                        type="text"
                        value={landmark}
                        onChange={(e) => setLandmark(e.target.value)}
                        placeholder="Opposite British Council"
                        className="w-full bg-[#FFFDD0] border-2 border-[#5C0614] rounded-xl p-3 text-[#5C0614] outline-none"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Payment Method */}
              <div className="bg-white border-4 border-[#C41E3A] rounded-3xl p-6 space-y-4 shadow-[6px_6px_0px_#5C0614]">
                <span className="text-[#C41E3A] font-black uppercase tracking-wider block text-sm">
                  {orderType === "delivery" ? "4" : "3"}. PAYMENT AUTHORIZATION
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {orderType === "delivery" ? (
                    <button
                      type="button"
                      onClick={() => setPaymentMethod("cod")}
                      className={`p-4 rounded-2xl border-3 text-left transition-all ${
                        paymentMethod === "cod"
                          ? "bg-[#FFD54F] border-[#5C0614] shadow-[4px_4px_0px_#C41E3A]"
                          : "bg-[#FFFDD0] border-[#5C0614]"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-black uppercase text-[#5C0614]">Cash / UPI on Arrival</span>
                        <Check className="w-4 h-4 text-[#5C0614] stroke-[3]" />
                      </div>
                      <span className="text-[10px] text-[#5C0614]/80 font-medium">Settle ticket fare with courier upon delivery.</span>
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setPaymentMethod("pay_at_pickup")}
                      className={`p-4 rounded-2xl border-3 text-left transition-all ${
                        paymentMethod === "pay_at_pickup"
                          ? "bg-[#FFD54F] border-[#5C0614] shadow-[4px_4px_0px_#C41E3A]"
                          : "bg-[#FFFDD0] border-[#5C0614]"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-black uppercase text-[#5C0614]">Pay at Turnstile Counter</span>
                        <Check className="w-4 h-4 text-[#5C0614] stroke-[3]" />
                      </div>
                      <span className="text-[10px] text-[#5C0614]/80 font-medium">Card or Cash at pickup turnstile.</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Instructions */}
              <div>
                <label className="block text-[#5C0614] uppercase mb-1">
                  Carnival Gate Instructions (Optional)
                </label>
                <textarea
                  rows={2}
                  value={instructions}
                  onChange={(e) => setInstructions(e.target.value)}
                  placeholder="Leave with security guard, extra popcorn seasoning on side..."
                  className="w-full bg-[#FFFDD0] border-2 border-[#5C0614] rounded-xl p-3 text-[#5C0614] outline-none focus:border-[#C41E3A]"
                />
              </div>
            </div>

            {/* Sidebar Summary */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-white border-4 border-[#C41E3A] rounded-3xl p-6 sm:p-8 space-y-6 shadow-[8px_8px_0px_#5C0614] sticky top-28">
                <div className="flex items-center justify-between border-b-2 border-[#5C0614]/20 pb-4">
                  <div className="flex items-center gap-2">
                    <Ticket className="w-5 h-5 text-[#C41E3A]" />
                    <h3 className="text-lg font-black uppercase text-[#5C0614] font-serif">Admission Manifest</h3>
                  </div>
                  <span className="px-2.5 py-0.5 bg-[#FFD54F] text-[#5C0614] font-mono text-[10px] font-black uppercase rounded-full border border-[#5C0614]">
                    BIG TOP
                  </span>
                </div>

                {/* Items */}
                <div className="max-h-60 overflow-y-auto space-y-2 pr-1 font-mono text-xs">
                  {cart.items.map((it) => (
                    <div key={it.cart_key} className="flex justify-between items-center text-[#5C0614]/80 border-b border-[#5C0614]/10 pb-2">
                      <span className="truncate pr-2 font-bold">
                        {it.quantity}x {it.name}
                      </span>
                      <span className="text-[#5C0614] font-black shrink-0">{api.formatPrice(it.line_total)}</span>
                    </div>
                  ))}
                </div>

                {/* Totals */}
                <div className="space-y-2 font-mono text-xs font-bold border-t-2 border-[#5C0614]/20 pt-4">
                  <div className="flex justify-between text-[#5C0614]/80">
                    <span>SUBTOTAL:</span>
                    <span className="text-[#5C0614] font-black">{api.formatPrice(cart.subtotal)}</span>
                  </div>
                  {cart.discount_amount > 0 && (
                    <div className="flex justify-between text-[#22C55E]">
                      <span>CONCESSION:</span>
                      <span className="font-black">-{api.formatPrice(cart.discount_amount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-[#5C0614]/80">
                    <span>MIDWAY COURIER:</span>
                    <span className="text-[#5C0614] font-black">
                      {orderType === "takeaway" || cart.subtotal >= cart.free_delivery_threshold || cart.delivery_fee === 0
                        ? "FREE (COMPLIMENTARY)"
                        : api.formatPrice(cart.delivery_fee)}
                    </span>
                  </div>
                  <div className="border-t-3 border-[#5C0614] pt-3 flex justify-between items-baseline">
                    <span className="text-sm font-black uppercase text-[#5C0614]">TOTAL DUE:</span>
                    <span className="text-2xl font-black text-[#C41E3A]">{api.formatPrice(cart.total)}</span>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-[#C41E3A] hover:bg-[#a3162c] text-white text-xs font-black uppercase tracking-widest py-4 rounded-full border-2 border-[#FFD54F] shadow-[4px_4px_0px_#5C0614] transition-all disabled:opacity-50"
                >
                  {submitting ? "SEALING GOLDEN ADMISSION..." : "AUTHORIZE CARNIVAL DISPATCH &rarr;"}
                </button>
              </div>
            </div>
          </form>
        )}
      </main>

      <ConceptGFooter />
    </div>
  );
}
