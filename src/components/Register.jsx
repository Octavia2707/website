import React, { useState } from "react";
import Logo from "../asset/Logo1-removebg-preview.png";
import Logo_Google from "../asset/Logo_Google-removebg-preview.png";
import { useNavigate } from "react-router-dom";
import { GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase";
import { setDoc, doc, getDoc } from "firebase/firestore"; 

function Register({ onLogin = () => {} }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  
// Login menggunakan email dan password
const handleSignIn = async (e) => {
  e.preventDefault();
  if (!email.trim() || !password.trim()) {
    setErrorMessage("Email dan password tidak boleh kosong!");
    return;
  }
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    console.log("Login berhasil:", user.uid);
    onLogin();
    navigate("/hero");
  } catch (error) {
    console.error("Error logging in:", error.code, error.message);
    if (error.code === "auth/wrong-password") {
      setErrorMessage("Password salah. Silakan coba lagi.");
    } else if (error.code === "auth/user-not-found") {
      setErrorMessage("Pengguna tidak ditemukan. Silakan periksa email atau daftar.");
    } else {
      setErrorMessage("Login gagal. Silakan coba lagi.");
    }
  }
};

// Registrasi menggunakan email dan password
const handleSignUp = async (e) => {
  e.preventDefault();
  if (!username.trim()) {
    setErrorMessage("Username harus diisi!");
    return;
  }
  if (!email.trim() || !password.trim()) {
    setErrorMessage("Email dan password tidak boleh kosong!");
    return;
  }
  if (password !== confirmPassword) {
    setErrorMessage("Password dan konfirmasi password tidak cocok!");
    return;
  }
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    const userRef = doc(db, "users", user.uid);
    const role = email === "admin@example.com" ? "admin" : "user";
    await setDoc(userRef, { role, username });

    console.log("Registrasi berhasil:", user.uid);
    onLogin();
    navigate("/hero");
  } catch (error) {
    console.error("Error signing up:", error.code, error.message);
    setErrorMessage("Registrasi gagal. Silakan coba lagi.");
  }
};

// Login menggunakan Google
const handleGoogleSignIn = async () => {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    console.log("Google sign-in successful", result.user);

    const user = result.user;
    const userRef = doc(db, "users", user.uid);

    const docSnap = await getDoc(userRef);
    if (!docSnap.exists()) {
      const role = user.email === "admin@example.com" ? "admin" : "user";
      await setDoc(userRef, { role, username: user.displayName });
    }

    onLogin();
    navigate("/hero");
  } catch (error) {
    console.error("Google sign-in error:", error.code, error.message);
    setErrorMessage("Gagal login dengan Google. Silakan coba lagi.");
  }
};

  return (
    <div
      className="flex items-center justify-center min-h-screen"
      style={{
        background: "linear-gradient(183.08deg, #FCF5ED 46.86%, #F4BF97 97.45%)",
      }}
    >
      <div className="w-full max-w-sm p-3 flex flex-col items-center mt-15"> 
        <div className="relative flex flex-col items-center p-4 gap-4 w-full bg-[rgba(252,245,237,0.48)] border-4 border-[rgba(244,191,151,0.56)] backdrop-blur-sm rounded-xl">
          <div className="flex items-center justify-center w-full mb-2">
            <h2 className="text-xl font-bold text-black font-Judson">
              {isRegistering ? "Create an Account" : "Welcome!!"}
            </h2>
            <img src={Logo} alt="Logo" className="h-12 w-15 ml-6" />
          </div>
          <form
            className="space-y-4 w-full"
            onSubmit={isRegistering ? handleSignUp : handleSignIn}
          >
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              className="w-full px-3 py-2 rounded-xl font-Judson focus:outline-none focus:ring-2 focus:ring-[#CE5A67]"
            />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full px-3 py-2 rounded-xl font-Judson focus:outline-none focus:ring-2 focus:ring-[#CE5A67]"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full px-3 py-2 rounded-xl font-Judson focus:outline-none focus:ring-2 focus:ring-[#CE5A67]"
            />
            {isRegistering && (
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm Password"
                className="w-full px-3 py-2 rounded-xl font-Judson focus:outline-none focus:ring-2 focus:ring-[#CE5A67]"
              />
            )}
            {errorMessage && <p className="text-red-500 text-sm mt-2">{errorMessage}</p>}
            <button
              type="submit"
              className="w-full py-2 bg-[#CE5A67] text-lg text-white font-Judson font-bold rounded-2xl hover:bg-[#F4BF97]"
            >
              {isRegistering ? "Sign Up" : "Login"}
            </button>
          </form>
        </div>
        <div className="w-full max-w-sm mt-3 space-y-4">
          <div className="border-t-4 border-[#CE5A67]" style={{ width: "100%", margin: "0 auto" }}></div>
          <button
            type="button"
            onClick={handleGoogleSignIn}
            className="flex items-center justify-center w-full py-2 bg-[#CE5A67] text-lg text-white font-Judson font-bold rounded-2xl hover:bg-[#F4BF97] gap-3"
          >
            <img src={Logo_Google} alt="Google Logo" className="h-6 w-6" />
            Login With Google
          </button>
          <button
            type="button"
            onClick={() => {
              setErrorMessage("");
              setIsRegistering(!isRegistering);
            }}
            className="w-full py-2 text-lg text-[#CE5A67] font-Judson font-bold hover:underline"
          >
            {isRegistering ? "Already have an account? Login" : "Don't have an account? Sign Up"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Register;