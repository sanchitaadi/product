"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Search, Clock, CheckCircle2, ChefHat, Bike, Home, Leaf } from "lucide-react";
import ConceptDHeader from "@/components/concept-d/Header";
import ConceptDFooter from "@/components/concept-d/Footer";
import * as api from "@/lib/api";

const STEPS = [
  { key: "Pending", label: "Registered", icon: Clock },
  { key: "Accepted", label: "Hearth Confirmed", icon: CheckCircle2 },
  { key: "Preparing", label: "Artisanal Baking", icon: ChefHat },
  { key: "Out for delivery", label: "Artisanal Courier", icon: Bike },
  { key: "Delivered", label: "Arrived at Table", icon: Home },
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
        setErrorMsg(res.error || "Order reference not located in conservatory records.");
        setOrder(null);
      }
    } catch {
      setErrorMsg("Tracking radar temporarily offline.");
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
      <div className="bg-white rounded-3xl border border-[#5E6B4E]/25 p-8 sm:p-12 mb-12 shadow-lg space-y-6">
        <div className="max-w-xl mx-auto text-center space-y-2">
          <span className="text-[10px] uppercase tracking-widest text-[#7B8E78] block">
            Conservatory Radar
          </span>
          <h1 className="text-3xl sm:text-5xl font-normal text-[#1E3F20] tracking-tight">
            Track Your Botanical Order
          </h1>
          <p className="text-xs text-[#5E6B4E]">
            Enter your order reference code and registered phone to view live progress.
          </p>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            fetchTracking(orderNumber, phone);
          }}
          className="grid grid-cols-1 sm:grid-cols-12 gap-3 max-w-xl mx-auto"
        >
          <div className="sm:col-span-6">
            <input
              type="text"
              placeholder="ORDER REFERENCE (e.g. EARTH-1084)"
              value={orderNumber}
              onChange={(e) => setOrderNumber(e.target.value)}
              className="w-full bg-[#FDFBF7] border border-[#5E6B4E]/30 rounded-full px-4 py-2.5 text-xs text-[#1E3F20] focus:border-[#5E6B4E] outline-none"
            />
          </div>
          <div className="sm:col-span-4">
            <input
              type="tel"
              placeholder="PHONE NUMBER"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full bg-[#FDFBF7] border border-[#5E6B4E]/30 rounded-full px-4 py-2.5 text-xs text-[#1E3F20] focus:border-[#5E6B4E] outline-none"
            />
          </div>
          <div className="sm:col-span-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full h-full bg-[#5E6B4E] hover:bg-[#4E5B3F] text-white text-xs font-sans uppercase tracking-wider rounded-full transition-colors"
            >
              {loading ? "..." : "Track"}
            </button>
          </div>
        </form>

        {errorMsg && (
          <p className="text-center text-xs text-[#C86D51]">
            ⚠️ {errorMsg}
          </p>
        )}
      </div>

      {order && (
        <div className="bg-[#F2EFE9] rounded-3xl border border-[#5E6B4E]/20 p-8 sm:p-12 space-y-8 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#5E6B4E]/20 gap-4">
            <div>
              <span className="text-xs text-[#7B8E78] block">ORDER NUMBER</span>
              <span className="text-2xl font-normal text-[#1E3F20]">#{order.order_number}</span>
            </div>
            <div className="bg-white rounded-full px-4 py-1.5 border border-[#5E6B4E]/20 text-xs">
              Status: <span className="text-[#C86D51] font-medium">{order.order_status}</span>
            </div>
          </div>

          {/* Stepper */}
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
            {STEPS.map((s, idx) => {
              const isPast = idx <= currentIdx;
              const isCurrent = idx === currentIdx;
              const Icon = s.icon;
              return (
                <div
                  key={s.key}
                  className={`p-4 rounded-2xl border text-center space-y-2 transition-all ${
                    isCurrent
                      ? "bg-[#5E6B4E] text-[#FDFBF7] border-[#5E6B4E] shadow-sm"
                      : isPast
                      ? "bg-white text-[#1E3F20] border-[#5E6B4E]/20"
                      : "bg-[#FDFBF7]/40 text-[#7B8E78] border-[#5E6B4E]/10"
                  }`}
                >
                  <Icon className="w-5 h-5 mx-auto" />
                  <span className="block text-[10px] uppercase tracking-wider leading-tight">
                    {s.label}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="bg-white rounded-2xl p-6 border border-[#5E6B4E]/15 space-y-2 text-xs">
            <h3 className="font-medium text-[#1E3F20]">
              Delivery Destination
            </h3>
            <p className="text-[#5E6B4E]">
              {order.customer_name} &bull; {order.customer_phone}<br />
              {order.delivery_address}, {order.city} - {order.pincode}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default function ConceptDOrderTrackingPage() {
  return (
    <div className="bg-[#FDFBF7] min-h-screen text-[#1E3F20] flex flex-col font-serif selection:bg-[#7B8E78] selection:text-white">
      <ConceptDHeader />
      <Suspense fallback={<div className="py-24 text-center">Loading radar...</div>}>
        <OrderTrackingContent />
      </Suspense>
      <ConceptDFooter />
    </div>
  );
}
