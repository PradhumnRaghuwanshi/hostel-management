import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserIcon, EnvelopeIcon, KeyIcon, AcademicCapIcon } from "@heroicons/react/24/outline";

export default function Signup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    regNo: "",
    password: "",
    confirm: "",
  });
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Simple validation
    if (!form.name || !form.email || !form.regNo || !form.password || !form.confirm) {
      setError("All fields are required.");
      return;
    }
    if (!form.email.match(/^[\w-.]+@[\w-]+\.[a-z]{2,}$/i)) {
      setError("Enter a valid email address.");
      return;
    }
    if (form.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    if (form.password !== form.confirm) {
      setError("Passwords do not match.");
      return;
    }
    // Success demo
    setSuccess("Signup successful! Redirecting to login...");
    setForm({
      name: "",
      email: "",
      regNo: "",
      password: "",
      confirm: "",
    });

    // After 2 seconds, redirect to login
    setTimeout(() => {
      navigate("/login");
    }, 2000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white dark:from-gray-900 dark:to-gray-950 px-2">
      <div className="bg-white/90 dark:bg-gray-900/95 rounded-2xl shadow-2xl p-8 w-full max-w-md">
        <div className="flex flex-col items-center mb-6">
          <AcademicCapIcon className="h-14 w-14 text-blue-600 mb-2" />
          <h2 className="text-2xl font-extrabold text-blue-800 dark:text-blue-200 mb-2">Sign Up</h2>
          <p className="text-gray-500 dark:text-gray-400 text-center text-sm">Create your student account below.</p>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="block font-medium mb-1 text-gray-700 dark:text-gray-200">Full Name</label>
            <div className="relative">
              <UserIcon className="h-5 w-5 text-gray-400 absolute left-3 top-3" />
              <input
                type="text"
                name="name"
                className="pl-10 pr-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-300"
                placeholder="Enter your name"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div>
            <label className="block font-medium mb-1 text-gray-700 dark:text-gray-200">Email</label>
            <div className="relative">
              <EnvelopeIcon className="h-5 w-5 text-gray-400 absolute left-3 top-3" />
              <input
                type="email"
                name="email"
                className="pl-10 pr-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-300"
                placeholder="Enter your email"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div>
            <label className="block font-medium mb-1 text-gray-700 dark:text-gray-200">Registration No.</label>
            <div className="relative">
              <KeyIcon className="h-5 w-5 text-gray-400 absolute left-3 top-3" />
              <input
                type="text"
                name="regNo"
                className="pl-10 pr-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-300"
                placeholder="Your Registration Number"
                value={form.regNo}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div>
            <label className="block font-medium mb-1 text-gray-700 dark:text-gray-200">Password</label>
            <div className="relative">
              <KeyIcon className="h-5 w-5 text-gray-400 absolute left-3 top-3" />
              <input
                type="password"
                name="password"
                className="pl-10 pr-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-300"
                placeholder="Create password"
                value={form.password}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div>
            <label className="block font-medium mb-1 text-gray-700 dark:text-gray-200">Confirm Password</label>
            <div className="relative">
              <KeyIcon className="h-5 w-5 text-gray-400 absolute left-3 top-3" />
              <input
                type="password"
                name="confirm"
                className="pl-10 pr-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-300"
                placeholder="Repeat password"
                value={form.confirm}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          {error && <div className="text-red-600 text-center text-sm font-bold">{error}</div>}
          {success && <div className="text-green-600 text-center text-sm font-bold">{success}</div>}

          <button
            type="submit"
            className="w-full py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold transition text-lg shadow"
          >
            Sign Up
          </button>
        </form>

        <div className="mt-6 text-xs text-center text-gray-500 dark:text-gray-400">
          Already have an account? <a href="/login" className="text-blue-700 dark:text-blue-300 underline">Login here</a>
        </div>
      </div>
    </div>
  );
}
