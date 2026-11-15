"use client";

import React, { useState, useEffect } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import * as api from "@/lib/api";
import { useToast } from "@/context/ToastContext";
import {
  Calendar,
  Clock,
  Users,
  CheckCircle,
  XCircle,
  Filter,
  RefreshCw,
  Phone,
  Mail,
  MapPin,
  MessageSquare,
} from "lucide-react";

export default function AdminReservationsPage() {
  const { showToast } = useToast();
  const [reservations, setReservations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [dateFilter, setDateFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [updatingId, setUpdatingId] = useState<number | null>(null);

  const fetchReservations = async () => {
    setLoading(true);
    try {
      const res = await api.adminGetReservations({
        date: dateFilter || undefined,
        status: statusFilter,
      });
      if (res.success) {
        setReservations(res.reservations || []);
      }
    } catch (err) {
      showToast("Failed to load table reservations", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReservations();
  }, [dateFilter, statusFilter]);

  const handleStatusChange = async (id: number, status: string) => {
    setUpdatingId(id);
    try {
      const res = await api.adminUpdateReservationStatus(id, status);
      if (res.success) {
        showToast(`Reservation marked as ${status}`, "success");
        setReservations((prev) =>
          prev.map((r) => (r.id === id ? { ...r, status } : r))
        );
      } else {
        showToast("Failed to update reservation", "error");
      }
    } catch (err) {
      showToast("Error updating reservation status", "error");
    } finally {
      setUpdatingId(null);
    }
  };

  const getStatusBadge = (st: string) => {
    switch (st) {
      case "Confirmed":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "Pending":
        return "bg-amber-50 text-amber-700 border-amber-200";
      case "Cancelled":
        return "bg-rose-50 text-rose-700 border-rose-200";
      case "Completed":
        return "bg-slate-100 text-slate-700 border-slate-200";
      default:
        return "bg-slate-100 text-slate-700 border-slate-200";
    }
  };

  return (
    <AdminLayout
      title="Table Reservations"
      subtitle="Manage seating bookings, approve table allocations, and accommodate patron hospitality requests."
    >
      {/* Filters Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm mb-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3">
          {/* Date Filter */}
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-slate-400" />
            <input
              type="date"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
            />
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-slate-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
            >
              <option value="all">All Booking Statuses</option>
              <option value="Pending">Pending</option>
              <option value="Confirmed">Confirmed</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
        </div>

        <button
          onClick={() => {
            setDateFilter("");
            setStatusFilter("all");
            fetchReservations();
          }}
          className="p-2 border border-slate-200 hover:bg-slate-50 rounded-xl text-slate-600 transition"
          title="Reset Filters"
        >
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>

      {/* Reservations Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                <th className="py-4 px-6">Guest</th>
                <th className="py-4 px-6">Date & Time</th>
                <th className="py-4 px-6">Party Size</th>
                <th className="py-4 px-6">Seating Area</th>
                <th className="py-4 px-6">Special Requests</th>
                <th className="py-4 px-6">Status</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-400">
                    <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2 text-indigo-500" />
                    Loading reservations...
                  </td>
                </tr>
              ) : reservations.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-400">
                    <Calendar className="w-10 h-10 mx-auto mb-2 text-slate-300" />
                    No table bookings found matching criteria.
                  </td>
                </tr>
              ) : (
                reservations.map((res) => (
                  <tr key={res.id} className="hover:bg-slate-50/60 transition">
                    <td className="py-4 px-6">
                      <div className="font-bold text-slate-900">{res.name}</div>
                      <div className="text-xs text-slate-500 flex items-center gap-1.5 mt-0.5">
                        <Phone className="w-3 h-3 text-slate-400" />
                        {res.phone}
                      </div>
                      {res.email && (
                        <div className="text-xs text-slate-400 flex items-center gap-1.5 mt-0.5">
                          <Mail className="w-3 h-3 text-slate-400" />
                          {res.email}
                        </div>
                      )}
                    </td>
                    <td className="py-4 px-6">
                      <div className="font-semibold text-slate-800">
                        {new Date(res.reservation_date).toLocaleDateString("en-IN", {
                          weekday: "short",
                          month: "short",
                          day: "numeric",
                        })}
                      </div>
                      <div className="text-xs text-indigo-600 font-bold flex items-center gap-1 mt-0.5">
                        <Clock className="w-3 h-3" />
                        {res.reservation_time}
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-100 text-slate-800 text-xs font-bold">
                        <Users className="w-3 h-3 text-slate-400" />
                        {res.guests} Guests
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <span className="text-xs font-medium text-slate-700 bg-slate-50 border border-slate-200 px-2.5 py-1 rounded-md">
                        {res.seating_area || "Main Dining"}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-xs text-slate-600 max-w-xs">
                      {res.special_requests ? (
                        <div className="italic bg-amber-50/50 p-2 rounded-lg border border-amber-100">
                          &ldquo;{res.special_requests}&rdquo;
                        </div>
                      ) : (
                        <span className="text-slate-400">—</span>
                      )}
                    </td>
                    <td className="py-4 px-6">
                      <span
                        className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${getStatusBadge(
                          res.status
                        )}`}
                      >
                        {res.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-1">
                        {res.status !== "Confirmed" && (
                          <button
                            disabled={updatingId === res.id}
                            onClick={() => handleStatusChange(res.id, "Confirmed")}
                            className="px-2.5 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded-lg text-xs font-semibold transition"
                            title="Confirm Booking"
                          >
                            Confirm
                          </button>
                        )}
                        {res.status !== "Completed" && res.status !== "Cancelled" && (
                          <button
                            disabled={updatingId === res.id}
                            onClick={() => handleStatusChange(res.id, "Completed")}
                            className="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold transition"
                            title="Mark Completed"
                          >
                            Complete
                          </button>
                        )}
                        {res.status !== "Cancelled" && (
                          <button
                            disabled={updatingId === res.id}
                            onClick={() => handleStatusChange(res.id, "Cancelled")}
                            className="px-2.5 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 rounded-lg text-xs font-semibold transition"
                            title="Cancel Booking"
                          >
                            Cancel
                          </button>
                        )}
                      </div>
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
