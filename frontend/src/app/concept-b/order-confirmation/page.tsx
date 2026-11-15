"use client";

import React, { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import confetti from "canvas-confetti";
import { Zap, ArrowRight, CheckCircle2 } from "lucide-react";
import ConceptBHeader from "@/components/concept-b/Header";
import ConceptBFooter from "@/components/concept-b/Footer";
import * as api from "@/lib/api";

function OrderConfirmationContent() {
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get("order") || "PP-2026-8492";
  const [order, setOrder] = useState<any>(null);

  useEffect(() => {
    try {
      confetti({
        particleCount: 90,
        spread: 80,
        origin: { y: 0.6 },
        colors: ["#FF2A55", "#FFE15D", "#121212", "#FF6B35"],
      });
    } catch {}

    api.getOrder(orderNumber).then((res) => {
      if (res.success && res.order) {
        setOrder(res.order);
      }
    });
  }, [orderNumber]);

  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <div className="bg-white rounded-2xl p-8 sm:p-12 border-4 border-black shadow-[8px_8px_0px_#000] text-center space-y-6">
        <div className="w-20 h-20 rounded-2xl bg-[#FFE15D] border-2 border-black flex items-center justify-center mx-auto text-3xl shadow-[3px_3px_0px_#000]">
          ⚡
        </div>

        <div>
          <span className="text-xs font-black uppercase tracking-widest text-[#FF2A55]">
            // ORDER LOCKED IN & COOKING
          </span>
          <h1 className="font-retro-bold font-black text-4xl sm:text-5xl uppercase tracking-tight text-black mt-1">
            YOU&apos;RE ALL SET, {order?.customer_name?.toUpperCase() || "PATRON"}!
          </h1>
          <p className="text-xs sm:text-sm font-semibold text-gray-700 mt-2 max-w-md mx-auto">
            Your drops are now being fired in our 500-degree oven at 24 Garden Avenue.
          </p>
        </div>

        <div className="inline-block px-5 py-2.5 rounded-xl bg-[#FFE15D] border-2 border-black text-xs font-black tracking-wider text-black shadow-[2px_2px_0px_#000]">
          ORDER CODE: {orderNumber}
        </div>

        {order && (
          <div className="p-6 rounded-xl bg-[#FFF9EC] border-2 border-black text-left space-y-3 text-xs font-bold">
            <div className="flex justify-between border-b-2 border-black/10 pb-2">
              <span className="text-gray-500">STATUS</span>
              <span className="text-[#FF2A55] uppercase">{order.order_status}</span>
            </div>
            <div className="flex justify-between border-b-2 border-black/10 pb-2">
              <span className="text-gray-500">TYPE</span>
              <span className="uppercase">{order.order_type}</span>
            </div>
            <div className="flex justify-between border-b-2 border-black/10 pb-2">
              <span className="text-gray-500">DESTINATION</span>
              <span>{order.delivery_address || "Pick up at Bistro"}</span>
            </div>
            <div className="flex justify-between text-base font-black pt-2">
              <span className="font-retro-bold">FINAL TOTAL</span>
              <span className="font-retro-bold">{api.formatPrice(order.final_total)}</span>
            </div>
          </div>
        )}

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href={`/concept-b/order-tracking/?order=${encodeURIComponent(orderNumber)}`}
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#FF2A55] text-white border-2 border-black font-black text-xs uppercase tracking-wider shadow-[3px_3px_0px_#000] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition flex items-center justify-center gap-2"
          >
            <span>TRACK RADAR</span>
            <ArrowRight className="w-4 h-4 stroke-[3]" />
          </Link>

          <Link
            href="/concept-b/menu/"
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-white text-black border-2 border-black font-black text-xs uppercase tracking-wider shadow-[3px_3px_0px_#000] hover:bg-[#FFE15D] transition"
          >
            BACK TO DROPS
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function ConceptBOrderConfirmationPage() {
  return (
    <div className="bg-[#FFF9EC] min-h-screen text-black flex flex-col font-sans">
      <ConceptBHeader />
      <Suspense fallback={<div className="p-20 text-center">Loading confirmation...</div>}>
        <OrderConfirmationContent />
      </Suspense>
      <ConceptBFooter />
    </div>
  );
}
