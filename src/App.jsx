import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import { auth } from "./firebase";
import { signOut, onAuthStateChanged } from "firebase/auth";
import Login from "./components/Register";
import Hero from "./components/Hero";
import Contact from "./components/Contact";
import Profile from "./components/Profile";
import Admin from "./components/AdminDashboard";
import Katalog from "./components/Katalog"; // Import komponen Catalog


// Komponen untuk proteksi  berdasarkan login
const ProtectedRoute = ({ isLoggedIn, children }) => {
    return isLoggedIn ? children : <Navigate to="/login" replace />;
};

// Komponen untuk proteksi admin
const AdminRoute = ({ isLoggedIn, userRole, children }) => {
    return isLoggedIn && userRole === "admin" ? children : <Navigate to="/login" replace />;
};

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userRole, setUserRole] = useState(null);

    // Mengecek status login pengguna setiap kali status autentikasi berubah
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                // Jika pengguna terautentikasi, perbarui state dan cek peran mereka
                setIsLoggedIn(true);
                const role = user.email === "adminako83@gmail.com" ? "admin" : "user";
                setUserRole(role);
            } else {
                // Jika pengguna tidak terautentikasi, reset state
                setIsLoggedIn(false);
                setUserRole(null);
            }
        });

        // Membersihkan listener saat komponen di-unmount
        return () => unsubscribe();
    }, []);

    const handleLogout = () => {
        signOut(auth)
            .then(() => {
                setIsLoggedIn(false);
                setUserRole(null);
            })
            .catch((error) => {
                console.error("Error during logout:", error.message);
            });
    };

    return (
        <Router>
            <div>
                {/* Navbar hanya muncul jika sudah login */}
                {isLoggedIn && <Navbar onLogout={handleLogout} userRole={userRole} />}

                <Routes>
                    <Route
                        path="/"
                        element={
                            <ProtectedRoute isLoggedIn={isLoggedIn}>
                                <Hero />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/login"
                        element={<Login />}
                    />
                    <Route
                        path="/admin"
                        element={
                            <AdminRoute isLoggedIn={isLoggedIn} userRole={userRole}>
                                <Admin />
                            </AdminRoute>
                        }
                    />
                    <Route
                        path="/contact"
                        element={
                            <ProtectedRoute isLoggedIn={isLoggedIn}>
                                <Contact />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/profile"
                        element={
                            <ProtectedRoute isLoggedIn={isLoggedIn}>
                                <Profile />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/katalog"
                        element={
                            <ProtectedRoute isLoggedIn={isLoggedIn}>
                                <Katalog />
                            </ProtectedRoute>
                        }
                    />
                    {/* Fallback untuk  yang tidak ditemukan */}
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;