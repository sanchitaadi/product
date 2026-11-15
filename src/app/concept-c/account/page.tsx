"use client";

import React, { useState } from "react";
import Link from "next/link";
import { User, LogOut, Plus, Mail, Phone, Zap } from "lucide-react";
import ConceptCHeader from "@/components/concept-c/Header";
import ConceptCFooter from "@/components/concept-c/Footer";
import { useAuth } from "@/context/AuthContext";
import * as api from "@/lib/api";

export default function ConceptCAccountPage() {
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
    <div className="bg-[#FFFDF7] min-h-screen text-[#111111] flex flex-col font-sans selection:bg-[#FFE600] selection:text-black">
      <ConceptCHeader />

      {/* Account Banner */}
      <section className="bg-[#0047FF] text-white py-16 border-b-4 border-black text-center space-y-3 relative">
        <span className="bg-[#FFE600] text-black text-xs font-black uppercase px-3 py-1 border-2 border-black inline-block -rotate-2">
          ★ POP ART PASSPORT ★
        </span>
        <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tight">
          {isAuthenticated ? `HELLO, ${customer?.full_name?.toUpperCase()}` : "PATRON PORTAL"}
        </h1>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-16 flex-1 w-full">
        {!isAuthenticated ? (
          <div className="max-w-md mx-auto bg-white border-4 border-black p-8 sm:p-10 shadow-[8px_8px_0px_#FF007F] space-y-6">
            {/* Tab Switcher */}
            <div className="grid grid-cols-2 gap-2 border-2 border-black p-1 bg-[#FFFDF7]">
              <button
                onClick={() => setTab("login")}
                className={`py-2 text-xs font-black uppercase transition-all ${
                  tab === "login"
                    ? "bg-[#FFE600] text-black shadow-[2px_2px_0px_#000]"
                    : "text-gray-600 hover:text-black"
                }`}
              >
                Sign In
              </button>
              <button
                onClick={() => setTab("register")}
                className={`py-2 text-xs font-black uppercase transition-all ${
                  tab === "register"
                    ? "bg-[#FF007F] text-white shadow-[2px_2px_0px_#000]"
                    : "text-gray-600 hover:text-black"
                }`}
              >
                New Account
              </button>
            </div>

            {tab === "login" ? (
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-xs font-black uppercase mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    className="w-full bg-[#FFFDF7] border-3 border-black p-2.5 text-xs font-bold focus:bg-[#FFE600]/20 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-black uppercase mb-1">
                    Password
                  </label>
                  <input
                    type="password"
                    required
                    value={loginPass}
                    onChange={(e) => setLoginPass(e.target.value)}
                    className="w-full bg-[#FFFDF7] border-3 border-black p-2.5 text-xs font-bold focus:bg-[#FFE600]/20 focus:outline-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-[#0047FF] hover:bg-[#FF007F] text-white font-black uppercase text-xs py-3.5 border-3 border-black shadow-[4px_4px_0px_#000] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all"
                >
                  ENTER POP PASSPORT &rarr;
                </button>
              </form>
            ) : (
              <form onSubmit={handleRegister} className="space-y-4">
                <div>
                  <label className="block text-xs font-black uppercase mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={regName}
                    onChange={(e) => setRegName(e.target.value)}
                    className="w-full bg-[#FFFDF7] border-3 border-black p-2.5 text-xs font-bold focus:bg-[#FFE600]/20 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-black uppercase mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                    className="w-full bg-[#FFFDF7] border-3 border-black p-2.5 text-xs font-bold focus:bg-[#FFE600]/20 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-black uppercase mb-1">
                    Phone
                  </label>
                  <input
                    type="tel"
                    required
                    value={regPhone}
                    onChange={(e) => setRegPhone(e.target.value)}
                    className="w-full bg-[#FFFDF7] border-3 border-black p-2.5 text-xs font-bold focus:bg-[#FFE600]/20 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-black uppercase mb-1">
                    Password
                  </label>
                  <input
                    type="password"
                    required
                    value={regPass}
                    onChange={(e) => setRegPass(e.target.value)}
                    className="w-full bg-[#FFFDF7] border-3 border-black p-2.5 text-xs font-bold focus:bg-[#FFE600]/20 focus:outline-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-[#FF007F] hover:bg-black text-white font-black uppercase text-xs py-3.5 border-3 border-black shadow-[4px_4px_0px_#000] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all"
                >
                  CREATE POP ACCOUNT &rarr;
                </button>
              </form>
            )}
          </div>
        ) : (
          <div className="space-y-10">
            {/* Profile Overview */}
            <div className="bg-white border-4 border-black p-6 sm:p-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shadow-[6px_6px_0px_#FFE600]">
              <div className="space-y-1">
                <span className="bg-[#FFE600] text-black text-[10px] font-black uppercase px-2 py-0.5 border border-black">
                  POP ART MEMBER
                </span>
                <h2 className="text-2xl font-black uppercase">{customer?.full_name}</h2>
                <p className="text-xs font-bold text-gray-600">
                  {customer?.email} &bull; {customer?.phone}
                </p>
              </div>

              <button
                onClick={logout}
                className="bg-[#FF1E27] text-white font-black uppercase text-xs px-5 py-2.5 border-2 border-black shadow-[3px_3px_0px_#000] flex items-center gap-1.5"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>SIGN OUT</span>
              </button>
            </div>

            {/* Saved Addresses & Past Orders */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Addresses */}
              <div className="bg-white border-4 border-black p-6 sm:p-8 shadow-[6px_6px_0px_#000] space-y-4">
                <div className="flex items-center justify-between pb-3 border-b-2 border-black">
                  <h3 className="text-base font-black uppercase">
                    Delivery Addresses ({addresses.length})
                  </h3>
                  <button
                    onClick={() => setShowAddrForm(!showAddrForm)}
                    className="text-xs font-black uppercase text-[#0047FF] hover:underline"
                  >
                    {showAddrForm ? "Cancel" : "+ Add New"}
                  </button>
                </div>

                {showAddrForm && (
                  <form onSubmit={handleSaveAddr} className="p-4 bg-[#FFE600]/20 border-2 border-black space-y-3">
                    <input
                      type="text"
                      required
                      placeholder="Street Address"
                      value={newAddrLine}
                      onChange={(e) => setNewAddrLine(e.target.value)}
                      className="w-full bg-white border-2 border-black p-2 text-xs font-bold"
                    />
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        required
                        placeholder="Pincode"
                        value={newPincode}
                        onChange={(e) => setNewPincode(e.target.value)}
                        className="w-full bg-white border-2 border-black p-2 text-xs font-bold"
                      />
                      <input
                        type="text"
                        placeholder="City"
                        value={newCity}
                        onChange={(e) => setNewCity(e.target.value)}
                        className="w-full bg-white border-2 border-black p-2 text-xs font-bold"
                      />
                    </div>
                    <button
                      type="submit"
                      className="bg-black text-white text-xs font-black uppercase px-4 py-2 border border-black"
                    >
                      SAVE ADDRESS
                    </button>
                  </form>
                )}

                <div className="space-y-3">
                  {addresses.map((a) => (
                    <div key={a.id} className="p-3 bg-[#FFFDF7] border-2 border-black text-xs font-bold">
                      <p className="text-black">{a.address_line}</p>
                      <p className="text-gray-500">{a.city} - {a.pincode}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Past Orders */}
              <div className="bg-white border-4 border-black p-6 sm:p-8 shadow-[6px_6px_0px_#000] space-y-4">
                <h3 className="text-base font-black uppercase pb-3 border-b-2 border-black">
                  Past Orders ({orders.length})
                </h3>

                <div className="space-y-3 max-h-80 overflow-y-auto">
                  {orders.length === 0 ? (
                    <p className="text-xs font-bold text-gray-500 py-6 text-center">
                      No past orders found in your passport.
                    </p>
                  ) : (
                    orders.map((o) => (
                      <div
                        key={o.id}
                        className="p-3 bg-[#FFFDF7] border-2 border-black flex items-center justify-between text-xs font-black"
                      >
                        <div>
                          <p className="text-black">#{o.order_number}</p>
                          <span className="text-[10px] text-gray-500 font-mono">
                            {new Date(o.created_at).toLocaleDateString()} &bull; {o.order_status}
                          </span>
                        </div>
                        <div className="text-right">
                          <p className="text-[#FF007F]">{api.formatPrice(o.total_amount)}</p>
                          <Link
                            href={`/concept-c/order-tracking/?order=${encodeURIComponent(o.order_number)}`}
                            className="text-[10px] text-[#0047FF] hover:underline"
                          >
                            Track &rarr;
                          </Link>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <ConceptCFooter />
    </div>
  );
}
