"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Zap, Search, Clock, CheckCircle2, Flame, Bike, MapPin } from "lucide-react";
import ConceptFHeader from "@/components/concept-f/Header";
import ConceptFFooter from "@/components/concept-f/Footer";
import * as api from "@/lib/api";

const STEPS = [
  { key: "Pending", label: "Chapter Inked", icon: Clock, desc: "Order logged at pass", jp: "受注" },
  { key: "Accepted", label: "Editor Approved", icon: CheckCircle2, desc: "Chef cleared ticket", jp: "承認" },
  { key: "Preparing", label: "Hearth Blazing", icon: Flame, desc: "Ovens roaring at 480°C", jp: "調理中" },
  { key: "Out for delivery", label: "Shonen Courier", icon: Bike, desc: "High-speed transit", jp: "配達中" },
  { key: "Delivered", label: "Feast Conquered", icon: MapPin, desc: "Delivered to table", jp: "配達完了" },
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
        setErrorMsg(res.error || "Order certificate not located in active studio records.");
        setOrder(null);
      }
    } catch {
      setErrorMsg("Studio tracking radar temporarily offline.");
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
      <div className="bg-white border-4 border-black p-8 sm:p-12 mb-12 shadow-[10px_10px_0px_#000] space-y-6">
        <div className="max-w-xl mx-auto text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FFE600] text-black font-mono text-[10px] font-black uppercase tracking-widest border border-black -rotate-1">
            <Zap className="w-3.5 h-3.5 text-[#D7263D] fill-[#D7263D]" />
            LIVE TELEMETRY &bull; SHONEN RADAR
          </div>
          <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-black">
            Track Comic Order
          </h1>
          <p className="text-xs sm:text-sm text-gray-700 font-bold">
            Enter your comic order certificate number to monitor your meal in real-time.
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
            placeholder="Order / Certificate # (e.g. ORD-2026-0001)"
            value={orderNumber}
            onChange={(e) => setOrderNumber(e.target.value.toUpperCase())}
            className="flex-1 bg-[#FFFDF7] border-2 border-black focus:border-[#D7263D] p-3 text-xs font-mono font-bold text-black outline-none"
          />
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 bg-[#D7263D] hover:bg-[#b51f33] text-white text-xs font-black uppercase tracking-wider border-2 border-black shadow-[3px_3px_0px_#FFE600] transition-transform active:translate-x-0.5 active:translate-y-0.5 flex items-center justify-center gap-2"
          >
            <Search className="w-4 h-4" />
            {loading ? "SEARCHING..." : "PING RADAR"}
          </button>
        </form>

        {errorMsg && (
          <p className="text-xs font-mono font-bold text-[#D7263D] text-center pt-2">{errorMsg}</p>
        )}
      </div>

      {/* Output Stepper */}
      {order && (
        <div className="bg-white border-4 border-black p-8 sm:p-12 space-y-8 shadow-[8px_8px_0px_#000]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b-3 border-black gap-4">
            <div>
              <span className="text-[10px] text-gray-500 font-mono font-bold uppercase block">
                ACTIVE ORDER CERTIFICATE
              </span>
              <h2 className="text-2xl font-black text-black tracking-tight">#{order.order_number}</h2>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-[#FFE600] text-black font-black text-xs uppercase border-2 border-black">
                STATUS: {order.order_status?.toUpperCase()}
              </span>
            </div>
          </div>

          {/* Stepper Line */}
          <div className="space-y-6 pt-4">
            <span className="text-[10px] uppercase tracking-widest text-gray-500 font-mono font-bold block">
              ILLUSTRATED PROGRESS STORYLINE
            </span>
            <div className="relative">
              <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1.5 bg-gray-200 -translate-y-1/2 z-0" />
              <div
                className="hidden md:block absolute top-1/2 left-0 h-1.5 bg-[#D7263D] -translate-y-1/2 z-0 transition-all duration-700"
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
                            ? "bg-[#FFE600] border-black text-black shadow-[0_0_12px_#D7263D] scale-110"
                            : isDone
                            ? "bg-black border-black text-[#FFE600]"
                            : "bg-white border-gray-300 text-gray-400"
                        }`}
                      >
                        <Icon className="w-5 h-5 stroke-[2.5]" />
                      </div>
                      <div>
                        <div className={`text-xs font-black uppercase ${isCurrent ? "text-[#D7263D]" : isDone ? "text-black" : "text-gray-400"}`}>
                          {step.label}
                        </div>
                        <div className="text-[10px] text-gray-500 font-bold font-mono">
                          {step.jp} &bull; {step.desc}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Destination Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t-2 border-black/20 font-mono text-xs">
            <div className="p-4 bg-[#FFFDF7] border-2 border-black">
              <span className="text-gray-500 block text-[10px] font-bold uppercase mb-1">HERO RECIPIENT</span>
              <p className="text-black font-black">{order.customer_name}</p>
              <p className="text-gray-700">{order.customer_phone}</p>
            </div>
            <div className="p-4 bg-[#FFFDF7] border-2 border-black">
              <span className="text-gray-500 block text-[10px] font-bold uppercase mb-1">DESTINATION</span>
              <p className="text-black font-black">{order.order_type?.toUpperCase()}</p>
              <p className="text-gray-700 truncate">{order.delivery_address || "Studio Counter Pickup"}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function ConceptFOrderTrackingPage() {
  return (
    <div className="bg-[#FFFDF7] min-h-screen text-black flex flex-col font-sans selection:bg-[#FFE600] selection:text-black">
      <ConceptFHeader />
      <Suspense fallback={<div className="py-24 text-center font-mono font-bold text-black">CONNECTING TO SHONEN RADAR...</div>}>
        <OrderTrackingContent />
      </Suspense>
      <ConceptFFooter />
    </div>
  );
}
