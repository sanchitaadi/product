"use client";

import React, { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import confetti from "canvas-confetti";
import { CheckCircle2, Clock, MapPin, ArrowRight, ShieldCheck } from "lucide-react";
import ConceptAHeader from "@/components/concept-a/Header";
import ConceptAFooter from "@/components/concept-a/Footer";
import * as api from "@/lib/api";

function OrderConfirmationContent() {
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get("order") || "PP-2026-8492";
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Shoot celebratory pastel confetti
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#E07A86", "#FFCAD4", "#FFE5D9", "#F59E0B"],
      });
    } catch {}

    api
      .getOrder(orderNumber)
      .then((res) => {
        if (res.success && res.order) {
          setOrder(res.order);
        }
      })
      .finally(() => setLoading(false));
  }, [orderNumber]);

  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <div className="bg-white rounded-3xl p-8 sm:p-12 border border-rose-100 shadow-xl text-center space-y-6">
        <div className="w-20 h-20 rounded-full bg-rose-50 text-emerald-600 flex items-center justify-center mx-auto text-3xl shadow-inner">
          🎀
        </div>

        <div>
          <span className="text-xs uppercase tracking-widest text-[#E07A86] font-bold">
            Feast Order Confirmed!
          </span>
          <h1 className="font-coquette-serif font-black text-3xl sm:text-4xl text-[#3D2D2E] mt-1">
            Thank You, {order?.customer_name || "Valued Patron"}!
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-2 max-w-md mx-auto">
            Your dining feast is officially registered in our culinary queue. Our chefs are crafting your dishes right now.
          </p>
        </div>

        {/* Order Tag Pill */}
        <div className="inline-block px-5 py-2.5 rounded-full bg-rose-50 border border-rose-200 text-xs font-mono font-bold tracking-wider text-[#3D2D2E]">
          Order Number: <strong className="text-[#E07A86]">{orderNumber}</strong>
        </div>

        {/* Order Details Card */}
        {order && (
          <div className="p-6 rounded-2xl bg-[#FFF8F9] border border-rose-100 text-left space-y-4 text-xs">
            <div className="grid grid-cols-2 gap-4 border-b border-rose-200/50 pb-4">
              <div>
                <span className="text-gray-400 block font-medium">Order Status</span>
                <span className="font-bold text-[#E07A86] text-sm">{order.order_status}</span>
              </div>
              <div>
                <span className="text-gray-400 block font-medium">Estimated Arrival</span>
                <span className="font-bold text-gray-800 text-sm">30–40 mins</span>
              </div>
            </div>

            <div>
              <span className="text-gray-400 block font-medium">Destination</span>
              <span className="font-bold text-gray-800">
                {order.order_type === "delivery"
                  ? `${order.delivery_address || ""}, ${order.city || "New Delhi"} (${order.pincode || ""})`
                  : "Self Takeaway at 24 Garden Avenue Bistro"}
              </span>
            </div>

            {/* Items */}
            {order.items && order.items.length > 0 && (
              <div className="border-t border-rose-200/50 pt-4 space-y-2">
                <span className="text-gray-400 block font-medium">Dishes Ordered</span>
                {order.items.map((it: any, idx: number) => (
                  <div key={idx} className="flex justify-between">
                    <span>
                      {it.item_name} &times; {it.quantity}
                    </span>
                    <span className="font-bold">{api.formatPrice(it.total_price)}</span>
                  </div>
                ))}
              </div>
            )}

            <div className="border-t border-rose-200/50 pt-3 flex justify-between font-bold text-sm text-[#3D2D2E]">
              <span>Final Total</span>
              <span>{api.formatPrice(order.final_total)}</span>
            </div>
          </div>
        )}

        {/* Navigation CTAs */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href={`/concept-a/order-tracking/?order=${encodeURIComponent(orderNumber)}`}
            className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-gradient-to-r from-[#E07A86] to-[#F59E0B] text-white text-xs font-bold uppercase tracking-wider shadow-md hover:opacity-95 transition flex items-center justify-center gap-2"
          >
            <span>Track Order Radar</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <Link
            href="/concept-a/menu/"
            className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-white border border-rose-200 text-xs font-bold uppercase tracking-wider text-gray-700 hover:bg-rose-50 transition"
          >
            Return to Menu
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function ConceptAOrderConfirmationPage() {
  return (
    <div className="bg-[#FFF8F9] min-h-screen text-[#3D2D2E] flex flex-col">
      <ConceptAHeader />
      <Suspense fallback={<div className="p-20 text-center">Loading confirmation...</div>}>
        <OrderConfirmationContent />
      </Suspense>
      <ConceptAFooter />
    </div>
  );
}
