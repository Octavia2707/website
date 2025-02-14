import React, { useState, useEffect } from "react";
import bouquetImage from "../asset/FOTO BUNGA UTAMA.png"; // Sesuaikan path gambar
import Navbar from "./Navbar"; // Pastikan Navbar di-import
import logoImage from "../asset/Logo1-removebg-preview.png"; // Ganti dengan path logo

const Hero = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // Deteksi layar kecil
    };
    handleResize(); // Jalankan saat pertama kali
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="relative bg-gradient-to-b from-[#F4BF97] to-white h-screen flex flex-col">
      {/* Navbar Section */}
      <div
        className={`absolute top-0 left-0 w-full z-30 transform ${
          isMobile ? "translate-y-0" : "-translate-y-full"
        } transition-transform duration-500 ease-in-out`}
      >
        <Navbar />
      </div>

      {/* Hero Section */}
      <div className="relative w-full h-full flex items-center justify-center">
            {/* Text Section */}
            <div className="absolute top-[90px] left-10 lg:left-[480px] z-20">
              <h1 className="text-4xl lg:text-6xl font-bold font-Judson text-black">
                AKO.DEFLEUR
              </h1>
            </div>
            <div className="absolute top-[122px] left-10 lg:left-[356px] z-20">
              <h1 className="text-5xl lg:text-7xl font-bold font-Judson text-white">
                FLOWER BOUQUET
              </h1>
            </div>

        {/* Single Rectangle Box */}
        <div
          className="absolute w-[300px] h-[350px] lg:w-[398px] lg:h-[428px] left-[50%] lg:left-[455px] top-[150px] lg:top-[135px] bg-gradient-to-b from-transparent to-[#CE5A67] rounded-[55px] z-10 transform -translate-x-1/2 lg:translate-x-0"
        >
          {/* Image inside the box */}
          <img
            src={bouquetImage}
            alt="Flower Bouquet"
            className="w-auto h-auto mx-auto mt-4 pt-10 animate-bounce-slow"
          />
        </div>

        {/* Description Section */}
        {!isMobile && (
          <div
            className="absolute w-[200px] lg:w-[259px] h-[auto] left-[50%] lg:left-[895px] top-[450px] lg:top-[400px] font-Judson italic font-light text-[12px] lg:text-[15px] leading-[18px] text-justify text-black z-20 transform -translate-x-1/2 lg:translate-x-0"
          >
            Imagine a cascading symphony of colors and scents, an elegant bouquet
            composed of vibrant red roses, delicate pink peonies, and cheerful yellow
            daisies, all intertwined with lush greenery. The roses, standing as the
            focal point, symbolize passion and love, while the peonies bring a touch
            of romance and the daisies add a playful charm.
          </div>
        )}

        {/* Logo Section */}
        <div
          className="absolute w-[80px] lg:w-[120px] h-[80px] lg:h-[120px] left-[20px] lg:left-[159px] top-[500px] lg:top-[480px] bg-cover bg-center z-20"
          style={{ backgroundImage: `url(${logoImage})` }}
        ></div>
      </div>
    </div>
  );
};

export default Hero;
