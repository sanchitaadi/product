"use client";

import React, { useState, useEffect } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import * as api from "@/lib/api";
import { useToast } from "@/context/ToastContext";
import {
  UtensilsCrossed,
  Plus,
  Search,
  Filter,
  Edit2,
  Trash2,
  CheckCircle,
  XCircle,
  Flame,
  Clock,
  Sparkles,
  RefreshCw,
  Image as ImageIcon,
} from "lucide-react";

export default function AdminMenuPage() {
  const { showToast } = useToast();
  const [items, setItems] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    category: "Starters",
    price: "",
    description: "",
    is_veg: 1,
    is_bestseller: 0,
    image_url: "shared/assets/images/burrata-bruschetta.webp",
    calories: "300",
    preparation_time: "15 mins",
    is_available: 1,
  });

  const availableImageAssets = [
    { label: "Burrata Bruschetta", path: "images/burrata-bruschetta.webp" },
    { label: "Avocado Tartine", path: "images/avocado-tartine.webp" },
    { label: "Calamari Fritti", path: "images/calamari-fritti.webp" },
    { label: "Truffle Tagliolini", path: "images/truffle-tagliolini.webp" },
    { label: "Wild Mushroom Pizza", path: "images/wild-mushroom-pizza.webp" },
    { label: "Margherita Pizza", path: "images/margherita-pizza.webp" },
    { label: "Saffron Risotto", path: "images/saffron-risotto.webp" },
    { label: "Peach Hibiscus Cooler", path: "images/peach-hibiscus-cooler.webp" },
    { label: "Velvet Cold Coffee", path: "images/velvet-cold-coffee.webp" },
    { label: "Matcha Cloud Latte", path: "images/matcha-cloud-latte.webp" },
    { label: "Parisian Macarons", path: "images/parisian-macarons.webp" },
    { label: "Strawberry Cheesecake", path: "images/strawberry-cheesecake.webp" },
    { label: "Lotus Biscoff Shake", path: "images/lotus-biscoff-shake.webp" },
  ];

  const fetchMenu = async () => {
    setLoading(true);
    try {
      const res = await api.adminGetMenu();
      if (res.success) {
        setItems(res.items || []);
        setCategories(res.categories || []);
      }
    } catch (err) {
      showToast("Failed to fetch menu items", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMenu();
  }, []);

  const openAddModal = () => {
    setEditingItem(null);
    setFormData({
      name: "",
      category: categories[0]?.name || "Starters",
      price: "",
      description: "",
      is_veg: 1,
      is_bestseller: 0,
      image_url: "shared/assets/images/burrata-bruschetta.webp",
      calories: "320",
      preparation_time: "15 mins",
      is_available: 1,
    });
    setModalOpen(true);
  };

  const openEditModal = (item: any) => {
    setEditingItem(item);
    setFormData({
      name: item.name,
      category: item.category,
      price: String(item.price),
      description: item.description || "",
      is_veg: Number(item.is_veg),
      is_bestseller: Number(item.is_bestseller),
      image_url: item.image_url,
      calories: String(item.calories || 300),
      preparation_time: item.preparation_time || "15 mins",
      is_available: Number(item.is_available),
    });
    setModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.price || Number(formData.price) <= 0) {
      showToast("Please provide item name and valid price", "error");
      return;
    }

    setSaving(true);
    try {
      const payload: any = {
        ...formData,
        price: Number(formData.price),
        calories: Number(formData.calories),
        is_veg: Number(formData.is_veg),
        is_bestseller: Number(formData.is_bestseller),
        is_available: Number(formData.is_available),
      };
      if (editingItem) {
        payload.id = editingItem.id;
      }
      const res = await api.adminSaveMenuItem(payload);
      if (res.success) {
        showToast(
          editingItem ? "Dish updated successfully!" : "New dish added to menu!",
          "success"
        );
        setModalOpen(false);
        fetchMenu();
      } else {
        showToast(res.error || "Failed to save item", "error");
      }
    } catch (err) {
      showToast("Error saving dish item", "error");
    } finally {
      setSaving(false);
    }
  };

  const handleToggleAvailable = async (id: number) => {
    try {
      const res = await api.adminToggleMenuItemAvailable(id);
      if (res.success) {
        setItems((prev) =>
          prev.map((it) => (it.id === id ? { ...it, is_available: it.is_available ? 0 : 1 } : it))
        );
        showToast("Dish availability updated", "success");
      }
    } catch (err) {
      showToast("Failed to toggle availability", "error");
    }
  };

  const handleDelete = async (id: number, name: string) => {
    if (!confirm(`Are you sure you want to delete "${name}"? This action cannot be undone.`)) {
      return;
    }
    try {
      const res = await api.adminDeleteMenuItem(id);
      if (res.success) {
        showToast(`"${name}" removed from menu`, "success");
        setItems((prev) => prev.filter((it) => it.id !== id));
      } else {
        showToast("Failed to delete item", "error");
      }
    } catch (err) {
      showToast("Error deleting item", "error");
    }
  };

  const filteredItems = items.filter((it) => {
    const matchesCategory =
      selectedCategory === "all" || it.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesSearch =
      !search ||
      it.name.toLowerCase().includes(search.toLowerCase()) ||
      it.description?.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <AdminLayout
      title="Product Catalog & Inventory"
      subtitle="Organize pantry products, manage bundle pricing, monitor inventory stock status, and curate seasonal releases."
    >
      {/* Controls Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex-1 flex flex-wrap items-center gap-3">
          {/* Search */}
          <div className="relative min-w-[240px] flex-1 max-w-md">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search dishes by name or ingredient..."
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
            />
          </div>

          {/* Category Filter */}
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-slate-400" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
            >
              <option value="all">All Categories ({items.length})</option>
              {categories.map((c) => (
                <option key={c.id} value={c.name}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <button
          onClick={openAddModal}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-xl transition shadow-sm"
        >
          <Plus className="w-4 h-4" />
          Add New Dish
        </button>
      </div>

      {/* Menu Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                <th className="py-4 px-6">Dish</th>
                <th className="py-4 px-6">Category</th>
                <th className="py-4 px-6">Diet</th>
                <th className="py-4 px-6">Price</th>
                <th className="py-4 px-6">Bestseller</th>
                <th className="py-4 px-6">Status</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-400">
                    <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2 text-indigo-500" />
                    Loading menu catalog...
                  </td>
                </tr>
              ) : filteredItems.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-400">
                    <UtensilsCrossed className="w-10 h-10 mx-auto mb-2 text-slate-300" />
                    No dishes found matching your criteria.
                  </td>
                </tr>
              ) : (
                filteredItems.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/60 transition">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3.5">
                        <img
                          src={api.resolveImageUrl(item.image_url)}
                          alt={item.name}
                          className="w-12 h-12 rounded-xl object-cover border border-slate-200 shrink-0"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src =
                              "/images/fallback-food.svg";
                          }}
                        />
                        <div>
                          <div className="font-bold text-slate-900">{item.name}</div>
                          <div className="text-xs text-slate-500 line-clamp-1 max-w-xs">
                            {item.description}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-slate-100 text-slate-700">
                        {item.category}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      {Number(item.is_veg) === 1 ? (
                        <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                          <span className="w-2 h-2 rounded-full bg-emerald-500" />
                          VEG
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-xs font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
                          <span className="w-2 h-2 rounded-full bg-rose-500" />
                          NON-VEG
                        </span>
                      )}
                    </td>
                    <td className="py-4 px-6 font-bold text-slate-900">
                      ₹{Number(item.price).toFixed(2)}
                    </td>
                    <td className="py-4 px-6">
                      {Number(item.is_bestseller) === 1 ? (
                        <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
                          <Flame className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                          Bestseller
                        </span>
                      ) : (
                        <span className="text-xs text-slate-400">—</span>
                      )}
                    </td>
                    <td className="py-4 px-6">
                      <button
                        onClick={() => handleToggleAvailable(item.id)}
                        className={`text-xs font-semibold px-2.5 py-1 rounded-full border transition ${
                          Number(item.is_available) === 1
                            ? "bg-emerald-50 text-emerald-700 border-emerald-300 hover:bg-emerald-100"
                            : "bg-rose-50 text-rose-700 border-rose-300 hover:bg-rose-100"
                        }`}
                      >
                        {Number(item.is_available) === 1 ? "In Stock" : "Unavailable (86'd)"}
                      </button>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => openEditModal(item)}
                          className="p-1.5 text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition"
                          title="Edit Dish"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(item.id, item.name)}
                          className="p-1.5 text-slate-600 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition"
                          title="Delete Dish"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Dish Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white w-full max-w-xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden max-h-[90vh] flex flex-col">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <h3 className="text-lg font-bold text-slate-900">
                {editingItem ? "Edit Dish" : "Create New Menu Dish"}
              </h3>
              <button
                onClick={() => setModalOpen(false)}
                className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 rounded-xl transition"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSave} className="p-6 overflow-y-auto space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Dish Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Truffle Burrata Tagliolini"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                    Category *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 bg-white"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.name}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                    Price (₹ INR) *
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    placeholder="349.00"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Description
                </label>
                <textarea
                  rows={2}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Artisan ingredients, culinary preparation notes..."
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                    Calories (kcal)
                  </label>
                  <input
                    type="number"
                    value={formData.calories}
                    onChange={(e) => setFormData({ ...formData, calories: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                    Preparation Time
                  </label>
                  <input
                    type="text"
                    value={formData.preparation_time}
                    onChange={(e) => setFormData({ ...formData, preparation_time: e.target.value })}
                    placeholder="15-20 mins"
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Select Visual Photograph
                </label>
                <select
                  value={formData.image_url}
                  onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 bg-white"
                >
                  {availableImageAssets.map((img) => (
                    <option key={img.path} value={img.path}>
                      {img.label} ({img.path})
                    </option>
                  ))}
                </select>
                <div className="mt-2 flex items-center gap-3">
                  <img
                    src={api.resolveImageUrl(formData.image_url)}
                    alt="Preview"
                    className="w-14 h-14 rounded-xl object-cover border border-slate-200"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        "/images/fallback-food.svg";
                    }}
                  />
                  <input
                    type="text"
                    value={formData.image_url}
                    onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                    placeholder="Or enter custom image path..."
                    className="flex-1 px-3 py-1.5 rounded-lg border border-slate-200 text-xs text-slate-600 focus:outline-none"
                  />
                </div>
              </div>

              {/* Toggles */}
              <div className="grid grid-cols-3 gap-3 pt-2">
                <label className="flex items-center gap-2 p-3 border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-50 text-xs font-medium">
                  <input
                    type="checkbox"
                    checked={formData.is_veg === 1}
                    onChange={(e) => setFormData({ ...formData, is_veg: e.target.checked ? 1 : 0 })}
                    className="rounded text-indigo-600"
                  />
                  Vegetarian
                </label>

                <label className="flex items-center gap-2 p-3 border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-50 text-xs font-medium">
                  <input
                    type="checkbox"
                    checked={formData.is_bestseller === 1}
                    onChange={(e) =>
                      setFormData({ ...formData, is_bestseller: e.target.checked ? 1 : 0 })
                    }
                    className="rounded text-indigo-600"
                  />
                  Bestseller
                </label>

                <label className="flex items-center gap-2 p-3 border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-50 text-xs font-medium">
                  <input
                    type="checkbox"
                    checked={formData.is_available === 1}
                    onChange={(e) =>
                      setFormData({ ...formData, is_available: e.target.checked ? 1 : 0 })
                    }
                    className="rounded text-indigo-600"
                  />
                  In Stock
                </label>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 border border-slate-200 hover:bg-slate-50 text-slate-600 text-xs font-semibold rounded-xl transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-xl transition shadow-sm disabled:opacity-50"
                >
                  {saving ? "Saving..." : editingItem ? "Save Changes" : "Create Dish"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
