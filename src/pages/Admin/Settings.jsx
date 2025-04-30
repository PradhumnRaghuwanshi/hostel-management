import React, { useState } from "react";
import AdminSidebar from "./AdminSidebar";
import { UserCircle, Lock, Moon, Sun, Bell, Trash2 } from "lucide-react";

export default function Settings() {
  // Demo states
  const [theme, setTheme] = useState("light");
  const [notify, setNotify] = useState(true);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <main className="flex-1 p-6 max-w-3xl mx-auto">
        <h2 className="text-3xl font-extrabold mb-8 text-blue-800">Settings</h2>
        {/* Profile Card */}
        <div className="bg-white rounded-2xl shadow p-6 mb-8">
          <div className="flex items-center gap-5 mb-6">
            <UserCircle className="h-14 w-14 text-blue-400" />
            <div>
              <p className="text-lg font-bold text-gray-800 mb-1">Admin</p>
              <p className="text-gray-500 text-sm">admin@hostel.com</p>
            </div>
          </div>
          <div className="flex gap-3">
            <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded font-medium">
              Edit Profile
            </button>
            <button className="px-4 py-2 bg-gray-100 border border-gray-300 text-gray-700 rounded font-medium">
              Change Photo
            </button>
          </div>
        </div>
        {/* Security */}
        <div className="bg-white rounded-2xl shadow p-6 mb-8">
          <h3 className="text-lg font-semibold flex items-center gap-2 mb-4 text-blue-700">
            <Lock className="h-5 w-5" /> Change Password
          </h3>
          <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="password"
              className="border px-3 py-2 rounded"
              placeholder="Current Password"
            />
            <input
              type="password"
              className="border px-3 py-2 rounded"
              placeholder="New Password"
            />
            <input
              type="password"
              className="border px-3 py-2 rounded md:col-span-2"
              placeholder="Confirm New Password"
            />
            <button
              type="button"
              className="bg-blue-600 text-white rounded px-4 py-2 font-semibold md:col-span-2"
              onClick={() => alert("Password Changed! (demo)")}
            >
              Update Password
            </button>
          </form>
        </div>
        {/* Preferences */}
        <div className="bg-white rounded-2xl shadow p-6 mb-8">
          <h3 className="text-lg font-semibold flex items-center gap-2 mb-4 text-blue-700">
            <Sun className="h-5 w-5" /> Preferences
          </h3>
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-yellow-500" />
              <span className="text-gray-700 font-medium">Notifications</span>
              <input
                type="checkbox"
                className="ml-4 accent-blue-600 scale-125"
                checked={notify}
                onChange={() => setNotify((n) => !n)}
              />
              <span className="ml-2 text-xs text-gray-400">{notify ? "On" : "Off"}</span>
            </div>
            <div className="flex items-center gap-2">
              <Moon className="h-5 w-5 text-blue-600" />
              <span className="text-gray-700 font-medium">Theme</span>
              <select
                className="border rounded px-2 py-1 ml-4"
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
              >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
                <option value="system">System</option>
              </select>
            </div>
          </div>
        </div>
        {/* Danger Zone */}
        <div className="bg-white rounded-2xl shadow p-6 border border-red-200">
          <h3 className="text-lg font-semibold flex items-center gap-2 mb-4 text-red-600">
            <Trash2 className="h-5 w-5" /> Danger Zone
          </h3>
          <p className="mb-4 text-gray-500">
            Deleting your admin account will remove all admin access. This cannot be undone.
          </p>
          <button
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded font-semibold"
            onClick={() => alert("Account deletion (demo)!")}
          >
            Delete Account
          </button>
        </div>
      </main>
    </div>
  );
}
