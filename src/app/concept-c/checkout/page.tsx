"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Check, Lock, ArrowRight, Zap, ShieldCheck } from "lucide-react";
import ConceptCHeader from "@/components/concept-c/Header";
import ConceptCFooter from "@/components/concept-c/Footer";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/context/ToastContext";
import * as api from "@/lib/api";

export default function ConceptCCheckoutPage() {
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
      setErrorMsg("Please specify recipient name.");
      return;
    }
    if (phone.length < 8) {
      setErrorMsg("Please provide a valid contact number.");
      return;
    }
    if (orderType === "delivery" && (!address.trim() || !pincode.trim())) {
      setErrorMsg("Please specify complete delivery destination and pincode.");
      return;
    }

    setSubmitting(true);
    try {
      const payload = {
        name,
        phone,
        email,
        order_type: orderType,
        payment_method: paymentMethod,
        address,
        city,
        pincode,
        landmark,
        special_instructions: instructions,
        concept_source: "Concept C - Maximalist Pop Art",
      };

      const res = await api.createOrder(payload);
      if (res.success && res.order_number) {
        await refreshCart();
        showToast("Pop Art order confirmed!", "success");
        router.push(`/concept-c/order-confirmation/?order=${encodeURIComponent(res.order_number)}`);
      } else {
        setErrorMsg(res.error || "Order dispatch error. Verify submission.");
      }
    } catch {
      setErrorMsg("Pop Art dispatch server unavailable.");
    } finally {
      setSubmitting(false);
    }
  };

  if (cart.items.length === 0) {
    return (
      <div className="bg-[#FFFDF7] min-h-screen text-[#111111] flex flex-col font-sans selection:bg-[#FFE600] selection:text-black">
        <ConceptCHeader />
        <div className="max-w-md mx-auto px-6 py-32 text-center space-y-4">
          <span className="text-5xl">🎨</span>
          <h2 className="text-3xl font-black uppercase">Your Pop Crate is Empty</h2>
          <p className="text-xs font-bold text-gray-600">Please choose some dishes from the menu first.</p>
          <Link
            href="/concept-c/menu/"
            className="inline-block bg-[#0047FF] text-white px-8 py-3 text-xs font-black uppercase border-2 border-black shadow-[3px_3px_0px_#000]"
          >
            POP MENU &rarr;
          </Link>
        </div>
        <ConceptCFooter />
      </div>
    );
  }

  return (
    <div className="bg-[#FFFDF7] min-h-screen text-[#111111] flex flex-col font-sans selection:bg-[#FFE600] selection:text-black">
      <ConceptCHeader />

      {/* Checkout Banner */}
      <section className="bg-[#0047FF] text-white py-16 border-b-4 border-black text-center space-y-3 relative">
        <span className="bg-[#FFE600] text-black text-xs font-black uppercase px-3 py-1 border-2 border-black inline-block -rotate-2">
          ⚡ INSTANT DISPATCH ⚡
        </span>
        <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tight">
          FINAL ORDER CHECKOUT
        </h1>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-16 flex-1 w-full">
        {errorMsg && (
          <div className="mb-8 p-4 bg-[#FF1E27] text-white font-black uppercase text-xs border-3 border-black shadow-[4px_4px_0px_#000]">
            ⚠️ {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Form: Delivery & Contact details */}
          <div className="lg:col-span-7 space-y-6">
            {/* Order Type Toggle */}
            <div className="bg-white border-4 border-black p-6 shadow-[6px_6px_0px_#000] space-y-3">
              <h3 className="text-sm font-black uppercase text-[#0047FF]">
                1. Delivery or Takeaway?
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setOrderType("delivery")}
                  className={`p-3 text-xs font-black uppercase border-3 border-black transition-all ${
                    orderType === "delivery"
                      ? "bg-[#FFE600] text-black shadow-[3px_3px_0px_#000]"
                      : "bg-[#FFFDF7] text-gray-700"
                  }`}
                >
                  🚀 Home Delivery
                </button>
                <button
                  type="button"
                  onClick={() => setOrderType("takeaway")}
                  className={`p-3 text-xs font-black uppercase border-3 border-black transition-all ${
                    orderType === "takeaway"
                      ? "bg-[#FFE600] text-black shadow-[3px_3px_0px_#000]"
                      : "bg-[#FFFDF7] text-gray-700"
                  }`}
                >
                  🛍️ Store Pickup
                </button>
              </div>
            </div>

            {/* Recipient Details */}
            <div className="bg-white border-4 border-black p-6 shadow-[6px_6px_0px_#000] space-y-4">
              <h3 className="text-sm font-black uppercase text-[#FF007F]">
                2. Contact &amp; Recipient
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-black uppercase mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Roy Lichtenstein"
                    className="w-full bg-[#FFFDF7] border-3 border-black p-2.5 text-xs font-bold focus:bg-[#FFE600]/20 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-black uppercase mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full bg-[#FFFDF7] border-3 border-black p-2.5 text-xs font-bold focus:bg-[#FFE600]/20 focus:outline-none"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs font-black uppercase mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="roy@popart.com"
                    className="w-full bg-[#FFFDF7] border-3 border-black p-2.5 text-xs font-bold focus:bg-[#FFE600]/20 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Address (if Delivery) */}
            {orderType === "delivery" && (
              <div className="bg-white border-4 border-black p-6 shadow-[6px_6px_0px_#000] space-y-4">
                <h3 className="text-sm font-black uppercase text-[#0047FF]">
                  3. Delivery Destination
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-black uppercase mb-1">
                      Street Address *
                    </label>
                    <input
                      type="text"
                      required
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="Flat 4B, Metro Heights, Hauz Khas"
                      className="w-full bg-[#FFFDF7] border-3 border-black p-2.5 text-xs font-bold focus:bg-[#FFE600]/20 focus:outline-none"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-black uppercase mb-1">
                        Postal Pincode *
                      </label>
                      <input
                        type="text"
                        required
                        value={pincode}
                        onChange={(e) => setPincode(e.target.value)}
                        placeholder="110016"
                        className="w-full bg-[#FFFDF7] border-3 border-black p-2.5 text-xs font-bold focus:bg-[#FFE600]/20 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-black uppercase mb-1">
                        City
                      </label>
                      <input
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="w-full bg-[#FFFDF7] border-3 border-black p-2.5 text-xs font-bold focus:bg-[#FFE600]/20 focus:outline-none"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-black uppercase mb-1">
                      Landmark / Entry Instructions
                    </label>
                    <input
                      type="text"
                      value={landmark}
                      onChange={(e) => setLandmark(e.target.value)}
                      placeholder="Opposite Art Gallery Gate"
                      className="w-full bg-[#FFFDF7] border-3 border-black p-2.5 text-xs font-bold focus:bg-[#FFE600]/20 focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Payment Method */}
            <div className="bg-white border-4 border-black p-6 shadow-[6px_6px_0px_#000] space-y-3">
              <h3 className="text-sm font-black uppercase text-[#FF6B00]">
                4. Payment Method
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setPaymentMethod("cod")}
                  className={`p-3 text-xs font-black uppercase border-3 border-black transition-all ${
                    paymentMethod === "cod"
                      ? "bg-[#FFE600] text-black shadow-[3px_3px_0px_#000]"
                      : "bg-[#FFFDF7] text-gray-700"
                  }`}
                >
                  💵 Cash on Delivery
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod("pay_at_pickup")}
                  className={`p-3 text-xs font-black uppercase border-3 border-black transition-all ${
                    paymentMethod === "pay_at_pickup"
                      ? "bg-[#FFE600] text-black shadow-[3px_3px_0px_#000]"
                      : "bg-[#FFFDF7] text-gray-700"
                  }`}
                >
                  💳 UPI / Card at Counter
                </button>
              </div>
            </div>
          </div>

          {/* Right Summary Panel */}
          <div className="lg:col-span-5">
            <div className="bg-[#FFE600] border-4 border-black p-6 sm:p-8 shadow-[8px_8px_0px_#FF007F] space-y-6 sticky top-28">
              <h2 className="text-2xl font-black uppercase tracking-tight pb-3 border-b-2 border-black">
                REVIEW CRATE ({cart.total_count})
              </h2>

              <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                {cart.items.map((i) => (
                  <div key={i.cart_key} className="flex justify-between text-xs font-black">
                    <span className="truncate pr-2">
                      {i.quantity}x {i.name}
                    </span>
                    <span>{api.formatPrice(i.line_total)}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-2 text-xs font-black uppercase border-t-2 border-b-2 border-black py-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>{api.formatPrice(cart.subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery</span>
                  <span>
                    {orderType === "takeaway" || cart.subtotal >= cart.free_delivery_threshold
                      ? "FREE"
                      : api.formatPrice(cart.delivery_fee)}
                  </span>
                </div>
                {cart.discount_amount > 0 && (
                  <div className="flex justify-between text-[#FF007F]">
                    <span>Discount ({cart.coupon_code})</span>
                    <span>-{api.formatPrice(cart.discount_amount)}</span>
                  </div>
                )}
              </div>

              <div className="flex justify-between items-center text-xl font-black">
                <span>TOTAL DUE</span>
                <span className="text-2xl">{api.formatPrice(cart.total)}</span>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-[#FF007F] hover:bg-black text-white font-black uppercase text-base py-4 border-4 border-black shadow-[4px_4px_0px_#000] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all"
              >
                {submitting ? "DISPATCHING ORDER..." : "PLACE POP ORDER NOW &rarr;"}
              </button>
            </div>
          </div>
        </form>
      </main>

      <ConceptCFooter />
    </div>
  );
}
