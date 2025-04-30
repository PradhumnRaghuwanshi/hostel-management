import React from "react";

const Footer = ({ darkMode }) => (
  <footer className={`w-full text-center py-6 text-sm mt-8 ${darkMode ? "text-gray-600 bg-gray-900" : "text-gray-400 bg-white"}`}>
    &copy; {new Date().getFullYear()} Hostel Management System. Crafted with ♥️
  </footer>
);

export default Footer;
