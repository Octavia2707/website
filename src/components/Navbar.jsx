import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { auth } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';

const Navbar = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // Mengecek apakah user adalah admin berdasarkan email
        const adminEmails = ["adminako83@gmail.com"];
        setIsAdmin(adminEmails.includes(user.email));
      } else {
        setIsAdmin(false);
      }
    });

    return () => unsubscribe();
  }, []);

  // Jangan tampilkan navbar di halaman login
  if (location.pathname === "/login") {
    return null;
  }

  return (
    <nav className="absolute top-0 left-0 w-full bg-transparent z-50 ">
      {/* Hamburger Menu */}
      <div className="flex justify-between items-center py-4 px-6 lg:hidden">
        <h1 className="text-white font-Judson text-2xl">AKO.DEFLEUR</h1>
        <button
          className="text-white text-3xl focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          &#9776; {/* Icon garis tiga */}
        </button>
      </div>

      {/* Menu */}
      <ul
        className={`fixed top-0 left-0 w-full bg-[#F4BF97] py-5 px-10 text-xl text-black font-Judson flex flex-col gap-6 transform ${
          isMenuOpen ? 'translate-y-0' : '-translate-y-full'
        } transition-transform duration-500 ease-in-out lg:static lg:flex-row lg:bg-transparent lg:translate-y-0 lg:gap-10 lg:px-56 lg:py-5 lg:justify-center lg:text-white`}
      >
        <li>
          <Link to="/" className="hover:text-white hover:underline" onClick={() => setIsMenuOpen(false)}>
            Home
          </Link>
        </li>
        <li>
          <Link to="/profile" className="hover:text-white hover:underline" onClick={() => setIsMenuOpen(false)}>
            Profile
          </Link>
        </li>
        <li>
          <Link to="/katalog" className="hover:text-white hover:underline" onClick={() => setIsMenuOpen(false)}>
            Katalog
          </Link>
        </li>
        <li>
          <Link to="/contact" className="hover:text-white hover:underline" onClick={() => setIsMenuOpen(false)}>
            Contact
          </Link>
        </li>
        {isAdmin && (
          <li>
            <Link to="/admin" className="hover:text-white hover:underline" onClick={() => setIsMenuOpen(false)}>
              Admin
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
