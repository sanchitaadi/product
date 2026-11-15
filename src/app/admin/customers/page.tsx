"use client";

import React, { useState, useEffect } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import * as api from "@/lib/api";
import { useToast } from "@/context/ToastContext";
import {
  Users,
  Search,
  Mail,
  Phone,
  Calendar,
  DollarSign,
  ShoppingBag,
  ExternalLink,
  RefreshCw,
  Award,
} from "lucide-react";

export default function AdminCustomersPage() {
  const { showToast } = useToast();
  const [customers, setCustomers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const fetchCustomers = async () => {
    setLoading(true);
    try {
      const res = await api.adminGetCustomers();
      if (res.success) {
        setCustomers(res.customers || []);
      }
    } catch (err) {
      showToast("Failed to load customer list", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const filtered = customers.filter(
    (c) =>
      !search ||
      c.full_name?.toLowerCase().includes(search.toLowerCase()) ||
      c.email?.toLowerCase().includes(search.toLowerCase()) ||
      c.phone?.includes(search)
  );

  const totalPatrons = customers.length;
  const totalRevenue = customers.reduce((sum, c) => sum + Number(c.total_spent || 0), 0);
  const totalOrders = customers.reduce((sum, c) => sum + Number(c.total_orders || 0), 0);

  return (
    <AdminLayout
      title="Customer Directory"
      subtitle="View registered patrons, lifetime hospitality metrics, contact details and ordering frequency."
    >
      {/* Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Registered Patrons
            </p>
            <h3 className="text-2xl font-black text-slate-900 mt-1">{totalPatrons}</h3>
          </div>
          <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
            <Users className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Patron Orders
            </p>
            <h3 className="text-2xl font-black text-slate-900 mt-1">{totalOrders}</h3>
          </div>
          <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
            <ShoppingBag className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Total Patron Spend
            </p>
            <h3 className="text-2xl font-black text-slate-900 mt-1">
              ₹{totalRevenue.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
            </h3>
          </div>
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <Award className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm mb-6 flex items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by patron name, email or phone..."
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
          />
        </div>
        <button
          onClick={fetchCustomers}
          className="p-2 border border-slate-200 hover:bg-slate-50 rounded-xl text-slate-600 transition"
          title="Refresh"
        >
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>

      {/* Customer Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                <th className="py-4 px-6">Patron</th>
                <th className="py-4 px-6">Contact Info</th>
                <th className="py-4 px-6">Joined On</th>
                <th className="py-4 px-6">Orders</th>
                <th className="py-4 px-6">Total Spend</th>
                <th className="py-4 px-6">Last Active</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-400">
                    <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2 text-indigo-500" />
                    Loading patron directory...
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-400">
                    <Users className="w-10 h-10 mx-auto mb-2 text-slate-300" />
                    No customers found.
                  </td>
                </tr>
              ) : (
                filtered.map((c) => (
                  <tr key={c.id} className="hover:bg-slate-50/60 transition">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 text-white font-bold text-xs flex items-center justify-center shrink-0">
                          {c.full_name?.charAt(0) || "U"}
                        </div>
                        <div>
                          <div className="font-bold text-slate-900">{c.full_name}</div>
                          <div className="text-xs text-slate-400 font-mono">ID #{c.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="text-xs text-slate-700 flex items-center gap-1.5">
                        <Mail className="w-3.5 h-3.5 text-slate-400" />
                        {c.email}
                      </div>
                      <div className="text-xs text-slate-500 flex items-center gap-1.5 mt-0.5">
                        <Phone className="w-3.5 h-3.5 text-slate-400" />
                        {c.phone}
                      </div>
                    </td>
                    <td className="py-4 px-6 text-xs text-slate-500">
                      {new Date(c.created_at).toLocaleDateString("en-IN", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </td>
                    <td className="py-4 px-6">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-100 text-slate-800 text-xs font-bold">
                        <ShoppingBag className="w-3 h-3 text-slate-400" />
                        {c.total_orders || 0}
                      </span>
                    </td>
                    <td className="py-4 px-6 font-bold text-slate-900">
                      ₹{Number(c.total_spent || 0).toFixed(2)}
                    </td>
                    <td className="py-4 px-6 text-xs text-slate-500">
                      {c.last_order_date
                        ? new Date(c.last_order_date).toLocaleDateString("en-IN", {
                            month: "short",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })
                        : "Never ordered"}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}
