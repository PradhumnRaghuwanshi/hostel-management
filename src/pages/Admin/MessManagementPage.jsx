import React, { useEffect, useState } from "react";
import axios from "axios";

export default function MessManagementPage() {
  const [menus, setMenus] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({
    date: "",
    breakfast: "",
    lunch: "",
    dinner: "",
  });

  const fetchMenus = async () => {
    try {
      const res = await axios.get("https://hostel-management-backend-qyvz.onrender.com/foodmenu");
      setMenus(res.data.data || []);
    } catch (err) {
      console.error("Error fetching menus:", err);
    }
  };

  useEffect(() => {
    fetchMenus();
  }, []);

  const handleSubmit = async () => {
    try {
      const formattedDate = new Date(form.date + "T00:00:00Z");

      const payload = {
        breakfast: form.breakfast,
        lunch: form.lunch,
        dinner: form.dinner,
        date: formattedDate,
      };

      if (editing) {
        await axios.put(`https://hostel-management-backend-qyvz.onrender.com/foodmenu/${editing._id}`, payload);
        alert("Menu updated successfully");
      } else {
        await axios.post("https://hostel-management-backend-qyvz.onrender.com/foodmenu", payload);
        alert("Menu added successfully");
      }

      fetchMenus();
      setForm({ date: "", breakfast: "", lunch: "", dinner: "" });
      setEditing(null);
      setShowForm(false);
    } catch (err) {
      console.error("Submit error:", err?.response?.data || err.message);
      alert("Error: " + (err?.response?.data?.message || err.message));
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this menu?")) return;
    try {
      await axios.delete(`https://hostel-management-backend-qyvz.onrender.com/foodmenu/${id}`);
      fetchMenus();
    } catch (err) {
      console.error("Delete error:", err);
      alert("Failed to delete menu");
    }
  };

  const openEdit = (menu) => {
    setForm({
      date: menu.date.slice(0, 10),
      breakfast: menu.breakfast,
      lunch: menu.lunch,
      dinner: menu.dinner,
    });
    setEditing(menu);
    setShowForm(true);
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Mess Menu Management</h1>
        <button
          onClick={() => {
            setForm({ date: "", breakfast: "", lunch: "", dinner: "" });
            setEditing(null);
            setShowForm(true);
          }}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Add New Menu
        </button>
      </div>

      {/* Grid display */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {menus.map((menu) => (
          <div key={menu._id} className="bg-white p-4 rounded shadow border">
            <h2 className="font-bold text-lg mb-1">
              {new Date(menu.date).toLocaleDateString()}
            </h2>
            <p className="text-gray-700"><strong>Breakfast:</strong> {menu.breakfast}</p>
            <p className="text-gray-700"><strong>Lunch:</strong> {menu.lunch}</p>
            <p className="text-gray-700"><strong>Dinner:</strong> {menu.dinner}</p>
            <div className="mt-4 flex justify-end gap-3">
              <button
                onClick={() => openEdit(menu)}
                className="text-sm px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(menu._id)}
                className="text-sm px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Form Modal (DIV-based) */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
            <button
              onClick={() => setShowForm(false)}
              className="absolute top-2 right-4 text-2xl text-gray-500 hover:text-gray-700"
            >
              &times;
            </button>
            <h2 className="text-xl font-bold mb-4">
              {editing ? "Edit Menu" : "Add Menu"}
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Date</label>
                <input
                  type="date"
                  required
                  value={form.date}
                  onChange={(e) => setForm({ ...form, date: e.target.value })}
                  className="w-full border px-3 py-2 rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Breakfast</label>
                <input
                  type="text"
                  value={form.breakfast}
                  onChange={(e) => setForm({ ...form, breakfast: e.target.value })}
                  className="w-full border px-3 py-2 rounded"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Lunch</label>
                <input
                  type="text"
                  value={form.lunch}
                  onChange={(e) => setForm({ ...form, lunch: e.target.value })}
                  className="w-full border px-3 py-2 rounded"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Dinner</label>
                <input
                  type="text"
                  value={form.dinner}
                  onChange={(e) => setForm({ ...form, dinner: e.target.value })}
                  className="w-full border px-3 py-2 rounded"
                  required
                />
              </div>
              <div className="text-right pt-2">
                <button
                  onClick={handleSubmit}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded"
                >
                  {editing ? "Update" : "Add"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
