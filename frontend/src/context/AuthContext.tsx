"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import * as api from "@/lib/api";
import { useToast } from "./ToastContext";

interface Customer {
  id: number;
  full_name: string;
  email: string;
  phone: string;
}

interface Address {
  id: number;
  title: string;
  address_line: string;
  city: string;
  pincode: string;
  landmark: string;
  is_default: boolean;
}

interface AuthContextType {
  customer: Customer | null;
  addresses: Address[];
  orders: any[];
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (data: { full_name: string; email: string; phone: string; password: string }) => Promise<boolean>;
  logout: () => Promise<void>;
  saveAddress: (addressData: any) => Promise<boolean>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { showToast } = useToast();

  const refreshProfile = useCallback(async () => {
    try {
      const res = await api.authMe();
      if (res.success && res.authenticated) {
        setCustomer(res.customer);
        setAddresses(res.addresses || []);
        setOrders(res.orders || []);
      } else {
        setCustomer(null);
        setAddresses([]);
        setOrders([]);
      }
    } catch {
      // Ignored for static export
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshProfile();
  }, [refreshProfile]);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const res = await api.authLogin(email, password);
      if (res.success) {
        setCustomer(res.customer);
        setAddresses(res.addresses || []);
        setOrders(res.orders || []);
        showToast(`Welcome back, ${res.customer.full_name}!`, "success");
        return true;
      } else {
        showToast(res.error || "Login failed", "error");
        return false;
      }
    } catch {
      showToast("Authentication server unavailable.", "error");
      return false;
    }
  };

  const register = async (data: { full_name: string; email: string; phone: string; password: string }): Promise<boolean> => {
    try {
      const res = await api.authRegister(data);
      if (res.success) {
        setCustomer(res.customer);
        showToast("Account created successfully! Welcome to Peachy Plate.", "success");
        return true;
      } else {
        showToast(res.error || "Registration failed", "error");
        return false;
      }
    } catch {
      showToast("Could not complete registration.", "error");
      return false;
    }
  };

  const logout = async () => {
    await api.authLogout();
    setCustomer(null);
    setAddresses([]);
    setOrders([]);
    showToast("Signed out safely.", "info");
  };

  const saveAddress = async (addressData: any): Promise<boolean> => {
    try {
      const res = await api.authSaveAddress(addressData);
      if (res.success) {
        setAddresses(res.addresses);
        showToast("Address saved!", "success");
        return true;
      } else {
        showToast(res.error || "Failed to save address", "error");
        return false;
      }
    } catch {
      return false;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        customer,
        addresses,
        orders,
        isAuthenticated: !!customer,
        isLoading,
        login,
        register,
        logout,
        saveAddress,
        refreshProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
