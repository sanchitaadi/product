"use client";

import React, { useState, useEffect } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import * as api from "@/lib/api";
import { useToast } from "@/context/ToastContext";
import {
  BarChart3,
  TrendingUp,
  DollarSign,
  PieChart,
  ShoppingBag,
  RefreshCw,
  Layers,
  Sparkles,
} from "lucide-react";

export default function AdminAnalyticsPage() {
  const { showToast } = useToast();
  const [analytics, setAnalytics] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchAnalytics = async () => {
    setLoading(true);
    try {
      const res = await api.adminGetAnalytics();
      if (res.success) {
        setAnalytics(res);
      }
    } catch (err) {
      showToast("Failed to load business analytics", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, []);

  if (loading) {
    return (
      <AdminLayout
        title="Culinary & Sales Analytics"
        subtitle="Deep dive into customer preferences, concept conversions, and revenue velocity."
      >
        <div className="py-24 text-center text-slate-400">
          <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-3 text-indigo-500" />
          Aggregating analytics data...
        </div>
      </AdminLayout>
    );
  }

  const salesByCategory = analytics?.sales_by_category || [];
  const ordersByConcept = analytics?.orders_by_concept || [];
  const ordersByPayment = analytics?.orders_by_payment || [];
  const ordersByType = analytics?.orders_by_type || [];
  const dailyPerformance = analytics?.daily_performance || [];

  const maxCatRevenue = Math.max(...salesByCategory.map((c: any) => Number(c.total_revenue || 0)), 1);
  const maxDailyRevenue = Math.max(
    ...dailyPerformance.map((d: any) => Number(d.revenue || 0)),
    1
  );

  return (
    <AdminLayout
      title="Culinary & Sales Analytics"
      subtitle="Deep dive into patron preferences, concept conversions, and revenue velocity."
    >
      <div className="flex justify-end mb-6">
        <button
          onClick={fetchAnalytics}
          className="inline-flex items-center gap-2 px-4 py-2 border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-xl transition"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          Refresh Metrics
        </button>
      </div>

      {/* Concept Performance Comparison (Concept A vs B vs C) */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-indigo-600" />
              Design Concept A / B / C Head-to-Head Conversion
            </h3>
            <p className="text-xs text-slate-500">
              Live patron ordering volume and revenue aggregated per frontend concept persona.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { name: "Concept A (Coquette Pinterest)", key: "Concept A", color: "from-rose-400 to-pink-500" },
            { name: "Concept B (Retro Gen-Z)", key: "Concept B", color: "from-amber-400 to-red-500" },
            { name: "Concept C (Luxury Cute)", key: "Concept C", color: "from-amber-600 to-stone-800" },
          ].map((c) => {
            const data = ordersByConcept.find(
              (o: any) => o.concept_source?.toLowerCase() === c.key.toLowerCase()
            ) || { order_count: 0, revenue: 0, avg_order: 0 };

            return (
              <div
                key={c.key}
                className="p-5 rounded-2xl border border-slate-100 bg-slate-50/50 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-bold text-slate-900 text-sm">{c.name}</span>
                    <span
                      className={`w-3 h-3 rounded-full bg-gradient-to-tr ${c.color} shadow-sm`}
                    />
                  </div>
                  <div className="text-2xl font-black text-slate-900">
                    ₹{Number(data.revenue || 0).toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                  </div>
                  <p className="text-xs text-slate-500 mt-1">Total revenue generated</p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-200/60 flex items-center justify-between text-xs text-slate-600">
                  <span>
                    <strong className="text-slate-900">{data.order_count}</strong> Orders
                  </span>
                  <span>
                    Avg Order: <strong className="text-slate-900">₹{Number(data.avg_order || 0).toFixed(0)}</strong>
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Grid: Category Breakdown & Daily Revenue Trend */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Sales by Category */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <h3 className="text-base font-bold text-slate-900 mb-1 flex items-center gap-2">
            <Layers className="w-4 h-4 text-indigo-600" />
            Revenue by Menu Category
          </h3>
          <p className="text-xs text-slate-500 mb-6">Top performing food and beverage sectors.</p>

          <div className="space-y-4">
            {salesByCategory.map((cat: any) => {
              const pct = (Number(cat.total_revenue) / maxCatRevenue) * 100;
              return (
                <div key={cat.category} className="space-y-1.5">
                  <div className="flex justify-between text-xs font-semibold text-slate-700">
                    <span>{cat.category}</span>
                    <span>
                      ₹{Number(cat.total_revenue).toFixed(2)} ({cat.items_sold} sold)
                    </span>
                  </div>
                  <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-indigo-600 rounded-full transition-all duration-500"
                      style={{ width: `${Math.max(pct, 4)}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 14-Day Performance Velocity */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900 mb-1 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-emerald-600" />
              14-Day Revenue Trajectory
            </h3>
            <p className="text-xs text-slate-500 mb-6">
              Daily revenue fluctuation from completed and active orders.
            </p>
          </div>

          <div className="h-44 flex items-end gap-2 pt-4">
            {dailyPerformance.length === 0 ? (
              <div className="w-full text-center text-xs text-slate-400 my-auto">
                No orders recorded in the past 14 days.
              </div>
            ) : (
              dailyPerformance.map((day: any) => {
                const heightPct = (Number(day.revenue) / maxDailyRevenue) * 100;
                return (
                  <div
                    key={day.date}
                    className="flex-1 flex flex-col items-center gap-1 group relative"
                  >
                    <div
                      className="w-full bg-indigo-100 group-hover:bg-indigo-600 rounded-t-md transition duration-200 min-h-[6px]"
                      style={{ height: `${Math.max(heightPct, 8)}%` }}
                    />
                    <span className="text-[10px] text-slate-400 rotate-45 mt-2 origin-left">
                      {new Date(day.date).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "numeric",
                      })}
                    </span>
                    {/* Tooltip */}
                    <div className="absolute -top-10 bg-slate-900 text-white text-[10px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap pointer-events-none z-10 shadow-lg">
                      ₹{Number(day.revenue).toFixed(0)} ({day.orders} orders)
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>

      {/* Payment & Order Type Split */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <h3 className="text-base font-bold text-slate-900 mb-4">Payment Methods Split</h3>
          <div className="space-y-3">
            {ordersByPayment.map((p: any) => (
              <div
                key={p.payment_method}
                className="flex items-center justify-between p-3.5 bg-slate-50 rounded-xl"
              >
                <div className="font-semibold text-slate-800 text-sm uppercase">
                  {p.payment_method}
                </div>
                <div className="text-right">
                  <div className="font-bold text-slate-900">₹{Number(p.total).toFixed(2)}</div>
                  <div className="text-xs text-slate-400">{p.count} orders</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <h3 className="text-base font-bold text-slate-900 mb-4">Fulfillment Mode Split</h3>
          <div className="space-y-3">
            {ordersByType.map((t: any) => (
              <div
                key={t.order_type}
                className="flex items-center justify-between p-3.5 bg-slate-50 rounded-xl"
              >
                <div className="font-semibold text-slate-800 text-sm capitalize">
                  {t.order_type === "delivery" ? "Doorstep Delivery" : "Takeaway / Counter Pickup"}
                </div>
                <div className="text-right">
                  <div className="font-bold text-slate-900">₹{Number(t.total).toFixed(2)}</div>
                  <div className="text-xs text-slate-400">{t.count} orders</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
