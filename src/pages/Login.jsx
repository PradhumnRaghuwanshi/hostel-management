import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserIcon, LockClosedIcon, ShieldCheckIcon } from "@heroicons/react/24/solid";

const Login = () => {
  const [role, setRole] = useState("student");
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");

    // Admin login validation (case-sensitive, change route if needed)
    if (
      role === "admin" &&
      form.username.trim().toLowerCase() === "admin" &&
      form.password === "password"
    ) {
      navigate("/AdminDashboard"); // Admin ke liye
    }
    // Student login validation
    else if (
      role === "student" &&
      form.username.trim().toLowerCase() === "student" &&
      form.password === "password"
    ) {
      navigate("/studentHomePage"); // <-- YAHAN STUDENT HOME PAGE ROUTE
    }
    // Invalid credentials
    else {
      setError("Invalid username or password. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-200 dark:from-gray-900 dark:to-gray-950 transition-colors">
      <div className="bg-white/80 dark:bg-gray-900/90 rounded-2xl shadow-2xl p-10 w-full max-w-md">
        {/* Logo & Role toggle */}
        <div className="flex flex-col items-center mb-7">
          <ShieldCheckIcon className="h-14 w-14 text-blue-600 mb-2" />
          <h2 className="text-2xl font-bold text-blue-800 dark:text-blue-200 mb-1">
            {role === "admin" ? "Admin Login" : "Student Login"}
          </h2>
          <div className="flex gap-4 mt-2">
            <button
              className={`px-4 py-1 rounded-full font-semibold text-sm shadow transition ${role === "student"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-100"
                }`}
              onClick={() => setRole("student")}
            >
              Student
            </button>
            <button
              className={`px-4 py-1 rounded-full font-semibold text-sm shadow transition ${role === "admin"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-100"
                }`}
              onClick={() => setRole("admin")}
            >
              Admin
            </button>
          </div>
        </div>
        {/* Login Form */}
        <form className="space-y-6" onSubmit={handleLogin}>
          <div>
            <label className="block text-gray-700 dark:text-gray-200 mb-1 font-medium">Username</label>
            <div className="relative">
              <UserIcon className="h-5 w-5 text-gray-400 absolute left-3 top-3" />
              <input
                type="text"
                required
                placeholder="Enter your username"
                className="pl-10 pr-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 w-full bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-300"
                value={form.username}
                onChange={e => setForm({ ...form, username: e.target.value })}
              />
            </div>
          </div>
          <div>
            <label className="block text-gray-700 dark:text-gray-200 mb-1 font-medium">Password</label>
            <div className="relative">
              <LockClosedIcon className="h-5 w-5 text-gray-400 absolute left-3 top-3" />
              <input
                type="password"
                required
                placeholder="Enter your password"
                className="pl-10 pr-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 w-full bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-300"
                value={form.password}
                onChange={e => setForm({ ...form, password: e.target.value })}
              />
            </div>
          </div>
          {error && (
            <div className="text-red-600 text-sm font-medium text-center">{error}</div>
          )}
          <button
            type="submit"
            className="w-full py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold transition text-lg shadow"
          >
            Login
          </button>
        </form>
        {/* Demo text */}
        <div className="mt-6 text-xs text-center text-gray-500 dark:text-gray-400">
          <span>Admin: <b>admin</b> / <b>password</b> &nbsp;|&nbsp; Student: <b>student</b> / <b>password</b></span>
        </div>
      </div>
    </div>
  );
};

export default Login;
