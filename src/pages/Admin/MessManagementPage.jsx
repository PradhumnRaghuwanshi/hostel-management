// MessManagementPage.jsx
import React, { useEffect, useState } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import axios from "axios";
import { Pencil, Trash2, Plus } from "lucide-react";

export default function MessManagementPage() {
  const [menuList, setMenuList] = useState([]);
  const [formData, setFormData] = useState({
    date: "",
    breakfast: "",
    lunch: "",
    dinner: ""
  });
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchMenus();
  }, []);

  const fetchMenus = async () => {
    const res = await axios.get("http://localhost:5001/menu");
    setMenuList(res.data.data || []);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        date: new Date(formData.date)
      };
      if (editingId) {
        await axios.put(`http://localhost:5001/menu/${editingId}`, payload);
        alert("Menu updated");
      } else {
        await axios.post("http://localhost:5001/menu", payload);
        alert("Menu created");
      }
      fetchMenus();
      setShowForm(false);
      setFormData({ date: "", breakfast: "", lunch: "", dinner: "" });
      setEditingId(null);
    } catch (err) {
      alert("Error saving menu");
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (confirm("Delete this menu?")) {
      await axios.delete(`http://localhost:5001/menu/${id}`);
      fetchMenus();
    }
  };

  return (
    <AdminLayout title="Mess Management">
      <div className="flex justify-end p-4">
        <button
          onClick={() => {
            setFormData({ date: "", breakfast: "", lunch: "", dinner: "" });
            setEditingId(null);
            setShowForm(true);
          }}
          className="bg-green-600 text-white px-4 py-2 rounded flex items-center gap-2"
        >
          <Plus className="h-4 w-4" /> Add Menu
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {menuList.map((item) => (
          <div
            key={item._id}
            className="bg-white border shadow rounded-xl p-4 hover:shadow-md transition-all"
          >
            <h3 className="font-semibold mb-2">{new Date(item.date).toDateString()}</h3>
            <p className="text-sm">🍳 Breakfast: {item.breakfast}</p>
            <p className="text-sm">🍛 Lunch: {item.lunch}</p>
            <p className="text-sm">🍽️ Dinner: {item.dinner}</p>
            <div className="flex justify-between mt-3">
              <button
                onClick={() => {
                  setFormData({
                    date: item.date.split("T")[0],
                    breakfast: item.breakfast,
                    lunch: item.lunch,
                    dinner: item.dinner
                  });
                  setEditingId(item._id);
                  setShowForm(true);
                }}
                className="text-sm bg-blue-600 text-white px-3 py-1 rounded"
              >
                <Pencil size={14} />
              </button>
              <button
                onClick={() => handleDelete(item._id)}
                className="text-sm bg-red-500 text-white px-3 py-1 rounded"
              >
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex justify-center items-start p-10 overflow-y-auto">
          <div className="bg-white w-full max-w-md rounded-lg p-6 relative">
            <button
              onClick={() => setShowForm(false)}
              className="absolute top-2 right-4 text-2xl text-gray-500"
            >
              &times;
            </button>
            <h2 className="text-xl font-bold text-blue-700 mb-4 text-center">
              {editingId ? "Edit Menu" : "Add Menu"}
            </h2>
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                required
                className="w-full border px-3 py-2 rounded"
              />
              <input
                placeholder="Breakfast"
                value={formData.breakfast}
                onChange={(e) => setFormData({ ...formData, breakfast: e.target.value })}
                className="w-full border px-3 py-2 rounded"
              />
              <input
                placeholder="Lunch"
                value={formData.lunch}
                onChange={(e) => setFormData({ ...formData, lunch: e.target.value })}
                className="w-full border px-3 py-2 rounded"
              />
              <input
                placeholder="Dinner"
                value={formData.dinner}
                onChange={(e) => setFormData({ ...formData, dinner: e.target.value })}
                className="w-full border px-3 py-2 rounded"
              />
              <button
                type="submit"
                className="bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700"
              >
                {editingId ? "Update Menu" : "Add Menu"}
              </button>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
