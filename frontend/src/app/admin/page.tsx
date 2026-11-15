"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  DollarSign,
  ShoppingBag,
  Clock,
  CheckCircle2,
  TrendingUp,
  Users,
  Calendar,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";
import * as api from "@/lib/api";

export default function AdminOverviewPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .adminGetStats()
      .then((res) => {
        if (res.success) {
          setData(res);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  const overview = data?.overview || {};
  const revenueTrend = data?.revenue_trend || [];
  const statusBreakdown = data?.status_breakdown || [];
  const popularDishes = data?.popular_dishes || [];
  const recentOrders = data?.recent_orders || [];

  return (
    <AdminLayout
      title="Executive Overview"
      subtitle="Real-time restaurant performance metrics from MySQL database"
    >
      {loading ? (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="h-28 bg-white rounded-2xl border border-slate-200 animate-pulse" />
            ))}
          </div>
          <div className="h-64 bg-white rounded-2xl border border-slate-200 animate-pulse" />
        </div>
      ) : (
        <div className="space-y-8">
          {/* Top Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* Total Revenue */}
            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center justify-between">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
                  Total Gross Revenue
                </span>
                <span className="text-2xl font-black text-slate-900 mt-1 block">
                  {api.formatPrice(overview.total_revenue || 0)}
                </span>
                <span className="text-[11px] text-emerald-600 font-bold flex items-center gap-1 mt-1">
                  <TrendingUp className="w-3.5 h-3.5" /> Real-time active orders
                </span>
              </div>
              <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                <DollarSign className="w-6 h-6" />
              </div>
            </div>

            {/* Total Orders */}
            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center justify-between">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
                  Total Orders
                </span>
                <span className="text-2xl font-black text-slate-900 mt-1 block">
                  {overview.total_orders || 0}
                </span>
                <span className="text-[11px] text-slate-500 font-medium mt-1 block">
                  Pending: <strong className="text-amber-600 font-bold">{overview.pending_orders || 0}</strong>
                </span>
              </div>
              <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                <ShoppingBag className="w-6 h-6" />
              </div>
            </div>

            {/* Average Order Value */}
            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center justify-between">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
                  Average Order Value
                </span>
                <span className="text-2xl font-black text-slate-900 mt-1 block">
                  {api.formatPrice(overview.avg_order_value || 0)}
                </span>
                <span className="text-[11px] text-slate-500 font-medium mt-1 block">
                  Completed: <strong className="text-emerald-600 font-bold">{overview.completed_orders || 0}</strong>
                </span>
              </div>
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6" />
              </div>
            </div>

            {/* Customers & Reservations */}
            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center justify-between">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
                  Patron Engagement
                </span>
                <span className="text-2xl font-black text-slate-900 mt-1 block">
                  {overview.total_customers || 0} Patrons
                </span>
                <span className="text-[11px] text-slate-500 font-medium mt-1 block">
                  Reservations: <strong className="text-indigo-600 font-bold">{overview.total_reservations || 0}</strong>
                </span>
              </div>
              <div className="w-12 h-12 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
                <Users className="w-6 h-6" />
              </div>
            </div>
          </div>

          {/* Revenue Chart & Status Breakdown */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* 7-Day Revenue Trend Bar Chart */}
            <div className="lg:col-span-2 p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">Revenue Trajectory (Last 7 Days)</h3>
                  <p className="text-xs text-slate-500">Live order earnings from database logs</p>
                </div>
                <span className="text-xs font-bold text-indigo-600 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100">
                  Daily Sales
                </span>
              </div>

              {revenueTrend.length === 0 ? (
                <div className="h-48 flex items-center justify-center text-xs text-slate-400">
                  No orders recorded in the last 7 days.
                </div>
              ) : (
                <div className="h-48 flex items-end justify-between gap-3 pt-6 border-b border-slate-100 pb-2">
                  {revenueTrend.map((day: any) => {
                    const maxVal = Math.max(...revenueTrend.map((d: any) => Number(d.daily_revenue || 1)));
                    const heightPercent = Math.max(15, (Number(day.daily_revenue) / maxVal) * 100);
                    return (
                      <div key={day.order_date} className="flex-1 flex flex-col items-center gap-2 group">
                        <span className="text-[10px] font-bold text-slate-700 opacity-0 group-hover:opacity-100 transition">
                          ₹{Number(day.daily_revenue).toFixed(0)}
                        </span>
                        <div
                          className="w-full bg-indigo-500 group-hover:bg-indigo-600 rounded-t-lg transition-all duration-300"
                          style={{ height: `${heightPercent}%` }}
                        />
                        <span className="text-[10px] font-medium text-slate-400 truncate max-w-[50px]">
                          {day.order_date.slice(5)}
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Status Breakdown */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
              <h3 className="font-bold text-slate-900 text-sm">Order Status Allocation</h3>
              <div className="space-y-3">
                {statusBreakdown.map((st: any) => (
                  <div key={st.order_status} className="space-y-1">
                    <div className="flex justify-between text-xs font-medium">
                      <span className="text-slate-700">{st.order_status}</span>
                      <span className="font-bold text-slate-900">{st.count} orders</span>
                    </div>
                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-indigo-500 rounded-full"
                        style={{
                          width: `${Math.min(100, (Number(st.count) / Math.max(1, Number(overview.total_orders))) * 100)}%`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Popular Dishes & Recent Orders */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Top Popular Dishes */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
              <h3 className="font-bold text-slate-900 text-sm">Bestselling Dishes</h3>
              <div className="space-y-3 divide-y divide-slate-100">
                {popularDishes.map((pd: any, idx: number) => (
                  <div key={idx} className="pt-3 first:pt-0 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-3">
                      <img
                        src={api.resolveImageUrl(pd.image_url)}
                        alt={pd.item_name}
                        className="w-10 h-10 rounded-xl object-cover border border-slate-200"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = "/images/fallback-food.svg";
                        }}
                      />
                      <div>
                        <span className="font-bold text-slate-800 block">{pd.item_name}</span>
                        <span className="text-[10px] text-slate-400">{pd.total_sold} units sold</span>
                      </div>
                    </div>
                    <span className="font-bold text-slate-900">{api.formatPrice(pd.total_sales)}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Orders Table (2 cols) */}
            <div className="lg:col-span-2 p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-slate-900 text-sm">Recent Kitchen Dispatches</h3>
                <Link
                  href="/admin/orders/"
                  className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
                >
                  <span>Manage All Orders</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider text-[10px]">
                    <tr>
                      <th className="p-3">Order #</th>
                      <th className="p-3">Customer</th>
                      <th className="p-3">Type</th>
                      <th className="p-3">Total</th>
                      <th className="p-3">Status</th>
                      <th className="p-3">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    {recentOrders.map((ord: any) => (
                      <tr key={ord.id} className="hover:bg-slate-50/50">
                        <td className="p-3 font-mono font-bold text-slate-900">{ord.order_number}</td>
                        <td className="p-3 font-medium">{ord.customer_name}</td>
                        <td className="p-3 uppercase text-[10px]">{ord.order_type}</td>
                        <td className="p-3 font-bold text-slate-900">{api.formatPrice(ord.final_total)}</td>
                        <td className="p-3">
                          <span
                            className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                              ord.order_status === "Delivered"
                                ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                                : ord.order_status === "Cancelled"
                                ? "bg-rose-50 text-rose-700 border border-rose-200"
                                : "bg-amber-50 text-amber-700 border border-amber-200"
                            }`}
                          >
                            {ord.order_status}
                          </span>
                        </td>
                        <td className="p-3">
                          <Link
                            href="/admin/orders/"
                            className="text-indigo-600 font-bold hover:underline"
                          >
                            Inspect
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
