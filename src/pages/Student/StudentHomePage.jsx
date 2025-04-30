import React, { useState } from "react";
import {
  MoonIcon,
  SunIcon,
  ArrowRightIcon,
  BellAlertIcon,
  KeyIcon,
  CreditCardIcon,
  ChatBubbleBottomCenterTextIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";  // <-- IMPORT LINK

const sidebarLinks = [
  { name: "Dashboard", href: "/student/home", icon: <ArrowRightIcon className="h-6 w-6" /> },
  { name: "Room Status", href: "/roomstatus", icon: <KeyIcon className="h-6 w-6" /> },
  { name: "Fee Status", href: "/feestatus", icon: <CreditCardIcon className="h-6 w-6" /> },
  { name: "Complaints", href: "/Studentcomplaints", icon: <ChatBubbleBottomCenterTextIcon className="h-6 w-6" /> },
  { name: "Notices", href: "/student/notifications", icon: <BellAlertIcon className="h-6 w-6" /> },
];

const cards = [
  { icon: <KeyIcon className="h-8 w-8 text-blue-600" />, label: "Room", value: "A-203", bg: "bg-blue-100 dark:bg-blue-900" },
  { icon: <CreditCardIcon className="h-8 w-8 text-green-600" />, label: "Fee Due", value: "₹8,000", bg: "bg-green-100 dark:bg-green-900" },
  { icon: <BellAlertIcon className="h-8 w-8 text-yellow-500" />, label: "Notices", value: 2, bg: "bg-yellow-100 dark:bg-yellow-900" },
  { icon: <ChatBubbleBottomCenterTextIcon className="h-8 w-8 text-violet-600" />, label: "Complaints", value: 0, bg: "bg-violet-100 dark:bg-violet-900" },
];

const StudentHomePage = () => {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={darkMode ? "dark bg-gray-950 min-h-screen" : "bg-gradient-to-br from-blue-50 to-white min-h-screen"}>
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <aside className={`w-64 hidden md:block p-6 ${darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"} shadow-xl`}>
          <div className="flex items-center gap-3 mb-10">
            <img src="https://randomuser.me/api/portraits/men/22.jpg" alt="student" className="w-14 h-14 rounded-full border-2 border-blue-400" />
            <div>
              <div className="font-bold">Hi, Aman!</div>
              <div className="text-xs opacity-70">Student</div>
            </div>
          </div>
          <nav>
            <ul className="flex flex-col gap-2">
              {sidebarLinks.map(link => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="flex items-center gap-3 px-3 py-2 rounded-lg group
                      hover:bg-blue-100 hover:text-blue-800
                      dark:hover:bg-gray-800 dark:hover:text-blue-200
                      transition font-medium"
                    style={{
                      fontWeight: "500",
                      letterSpacing: "0.02em",
                      fontSize: "1rem",
                    }}
                  >
                    <span className="group-hover:scale-110 transition">{link.icon}</span>
                    <span className="transition">{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </aside>
        {/* Main */}
        <main className="flex-1 p-6 md:p-12">
          {/* Header Top */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-10">
            <div className="flex items-center gap-4">
              <img src="https://randomuser.me/api/portraits/men/22.jpg" alt="student" className="w-14 h-14 rounded-full border-2 border-blue-400" />
              <div>
                <div className="text-3xl font-extrabold text-blue-800 dark:text-blue-200">Welcome, Aman!</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">22CS0401 | 2nd Year, CSE</div>
              </div>
            </div>
            {/* Dark mode toggle */}
            <button
              className="bg-blue-100 dark:bg-gray-800 p-2 rounded-xl shadow"
              onClick={() => setDarkMode(dm => !dm)}
              title="Toggle dark mode"
            >
              {darkMode ? (
                <SunIcon className="h-7 w-7 text-yellow-400" />
              ) : (
                <MoonIcon className="h-7 w-7 text-gray-700" />
              )}
            </button>
          </div>

          {/* Dashboard Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {cards.map((c, i) => (
              <div
                key={i}
                className={`p-6 rounded-2xl shadow-lg hover:scale-105 transition-all flex flex-col items-center ${c.bg}`}
                style={{ animation: `fadeIn 0.5s ease ${(i + 1) * 0.15}s both` }}
              >
                {c.icon}
                <div className="mt-2 text-lg font-medium text-gray-800 dark:text-white">{c.label}</div>
                <div className="mt-1 text-2xl font-extrabold text-blue-900 dark:text-blue-300">{c.value}</div>
              </div>
            ))}
          </div>

          {/* Announcement/Alert */}
          <div className="bg-blue-100 dark:bg-blue-950 rounded-xl p-5 mb-7 flex items-center gap-4">
            <BellAlertIcon className="h-7 w-7 text-blue-600 animate-bounce" />
            <span className="text-blue-700 dark:text-blue-200 font-semibold">Hostel renewal registrations are open till 30th April!</span>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap gap-4 justify-center mb-10">
            <Link to="/student/room-status" className="bg-blue-600 text-white px-6 py-2 rounded shadow hover:bg-blue-700">Room Details</Link>
            <Link to="/student/fee-status" className="bg-green-600 text-white px-6 py-2 rounded shadow hover:bg-green-700">Fee Status</Link>
            <Link to="/student/complaints" className="bg-yellow-600 text-white px-6 py-2 rounded shadow hover:bg-yellow-700">Complaints</Link>
            <Link to="/student/notifications" className="bg-violet-600 text-white px-6 py-2 rounded shadow hover:bg-violet-700">Notices</Link>
          </div>

          {/* Info/Feature Section */}
          <div className="mt-8 max-w-3xl mx-auto text-center bg-white/80 dark:bg-gray-800/80 rounded-2xl shadow-lg p-8">
            <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-2">Student Dashboard at a glance</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-2">
              Check your room status, pending fees, new notices, complaints, and more — all at one place!
            </p>
            <div className="flex flex-wrap gap-4 mt-4 justify-center">
              <span className="bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200 px-4 py-1 rounded-full text-xs">Fast Access</span>
              <span className="bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 px-4 py-1 rounded-full text-xs">Mobile Friendly</span>
              <span className="bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-200 px-4 py-1 rounded-full text-xs">24x7 Available</span>
            </div>
          </div>
        </main>
      </div>
      {/* Card animation style */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(30px);}
          to   { opacity: 1; transform: none;}
        }
      `}</style>
    </div>
  );
};

export default StudentHomePage;
