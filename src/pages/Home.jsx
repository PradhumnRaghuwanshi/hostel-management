// src/pages/Home.jsx
import React from "react";
import {
  HomeIcon,
  WifiIcon,
  SparklesIcon,
  ShieldCheckIcon,
  BookOpenIcon,
  BoltIcon,
  UserIcon,
  StarIcon,
} from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const features = [
  { name: "AC Rooms", icon: HomeIcon },
  { name: "High-Speed WiFi", icon: WifiIcon },
  { name: "Nutritious Meals", icon: SparklesIcon },
  { name: "24/7 Security", icon: ShieldCheckIcon },
  { name: "Study Room", icon: BookOpenIcon },
  { name: "Power Backup", icon: BoltIcon },
];

const reviews = [
  {
    name: "Aman Verma",
    rating: 5,
    comment: "Best hostel experience! Rooms are super clean and food is just like home."
  },
  {
    name: "Rahul Singh",
    rating: 4,
    comment: "WiFi is fast, environment is peaceful, and staff is helpful."
  },
];

const Home = () => {
  return (
    <div className="bg-gradient-to-br from-blue-100 to-purple-100 min-h-screen text-gray-800">
      {/* Header with Nav */}
      <nav className="bg-white shadow-md fixed top-0 left-0 w-full z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <Link to="/" className="text-2xl font-bold text-indigo-600">SkyNest</Link>
            <div className="flex space-x-4">
              <Link to="/login" className="px-4 py-2 rounded-full border border-indigo-600 text-indigo-600 hover:bg-indigo-50 transition">Login</Link>
              <Link to="/signup" className="px-4 py-2 rounded-full bg-indigo-600 text-white hover:bg-indigo-700 transition">Sign Up</Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-32 text-center px-4 shadow-lg mt-16">
        <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-5xl font-extrabold drop-shadow-md">
          SkyNest Boys Hostel
        </motion.h1>
        <p className="mt-4 text-xl font-light">Affordable. Comfortable. Secure.</p>
        <div className="mt-6 flex justify-center gap-4">
          <motion.button whileHover={{ scale: 1.05 }} className="bg-white text-blue-700 px-6 py-3 rounded-full font-semibold shadow-md hover:shadow-xl transition">Book Now</motion.button>
          <motion.button whileHover={{ scale: 1.05 }} className="border border-white px-6 py-3 rounded-full text-white font-semibold hover:bg-white hover:text-blue-600 transition">See Rooms</motion.button>
        </div>
      </header>

      <section className="py-16 px-4 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-10 text-center text-gray-700">Hostel Features</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-8">
          {features.map((item, idx) => (
            <motion.div whileHover={{ scale: 1.03 }} key={idx} className="flex items-center space-x-4 bg-white p-6 rounded-xl shadow-md hover:shadow-lg">
              <item.icon className="h-7 w-7 text-indigo-600" />
              <span className="font-medium text-lg">{item.name}</span>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="py-16 bg-white px-4">
        <h2 className="text-3xl font-bold mb-10 text-center text-gray-700">Student Reviews</h2>
        <div className="max-w-4xl mx-auto space-y-8">
          {reviews.map((review, idx) => (
            <motion.div whileHover={{ scale: 1.02 }} key={idx} className="bg-gradient-to-br from-indigo-100 to-purple-100 p-6 rounded-xl shadow-md">
              <p className="text-xl font-semibold text-gray-800">{review.name}</p>
              <p className="text-yellow-500 text-lg">{"★".repeat(review.rating)}</p>
              <p className="mt-2 text-gray-700 text-sm">{review.comment}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <footer className="py-10 text-center bg-gradient-to-r from-indigo-600 to-blue-600 text-white">
        <p className="text-sm">&copy; {new Date().getFullYear()} SkyNest Boys Hostel. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;