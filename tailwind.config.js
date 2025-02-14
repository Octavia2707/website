/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        Judson: ["Judson", "serif"], // Menambahkan font Judson
      },
      animation: {
        "scroll-image": "scrollImages 20s linear infinite", // Animasi scroll horizontal
        'bounce-slow': 'bounce 5s infinite'
      },
      keyframes: {
        scrollImages: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-100%)" }, // Menggeser gambar ke kiri
        },
      },
    },
  },
  plugins: [],
};
