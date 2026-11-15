"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Train, Search, Clock, CheckCircle2, Flame, Bike, MapPin, Radio } from "lucide-react";
import ConceptEHeader from "@/components/concept-e/Header";
import ConceptEFooter from "@/components/concept-e/Footer";
import * as api from "@/lib/api";

const STEPS = [
  { key: "Pending", label: "Ticket Logged", icon: Clock, desc: "Platform 01 registry" },
  { key: "Accepted", label: "Station Approved", icon: CheckCircle2, desc: "Order routed to chef" },
  { key: "Preparing", label: "Hearth Stoking", icon: Flame, desc: "Locomotive ovens firing" },
  { key: "Out for delivery", label: "Train Courier En Route", icon: Train, desc: "High-speed transit" },
  { key: "Delivered", label: "Arrived at Destination", icon: MapPin, desc: "Journey complete" },
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
        setErrorMsg(res.error || "Order reference not located on active platform radar.");
        setOrder(null);
      }
    } catch {
      setErrorMsg("Station radar temporarily offline.");
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
      {/* Radar Console */}
      <div className="bg-[#0D1F42] rounded-2xl border-4 border-[#FFD100] p-8 sm:p-12 mb-12 shadow-[8px_8px_0px_#D71920] space-y-6">
        <div className="max-w-xl mx-auto text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FFD100] text-[#08142C] font-mono text-[10px] font-black uppercase tracking-widest rounded">
            <Radio className="w-3.5 h-3.5 text-[#D71920] animate-pulse" />
            LIVE TELEMETRY &bull; LOCOMOTIVE RADAR
          </div>
          <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white">
            Train Tracking Radar
          </h1>
          <p className="text-xs sm:text-sm text-[#94A3B8] font-mono">
            Enter your transit ticket reference number to monitor the dispatch status of your meal.
          </p>
        </div>

        {/* Search Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            fetchTracking(orderNumber, phone);
          }}
          className="flex flex-col sm:flex-row gap-3 pt-4 max-w-xl mx-auto"
        >
          <input
            type="text"
            placeholder="Order / Ticket # (e.g. ORD-2026-0001)"
            value={orderNumber}
            onChange={(e) => setOrderNumber(e.target.value.toUpperCase())}
            className="flex-1 bg-[#08142C] border-2 border-[#334155] focus:border-[#FFD100] rounded p-3 text-xs font-mono text-white outline-none"
          />
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 bg-[#D71920] hover:bg-[#b01318] text-white text-xs font-mono font-black uppercase tracking-wider rounded border border-[#FFD100] shadow-[3px_3px_0px_#FFD100] transition-transform active:translate-x-0.5 active:translate-y-0.5 flex items-center justify-center gap-2"
          >
            <Search className="w-4 h-4" />
            {loading ? "SEARCHING..." : "PING RADAR"}
          </button>
        </form>

        {errorMsg && (
          <p className="text-xs font-mono text-[#D71920] text-center pt-2">{errorMsg}</p>
        )}
      </div>

      {/* Live Stepper Output */}
      {order && (
        <div className="bg-[#050D1C] rounded-2xl border-2 border-[#334155] p-8 sm:p-12 space-y-8 font-mono text-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b-2 border-[#334155] gap-4">
            <div>
              <span className="text-[10px] text-[#94A3B8] uppercase block">ACTIVE TICKET REFERENCE</span>
              <h2 className="text-xl font-black text-[#FFD100] tracking-wider">#{order.order_number}</h2>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-[#08142C] border border-[#FFD100] text-[#FFD100] text-xs font-black uppercase rounded">
                PLATFORM: {order.order_status?.toUpperCase()}
              </span>
            </div>
          </div>

          {/* Stepper Line */}
          <div className="space-y-6 pt-4">
            <span className="text-[10px] uppercase tracking-widest text-[#94A3B8] block">
              TRAIN WAYFINDING PROGRESS
            </span>
            <div className="relative">
              <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-[#334155] -translate-y-1/2 z-0" />
              <div
                className="hidden md:block absolute top-1/2 left-0 h-1 bg-[#FFD100] -translate-y-1/2 z-0 transition-all duration-700"
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
                        className={`w-12 h-12 rounded-full border-2 flex items-center justify-center shrink-0 transition-all duration-300 ${
                          isCurrent
                            ? "bg-[#D71920] border-[#FFD100] text-white shadow-[0_0_15px_#FFD100]"
                            : isDone
                            ? "bg-[#FFD100] border-[#FFD100] text-[#08142C]"
                            : "bg-[#08142C] border-[#334155] text-[#94A3B8]"
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <div className={`text-xs font-black uppercase ${isCurrent ? "text-[#FFD100]" : isDone ? "text-white" : "text-[#94A3B8]"}`}>
                          {step.label}
                        </div>
                        <div className="text-[10px] text-[#94A3B8]">
                          {step.desc}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Destination Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-[#334155]">
            <div className="p-4 bg-[#08142C] rounded-xl border border-[#334155]">
              <span className="text-[#94A3B8] block text-[10px] uppercase mb-1">PASSENGER DETAILS</span>
              <p className="text-white font-bold">{order.customer_name}</p>
              <p className="text-[#94A3B8]">{order.customer_phone}</p>
            </div>
            <div className="p-4 bg-[#08142C] rounded-xl border border-[#334155]">
              <span className="text-[#94A3B8] block text-[10px] uppercase mb-1">DESTINATION DROP</span>
              <p className="text-white font-bold">{order.order_type?.toUpperCase()}</p>
              <p className="text-[#94A3B8] truncate">{order.delivery_address || "Concourse Counter Pickup (Platform 01)"}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function ConceptEOrderTrackingPage() {
  return (
    <div className="bg-[#08142C] min-h-screen text-[#F8F6F0] flex flex-col font-sans selection:bg-[#FFD100] selection:text-[#08142C]">
      <ConceptEHeader />
      <Suspense fallback={<div className="py-24 text-center font-mono text-white">INITIALIZING RADAR CONSOLE...</div>}>
        <OrderTrackingContent />
      </Suspense>
      <ConceptEFooter />
    </div>
  );
}
