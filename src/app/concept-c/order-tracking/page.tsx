"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Search, Clock, CheckCircle2, ChefHat, Bike, Home, Zap } from "lucide-react";
import ConceptCHeader from "@/components/concept-c/Header";
import ConceptCFooter from "@/components/concept-c/Footer";
import * as api from "@/lib/api";

const STEPS = [
  { key: "Pending", label: "Registered", icon: Clock },
  { key: "Accepted", label: "Kitchen Confirmed", icon: CheckCircle2 },
  { key: "Preparing", label: "In Wood Oven", icon: ChefHat },
  { key: "Out for delivery", label: "Express Courier", icon: Bike },
  { key: "Delivered", label: "Delivered & Feasting", icon: Home },
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
        setErrorMsg(res.error || "Order not located in the Pop system.");
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
      {/* Search Bar Container */}
      <div className="bg-white border-4 border-black p-8 sm:p-12 mb-12 shadow-[8px_8px_0px_#FFE600] space-y-6">
        <div className="max-w-xl mx-auto text-center space-y-2">
          <span className="bg-[#FF007F] text-white text-xs font-black uppercase px-3 py-1 border-2 border-black inline-block -rotate-1">
            ⚡ LIVE STATUS RADAR ⚡
          </span>
          <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-black">
            TRACK YOUR POP ORDER
          </h1>
          <p className="text-xs font-bold text-gray-600">
            Enter your order reference code and registered phone number to view live kitchen progress.
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
              placeholder="ORDER REFERENCE (e.g. POP-1234)"
              value={orderNumber}
              onChange={(e) => setOrderNumber(e.target.value)}
              className="w-full bg-[#FFFDF7] border-3 border-black p-3 text-xs font-black uppercase focus:bg-[#FFE600]/20 focus:outline-none"
            />
          </div>
          <div className="sm:col-span-4">
            <input
              type="tel"
              placeholder="PHONE NUMBER"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full bg-[#FFFDF7] border-3 border-black p-3 text-xs font-black uppercase focus:bg-[#FFE600]/20 focus:outline-none"
            />
          </div>
          <div className="sm:col-span-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full h-full bg-[#0047FF] hover:bg-[#FF007F] text-white font-black uppercase text-xs p-3 border-2 border-black shadow-[3px_3px_0px_#000] transition-colors"
            >
              {loading ? "..." : "LOCATE"}
            </button>
          </div>
        </form>

        {errorMsg && (
          <p className="text-center text-xs font-black text-[#FF1E27] uppercase">
            ⚠️ {errorMsg}
          </p>
        )}
      </div>

      {/* Tracking Pipeline Visual */}
      {order && (
        <div className="bg-[#FFE600] border-4 border-black p-8 sm:p-12 shadow-[10px_10px_0px_#0047FF] space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b-3 border-black gap-4">
            <div>
              <span className="text-xs font-black uppercase text-black/60 block">
                ORDER REFERENCE
              </span>
              <span className="text-2xl font-black text-black">
                #{order.order_number}
              </span>
            </div>
            <div className="bg-white border-2 border-black px-4 py-2 font-black text-xs uppercase shadow-[2px_2px_0px_#000]">
              STATUS: <span className="text-[#FF007F]">{order.order_status}</span>
            </div>
          </div>

          {/* Stepper */}
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
            {STEPS.map((s, idx) => {
              const isPast = idx <= currentIdx;
              const isCurrent = idx === currentIdx;
              const Icon = s.icon;
              return (
                <div
                  key={s.key}
                  className={`p-4 border-3 border-black text-center space-y-2 transition-all ${
                    isCurrent
                      ? "bg-[#FF007F] text-white shadow-[4px_4px_0px_#000] -translate-y-1"
                      : isPast
                      ? "bg-white text-black"
                      : "bg-[#FFE600]/40 text-black/40 border-black/30"
                  }`}
                >
                  <Icon className="w-6 h-6 mx-auto stroke-[2.5]" />
                  <span className="block text-[10px] font-black uppercase tracking-wider leading-tight">
                    {s.label}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Delivery & Items Summary */}
          <div className="bg-white border-3 border-black p-6 space-y-4">
            <h3 className="text-xs font-black uppercase text-[#0047FF]">
              Recipient &amp; Delivery Destination
            </h3>
            <p className="text-sm font-bold text-black">
              {order.customer_name} &bull; {order.customer_phone}<br />
              {order.delivery_address}, {order.city} - {order.pincode}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default function ConceptCOrderTrackingPage() {
  return (
    <div className="bg-[#FFFDF7] min-h-screen text-[#111111] flex flex-col font-sans selection:bg-[#FFE600] selection:text-black">
      <ConceptCHeader />
      <Suspense fallback={<div className="py-24 text-center font-black">LOADING POP RADAR...</div>}>
        <OrderTrackingContent />
      </Suspense>
      <ConceptCFooter />
    </div>
  );
}
