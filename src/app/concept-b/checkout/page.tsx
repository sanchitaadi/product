"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Zap, Lock, CheckCircle2, ArrowRight } from "lucide-react";
import ConceptBHeader from "@/components/concept-b/Header";
import ConceptBFooter from "@/components/concept-b/Footer";
import RetroSoundProvider, { useRetroSound } from "@/components/concept-b/RetroSoundFX";
import RetroCustomCursor from "@/components/concept-b/RetroCustomCursor";
import RetroScrollProgress from "@/components/concept-b/RetroScrollProgress";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/context/ToastContext";
import * as api from "@/lib/api";

function ConceptBCheckoutContent() {
  const router = useRouter();
  const { cart, refreshCart } = useCart();
  const { customer, addresses } = useAuth();
  const { showToast } = useToast();

  const [orderType, setOrderType] = useState<"delivery" | "takeaway">("delivery");
  const [paymentMethod, setPaymentMethod] = useState<"cod" | "pay_at_pickup">("cod");

  // Form
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
      setErrorMsg("Please enter your name.");
      return;
    }
    if (phone.length < 8) {
      setErrorMsg("Please provide a valid phone number.");
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
        concept_source: "Concept B — Retro Gen-Z",
      };

      const res = await api.createOrder(payload);
      if (res.success && res.order_number) {
        await refreshCart();
        showToast("BOOM! Order dropped into kitchen queue ⚡", "success");
        router.push(`/concept-b/order-confirmation/?order=${encodeURIComponent(res.order_number)}`);
      } else {
        setErrorMsg(res.error || "Order dropped. Check all fields.");
      }
    } catch {
      setErrorMsg("Unable to communicate with ordering backend. Try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (cart.items.length === 0) {
    return (
      <div className="bg-[#FFF9EC] min-h-screen text-black flex flex-col font-sans">
        <ConceptBHeader />
        <div className="max-w-md mx-auto px-6 py-32 text-center space-y-4">
          <span className="text-4xl">⚡</span>
          <h2 className="font-retro-bold font-black text-3xl">YOUR BAG IS EMPTY</h2>
          <p className="text-xs font-semibold text-gray-700">Add some drops before checking out!</p>
          <Link
            href="/concept-b/menu/"
            className="inline-block px-6 py-3 rounded-xl bg-black text-white text-xs font-black uppercase"
          >
            SEE MENU DROPS
          </Link>
        </div>
        <ConceptBFooter />
      </div>
    );
  }

  return (
    <div className="bg-[#FFF9EC] min-h-screen text-black flex flex-col font-sans selection:bg-[#FFE15D] selection:text-black relative overflow-x-clip">
      {/* Top Retro Scroll Progress */}
      <RetroScrollProgress />

      {/* Desktop Custom Cursor */}
      <RetroCustomCursor />

      <ConceptBHeader />

      <section className="py-8 bg-[#FFE15D] border-b-4 border-black">
        <div className="max-w-7xl mx-auto px-6">
          <span className="text-[10px] font-black uppercase tracking-wider text-black block mb-1">
            ⚡ FINAL STEP
          </span>
          <h1 className="font-retro-bold font-black text-3xl sm:text-5xl uppercase tracking-tight">
            LOCK IN YOUR ORDER
          </h1>
        </div>
      </section>

      <section className="py-12 flex-1">
        <div className="max-w-7xl mx-auto px-6">
          {errorMsg && (
            <div className="mb-6 p-4 rounded-xl bg-rose-100 border-2 border-black text-xs font-black text-rose-950 flex items-center gap-2 shadow-[2px_2px_0px_#000]">
              <span>⚠️</span>
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Steps (2 cols) */}
            <div className="lg:col-span-2 space-y-8">
              {/* Step 1: Type */}
              <div className="p-6 rounded-2xl bg-white border-2 border-black shadow-[4px_4px_0px_#000] space-y-4">
                <span className="text-xs font-black uppercase text-[#FF2A55] tracking-wider block">
                  STEP 1 &bull; ORDER TYPE
                </span>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => {
                      setOrderType("delivery");
                      setPaymentMethod("cod");
                    }}
                    className={`p-4 rounded-xl border-2 border-black text-left flex items-center gap-3 transition ${
                      orderType === "delivery"
                        ? "bg-[#FFE15D] shadow-[3px_3px_0px_#000]"
                        : "bg-white hover:bg-stone-50"
                    }`}
                  >
                    <span className="text-2xl">🛵</span>
                    <div>
                      <span className="font-retro-bold font-black text-xs uppercase block">
                        DOORSTEP DELIVERY
                      </span>
                      <span className="text-[10px] font-bold text-gray-700">30-45 MIN RADAR</span>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setOrderType("takeaway");
                      setPaymentMethod("pay_at_pickup");
                    }}
                    className={`p-4 rounded-xl border-2 border-black text-left flex items-center gap-3 transition ${
                      orderType === "takeaway"
                        ? "bg-[#FFE15D] shadow-[3px_3px_0px_#000]"
                        : "bg-white hover:bg-stone-50"
                    }`}
                  >
                    <span className="text-2xl">🛍️</span>
                    <div>
                      <span className="font-retro-bold font-black text-xs uppercase block">
                        PICKUP AT BISTRO
                      </span>
                      <span className="text-[10px] font-bold text-gray-700">READY AT 24 GARDEN AVE</span>
                    </div>
                  </button>
                </div>
              </div>

              {/* Step 2: Contact */}
              <div className="p-6 rounded-2xl bg-white border-2 border-black shadow-[4px_4px_0px_#000] space-y-4">
                <span className="text-xs font-black uppercase text-[#FF2A55] tracking-wider block">
                  STEP 2 &bull; YOUR DETAILS
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-bold">
                  <div>
                    <label className="block mb-1">YOUR NAME *</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Kabir Sen"
                      className="w-full px-3.5 py-2.5 rounded-xl border-2 border-black bg-[#FFF9EC] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block mb-1">PHONE NUMBER *</label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98112 34567"
                      className="w-full px-3.5 py-2.5 rounded-xl border-2 border-black bg-[#FFF9EC] focus:outline-none"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block mb-1">EMAIL (FOR RECEIPT) *</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="kabir@example.com"
                      className="w-full px-3.5 py-2.5 rounded-xl border-2 border-black bg-[#FFF9EC] focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Step 3: Address */}
              {orderType === "delivery" && (
                <div className="p-6 rounded-2xl bg-white border-2 border-black shadow-[4px_4px_0px_#000] space-y-4">
                  <span className="text-xs font-black uppercase text-[#FF2A55] tracking-wider block">
                    STEP 3 &bull; DELIVERY DESTINATION
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-bold">
                    <div className="sm:col-span-2">
                      <label className="block mb-1">STREET ADDRESS / FLAT *</label>
                      <textarea
                        required
                        rows={2}
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="Flat 402, Garden Residences..."
                        className="w-full px-3.5 py-2.5 rounded-xl border-2 border-black bg-[#FFF9EC] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block mb-1">CITY</label>
                      <input
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border-2 border-black bg-[#FFF9EC] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block mb-1">PINCODE *</label>
                      <input
                        type="text"
                        required
                        value={pincode}
                        onChange={(e) => setPincode(e.target.value)}
                        placeholder="110003"
                        className="w-full px-3.5 py-2.5 rounded-xl border-2 border-black bg-[#FFF9EC] focus:outline-none"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block mb-1">LANDMARK (OPTIONAL)</label>
                      <input
                        type="text"
                        value={landmark}
                        onChange={(e) => setLandmark(e.target.value)}
                        placeholder="Near Lodhi Gardens Gate 2"
                        className="w-full px-3.5 py-2.5 rounded-xl border-2 border-black bg-[#FFF9EC] focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 4: Payment */}
              <div className="p-6 rounded-2xl bg-white border-2 border-black shadow-[4px_4px_0px_#000] space-y-4">
                <span className="text-xs font-black uppercase text-[#FF2A55] tracking-wider block">
                  STEP 4 &bull; PAYMENT MODE
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {orderType === "delivery" ? (
                    <div
                      onClick={() => setPaymentMethod("cod")}
                      className="p-4 rounded-xl border-2 border-black bg-[#FFE15D] text-xs font-black flex items-center justify-between cursor-pointer shadow-[3px_3px_0px_#000]"
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="text-xl">💵</span>
                        <div>
                          <span>CASH ON DELIVERY (COD)</span>
                          <span className="text-[10px] text-gray-800 font-medium block">
                            Cash or UPI on arrival
                          </span>
                        </div>
                      </div>
                      <CheckCircle2 className="w-5 h-5 text-black" />
                    </div>
                  ) : (
                    <div
                      onClick={() => setPaymentMethod("pay_at_pickup")}
                      className="p-4 rounded-xl border-2 border-black bg-[#FFE15D] text-xs font-black flex items-center justify-between cursor-pointer shadow-[3px_3px_0px_#000]"
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="text-xl">🏪</span>
                        <div>
                          <span>PAY AT PICKUP COUNTER</span>
                          <span className="text-[10px] text-gray-800 font-medium block">
                            Cards / UPI accepted
                          </span>
                        </div>
                      </div>
                      <CheckCircle2 className="w-5 h-5 text-black" />
                    </div>
                  )}

                  <div className="p-4 rounded-xl border-2 border-black bg-stone-100 text-xs text-gray-400 font-bold flex items-center justify-between cursor-not-allowed">
                    <div className="flex items-center gap-2.5">
                      <span className="text-xl opacity-40">💳</span>
                      <div>
                        <span>ONLINE PAYMENT</span>
                        <span className="text-[10px] text-gray-400 block font-normal">
                          Gateway (Coming Soon)
                        </span>
                      </div>
                    </div>
                    <Lock className="w-4 h-4" />
                  </div>
                </div>
              </div>

              {/* Special Instructions */}
              <div className="p-6 rounded-2xl bg-white border-2 border-black shadow-[4px_4px_0px_#000] space-y-2">
                <label className="text-xs font-black uppercase text-black block">
                  KITCHEN & DELIVERY NOTES (OPTIONAL)
                </label>
                <textarea
                  value={instructions}
                  onChange={(e) => setInstructions(e.target.value)}
                  rows={2}
                  placeholder="e.g. Extra spicy pizza, call when at gate..."
                  className="w-full px-3.5 py-2.5 rounded-xl border-2 border-black bg-[#FFF9EC] text-xs font-bold focus:outline-none"
                />
              </div>
            </div>

            {/* Summary (1 col) */}
            <div className="space-y-6">
              <div className="p-6 rounded-2xl bg-white border-2 border-black shadow-[6px_6px_0px_#000] space-y-5 sticky top-28">
                <h3 className="font-retro-bold font-black text-2xl uppercase">
                  DROP SUMMARY
                </h3>

                <div className="max-h-56 overflow-y-auto space-y-2.5 divide-y-2 divide-black/10 pr-1">
                  {cart.items.map((it) => (
                    <div key={it.cart_key} className="pt-2 first:pt-0 flex justify-between text-xs font-bold">
                      <div>
                        <span>{it.name} &times; {it.quantity}</span>
                        {it.customization_options?.length > 0 && (
                          <span className="text-[10px] text-gray-500 block">
                            {it.customization_options.map((o) => o.name).join(", ")}
                          </span>
                        )}
                      </div>
                      <span>{api.formatPrice(it.line_total)}</span>
                    </div>
                  ))}
                </div>

                <div className="space-y-2 text-xs font-bold border-t-2 border-black pt-4">
                  <div className="flex justify-between">
                    <span>SUBTOTAL</span>
                    <span>{api.formatPrice(cart.subtotal)}</span>
                  </div>
                  {cart.discount_amount > 0 && (
                    <div className="flex justify-between text-emerald-700 font-black">
                      <span>PROMO DISCOUNT</span>
                      <span>-{api.formatPrice(cart.discount_amount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>DELIVERY</span>
                    <span>
                      {cart.delivery_fee === 0 ? "FREE" : api.formatPrice(cart.delivery_fee)}
                    </span>
                  </div>
                  <div className="flex justify-between pt-3 border-t-2 border-black text-xl font-black text-black">
                    <span className="font-retro-bold">FINAL DUE</span>
                    <span className="font-retro-bold">{api.formatPrice(cart.total)}</span>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-4 rounded-xl bg-[#FF2A55] text-white border-2 border-black font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-[4px_4px_0px_#000] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none disabled:opacity-50 transition"
                >
                  <Zap className="w-4 h-4 fill-current" />
                  <span>{submitting ? "SENDING TO OVEN..." : "CONFIRM & DROP ORDER ⚡"}</span>
                </button>
              </div>
            </div>
          </form>
        </div>
      </section>

      <ConceptBFooter />
    </div>
  );
}

export default function ConceptBCheckoutPage() {
  return (
    <RetroSoundProvider>
      <ConceptBCheckoutContent />
    </RetroSoundProvider>
  );
}
