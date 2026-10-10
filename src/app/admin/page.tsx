"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  Package,
  ShoppingBag,
  TrendingUp,
  Clock,
  AlertTriangle,
  Calendar,
  CheckCircle,
  XCircle,
  Search,
  Filter,
  Plus,
  Printer,
  Phone,
  RefreshCw,
  Sparkles,
  Settings,
  Layers,
  Trash2,
  Edit,
  DollarSign,
  Check,
  X,
  ExternalLink,
  Eye,
  EyeOff,
  Star,
  User,
  Lock,
  ShieldCheck,
  KeyRound
} from "lucide-react";
import { FacebookIcon } from "@/components/ui/SocialIcons";

export default function AdminDashboardPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"overview" | "products" | "orders" | "bookings" | "settings">("overview");
  const [loading, setLoading] = useState(true);

  // Data states
  const [metrics, setMetrics] = useState<any>(null);
  const [orders, setOrders] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [bookings, setBookings] = useState<any[]>([]);
  const [settings, setSettings] = useState<Record<string, string>>({});

  // Admin Credentials State (Change ID & Password)
  const [currentAdminId, setCurrentAdminId] = useState("admin");
  const [credForm, setCredForm] = useState({
    currentPassword: "",
    newAdminId: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [credLoading, setCredLoading] = useState(false);
  const [credSuccess, setCredSuccess] = useState("");
  const [credError, setCredError] = useState("");
  const [showCredPassword, setShowCredPassword] = useState(false);

  // Product Filters
  const [productSearch, setProductSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [stockFilter, setStockFilter] = useState("all");

  // Inline editing state: track unsaved price/stock changes per product id
  const [inlineEdits, setInlineEdits] = useState<Record<string, { price: number; salePrice?: number | null; stock: number }>>({});
  const [savingProductId, setSavingProductId] = useState<string | null>(null);

  // Order Filters
  const [orderFilter, setOrderFilter] = useState("all");
  const [orderSearch, setOrderSearch] = useState("");

  // Modals
  const [invoiceOrder, setInvoiceOrder] = useState<any>(null);
  const [showManualOrderModal, setShowManualOrderModal] = useState(false);
  const [manualOrderData, setManualOrderData] = useState({
    customerName: "",
    phone: "",
    district: "Chattogram",
    area: "",
    fullAddress: "",
    sourceChannel: "facebook",
    productId: "",
    quantity: 1,
    paymentMethod: "cod",
    notes: "",
  });

  // Product Modals
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [showNewProductModal, setShowNewProductModal] = useState(false);
  const [newProductData, setNewProductData] = useState({
    name: "",
    sku: "",
    category: "Hijabs",
    collection: "Everyday Grace",
    material: "Georgette",
    price: 800,
    salePrice: 0,
    stock: 15,
    description: "",
    careInstructions: "Gentle cold water hand wash. Protect stone and pearl embellishments during ironing.",
    images: "/images/eternal6/790476251_122113054899417938_5662713628547669874_n.jpg",
    isPearlEdit: false,
    isPublished: true,
  });

  const getAdminKey = () => {
    return typeof window !== "undefined"
      ? localStorage.getItem("eternal6_admin_key") || "eternal6_luxury_admin_2026"
      : "eternal6_luxury_admin_2026";
  };

  const loadAllData = async () => {
    setLoading(true);
    const key = getAdminKey();
    const headers = { Authorization: `Bearer ${key}` };

    try {
      const [ovRes, ordRes, prdRes, bkgRes, stgRes, authRes] = await Promise.all([
        fetch("/api/admin/overview", { headers }),
        fetch("/api/admin/orders", { headers }),
        fetch("/api/admin/products", { headers }),
        fetch("/api/admin/bookings", { headers }),
        fetch("/api/admin/settings", { headers }),
        fetch("/api/admin/auth", { headers }),
      ]);

      if (ovRes.status === 401) {
        router.push("/admin/login");
        return;
      }

      const [ovData, ordData, prdData, bkgData, stgData, authData] = await Promise.all([
        ovRes.json(),
        ordRes.json(),
        prdRes.json(),
        bkgRes.json(),
        stgRes.json(),
        authRes.json().catch(() => ({})),
      ]);

      if (ovData.success) setMetrics(ovData.metrics);
      if (ordData.success) setOrders(ordData.orders);
      if (prdData.success) {
        setProducts(prdData.products);
        // Initialize inline edit cache
        const cache: Record<string, any> = {};
        prdData.products.forEach((p: any) => {
          cache[p.id] = { price: p.price, salePrice: p.salePrice || null, stock: p.stock };
        });
        setInlineEdits(cache);
      }
      if (bkgData.success) setBookings(bkgData.bookings);
      if (stgData.success) setSettings(stgData.settings);
      if (authData?.authenticated && authData?.adminId) {
        setCurrentAdminId(authData.adminId);
        setCredForm((prev) => ({ ...prev, newAdminId: authData.adminId }));
      }
    } catch (err) {
      console.error("Dashboard data load error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAllData();
  }, []);

  // --- PRODUCT MANAGEMENT ACTIONS ---

  // Save inline price & stock changes
  const handleSaveInlineProduct = async (productId: string) => {
    const edit = inlineEdits[productId];
    if (!edit) return;

    setSavingProductId(productId);
    const key = getAdminKey();
    try {
      const res = await fetch(`/api/admin/products/${productId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${key}` },
        body: JSON.stringify({
          price: Number(edit.price),
          salePrice: edit.salePrice ? Number(edit.salePrice) : null,
          stock: Number(edit.stock),
        }),
      });

      if (res.ok) {
        setProducts((prev) =>
          prev.map((p) =>
            p.id === productId
              ? { ...p, price: Number(edit.price), salePrice: edit.salePrice ? Number(edit.salePrice) : null, stock: Number(edit.stock) }
              : p
          )
        );
      }
    } catch (err) {
      console.error("Failed to save inline product edit", err);
    } finally {
      setSavingProductId(null);
    }
  };

  // Toggle Pearl Edit badge
  const handleTogglePearlEdit = async (productId: string, current: boolean) => {
    const key = getAdminKey();
    try {
      const res = await fetch(`/api/admin/products/${productId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${key}` },
        body: JSON.stringify({ isPearlEdit: !current }),
      });
      if (res.ok) {
        setProducts((prev) =>
          prev.map((p) => (p.id === productId ? { ...p, isPearlEdit: !current } : p))
        );
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Toggle Publish Status
  const handleTogglePublish = async (productId: string, current: boolean) => {
    const key = getAdminKey();
    try {
      const res = await fetch(`/api/admin/products/${productId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${key}` },
        body: JSON.stringify({ isPublished: !current }),
      });
      if (res.ok) {
        setProducts((prev) =>
          prev.map((p) => (p.id === productId ? { ...p, isPublished: !current } : p))
        );
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Submit Full Product Edit
  const handleSaveFullEditProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;

    const key = getAdminKey();
    try {
      const res = await fetch(`/api/admin/products/${editingProduct.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${key}` },
        body: JSON.stringify({
          name: editingProduct.name,
          sku: editingProduct.sku,
          price: Number(editingProduct.price),
          salePrice: editingProduct.salePrice ? Number(editingProduct.salePrice) : null,
          category: editingProduct.category,
          collection: editingProduct.collection,
          material: editingProduct.material,
          stock: Number(editingProduct.stock),
          description: editingProduct.description,
          careInstructions: editingProduct.careInstructions,
          images: typeof editingProduct.images === "string" ? editingProduct.images : JSON.stringify(editingProduct.images),
          isPearlEdit: Boolean(editingProduct.isPearlEdit),
          isPublished: Boolean(editingProduct.isPublished),
        }),
      });

      if (res.ok) {
        setEditingProduct(null);
        loadAllData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Create New Product
  const handleCreateNewProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    const key = getAdminKey();

    try {
      const imagesArray = newProductData.images
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);

      const res = await fetch("/api/admin/products", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${key}` },
        body: JSON.stringify({
          name: newProductData.name,
          sku: newProductData.sku || `ET6-${Date.now().toString().slice(-4)}`,
          category: newProductData.category,
          collection: newProductData.collection,
          material: newProductData.material,
          price: Number(newProductData.price),
          salePrice: newProductData.salePrice ? Number(newProductData.salePrice) : null,
          stock: Number(newProductData.stock),
          description: newProductData.description || `${newProductData.name} crafted in luxury ${newProductData.material}.`,
          careInstructions: newProductData.careInstructions,
          images: imagesArray.length > 0 ? imagesArray : ["/images/logo/eternal6-logo.png"],
          isPearlEdit: Boolean(newProductData.isPearlEdit),
          isPublished: Boolean(newProductData.isPublished),
        }),
      });

      if (res.ok) {
        setShowNewProductModal(false);
        setNewProductData({
          name: "",
          sku: "",
          category: "Hijabs",
          collection: "Everyday Grace",
          material: "Georgette",
          price: 800,
          salePrice: 0,
          stock: 15,
          description: "",
          careInstructions: "Gentle cold water hand wash. Protect stone and pearl embellishments during ironing.",
          images: "/images/eternal6/790476251_122113054899417938_5662713628547669874_n.jpg",
          isPearlEdit: false,
          isPublished: true,
        });
        loadAllData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Delete Product
  const handleDeleteProduct = async (productId: string, name: string) => {
    if (!confirm(`Are you sure you want to remove "${name}" from the boutique catalog?`)) {
      return;
    }

    const key = getAdminKey();
    try {
      const res = await fetch(`/api/admin/products/${productId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${key}` },
      });
      if (res.ok) {
        setProducts((prev) => prev.filter((p) => p.id !== productId));
      }
    } catch (err) {
      console.error(err);
    }
  };

  // --- ORDER MANAGEMENT ACTIONS ---
  const handleUpdateOrderStatus = async (orderId: string, orderStatus: string, paymentStatus?: string) => {
    const key = getAdminKey();
    try {
      const res = await fetch(`/api/admin/orders/${orderId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${key}` },
        body: JSON.stringify({ orderStatus, paymentStatus }),
      });
      if (res.ok) {
        loadAllData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleCreateManualOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    const key = getAdminKey();

    try {
      const payload = {
        customerName: manualOrderData.customerName,
        phone: manualOrderData.phone,
        district: manualOrderData.district,
        area: manualOrderData.area,
        fullAddress: manualOrderData.fullAddress,
        paymentMethod: manualOrderData.paymentMethod,
        sourceChannel: manualOrderData.sourceChannel,
        notes: manualOrderData.notes,
        items: [
          {
            productId: manualOrderData.productId || products[0]?.id,
            quantity: Number(manualOrderData.quantity) || 1,
          },
        ],
      };

      const res = await fetch("/api/admin/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${key}` },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setShowManualOrderModal(false);
        loadAllData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  // --- BOOKING ACTIONS ---
  const handleUpdateBookingStatus = async (bookingId: string, status: string, agreedPrice?: number) => {
    const key = getAdminKey();
    try {
      const res = await fetch(`/api/admin/bookings/${bookingId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${key}` },
        body: JSON.stringify({ status, agreedPrice }),
      });
      if (res.ok) {
        loadAllData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  // --- SETTINGS ACTIONS ---
  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    const key = getAdminKey();
    try {
      const res = await fetch("/api/admin/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${key}` },
        body: JSON.stringify(settings),
      });
      if (res.ok) {
        alert("Boutique settings saved successfully!");
      }
    } catch (err) {
      console.error(err);
    }
  };

  // --- CREDENTIALS (CHANGE ID & PASSWORD) ACTION ---
  const handleChangeCredentials = async (e: React.FormEvent) => {
    e.preventDefault();
    setCredError("");
    setCredSuccess("");

    if (!credForm.currentPassword) {
      setCredError("Please enter your current password to authorize changes.");
      return;
    }

    if (credForm.newPassword && credForm.newPassword !== credForm.confirmPassword) {
      setCredError("New password and confirmation password do not match.");
      return;
    }

    if (credForm.newPassword && credForm.newPassword.length < 6) {
      setCredError("New password must be at least 6 characters.");
      return;
    }

    setCredLoading(true);
    const key = getAdminKey();

    try {
      const res = await fetch("/api/admin/auth", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${key}`,
        },
        body: JSON.stringify({
          currentPassword: credForm.currentPassword,
          newAdminId: credForm.newAdminId.trim() || undefined,
          newPassword: credForm.newPassword.trim() || undefined,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to update administrator credentials.");
      }

      setCredSuccess(data.message || "Administrator credentials updated successfully!");
      if (data.adminId) setCurrentAdminId(data.adminId);
      if (credForm.newPassword) {
        localStorage.setItem("eternal6_admin_key", credForm.newPassword.trim());
      }
      if (credForm.newAdminId) {
        localStorage.setItem("eternal6_admin_user", credForm.newAdminId.trim());
      }

      // Reset sensitive fields
      setCredForm((prev) => ({
        ...prev,
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      }));
    } catch (err: any) {
      setCredError(err.message || "Failed to update credentials.");
    } finally {
      setCredLoading(false);
    }
  };

  if (loading && !metrics) {
    return (
      <div className="py-24 text-center space-y-4">
        <RefreshCw className="w-8 h-8 text-[#B89A58] animate-spin mx-auto" />
        <p className="text-xs uppercase tracking-widest text-[#8C7654]">
          Loading Eternal 6 Administration Portal...
        </p>
      </div>
    );
  }

  // Filter products
  const filteredProducts = products.filter((p) => {
    if (categoryFilter !== "all" && p.category.toLowerCase() !== categoryFilter.toLowerCase()) return false;
    if (stockFilter === "low" && p.stock >= 10) return false;
    if (stockFilter === "out" && p.stock > 0) return false;
    if (productSearch) {
      const q = productSearch.toLowerCase();
      return (
        p.name.toLowerCase().includes(q) ||
        p.material.toLowerCase().includes(q) ||
        (p.sku && p.sku.toLowerCase().includes(q))
      );
    }
    return true;
  });

  return (
    <div className="space-y-8 pb-24">
      {/* Top Header & Section Tabs */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-[#D6B878]/30">
        <div>
          <span className="text-[11px] uppercase tracking-[0.25em] text-[#8C7654] font-semibold">
            ATELIER OPERATIONS CONSOLE
          </span>
          <h1 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-[#342722]">
            Eternal 6 Management Suite
          </h1>
        </div>

        {/* Tab Switcher */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setActiveTab("overview")}
            className={`px-4 py-2 rounded-xl text-xs font-semibold tracking-wider transition-all flex items-center gap-1.5 ${
              activeTab === "overview"
                ? "bg-[#342722] text-[#FFF9F2] shadow-md border border-[#D6B878]/40"
                : "bg-white text-[#342722] border border-[#D6B878]/40 hover:bg-[#F4EBDD]"
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5 text-[#D6B878]" />
            <span>Dashboard</span>
          </button>

          <button
            onClick={() => setActiveTab("products")}
            className={`px-4 py-2 rounded-xl text-xs font-semibold tracking-wider transition-all flex items-center gap-1.5 ${
              activeTab === "products"
                ? "bg-[#342722] text-[#FFF9F2] shadow-md border border-[#D6B878]/40"
                : "bg-white text-[#342722] border border-[#D6B878]/40 hover:bg-[#F4EBDD]"
            }`}
          >
            <Package className="w-3.5 h-3.5 text-[#D6B878]" />
            <span>Products & Pricing ({products.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("orders")}
            className={`px-4 py-2 rounded-xl text-xs font-semibold tracking-wider transition-all flex items-center gap-1.5 ${
              activeTab === "orders"
                ? "bg-[#342722] text-[#FFF9F2] shadow-md border border-[#D6B878]/40"
                : "bg-white text-[#342722] border border-[#D6B878]/40 hover:bg-[#F4EBDD]"
            }`}
          >
            <ShoppingBag className="w-3.5 h-3.5 text-[#D6B878]" />
            <span>Orders ({orders.length})</span>
            {metrics?.awaitingConfirmation > 0 && (
              <span className="bg-[#B89A58] text-white px-1.5 py-0.2 rounded-full text-[10px]">
                {metrics.awaitingConfirmation}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab("bookings")}
            className={`px-4 py-2 rounded-xl text-xs font-semibold tracking-wider transition-all flex items-center gap-1.5 ${
              activeTab === "bookings"
                ? "bg-[#342722] text-[#FFF9F2] shadow-md border border-[#D6B878]/40"
                : "bg-white text-[#342722] border border-[#D6B878]/40 hover:bg-[#F4EBDD]"
            }`}
          >
            <Calendar className="w-3.5 h-3.5 text-[#D6B878]" />
            <span>Mehendi Bookings ({bookings.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("settings")}
            className={`px-4 py-2 rounded-xl text-xs font-semibold tracking-wider transition-all flex items-center gap-1.5 ${
              activeTab === "settings"
                ? "bg-[#342722] text-[#FFF9F2] shadow-md border border-[#D6B878]/40"
                : "bg-white text-[#342722] border border-[#D6B878]/40 hover:bg-[#F4EBDD]"
            }`}
          >
            <Settings className="w-3.5 h-3.5 text-[#D6B878]" />
            <span>Store Settings</span>
          </button>

          <button
            onClick={loadAllData}
            className="p-2 rounded-xl bg-white border border-[#D6B878]/40 text-[#342722] hover:bg-[#F4EBDD]"
            title="Refresh Data"
          >
            <RefreshCw className="w-4 h-4 text-[#8C7654]" />
          </button>
        </div>
      </div>

      {/* ======================================================== */}
      {/* TAB 1: DASHBOARD OVERVIEW */}
      {/* ======================================================== */}
      {activeTab === "overview" && metrics && (
        <div className="space-y-8 animate-in fade-in duration-200">
          {/* Key Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="bg-white p-6 rounded-3xl border border-[#D6B878]/30 shadow-sm space-y-2">
              <div className="flex items-center justify-between text-[#8C7654] text-xs font-semibold uppercase tracking-wider">
                <span>Orders Today</span>
                <Clock className="w-4 h-4 text-[#B89A58]" />
              </div>
              <div className="text-3xl font-bold font-serif-luxury text-[#342722]">
                {metrics.ordersToday}
              </div>
              <p className="text-[11px] text-[#8C7654]">
                Awaiting confirmation: <strong className="text-[#342722]">{metrics.awaitingConfirmation}</strong>
              </p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-[#D6B878]/30 shadow-sm space-y-2">
              <div className="flex items-center justify-between text-[#8C7654] text-xs font-semibold uppercase tracking-wider">
                <span>Paid Revenue</span>
                <DollarSign className="w-4 h-4 text-[#B89A58]" />
              </div>
              <div className="text-3xl font-bold font-mono text-[#342722]">
                ৳{metrics.paidRevenue?.toLocaleString() || 0}
              </div>
              <p className="text-[11px] text-[#8C7654]">
                Direct bKash/Nagad/Settled funds
              </p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-[#D6B878]/30 shadow-sm space-y-2">
              <div className="flex items-center justify-between text-[#8C7654] text-xs font-semibold uppercase tracking-wider">
                <span>Pending COD Receivables</span>
                <ShoppingBag className="w-4 h-4 text-[#B89A58]" />
              </div>
              <div className="text-3xl font-bold font-mono text-[#B89A58]">
                ৳{metrics.outstandingCodAmount?.toLocaleString() || 0}
              </div>
              <p className="text-[11px] text-[#8C7654]">
                Across {metrics.outstandingCodCount || 0} Cash on Delivery parcels
              </p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-[#D6B878]/30 shadow-sm space-y-2">
              <div className="flex items-center justify-between text-[#8C7654] text-xs font-semibold uppercase tracking-wider">
                <span>Catalog Health</span>
                <Package className="w-4 h-4 text-[#B89A58]" />
              </div>
              <div className="text-3xl font-bold font-serif-luxury text-[#342722]">
                {products.length} Items
              </div>
              <p className="text-[11px] text-[#8C7654] flex items-center gap-1">
                {metrics.lowStockCount > 0 ? (
                  <span className="text-rose-600 font-semibold flex items-center gap-1">
                    <AlertTriangle className="w-3 h-3" />
                    {metrics.lowStockCount} items low in stock (&lt;10)
                  </span>
                ) : (
                  <span className="text-emerald-600">All products healthy</span>
                )}
              </p>
            </div>
          </div>

          {/* Quick Operations Bar */}
          <div className="bg-white p-6 rounded-3xl border border-[#D6B878]/30 shadow-sm flex flex-wrap items-center justify-between gap-4">
            <div>
              <h3 className="font-serif-luxury text-base font-bold text-[#342722]">
                Fast Actions
              </h3>
              <p className="text-xs text-[#8C7654]">
                Manage boutique products, adjust prices, or record manual orders from social channels.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => {
                  setActiveTab("products");
                  setShowNewProductModal(true);
                }}
                className="px-4 py-2.5 rounded-xl bg-[#342722] hover:bg-[#4A3932] text-[#FFF9F2] text-xs font-semibold uppercase tracking-wider flex items-center gap-2 shadow"
              >
                <Plus className="w-4 h-4 text-[#D6B878]" />
                <span>Add New Creation</span>
              </button>

              <button
                onClick={() => setShowManualOrderModal(true)}
                className="px-4 py-2.5 rounded-xl bg-[#1877F2]/10 hover:bg-[#1877F2]/20 text-[#1877F2] border border-[#1877F2]/30 text-xs font-semibold uppercase tracking-wider flex items-center gap-2"
              >
                <FacebookIcon className="w-3.5 h-3.5" />
                <span>Record Facebook / WhatsApp Order</span>
              </button>
            </div>
          </div>

          {/* Recent Orders Overview */}
          <div className="bg-white rounded-3xl border border-[#D6B878]/30 shadow-sm overflow-hidden">
            <div className="p-5 border-b border-[#D6B878]/20 flex items-center justify-between">
              <div>
                <h3 className="font-serif-luxury text-base font-bold text-[#342722]">
                  Recent Boutique Orders
                </h3>
                <p className="text-xs text-[#8C7654]">
                  Latest orders placed via website, Facebook Messenger, or WhatsApp sales desk.
                </p>
              </div>
              <button
                onClick={() => setActiveTab("orders")}
                className="text-xs font-semibold text-[#B89A58] hover:text-[#342722]"
              >
                View All Orders &rarr;
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-[#342722]">
                <thead className="bg-[#FFF9F2] border-b border-[#D6B878]/30 text-[#8C7654] uppercase tracking-wider font-semibold">
                  <tr>
                    <th className="py-3 px-4">Order Ref</th>
                    <th className="py-3 px-4">Customer</th>
                    <th className="py-3 px-4">Amount</th>
                    <th className="py-3 px-4">Payment</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Quick Update</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#D6B878]/20">
                  {orders.slice(0, 5).map((o) => (
                    <tr key={o.id} className="hover:bg-[#FFF9F2]/50">
                      <td className="py-3.5 px-4 font-mono font-bold">{o.orderNumber}</td>
                      <td className="py-3.5 px-4">
                        <div className="font-medium text-[#342722]">{o.customerName}</div>
                        <div className="text-[11px] text-[#8C7654]">{o.phone}</div>
                      </td>
                      <td className="py-3.5 px-4 font-mono font-bold">৳{o.total.toLocaleString()}</td>
                      <td className="py-3.5 px-4">
                        <span className="uppercase text-[10px] font-bold px-2 py-0.5 rounded bg-gray-100">
                          {o.paymentMethod}
                        </span>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                          o.orderStatus === "delivered" ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-800"
                        }`}>
                          {o.orderStatus}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <select
                          value={o.orderStatus}
                          onChange={(e) => handleUpdateOrderStatus(o.id, e.target.value)}
                          className="text-xs font-semibold px-2 py-1 rounded border border-[#D6B878]/40 bg-[#FFF9F2]"
                        >
                          <option value="pending">Pending</option>
                          <option value="confirmed">Confirmed</option>
                          <option value="shipped">Shipped</option>
                          <option value="delivered">Delivered</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 2: PRODUCTS & PRICING DASHBOARD (REQUESTED SUITE) */}
      {/* ======================================================== */}
      {activeTab === "products" && (
        <div className="space-y-6 animate-in fade-in duration-200">
          {/* Controls & Filter Bar */}
          <div className="bg-white p-5 rounded-3xl border border-[#D6B878]/30 shadow-sm space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="font-serif-luxury text-xl font-bold text-[#342722]">
                  Products & Price Manager
                </h2>
                <p className="text-xs text-[#8C7654]">
                  Edit prices, promo discounts, and stock inline with instant sync, or open full edit specs.
                </p>
              </div>

              <button
                onClick={() => setShowNewProductModal(true)}
                className="px-4 py-2.5 rounded-xl bg-[#342722] hover:bg-[#4A3932] text-[#FFF9F2] text-xs font-semibold uppercase tracking-wider flex items-center gap-2 shadow"
              >
                <Plus className="w-4 h-4 text-[#D6B878]" />
                <span>Add New Creation</span>
              </button>
            </div>

            {/* Search and Filters */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-[#D6B878]/20">
              <div className="relative">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8C7654]" />
                <input
                  type="text"
                  value={productSearch}
                  onChange={(e) => setProductSearch(e.target.value)}
                  placeholder="Search creation, material, SKU..."
                  className="w-full pl-10 pr-4 py-2 rounded-xl border border-[#D6B878]/40 bg-[#FFF9F2] text-xs text-[#342722] focus:outline-none focus:ring-1 focus:ring-[#B89A58]"
                />
              </div>

              <div>
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-[#D6B878]/40 bg-[#FFF9F2] text-xs text-[#342722] focus:outline-none"
                >
                  <option value="all">All Categories</option>
                  <option value="hijabs">Hijabs</option>
                  <option value="gift sets">Gift Sets</option>
                  <option value="art pieces">Art Pieces</option>
                  <option value="accessories">Accessories</option>
                </select>
              </div>

              <div>
                <select
                  value={stockFilter}
                  onChange={(e) => setStockFilter(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-[#D6B878]/40 bg-[#FFF9F2] text-xs text-[#342722] focus:outline-none"
                >
                  <option value="all">All Stock Statuses</option>
                  <option value="low">Low Stock (&lt; 10)</option>
                  <option value="out">Out of Stock (0)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Product Data Table with Inline Price & Stock Editing */}
          <div className="bg-white rounded-3xl border border-[#D6B878]/30 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-[#342722]">
                <thead className="bg-[#FFF9F2] border-b border-[#D6B878]/30 text-[#8C7654] uppercase tracking-wider font-semibold">
                  <tr>
                    <th className="py-3.5 px-4">Creation Specs</th>
                    <th className="py-3.5 px-4">Fabric & Collection</th>
                    <th className="py-3.5 px-4 min-w-[140px]">Regular Price (৳)</th>
                    <th className="py-3.5 px-4 min-w-[130px]">Sale Price (৳)</th>
                    <th className="py-3.5 px-4 min-w-[120px]">Stock Count</th>
                    <th className="py-3.5 px-4 text-center">Save Inline</th>
                    <th className="py-3.5 px-4 text-center">Pearl Edit</th>
                    <th className="py-3.5 px-4 text-center">Visible</th>
                    <th className="py-3.5 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#D6B878]/20">
                  {filteredProducts.map((p) => {
                    const imgs = (() => {
                      try {
                        return JSON.parse(p.images);
                      } catch {
                        return [p.images || "/images/logo/eternal6-logo.png"];
                      }
                    })();

                    const editState = inlineEdits[p.id] || { price: p.price, salePrice: p.salePrice, stock: p.stock };
                    const isDirty =
                      editState.price !== p.price ||
                      (editState.salePrice ?? null) !== (p.salePrice ?? null) ||
                      editState.stock !== p.stock;

                    return (
                      <tr key={p.id} className="hover:bg-[#FFF9F2]/40 transition-colors">
                        {/* Title & Thumbnail */}
                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-3">
                            <div className="relative w-11 h-14 rounded-lg overflow-hidden border border-[#D6B878]/30 bg-[#342722] flex-shrink-0">
                              <img
                                src={imgs[0] || "/images/logo/eternal6-logo.png"}
                                alt={p.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="space-y-0.5">
                              <span className="font-semibold text-[#342722] block line-clamp-1 max-w-[200px]" title={p.name}>
                                {p.name}
                              </span>
                              <span className="font-mono text-[11px] text-[#8C7654] block">
                                {p.sku || "ET6-GEN"}
                              </span>
                              <span className="text-[10px] text-[#B89A58] uppercase font-bold tracking-wider">
                                {p.category}
                              </span>
                            </div>
                          </div>
                        </td>

                        {/* Material & Collection */}
                        <td className="py-3.5 px-4">
                          <div className="font-medium text-[#342722]">{p.material}</div>
                          <div className="text-[11px] text-[#8C7654]">{p.collection}</div>
                        </td>

                        {/* Inline Regular Price Edit */}
                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-1">
                            <span className="font-bold text-[#342722]">৳</span>
                            <input
                              type="number"
                              value={editState.price}
                              onChange={(e) =>
                                setInlineEdits({
                                  ...inlineEdits,
                                  [p.id]: { ...editState, price: Number(e.target.value) },
                                })
                              }
                              className="w-20 px-2 py-1 rounded-lg border border-[#D6B878]/40 bg-[#FFF9F2] text-xs font-mono font-bold text-[#342722] focus:outline-none focus:ring-1 focus:ring-[#B89A58]"
                            />
                          </div>
                        </td>

                        {/* Inline Sale Price Edit */}
                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-1">
                            <span className="text-[#8C7654]">৳</span>
                            <input
                              type="number"
                              placeholder="None"
                              value={editState.salePrice || ""}
                              onChange={(e) =>
                                setInlineEdits({
                                  ...inlineEdits,
                                  [p.id]: {
                                    ...editState,
                                    salePrice: e.target.value ? Number(e.target.value) : null,
                                  },
                                })
                              }
                              className="w-20 px-2 py-1 rounded-lg border border-[#D6B878]/40 bg-[#FFF9F2] text-xs font-mono text-[#8C6E33] focus:outline-none focus:ring-1 focus:ring-[#B89A58]"
                            />
                          </div>
                        </td>

                        {/* Inline Stock Edit */}
                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-1">
                            <input
                              type="number"
                              value={editState.stock}
                              onChange={(e) =>
                                setInlineEdits({
                                  ...inlineEdits,
                                  [p.id]: { ...editState, stock: Math.max(0, Number(e.target.value)) },
                                })
                              }
                              className={`w-16 px-2 py-1 rounded-lg border border-[#D6B878]/40 text-xs font-mono font-bold focus:outline-none ${
                                editState.stock < 10 ? "bg-rose-50 text-rose-700" : "bg-[#FFF9F2] text-[#342722]"
                              }`}
                            />
                          </div>
                        </td>

                        {/* Save Inline Action */}
                        <td className="py-3.5 px-4 text-center">
                          {isDirty ? (
                            <button
                              onClick={() => handleSaveInlineProduct(p.id)}
                              disabled={savingProductId === p.id}
                              className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[11px] flex items-center gap-1 mx-auto shadow transition-all"
                              title="Save inline changes"
                            >
                              {savingProductId === p.id ? (
                                <RefreshCw className="w-3 h-3 animate-spin" />
                              ) : (
                                <Check className="w-3 h-3" />
                              )}
                              <span>Save</span>
                            </button>
                          ) : (
                            <span className="text-[10px] text-gray-400">Synced</span>
                          )}
                        </td>

                        {/* Pearl Edit Flag */}
                        <td className="py-3.5 px-4 text-center">
                          <button
                            onClick={() => handleTogglePearlEdit(p.id, p.isPearlEdit)}
                            className={`p-1.5 rounded-lg transition-colors ${
                              p.isPearlEdit
                                ? "bg-[#D6B878]/20 text-[#8C6E33] border border-[#D6B878]"
                                : "text-gray-300 hover:text-gray-500"
                            }`}
                            title="Toggle Pearl Edit Showcase"
                          >
                            <Star className={`w-4 h-4 ${p.isPearlEdit ? "fill-current" : ""}`} />
                          </button>
                        </td>

                        {/* Published Toggle */}
                        <td className="py-3.5 px-4 text-center">
                          <button
                            onClick={() => handleTogglePublish(p.id, p.isPublished)}
                            className={`p-1.5 rounded-lg transition-colors ${
                              p.isPublished
                                ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                                : "bg-gray-100 text-gray-400 border border-gray-200"
                            }`}
                            title={p.isPublished ? "Visible to shoppers" : "Hidden from shop"}
                          >
                            {p.isPublished ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                          </button>
                        </td>

                        {/* Actions: Edit Spec & Delete */}
                        <td className="py-3.5 px-4 text-right space-x-1.5">
                          <button
                            onClick={() => setEditingProduct({ ...p })}
                            className="p-1.5 rounded-lg border border-[#D6B878]/40 text-[#342722] hover:bg-[#F4EBDD]"
                            title="Edit full specification"
                          >
                            <Edit className="w-3.5 h-3.5 text-[#B89A58]" />
                          </button>

                          <button
                            onClick={() => handleDeleteProduct(p.id, p.name)}
                            className="p-1.5 rounded-lg border border-rose-200 text-rose-600 hover:bg-rose-50"
                            title="Delete creation"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 3: ORDER MANAGEMENT */}
      {/* ======================================================== */}
      {activeTab === "orders" && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="bg-white p-5 rounded-3xl border border-[#D6B878]/30 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2">
              {["all", "pending", "confirmed", "processing", "shipped", "delivered", "cancelled"].map((status) => (
                <button
                  key={status}
                  onClick={() => setOrderFilter(status)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold capitalize transition-all ${
                    orderFilter === status
                      ? "bg-[#342722] text-[#FFF9F2] shadow"
                      : "bg-[#FFF9F2] text-[#342722] border border-[#D6B878]/30 hover:bg-[#F4EBDD]"
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#8C7654]" />
                <input
                  type="text"
                  value={orderSearch}
                  onChange={(e) => setOrderSearch(e.target.value)}
                  placeholder="Order Ref, Phone, Name..."
                  className="pl-8 pr-3 py-1.5 rounded-xl border border-[#D6B878]/40 bg-[#FFF9F2] text-xs text-[#342722] focus:outline-none"
                />
              </div>

              <button
                onClick={() => setShowManualOrderModal(true)}
                className="px-3 py-1.5 rounded-xl bg-[#1877F2]/10 hover:bg-[#1877F2]/20 text-[#1877F2] border border-[#1877F2]/30 text-xs font-semibold flex items-center gap-1.5"
              >
                <FacebookIcon className="w-3.5 h-3.5" />
                <span>+ Facebook/WA</span>
              </button>
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-[#D6B878]/30 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-[#342722]">
                <thead className="bg-[#FFF9F2] border-b border-[#D6B878]/30 text-[#8C7654] uppercase tracking-wider font-semibold">
                  <tr>
                    <th className="py-3.5 px-4">Order Ref</th>
                    <th className="py-3.5 px-4">Date</th>
                    <th className="py-3.5 px-4">Customer</th>
                    <th className="py-3.5 px-4">Items</th>
                    <th className="py-3.5 px-4">Total</th>
                    <th className="py-3.5 px-4">Payment</th>
                    <th className="py-3.5 px-4">Status</th>
                    <th className="py-3.5 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#D6B878]/20">
                  {orders
                    .filter((o) => {
                      if (orderFilter !== "all" && o.orderStatus !== orderFilter) return false;
                      if (orderSearch) {
                        const q = orderSearch.toLowerCase();
                        return (
                          o.orderNumber.toLowerCase().includes(q) ||
                          o.customerName.toLowerCase().includes(q) ||
                          o.phone.toLowerCase().includes(q)
                        );
                      }
                      return true;
                    })
                    .map((o) => (
                      <tr key={o.id} className="hover:bg-[#FFF9F2]/50 transition-colors">
                        <td className="py-3.5 px-4 font-mono font-bold text-[#342722]">
                          {o.orderNumber}
                          <span className="block text-[10px] text-[#8C7654] capitalize">
                            via {o.sourceChannel}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-[#8C7654]">
                          {new Date(o.createdAt).toLocaleDateString()}
                        </td>
                        <td className="py-3.5 px-4">
                          <div className="font-semibold text-[#342722]">{o.customerName}</div>
                          <div className="font-mono text-[11px] text-[#8C7654]">{o.phone}</div>
                          <div className="text-[11px] text-[#8C7654] truncate max-w-[140px]">
                            {o.area}, {o.district}
                          </div>
                        </td>
                        <td className="py-3.5 px-4">
                          <div className="text-[11px]">
                            {o.items?.map((it: any, i: number) => (
                              <div key={i} className="truncate max-w-[180px]">
                                • {it.productName} (x{it.quantity})
                              </div>
                            ))}
                          </div>
                        </td>
                        <td className="py-3.5 px-4 font-mono font-bold text-sm">
                          ৳{o.total.toLocaleString()}
                        </td>
                        <td className="py-3.5 px-4">
                          <span className="font-semibold uppercase text-[10px] px-2 py-0.5 rounded bg-gray-100 block w-fit">
                            {o.paymentMethod}
                          </span>
                          <span
                            className={`text-[10px] font-medium block mt-0.5 ${
                              o.paymentStatus === "paid" ? "text-emerald-700" : "text-amber-700"
                            }`}
                          >
                            {o.paymentStatus}
                          </span>
                        </td>
                        <td className="py-3.5 px-4">
                          <select
                            value={o.orderStatus}
                            onChange={(e) => handleUpdateOrderStatus(o.id, e.target.value)}
                            className="text-xs font-semibold px-2.5 py-1 rounded-lg border border-[#D6B878]/40 bg-[#FFF9F2]"
                          >
                            <option value="pending">Pending</option>
                            <option value="confirmed">Confirmed</option>
                            <option value="processing">Processing</option>
                            <option value="shipped">Shipped</option>
                            <option value="delivered">Delivered</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                        </td>
                        <td className="py-3.5 px-4 text-right space-x-2">
                          <button
                            onClick={() => setInvoiceOrder(o)}
                            className="p-1.5 rounded-lg border border-[#D6B878]/40 text-[#342722] hover:bg-[#F4EBDD]"
                            title="Print Invoice"
                          >
                            <Printer className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 4: MEHENDI BOOKINGS */}
      {/* ======================================================== */}
      {activeTab === "bookings" && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl border border-[#D6B878]/30 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-[#342722]">
                <thead className="bg-[#FFF9F2] border-b border-[#D6B878]/30 text-[#8C7654] uppercase tracking-wider font-semibold">
                  <tr>
                    <th className="py-3.5 px-4">Booking Ref</th>
                    <th className="py-3.5 px-4">Client</th>
                    <th className="py-3.5 px-4">Service</th>
                    <th className="py-3.5 px-4">Event Date & Time</th>
                    <th className="py-3.5 px-4">Location</th>
                    <th className="py-3.5 px-4">Status</th>
                    <th className="py-3.5 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#D6B878]/20">
                  {bookings.map((b) => (
                    <tr key={b.id} className="hover:bg-[#FFF9F2]/50">
                      <td className="py-3.5 px-4 font-mono font-bold text-[#342722]">
                        {b.bookingReference}
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="font-semibold">{b.customerName}</div>
                        <div className="font-mono text-[11px] text-[#8C7654]">{b.phone}</div>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="font-semibold text-[#B89A58]">{b.serviceName}</span>
                        {b.notes && <div className="text-[10px] text-gray-500 italic truncate max-w-[160px]">{b.notes}</div>}
                      </td>
                      <td className="py-3.5 px-4">
                        <div>{new Date(b.eventDate).toLocaleDateString()}</div>
                        <div className="text-[11px] text-[#8C7654]">{b.eventTime || "TBD"}</div>
                      </td>
                      <td className="py-3.5 px-4 text-[#8C7654]">{b.locationArea || "Chattogram"}</td>
                      <td className="py-3.5 px-4">
                        <select
                          value={b.status}
                          onChange={(e) => handleUpdateBookingStatus(b.id, e.target.value)}
                          className="text-xs font-semibold px-2 py-1 rounded-lg border border-[#D6B878]/40 bg-[#FFF9F2]"
                        >
                          <option value="pending">Pending</option>
                          <option value="confirmed">Confirmed</option>
                          <option value="completed">Completed</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <a
                          href={`https://wa.me/${b.phone.replace(/[^0-9]/g, "")}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-2.5 py-1 rounded-lg bg-[#25D366] text-white font-bold text-[11px] inline-flex items-center gap-1"
                        >
                          <Phone className="w-3 h-3" />
                          <span>WhatsApp</span>
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 5: STORE SETTINGS & SECURITY */}
      {/* ======================================================== */}
      {activeTab === "settings" && (
        <div className="space-y-8 max-w-3xl animate-in fade-in duration-200">
          {/* CARD 1: STORE & ORDER SETTINGS */}
          <form onSubmit={handleSaveSettings} className="bg-white p-6 sm:p-8 rounded-3xl border border-[#D6B878]/30 shadow-sm space-y-6">
            <div>
              <h2 className="font-serif-luxury text-xl font-bold text-[#342722]">
                Atelier & E-Commerce Settings
              </h2>
              <p className="text-xs text-[#8C7654]">
                Control delivery charges, official contact phone numbers, and merchant receiving accounts.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-[#342722] block mb-1">
                  Chattogram Delivery Charge (BDT ৳)
                </label>
                <input
                  type="number"
                  value={settings.chittagong_delivery_charge || "70"}
                  onChange={(e) => setSettings({ ...settings, chittagong_delivery_charge: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#D6B878]/40 bg-[#FFF9F2] text-xs font-mono font-bold"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#342722] block mb-1">
                  Outside Chattogram Delivery (BDT ৳)
                </label>
                <input
                  type="number"
                  value={settings.outside_chittagong_delivery_charge || "130"}
                  onChange={(e) => setSettings({ ...settings, outside_chittagong_delivery_charge: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#D6B878]/40 bg-[#FFF9F2] text-xs font-mono font-bold"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-[#342722] block mb-1">
                  Official WhatsApp Number (Button & Hotline)
                </label>
                <input
                  type="text"
                  value={settings.whatsapp_number || "+880 1606-266496"}
                  onChange={(e) => setSettings({ ...settings, whatsapp_number: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#D6B878]/40 bg-[#FFF9F2] text-xs font-mono"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#342722] block mb-1">
                  Official Boutique Email
                </label>
                <input
                  type="email"
                  value={settings.email_address || "eternal6six@gmail.com"}
                  onChange={(e) => setSettings({ ...settings, email_address: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#D6B878]/40 bg-[#FFF9F2] text-xs font-mono"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-[#342722] block mb-1">
                  Official bKash Merchant Number
                </label>
                <input
                  type="text"
                  value={settings.bkash_merchant_number || "01606266496"}
                  onChange={(e) => setSettings({ ...settings, bkash_merchant_number: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#D6B878]/40 bg-[#FFF9F2] text-xs font-mono"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#342722] block mb-1">
                  Official Nagad Merchant Number
                </label>
                <input
                  type="text"
                  value={settings.nagad_merchant_number || "01606266496"}
                  onChange={(e) => setSettings({ ...settings, nagad_merchant_number: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#D6B878]/40 bg-[#FFF9F2] text-xs font-mono"
                />
              </div>
            </div>

            <button
              type="submit"
              className="px-8 py-3 rounded-full bg-[#342722] hover:bg-[#4A3932] text-[#FFF9F2] text-xs font-bold uppercase tracking-wider transition-colors shadow"
            >
              Save Store Settings
            </button>
          </form>

          {/* CARD 2: ADMIN CREDENTIALS & SECURITY (CHANGE ID & PASSWORD) */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#D6B878]/40 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#D6B878]/30 pb-4 gap-2">
              <div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-[#B89A58]" />
                  <h2 className="font-serif-luxury text-xl font-bold text-[#342722]">
                    Admin Credentials & Security
                  </h2>
                </div>
                <p className="text-xs text-[#8C7654] mt-1">
                  Keep your administration dashboard protected. You can change your Admin ID (Username) and Password below.
                </p>
              </div>
              <div className="px-3.5 py-1.5 rounded-full bg-[#FFF9F2] border border-[#D6B878]/40 text-xs text-[#8C7654] flex items-center gap-2 font-mono">
                <User className="w-3.5 h-3.5 text-[#B89A58]" />
                <span>Current ID: <strong className="text-[#342722]">{currentAdminId}</strong></span>
              </div>
            </div>

            {credSuccess && (
              <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2 animate-in fade-in">
                <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>{credSuccess}</span>
              </div>
            )}

            {credError && (
              <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2 animate-in fade-in">
                <XCircle className="w-4 h-4 text-rose-600 flex-shrink-0" />
                <span>{credError}</span>
              </div>
            )}

            <form onSubmit={handleChangeCredentials} className="space-y-4">
              {/* Admin ID */}
              <div>
                <label className="text-xs font-semibold text-[#342722] block mb-1">
                  Admin ID / Username
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8C7654]" />
                  <input
                    type="text"
                    required
                    value={credForm.newAdminId}
                    onChange={(e) => setCredForm({ ...credForm, newAdminId: e.target.value })}
                    placeholder="e.g. admin or eternal_director"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#D6B878]/40 bg-[#FFF9F2] text-xs text-[#342722] focus:outline-none focus:border-[#B89A58]"
                  />
                </div>
                <p className="text-[11px] text-[#8C7654] mt-1">
                  The username you type to log in to the admin panel.
                </p>
              </div>

              {/* Current Password */}
              <div>
                <label className="text-xs font-semibold text-[#342722] block mb-1">
                  Current Password <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8C7654]" />
                  <input
                    type="password"
                    required
                    value={credForm.currentPassword}
                    onChange={(e) => setCredForm({ ...credForm, currentPassword: e.target.value })}
                    placeholder="Enter current password to authorize changes..."
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#D6B878]/40 bg-[#FFF9F2] text-xs text-[#342722] focus:outline-none focus:border-[#B89A58]"
                  />
                </div>
              </div>

              {/* New Password & Confirmation */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-[#342722] block mb-1">
                    New Secret Password
                  </label>
                  <div className="relative">
                    <KeyRound className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8C7654]" />
                    <input
                      type={showCredPassword ? "text" : "password"}
                      value={credForm.newPassword}
                      onChange={(e) => setCredForm({ ...credForm, newPassword: e.target.value })}
                      placeholder="Min 6 characters (leave blank to keep current)"
                      className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-[#D6B878]/40 bg-[#FFF9F2] text-xs text-[#342722] focus:outline-none focus:border-[#B89A58]"
                    />
                    <button
                      type="button"
                      onClick={() => setShowCredPassword(!showCredPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8C7654] hover:text-[#342722]"
                      tabIndex={-1}
                    >
                      {showCredPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#342722] block mb-1">
                    Confirm New Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8C7654]" />
                    <input
                      type={showCredPassword ? "text" : "password"}
                      value={credForm.confirmPassword}
                      onChange={(e) => setCredForm({ ...credForm, confirmPassword: e.target.value })}
                      placeholder="Re-type new password..."
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#D6B878]/40 bg-[#FFF9F2] text-xs text-[#342722] focus:outline-none focus:border-[#B89A58]"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={credLoading}
                  className="px-8 py-3.5 rounded-full bg-[#342722] hover:bg-[#4A3932] disabled:opacity-60 text-[#FFF9F2] text-xs font-bold uppercase tracking-wider transition-all shadow-md flex items-center gap-2"
                >
                  <KeyRound className="w-4 h-4 text-[#D6B878]" />
                  {credLoading ? <span>Saving Security Credentials...</span> : <span>Update Admin ID & Password</span>}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL: EDIT PRODUCT SPECIFICATION */}
      {/* ======================================================== */}
      {editingProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#342722]/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl bg-white rounded-3xl p-6 sm:p-8 border border-[#D6B878] shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-[#D6B878]/30">
              <h2 className="font-serif-luxury text-xl font-bold text-[#342722]">
                Edit Creation: {editingProduct.name}
              </h2>
              <button
                onClick={() => setEditingProduct(null)}
                className="p-1 rounded-full text-[#8C7654] hover:text-[#342722]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveFullEditProduct} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-[#342722] block mb-1">
                  Product Name / Title
                </label>
                <input
                  type="text"
                  required
                  value={editingProduct.name}
                  onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-[#D6B878]/40 bg-[#FFF9F2] text-xs text-[#342722]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="text-xs font-semibold text-[#342722] block mb-1">
                    Regular Price (BDT ৳)
                  </label>
                  <input
                    type="number"
                    required
                    value={editingProduct.price}
                    onChange={(e) => setEditingProduct({ ...editingProduct, price: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-[#D6B878]/40 bg-[#FFF9F2] text-xs font-mono font-bold text-[#342722]"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#342722] block mb-1">
                    Sale / Promo Price (৳)
                  </label>
                  <input
                    type="number"
                    value={editingProduct.salePrice || ""}
                    onChange={(e) => setEditingProduct({ ...editingProduct, salePrice: e.target.value })}
                    placeholder="Optional"
                    className="w-full px-3.5 py-2 rounded-xl border border-[#D6B878]/40 bg-[#FFF9F2] text-xs font-mono text-[#8C6E33]"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#342722] block mb-1">
                    Stock Quantity
                  </label>
                  <input
                    type="number"
                    required
                    value={editingProduct.stock}
                    onChange={(e) => setEditingProduct({ ...editingProduct, stock: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-[#D6B878]/40 bg-[#FFF9F2] text-xs font-mono font-bold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="text-xs font-semibold text-[#342722] block mb-1">
                    Category
                  </label>
                  <select
                    value={editingProduct.category}
                    onChange={(e) => setEditingProduct({ ...editingProduct, category: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-[#D6B878]/40 bg-[#FFF9F2] text-xs"
                  >
                    <option value="Hijabs">Hijabs</option>
                    <option value="Gift Sets">Gift Sets</option>
                    <option value="Art Pieces">Art Pieces</option>
                    <option value="Accessories">Accessories</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#342722] block mb-1">
                    Collection
                  </label>
                  <input
                    type="text"
                    value={editingProduct.collection}
                    onChange={(e) => setEditingProduct({ ...editingProduct, collection: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-[#D6B878]/40 bg-[#FFF9F2] text-xs"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#342722] block mb-1">
                    Fabric Material
                  </label>
                  <input
                    type="text"
                    value={editingProduct.material}
                    onChange={(e) => setEditingProduct({ ...editingProduct, material: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-[#D6B878]/40 bg-[#FFF9F2] text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-[#342722] block mb-1">
                  Description
                </label>
                <textarea
                  rows={2}
                  value={editingProduct.description || ""}
                  onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-[#D6B878]/40 bg-[#FFF9F2] text-xs"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#342722] block mb-1">
                  Care Instructions
                </label>
                <input
                  type="text"
                  value={editingProduct.careInstructions || ""}
                  onChange={(e) => setEditingProduct({ ...editingProduct, careInstructions: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-[#D6B878]/40 bg-[#FFF9F2] text-xs"
                />
              </div>

              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 text-xs font-semibold cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingProduct.isPearlEdit || false}
                    onChange={(e) => setEditingProduct({ ...editingProduct, isPearlEdit: e.target.checked })}
                    className="rounded text-[#B89A58] focus:ring-[#B89A58]"
                  />
                  <span>Featured in The Pearl Edit (Home Mosaic)</span>
                </label>

                <label className="flex items-center gap-2 text-xs font-semibold cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingProduct.isPublished ?? true}
                    onChange={(e) => setEditingProduct({ ...editingProduct, isPublished: e.target.checked })}
                    className="rounded text-emerald-600 focus:ring-emerald-600"
                  />
                  <span>Published on Storefront</span>
                </label>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-[#D6B878]/20">
                <button
                  type="button"
                  onClick={() => setEditingProduct(null)}
                  className="px-5 py-2.5 rounded-xl border border-[#D6B878]/40 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#342722] text-[#FFF9F2] text-xs font-bold uppercase tracking-wider shadow"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL: ADD NEW CREATION */}
      {/* ======================================================== */}
      {showNewProductModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#342722]/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl bg-white rounded-3xl p-6 sm:p-8 border border-[#D6B878] shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-[#D6B878]/30">
              <h2 className="font-serif-luxury text-xl font-bold text-[#342722]">
                Add New Creation to Catalog
              </h2>
              <button
                onClick={() => setShowNewProductModal(false)}
                className="p-1 rounded-full text-[#8C7654] hover:text-[#342722]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateNewProduct} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-[#342722] block mb-1">
                  Creation Name / Title
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Royal Maroon Scalloped Pearl Hijab"
                  value={newProductData.name}
                  onChange={(e) => setNewProductData({ ...newProductData, name: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-[#D6B878]/40 bg-[#FFF9F2] text-xs text-[#342722]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="text-xs font-semibold text-[#342722] block mb-1">
                    Regular Price (BDT ৳)
                  </label>
                  <input
                    type="number"
                    required
                    value={newProductData.price}
                    onChange={(e) => setNewProductData({ ...newProductData, price: Number(e.target.value) })}
                    className="w-full px-3.5 py-2 rounded-xl border border-[#D6B878]/40 bg-[#FFF9F2] text-xs font-mono font-bold"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#342722] block mb-1">
                    Sale / Promo Price (৳)
                  </label>
                  <input
                    type="number"
                    value={newProductData.salePrice || ""}
                    onChange={(e) => setNewProductData({ ...newProductData, salePrice: Number(e.target.value) })}
                    placeholder="Optional"
                    className="w-full px-3.5 py-2 rounded-xl border border-[#D6B878]/40 bg-[#FFF9F2] text-xs font-mono text-[#8C6E33]"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#342722] block mb-1">
                    Initial Stock
                  </label>
                  <input
                    type="number"
                    required
                    value={newProductData.stock}
                    onChange={(e) => setNewProductData({ ...newProductData, stock: Number(e.target.value) })}
                    className="w-full px-3.5 py-2 rounded-xl border border-[#D6B878]/40 bg-[#FFF9F2] text-xs font-mono font-bold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="text-xs font-semibold text-[#342722] block mb-1">
                    Category
                  </label>
                  <select
                    value={newProductData.category}
                    onChange={(e) => setNewProductData({ ...newProductData, category: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-[#D6B878]/40 bg-[#FFF9F2] text-xs"
                  >
                    <option value="Hijabs">Hijabs</option>
                    <option value="Gift Sets">Gift Sets</option>
                    <option value="Art Pieces">Art Pieces</option>
                    <option value="Accessories">Accessories</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#342722] block mb-1">
                    Collection
                  </label>
                  <input
                    type="text"
                    value={newProductData.collection}
                    onChange={(e) => setNewProductData({ ...newProductData, collection: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-[#D6B878]/40 bg-[#FFF9F2] text-xs"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#342722] block mb-1">
                    Fabric Material
                  </label>
                  <input
                    type="text"
                    value={newProductData.material}
                    onChange={(e) => setNewProductData({ ...newProductData, material: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-[#D6B878]/40 bg-[#FFF9F2] text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-[#342722] block mb-1">
                  Image Path or URL
                </label>
                <input
                  type="text"
                  value={newProductData.images}
                  onChange={(e) => setNewProductData({ ...newProductData, images: e.target.value })}
                  placeholder="/images/eternal6/filename.jpg"
                  className="w-full px-3 py-2 rounded-xl border border-[#D6B878]/40 bg-[#FFF9F2] text-xs font-mono"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#342722] block mb-1">
                  Description
                </label>
                <textarea
                  rows={2}
                  value={newProductData.description}
                  onChange={(e) => setNewProductData({ ...newProductData, description: e.target.value })}
                  placeholder="Describe craftsmanship, stone embellishment, and drape..."
                  className="w-full px-3 py-2 rounded-xl border border-[#D6B878]/40 bg-[#FFF9F2] text-xs"
                />
              </div>

              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 text-xs font-semibold cursor-pointer">
                  <input
                    type="checkbox"
                    checked={newProductData.isPearlEdit}
                    onChange={(e) => setNewProductData({ ...newProductData, isPearlEdit: e.target.checked })}
                    className="rounded text-[#B89A58] focus:ring-[#B89A58]"
                  />
                  <span>Feature in The Pearl Edit (Home Mosaic)</span>
                </label>

                <label className="flex items-center gap-2 text-xs font-semibold cursor-pointer">
                  <input
                    type="checkbox"
                    checked={newProductData.isPublished}
                    onChange={(e) => setNewProductData({ ...newProductData, isPublished: e.target.checked })}
                    className="rounded text-emerald-600 focus:ring-emerald-600"
                  />
                  <span>Publish Immediately</span>
                </label>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-[#D6B878]/20">
                <button
                  type="button"
                  onClick={() => setShowNewProductModal(false)}
                  className="px-5 py-2.5 rounded-xl border border-[#D6B878]/40 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#342722] text-[#FFF9F2] text-xs font-bold uppercase tracking-wider shadow"
                >
                  Create Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL: MANUAL FACEBOOK / WHATSAPP ORDER ENTRY */}
      {/* ======================================================== */}
      {showManualOrderModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#342722]/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 border border-[#D6B878] shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-[#D6B878]/30">
              <h2 className="font-serif-luxury text-xl font-bold text-[#342722]">
                Record Facebook / WhatsApp Order
              </h2>
              <button
                onClick={() => setShowManualOrderModal(false)}
                className="p-1 rounded-full text-[#8C7654] hover:text-[#342722]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateManualOrder} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-[#342722] block mb-1">
                  Sales Origin Channel
                </label>
                <select
                  value={manualOrderData.sourceChannel}
                  onChange={(e) => setManualOrderData({ ...manualOrderData, sourceChannel: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-[#D6B878]/40 bg-[#FFF9F2] text-xs font-semibold"
                >
                  <option value="facebook">Facebook Messenger</option>
                  <option value="whatsapp">WhatsApp Direct</option>
                  <option value="phone">Phone Call / Walk-in</option>
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-[#342722] block mb-1">
                    Customer Name
                  </label>
                  <input
                    type="text"
                    required
                    value={manualOrderData.customerName}
                    onChange={(e) => setManualOrderData({ ...manualOrderData, customerName: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-[#D6B878]/40 bg-[#FFF9F2] text-xs"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#342722] block mb-1">
                    Phone (018...)
                  </label>
                  <input
                    type="tel"
                    required
                    value={manualOrderData.phone}
                    onChange={(e) => setManualOrderData({ ...manualOrderData, phone: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-[#D6B878]/40 bg-[#FFF9F2] text-xs font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-[#342722] block mb-1">
                  Select Product
                </label>
                <select
                  value={manualOrderData.productId}
                  onChange={(e) => setManualOrderData({ ...manualOrderData, productId: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-[#D6B878]/40 bg-[#FFF9F2] text-xs"
                >
                  {products.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name} — ৳{(p.salePrice ?? p.price).toLocaleString()} (Stock: {p.stock})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-[#342722] block mb-1">
                    District
                  </label>
                  <select
                    value={manualOrderData.district}
                    onChange={(e) => setManualOrderData({ ...manualOrderData, district: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-[#D6B878]/40 bg-[#FFF9F2] text-xs"
                  >
                    <option value="Chattogram">Chattogram (৳70)</option>
                    <option value="Dhaka">Dhaka (৳130)</option>
                    <option value="Sylhet">Sylhet (৳130)</option>
                    <option value="Other">Other Nationwide (৳130)</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#342722] block mb-1">
                    Area / Thana
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Nasirabad / GEC"
                    value={manualOrderData.area}
                    onChange={(e) => setManualOrderData({ ...manualOrderData, area: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-[#D6B878]/40 bg-[#FFF9F2] text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-[#342722] block mb-1">
                  Full Street Address
                </label>
                <input
                  type="text"
                  required
                  value={manualOrderData.fullAddress}
                  onChange={(e) => setManualOrderData({ ...manualOrderData, fullAddress: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-[#D6B878]/40 bg-[#FFF9F2] text-xs"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-[#D6B878]/20">
                <button
                  type="button"
                  onClick={() => setShowManualOrderModal(false)}
                  className="px-4 py-2 rounded-xl border border-[#D6B878]/40 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#342722] text-[#FFF9F2] text-xs font-bold uppercase tracking-wider"
                >
                  Save & Decrement Stock
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL: PRINTABLE INVOICE SLIP */}
      {/* ======================================================== */}
      {invoiceOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#342722]/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-xl bg-white rounded-3xl p-8 border border-[#D6B878] shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-start border-b border-[#D6B878]/30 pb-4">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#B89A58] block">
                  ETERNAL 6 — CHATTOGRAM ATELIER
                </span>
                <h2 className="font-serif-luxury text-2xl font-bold text-[#342722]">
                  Order Slip: {invoiceOrder.orderNumber}
                </h2>
                <div className="text-xs text-[#8C7654]">
                  {new Date(invoiceOrder.createdAt).toLocaleDateString()} via {invoiceOrder.sourceChannel}
                </div>
              </div>
              <button
                onClick={() => setInvoiceOrder(null)}
                className="p-1 text-[#8C7654] hover:text-[#342722]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="bg-[#FFF9F2] p-4 rounded-2xl border border-[#D6B878]/30 text-xs space-y-1">
              <div><strong>Patron:</strong> {invoiceOrder.customerName}</div>
              <div><strong>Phone:</strong> {invoiceOrder.phone}</div>
              <div><strong>Address:</strong> {invoiceOrder.fullAddress}, {invoiceOrder.area}, {invoiceOrder.district}</div>
              <div><strong>Payment:</strong> {invoiceOrder.paymentMethod.toUpperCase()} ({invoiceOrder.paymentStatus})</div>
            </div>

            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#342722]">
                Ordered Items:
              </h4>
              <div className="divide-y divide-[#D6B878]/20 border-y border-[#D6B878]/20">
                {invoiceOrder.items?.map((it: any, i: number) => (
                  <div key={i} className="py-2 flex justify-between text-xs">
                    <div>
                      <span className="font-medium text-[#342722]">{it.productName}</span>
                      <span className="text-[11px] text-[#8C7654] block">Qty: {it.quantity}</span>
                    </div>
                    <div className="font-mono font-bold text-[#342722]">
                      ৳{(it.price * it.quantity).toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-1 text-xs text-right">
              <div>Subtotal: ৳{invoiceOrder.subtotal?.toLocaleString()}</div>
              <div>Delivery: ৳{invoiceOrder.deliveryCharge}</div>
              <div className="text-base font-bold text-[#342722] font-mono">
                Total Payable: ৳{invoiceOrder.total.toLocaleString()}
              </div>
            </div>

            <div className="flex justify-between items-center pt-4 border-t border-[#D6B878]/30">
              <span className="text-[11px] text-[#8C7654]">
                Chittagong Atelier • eternal6six@gmail.com • +880 1606-266496
              </span>
              <button
                onClick={() => window.print()}
                className="px-6 py-2 rounded-full bg-[#342722] text-[#FFF9F2] text-xs font-bold uppercase tracking-wider flex items-center gap-2"
              >
                <Printer className="w-4 h-4 text-[#D6B878]" />
                <span>Print Document</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
