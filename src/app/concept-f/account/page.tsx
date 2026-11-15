"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Zap, User, LogOut, Plus, Mail, Phone, MapPin, Clock, ShieldCheck } from "lucide-react";
import ConceptFHeader from "@/components/concept-f/Header";
import ConceptFFooter from "@/components/concept-f/Footer";
import { useAuth } from "@/context/AuthContext";
import * as api from "@/lib/api";

export default function ConceptFAccountPage() {
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
    <div className="bg-[#FFFDF7] min-h-screen text-black flex flex-col font-sans selection:bg-[#FFE600] selection:text-black">
      <ConceptFHeader />

      {/* Manga Header Banner */}
      <section className="bg-white py-16 border-b-4 border-black text-center space-y-4 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#FFE600] text-black font-black text-xs uppercase tracking-widest border-2 border-black shadow-[3px_3px_0px_#000] -rotate-1">
            <User className="w-3.5 h-3.5 text-[#D7263D]" />
            HERO GUILD PASS &bull; CUSTOMER PORTAL
          </div>
          <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-black">
            Manga Guild Account
          </h1>
          <p className="text-xs sm:text-sm text-gray-700 font-bold max-w-lg mx-auto">
            Manage your credentials, saved delivery hubs, and past comic orders with the unified backend.
          </p>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-16 flex-1 w-full">
        {!isAuthenticated ? (
          /* Authentication Screen */
          <div className="max-w-md mx-auto bg-white border-4 border-black p-8 sm:p-10 shadow-[10px_10px_0px_#000]">
            <div className="flex border-b-3 border-black mb-6 text-xs font-black uppercase">
              <button
                onClick={() => setTab("login")}
                className={`flex-1 py-3 text-center border-b-3 transition-colors ${
                  tab === "login"
                    ? "border-[#D7263D] text-[#D7263D] bg-[#FFFDF7]"
                    : "border-transparent text-gray-400 hover:text-black"
                }`}
              >
                Hero Login
              </button>
              <button
                onClick={() => setTab("register")}
                className={`flex-1 py-3 text-center border-b-3 transition-colors ${
                  tab === "register"
                    ? "border-[#D7263D] text-[#D7263D] bg-[#FFFDF7]"
                    : "border-transparent text-gray-400 hover:text-black"
                }`}
              >
                Join Guild
              </button>
            </div>

            {tab === "login" ? (
              <form onSubmit={handleLogin} className="space-y-4 text-xs font-bold">
                <div>
                  <label className="block text-black uppercase mb-1">
                    Hero Email
                  </label>
                  <input
                    type="email"
                    required
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    className="w-full bg-[#FFFDF7] border-2 border-black p-3 text-black outline-none focus:border-[#D7263D]"
                  />
                </div>
                <div>
                  <label className="block text-black uppercase mb-1">
                    Passkey / Secret
                  </label>
                  <input
                    type="password"
                    required
                    value={loginPass}
                    onChange={(e) => setLoginPass(e.target.value)}
                    className="w-full bg-[#FFFDF7] border-2 border-black p-3 text-black outline-none focus:border-[#D7263D]"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-[#D7263D] hover:bg-[#b51f33] text-white text-xs font-black uppercase tracking-widest py-3.5 border-3 border-black shadow-[3px_3px_0px_#FFE600] transition-all"
                >
                  ENTER THE GUILD &rarr;
                </button>
                <div className="pt-2 text-center text-[10px] text-gray-600 font-mono">
                  Demo: <code className="text-[#D7263D] font-bold">aanya@example.com</code> / <code className="text-[#D7263D] font-bold">admin123</code>
                </div>
              </form>
            ) : (
              <form onSubmit={handleRegister} className="space-y-4 text-xs font-bold">
                <div>
                  <label className="block text-black uppercase mb-1">
                    Full Hero Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={regName}
                    onChange={(e) => setRegName(e.target.value)}
                    className="w-full bg-[#FFFDF7] border-2 border-black p-3 text-black outline-none focus:border-[#D7263D]"
                  />
                </div>
                <div>
                  <label className="block text-black uppercase mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                    className="w-full bg-[#FFFDF7] border-2 border-black p-3 text-black outline-none focus:border-[#D7263D]"
                  />
                </div>
                <div>
                  <label className="block text-black uppercase mb-1">
                    Mobile Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={regPhone}
                    onChange={(e) => setRegPhone(e.target.value)}
                    className="w-full bg-[#FFFDF7] border-2 border-black p-3 text-black outline-none focus:border-[#D7263D]"
                  />
                </div>
                <div>
                  <label className="block text-black uppercase mb-1">
                    Create Secret Passkey *
                  </label>
                  <input
                    type="password"
                    required
                    value={regPass}
                    onChange={(e) => setRegPass(e.target.value)}
                    className="w-full bg-[#FFFDF7] border-2 border-black p-3 text-black outline-none focus:border-[#D7263D]"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-[#D7263D] hover:bg-[#b51f33] text-white text-xs font-black uppercase tracking-widest py-3.5 border-3 border-black shadow-[3px_3px_0px_#FFE600] transition-all"
                >
                  ISSUE GUILD PASS &rarr;
                </button>
              </form>
            )}
          </div>
        ) : (
          /* Logged In Dashboard */
          <div className="space-y-12">
            {/* Guild Member Pass Header */}
            <div className="bg-white border-4 border-black p-6 sm:p-10 shadow-[10px_10px_0px_#000] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-[#FFE600] border-3 border-black text-black flex items-center justify-center font-black text-2xl shadow-[3px_3px_0px_#000]">
                  <User className="w-8 h-8" />
                </div>
                <div className="space-y-1">
                  <span className="px-2 py-0.5 bg-[#D7263D] text-white text-[10px] font-black uppercase border border-black inline-block">
                    SHONEN GUILD MEMBER
                  </span>
                  <h2 className="text-2xl font-black uppercase tracking-tight text-black">
                    {customer?.full_name}
                  </h2>
                  <p className="text-xs text-gray-600 font-mono font-bold">
                    {customer?.email} &bull; {customer?.phone}
                  </p>
                </div>
              </div>

              <button
                onClick={logout}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-white border-2 border-black hover:bg-black hover:text-white text-xs font-black text-black transition-colors uppercase shadow-[3px_3px_0px_#000]"
              >
                <LogOut className="w-4 h-4" />
                Sign Out / Exit Studio
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
              {/* Addresses */}
              <div className="lg:col-span-5 space-y-6">
                <div className="bg-white border-4 border-black p-6 sm:p-8 space-y-4 text-xs font-bold shadow-[6px_6px_0px_#000]">
                  <div className="flex items-center justify-between border-b-2 border-black pb-3">
                    <span className="text-black font-black uppercase">
                      SAVED DELIVERY HUBS
                    </span>
                    <button
                      onClick={() => setShowAddrForm(!showAddrForm)}
                      className="text-xs text-[#D7263D] underline uppercase font-black"
                    >
                      {showAddrForm ? "Cancel" : "+ Add Hub"}
                    </button>
                  </div>

                  {showAddrForm && (
                    <form onSubmit={handleSaveAddr} className="p-4 bg-[#FFFDF7] border-2 border-black space-y-3">
                      <div>
                        <label className="block text-black uppercase text-[10px] mb-1">Street / Apartment *</label>
                        <input
                          type="text"
                          required
                          value={newAddrLine}
                          onChange={(e) => setNewAddrLine(e.target.value)}
                          placeholder="e.g. 14 Barakhamba Road"
                          className="w-full bg-white border border-black p-2 text-black outline-none"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block text-black uppercase text-[10px] mb-1">City</label>
                          <input
                            type="text"
                            value={newCity}
                            onChange={(e) => setNewCity(e.target.value)}
                            className="w-full bg-white border border-black p-2 text-black outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-black uppercase text-[10px] mb-1">Pincode *</label>
                          <input
                            type="text"
                            required
                            value={newPincode}
                            onChange={(e) => setNewPincode(e.target.value)}
                            placeholder="110001"
                            className="w-full bg-white border border-black p-2 text-black outline-none"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-black uppercase text-[10px] mb-1">Landmark</label>
                        <input
                          type="text"
                          value={newLandmark}
                          onChange={(e) => setNewLandmark(e.target.value)}
                          placeholder="Near Metro Station"
                          className="w-full bg-white border border-black p-2 text-black outline-none"
                        />
                      </div>
                      <button
                        type="submit"
                        className="w-full bg-[#FFE600] text-black font-black py-2 text-xs uppercase border border-black"
                      >
                        Save Drop Hub
                      </button>
                    </form>
                  )}

                  <div className="space-y-3">
                    {addresses.length === 0 ? (
                      <p className="text-gray-500">No saved delivery hubs recorded.</p>
                    ) : (
                      addresses.map((a) => (
                        <div key={a.id} className="p-3 bg-[#FFFDF7] border-2 border-black space-y-1">
                          <p className="text-black font-black">{a.address_line}</p>
                          <p className="text-gray-600 text-[11px] font-mono">{a.city} &bull; {a.pincode}</p>
                          {a.landmark && <p className="text-[#D7263D] text-[10px]">Landmark: {a.landmark}</p>}
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>

              {/* Past Comic Orders */}
              <div className="lg:col-span-7 space-y-6">
                <div className="bg-white border-4 border-black p-6 sm:p-8 space-y-6 text-xs font-bold shadow-[6px_6px_0px_#000]">
                  <div className="flex items-center justify-between border-b-2 border-black pb-3">
                    <span className="text-black font-black uppercase">
                      COMIC ORDERS IN ARCHIVE ({orders.length})
                    </span>
                  </div>

                  {orders.length === 0 ? (
                    <div className="text-center py-8 space-y-3">
                      <Zap className="w-10 h-10 text-gray-300 mx-auto" />
                      <p className="text-gray-500">No comic orders recorded on your guild pass.</p>
                      <Link
                        href="/concept-f/menu/"
                        className="inline-block bg-[#D7263D] text-white px-5 py-2 text-xs uppercase font-black border-2 border-black"
                      >
                        Start Chapter 01 &rarr;
                      </Link>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {orders.map((o) => (
                        <div
                          key={o.id}
                          className="p-5 bg-[#FFFDF7] border-2 border-black hover:shadow-[4px_4px_0px_#FFE600] transition-all space-y-3"
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <span className="text-[10px] text-gray-500 font-mono">ORDER CERTIFICATE</span>
                              <h4 className="text-sm font-black text-black">#{o.order_number}</h4>
                            </div>
                            <span className="px-2.5 py-1 bg-[#FFE600] text-black text-[10px] font-black border border-black uppercase">
                              {o.order_status}
                            </span>
                          </div>

                          <div className="flex justify-between text-gray-700 text-[11px] font-mono border-t border-black/10 pt-2">
                            <span>MODE: {o.order_type?.toUpperCase()}</span>
                            <span className="text-black font-black">{api.formatPrice(o.total_amount)}</span>
                          </div>

                          <div className="pt-1">
                            <Link
                              href={`/concept-f/order-tracking/?order=${o.order_number}`}
                              className="text-xs text-[#D7263D] hover:underline uppercase font-black"
                            >
                              Track on Shonen Radar &rarr;
                            </Link>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <ConceptFFooter />
    </div>
  );
}
