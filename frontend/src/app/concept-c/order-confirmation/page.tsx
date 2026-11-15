"use client";

import React, { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import confetti from "canvas-confetti";
import { ArrowRight, Zap, CheckCircle2 } from "lucide-react";
import ConceptCHeader from "@/components/concept-c/Header";
import ConceptCFooter from "@/components/concept-c/Footer";
import * as api from "@/lib/api";

function OrderConfirmationContent() {
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get("order") || "POP-2026-9042";
  const [order, setOrder] = useState<any>(null);

  useEffect(() => {
    try {
      confetti({
        particleCount: 80,
        spread: 80,
        origin: { y: 0.5 },
        colors: ["#FF007F", "#FFE600", "#0047FF", "#FF6B00", "#111111"],
      });
    } catch {}

    api.getOrder(orderNumber).then((res) => {
      if (res.success && res.order) {
        setOrder(res.order);
      }
    });
  }, [orderNumber]);

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
      <div className="bg-white border-4 border-black p-8 sm:p-12 text-center space-y-6 shadow-[10px_10px_0px_#FF007F]">
        <div className="w-20 h-20 bg-[#FFE600] border-4 border-black rounded-full flex items-center justify-center mx-auto text-4xl shadow-[4px_4px_0px_#000]">
          ⚡
        </div>

        <div className="space-y-2">
          <span className="bg-[#0047FF] text-white text-[10px] font-black uppercase px-3 py-1 border border-black inline-block">
            ★ ORDER DISPATCHED TO KITCHEN ★
          </span>
          <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-black">
            BOOM! YOUR ORDER IS IN!
          </h1>
          <p className="text-sm font-bold text-gray-700 max-w-md mx-auto">
            Thanks {order?.customer_name || "Food Lover"}! The kitchen brigade has begun firing your artisan dishes with maximum energy.
          </p>
        </div>

        <div className="inline-block px-6 py-2.5 bg-[#FFE600] border-3 border-black text-sm font-black font-mono tracking-widest shadow-[3px_3px_0px_#000]">
          ORDER #{orderNumber}
        </div>

        {order && (
          <div className="p-6 bg-[#FFFDF7] border-3 border-black text-left space-y-3 text-xs font-black">
            <div className="flex justify-between border-b-2 border-black/10 pb-2">
              <span className="text-gray-500 uppercase">Live Status</span>
              <span className="text-[#FF007F] uppercase">{order.order_status}</span>
            </div>
            <div className="flex justify-between border-b-2 border-black/10 pb-2">
              <span className="text-gray-500 uppercase">Payment Mode</span>
              <span className="uppercase">{order.payment_method}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500 uppercase">Amount Paid</span>
              <span className="text-base text-black">{api.formatPrice(order.total_amount)}</span>
            </div>
          </div>
        )}

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link
            href={`/concept-c/order-tracking/?order=${encodeURIComponent(orderNumber)}`}
            className="w-full sm:w-auto bg-[#0047FF] hover:bg-[#FF007F] text-white font-black uppercase text-xs px-8 py-3.5 border-2 border-black shadow-[3px_3px_0px_#000] transition-colors"
          >
            TRACK LIVE STATUS &rarr;
          </Link>
          <Link
            href="/concept-c/menu/"
            className="w-full sm:w-auto bg-white hover:bg-[#FFE600] text-black font-black uppercase text-xs px-8 py-3.5 border-2 border-black shadow-[3px_3px_0px_#000] transition-colors"
          >
            CONTINUE BROWSING
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function ConceptCOrderConfirmationPage() {
  return (
    <div className="bg-[#FFFDF7] min-h-screen text-[#111111] flex flex-col font-sans selection:bg-[#FFE600] selection:text-black">
      <ConceptCHeader />
      <Suspense fallback={<div className="py-24 text-center font-black">LOADING ORDER RECEIPT...</div>}>
        <OrderConfirmationContent />
      </Suspense>
      <ConceptCFooter />
    </div>
  );
}
