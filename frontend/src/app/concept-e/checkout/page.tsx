"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Train, Check, Lock, ArrowRight, Ticket, MapPin, ShieldCheck, AlertCircle } from "lucide-react";
import ConceptEHeader from "@/components/concept-e/Header";
import ConceptEFooter from "@/components/concept-e/Footer";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/context/ToastContext";
import * as api from "@/lib/api";

export default function ConceptECheckoutPage() {
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
      setErrorMsg("Please specify passenger recipient name.");
      return;
    }
    if (phone.length < 8) {
      setErrorMsg("Please provide a valid transit contact phone.");
      return;
    }
    if (orderType === "delivery" && (!address.trim() || !pincode.trim())) {
      setErrorMsg("Please provide station delivery address and postal zone.");
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
        concept_source: "Concept E - Metro Bites",
      });

      if (res.success && res.order) {
        showToast("Boarding order issued to station kitchen!", "success");
        await refreshCart();
        router.push(`/concept-e/order-confirmation/?order_number=${res.order.order_number}`);
      } else {
        setErrorMsg(res.error || "Failed to issue boarding ticket order.");
        showToast(res.error || "Order dispatch error", "error");
      }
    } catch {
      setErrorMsg("Unable to process transit dispatch.");
      showToast("Dispatch network error", "error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-[#08142C] min-h-screen text-[#F8F6F0] flex flex-col font-sans selection:bg-[#FFD100] selection:text-[#08142C]">
      <ConceptEHeader />

      {/* Station Banner */}
      <section className="bg-[#050D1C] py-16 border-b-4 border-[#FFD100] relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#FFD100] text-[#08142C] font-mono text-xs font-black uppercase tracking-widest rounded">
            <ShieldCheck className="w-3.5 h-3.5 text-[#D71920]" />
            CONCOURSE DISPATCH &bull; PASSENGER BOARDING PASS CHECKOUT
          </div>
          <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-[#F8F6F0]">
            Platform Checkout
          </h1>
          <p className="text-sm sm:text-base text-[#94A3B8] max-w-xl mx-auto font-mono">
            Finalize your transit dispatch destination, passenger contact details, and payment authorization.
          </p>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-16 flex-1 w-full">
        {cart.items.length === 0 ? (
          <div className="py-20 text-center max-w-md mx-auto space-y-6 bg-[#0D1F42] rounded-2xl p-10 border-2 border-[#334155]">
            <span className="text-5xl">🚆</span>
            <h2 className="text-2xl font-black uppercase text-white">No Active Manifest</h2>
            <p className="text-xs text-[#94A3B8] font-mono">
              Your dining carriage has no items to checkout.
            </p>
            <Link
              href="/concept-e/menu/"
              className="inline-block bg-[#D71920] text-white text-xs font-mono font-black uppercase tracking-widest px-8 py-3.5 rounded border-2 border-[#FFD100]"
            >
              Return to Carte &rarr;
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Passenger & Dispatch Info */}
            <div className="lg:col-span-7 space-y-8 font-mono text-xs">
              {errorMsg && (
                <div className="p-4 bg-[#D71920]/20 border-2 border-[#D71920] rounded-xl flex items-center gap-3 text-white">
                  <AlertCircle className="w-5 h-5 text-[#D71920] shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* Transit Mode Selection */}
              <div className="bg-[#0D1F42] border-2 border-[#334155] rounded-2xl p-6 space-y-4">
                <span className="text-[#FFD100] font-black uppercase tracking-wider block">
                  1. SELECT TRANSIT DISPATCH MODE
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => {
                      setOrderType("delivery");
                      setPaymentMethod("cod");
                    }}
                    className={`p-4 rounded-xl border-2 text-left transition-all ${
                      orderType === "delivery"
                        ? "bg-[#050D1C] border-[#FFD100] shadow-[4px_4px_0px_#D71920]"
                        : "bg-[#08142C] border-[#334155] opacity-70 hover:opacity-100"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-black text-sm uppercase text-white">Platform Express Courier</span>
                      {orderType === "delivery" && <Check className="w-4 h-4 text-[#FFD100]" />}
                    </div>
                    <p className="text-[11px] text-[#94A3B8]">
                      Delivered directly to your residence, office, or platform waiting room.
                    </p>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setOrderType("takeaway");
                      setPaymentMethod("pay_at_pickup");
                    }}
                    className={`p-4 rounded-xl border-2 text-left transition-all ${
                      orderType === "takeaway"
                        ? "bg-[#050D1C] border-[#FFD100] shadow-[4px_4px_0px_#D71920]"
                        : "bg-[#08142C] border-[#334155] opacity-70 hover:opacity-100"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-black text-sm uppercase text-white">Concourse Counter Pickup</span>
                      {orderType === "takeaway" && <Check className="w-4 h-4 text-[#FFD100]" />}
                    </div>
                    <p className="text-[11px] text-[#94A3B8]">
                      Hot &amp; ready at Platform 01 express counter in 20 minutes.
                    </p>
                  </button>
                </div>
              </div>

              {/* Passenger Info */}
              <div className="bg-[#0D1F42] border-2 border-[#334155] rounded-2xl p-6 space-y-4">
                <span className="text-[#FFD100] font-black uppercase tracking-wider block">
                  2. PASSENGER CREDENTIALS
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[#94A3B8] font-bold uppercase mb-2">
                      Passenger Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Inspector Dev Sharma"
                      className="w-full bg-[#08142C] border-2 border-[#334155] focus:border-[#FFD100] rounded p-3 text-white outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[#94A3B8] font-bold uppercase mb-2">
                      Mobile Line *
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      className="w-full bg-[#08142C] border-2 border-[#334155] focus:border-[#FFD100] rounded p-3 text-white outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[#94A3B8] font-bold uppercase mb-2">
                    Transit E-Ticket Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="passenger@railwayexpress.com"
                    className="w-full bg-[#08142C] border-2 border-[#334155] focus:border-[#FFD100] rounded p-3 text-white outline-none"
                  />
                </div>
              </div>

              {/* Delivery Address (if delivery) */}
              {orderType === "delivery" && (
                <div className="bg-[#0D1F42] border-2 border-[#334155] rounded-2xl p-6 space-y-4">
                  <span className="text-[#FFD100] font-black uppercase tracking-wider block">
                    3. DESTINATION DISPATCH ADDRESS
                  </span>
                  <div>
                    <label className="block text-[#94A3B8] font-bold uppercase mb-2">
                      Delivery Street / Sector / Building *
                    </label>
                    <input
                      type="text"
                      required
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="e.g. Block B, 42 Connaught Circus"
                      className="w-full bg-[#08142C] border-2 border-[#334155] focus:border-[#FFD100] rounded p-3 text-white outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-[#94A3B8] font-bold uppercase mb-2">
                        City
                      </label>
                      <input
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="w-full bg-[#08142C] border-2 border-[#334155] rounded p-3 text-white outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[#94A3B8] font-bold uppercase mb-2">
                        Station Pincode *
                      </label>
                      <input
                        type="text"
                        required
                        value={pincode}
                        onChange={(e) => setPincode(e.target.value)}
                        placeholder="110001"
                        className="w-full bg-[#08142C] border-2 border-[#334155] focus:border-[#FFD100] rounded p-3 text-white outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[#94A3B8] font-bold uppercase mb-2">
                        Station Landmark
                      </label>
                      <input
                        type="text"
                        value={landmark}
                        onChange={(e) => setLandmark(e.target.value)}
                        placeholder="Near Metro Gate 4"
                        className="w-full bg-[#08142C] border-2 border-[#334155] rounded p-3 text-white outline-none"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Payment Mode */}
              <div className="bg-[#0D1F42] border-2 border-[#334155] rounded-2xl p-6 space-y-4">
                <span className="text-[#FFD100] font-black uppercase tracking-wider block">
                  {orderType === "delivery" ? "4" : "3"}. FARE SETTLEMENT METHOD
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {orderType === "delivery" ? (
                    <button
                      type="button"
                      onClick={() => setPaymentMethod("cod")}
                      className={`p-4 rounded-xl border-2 text-left transition-all ${
                        paymentMethod === "cod"
                          ? "bg-[#050D1C] border-[#FFD100] shadow-[4px_4px_0px_#D71920]"
                          : "bg-[#08142C] border-[#334155]"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold uppercase text-white">Cash / UPI on Arrival</span>
                        <Check className="w-4 h-4 text-[#FFD100]" />
                      </div>
                      <span className="text-[10px] text-[#94A3B8]">Settle fare with courier upon platform drop.</span>
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setPaymentMethod("pay_at_pickup")}
                      className={`p-4 rounded-xl border-2 text-left transition-all ${
                        paymentMethod === "pay_at_pickup"
                          ? "bg-[#050D1C] border-[#FFD100] shadow-[4px_4px_0px_#D71920]"
                          : "bg-[#08142C] border-[#334155]"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold uppercase text-white">Pay at Concourse Counter</span>
                        <Check className="w-4 h-4 text-[#FFD100]" />
                      </div>
                      <span className="text-[10px] text-[#94A3B8]">Card or Cash at Platform 01 pickup terminal.</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Carriage Instructions */}
              <div>
                <label className="block text-[#94A3B8] font-bold uppercase mb-2">
                  Carriage Delivery Instructions (Optional)
                </label>
                <textarea
                  rows={2}
                  value={instructions}
                  onChange={(e) => setInstructions(e.target.value)}
                  placeholder="e.g. Leave with security guard at Gate 2, extra chili flakes on side..."
                  className="w-full bg-[#08142C] border-2 border-[#334155] focus:border-[#FFD100] rounded p-3 text-white outline-none"
                />
              </div>
            </div>

            {/* Sidebar Manifest Fare Pass */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-[#050D1C] rounded-2xl border-4 border-[#FFD100] p-6 sm:p-8 space-y-6 shadow-[8px_8px_0px_#D71920] sticky top-28">
                <div className="flex items-center justify-between border-b-2 border-[#334155] pb-4">
                  <div className="flex items-center gap-2">
                    <Train className="w-5 h-5 text-[#FFD100]" />
                    <h3 className="text-lg font-black uppercase text-white">Boarding Summary</h3>
                  </div>
                  <span className="px-2 py-0.5 bg-[#FFD100] text-[#08142C] font-mono text-[10px] font-black rounded uppercase">
                    PF 01
                  </span>
                </div>

                {/* Items preview */}
                <div className="max-h-60 overflow-y-auto space-y-2 pr-1 font-mono text-xs">
                  {cart.items.map((it) => (
                    <div key={it.cart_key} className="flex justify-between items-center text-[#94A3B8] border-b border-[#334155]/50 pb-2">
                      <span className="truncate pr-2">
                        {it.quantity}x {it.name}
                      </span>
                      <span className="text-white font-bold shrink-0">{api.formatPrice(it.line_total)}</span>
                    </div>
                  ))}
                </div>

                {/* Totals */}
                <div className="space-y-2 font-mono text-xs border-t-2 border-[#334155] pt-4">
                  <div className="flex justify-between text-[#94A3B8]">
                    <span>SUBTOTAL:</span>
                    <span className="text-white font-bold">{api.formatPrice(cart.subtotal)}</span>
                  </div>
                  {cart.discount_amount > 0 && (
                    <div className="flex justify-between text-[#4ADE80]">
                      <span>CONCESSION:</span>
                      <span className="font-bold">-{api.formatPrice(cart.discount_amount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-[#94A3B8]">
                    <span>TRANSIT COURIER:</span>
                    <span className="text-white font-bold">
                      {orderType === "takeaway" || cart.subtotal >= cart.free_delivery_threshold || cart.delivery_fee === 0
                        ? "FREE (COMPLIMENTARY)"
                        : api.formatPrice(cart.delivery_fee)}
                    </span>
                  </div>
                  <div className="border-t-2 border-[#334155] pt-3 flex justify-between items-baseline">
                    <span className="text-sm font-black uppercase text-white">TOTAL CHARGE:</span>
                    <span className="text-2xl font-black text-[#FFD100]">{api.formatPrice(cart.total)}</span>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-[#D71920] hover:bg-[#b01318] text-white text-xs font-mono font-black uppercase tracking-widest py-4 rounded border-2 border-[#FFD100] shadow-[4px_4px_0px_#FFD100] transition-all disabled:opacity-50"
                >
                  {submitting ? "AUTHORIZING BOARDING PASS..." : "DISPATCH TRAIN CARRIAGE ORDER &rarr;"}
                </button>
              </div>
            </div>
          </form>
        )}
      </main>

      <ConceptEFooter />
    </div>
  );
}
