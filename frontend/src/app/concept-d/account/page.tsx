"use client";

import React, { useState } from "react";
import Link from "next/link";
import { User, LogOut, Plus, Mail, Phone, Leaf } from "lucide-react";
import ConceptDHeader from "@/components/concept-d/Header";
import ConceptDFooter from "@/components/concept-d/Footer";
import { useAuth } from "@/context/AuthContext";
import * as api from "@/lib/api";

export default function ConceptDAccountPage() {
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
    <div className="bg-[#FDFBF7] min-h-screen text-[#1E3F20] flex flex-col font-serif selection:bg-[#7B8E78] selection:text-white">
      <ConceptDHeader />

      {/* Account Banner */}
      <section className="bg-[#F2EFE9] py-16 border-b border-[#5E6B4E]/20 text-center space-y-3">
        <span className="text-[11px] uppercase tracking-widest text-[#7B8E78] block">
          Patron Circle
        </span>
        <h1 className="text-4xl sm:text-6xl font-normal text-[#1E3F20] tracking-tight">
          {isAuthenticated ? `Welcome, ${customer?.full_name}` : "Patron Profile"}
        </h1>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-16 flex-1 w-full">
        {!isAuthenticated ? (
          <div className="max-w-md mx-auto bg-white rounded-3xl border border-[#5E6B4E]/25 p-8 sm:p-10 shadow-lg space-y-6">
            {/* Tab */}
            <div className="grid grid-cols-2 gap-2 bg-[#F2EFE9] p-1 rounded-full text-xs">
              <button
                onClick={() => setTab("login")}
                className={`py-2 rounded-full transition-all ${
                  tab === "login"
                    ? "bg-[#5E6B4E] text-[#FDFBF7]"
                    : "text-[#5E6B4E] hover:text-[#1E3F20]"
                }`}
              >
                Sign In
              </button>
              <button
                onClick={() => setTab("register")}
                className={`py-2 rounded-full transition-all ${
                  tab === "register"
                    ? "bg-[#5E6B4E] text-[#FDFBF7]"
                    : "text-[#5E6B4E] hover:text-[#1E3F20]"
                }`}
              >
                Join Patron Circle
              </button>
            </div>

            {tab === "login" ? (
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#5E6B4E] mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    className="w-full bg-[#FDFBF7] border border-[#5E6B4E]/30 rounded-xl p-2.5 text-xs focus:border-[#5E6B4E] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#5E6B4E] mb-1">
                    Password
                  </label>
                  <input
                    type="password"
                    required
                    value={loginPass}
                    onChange={(e) => setLoginPass(e.target.value)}
                    className="w-full bg-[#FDFBF7] border border-[#5E6B4E]/30 rounded-xl p-2.5 text-xs focus:border-[#5E6B4E] outline-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-[#5E6B4E] hover:bg-[#4E5B3F] text-[#FDFBF7] text-xs font-sans uppercase tracking-widest py-3.5 rounded-full transition-all shadow-md"
                >
                  Sign In &rarr;
                </button>
              </form>
            ) : (
              <form onSubmit={handleRegister} className="space-y-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#5E6B4E] mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={regName}
                    onChange={(e) => setRegName(e.target.value)}
                    className="w-full bg-[#FDFBF7] border border-[#5E6B4E]/30 rounded-xl p-2.5 text-xs focus:border-[#5E6B4E] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#5E6B4E] mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                    className="w-full bg-[#FDFBF7] border border-[#5E6B4E]/30 rounded-xl p-2.5 text-xs focus:border-[#5E6B4E] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#5E6B4E] mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    required
                    value={regPhone}
                    onChange={(e) => setRegPhone(e.target.value)}
                    className="w-full bg-[#FDFBF7] border border-[#5E6B4E]/30 rounded-xl p-2.5 text-xs focus:border-[#5E6B4E] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#5E6B4E] mb-1">
                    Password
                  </label>
                  <input
                    type="password"
                    required
                    value={regPass}
                    onChange={(e) => setRegPass(e.target.value)}
                    className="w-full bg-[#FDFBF7] border border-[#5E6B4E]/30 rounded-xl p-2.5 text-xs focus:border-[#5E6B4E] outline-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-[#5E6B4E] hover:bg-[#4E5B3F] text-[#FDFBF7] text-xs font-sans uppercase tracking-widest py-3.5 rounded-full transition-all shadow-md"
                >
                  Create Patron Account &rarr;
                </button>
              </form>
            )}
          </div>
        ) : (
          <div className="space-y-10">
            {/* Profile Overview */}
            <div className="bg-white rounded-3xl border border-[#5E6B4E]/20 p-6 sm:p-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shadow-sm">
              <div className="space-y-1">
                <span className="text-[10px] uppercase tracking-widest text-[#7B8E78]">
                  Patron Circle Member
                </span>
                <h2 className="text-2xl font-normal text-[#1E3F20]">{customer?.full_name}</h2>
                <p className="text-xs text-[#5E6B4E]">
                  {customer?.email} &bull; {customer?.phone}
                </p>
              </div>

              <button
                onClick={logout}
                className="bg-[#F2EFE9] hover:bg-[#EAE5DC] text-[#C86D51] text-xs px-5 py-2.5 rounded-full border border-[#5E6B4E]/20 flex items-center gap-1.5 transition-colors"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out</span>
              </button>
            </div>

            {/* Addresses and Past Orders */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Addresses */}
              <div className="bg-white rounded-3xl border border-[#5E6B4E]/20 p-6 sm:p-8 shadow-xs space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-[#5E6B4E]/20">
                  <h3 className="text-base font-normal">
                    Delivery Addresses ({addresses.length})
                  </h3>
                  <button
                    onClick={() => setShowAddrForm(!showAddrForm)}
                    className="text-xs text-[#5E6B4E] hover:underline"
                  >
                    {showAddrForm ? "Cancel" : "+ Add Destination"}
                  </button>
                </div>

                {showAddrForm && (
                  <form onSubmit={handleSaveAddr} className="p-4 bg-[#F2EFE9] rounded-2xl space-y-3">
                    <input
                      type="text"
                      required
                      placeholder="Street Address"
                      value={newAddrLine}
                      onChange={(e) => setNewAddrLine(e.target.value)}
                      className="w-full bg-white border border-[#5E6B4E]/30 rounded-xl p-2 text-xs"
                    />
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        required
                        placeholder="Pincode"
                        value={newPincode}
                        onChange={(e) => setNewPincode(e.target.value)}
                        className="w-full bg-white border border-[#5E6B4E]/30 rounded-xl p-2 text-xs"
                      />
                      <input
                        type="text"
                        placeholder="City"
                        value={newCity}
                        onChange={(e) => setNewCity(e.target.value)}
                        className="w-full bg-white border border-[#5E6B4E]/30 rounded-xl p-2 text-xs"
                      />
                    </div>
                    <button
                      type="submit"
                      className="bg-[#5E6B4E] text-white text-xs px-4 py-2 rounded-full font-sans uppercase tracking-wider"
                    >
                      Save Destination
                    </button>
                  </form>
                )}

                <div className="space-y-3">
                  {addresses.map((a) => (
                    <div key={a.id} className="p-3 bg-[#FDFBF7] rounded-xl border border-[#5E6B4E]/15 text-xs">
                      <p className="text-[#1E3F20] font-medium">{a.address_line}</p>
                      <p className="text-[#7B8E78]">{a.city} - {a.pincode}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Past Orders */}
              <div className="bg-white rounded-3xl border border-[#5E6B4E]/20 p-6 sm:p-8 shadow-xs space-y-4">
                <h3 className="text-base font-normal pb-3 border-b border-[#5E6B4E]/20">
                  Harvest Order History ({orders.length})
                </h3>

                <div className="space-y-3 max-h-80 overflow-y-auto">
                  {orders.length === 0 ? (
                    <p className="text-xs text-[#7B8E78] py-6 text-center">
                      No past harvest orders found.
                    </p>
                  ) : (
                    orders.map((o) => (
                      <div
                        key={o.id}
                        className="p-3 bg-[#FDFBF7] rounded-xl border border-[#5E6B4E]/15 flex items-center justify-between text-xs"
                      >
                        <div>
                          <p className="text-[#1E3F20] font-medium">#{o.order_number}</p>
                          <span className="text-[10px] text-[#7B8E78]">
                            {new Date(o.created_at).toLocaleDateString()} &bull; {o.order_status}
                          </span>
                        </div>
                        <div className="text-right">
                          <p className="text-[#C86D51] font-medium">{api.formatPrice(o.total_amount)}</p>
                          <Link
                            href={`/concept-d/order-tracking/?order=${encodeURIComponent(o.order_number)}`}
                            className="text-[10px] text-[#5E6B4E] hover:underline"
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

      <ConceptDFooter />
    </div>
  );
}
