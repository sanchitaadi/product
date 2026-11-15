"use client";

import React, { useState, useEffect } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import * as api from "@/lib/api";
import { useToast } from "@/context/ToastContext";
import {
  Tags,
  Plus,
  Edit2,
  Trash2,
  RefreshCw,
  FolderTree,
  ArrowUpDown,
  Utensils,
} from "lucide-react";

export default function AdminCategoriesPage() {
  const { showToast } = useToast();
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [editingCategory, setEditingCategory] = useState<any>(null);

  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    description: "",
    display_order: 1,
    is_active: 1,
  });

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const res = await api.adminGetCategories();
      if (res.success) {
        setCategories(res.categories || []);
      }
    } catch (err) {
      showToast("Failed to load categories", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const openAddModal = () => {
    setEditingCategory(null);
    setFormData({
      name: "",
      slug: "",
      description: "",
      display_order: categories.length + 1,
      is_active: 1,
    });
    setModalOpen(true);
  };

  const openEditModal = (cat: any) => {
    setEditingCategory(cat);
    setFormData({
      name: cat.name,
      slug: cat.slug,
      description: cat.description || "",
      display_order: Number(cat.display_order) || 1,
      is_active: Number(cat.is_active) ?? 1,
    });
    setModalOpen(true);
  };

  const handleNameChange = (name: string) => {
    // Automatically generate slug if not manually edited or when adding
    const slug = name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
    setFormData((prev) => ({
      ...prev,
      name,
      slug: editingCategory ? prev.slug : slug,
    }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name) {
      showToast("Category name is required", "error");
      return;
    }

    setSaving(true);
    try {
      const payload: any = {
        ...formData,
        display_order: Number(formData.display_order),
        is_active: Number(formData.is_active),
      };
      if (editingCategory) {
        payload.id = editingCategory.id;
      }
      const res = await api.adminSaveCategory(payload);
      if (res.success) {
        showToast(
          editingCategory ? "Category updated successfully!" : "Category created!",
          "success"
        );
        setModalOpen(false);
        fetchCategories();
      } else {
        showToast(res.error || "Failed to save category", "error");
      }
    } catch (err) {
      showToast("Error saving category", "error");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number, name: string) => {
    if (!confirm(`Are you sure you want to delete category "${name}"?`)) return;
    try {
      const res = await api.adminDeleteCategory(id);
      if (res.success) {
        showToast(`Category "${name}" removed`, "success");
        setCategories((prev) => prev.filter((c) => c.id !== id));
      } else {
        showToast("Failed to delete category", "error");
      }
    } catch (err) {
      showToast("Error deleting category", "error");
    }
  };

  return (
    <AdminLayout
      title="Category Hierarchy"
      subtitle="Group dishes logically, adjust menu display sequence, and curate seasonal collections."
    >
      <div className="flex items-center justify-between mb-6">
        <p className="text-sm text-slate-500">
          Showing <span className="font-bold text-slate-800">{categories.length}</span> active
          culinary categories.
        </p>
        <button
          onClick={openAddModal}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-xl transition shadow-sm"
        >
          <Plus className="w-4 h-4" />
          Add Category
        </button>
      </div>

      {/* Categories Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                <th className="py-4 px-6">Order</th>
                <th className="py-4 px-6">Category Name</th>
                <th className="py-4 px-6">Slug</th>
                <th className="py-4 px-6">Description</th>
                <th className="py-4 px-6">Items Count</th>
                <th className="py-4 px-6">Status</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-400">
                    <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2 text-indigo-500" />
                    Loading categories...
                  </td>
                </tr>
              ) : categories.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-400">
                    <FolderTree className="w-10 h-10 mx-auto mb-2 text-slate-300" />
                    No categories configured yet.
                  </td>
                </tr>
              ) : (
                categories.map((cat) => (
                  <tr key={cat.id} className="hover:bg-slate-50/60 transition">
                    <td className="py-4 px-6 font-mono font-bold text-slate-400">
                      #{cat.display_order}
                    </td>
                    <td className="py-4 px-6 font-bold text-slate-900">{cat.name}</td>
                    <td className="py-4 px-6 font-mono text-xs text-indigo-600 bg-indigo-50/50 px-2 py-1 rounded inline-block my-3">
                      {cat.slug}
                    </td>
                    <td className="py-4 px-6 text-xs text-slate-500 max-w-sm truncate">
                      {cat.description || "—"}
                    </td>
                    <td className="py-4 px-6">
                      <span className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-full">
                        <Utensils className="w-3 h-3 text-slate-400" />
                        {cat.item_count || 0} dishes
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <span
                        className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${
                          Number(cat.is_active) === 1
                            ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                            : "bg-slate-100 text-slate-500 border-slate-200"
                        }`}
                      >
                        {Number(cat.is_active) === 1 ? "Active" : "Hidden"}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => openEditModal(cat)}
                          className="p-1.5 text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition"
                          title="Edit Category"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(cat.id, cat.name)}
                          className="p-1.5 text-slate-600 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition"
                          title="Delete Category"
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

      {/* Add / Edit Category Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl border border-slate-200 overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <h3 className="text-lg font-bold text-slate-900">
                {editingCategory ? "Edit Category" : "Add Menu Category"}
              </h3>
              <button
                onClick={() => setModalOpen(false)}
                className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 rounded-xl transition"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSave} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Category Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => handleNameChange(e.target.value)}
                  placeholder="e.g. Artisanal Pizzas"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  URL Slug
                </label>
                <input
                  type="text"
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  placeholder="e.g. artisanal-pizzas"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Display Order
                </label>
                <input
                  type="number"
                  value={formData.display_order}
                  onChange={(e) =>
                    setFormData({ ...formData, display_order: Number(e.target.value) })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Description
                </label>
                <textarea
                  rows={2}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Short tagline for this menu category..."
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                />
              </div>

              <label className="flex items-center gap-2 p-3 border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-50 text-xs font-medium">
                <input
                  type="checkbox"
                  checked={formData.is_active === 1}
                  onChange={(e) =>
                    setFormData({ ...formData, is_active: e.target.checked ? 1 : 0 })
                  }
                  className="rounded text-indigo-600"
                />
                Category Visible on Customer Menus
              </label>

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
                  {saving ? "Saving..." : editingCategory ? "Save Changes" : "Create Category"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
