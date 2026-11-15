"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ShieldCheck, Truck, Store, ArrowRight, Lock, CheckCircle2 } from "lucide-react";
import ConceptAHeader from "@/components/concept-a/Header";
import ConceptAFooter from "@/components/concept-a/Footer";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/context/ToastContext";
import * as api from "@/lib/api";

export default function ConceptACheckoutPage() {
  const router = useRouter();
  const { cart, refreshCart } = useCart();
  const { customer, addresses } = useAuth();
  const { showToast } = useToast();

  const [orderType, setOrderType] = useState<"delivery" | "takeaway">("delivery");
  const [paymentMethod, setPaymentMethod] = useState<"cod" | "pay_at_pickup">("cod");

  // Form Fields
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

  // Autofill if customer logged in
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
      setErrorMsg("Please enter your full name.");
      return;
    }
    if (phone.length < 8) {
      setErrorMsg("Please provide a valid contact phone number.");
      return;
    }
    if (orderType === "delivery" && (!address.trim() || !pincode.trim())) {
      setErrorMsg("Please provide complete delivery street address and pincode.");
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
        concept_source: "Concept A — Coquette Pinterest",
      };

      const res = await api.createOrder(payload);
      if (res.success && res.order_number) {
        await refreshCart();
        showToast("Feast confirmed! Ribbons are being tied 🎀", "success");
        router.push(`/concept-a/order-confirmation/?order=${encodeURIComponent(res.order_number)}`);
      } else {
        setErrorMsg(res.error || "Order failed. Please verify your details.");
      }
    } catch {
      setErrorMsg("Connection issue with ordering backend. Please retry.");
    } finally {
      setSubmitting(false);
    }
  };

  if (cart.items.length === 0) {
    return (
      <div className="bg-[#FFF8F9] min-h-screen text-[#3D2D2E] flex flex-col">
        <ConceptAHeader />
        <div className="max-w-md mx-auto px-6 py-32 text-center space-y-4">
          <span className="text-4xl">🧁</span>
          <h2 className="font-coquette-serif font-bold text-2xl text-gray-800">
            No dishes in feast box
          </h2>
          <p className="text-xs text-gray-500">
            Please add dishes before heading to checkout.
          </p>
          <Link
            href="/concept-a/menu/"
            className="inline-block px-6 py-3 rounded-full bg-[#E07A86] text-white text-xs font-bold uppercase tracking-wider"
          >
            Explore Menu
          </Link>
        </div>
        <ConceptAFooter />
      </div>
    );
  }

  return (
    <div className="bg-[#FFF8F9] min-h-screen text-[#3D2D2E] flex flex-col">
      <ConceptAHeader />

      <section className="pt-10 pb-6 border-b border-rose-100 bg-[#FFF0F3]/40">
        <div className="max-w-7xl mx-auto px-6">
          <span className="text-xs font-bold text-[#E07A86] uppercase tracking-wider block mb-1">
            🎀 Final Step &bull; Fresh to Order
          </span>
          <h1 className="font-coquette-serif font-black text-3xl sm:text-4xl text-[#3D2D2E]">
            Finalize Your Peachy Order
          </h1>
        </div>
      </section>

      <section className="py-12 flex-1">
        <div className="max-w-7xl mx-auto px-6">
          {errorMsg && (
            <div className="mb-6 p-4 rounded-2xl bg-rose-50 border border-rose-200 text-xs font-semibold text-rose-900 flex items-center gap-2">
              <span>⚠️</span>
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Form Steps (2 cols) */}
            <div className="lg:col-span-2 space-y-8">
              {/* Step 1: Order Type */}
              <div className="p-6 rounded-3xl bg-white border border-rose-100 shadow-sm space-y-4">
                <span className="text-xs uppercase font-bold text-[#E07A86] tracking-wider block">
                  Step 1 &bull; Dining Preference
                </span>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => {
                      setOrderType("delivery");
                      setPaymentMethod("cod");
                    }}
                    className={`p-4 rounded-2xl border text-left flex items-center gap-3 transition ${
                      orderType === "delivery"
                        ? "bg-rose-50/70 border-[#E07A86] text-[#3D2D2E]"
                        : "bg-white border-gray-200 text-gray-600 hover:border-gray-300"
                    }`}
                  >
                    <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-lg shadow-sm">
                      🛵
                    </div>
                    <div>
                      <span className="font-bold text-xs uppercase tracking-wide block">
                        Home Delivery
                      </span>
                      <span className="text-[11px] text-gray-500">Delivered hot in 30-45 mins</span>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setOrderType("takeaway");
                      setPaymentMethod("pay_at_pickup");
                    }}
                    className={`p-4 rounded-2xl border text-left flex items-center gap-3 transition ${
                      orderType === "takeaway"
                        ? "bg-rose-50/70 border-[#E07A86] text-[#3D2D2E]"
                        : "bg-white border-gray-200 text-gray-600 hover:border-gray-300"
                    }`}
                  >
                    <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-lg shadow-sm">
                      🛍️
                    </div>
                    <div>
                      <span className="font-bold text-xs uppercase tracking-wide block">
                        Self Takeaway
                      </span>
                      <span className="text-[11px] text-gray-500">Ready at Garden Ave bistro</span>
                    </div>
                  </button>
                </div>
              </div>

              {/* Step 2: Customer Contact */}
              <div className="p-6 rounded-3xl bg-white border border-rose-100 shadow-sm space-y-4">
                <span className="text-xs uppercase font-bold text-[#E07A86] tracking-wider block">
                  Step 2 &bull; Customer Information
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-gray-700 block mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Aanya Sharma"
                      className="w-full px-4 py-2.5 rounded-xl border border-rose-200 bg-rose-50/30 text-xs focus:outline-none focus:ring-2 focus:ring-[#E07A86]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-gray-700 block mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98112 34567"
                      className="w-full px-4 py-2.5 rounded-xl border border-rose-200 bg-rose-50/30 text-xs focus:outline-none focus:ring-2 focus:ring-[#E07A86]"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="text-xs font-bold text-gray-700 block mb-1">
                      Email Address (for Receipt & Order Confirmation) *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="aanya@example.com"
                      className="w-full px-4 py-2.5 rounded-xl border border-rose-200 bg-rose-50/30 text-xs focus:outline-none focus:ring-2 focus:ring-[#E07A86]"
                    />
                  </div>
                </div>
              </div>

              {/* Step 3: Destination Address (if delivery) */}
              {orderType === "delivery" && (
                <div className="p-6 rounded-3xl bg-white border border-rose-100 shadow-sm space-y-4">
                  <span className="text-xs uppercase font-bold text-[#E07A86] tracking-wider block">
                    Step 3 &bull; Delivery Destination
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="sm:col-span-2">
                      <label className="text-xs font-bold text-gray-700 block mb-1">
                        Street Address / Apartment *
                      </label>
                      <textarea
                        required
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        rows={2}
                        placeholder="Flat 402, Garden Residences, 24 Garden Ave..."
                        className="w-full px-4 py-2.5 rounded-xl border border-rose-200 bg-rose-50/30 text-xs focus:outline-none focus:ring-2 focus:ring-[#E07A86]"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-gray-700 block mb-1">
                        City
                      </label>
                      <input
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-rose-200 bg-rose-50/30 text-xs focus:outline-none focus:ring-2 focus:ring-[#E07A86]"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-gray-700 block mb-1">
                        Postal Pincode *
                      </label>
                      <input
                        type="text"
                        required
                        value={pincode}
                        onChange={(e) => setPincode(e.target.value)}
                        placeholder="110003"
                        className="w-full px-4 py-2.5 rounded-xl border border-rose-200 bg-rose-50/30 text-xs focus:outline-none focus:ring-2 focus:ring-[#E07A86]"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="text-xs font-bold text-gray-700 block mb-1">
                        Prominent Landmark (Optional)
                      </label>
                      <input
                        type="text"
                        value={landmark}
                        onChange={(e) => setLandmark(e.target.value)}
                        placeholder="Near Lodhi Gardens Gate 2"
                        className="w-full px-4 py-2.5 rounded-xl border border-rose-200 bg-rose-50/30 text-xs focus:outline-none focus:ring-2 focus:ring-[#E07A86]"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 4: Payment Selection */}
              <div className="p-6 rounded-3xl bg-white border border-rose-100 shadow-sm space-y-4">
                <span className="text-xs uppercase font-bold text-[#E07A86] tracking-wider block">
                  Step 4 &bull; Payment Mode
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {orderType === "delivery" ? (
                    <div
                      onClick={() => setPaymentMethod("cod")}
                      className="p-4 rounded-2xl border bg-rose-50/70 border-[#E07A86] text-xs font-bold text-[#3D2D2E] flex items-center justify-between cursor-pointer"
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="text-xl">💵</span>
                        <div>
                          <span>Cash on Delivery (COD)</span>
                          <span className="text-[10px] text-gray-500 font-normal block">
                            Pay with cash or UPI on delivery
                          </span>
                        </div>
                      </div>
                      <CheckCircle2 className="w-5 h-5 text-[#E07A86]" />
                    </div>
                  ) : (
                    <div
                      onClick={() => setPaymentMethod("pay_at_pickup")}
                      className="p-4 rounded-2xl border bg-rose-50/70 border-[#E07A86] text-xs font-bold text-[#3D2D2E] flex items-center justify-between cursor-pointer"
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="text-xl">🏪</span>
                        <div>
                          <span>Pay at Pickup Counter</span>
                          <span className="text-[10px] text-gray-500 font-normal block">
                            Cash / Cards accepted at bistro
                          </span>
                        </div>
                      </div>
                      <CheckCircle2 className="w-5 h-5 text-[#E07A86]" />
                    </div>
                  )}

                  <div className="p-4 rounded-2xl border border-gray-200 bg-gray-50/80 text-xs text-gray-400 flex items-center justify-between cursor-not-allowed">
                    <div className="flex items-center gap-2.5">
                      <span className="text-xl opacity-50">💳</span>
                      <div>
                        <span>Online Cards & Netbanking</span>
                        <span className="text-[10px] text-gray-400 block">
                          Razorpay / Stripe Gateway (Coming Soon)
                        </span>
                      </div>
                    </div>
                    <Lock className="w-4 h-4 text-gray-400" />
                  </div>
                </div>
              </div>

              {/* Special Instructions */}
              <div className="p-6 rounded-3xl bg-white border border-rose-100 shadow-sm space-y-2">
                <label className="text-xs font-bold text-gray-700 block">
                  Delivery / Packaging Notes (Optional)
                </label>
                <textarea
                  value={instructions}
                  onChange={(e) => setInstructions(e.target.value)}
                  rows={2}
                  placeholder="e.g. Please ring doorbell twice, tie extra pink ribbon for birthday..."
                  className="w-full px-4 py-2.5 rounded-xl border border-rose-200 bg-rose-50/30 text-xs focus:outline-none focus:ring-2 focus:ring-[#E07A86]"
                />
              </div>
            </div>

            {/* Sidebar Summary (1 col) */}
            <div className="space-y-6">
              <div className="p-6 rounded-3xl bg-white border border-rose-100 shadow-sm space-y-5 sticky top-28">
                <h3 className="font-coquette-serif font-bold text-lg text-[#3D2D2E]">
                  Feast Review
                </h3>

                {/* Items Mini List */}
                <div className="max-h-56 overflow-y-auto space-y-3 pr-1 divide-y divide-rose-50">
                  {cart.items.map((it) => (
                    <div key={it.cart_key} className="pt-2 first:pt-0 flex justify-between text-xs">
                      <div>
                        <span className="font-bold text-gray-900 block">{it.name} &times; {it.quantity}</span>
                        {it.customization_options?.length > 0 && (
                          <span className="text-[10px] text-gray-400 line-clamp-1">
                            {it.customization_options.map((o) => o.name).join(", ")}
                          </span>
                        )}
                      </div>
                      <span className="font-semibold text-gray-800">{api.formatPrice(it.line_total)}</span>
                    </div>
                  ))}
                </div>

                <div className="space-y-2 text-xs text-gray-600 border-t border-rose-100 pt-4">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-semibold text-gray-900">{api.formatPrice(cart.subtotal)}</span>
                  </div>
                  {cart.discount_amount > 0 && (
                    <div className="flex justify-between text-emerald-600 font-semibold">
                      <span>Promo Savings</span>
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
                  <div className="flex justify-between pt-3 border-t border-rose-100 text-lg font-bold text-[#3D2D2E]">
                    <span className="font-coquette-serif">Total Payable</span>
                    <span className="font-coquette-serif">{api.formatPrice(cart.total)}</span>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-4 rounded-full bg-gradient-to-r from-[#E07A86] to-[#F59E0B] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-rose-200/50 hover:opacity-95 disabled:opacity-50 transition"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>{submitting ? "Tying Ribbons & Booking..." : "Place Order Now 🎀"}</span>
                </button>

                <p className="text-[11px] text-gray-400 text-center leading-relaxed">
                  Your order is prepared fresh by our culinary brigade in New Delhi.
                </p>
              </div>
            </div>
          </form>
        </div>
      </section>

      <ConceptAFooter />
    </div>
  );
}
