"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Search, Zap, CheckCircle2, Clock, ChefHat, Bike, Home } from "lucide-react";
import ConceptBHeader from "@/components/concept-b/Header";
import ConceptBFooter from "@/components/concept-b/Footer";
import * as api from "@/lib/api";

const STEPS = [
  { key: "Pending", label: "ORDER RECEIVED", icon: Clock },
  { key: "Accepted", label: "KITCHEN ACCEPTED", icon: CheckCircle2 },
  { key: "Preparing", label: "IN THE FIRE OVEN", icon: ChefHat },
  { key: "Out for delivery", label: "ON THE ROAD", icon: Bike },
  { key: "Delivered", label: "DROPPED & EAT", icon: Home },
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
        setErrorMsg(res.error || "Order not found. Check your order number.");
        setOrder(null);
      }
    } catch {
      setErrorMsg("Unable to retrieve radar data.");
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
    <div className="max-w-4xl mx-auto px-6 py-12">
      <div className="bg-white rounded-2xl p-6 sm:p-8 border-4 border-black shadow-[6px_6px_0px_#000] mb-10">
        <div className="max-w-xl mx-auto text-center space-y-2 mb-6">
          <span className="text-xs font-black uppercase tracking-widest text-[#FF2A55]">
            // LIVE SATELLITE DISPATCH
          </span>
          <h1 className="font-retro-bold font-black text-3xl sm:text-4xl uppercase">
            LIVE ORDER RADAR ⚡
          </h1>
          <p className="text-xs font-semibold text-gray-700">
            Enter your order number to track oven baking and rider transit.
          </p>
        </div>

        <form onSubmit={(e) => { e.preventDefault(); fetchTracking(orderNumber, phone); }} className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto">
          <input
            type="text"
            required
            value={orderNumber}
            onChange={(e) => setOrderNumber(e.target.value.toUpperCase())}
            placeholder="ORDER CODE (PP-...)"
            className="flex-1 px-4 py-3 rounded-xl border-2 border-black bg-[#FFF9EC] text-xs font-black uppercase focus:outline-none"
          />
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 rounded-xl bg-[#FF2A55] text-white border-2 border-black font-black text-xs uppercase tracking-wider shadow-[3px_3px_0px_#000]"
          >
            {loading ? "SEARCHING..." : "LOCK ON RADAR"}
          </button>
        </form>

        {errorMsg && (
          <div className="mt-4 p-3 rounded-xl bg-rose-100 border-2 border-black text-xs font-black text-center text-rose-950">
            {errorMsg}
          </div>
        )}
      </div>

      {order && (
        <div className="bg-white rounded-2xl p-8 border-4 border-black shadow-[8px_8px_0px_#000] space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b-2 border-black gap-4">
            <div>
              <span className="text-[10px] font-black uppercase text-[#FF2A55] tracking-wider">
                RADAR CODE {order.order_number}
              </span>
              <h2 className="font-retro-bold font-black text-3xl uppercase">
                STATUS: {order.order_status}
              </h2>
              <span className="text-xs font-bold text-gray-600">
                Created: {order.created_at} &bull; Type: {order.order_type?.toUpperCase()}
              </span>
            </div>

            <div className="px-4 py-2 rounded-xl bg-[#FFE15D] border-2 border-black font-black text-xs shadow-[2px_2px_0px_#000]">
              ⚡ ETA: ~25-30 MINS
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
            {STEPS.map((s, idx) => {
              const Icon = s.icon;
              const isPast = idx <= (currentIdx >= 0 ? currentIdx : 1);
              const isCurr = idx === currentIdx;

              return (
                <div key={s.key} className="flex flex-col items-center text-center space-y-2">
                  <div
                    className={`w-12 h-12 rounded-xl border-2 border-black flex items-center justify-center transition ${
                      isPast ? "bg-[#FF2A55] text-white shadow-[2px_2px_0px_#000]" : "bg-stone-100 text-gray-400"
                    } ${isCurr ? "bg-[#FFE15D] text-black animate-bounce" : ""}`}
                  >
                    <Icon className="w-5 h-5 stroke-[2.5]" />
                  </div>
                  <span className={`text-[10px] font-black ${isPast ? "text-black" : "text-gray-400"}`}>
                    {s.label}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="p-5 rounded-xl bg-[#FFF9EC] border-2 border-black space-y-2 text-xs font-bold">
            <span className="text-[10px] font-black uppercase tracking-wider text-gray-500 block">
              ITEMS IN DROP
            </span>
            {order.items?.map((it: any, i: number) => (
              <div key={i} className="flex justify-between">
                <span>{it.item_name} &times; {it.quantity}</span>
                <span>{api.formatPrice(it.total_price)}</span>
              </div>
            ))}
            <div className="border-t-2 border-black pt-2 flex justify-between font-retro-bold font-black text-base">
              <span>TOTAL DUE / PAID</span>
              <span>{api.formatPrice(order.final_total)}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function ConceptBOrderTrackingPage() {
  return (
    <div className="bg-[#FFF9EC] min-h-screen text-black flex flex-col font-sans">
      <ConceptBHeader />
      <Suspense fallback={<div className="p-20 text-center">Loading radar...</div>}>
        <OrderTrackingContent />
      </Suspense>
      <ConceptBFooter />
    </div>
  );
}
