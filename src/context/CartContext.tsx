"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export interface CartItem {
  id: string; // product id + variant id
  productId: string;
  name: string;
  slug: string;
  price: number;
  salePrice?: number | null;
  image: string;
  variantId?: string;
  variantName?: string;
  material?: string;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addItem: (product: {
    id: string;
    name: string;
    slug: string;
    price: number;
    salePrice?: number | null;
    image: string;
    variantId?: string;
    variantName?: string;
    material?: string;
  }, quantity?: number) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  totalCount: number;
  subtotal: number;
  deliveryZone: "chittagong" | "outside";
  setDeliveryZone: (zone: "chittagong" | "outside") => void;
  deliveryCharge: number;
  total: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [deliveryZone, setDeliveryZone] = useState<"chittagong" | "outside">("chittagong");
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem("eternal6_cart");
      if (saved) {
        setItems(JSON.parse(saved));
      }
      const savedZone = localStorage.getItem("eternal6_zone");
      if (savedZone === "chittagong" || savedZone === "outside") {
        setDeliveryZone(savedZone);
      }
    } catch {
      // Ignore localStorage error
    }
    setIsLoaded(true);
  }, []);

  // Save to localStorage
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem("eternal6_cart", JSON.stringify(items));
        localStorage.setItem("eternal6_zone", deliveryZone);
      } catch {
        // Ignore localStorage error
      }
    }
  }, [items, deliveryZone, isLoaded]);

  const addItem = (product: {
    id: string;
    name: string;
    slug: string;
    price: number;
    salePrice?: number | null;
    image: string;
    variantId?: string;
    variantName?: string;
    material?: string;
  }, quantity: number = 1) => {
    const cartItemId = `${product.id}-${product.variantId || "default"}`;
    setItems((prev) => {
      const existing = prev.find((item) => item.id === cartItemId);
      if (existing) {
        return prev.map((item) =>
          item.id === cartItemId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [
        ...prev,
        {
          id: cartItemId,
          productId: product.id,
          name: product.name,
          slug: product.slug,
          price: product.price,
          salePrice: product.salePrice,
          image: product.image,
          variantId: product.variantId,
          variantName: product.variantName,
          material: product.material,
          quantity,
        },
      ];
    });
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id);
      return;
    }
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const totalCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const subtotal = items.reduce((sum, item) => {
    const itemPrice = item.salePrice && item.salePrice > 0 ? item.salePrice : item.price;
    return sum + itemPrice * item.quantity;
  }, 0);

  // Delivery charge rule: Chittagong = 70 BDT, Outside = 130 BDT. Free if subtotal >= 2500 BDT
  const deliveryCharge = items.length === 0 ? 0 : subtotal >= 2500 ? 0 : deliveryZone === "chittagong" ? 70 : 130;
  const total = subtotal + deliveryCharge;

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        totalCount,
        subtotal,
        deliveryZone,
        setDeliveryZone,
        deliveryCharge,
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
