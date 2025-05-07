import React, { useState, useEffect } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import axios from "axios";
import { Plus, Trash2 } from "lucide-react";

export default function NoticeManagementPage() {
  const [notices, setNotices] = useState([]);
  const [formData, setFormData] = useState({ title: "", description: "" });
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const fetchNotices = async () => {
    const res = await axios.get("http://localhost:5001/notices");
    setNotices(res.data.data || []);
  };

  useEffect(() => {
    fetchNotices();
  }, []);

  const resetForm = () => {
    setFormData({ title: "", description: "" });
    setEditing(null);
    setShowForm(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editing) {
        await axios.put(`http://localhost:5001/notices/${editing._id}`, formData);
      } else {
        await axios.post("http://localhost:5001/notices", formData);
      }
      fetchNotices();
      resetForm();
    } catch (err) {
      console.error(err);
      alert("Error saving notice");
    }
  };

  const handleDelete = async (id) => {
    if (confirm("Delete this notice?")) {
      await axios.delete(`http://localhost:5001/notices/${id}`);
      fetchNotices();
    }
  };

  return (
    <AdminLayout title="Notice Management">
      <div className="flex justify-end p-4">
        <button
          onClick={() => {
            resetForm();
            setShowForm(true);
          }}
          className="bg-green-600 text-white px-4 py-2 rounded flex items-center gap-2"
        >
          <Plus className="h-4 w-4" /> Add Notice
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {notices.map((n) => (
          <div key={n._id} className="bg-white border p-4 rounded shadow">
            <h2 className="text-lg font-bold">{n.title}</h2>
            <p className="text-sm text-gray-700 my-2">{n.description}</p>
            <p className="text-xs text-gray-400">{new Date(n.date).toLocaleDateString()}</p>
            <div className="flex justify-between mt-3">
              <button
                onClick={() => {
                  setEditing(n);
                  setFormData({ title: n.title, description: n.description });
                  setShowForm(true);
                }}
                className="bg-blue-600 text-white px-3 py-1 rounded text-sm"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(n._id)}
                className="bg-red-500 text-white px-3 py-1 rounded text-sm"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/40 z-50 flex justify-center items-start px-4 py-10 overflow-y-auto">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-lg p-6 relative">
            <button onClick={resetForm} className="absolute top-2 right-4 text-2xl text-gray-500">
              &times;
            </button>
            <h2 className="text-xl font-bold text-blue-700 mb-4 text-center">
              {editing ? "Edit Notice" : "Add Notice"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                placeholder="Title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="border px-3 py-2 rounded w-full"
                required
              />
              <textarea
                placeholder="Description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="border px-3 py-2 rounded w-full"
                rows={4}
                required
              />
              <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">
                {editing ? "Update Notice" : "Create Notice"}
              </button>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
