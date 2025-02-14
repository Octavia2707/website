import React, { useState, useEffect } from "react";
import { db } from "../firebase"; 
import { collection, getDocs } from "firebase/firestore";
import bouquetImage1 from "../asset/FOTO BUNGA UTAMA.png";
import bouquetImage2 from "../asset/FOTO PRODUK 5.png";
import bouquetImage3 from "../asset/FOTO PRODUK 6.png";
import bouquetImage4 from "../asset/FOTO PRODUK 7.png";
import bouquetImage5 from "../asset/FOTO PRODUK 8.png";
import bouquetImage6 from "../asset/FOTO PRODUK 9.png";
import bouquetImage7 from "../asset/FOTO PRODUK 10.png";
import bouquetImage8 from "../asset/FOTO PRODUK 11.png";
import bouquetImage9 from "../asset/FOTO PRODUK 12.png";
import bouquetImage10 from "../asset/FOTO_PRODUK_4-removebg-preview.png";
import bouquetImage13 from "../asset/WhatsApp_Image_2024-12-10_at_14.18.26_d41d672e-removebg-preview.png";
import graduation from "../asset/graduation-removebg-preview.png";
import gift from "../asset/gift-removebg-preview.png";
import instagramLogo from "../asset/Logo_Instagram-removebg-preview.png";

