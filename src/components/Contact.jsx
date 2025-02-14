import React from "react";
import Background from "../asset/bgcontact.png";
import waicon from "../asset/whatsapp.png";
import instagram from "../asset/Logo_Instagram-removebg-preview.png";
import maps from "../asset/maps-and-flags.png";

function Contact() {
  return (
    <div className="relative h-screen w-full">
      {/* Gambar Background */}
      <div
        className="w-full h-full bg-cover bg-center md:block hidden fixed"
        style={{ backgroundImage: `url(${Background})` }}
      >
        {/* Gradient overlay transparan */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#F4BF97] to-transparent opacity-80"></div>
      </div>
      {/* Background solid untuk mobile */}
      <div className="w-full h-full bg-[#CE5A67] md:hidden absolute inset-0"></div>
      {/* Teks dan Tombol */}
      <div className="w-full md:w-1/2 flex flex-col items-center text-center inset-0 md:left-[68%] left-1/2 transform -translate-x-1/2 justify-center px-4 md:px-0 fixed">
        <h1 className="text-white font-judson text-3xl md:text-4xl font-bold mb-8">CONTACT US</h1>

        {/* Tombol WhatsApp */}
        <a
          href="https://wa.me/6289519324924?text=Halo%20saya%20ingin%20bertanya%20tentang%20produk%20Anda"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center w-[200px] md:w-[250px] bg-[#F4BF97] text-black py-2 md:py-3 px-4 md:px-6 mb-3 md:mb-4 rounded-2xl text-base md:text-xl font-bold hover:bg-[#f2b2b4] transition font-judson"
        >
          <img src={waicon} alt="WhatsApp" className="w-5 md:w-7 h-5 md:h-7 mr-2" />
          <span className="underline decoration-black">WhatsApp</span>
        </a>

        {/* Tombol Instagram */}
        <a
          href="https://www.instagram.com/ako.defleur?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center w-[200px] md:w-[250px] bg-[#F4BF97] text-black py-2 md:py-3 px-4 md:px-6 mb-3 md:mb-4 rounded-2xl text-base md:text-xl font-bold hover:bg-[#f2b2b4] transition font-judson"
        >
          <img src={instagram} alt="Instagram" className="w-5 md:w-7 h-5 md:h-7 mr-2" />
          <span className="underline decoration-black">Instagram</span>
        </a>

        {/* Pemisah */}
        <h3 className="text-white text-lg md:text-2xl font-bold mt-5 md:mt-6 mb-2 font-judson text-center">Rating Us On</h3>

        {/* Tombol Maps */}
        <a
          href="https://maps.app.goo.gl/DVkWUgkF3cHkLJ7JA"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center w-[200px] md:w-[250px] bg-[#F4BF97] text-black py-2 md:py-3 px-4 md:px-6 rounded-2xl text-base md:text-xl font-bold hover:bg-[#f2b2b4] transition font-judson"
        >
          <img src={maps} alt="Google Maps" className="w-5 md:w-7 h-5 md:h-7 mr-2" />
          <span className="underline decoration-black">Maps</span>
        </a>
      </div>
    </div>
  );
}

export default Contact;
