import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import Logo from "../asset/Logo1-removebg-preview.png";
import panahkiri from "../asset/left.png";
import panahkanan from "../asset/right.png";
import backIcon from "../asset/backIcon.png";

const Katalog = () => {
  const [items, setItems] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [greetingName, setGreetingName] = useState("");
  const [showGreetingCard, setShowGreetingCard] = useState(false);
  const [greetingText, setGreetingText] = useState("");

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "items"));
        const itemsData = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setItems(itemsData);
      } catch (error) {
        console.error("Error fetching items: ", error);
      }
    };

    fetchItems();
  }, []);

  const handleOrderNow = () => {
    if (items.length === 0) {
      alert("Item masih dimuat. Mohon tunggu sebentar.");
      return;
    }
  
    const selectedFlower = items[currentIndex];
    const message = `Hai, saya ingin memesan:
      - Nama Pengirim: ${greetingName || "Tidak ada nama"}
      - Nama Paket: ${selectedFlower?.packageName || "Nama paket tidak tersedia"}
      - Deskripsi: ${selectedFlower?.description || "Deskripsi tidak tersedia"}
      - Harga: ${selectedFlower?.price ? `Rp ${selectedFlower.price}` : "Harga tidak tersedia"}
      - Greeting Card: ${greetingText || "Tidak ada pesan khusus"}`;
      window.open(`https://wa.me/6289519324924?text=${encodeURIComponent(message)}`, "_blank");
  };
   
  
  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === items.length - 1 ? 0 : prevIndex + 1));
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? items.length - 1 : prevIndex - 1));
  };

  return (
    <div className="bg-gradient-to-b from-[#F4BF97] to-white min-h-screen flex flex-col items-center py-6 px-4 relative font-[Judson]">
      <img src={Logo} alt="Logo" className="absolute top-20 right-5 w-16 sm:w-20 object-contain" />

      <div className="w-full max-w-6xl flex flex-col sm:flex-row justify-between items-start sm:items-end px-6 sm:px-16 pt-12">
        <div className="text-left sm:absolute sm:top-28 sm:left-16">
          <h2 className="text-3xl font-semibold text-black mb-2">{items[currentIndex]?.packageName || "Loading..."}</h2>
          <p className="text-lg text-[#CE5A67] mb-4">{items[currentIndex]?.description || "Loading description..."}</p>
          <div className="flex flex-col gap-2">
            <div className="px-6 py-2 rounded-full text-lg font-semibold bg-[#F4BF97] text-[#FCF5ED]">Flower</div>
            <div className="px-6 py-2 rounded-full text-lg font-semibold bg-[#FAF3EB] text-[#F4BF97]">Cellophone Paper</div>
            <div className="px-6 py-2 rounded-full text-lg font-semibold bg-[#FCE8DD] text-[#CE5A67]">Ribbon</div>
          </div>
        </div>
        <p className="text-4xl sm:text-6xl font-bold text-black sm:absolute sm:top-28 sm:right-16 sm:pt-16">
        {items[currentIndex]?.price ? `Rp ${items[currentIndex].price}` : "Loading..."}
        </p>
      </div>

      <div className="relative w-full max-w-md flex justify-center">
        <img
          src={items[currentIndex]?.imageUrl || "https://via.placeholder.com/300"}
          alt={items[currentIndex]?.packageName || "Image"}
          className="w-full h-auto max-w-md object-contain"
        />
      </div>

      <div className="absolute bottom-16 flex flex-col items-center gap-4">
        <div className="flex gap-4 items-center">
          <button onClick={handlePrev} className="bg-[#F4BF97] w-12 h-12 sm:w-16 sm:h-16 text-white rounded-l-full flex items-center justify-center shadow-md hover:bg-[#FEDEC6B8]">
            <img src={panahkiri} alt="Previous" className="w-10 h-10" />
          </button>

          <button
            onClick={() => setShowGreetingCard(true)}
            className="bg-[#F4BF97] hover:bg-[#FEDEC6B8] text-white px-6 py-3 sm:px-8 sm:py-4 text-lg border-2 border-[#F4BF97]"
          >
            Purchase Order
          </button>

          <button onClick={handleNext} className="bg-[#F4BF97] text-white w-12 h-12 sm:w-16 sm:h-16 rounded-r-full flex items-center justify-center shadow-md hover:bg-[#FEDEC6B8]">
            <img src={panahkanan} alt="Next" className="w-10 h-10" />
          </button>
        </div>
      </div>

      {showGreetingCard && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 px-4">
          <div className="bg-white p-6 sm:p-8 shadow-lg rounded-lg w-full max-w-md relative"
            style={{
              background: "linear-gradient(to right, #F4BF97 0%, #FFFFFF 40%, #FFFFFF 60%, #F4BF97 100%)"
            }} 
          >
            {/* Tombol Back */}
            <button onClick={() => setShowGreetingCard(false)} className="absolute top-4 left-4">
              <img src={backIcon} alt="Back" className="w-6 h-6 sm:w-8 sm:h-8" />
            </button>

            <h3 className="text-2xl font-semibold text-black mb-4 text-center">Greeting Card</h3>

            {/* Input Name */}
            <input
              type="text"
              className="w-full p-3 border border-gray-300 rounded-md text-lg mb-3"
              placeholder="Name:"
              value={greetingName}
              onChange={(e) => setGreetingName(e.target.value)}
            />

            {/* Textarea Message */}
            <textarea
              className="w-full p-4 border border-gray-300 rounded-md resize-none text-lg"
              rows="5"
              placeholder="Type your message here..."
              value={greetingText}
              onChange={(e) => setGreetingText(e.target.value)}
            ></textarea>
            
            <button
              className="bg-[#CE5A67] hover:bg-[#B84352] text-white py-3 px-6 w-full rounded-lg text-lg mt-4"
              onClick={() => {
                setShowGreetingCard(false);
                handleOrderNow();
              }}
            >
              Order Now
            </button>

          </div>
        </div>
      )}
    </div>
  );
};

export default Katalog;