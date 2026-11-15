"use client";

import React, { useState, useEffect } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import * as api from "@/lib/api";
import { useToast } from "@/context/ToastContext";
import {
  Settings,
  Save,
  Store,
  Truck,
  CreditCard,
  RefreshCw,
  CheckCircle,
} from "lucide-react";

export default function AdminSettingsPage() {
  const { showToast } = useToast();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [settings, setSettings] = useState<Record<string, string>>({
    restaurant_name: "Peachy Plate",
    restaurant_tagline: "GOOD FOOD. CUTE MOODS.",
    restaurant_address: "24, Garden Avenue, New Delhi, India",
    restaurant_phone: "+91 98765 43210 (dummy)",
    restaurant_email: "hello@peachyplate.example",
    restaurant_hours: "11:00 AM – 11:00 PM",
    currency_symbol: "₹",
    delivery_charge: "50.00",
    free_delivery_threshold: "599.00",
    min_order_amount: "199.00",
    orders_enabled: "1",
    cod_enabled: "1",
    pay_at_pickup_enabled: "1",
    online_payment_enabled: "0",
  });

  const fetchSettings = async () => {
    setLoading(true);
    try {
      const res = await api.adminGetSettings();
      if (res.success && res.settings) {
        setSettings((prev) => ({ ...prev, ...res.settings }));
      }
    } catch (err) {
      showToast("Failed to fetch restaurant settings", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const handleChange = (key: string, value: string) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await api.adminUpdateSettings(settings);
      if (res.success) {
        showToast("Restaurant settings saved successfully!", "success");
      } else {
        showToast(res.error || "Failed to update settings", "error");
      }
    } catch (err) {
      showToast("Error updating settings", "error");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <AdminLayout
        title="Website Settings"
        subtitle="Manage brand identity, contact details, operational hours and order fulfillment rules."
      >
        <div className="py-24 text-center text-slate-400">
          <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-3 text-indigo-500" />
          Loading settings...
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout
      title="Website Settings"
      subtitle="Manage brand identity, contact details, operational hours and order fulfillment rules."
    >
      <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl">
        {/* Restaurant Identity */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <Store className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">Brand Identity & Location</h3>
              <p className="text-xs text-slate-500">
                Core information displayed across all customer-facing design concepts.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                Restaurant Name
              </label>
              <input
                type="text"
                value={settings.restaurant_name}
                onChange={(e) => handleChange("restaurant_name", e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                Tagline
              </label>
              <input
                type="text"
                value={settings.restaurant_tagline}
                onChange={(e) => handleChange("restaurant_tagline", e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                Physical Address
              </label>
              <input
                type="text"
                value={settings.restaurant_address}
                onChange={(e) => handleChange("restaurant_address", e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                Customer Phone
              </label>
              <input
                type="text"
                value={settings.restaurant_phone}
                onChange={(e) => handleChange("restaurant_phone", e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                Customer Email
              </label>
              <input
                type="email"
                value={settings.restaurant_email}
                onChange={(e) => handleChange("restaurant_email", e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                Operating Hours
              </label>
              <input
                type="text"
                value={settings.restaurant_hours}
                onChange={(e) => handleChange("restaurant_hours", e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                Currency Symbol
              </label>
              <input
                type="text"
                value={settings.currency_symbol}
                onChange={(e) => handleChange("currency_symbol", e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>
          </div>
        </div>

        {/* Fulfillment Rules */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Delivery & Minimum Order Requirements
              </h3>
              <p className="text-xs text-slate-500">
                Determine logistics fees, free shipping triggers and cart constraints.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                Standard Delivery Charge (₹)
              </label>
              <input
                type="number"
                step="0.01"
                value={settings.delivery_charge}
                onChange={(e) => handleChange("delivery_charge", e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                Free Delivery Above (₹)
              </label>
              <input
                type="number"
                step="0.01"
                value={settings.free_delivery_threshold}
                onChange={(e) => handleChange("free_delivery_threshold", e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                Minimum Order Amount (₹)
              </label>
              <input
                type="number"
                step="0.01"
                value={settings.min_order_amount}
                onChange={(e) => handleChange("min_order_amount", e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>
          </div>

          {/* Toggles */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-slate-100">
            <label className="flex items-center gap-3 p-3.5 border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-50">
              <input
                type="checkbox"
                checked={settings.orders_enabled === "1"}
                onChange={(e) => handleChange("orders_enabled", e.target.checked ? "1" : "0")}
                className="w-4 h-4 rounded text-indigo-600"
              />
              <div>
                <div className="text-xs font-bold text-slate-800">Online Ordering Active</div>
                <div className="text-[11px] text-slate-500">Accept checkout submissions</div>
              </div>
            </label>

            <label className="flex items-center gap-3 p-3.5 border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-50">
              <input
                type="checkbox"
                checked={settings.cod_enabled === "1"}
                onChange={(e) => handleChange("cod_enabled", e.target.checked ? "1" : "0")}
                className="w-4 h-4 rounded text-indigo-600"
              />
              <div>
                <div className="text-xs font-bold text-slate-800">Cash on Delivery (COD)</div>
                <div className="text-[11px] text-slate-500">Enable cash pay upon arrival</div>
              </div>
            </label>

            <label className="flex items-center gap-3 p-3.5 border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-50">
              <input
                type="checkbox"
                checked={settings.pay_at_pickup_enabled === "1"}
                onChange={(e) =>
                  handleChange("pay_at_pickup_enabled", e.target.checked ? "1" : "0")
                }
                className="w-4 h-4 rounded text-indigo-600"
              />
              <div>
                <div className="text-xs font-bold text-slate-800">Pay at Counter Pickup</div>
                <div className="text-[11px] text-slate-500">Allow takeaway register settlement</div>
              </div>
            </label>
          </div>
        </div>

        {/* Save Bar */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl transition shadow-md disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            {saving ? "Saving Changes..." : "Save Restaurant Settings"}
          </button>
        </div>
      </form>
    </AdminLayout>
  );
}
