"use client";

import React, { useState, useEffect } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import * as api from "@/lib/api";
import { useToast } from "@/context/ToastContext";
import {
  Search,
  Filter,
  Eye,
  RefreshCw,
  Printer,
  Clock,
  CheckCircle,
  Truck,
  XCircle,
  ChefHat,
  ChevronRight,
  ShoppingBag,
  MapPin,
  Phone,
  Mail,
  Calendar,
} from "lucide-react";

export default function AdminOrdersPage() {
  const { showToast } = useToast();
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [detailLoading, setDetailLoading] = useState(false);
  const [updatingId, setUpdatingId] = useState<number | null>(null);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await api.adminGetOrders({
        search: search.trim() || undefined,
        status: statusFilter,
        order_type: typeFilter,
      });
      if (res.success) {
        setOrders(res.orders || []);
      }
    } catch (err) {
      showToast("Failed to load orders", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [statusFilter, typeFilter]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchOrders();
  };

  const openOrderDrawer = async (orderId: number) => {
    setDetailLoading(true);
    setSelectedOrder(null);
    try {
      const res = await api.adminGetOrderDetails(orderId);
      if (res.success) {
        setSelectedOrder(res.order);
      } else {
        showToast("Could not retrieve order details", "error");
      }
    } catch (err) {
      showToast("Error retrieving order details", "error");
    } finally {
      setDetailLoading(false);
    }
  };

  const handleStatusChange = async (orderId: number, newStatus: string) => {
    setUpdatingId(orderId);
    try {
      const res = await api.adminUpdateOrderStatus(orderId, newStatus);
      if (res.success) {
        showToast(`Order status updated to ${newStatus}`, "success");
        // Update local state
        setOrders((prev) =>
          prev.map((o) => (o.id === orderId ? { ...o, order_status: newStatus } : o))
        );
        if (selectedOrder && selectedOrder.id === orderId) {
          setSelectedOrder({ ...selectedOrder, order_status: newStatus });
        }
      } else {
        showToast(res.error || "Failed to update status", "error");
      }
    } catch (err) {
      showToast("Failed to update status", "error");
    } finally {
      setUpdatingId(null);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Pending":
        return "bg-amber-100 text-amber-800 border-amber-300";
      case "Accepted":
        return "bg-sky-100 text-sky-800 border-sky-300";
      case "Preparing":
        return "bg-purple-100 text-purple-800 border-purple-300";
      case "Ready for pickup":
        return "bg-indigo-100 text-indigo-800 border-indigo-300";
      case "Out for delivery":
        return "bg-blue-100 text-blue-800 border-blue-300";
      case "Delivered":
        return "bg-emerald-100 text-emerald-800 border-emerald-300";
      case "Cancelled":
        return "bg-rose-100 text-rose-800 border-rose-300";
      default:
        return "bg-slate-100 text-slate-800 border-slate-300";
    }
  };

  const statuses = [
    "Pending",
    "Accepted",
    "Preparing",
    "Ready for pickup",
    "Out for delivery",
    "Delivered",
    "Cancelled",
  ];

  return (
    <AdminLayout
      title="Order Management"
      subtitle="Track, fulfill, update status and review customer ordering streams in real-time."
    >
      {/* Controls & Filters Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm mb-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          {/* Search Form */}
          <form onSubmit={handleSearchSubmit} className="flex-1 flex gap-2">
            <div className="relative flex-1">
              <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by Order #, customer name, phone, or email..."
                className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
              />
            </div>
            <button
              type="submit"
              className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-xl transition shadow-sm"
            >
              Search
            </button>
            <button
              type="button"
              onClick={() => {
                setSearch("");
                setStatusFilter("all");
                setTypeFilter("all");
                fetchOrders();
              }}
              className="p-2.5 border border-slate-200 hover:bg-slate-50 rounded-xl text-slate-600 transition"
              title="Reset Filters"
            >
              <RefreshCw className="w-5 h-5" />
            </button>
          </form>

          {/* Quick Filters */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <Filter className="w-4 h-4 text-slate-400" />
              <span>Status:</span>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              >
                <option value="all">All Statuses</option>
                {statuses.map((st) => (
                  <option key={st} value={st}>
                    {st}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-2 text-sm text-slate-600">
              <span>Type:</span>
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              >
                <option value="all">All Types</option>
                <option value="delivery">Delivery</option>
                <option value="pickup">Pickup</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                <th className="py-4 px-6">Order #</th>
                <th className="py-4 px-6">Customer</th>
                <th className="py-4 px-6">Type & Date</th>
                <th className="py-4 px-6">Amount</th>
                <th className="py-4 px-6">Source</th>
                <th className="py-4 px-6">Status</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-400">
                    <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2 text-indigo-500" />
                    Loading orders...
                  </td>
                </tr>
              ) : orders.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-400">
                    <ShoppingBag className="w-10 h-10 mx-auto mb-2 text-slate-300" />
                    No orders match your filter criteria.
                  </td>
                </tr>
              ) : (
                orders.map((order) => (
                  <tr key={order.id} className="hover:bg-slate-50/60 transition">
                    <td className="py-4 px-6 font-mono font-bold text-slate-900">
                      {order.order_number}
                    </td>
                    <td className="py-4 px-6">
                      <div className="font-semibold text-slate-900">{order.customer_name}</div>
                      <div className="text-xs text-slate-500">{order.customer_phone}</div>
                    </td>
                    <td className="py-4 px-6">
                      <span
                        className={`inline-block text-xs font-semibold uppercase px-2 py-0.5 rounded-md mb-1 ${
                          order.order_type === "delivery"
                            ? "bg-purple-100 text-purple-700"
                            : "bg-amber-100 text-amber-700"
                        }`}
                      >
                        {order.order_type}
                      </span>
                      <div className="text-xs text-slate-400">
                        {new Date(order.created_at).toLocaleDateString("en-IN", {
                          month: "short",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="font-bold text-slate-900">
                        ₹{Number(order.final_total).toFixed(2)}
                      </div>
                      <div className="text-xs text-slate-400 uppercase font-medium">
                        {order.payment_method}
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="text-xs px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 font-medium">
                        {order.concept_source || "Concept A"}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <select
                        value={order.order_status}
                        disabled={updatingId === order.id}
                        onChange={(e) => handleStatusChange(order.id, e.target.value)}
                        className={`text-xs font-semibold px-2.5 py-1.5 rounded-full border transition cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500/20 ${getStatusBadge(
                          order.order_status
                        )}`}
                      >
                        {statuses.map((st) => (
                          <option key={st} value={st}>
                            {st}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <button
                        onClick={() => openOrderDrawer(order.id)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-indigo-50 text-slate-700 hover:text-indigo-600 rounded-lg text-xs font-medium transition"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        Details
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Details Modal / Drawer */}
      {(selectedOrder || detailLoading) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden max-h-[90vh] flex flex-col">
            {detailLoading ? (
              <div className="p-12 text-center text-slate-400">
                <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-3 text-indigo-500" />
                Loading order details...
              </div>
            ) : selectedOrder ? (
              <>
                {/* Header */}
                <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                  <div>
                    <div className="flex items-center gap-3">
                      <h3 className="text-xl font-bold text-slate-900 font-mono">
                        {selectedOrder.order_number}
                      </h3>
                      <span
                        className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${getStatusBadge(
                          selectedOrder.order_status
                        )}`}
                      >
                        {selectedOrder.order_status}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-1">
                      Placed on{" "}
                      {new Date(selectedOrder.created_at).toLocaleString("en-IN", {
                        dateStyle: "medium",
                        timeStyle: "short",
                      })}{" "}
                      via {selectedOrder.concept_source}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => window.print()}
                      className="p-2 text-slate-500 hover:bg-slate-200/60 rounded-xl transition"
                      title="Print Invoice"
                    >
                      <Printer className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => setSelectedOrder(null)}
                      className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 rounded-xl transition"
                    >
                      ✕
                    </button>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 overflow-y-auto space-y-6">
                  {/* Customer & Delivery Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                    <div>
                      <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                        Customer Details
                      </h4>
                      <p className="font-bold text-slate-900">{selectedOrder.customer_name}</p>
                      <p className="text-xs text-slate-600 flex items-center gap-1.5 mt-1">
                        <Phone className="w-3.5 h-3.5 text-slate-400" />
                        {selectedOrder.customer_phone}
                      </p>
                      {selectedOrder.customer_email && (
                        <p className="text-xs text-slate-600 flex items-center gap-1.5 mt-1">
                          <Mail className="w-3.5 h-3.5 text-slate-400" />
                          {selectedOrder.customer_email}
                        </p>
                      )}
                    </div>
                    <div>
                      <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                        {selectedOrder.order_type === "delivery"
                          ? "Delivery Address"
                          : "Pickup Station"}
                      </h4>
                      {selectedOrder.order_type === "delivery" ? (
                        <>
                          <p className="text-xs text-slate-700 leading-relaxed">
                            {selectedOrder.delivery_address}
                          </p>
                          <p className="text-xs text-slate-500 mt-1">
                            {selectedOrder.delivery_city} - {selectedOrder.delivery_pincode}
                            {selectedOrder.delivery_landmark &&
                              ` (Near: ${selectedOrder.delivery_landmark})`}
                          </p>
                        </>
                      ) : (
                        <p className="text-xs text-slate-700">
                          24, Garden Avenue, New Delhi, India (Counter pickup)
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Special Instructions */}
                  {selectedOrder.special_instructions && (
                    <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900">
                      <span className="font-bold">Patron Instructions:</span>{" "}
                      {selectedOrder.special_instructions}
                    </div>
                  )}

                  {/* Itemized Dissect */}
                  <div>
                    <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                      Ordered Items ({selectedOrder.items?.length || 0})
                    </h4>
                    <div className="divide-y divide-slate-100 border border-slate-100 rounded-2xl overflow-hidden">
                      {selectedOrder.items?.map((item: any, idx: number) => (
                        <div
                          key={idx}
                          className="p-3.5 flex items-start justify-between bg-white text-sm"
                        >
                          <div>
                            <div className="font-semibold text-slate-900 flex items-center gap-2">
                              <span>
                                {item.quantity}x {item.item_name}
                              </span>
                            </div>
                            {item.customizations && item.customizations.length > 0 && (
                              <div className="text-xs text-slate-500 mt-0.5 space-x-2">
                                {item.customizations.map((c: any, cidx: number) => (
                                  <span
                                    key={cidx}
                                    className="inline-block bg-slate-100 px-2 py-0.5 rounded text-[11px] text-slate-600"
                                  >
                                    +{c.option_name} (+₹{c.option_price})
                                  </span>
                                ))}
                              </div>
                            )}
                            {item.special_instructions && (
                              <p className="text-xs text-amber-700 italic mt-0.5">
                                Note: {item.special_instructions}
                              </p>
                            )}
                          </div>
                          <span className="font-bold text-slate-900">
                            ₹{Number(item.total_price).toFixed(2)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Financial Breakdown */}
                  <div className="bg-slate-50 p-4 rounded-2xl space-y-2 text-xs">
                    <div className="flex justify-between text-slate-600">
                      <span>Subtotal</span>
                      <span>₹{Number(selectedOrder.subtotal).toFixed(2)}</span>
                    </div>
                    {Number(selectedOrder.discount_amount) > 0 && (
                      <div className="flex justify-between text-emerald-600 font-medium">
                        <span>Discount ({selectedOrder.coupon_code || "Applied"})</span>
                        <span>-₹{Number(selectedOrder.discount_amount).toFixed(2)}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-slate-600">
                      <span>Delivery Fee</span>
                      <span>₹{Number(selectedOrder.delivery_charge).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-slate-600">
                      <span>GST (5%)</span>
                      <span>₹{Number(selectedOrder.tax_amount).toFixed(2)}</span>
                    </div>
                    <div className="border-t border-slate-200 pt-2 flex justify-between text-base font-extrabold text-slate-900">
                      <span>Total Amount</span>
                      <span>₹{Number(selectedOrder.final_total).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-slate-500 pt-1">
                      <span>Payment Method</span>
                      <span className="font-semibold uppercase">
                        {selectedOrder.payment_method} ({selectedOrder.payment?.payment_status || "Pending"})
                      </span>
                    </div>
                  </div>
                </div>

                {/* Footer Controls */}
                <div className="p-4 bg-slate-50/80 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-slate-600">Change Status:</span>
                    <select
                      value={selectedOrder.order_status}
                      onChange={(e) => handleStatusChange(selectedOrder.id, e.target.value)}
                      className="bg-white border border-slate-300 rounded-xl px-3 py-1.5 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 shadow-sm"
                    >
                      {statuses.map((st) => (
                        <option key={st} value={st}>
                          {st}
                        </option>
                      ))}
                    </select>
                  </div>
                  <button
                    onClick={() => setSelectedOrder(null)}
                    className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-xl transition"
                  >
                    Done
                  </button>
                </div>
              </>
            ) : null}
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
