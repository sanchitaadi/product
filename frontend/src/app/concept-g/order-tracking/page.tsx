"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Star, Ticket, Search, Clock, CheckCircle2, Flame, Bike, MapPin } from "lucide-react";
import ConceptGHeader from "@/components/concept-g/Header";
import ConceptGFooter from "@/components/concept-g/Footer";
import * as api from "@/lib/api";

const STEPS = [
  { key: "Pending", label: "Ticket Admitted", icon: Clock, desc: "Turnstile log" },
  { key: "Accepted", label: "Ringmaster Cleared", icon: CheckCircle2, desc: "Order routed to chef" },
  { key: "Preparing", label: "Big Top Firing", icon: Flame, desc: "Ovens roaring at 480°C" },
  { key: "Out for delivery", label: "Midway Parade", icon: Bike, desc: "Fast-courier transit" },
  { key: "Delivered", label: "Arrived at Box", icon: MapPin, desc: "Showtime feast served" },
];

function OrderTrackingContent() {
  const searchParams = useSearchParams();
  const initialOrder = searchParams.get("order") || "";

  const [orderNumber, setOrderNumber] = useState(initialOrder);
  const [phone, setPhone] = useState("");
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const fetchTracking = async (num: string, ph: string) => {
    if (!num.trim()) return;
    setLoading(true);
    setErrorMsg("");
    try {
      const res = await api.trackOrder(num.trim(), ph.trim());
      if (res.success && res.order) {
        setOrder(res.order);
      } else {
        setErrorMsg(res.error || "Order reference not located on active fairground radar.");
        setOrder(null);
      }
    } catch {
      setErrorMsg("Carnival radar temporarily offline.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (initialOrder) fetchTracking(initialOrder, "");
  }, [initialOrder]);

  const currentIdx = order
    ? STEPS.findIndex((s) => s.key.toLowerCase() === order.order_status?.toLowerCase())
    : -1;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
      {/* Search Radar Box */}
      <div className="bg-white border-4 border-[#C41E3A] rounded-3xl p-8 sm:p-12 mb-12 shadow-[10px_10px_0px_#5C0614] space-y-6">
        <div className="max-w-xl mx-auto text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#FFD54F] text-[#5C0614] font-black text-xs uppercase tracking-widest rounded-full border-2 border-[#5C0614]">
            <Star className="w-3.5 h-3.5 fill-[#5C0614]" />
            LIVE TELEMETRY &bull; FAIRGROUND PARADE RADAR
          </div>
          <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-[#5C0614] font-serif">
            Carnival Order Radar
          </h1>
          <p className="text-xs sm:text-sm text-[#5C0614]/80 font-medium">
            Enter your golden admission ticket reference number to monitor the parade progression of your meal.
          </p>
        </div>

        {/* Search Input */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            fetchTracking(orderNumber, phone);
          }}
          className="flex flex-col sm:flex-row gap-3 pt-4 max-w-xl mx-auto"
        >
          <input
            type="text"
            placeholder="Ticket / Order # (e.g. ORD-2026-0001)"
            value={orderNumber}
            onChange={(e) => setOrderNumber(e.target.value.toUpperCase())}
            className="flex-1 bg-[#FFFDD0] border-2 border-[#5C0614] rounded-full p-3 text-xs font-mono font-bold text-[#5C0614] outline-none focus:border-[#C41E3A]"
          />
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 bg-[#C41E3A] hover:bg-[#a3162c] text-white text-xs font-black uppercase tracking-wider rounded-full border-2 border-[#FFD54F] shadow-[3px_3px_0px_#5C0614] transition-transform active:scale-95 flex items-center justify-center gap-2"
          >
            <Search className="w-4 h-4" />
            {loading ? "SEARCHING..." : "PING RADAR"}
          </button>
        </form>

        {errorMsg && (
          <p className="text-xs font-mono font-bold text-[#C41E3A] text-center pt-2">{errorMsg}</p>
        )}
      </div>

      {/* Output Stepper */}
      {order && (
        <div className="bg-white border-4 border-[#C41E3A] rounded-3xl p-8 sm:p-12 space-y-8 shadow-[8px_8px_0px_#5C0614]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b-2 border-[#5C0614]/20 gap-4">
            <div>
              <span className="text-[10px] text-gray-500 font-mono font-bold uppercase block">
                ACTIVE GOLDEN TICKET
              </span>
              <h2 className="text-2xl font-black text-[#5C0614] font-serif tracking-tight">#{order.order_number}</h2>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-[#FFD54F] text-[#5C0614] font-black text-xs uppercase rounded-full border border-[#5C0614]">
                SHOW STATUS: {order.order_status?.toUpperCase()}
              </span>
            </div>
          </div>

          {/* Stepper Line */}
          <div className="space-y-6 pt-4">
            <span className="text-[10px] uppercase tracking-widest text-[#5C0614]/60 font-mono font-bold block">
              MIDWAY PARADE PROGRESSION
            </span>
            <div className="relative">
              <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1.5 bg-gray-200 -translate-y-1/2 z-0" />
              <div
                className="hidden md:block absolute top-1/2 left-0 h-1.5 bg-[#C41E3A] -translate-y-1/2 z-0 transition-all duration-700"
                style={{
                  width: `${Math.max(0, currentIdx) / (STEPS.length - 1) * 100}%`,
                }}
              />

              <div className="grid grid-cols-1 md:grid-cols-5 gap-6 relative z-10">
                {STEPS.map((step, idx) => {
                  const isDone = idx <= currentIdx;
                  const isCurrent = idx === currentIdx;
                  const Icon = step.icon;

                  return (
                    <div key={step.key} className="flex md:flex-col items-center md:text-center gap-4 md:gap-2">
                      <div
                        className={`w-12 h-12 rounded-full border-3 flex items-center justify-center shrink-0 transition-all duration-300 ${
                          isCurrent
                            ? "bg-[#FFD54F] border-[#5C0614] text-[#5C0614] shadow-[0_0_12px_#FFD54F] scale-110"
                            : isDone
                            ? "bg-[#C41E3A] border-[#FFD54F] text-white"
                            : "bg-white border-gray-300 text-gray-400"
                        }`}
                      >
                        <Icon className="w-5 h-5 stroke-[2.5]" />
                      </div>
                      <div>
                        <div className={`text-xs font-black uppercase ${isCurrent ? "text-[#C41E3A]" : isDone ? "text-[#5C0614]" : "text-gray-400"}`}>
                          {step.label}
                        </div>
                        <div className="text-[10px] text-gray-500 font-bold font-mono">
                          {step.desc}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t-2 border-[#5C0614]/15 font-mono text-xs">
            <div className="p-4 bg-[#FFFDD0] border-2 border-[#5C0614] rounded-2xl">
              <span className="text-[#5C0614]/60 block text-[10px] font-bold uppercase mb-1">SPECTATOR</span>
              <p className="text-[#5C0614] font-black">{order.customer_name}</p>
              <p className="text-gray-600">{order.customer_phone}</p>
            </div>
            <div className="p-4 bg-[#FFFDD0] border-2 border-[#5C0614] rounded-2xl">
              <span className="text-[#5C0614]/60 block text-[10px] font-bold uppercase mb-1">DISPATCH DROP</span>
              <p className="text-[#5C0614] font-black">{order.order_type?.toUpperCase()}</p>
              <p className="text-gray-600 truncate">{order.delivery_address || "Turnstile Counter Pickup"}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function ConceptGOrderTrackingPage() {
  return (
    <div className="bg-[#FFFDD0] min-h-screen text-[#5C0614] flex flex-col font-sans selection:bg-[#FFD54F] selection:text-[#5C0614]">
      <ConceptGHeader />
      <Suspense fallback={<div className="py-24 text-center font-mono font-bold text-[#5C0614]">CONNECTING TO PARADE RADAR...</div>}>
        <OrderTrackingContent />
      </Suspense>
      <ConceptGFooter />
    </div>
  );
}
