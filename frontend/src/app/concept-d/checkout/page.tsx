"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Check, Lock, ArrowRight, Leaf } from "lucide-react";
import ConceptDHeader from "@/components/concept-d/Header";
import ConceptDFooter from "@/components/concept-d/Footer";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/context/ToastContext";
import * as api from "@/lib/api";

export default function ConceptDCheckoutPage() {
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
      setErrorMsg("Please provide a valid contact phone.");
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
        concept_source: "Concept D - Organic Earth",
      };

      const res = await api.createOrder(payload);
      if (res.success && res.order_number) {
        await refreshCart();
        showToast("Your botanical order has been registered.", "success");
        router.push(`/concept-d/order-confirmation/?order=${encodeURIComponent(res.order_number)}`);
      } else {
        setErrorMsg(res.error || "Order dispatch error. Verify details.");
      }
    } catch {
      setErrorMsg("Conservatory dispatch server unavailable.");
    } finally {
      setSubmitting(false);
    }
  };

  if (cart.items.length === 0) {
    return (
      <div className="bg-[#FDFBF7] min-h-screen text-[#1E3F20] flex flex-col font-serif">
        <ConceptDHeader />
        <div className="max-w-md mx-auto px-6 py-32 text-center space-y-4">
          <span className="text-4xl">🌾</span>
          <h2 className="text-2xl font-normal">Your Harvest Basket is Empty</h2>
          <p className="text-xs text-[#5E6B4E]">Please select dishes from the carte first.</p>
          <Link
            href="/concept-d/menu/"
            className="inline-block bg-[#5E6B4E] text-white px-8 py-3 rounded-full text-xs font-sans uppercase tracking-widest"
          >
            The Carte &rarr;
          </Link>
        </div>
        <ConceptDFooter />
      </div>
    );
  }

  return (
    <div className="bg-[#FDFBF7] min-h-screen text-[#1E3F20] flex flex-col font-serif selection:bg-[#7B8E78] selection:text-white">
      <ConceptDHeader />

      {/* Banner */}
      <section className="bg-[#F2EFE9] py-16 border-b border-[#5E6B4E]/20 text-center space-y-3">
        <span className="text-[11px] uppercase tracking-widest text-[#7B8E78] block">
          Order Dispatch
        </span>
        <h1 className="text-4xl sm:text-6xl font-normal text-[#1E3F20] tracking-tight">
          Complete Your Order
        </h1>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-16 flex-1 w-full">
        {errorMsg && (
          <div className="mb-8 p-4 bg-[#C86D51]/15 text-[#C86D51] rounded-xl text-xs border border-[#C86D51]/30">
            ⚠️ {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-7 space-y-6">
            {/* Order Type */}
            <div className="bg-white rounded-3xl border border-[#5E6B4E]/20 p-6 space-y-3 shadow-xs">
              <h3 className="text-xs uppercase tracking-widest text-[#7B8E78]">
                1. Order Fulfillment
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setOrderType("delivery")}
                  className={`p-3 text-xs rounded-xl border transition-all ${
                    orderType === "delivery"
                      ? "bg-[#5E6B4E] text-[#FDFBF7] border-[#5E6B4E]"
                      : "bg-[#FDFBF7] text-[#1E3F20] border-[#5E6B4E]/20"
                  }`}
                >
                  🌿 Artisanal Home Delivery
                </button>
                <button
                  type="button"
                  onClick={() => setOrderType("takeaway")}
                  className={`p-3 text-xs rounded-xl border transition-all ${
                    orderType === "takeaway"
                      ? "bg-[#5E6B4E] text-[#FDFBF7] border-[#5E6B4E]"
                      : "bg-[#FDFBF7] text-[#1E3F20] border-[#5E6B4E]/20"
                  }`}
                >
                  🧺 Conservatory Pickup
                </button>
              </div>
            </div>

            {/* Recipient Details */}
            <div className="bg-white rounded-3xl border border-[#5E6B4E]/20 p-6 space-y-4 shadow-xs">
              <h3 className="text-xs uppercase tracking-widest text-[#7B8E78]">
                2. Patron &amp; Contact
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#5E6B4E] mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Siddharth Rao"
                    className="w-full bg-[#FDFBF7] border border-[#5E6B4E]/30 rounded-xl p-2.5 text-xs focus:border-[#5E6B4E] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#5E6B4E] mb-1">
                    Contact Phone *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full bg-[#FDFBF7] border border-[#5E6B4E]/30 rounded-xl p-2.5 text-xs focus:border-[#5E6B4E] outline-none"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs uppercase tracking-wider text-[#5E6B4E] mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="sid@earth.com"
                    className="w-full bg-[#FDFBF7] border border-[#5E6B4E]/30 rounded-xl p-2.5 text-xs focus:border-[#5E6B4E] outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Address */}
            {orderType === "delivery" && (
              <div className="bg-white rounded-3xl border border-[#5E6B4E]/20 p-6 space-y-4 shadow-xs">
                <h3 className="text-xs uppercase tracking-widest text-[#7B8E78]">
                  3. Delivery Location
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#5E6B4E] mb-1">
                      Street Address *
                    </label>
                    <input
                      type="text"
                      required
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="Villa 7, Green Park Extension"
                      className="w-full bg-[#FDFBF7] border border-[#5E6B4E]/30 rounded-xl p-2.5 text-xs focus:border-[#5E6B4E] outline-none"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-[#5E6B4E] mb-1">
                        Pincode *
                      </label>
                      <input
                        type="text"
                        required
                        value={pincode}
                        onChange={(e) => setPincode(e.target.value)}
                        placeholder="110016"
                        className="w-full bg-[#FDFBF7] border border-[#5E6B4E]/30 rounded-xl p-2.5 text-xs focus:border-[#5E6B4E] outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-[#5E6B4E] mb-1">
                        City
                      </label>
                      <input
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="w-full bg-[#FDFBF7] border border-[#5E6B4E]/30 rounded-xl p-2.5 text-xs focus:border-[#5E6B4E] outline-none"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#5E6B4E] mb-1">
                      Landmark / Gate Instructions
                    </label>
                    <input
                      type="text"
                      value={landmark}
                      onChange={(e) => setLandmark(e.target.value)}
                      placeholder="Near Community Garden Gate"
                      className="w-full bg-[#FDFBF7] border border-[#5E6B4E]/30 rounded-xl p-2.5 text-xs focus:border-[#5E6B4E] outline-none"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Payment Method */}
            <div className="bg-white rounded-3xl border border-[#5E6B4E]/20 p-6 space-y-3 shadow-xs">
              <h3 className="text-xs uppercase tracking-widest text-[#7B8E78]">
                4. Payment Arrangement
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setPaymentMethod("cod")}
                  className={`p-3 text-xs rounded-xl border transition-all ${
                    paymentMethod === "cod"
                      ? "bg-[#5E6B4E] text-[#FDFBF7] border-[#5E6B4E]"
                      : "bg-[#FDFBF7] text-[#1E3F20] border-[#5E6B4E]/20"
                  }`}
                >
                  💵 Cash on Delivery
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod("pay_at_pickup")}
                  className={`p-3 text-xs rounded-xl border transition-all ${
                    paymentMethod === "pay_at_pickup"
                      ? "bg-[#5E6B4E] text-[#FDFBF7] border-[#5E6B4E]"
                      : "bg-[#FDFBF7] text-[#1E3F20] border-[#5E6B4E]/20"
                  }`}
                >
                  💳 UPI / Card at Counter
                </button>
              </div>
            </div>
          </div>

          {/* Right Summary */}
          <div className="lg:col-span-5">
            <div className="bg-[#F2EFE9] rounded-3xl border border-[#5E6B4E]/20 p-6 sm:p-8 space-y-6 sticky top-28">
              <h2 className="text-xl font-normal pb-3 border-b border-[#5E6B4E]/20">
                Harvest Review ({cart.total_count})
              </h2>

              <div className="space-y-2.5 max-h-60 overflow-y-auto pr-1">
                {cart.items.map((i) => (
                  <div key={i.cart_key} className="flex justify-between text-xs text-[#5E6B4E]">
                    <span className="truncate pr-2">
                      {i.quantity}x {i.name}
                    </span>
                    <span className="font-medium text-[#1E3F20]">{api.formatPrice(i.line_total)}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-2 text-xs border-t border-b border-[#5E6B4E]/20 py-4">
                <div className="flex justify-between text-[#5E6B4E]">
                  <span>Subtotal</span>
                  <span>{api.formatPrice(cart.subtotal)}</span>
                </div>
                <div className="flex justify-between text-[#5E6B4E]">
                  <span>Courier</span>
                  <span>
                    {orderType === "takeaway" || cart.subtotal >= cart.free_delivery_threshold
                      ? "Complimentary"
                      : api.formatPrice(cart.delivery_fee)}
                  </span>
                </div>
                {cart.discount_amount > 0 && (
                  <div className="flex justify-between text-[#C86D51]">
                    <span>Seasonal Discount</span>
                    <span>-{api.formatPrice(cart.discount_amount)}</span>
                  </div>
                )}
              </div>

              <div className="flex justify-between items-center text-lg font-medium">
                <span>Total Due</span>
                <span className="text-2xl text-[#1E3F20]">{api.formatPrice(cart.total)}</span>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-[#5E6B4E] hover:bg-[#4E5B3F] text-[#FDFBF7] font-sans text-xs uppercase tracking-widest py-4 rounded-full shadow-md transition-all"
              >
                {submitting ? "Placing Order..." : "Confirm & Place Order &rarr;"}
              </button>
            </div>
          </div>
        </form>
      </main>

      <ConceptDFooter />
    </div>
  );
}
