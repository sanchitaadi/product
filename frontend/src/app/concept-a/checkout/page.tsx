"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ShieldCheck, Truck, Store, ArrowRight, Lock, CheckCircle2, Package } from "lucide-react";
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
      setErrorMsg("Please enter a valid phone number.");
      return;
    }
    if (orderType === "delivery" && (!address.trim() || !city.trim() || !pincode.trim())) {
      setErrorMsg("Please complete your delivery address details.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await api.createOrder({
        order_type: orderType,
        payment_method: paymentMethod,
        customer_name: name,
        customer_phone: phone,
        customer_email: email,
        delivery_address: address,
        city,
        pincode,
        landmark,
        cooking_instructions: instructions ? `[Cold-Chain Dispatch Note: ${instructions}]` : undefined,
        concept_source: "Concept A — Maison Reserve Provisions",
      });

      if (res.success && res.order_number) {
        showToast("Order placed successfully! ✦", "success");
        await refreshCart();
        router.push(`/concept-a/order-confirmation/?order_number=${res.order_number}`);
      } else {
        setErrorMsg(res.error || "Unable to process order. Please try again.");
      }
    } catch {
      setErrorMsg("Network error communicating with order server.");
    } finally {
      setSubmitting(false);
    }
  };

  if (cart.items.length === 0) {
    return (
      <div className="bg-[#0A0B0E] min-h-screen text-[#F7F5F0] flex flex-col selection:bg-[#C5A059] selection:text-[#0A0B0E]">
        <ConceptAHeader />
        <div className="py-24 text-center max-w-md mx-auto space-y-4 px-6 flex-1">
          <span className="text-4xl text-[#C5A059]">✦</span>
          <h2 className="font-serif font-bold text-2xl text-[#F7F5F0]">
            Your Reserve Hamper is Empty
          </h2>
          <p className="text-xs text-[#A89F91]">
            Please select reserve provisions before proceeding to checkout.
          </p>
          <Link
            href="/concept-a/menu/"
            className="inline-block px-6 py-3 rounded-xl bg-gradient-to-r from-[#C5A059] to-[#D4AF37] text-[#0A0B0E] text-xs font-mono font-bold uppercase tracking-widest"
          >
            Explore Reserve Catalog
          </Link>
        </div>
        <ConceptAFooter />
      </div>
    );
  }

  return (
    <div className="bg-[#0A0B0E] min-h-screen text-[#F7F5F0] flex flex-col selection:bg-[#C5A059] selection:text-[#0A0B0E]">
      <ConceptAHeader />

      <section className="pt-16 pb-10 border-b border-[#C5A059]/20 bg-[#0E1015]">
        <div className="max-w-7xl mx-auto px-6">
          <span className="text-xs font-mono font-bold text-[#C5A059] uppercase tracking-widest block mb-1">
            ✦ Final Step &bull; Climate-Controlled Packaging
          </span>
          <h1 className="font-serif font-black text-3xl sm:text-4xl text-[#F7F5F0]">
            Finalize Cold-Chain Dispatch Order
          </h1>
        </div>
      </section>

      <section className="py-16 flex-1">
        <div className="max-w-7xl mx-auto px-6">
          {errorMsg && (
            <div className="mb-6 p-4 rounded-xl bg-red-900/30 border border-red-500/50 text-xs font-semibold text-red-200 flex items-center gap-2">
              <span>⚠️</span>
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Form Steps */}
            <div className="lg:col-span-2 space-y-8">
              {/* Step 1: Dispatch Preference */}
              <div className="p-6 rounded-2xl bg-[#13151A] border border-[#C5A059]/30 shadow-xl space-y-4">
                <span className="text-xs font-mono uppercase font-bold text-[#C5A059] tracking-widest block">
                  Step 1 &bull; Dispatch Method
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => {
                      setOrderType("delivery");
                      setPaymentMethod("cod");
                    }}
                    className={`p-4 rounded-xl border text-left flex items-center gap-3 transition ${
                      orderType === "delivery"
                        ? "bg-[#16181F] border-[#C5A059] text-[#F7F5F0] shadow-md shadow-[#C5A059]/10"
                        : "bg-[#0A0B0E] border-[#C5A059]/20 text-[#A89F91] hover:border-[#C5A059]/50"
                    }`}
                  >
                    <div className="w-10 h-10 rounded-xl bg-[#0A0B0E] border border-[#C5A059]/40 flex items-center justify-center text-lg text-[#C5A059]">
                      ✈
                    </div>
                    <div>
                      <span className="font-serif font-bold text-xs uppercase tracking-wide block text-[#F7F5F0]">
                        Pan-India Express Dispatch
                      </span>
                      <span className="text-[11px] text-[#A89F91]">Insulated cold-box with gel packs</span>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setOrderType("takeaway");
                      setPaymentMethod("pay_at_pickup");
                    }}
                    className={`p-4 rounded-xl border text-left flex items-center gap-3 transition ${
                      orderType === "takeaway"
                        ? "bg-[#16181F] border-[#C5A059] text-[#F7F5F0] shadow-md shadow-[#C5A059]/10"
                        : "bg-[#0A0B0E] border-[#C5A059]/20 text-[#A89F91] hover:border-[#C5A059]/50"
                    }`}
                  >
                    <div className="w-10 h-10 rounded-xl bg-[#0A0B0E] border border-[#C5A059]/40 flex items-center justify-center text-lg text-[#C5A059]">
                      ✦
                    </div>
                    <div>
                      <span className="font-serif font-bold text-xs uppercase tracking-wide block text-[#F7F5F0]">
                        Atelier Direct Collection
                      </span>
                      <span className="text-[11px] text-[#A89F91]">Pick up at Okhla Phase III Facility</span>
                    </div>
                  </button>
                </div>
              </div>

              {/* Step 2: Recipient Details */}
              <div className="p-6 rounded-2xl bg-[#13151A] border border-[#C5A059]/30 shadow-xl space-y-4">
                <span className="text-xs font-mono uppercase font-bold text-[#C5A059] tracking-widest block">
                  Step 2 &bull; Recipient &amp; Destination Details
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-mono font-bold text-[#D1C7BD] uppercase tracking-wider block mb-1">
                      Recipient Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Julian Sterling"
                      className="w-full bg-[#0A0B0E] border border-[#C5A059]/30 rounded-xl px-3 py-2 text-xs text-[#F7F5F0] focus:outline-none focus:border-[#C5A059]"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-mono font-bold text-[#D1C7BD] uppercase tracking-wider block mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      className="w-full bg-[#0A0B0E] border border-[#C5A059]/30 rounded-xl px-3 py-2 text-xs text-[#F7F5F0] focus:outline-none focus:border-[#C5A059]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-mono font-bold text-[#D1C7BD] uppercase tracking-wider block mb-1">
                    Email Address (for Dispatch Tracking)
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="julian@estate.com"
                    className="w-full bg-[#0A0B0E] border border-[#C5A059]/30 rounded-xl px-3 py-2 text-xs text-[#F7F5F0] focus:outline-none focus:border-[#C5A059]"
                  />
                </div>

                {orderType === "delivery" && (
                  <>
                    <div>
                      <label className="text-xs font-mono font-bold text-[#D1C7BD] uppercase tracking-wider block mb-1">
                        Shipping Address (Street, Building, Suite) *
                      </label>
                      <input
                        type="text"
                        required
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="House / Penthouse / Estate No., Street"
                        className="w-full bg-[#0A0B0E] border border-[#C5A059]/30 rounded-xl px-3 py-2 text-xs text-[#F7F5F0] focus:outline-none focus:border-[#C5A059]"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="text-xs font-mono font-bold text-[#D1C7BD] uppercase tracking-wider block mb-1">
                          City *
                        </label>
                        <input
                          type="text"
                          required
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                          placeholder="New Delhi"
                          className="w-full bg-[#0A0B0E] border border-[#C5A059]/30 rounded-xl px-3 py-2 text-xs text-[#F7F5F0] focus:outline-none focus:border-[#C5A059]"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-mono font-bold text-[#D1C7BD] uppercase tracking-wider block mb-1">
                          PIN Code *
                        </label>
                        <input
                          type="text"
                          required
                          value={pincode}
                          onChange={(e) => setPincode(e.target.value)}
                          placeholder="110020"
                          className="w-full bg-[#0A0B0E] border border-[#C5A059]/30 rounded-xl px-3 py-2 text-xs text-[#F7F5F0] focus:outline-none focus:border-[#C5A059]"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-mono font-bold text-[#D1C7BD] uppercase tracking-wider block mb-1">
                          Landmark
                        </label>
                        <input
                          type="text"
                          value={landmark}
                          onChange={(e) => setLandmark(e.target.value)}
                          placeholder="Near Diplomatic Enclave"
                          className="w-full bg-[#0A0B0E] border border-[#C5A059]/30 rounded-xl px-3 py-2 text-xs text-[#F7F5F0] focus:outline-none focus:border-[#C5A059]"
                        />
                      </div>
                    </div>
                  </>
                )}

                <div>
                  <label className="text-xs font-mono font-bold text-[#D1C7BD] uppercase tracking-wider block mb-1">
                    Special Packaging &amp; Gifting Instructions
                  </label>
                  <textarea
                    rows={2}
                    value={instructions}
                    onChange={(e) => setInstructions(e.target.value)}
                    placeholder="e.g. Include personalized handwritten calligraphy note or black wax seal..."
                    className="w-full bg-[#0A0B0E] border border-[#C5A059]/30 rounded-xl px-3 py-2 text-xs text-[#F7F5F0] focus:outline-none focus:border-[#C5A059]"
                  />
                </div>
              </div>

              {/* Step 3: Payment Method */}
              <div className="p-6 rounded-2xl bg-[#13151A] border border-[#C5A059]/30 shadow-xl space-y-4">
                <span className="text-xs font-mono uppercase font-bold text-[#C5A059] tracking-widest block">
                  Step 3 &bull; Settlement Method
                </span>
                <div className="space-y-3">
                  <label className="flex items-center gap-3 p-3.5 rounded-xl border border-[#C5A059]/30 bg-[#0A0B0E] cursor-pointer hover:border-[#C5A059]">
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === "cod"}
                      onChange={() => setPaymentMethod("cod")}
                      className="accent-[#C5A059]"
                    />
                    <div className="text-xs">
                      <strong className="block text-[#F7F5F0] font-mono">
                        {orderType === "delivery" ? "Pay on Delivery (Cash / UPI / Card)" : "Pay at Atelier Pickup"}
                      </strong>
                      <span className="text-gray-400 text-[11px]">
                        Inspect cold-seal packaging upon doorstep arrival before settling.
                      </span>
                    </div>
                  </label>
                </div>
              </div>
            </div>

            {/* Right Column: Order Summary */}
            <div className="space-y-6">
              <div className="bg-[#13151A] rounded-2xl p-6 border border-[#C5A059]/30 shadow-xl space-y-4 sticky top-28">
                <h3 className="font-serif font-bold text-base text-[#F7F5F0] tracking-wide">
                  Order Manifest
                </h3>

                <div className="space-y-3 max-h-60 overflow-y-auto divide-y divide-[#C5A059]/15 pr-1">
                  {cart.items.map((item) => (
                    <div key={item.cart_key} className="pt-2 first:pt-0 flex items-center justify-between text-xs">
                      <div>
                        <span className="font-serif font-bold text-[#F7F5F0] block">{item.name}</span>
                        {item.special_instructions && (
                          <span className="text-[10px] text-[#A89F91] font-mono">
                            {item.quantity} &times; {item.special_instructions}
                          </span>
                        )}
                      </div>
                      <span className="font-mono text-[#C5A059] font-bold">
                        {api.formatPrice(item.line_total)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="space-y-2 text-xs font-mono text-[#D1C7BD] border-t border-[#C5A059]/20 pt-4">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Subtotal:</span>
                    <span>{api.formatPrice(cart.subtotal)}</span>
                  </div>
                  {cart.discount_amount > 0 && (
                    <div className="flex justify-between text-[#C5A059]">
                      <span>Privilege Discount:</span>
                      <span>-{api.formatPrice(cart.discount_amount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-gray-400">Insulated Shipping:</span>
                    <span>{cart.delivery_fee === 0 ? "FREE" : api.formatPrice(cart.delivery_fee)}</span>
                  </div>
                </div>

                <div className="flex justify-between font-serif font-bold text-lg text-[#F7F5F0] border-t border-[#C5A059]/20 pt-3">
                  <span>Grand Total:</span>
                  <span className="text-[#C5A059]">{api.formatPrice(cart.total)}</span>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-[#C5A059] via-[#D4AF37] to-[#B38F46] text-[#0A0B0E] font-bold text-xs uppercase tracking-widest shadow-xl shadow-[#C5A059]/20 hover:brightness-110 transition disabled:opacity-50"
                >
                  {submitting ? "Processing Order..." : "Confirm Cold-Chain Order ✦"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </section>

      <ConceptAFooter />
    </div>
  );
}
