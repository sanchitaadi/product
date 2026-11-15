"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Search, CheckCircle2, Clock, ChefHat, Bike, Home, Sparkles } from "lucide-react";
import ConceptAHeader from "@/components/concept-a/Header";
import ConceptAFooter from "@/components/concept-a/Footer";
import * as api from "@/lib/api";

const STATUS_STEPS = [
  { key: "Pending", label: "Order Received", icon: Clock },
  { key: "Accepted", label: "Kitchen Confirmed", icon: CheckCircle2 },
  { key: "Preparing", label: "In the Oven & Pans", icon: ChefHat },
  { key: "Out for delivery", label: "Out with Rider", icon: Bike },
  { key: "Delivered", label: "Feast Arrived", icon: Home },
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
        setErrorMsg(res.error || "Order not found. Check order number or phone.");
        setOrder(null);
      }
    } catch {
      setErrorMsg("Unable to retrieve order radar. Check connection.");
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
    <div className="max-w-4xl mx-auto px-6 py-12">
      {/* Tracking Search Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-rose-100 shadow-sm mb-10">
        <div className="max-w-xl mx-auto text-center space-y-2 mb-6">
          <span className="text-xs uppercase tracking-widest text-[#E07A86] font-bold">
            Live Kitchen & Delivery Radar
          </span>
          <h1 className="font-coquette-serif font-black text-3xl text-[#3D2D2E]">
            Track Your Feast Box
          </h1>
          <p className="text-xs text-gray-500">
            Enter your order number (e.g. PP-2026-8492) and phone number to monitor cooking and delivery progress.
          </p>
        </div>

        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto">
          <input
            type="text"
            required
            value={orderNumber}
            onChange={(e) => setOrderNumber(e.target.value.toUpperCase())}
            placeholder="Order Number (PP-...)"
            className="flex-1 px-4 py-3 rounded-2xl border border-rose-200 bg-rose-50/30 text-xs font-mono uppercase focus:outline-none focus:ring-2 focus:ring-[#E07A86]"
          />
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Phone (optional)"
            className="w-full sm:w-44 px-4 py-3 rounded-2xl border border-rose-200 bg-rose-50/30 text-xs focus:outline-none focus:ring-2 focus:ring-[#E07A86]"
          />
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 rounded-2xl bg-gradient-to-r from-[#E07A86] to-[#F59E0B] text-white text-xs font-bold uppercase tracking-wider shadow-md hover:opacity-95 transition disabled:opacity-50"
          >
            {loading ? "Locating..." : "Radar"}
          </button>
        </form>

        {errorMsg && (
          <div className="mt-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-800 text-center max-w-xl mx-auto">
            {errorMsg}
          </div>
        )}
      </div>

      {/* Tracking Result */}
      {order && (
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-rose-100 shadow-xl space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-rose-100 gap-4">
            <div>
              <span className="text-xs uppercase tracking-wider font-bold text-[#E07A86]">
                Order {order.order_number}
              </span>
              <h2 className="font-coquette-serif font-bold text-2xl text-[#3D2D2E]">
                Status: {order.order_status}
              </h2>
              <span className="text-xs text-gray-500">
                Ordered on {order.created_at} &bull; Destination: {order.city || "New Delhi"}
              </span>
            </div>

            <div className="px-5 py-2.5 rounded-full bg-rose-50 border border-rose-200 text-xs font-bold text-[#E07A86]">
              🛵 Estimated Delivery: 25-35 mins
            </div>
          </div>

          {/* Stepper Timeline */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
            {STATUS_STEPS.map((step, idx) => {
              const Icon = step.icon;
              const isPast = idx <= (currentStatusIndex >= 0 ? currentStatusIndex : 1);
              const isCurrent = idx === currentStatusIndex;

              return (
                <div key={step.key} className="flex flex-col items-center text-center space-y-2">
                  <div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center border transition ${
                      isPast
                        ? "bg-[#E07A86] text-white border-[#E07A86] shadow-md shadow-rose-200"
                        : "bg-rose-50 text-gray-400 border-rose-100"
                    } ${isCurrent ? "ring-4 ring-rose-200 animate-pulse" : ""}`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className={`text-[11px] font-bold ${isPast ? "text-gray-900" : "text-gray-400"}`}>
                    {step.label}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Summary */}
          <div className="p-6 rounded-2xl bg-[#FFF8F9] border border-rose-100 space-y-3 text-xs">
            <h4 className="font-bold text-gray-900 uppercase tracking-wider text-[11px]">
              Dishes in this Dispatch
            </h4>
            {order.items?.map((it: any, i: number) => (
              <div key={i} className="flex justify-between text-gray-700">
                <span>{it.item_name} &times; {it.quantity}</span>
                <span className="font-semibold">{api.formatPrice(it.total_price)}</span>
              </div>
            ))}
            <div className="border-t border-rose-200/50 pt-2 flex justify-between font-bold text-sm text-[#3D2D2E]">
              <span>Amount Paid / Due</span>
              <span>{api.formatPrice(order.final_total)}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function ConceptAOrderTrackingPage() {
  return (
    <div className="bg-[#FFF8F9] min-h-screen text-[#3D2D2E] flex flex-col">
      <ConceptAHeader />
      <Suspense fallback={<div className="p-20 text-center">Loading order radar...</div>}>
        <OrderTrackingContent />
      </Suspense>
      <ConceptAFooter />
    </div>
  );
}
