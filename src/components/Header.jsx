import React, { useState } from "react";
import { BellIcon, MoonIcon, SunIcon, ChevronDownIcon } from "@heroicons/react/24/outline";

const user = {
  name: "Aman Kumar",
  photo: "https://randomuser.me/api/portraits/men/32.jpg",
  role: "Admin"
};

const Header = ({ darkMode, setDarkMode }) => {
  const [open, setOpen] = useState(false);
  return (
    <header className={`w-full px-4 py-3 flex items-center justify-between shadow ${darkMode ? "bg-gray-900" : "bg-white"}`}>
      <div className="flex items-center gap-4">
        <img src={user.photo} alt="profile" className="w-12 h-12 rounded-full border-2 border-blue-400" />
        <div>
          <div className={`text-lg font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>
            Welcome, {user.name}
          </div>
          <div className={`text-xs ${darkMode ? "text-gray-300" : "text-gray-500"}`}>{user.role}</div>
        </div>
      </div>
      <div className="flex items-center gap-6">
        <div className="relative cursor-pointer">
          <BellIcon className={`h-7 w-7 ${darkMode ? "text-white" : "text-gray-600"}`} />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">3</span>
        </div>
        <button className="p-1" onClick={() => setDarkMode(dm => !dm)} aria-label="Toggle dark mode">
          {darkMode ? (
            <SunIcon className="h-7 w-7 text-yellow-400" />
          ) : (
            <MoonIcon className="h-7 w-7 text-gray-600" />
          )}
        </button>
        <div className="relative">
          <button className="flex items-center gap-1" onClick={() => setOpen(o => !o)}>
            <img src={user.photo} alt="profile" className="w-8 h-8 rounded-full" />
            <ChevronDownIcon className={`h-5 w-5 ${darkMode ? "text-white" : "text-gray-700"}`} />
          </button>
          {open && (
            <div className={`absolute right-0 mt-2 w-44 rounded-xl shadow bg-white border z-50 ${darkMode ? "bg-gray-800 border-gray-600" : "bg-white border-gray-200"}`}>
              <div className={`px-4 py-3 ${darkMode ? "text-gray-100" : "text-gray-700"}`}>{user.name}</div>
              <hr className={darkMode ? "border-gray-700" : ""} />
              <a href="/admin/profile" className={`block px-4 py-2 text-sm hover:bg-blue-50 ${darkMode ? "hover:bg-gray-700 text-gray-100" : ""}`}>My Profile</a>
              <a href="/logout" className={`block px-4 py-2 text-sm hover:bg-blue-50 ${darkMode ? "hover:bg-gray-700 text-gray-100" : ""}`}>Logout</a>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
