"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import * as api from "@/lib/api";
import { useToast } from "./ToastContext";

interface WishlistContextType {
  wishlistIds: number[];
  wishlistCount: number;
  toggleWishlist: (itemId: number) => Promise<boolean>;
  isInWishlist: (itemId: number) => boolean;
  refreshWishlist: () => Promise<void>;
}

const WishlistContext = createContext<WishlistContextType | null>(null);

export const useWishlist = () => {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used within WishlistProvider");
  return ctx;
};

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [wishlistIds, setWishlistIds] = useState<number[]>([]);
  const { showToast } = useToast();

  const refreshWishlist = useCallback(async () => {
    try {
      const res = await api.getWishlist();
      if (res.success && Array.isArray(res.items)) {
        setWishlistIds(res.items.map((i: any) => Number(i.id)));
      }
    } catch {
      // Catch silently on static render
    }
  }, []);

  useEffect(() => {
    refreshWishlist();
  }, [refreshWishlist]);

  const toggleWishlist = async (itemId: number): Promise<boolean> => {
    try {
      // Optimistic update
      const exists = wishlistIds.includes(itemId);
      setWishlistIds((prev) =>
        exists ? prev.filter((id) => id !== itemId) : [...prev, itemId]
      );

      const res = await api.toggleWishlist(itemId);
      if (res.success) {
        showToast(
          res.action === "added" ? "Saved to your wishlist! 💖" : "Removed from wishlist.",
          "info"
        );
        return true;
      } else {
        await refreshWishlist();
        return false;
      }
    } catch {
      await refreshWishlist();
      return false;
    }
  };

  const isInWishlist = (itemId: number) => wishlistIds.includes(itemId);

  return (
    <WishlistContext.Provider
      value={{
        wishlistIds,
        wishlistCount: wishlistIds.length,
        toggleWishlist,
        isInWishlist,
        refreshWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}
