"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import * as api from "@/lib/api";
import { useToast } from "./ToastContext";

export interface CartItemOption {
  group_title: string;
  name: string;
  price_delta: number;
}

export interface CartItem {
  cart_key: string;
  item_id: number;
  name: string;
  category: string;
  is_veg: boolean;
  image_url: string;
  base_price: number;
  item_price: number;
  quantity: number;
  line_total: number;
  customization_options: CartItemOption[];
  special_instructions: string;
}

export interface CartState {
  items: CartItem[];
  subtotal: number;
  delivery_fee: number;
  discount_amount: number;
  coupon_code: string | null;
  total: number;
  total_count: number;
  min_order_amount: number;
  free_delivery_threshold: number;
}

const defaultCartState: CartState = {
  items: [],
  subtotal: 0,
  delivery_fee: 50,
  discount_amount: 0,
  coupon_code: null,
  total: 0,
  total_count: 0,
  min_order_amount: 199,
  free_delivery_threshold: 599,
};

interface CartContextType {
  cart: CartState;
  isDrawerOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
  toggleDrawer: () => void;
  customizingItem: any | null;
  openCustomization: (item: any) => void;
  closeCustomization: () => void;
  addToCart: (itemId: number, quantity?: number, customizations?: number[], instructions?: string) => Promise<boolean>;
  updateQty: (cartKey: string, quantity: number) => Promise<boolean>;
  removeItem: (cartKey: string) => Promise<boolean>;
  clearCart: () => Promise<void>;
  applyCoupon: (code: string) => Promise<boolean>;
  removeCoupon: () => Promise<boolean>;
  refreshCart: () => Promise<void>;
  isLoading: boolean;
  conceptTheme: "coquette" | "retro" | "popart" | "earth" | "metro" | "manga" | "circus" | "luxury" | "concept-a" | "concept-b" | "concept-c" | "concept-d" | "concept-e" | "concept-f" | "concept-g";
  setConceptTheme: (theme: "coquette" | "retro" | "popart" | "earth" | "metro" | "manga" | "circus" | "luxury" | "concept-a" | "concept-b" | "concept-c" | "concept-d" | "concept-e" | "concept-f" | "concept-g") => void;
}

const CartContext = createContext<CartContextType | null>(null);

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
};

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartState>(defaultCartState);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [customizingItem, setCustomizingItem] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [conceptTheme, setConceptTheme] = useState<"coquette" | "retro" | "popart" | "earth" | "metro" | "manga" | "circus" | "luxury" | "concept-a" | "concept-b" | "concept-c" | "concept-d" | "concept-e" | "concept-f" | "concept-g">("coquette");
  const { showToast } = useToast();

  const refreshCart = useCallback(async () => {
    try {
      const res = await api.getCart();
      if (res.success && res.cart) {
        setCart({
          items: res.cart.items || [],
          subtotal: Number(res.cart.subtotal || 0),
          delivery_fee: Number(res.cart.delivery_fee || 0),
          discount_amount: Number(res.cart.discount_amount || 0),
          coupon_code: res.cart.coupon_code || null,
          total: Number(res.cart.total || 0),
          total_count: Number(res.cart.total_count || 0),
          min_order_amount: Number(res.cart.min_order_amount || 199),
          free_delivery_threshold: Number(res.cart.free_delivery_threshold || 599),
        });
      }
    } catch {
      // Silently catch network failures during SSR or pre-export
    }
  }, []);

  useEffect(() => {
    refreshCart();
  }, [refreshCart]);

  const openDrawer = () => setIsDrawerOpen(true);
  const closeDrawer = () => setIsDrawerOpen(false);
  const toggleDrawer = () => setIsDrawerOpen((prev) => !prev);

  const openCustomization = (item: any) => setCustomizingItem(item);
  const closeCustomization = () => setCustomizingItem(null);

  const addToCart = async (
    itemId: number,
    quantity = 1,
    customizations: number[] = [],
    instructions = ""
  ): Promise<boolean> => {
    setIsLoading(true);
    try {
      const res = await api.addToCart(itemId, quantity, customizations, instructions);
      if (res.success) {
        await refreshCart();
        showToast("Added to feast!", "success");
        openDrawer();
        return true;
      } else {
        showToast(res.error || "Could not add item.", "error");
        return false;
      }
    } catch (e: any) {
      showToast("Network connection issue.", "error");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const updateQty = async (cartKey: string, quantity: number): Promise<boolean> => {
    try {
      const res = await api.updateCartQuantity(cartKey, quantity);
      if (res.success) {
        await refreshCart();
        return true;
      } else {
        showToast(res.error || "Failed to update quantity", "error");
        return false;
      }
    } catch {
      showToast("Could not update item.", "error");
      return false;
    }
  };

  const removeItem = async (cartKey: string): Promise<boolean> => {
    try {
      const res = await api.removeFromCart(cartKey);
      if (res.success) {
        await refreshCart();
        showToast("Item removed.", "info");
        return true;
      }
      return false;
    } catch {
      showToast("Could not remove item.", "error");
      return false;
    }
  };

  const clearCart = async () => {
    await api.clearCart();
    await refreshCart();
  };

  const applyCoupon = async (code: string): Promise<boolean> => {
    try {
      const res = await api.applyCoupon(code);
      if (res.success) {
        await refreshCart();
        showToast(`Promo ${code.toUpperCase()} applied!`, "success");
        return true;
      } else {
        showToast(res.error || "Invalid coupon code.", "error");
        return false;
      }
    } catch {
      showToast("Error checking coupon.", "error");
      return false;
    }
  };

  const removeCoupon = async (): Promise<boolean> => {
    try {
      const res = await api.removeCoupon();
      if (res.success) {
        await refreshCart();
        showToast("Coupon removed.", "info");
        return true;
      }
      return false;
    } catch {
      return false;
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        isDrawerOpen,
        openDrawer,
        closeDrawer,
        toggleDrawer,
        customizingItem,
        openCustomization,
        closeCustomization,
        addToCart,
        updateQty,
        removeItem,
        clearCart,
        applyCoupon,
        removeCoupon,
        refreshCart,
        isLoading,
        conceptTheme,
        setConceptTheme,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
