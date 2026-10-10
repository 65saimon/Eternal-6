"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

interface WishlistContextType {
  items: string[]; // array of product ids
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  totalWishlist: number;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<string[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("eternal6_wishlist");
      if (saved) {
        setItems(JSON.parse(saved));
      }
    } catch {
      // Ignore
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem("eternal6_wishlist", JSON.stringify(items));
      } catch {
        // Ignore
      }
    }
  }, [items, isLoaded]);

  const toggleWishlist = (productId: string) => {
    setItems((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const isInWishlist = (productId: string) => items.includes(productId);

  return (
    <WishlistContext.Provider
      value={{
        items,
        toggleWishlist,
        isInWishlist,
        totalWishlist: items.length,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
}
