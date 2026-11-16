"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Search, CheckCircle2, Clock, Package, Truck, Home, Sparkles } from "lucide-react";
import ConceptAHeader from "@/components/concept-a/Header";
import ConceptAFooter from "@/components/concept-a/Footer";
import * as api from "@/lib/api";

const STATUS_STEPS = [
  { key: "Pending", label: "Docket Queued", icon: Clock },
  { key: "Accepted", label: "Batch Verified", icon: CheckCircle2 },
  { key: "Preparing", label: "Airtight Cold Packaging", icon: Package },
  { key: "Out for delivery", label: "Express Transit", icon: Truck },
  { key: "Delivered", label: "Pantry Received", icon: Home },
];

function OrderTrackingContent() {
  const searchParams = useSearchParams();
  const initialOrder = searchParams.get("order_number") || searchParams.get("order") || "";

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
        setErrorMsg(res.error || "Order docket not found. Verify your docket number.");
        setOrder(null);
      }
    } catch {
      setErrorMsg("Unable to retrieve dispatch radar. Check connection.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (initialOrder) {
      fetchTracking(initialOrder, "");
    }
  }, [initialOrder]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchTracking(orderNumber, phone);
  };

  const currentStatusIndex = order
    ? STATUS_STEPS.findIndex((s) => s.key.toLowerCase() === order.order_status?.toLowerCase())
    : -1;

  return (
    <div className="max-w-4xl mx-auto px-6 py-16 space-y-10">
      <div className="text-center space-y-3">
        <span className="text-xs font-mono font-bold text-[#C5A059] uppercase tracking-widest block">
          ✦ Live Cold-Chain Dispatch Radar
        </span>
        <h1 className="font-serif font-black text-3xl sm:text-5xl text-[#F7F5F0]">
          Track Your Reserve Dispatch
        </h1>
        <p className="text-xs sm:text-sm text-[#A89F91] max-w-md mx-auto font-light">
          Monitor your climate-controlled shipment in real-time as it moves from our central atelier to your doorstep.
        </p>
      </div>

      {/* Search Input Box */}
      <form onSubmit={handleSearch} className="max-w-lg mx-auto bg-[#13151A] p-4 rounded-2xl border border-[#C5A059]/30 shadow-xl flex flex-col sm:flex-row gap-3">
        <div className="flex-1 relative">
          <Search className="w-4 h-4 text-gray-500 absolute left-3.5 top-3.5" />
          <input
            type="text"
            required
            value={orderNumber}
            onChange={(e) => setOrderNumber(e.target.value)}
            placeholder="Docket Number (e.g. MR-2026-8492)"
            className="w-full pl-10 pr-3 py-2.5 bg-[#0A0B0E] border border-[#C5A059]/30 rounded-xl text-xs text-[#F7F5F0] uppercase font-mono focus:outline-none focus:border-[#C5A059]"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#C5A059] via-[#D4AF37] to-[#B38F46] text-[#0A0B0E] font-bold text-xs uppercase tracking-widest hover:brightness-110 transition disabled:opacity-50"
        >
          {loading ? "Locating..." : "Track ✦"}
        </button>
      </form>

      {errorMsg && (
        <div className="max-w-lg mx-auto p-4 rounded-xl bg-red-900/30 border border-red-500/50 text-xs font-semibold text-red-200 text-center">
          {errorMsg}
        </div>
      )}

      {/* Tracking Results Card */}
      {order && (
        <div className="bg-[#13151A] rounded-2xl p-6 sm:p-10 border border-[#C5A059]/30 shadow-2xl space-y-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 border-b border-[#C5A059]/20 gap-4">
            <div>
              <span className="text-xs text-gray-400 font-mono">Docket Number</span>
              <h3 className="font-mono font-bold text-xl text-[#F7F5F0]">#{order.order_number}</h3>
            </div>
            <div className="text-left sm:text-right font-mono">
              <span className="text-xs text-gray-400">Current Phase</span>
              <div className="text-sm font-bold text-[#C5A059] uppercase">{order.order_status}</div>
            </div>
          </div>

          {/* Stepper Progress */}
          <div className="relative">
            <div className="grid grid-cols-5 gap-2 relative z-10">
              {STATUS_STEPS.map((step, idx) => {
                const isPassed = currentStatusIndex >= idx;
                const isCurrent = currentStatusIndex === idx;
                const Icon = step.icon;
                return (
                  <div key={step.key} className="flex flex-col items-center text-center space-y-2">
                    <div
                      className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center transition border ${
                        isCurrent
                          ? "bg-[#C5A059] text-[#0A0B0E] border-[#D4AF37] shadow-lg shadow-[#C5A059]/30 scale-105"
                          : isPassed
                          ? "bg-[#16181F] text-[#C5A059] border-[#C5A059]/50"
                          : "bg-[#0A0B0E] text-gray-600 border-[#C5A059]/10"
                      }`}
                    >
                      <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                    <span
                      className={`text-[10px] sm:text-xs font-mono tracking-tight leading-tight ${
                        isCurrent
                          ? "font-bold text-[#C5A059]"
                          : isPassed
                          ? "font-semibold text-[#F7F5F0]"
                          : "text-gray-600"
                      }`}
                    >
                      {step.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Order Details Preview */}
          <div className="p-5 rounded-xl bg-[#0A0B0E] border border-[#C5A059]/20 text-xs font-mono text-[#D1C7BD] space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-500">Recipient:</span>
              <span className="text-[#F7F5F0] font-bold">{order.customer_name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Destination:</span>
              <span className="text-[#F7F5F0]">{order.city || "New Delhi"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Settled Amount:</span>
              <span className="text-[#C5A059] font-bold">{api.formatPrice(order.total_amount)}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function ConceptAOrderTrackingPage() {
  return (
    <div className="bg-[#0A0B0E] min-h-screen text-[#F7F5F0] flex flex-col selection:bg-[#C5A059] selection:text-[#0A0B0E]">
      <ConceptAHeader />
      <div className="flex-1">
        <Suspense fallback={<div className="py-24 text-center text-xs font-mono text-[#C5A059]">Loading Radar...</div>}>
          <OrderTrackingContent />
        </Suspense>
      </div>
      <ConceptAFooter />
    </div>
  );
}
