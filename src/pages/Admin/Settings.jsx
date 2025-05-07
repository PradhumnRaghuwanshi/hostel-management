import React, { useEffect, useState } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import axios from "axios";

export default function SettingsPage() {
  const [settings, setSettings] = useState(null);
  const [formData, setFormData] = useState({
    adminName: "",
    email: "",
    password: "",
    newPassword: "",
    profilePicture: null,
    preview: ""
  });

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const res = await axios.get("http://localhost:5001/settings");
      const data = res.data.data;
      setSettings(data);
      setFormData({
        adminName: data.adminName,
        email: data.email,
        password: "",
        newPassword: "",
        preview: data.profilePicture || "",
        profilePicture: null
      });
    } catch (err) {
      console.error("Failed to fetch settings", err);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, profilePicture: file, preview: URL.createObjectURL(file) });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = new FormData();
    payload.append("adminName", formData.adminName);
    payload.append("email", formData.email);
    if (formData.password && formData.newPassword) {
      payload.append("password", formData.password);
      payload.append("newPassword", formData.newPassword);
    }
    if (formData.profilePicture) {
      payload.append("profilePicture", formData.profilePicture);
    }

    try {
      const res = await axios.put(`http://localhost:5001/settings/${settings._id}`, payload);
      alert("Settings updated successfully!");
      fetchSettings();
    } catch (err) {
      console.error(err);
      alert("Failed to update settings");
    }
  };

  return (
    <AdminLayout title="Settings">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-8 mt-6">
        <h2 className="text-2xl font-semibold text-center mb-6 text-blue-700">Admin Settings</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block mb-1 font-medium">Admin Name</label>
            <input
              className="w-full border px-4 py-2 rounded-lg"
              placeholder="Admin Name"
              value={formData.adminName}
              onChange={(e) => setFormData({ ...formData, adminName: e.target.value })}
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Email</label>
            <input
              className="w-full border px-4 py-2 rounded-lg"
              placeholder="Email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 font-medium">Current Password</label>
              <input
                className="w-full border px-4 py-2 rounded-lg"
                placeholder="Current Password"
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">New Password</label>
              <input
                className="w-full border px-4 py-2 rounded-lg"
                placeholder="New Password"
                type="password"
                value={formData.newPassword}
                onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
              />
            </div>
          </div>

          <div>
            <label className="block mb-2 font-medium">Profile Picture</label>
            <div className="flex items-center gap-4">
              {formData.preview && (
                <img
                  src={formData.preview}
                  alt="Preview"
                  className="h-16 w-16 object-cover rounded-full border"
                />
              )}
              <input type="file" accept="image/*" onChange={handleImageChange} />
            </div>
          </div>

          <div className="pt-4">
            <button className="bg-blue-600 hover:bg-blue-700 text-white w-full py-3 rounded-lg font-semibold">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}
