"use client";

import React, { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import confetti from "canvas-confetti";
import { ArrowRight, Leaf, CheckCircle2 } from "lucide-react";
import ConceptDHeader from "@/components/concept-d/Header";
import ConceptDFooter from "@/components/concept-d/Footer";
import * as api from "@/lib/api";

function OrderConfirmationContent() {
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get("order") || "EARTH-2026-1084";
  const [order, setOrder] = useState<any>(null);

  useEffect(() => {
    try {
      confetti({
        particleCount: 60,
        spread: 60,
        origin: { y: 0.6 },
        colors: ["#5E6B4E", "#7B8E78", "#C86D51", "#FDFBF7", "#1E3F20"],
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
      <div className="bg-white rounded-3xl border border-[#5E6B4E]/25 p-8 sm:p-14 text-center space-y-6 shadow-xl">
        <div className="w-16 h-16 rounded-full bg-[#5E6B4E]/10 border border-[#5E6B4E]/30 flex items-center justify-center mx-auto text-2xl text-[#1E3F20]">
          🌿
        </div>

        <div className="space-y-2">
          <span className="text-[10px] uppercase tracking-widest text-[#7B8E78] block">
            Harvest Dispatch Confirmed
          </span>
          <h1 className="text-3xl sm:text-5xl font-normal text-[#1E3F20] tracking-tight">
            Thank You, {order?.customer_name || "Esteemed Guest"}
          </h1>
          <p className="text-xs sm:text-sm text-[#5E6B4E] max-w-md mx-auto font-light leading-relaxed">
            Your table order has been dispatched to our hearth kitchen. Every preparation is crafted to order with organic provenance.
          </p>
        </div>

        <div className="inline-block px-6 py-2 bg-[#F2EFE9] rounded-full border border-[#5E6B4E]/20 text-xs font-mono tracking-widest text-[#1E3F20]">
          REFERENCE: #{orderNumber}
        </div>

        {order && (
          <div className="p-6 bg-[#FDFBF7] rounded-2xl border border-[#5E6B4E]/15 text-left space-y-3 text-xs">
            <div className="flex justify-between border-b border-[#5E6B4E]/15 pb-2 text-[#5E6B4E]">
              <span>Preparation Status</span>
              <span className="text-[#1E3F20] font-medium">{order.order_status}</span>
            </div>
            <div className="flex justify-between border-b border-[#5E6B4E]/15 pb-2 text-[#5E6B4E]">
              <span>Payment Mode</span>
              <span className="text-[#1E3F20] uppercase font-medium">{order.payment_method}</span>
            </div>
            <div className="flex justify-between text-[#5E6B4E]">
              <span>Amount Handled</span>
              <span className="text-base text-[#1E3F20] font-medium">{api.formatPrice(order.total_amount)}</span>
            </div>
          </div>
        )}

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link
            href={`/concept-d/order-tracking/?order=${encodeURIComponent(orderNumber)}`}
            className="w-full sm:w-auto bg-[#5E6B4E] hover:bg-[#4E5B3F] text-[#FDFBF7] text-xs font-sans uppercase tracking-widest px-8 py-3.5 rounded-full transition-colors shadow-sm"
          >
            Track Order Progress &rarr;
          </Link>
          <Link
            href="/concept-d/menu/"
            className="w-full sm:w-auto bg-[#F2EFE9] text-[#1E3F20] text-xs font-sans uppercase tracking-widest px-8 py-3.5 rounded-full border border-[#5E6B4E]/20 hover:bg-[#EAE5DC] transition-colors"
          >
            Back to Carte
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function ConceptDOrderConfirmationPage() {
  return (
    <div className="bg-[#FDFBF7] min-h-screen text-[#1E3F20] flex flex-col font-serif selection:bg-[#7B8E78] selection:text-white">
      <ConceptDHeader />
      <Suspense fallback={<div className="py-24 text-center">Loading receipt...</div>}>
        <OrderConfirmationContent />
      </Suspense>
      <ConceptDFooter />
    </div>
  );
}
