"use client";

import React, { useState, useEffect } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import * as api from "@/lib/api";
import { useToast } from "@/context/ToastContext";
import { Shield, Lock, User, Key, CheckCircle, RefreshCw } from "lucide-react";

export default function AdminProfilePage() {
  const { showToast } = useToast();
  const [admin, setAdmin] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Profile Form
  const [profileData, setProfileData] = useState({
    full_name: "",
    email: "",
  });
  const [profileSaving, setProfileSaving] = useState(false);

  // Password Form
  const [passwordData, setPasswordData] = useState({
    current_password: "",
    new_password: "",
    confirm_password: "",
  });
  const [passwordSaving, setPasswordSaving] = useState(false);

  const fetchProfile = async () => {
    setLoading(true);
    try {
      const res = await api.adminMe();
      if (res.success && res.admin) {
        setAdmin(res.admin);
        setProfileData({
          full_name: res.admin.full_name || "",
          email: res.admin.email || "",
        });
      }
    } catch (err) {
      showToast("Failed to fetch admin profile", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profileData.full_name || !profileData.email) {
      showToast("Full name and email are required", "error");
      return;
    }

    setProfileSaving(true);
    try {
      const res = await api.adminUpdateProfile(profileData);
      if (res.success) {
        showToast("Profile information updated successfully!", "success");
        fetchProfile();
      } else {
        showToast(res.error || "Failed to update profile", "error");
      }
    } catch (err) {
      showToast("Error updating profile", "error");
    } finally {
      setProfileSaving(false);
    }
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordData.new_password !== passwordData.confirm_password) {
      showToast("New passwords do not match", "error");
      return;
    }
    if (passwordData.new_password.length < 6) {
      showToast("Password must be at least 6 characters", "error");
      return;
    }

    setPasswordSaving(true);
    try {
      const res = await api.adminUpdatePassword({
        current_password: passwordData.current_password,
        new_password: passwordData.new_password,
      });
      if (res.success) {
        showToast("Password changed successfully!", "success");
        setPasswordData({
          current_password: "",
          new_password: "",
          confirm_password: "",
        });
      } else {
        showToast(res.error || "Failed to change password", "error");
      }
    } catch (err) {
      showToast("Error updating password", "error");
    } finally {
      setPasswordSaving(false);
    }
  };

  if (loading) {
    return (
      <AdminLayout
        title="Profile & Security"
        subtitle="Manage administrative credentials, system access and authentication."
      >
        <div className="py-24 text-center text-slate-400">
          <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-3 text-indigo-500" />
          Loading profile...
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout
      title="Profile & Security"
      subtitle="Manage administrative credentials, system access and authentication."
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-6xl">
        {/* Left Column: Admin Identity Badge */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-indigo-600 to-purple-600 text-white font-black text-2xl flex items-center justify-center shadow-md mb-4">
              {admin?.username?.charAt(0).toUpperCase() || "A"}
            </div>
            <h3 className="text-xl font-bold text-slate-900">{admin?.full_name}</h3>
            <p className="text-xs font-mono text-indigo-600 mt-0.5">@{admin?.username}</p>
            <p className="text-xs text-slate-500 mt-1">{admin?.email}</p>

            <div className="mt-6 pt-6 border-t border-slate-100 space-y-3">
              <div className="flex justify-between text-xs">
                <span className="text-slate-500">System Role</span>
                <span className="font-bold text-slate-900 uppercase">{admin?.role || "Superadmin"}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-slate-500">Security Access</span>
                <span className="text-emerald-600 font-semibold flex items-center gap-1">
                  <Shield className="w-3.5 h-3.5" /> Full Access
                </span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-slate-500">Last Authentication</span>
                <span className="text-slate-700">
                  {admin?.last_login
                    ? new Date(admin.last_login).toLocaleDateString("en-IN", {
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                    : "Active Session"}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 text-xs text-slate-400">
            Peachy Plate 2.0 Restaurant SaaS • MySQL PDO Secured
          </div>
        </div>

        {/* Right Column: Forms */}
        <div className="lg:col-span-2 space-y-6">
          {/* Edit Profile Information */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-100">
              <User className="w-4 h-4 text-indigo-600" />
              <h4 className="font-bold text-slate-900 text-sm">Personal Information</h4>
            </div>

            <form onSubmit={handleProfileSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Full Display Name
                </label>
                <input
                  type="text"
                  required
                  value={profileData.full_name}
                  onChange={(e) => setProfileData({ ...profileData, full_name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Administrative Email
                </label>
                <input
                  type="email"
                  required
                  value={profileData.email}
                  onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                />
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  disabled={profileSaving}
                  className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-xl transition shadow-sm disabled:opacity-50"
                >
                  {profileSaving ? "Saving..." : "Update Profile"}
                </button>
              </div>
            </form>
          </div>

          {/* Change Password */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-100">
              <Lock className="w-4 h-4 text-indigo-600" />
              <h4 className="font-bold text-slate-900 text-sm">Change Password</h4>
            </div>

            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Current Password *
                </label>
                <input
                  type="password"
                  required
                  value={passwordData.current_password}
                  onChange={(e) =>
                    setPasswordData({ ...passwordData, current_password: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                    New Password *
                  </label>
                  <input
                    type="password"
                    required
                    minLength={6}
                    value={passwordData.new_password}
                    onChange={(e) =>
                      setPasswordData({ ...passwordData, new_password: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                    Confirm New Password *
                  </label>
                  <input
                    type="password"
                    required
                    minLength={6}
                    value={passwordData.confirm_password}
                    onChange={(e) =>
                      setPasswordData({ ...passwordData, confirm_password: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                  />
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  disabled={passwordSaving}
                  className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-xl transition shadow-sm disabled:opacity-50"
                >
                  {passwordSaving ? "Updating Password..." : "Change Password"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
