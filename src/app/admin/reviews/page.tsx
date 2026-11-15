"use client";

import React, { useState, useEffect } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import * as api from "@/lib/api";
import { useToast } from "@/context/ToastContext";
import {
  Star,
  CheckCircle,
  XCircle,
  RefreshCw,
  MessageSquare,
  ThumbsUp,
  Award,
} from "lucide-react";

export default function AdminReviewsPage() {
  const { showToast } = useToast();
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<number | null>(null);

  const fetchReviews = async () => {
    setLoading(true);
    try {
      const res = await api.adminGetReviews();
      if (res.success) {
        setReviews(res.reviews || []);
      }
    } catch (err) {
      showToast("Failed to load patron reviews", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleStatusChange = async (id: number, status: string) => {
    setUpdatingId(id);
    try {
      const res = await api.adminUpdateReviewStatus(id, status);
      if (res.success) {
        showToast(`Review marked as ${status}`, "success");
        setReviews((prev) =>
          prev.map((r) => (r.id === id ? { ...r, status } : r))
        );
      } else {
        showToast("Failed to update review", "error");
      }
    } catch (err) {
      showToast("Error updating review status", "error");
    } finally {
      setUpdatingId(null);
    }
  };

  const avgRating =
    reviews.length > 0
      ? (
          reviews.reduce((sum, r) => sum + Number(r.rating || 5), 0) / reviews.length
        ).toFixed(1)
      : "5.0";

  const pendingCount = reviews.filter((r) => r.status === "pending").length;

  return (
    <AdminLayout
      title="Patron Testimonials & Reviews"
      subtitle="Moderate dining reviews, approve guest testimonials, and monitor culinary sentiment across concepts."
    >
      {/* Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Average Rating
            </p>
            <div className="flex items-center gap-2 mt-1">
              <h3 className="text-2xl font-black text-slate-900">{avgRating}</h3>
              <div className="flex text-amber-400">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
            </div>
          </div>
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
            <Award className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Total Reviews
            </p>
            <h3 className="text-2xl font-black text-slate-900 mt-1">{reviews.length}</h3>
          </div>
          <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
            <MessageSquare className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Pending Moderation
            </p>
            <h3 className="text-2xl font-black text-amber-600 mt-1">{pendingCount}</h3>
          </div>
          <div className="w-12 h-12 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
            <ThumbsUp className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Reviews Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                <th className="py-4 px-6">Patron</th>
                <th className="py-4 px-6">Rating</th>
                <th className="py-4 px-6">Recommended Dish</th>
                <th className="py-4 px-6">Review Content</th>
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
                    Loading reviews...
                  </td>
                </tr>
              ) : reviews.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-400">
                    <MessageSquare className="w-10 h-10 mx-auto mb-2 text-slate-300" />
                    No customer reviews submitted yet.
                  </td>
                </tr>
              ) : (
                reviews.map((rev) => (
                  <tr key={rev.id} className="hover:bg-slate-50/60 transition">
                    <td className="py-4 px-6">
                      <div className="font-bold text-slate-900">{rev.customer_name}</div>
                      <div className="text-xs text-slate-400">
                        {new Date(rev.created_at).toLocaleDateString("en-IN", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex text-amber-400">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <Star
                            key={s}
                            className={`w-3.5 h-3.5 ${
                              s <= rev.rating ? "fill-amber-400" : "text-slate-200"
                            }`}
                          />
                        ))}
                      </div>
                    </td>
                    <td className="py-4 px-6 text-xs font-semibold text-indigo-600">
                      {rev.dish_recommended || "Chef's Tasting"}
                    </td>
                    <td className="py-4 px-6 text-xs text-slate-700 max-w-sm">
                      <p className="line-clamp-2 italic">&ldquo;{rev.review_text}&rdquo;</p>
                    </td>
                    <td className="py-4 px-6">
                      <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                        {rev.concept_source || "Web"}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <span
                        className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${
                          rev.status === "approved"
                            ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                            : rev.status === "pending"
                            ? "bg-amber-50 text-amber-700 border-amber-200"
                            : "bg-rose-50 text-rose-700 border-rose-200"
                        }`}
                      >
                        {rev.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        {rev.status !== "approved" && (
                          <button
                            disabled={updatingId === rev.id}
                            onClick={() => handleStatusChange(rev.id, "approved")}
                            className="px-2.5 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded-lg text-xs font-semibold transition"
                            title="Approve Review"
                          >
                            Approve
                          </button>
                        )}
                        {rev.status !== "rejected" && (
                          <button
                            disabled={updatingId === rev.id}
                            onClick={() => handleStatusChange(rev.id, "rejected")}
                            className="px-2.5 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 rounded-lg text-xs font-semibold transition"
                            title="Reject Review"
                          >
                            Reject
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
