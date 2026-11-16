"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  ShoppingBag,
  UtensilsCrossed,
  Tags,
  Users,
  Calendar,
  TicketPercent,
  Star,
  Image as ImageIcon,
  BarChart3,
  Settings,
  Shield,
  LogOut,
  Bell,
  Menu,
  X,
  ExternalLink,
  ChevronRight,
  UserCheck,
} from "lucide-react";
import * as api from "@/lib/api";

interface AdminLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
}

export default function AdminLayout({ children, title, subtitle }: AdminLayoutProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [admin, setAdmin] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check admin session
    api
      .adminMe()
      .then((res) => {
        if (res.success && res.authenticated) {
          setAdmin(res.admin);
        } else {
          // If unauthenticated on protected routes, redirect to login
          if (pathname !== "/admin/login/" && pathname !== "/admin/login") {
            router.push("/admin/login/");
          }
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [pathname, router]);

  const handleLogout = async () => {
    await api.adminLogout();
    router.push("/admin/login/");
  };

  const navItems = [
    { label: "Overview", href: "/admin/", icon: LayoutDashboard },
    { label: "Orders & Shipping", href: "/admin/orders/", icon: ShoppingBag },
    { label: "Product Catalog", href: "/admin/menu/", icon: UtensilsCrossed },
    { label: "Categories", href: "/admin/categories/", icon: Tags },
    { label: "Customers", href: "/admin/customers/", icon: Users },
    { label: "Wholesale Inquiries", href: "/admin/reservations/", icon: Calendar },
    { label: "Coupons & Promos", href: "/admin/coupons/", icon: TicketPercent },
    { label: "Product Reviews", href: "/admin/reviews/", icon: Star },
    { label: "Media & Assets", href: "/admin/gallery/", icon: ImageIcon },
    { label: "Sales Analytics", href: "/admin/analytics/", icon: BarChart3 },
    { label: "Store Settings", href: "/admin/settings/", icon: Settings },
    { label: "Profile & Security", href: "/admin/profile/", icon: Shield },
  ];

  const isActive = (href: string) => {
    if (href === "/admin/") return pathname === "/admin" || pathname === "/admin/";
    return pathname.startsWith(href);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex font-sans antialiased selection:bg-indigo-100 selection:text-indigo-900">
      {/* Mobile Sidebar Backdrop */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-sm lg:hidden"
        />
      )}

      {/* Sidebar Navigation */}
      <aside
        className={`fixed lg:sticky top-0 left-0 z-50 h-screen w-64 bg-slate-900 text-slate-300 flex flex-col justify-between transition-transform duration-200 border-r border-slate-800 shadow-2xl lg:shadow-none ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="flex flex-col h-full overflow-hidden">
          {/* Brand Header */}
          <div className="p-6 border-b border-slate-800 flex items-center justify-between">
            <Link href="/admin/" className="flex items-center gap-3">
              <span className="w-9 h-9 rounded-xl bg-indigo-500 text-white flex items-center justify-center font-bold text-lg shadow-md shadow-indigo-500/30">
                🍑
              </span>
              <div>
                <span className="font-bold text-white tracking-wide text-sm block">
                  PEACHY SUITE
                </span>
                <span className="text-[10px] uppercase tracking-widest text-indigo-400 font-bold block">
                  Restaurant SaaS v2.0
                </span>
              </div>
            </Link>

            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-1 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Nav Items List */}
          <nav className="p-4 space-y-1 overflow-y-auto flex-1">
            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500 px-3 py-2">
              Back-Office Operations
            </div>
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition ${
                    active
                      ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30 font-bold"
                      : "text-slate-400 hover:text-white hover:bg-slate-800/60"
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span className="truncate">{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Quick Concept Preview Links & Admin Info */}
          <div className="p-4 border-t border-slate-800 bg-slate-950/40 space-y-3">
            <div className="flex items-center justify-between text-[11px] text-slate-400">
              <span className="truncate">{admin?.full_name || "Manager"}</span>
              <button
                onClick={handleLogout}
                className="hover:text-rose-400 transition"
                title="Sign out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>

            <Link
              href="/concept-a/"
              target="_blank"
              className="flex items-center justify-between p-2 rounded-lg bg-slate-800 text-[11px] font-semibold text-slate-300 hover:text-white hover:bg-slate-700 transition"
            >
              <span>View Live Website</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Navbar */}
        <header className="sticky top-0 z-30 bg-white border-b border-slate-200 h-16 flex items-center justify-between px-6 shadow-sm">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-lg border border-slate-200 text-slate-600"
              aria-label="Open sidebar"
            >
              <Menu className="w-5 h-5" />
            </button>

            <div>
              <h1 className="text-base font-bold text-slate-900 tracking-tight">{title}</h1>
              {subtitle && <p className="text-xs text-slate-500 font-normal">{subtitle}</p>}
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Live Database Status */}
            <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>MySQL Live</span>
            </span>

            <Link
              href="/admin/orders/"
              className="p-2 rounded-xl border border-slate-200 text-slate-600 hover:text-indigo-600 hover:bg-slate-50 transition relative"
            >
              <Bell className="w-4 h-4" />
            </Link>
          </div>
        </header>

        {/* Page Children */}
        <main className="p-6 md:p-8 flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
