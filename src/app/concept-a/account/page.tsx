"use client";

import React, { useState } from "react";
import Link from "next/link";
import { User, MapPin, Package, LogOut, Plus, ShieldCheck, Mail, Phone } from "lucide-react";
import ConceptAHeader from "@/components/concept-a/Header";
import ConceptAFooter from "@/components/concept-a/Footer";
import { useAuth } from "@/context/AuthContext";
import * as api from "@/lib/api";

export default function ConceptAAccountPage() {
  const { customer, addresses, orders, isAuthenticated, login, register, logout, saveAddress } = useAuth();

  const [tab, setTab] = useState<"login" | "register">("login");
  const [loginEmail, setLoginEmail] = useState("aanya@example.com");
  const [loginPass, setLoginPass] = useState("admin123");

  const [regName, setRegName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPhone, setRegPhone] = useState("");
  const [regPass, setRegPass] = useState("");

  const [newAddrLine, setNewAddrLine] = useState("");
  const [newCity, setNewCity] = useState("New Delhi");
  const [newPincode, setNewPincode] = useState("");
  const [newLandmark, setNewLandmark] = useState("");
  const [showAddrForm, setShowAddrForm] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(loginEmail, loginPass);
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    await register({
      full_name: regName,
      email: regEmail,
      phone: regPhone,
      password: regPass,
    });
  };

  const handleSaveAddr = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAddrLine || !newPincode) return;
    await saveAddress({
      address_line: newAddrLine,
      city: newCity,
      pincode: newPincode,
      landmark: newLandmark,
    });
    setNewAddrLine("");
    setNewPincode("");
    setNewLandmark("");
    setShowAddrForm(false);
  };

  return (
    <div className="bg-[#FFF8F9] min-h-screen text-[#3D2D2E] flex flex-col">
      <ConceptAHeader />

      <section className="pt-10 pb-6 border-b border-rose-100 bg-[#FFF0F3]/40">
        <div className="max-w-7xl mx-auto px-6">
          <span className="text-xs font-bold text-[#E07A86] uppercase tracking-wider block mb-1">
            🎀 Patron VIP Lounge
          </span>
          <h1 className="font-coquette-serif font-black text-3xl sm:text-4xl text-[#3D2D2E]">
            Customer Account & Feasts
          </h1>
        </div>
      </section>

      <section className="py-12 flex-1">
        <div className="max-w-5xl mx-auto px-6">
          {!isAuthenticated ? (
            /* Login & Register Forms */
            <div className="max-w-md mx-auto bg-white rounded-3xl p-8 border border-rose-100 shadow-xl space-y-6">
              <div className="flex border-b border-rose-100 pb-3">
                <button
                  onClick={() => setTab("login")}
                  className={`flex-1 py-2 text-center text-xs font-bold uppercase tracking-wider transition ${
                    tab === "login"
                      ? "text-[#E07A86] border-b-2 border-[#E07A86]"
                      : "text-gray-400 hover:text-gray-600"
                  }`}
                >
                  Patron Sign In
                </button>
                <button
                  onClick={() => setTab("register")}
                  className={`flex-1 py-2 text-center text-xs font-bold uppercase tracking-wider transition ${
                    tab === "register"
                      ? "text-[#E07A86] border-b-2 border-[#E07A86]"
                      : "text-gray-400 hover:text-gray-600"
                  }`}
                >
                  New Patron Register
                </button>
              </div>

              {tab === "login" ? (
                <form onSubmit={handleLogin} className="space-y-4">
                  <div>
                    <label className="text-xs font-bold text-gray-700 block mb-1">Email</label>
                    <input
                      type="email"
                      required
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-rose-200 bg-rose-50/30 text-xs focus:outline-none focus:ring-2 focus:ring-[#E07A86]"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-gray-700 block mb-1">Password</label>
                    <input
                      type="password"
                      required
                      value={loginPass}
                      onChange={(e) => setLoginPass(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-rose-200 bg-rose-50/30 text-xs focus:outline-none focus:ring-2 focus:ring-[#E07A86]"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-full bg-gradient-to-r from-[#E07A86] to-[#F59E0B] text-white font-bold text-xs uppercase tracking-wider shadow-md hover:opacity-95 transition"
                  >
                    Enter VIP Lounge 🎀
                  </button>
                  <p className="text-[11px] text-gray-400 text-center">
                    Sample login: aanya@example.com / admin123
                  </p>
                </form>
              ) : (
                <form onSubmit={handleRegister} className="space-y-4">
                  <div>
                    <label className="text-xs font-bold text-gray-700 block mb-1">Full Name</label>
                    <input
                      type="text"
                      required
                      value={regName}
                      onChange={(e) => setRegName(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-rose-200 bg-rose-50/30 text-xs focus:outline-none focus:ring-2 focus:ring-[#E07A86]"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-gray-700 block mb-1">Email</label>
                    <input
                      type="email"
                      required
                      value={regEmail}
                      onChange={(e) => setRegEmail(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-rose-200 bg-rose-50/30 text-xs focus:outline-none focus:ring-2 focus:ring-[#E07A86]"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-gray-700 block mb-1">Phone</label>
                    <input
                      type="tel"
                      required
                      value={regPhone}
                      onChange={(e) => setRegPhone(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-rose-200 bg-rose-50/30 text-xs focus:outline-none focus:ring-2 focus:ring-[#E07A86]"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-gray-700 block mb-1">Create Password</label>
                    <input
                      type="password"
                      required
                      value={regPass}
                      onChange={(e) => setRegPass(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-rose-200 bg-rose-50/30 text-xs focus:outline-none focus:ring-2 focus:ring-[#E07A86]"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-full bg-gradient-to-r from-[#E07A86] to-[#F59E0B] text-white font-bold text-xs uppercase tracking-wider shadow-md hover:opacity-95 transition"
                  >
                    Join Peachy Plate Club
                  </button>
                </form>
              )}
            </div>
          ) : (
            /* Logged in patron profile */
            <div className="space-y-8">
              {/* Profile Card */}
              <div className="p-8 rounded-3xl bg-white border border-rose-100 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center font-bold text-xl border border-rose-200">
                    🎀
                  </div>
                  <div>
                    <h2 className="font-coquette-serif font-bold text-2xl text-gray-900">
                      {customer?.full_name}
                    </h2>
                    <div className="flex flex-wrap gap-4 text-xs text-gray-500 mt-1">
                      <span className="flex items-center gap-1">
                        <Mail className="w-3.5 h-3.5 text-rose-400" />
                        {customer?.email}
                      </span>
                      <span className="flex items-center gap-1">
                        <Phone className="w-3.5 h-3.5 text-rose-400" />
                        {customer?.phone}
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={logout}
                  className="px-5 py-2.5 rounded-full border border-rose-200 text-xs font-bold text-rose-700 hover:bg-rose-50 transition flex items-center gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out</span>
                </button>
              </div>

              {/* Saved Addresses */}
              <div className="p-8 rounded-3xl bg-white border border-rose-100 shadow-sm space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="font-coquette-serif font-bold text-xl text-gray-900">
                    Saved Delivery Destinations
                  </h3>
                  <button
                    onClick={() => setShowAddrForm(!showAddrForm)}
                    className="px-4 py-2 rounded-full bg-rose-50 hover:bg-rose-100 text-[#E07A86] border border-rose-200 text-xs font-bold transition flex items-center gap-1.5"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>{showAddrForm ? "Cancel" : "Add Address"}</span>
                  </button>
                </div>

                {showAddrForm && (
                  <form onSubmit={handleSaveAddr} className="p-5 rounded-2xl bg-[#FFF8F9] border border-rose-200 space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      <div className="sm:col-span-2">
                        <label className="font-bold text-gray-700 block mb-1">Street Address</label>
                        <input
                          type="text"
                          required
                          value={newAddrLine}
                          onChange={(e) => setNewAddrLine(e.target.value)}
                          placeholder="House/Flat number, building name..."
                          className="w-full px-3 py-2 rounded-xl border border-rose-200 bg-white"
                        />
                      </div>
                      <div>
                        <label className="font-bold text-gray-700 block mb-1">City</label>
                        <input
                          type="text"
                          value={newCity}
                          onChange={(e) => setNewCity(e.target.value)}
                          className="w-full px-3 py-2 rounded-xl border border-rose-200 bg-white"
                        />
                      </div>
                      <div>
                        <label className="font-bold text-gray-700 block mb-1">Pincode</label>
                        <input
                          type="text"
                          required
                          value={newPincode}
                          onChange={(e) => setNewPincode(e.target.value)}
                          placeholder="110003"
                          className="w-full px-3 py-2 rounded-xl border border-rose-200 bg-white"
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <label className="font-bold text-gray-700 block mb-1">Landmark</label>
                        <input
                          type="text"
                          value={newLandmark}
                          onChange={(e) => setNewLandmark(e.target.value)}
                          placeholder="Near gate..."
                          className="w-full px-3 py-2 rounded-xl border border-rose-200 bg-white"
                        />
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="px-6 py-2.5 rounded-xl bg-[#E07A86] text-white font-bold text-xs"
                    >
                      Save Destination
                    </button>
                  </form>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {addresses.length === 0 ? (
                    <div className="text-xs text-gray-500 py-4">No saved addresses yet.</div>
                  ) : (
                    addresses.map((addr) => (
                      <div key={addr.id} className="p-4 rounded-2xl border border-rose-100 bg-rose-50/40 text-xs space-y-1">
                        <span className="font-bold text-gray-900 block">{addr.title || "Home"}</span>
                        <p className="text-gray-600">{addr.address_line}</p>
                        <p className="text-gray-500 font-medium">
                          {addr.city} &bull; {addr.pincode}
                        </p>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Past Orders */}
              <div className="p-8 rounded-3xl bg-white border border-rose-100 shadow-sm space-y-6">
                <h3 className="font-coquette-serif font-bold text-xl text-gray-900">
                  Past Feast History
                </h3>
                {orders.length === 0 ? (
                  <div className="text-xs text-gray-500 py-4">No previous orders recorded.</div>
                ) : (
                  <div className="divide-y divide-rose-50">
                    {orders.map((ord) => (
                      <div key={ord.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
                        <div>
                          <span className="font-bold text-sm text-[#3D2D2E] block">
                            Order #{ord.order_number}
                          </span>
                          <span className="text-gray-500 block">
                            {ord.created_at} &bull; {ord.order_type}
                          </span>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-[#E07A86] font-bold text-[11px]">
                            {ord.order_status}
                          </span>
                          <span className="font-bold text-sm text-gray-900">
                            {api.formatPrice(ord.final_total)}
                          </span>
                          <Link
                            href={`/concept-a/order-tracking/?order=${encodeURIComponent(ord.order_number)}`}
                            className="px-4 py-2 rounded-full bg-[#E07A86] text-white text-[11px] font-bold"
                          >
                            Radar
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </section>

      <ConceptAFooter />
    </div>
  );
}
