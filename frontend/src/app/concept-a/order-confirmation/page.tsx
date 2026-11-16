"use client";

import React, { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import confetti from "canvas-confetti";
import { CheckCircle2, Clock, MapPin, ArrowRight, ShieldCheck, Package } from "lucide-react";
import ConceptAHeader from "@/components/concept-a/Header";
import ConceptAFooter from "@/components/concept-a/Footer";
import * as api from "@/lib/api";

function OrderConfirmationContent() {
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get("order_number") || searchParams.get("order") || "MR-2026-8492";
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#C5A059", "#D4AF37", "#B38F46", "#FFFFFF"],
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
      <div className="bg-[#13151A] rounded-2xl p-8 sm:p-12 border border-[#C5A059]/40 shadow-2xl text-center space-y-6">
        <div className="w-16 h-16 rounded-full bg-[#16181F] text-[#C5A059] border border-[#C5A059]/50 flex items-center justify-center mx-auto text-2xl">
          ✦
        </div>

        <div>
          <span className="text-xs uppercase font-mono tracking-widest text-[#C5A059] font-bold">
            Cold-Chain Order Confirmed &bull; Preparing Dispatch
          </span>
          <h1 className="font-serif font-black text-3xl sm:text-4xl text-[#F7F5F0] mt-1">
            Thank You, {order?.customer_name || "Valued Client"}!
          </h1>
          <p className="text-xs sm:text-sm text-[#A89F91] mt-2 max-w-md mx-auto font-light">
            Your reserve pantry selection is securely queued for climate-controlled packaging and express dispatch.
          </p>
        </div>

        {/* Order Tag Pill */}
        <div className="inline-block px-5 py-2.5 rounded-xl bg-[#0A0B0E] border border-[#C5A059]/30 text-xs font-mono font-bold tracking-wider text-[#F7F5F0]">
          Docket Number: <strong className="text-[#C5A059]">{orderNumber}</strong>
        </div>

        {/* Order Metadata */}
        <div className="p-6 rounded-xl bg-[#0A0B0E] border border-[#C5A059]/20 text-left space-y-3 text-xs text-[#D1C7BD] font-mono">
          <div className="flex justify-between border-b border-[#C5A059]/10 pb-2">
            <span className="text-gray-500">Method:</span>
            <span className="font-bold text-[#F7F5F0]">
              {order?.order_type === "delivery" ? "Express Cold-Chain Air Dispatch" : "Atelier Direct Pickup"}
            </span>
          </div>
          <div className="flex justify-between border-b border-[#C5A059]/10 pb-2">
            <span className="text-gray-500">Status:</span>
            <span className="text-[#C5A059] font-bold uppercase">{order?.order_status || "Processing"}</span>
          </div>
          <div className="flex justify-between border-b border-[#C5A059]/10 pb-2">
            <span className="text-gray-500">Total Settled:</span>
            <span className="font-bold text-[#F7F5F0]">{api.formatPrice(order?.total_amount || 0)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Dispatch Hub:</span>
            <span className="text-gray-300">Central Packaging Atelier, New Delhi</span>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <Link
            href={`/concept-a/order-tracking/?order_number=${orderNumber}`}
            className="px-7 py-3 rounded-xl bg-gradient-to-r from-[#C5A059] via-[#D4AF37] to-[#B38F46] text-[#0A0B0E] font-bold text-xs uppercase tracking-widest shadow-xl shadow-[#C5A059]/20 hover:brightness-110 transition flex items-center gap-2"
          >
            <span>Track Live Dispatch</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/concept-a/menu/"
            className="px-6 py-3 rounded-xl bg-[#16181F] text-[#F7F5F0] border border-[#C5A059]/30 text-xs font-mono font-bold uppercase tracking-wider hover:bg-[#1C1F27] transition"
          >
            Browse More Provisions
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function ConceptAOrderConfirmationPage() {
  return (
    <div className="bg-[#0A0B0E] min-h-screen text-[#F7F5F0] flex flex-col selection:bg-[#C5A059] selection:text-[#0A0B0E]">
      <ConceptAHeader />
      <div className="flex-1">
        <Suspense fallback={<div className="py-24 text-center text-xs font-mono text-[#C5A059]">Loading Order Details...</div>}>
          <OrderConfirmationContent />
        </Suspense>
      </div>
      <ConceptAFooter />
    </div>
  );
}