const Profile = () => {
  const [testimonials, setTestimonials] = useState([]);

  // Fetch testimonials data from Firebase Firestore
  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "testimonials"));
        const testimonialsData = querySnapshot.docs.map((doc) => doc.data());
        setTestimonials(testimonialsData);
      } catch (error) {
        console.error("Error fetching testimonials: ", error);
      }
    };

    fetchTestimonials();
  }, []);

  const bouquetCategories = [
    { name: "Love", image: bouquetImage5 },
    { name: "Graduation", image: bouquetImage9 },
    { name: "Gift", image: bouquetImage6 },
  ];

  return (
    <div className="bg-gradient-to-b from-[#F4BF97] to-white min-h-screen text-center flex flex-col relative">
      <div
        className="absolute w-[90%] sm:w-[1100px] h-auto left-1/2 mt-32 transform -translate-x-1/2 rounded-[27px] flex flex-col sm:flex-row items-center justify-between px-6 py-4"
        style={{
          background: "linear-gradient(179.56deg, #CE5A67 0.38%, #F4BF97 146.54%)",
        }}
      >
        <p className="text-center text-white text-2xl font-Judson">
          Bunga cantik nan indah dari pita satin yang premium, halus dan mengkilap, pastinya anti layu dan di buat khusus untuk pilihan hatimu!
        </p> 
        <img
          src={bouquetImage13}
          alt="Bouquet Description"
          className="hidden sm:block w-40 h-auto ml-4"
        />
      </div>

      {/* Header */}
      <div className="mt-16 md:mt-20">
        <div className="text-center mt-[20rem] relative z-10">
          <h1 className="text-4xl font-Judson font-bold underline decoration-[#CE5A67]">
            Our Bouquets
          </h1> 
        </div>

        {/* Images Section */}
        <div className="overflow-hidden mt-8">
          <div className="flex space-x-8 animate-scroll-image">
            {Array(2)
              .fill([
                bouquetImage2, bouquetImage3, bouquetImage4, bouquetImage5,
                bouquetImage6, bouquetImage7, bouquetImage8, bouquetImage9,
                bouquetImage2, bouquetImage3, bouquetImage4,
              ])
              .flat()
              .map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Bouquet ${index + 2}`}
                  className="w-32 h-32 sm:w-44 sm:h-44 rounded-xl shadow-lg"
                />
              ))}
          </div>
        </div>
      </div>

      {/* Testimonials and Instagram Section */}
      <div className="mt-20 flex flex-col sm:flex-row items-left px-6">
        <div className="w-full sm:w-2/3">
          <h2 className="text-4xl font-Judson font-bold underline decoration-[#CE5A67]">
            Testimoni
          </h2>
          <div className="flex overflow-x-auto mt-8 space-x-4">
            {testimonials.length > 0 ? (
              testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="bg-[#F4BF97] rounded-md w-24 h-24 md:w-36 md:h-36 shrink-0"
                >
                  <img
                    src={testimonial.imageUrl}
                    alt={`testimonial ${index + 1}`}
                    className="w-full h-full rounded-md md:rounded-md"
                  />
                </div>
              ))
            ) : (
              <p className="text-gray-500 col-span-3">Belum ada testimoni.</p>
            )}
          </div>
        </div>

        {/* Instagram Button */}
        <div className="flex-1 flex flex-col items-center mt-16">
          <div className="bg-[#CE5A67] text-white p-4 rounded-2xl shadow-md h-64 w-60 flex items-center justify-center">
            <p className="text-center font-Judson italic text-2xl leading-relaxed">
              <span className="block text-[#F4BF97]">Only on</span>
              <span className="block text-[#FCF5ED] font-bold">Semarang</span>
              <span className="block text-[#F4BF97]">Estimated</span>
              <span className="block text-[#FCF5ED] font-bold">Work in 3-5 days</span>
            </p>
          </div>
          <button
            className="mt-4 bg-[#F4BF97] text-black px-4 py-2 rounded-2xl font-Judson font-bold w-60 h-20 flex items-center justify-center underline decoration-black"
            onClick={() =>
              (window.location.href = "https://www.instagram.com/ako.defleur?igsh=aHhqZHFhd3Y1cWFq")
            }
          >
            <img
              src={instagramLogo}
              alt="Instagram Logo"
              className="w-6 h-6 mr-2"
            />
            Instagram
          </button>
        </div>
      </div>

        <div className="flex justify-center items-center relative -translate-y-8 flex-col sm:flex-row mt-16 md:mt-52 gap-12">
          <div className="bg-[#CE5A67] w-64 h-64 rounded-3xl flex flex-col items-center justify-center shadow-lg bg-gradient-to-b from-[#CE5A67] 
          to-[#F4BF97] sm:w-56 sm:h-56 lg:w-72 lg:h-72 hover:scale-105 transition-all duration-300 relative">
            <div className="absolute bottom-0 left-0 right-0 h-16 bg-[#CE5A67] bg-opacity-30 backdrop-blur-sm rounded-b-3xl"></div>
              <img
                src={bouquetImage10}
                alt="Love Bouquet"
                className="w-40 h-40 mt-4 rounded-md object-cover"
              />
              <h3 className="text-4xl font-Judson font-bold text-center text-white absolute bottom-0 left-0 right-0 mb-4">Love</h3>
        </div>

        <div className="bg-[#CE5A67] w-64 h-64 rounded-3xl flex flex-col items-center justify-center shadow-lg relative md:-translate-y-12 bg-gradient-to-b
        from-[#CE5A67] to-[#F4BF97] sm:w-56 sm:h-56 lg:w-72 lg:h-72 hover:scale-105 transition-all duration-300">
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-[#CE5A67] bg-opacity-30 backdrop-blur-sm rounded-b-3xl"></div>
            <img
              src={graduation}
              alt="Graduation Bouquet"
              className="w-40 h-40 rounded-md object-cover"
            />
            <h3 className="text-4xl font-Judson font-bold text-center text-white absolute bottom-0 left-0 right-0 mb-4">Graduation</h3>
        </div>

        <div className="bg-[#CE5A67] w-64 h-64 rounded-3xl flex flex-col items-center justify-center shadow-lg bg-gradient-to-b from-[#CE5A67]
        to-[#F4BF97] sm:w-56 sm:h-56 lg:w-72 lg:h-72 hover:scale-105 transition-all duration-300 relative">
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-[#CE5A67] bg-opacity-30 backdrop-blur-sm rounded-b-3xl"></div>
          <img
            src={gift}
            alt="Gift Bouquet"
            className="w-40 h-40 mt-4 rounded-md object-cover"
          />
          <h3 className="text-4xl font-Judson font-bold text-center text-white absolute bottom-0 left-0 right-0 mb-4">Gift</h3>
        </div>
      </div>
    </div>
  );
};

export default Profile;