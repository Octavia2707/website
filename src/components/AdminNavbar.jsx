import React, { useState } from "react";
import { Link } from "react-router-dom";

const AdminNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex items-center justify-between">
        {/* Brand or Logo */}
        <div className="text-lg font-bold text-white">Admin Panel</div>

        {/* Hamburger Menu for Small Screens */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          ☰
        </button>

        {/* Menu Items for Large Screens */}
        <ul className="hidden md:flex space-x-4">
          <li><Link to="/" className="text-white hover:bg-gray-600 p-2 rounded">Home</Link></li>
          <li><Link to="/admin" className="text-white hover:bg-gray-600 p-2 rounded">Admin Dashboard</Link></li>
          <li><Link to="/profile" className="text-white hover:bg-gray-600 p-2 rounded">Profile</Link></li>
          <li><span className="text-white">Admin</span></li>
        </ul>
      </div>

      {/* Dropdown Menu for Small Screens */}
      {isMenuOpen && (
        <ul className="md:hidden bg-gray-700 p-4 space-y-2">
          <li><Link to="/" className="block text-white hover:bg-gray-600 p-2 rounded">Home</Link></li>
          <li><Link to="/admin" className="block text-white hover:bg-gray-600 p-2 rounded">Admin Dashboard</Link></li>
          <li><Link to="/profile" className="block text-white hover:bg-gray-600 p-2 rounded">Profile</Link></li>
          <li><span className="block text-white p-2">Admin</span></li>
        </ul>
      )}
    </nav>
  );
};

export default AdminNavbar;
