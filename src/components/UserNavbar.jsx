// UserNavbar.js
import React from "react";
import { Link } from "react-router-dom";

const UserNavbar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <ul className="flex space-x-4">
        <li><Link to="/" className="text-white">Home</Link></li>
        <li><Link to="/profile" className="text-white">Profile</Link></li>
      </ul>
    </nav>
  );
};

export default UserNavbar;