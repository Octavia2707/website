import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase"; 
import { onAuthStateChanged } from "firebase/auth";
import { Navigate } from "react-router-dom";
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore"; 

const Admin = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [testimonials, setTestimonials] = useState([]);
  const [imageUrl, setImageUrl] = useState("");
  const [itemImageUrl, setItemImageUrl] = useState("");
  const [packageName, setPackageName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [items, setItems] = useState([]);
  const adminEmails = ["adminako83@gmail.com"];

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        if (adminEmails.includes(user.email)) {
          setIsAdmin(true);
        }
      }
      setLoading(false);
    });

    const fetchTestimonials = async () => {
      const querySnapshot = await getDocs(collection(db, "testimonials"));
      const testimonialsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTestimonials(testimonialsData);
    };

    const fetchItems = async () => {
      const querySnapshot = await getDocs(collection(db, "items"));
      const itemsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setItems(itemsData);
    };

    fetchTestimonials();
    fetchItems();

    return () => unsubscribe();
  }, []);

  const handleAddTestimonial = async () => {
    if (imageUrl) {
      try {
        await addDoc(collection(db, "testimonials"), { imageUrl });
        setImageUrl("");
        alert("Testimoni berhasil ditambahkan!");
        const querySnapshot = await getDocs(collection(db, "testimonials"));
        const testimonialsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTestimonials(testimonialsData);
      } catch (error) {
        console.error("Gagal menambahkan testimoni:", error);
      }
    } else {
      alert("Harap pilih gambar terlebih dahulu.");
    }
  };

  const handleDeleteTestimonial = async (id) => {
    try {
      await deleteDoc(doc(db, "testimonials", id));
      setTestimonials(testimonials.filter((testimonial) => testimonial.id !== id));
      alert("Testimoni berhasil dihapus!");
    } catch (error) {
      console.error("Gagal menghapus testimoni:", error);
    }
  };

  const handleAddItem = async () => {
    if (packageName && description && price && itemImageUrl) {
      try {
        const newItem = {
          packageName,
          description,
          price,
          imageUrl: itemImageUrl,
        };
        await addDoc(collection(db, "items"), newItem);
        setPackageName("");
        setDescription("");
        setPrice("");
        setItemImageUrl("");
        alert("Item berhasil ditambahkan!");
        const querySnapshot = await getDocs(collection(db, "items"));
        const itemsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setItems(itemsData);
      } catch (error) {
        console.error("Gagal menambahkan item:", error);
      }
    } else {
      alert("Semua kolom harus diisi.");
    }
  };

  const handleDeleteItem = async (id) => {
    try {
      await deleteDoc(doc(db, "items", id));
      setItems(items.filter((item) => item.id !== id));
      alert("Item berhasil dihapus!");
    } catch (error) {
      console.error("Gagal menghapus item:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isAdmin) {
    return (
      <div>
        <h1 className="text-center text-2xl mt-6">Testimonial List</h1>
        <div className="grid grid-cols-3 gap-4">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow-md">
              <img
                src={testimonial.imageUrl}
                alt={`Testimonial ${index + 1}`}
                className="w-full h-48 object-cover rounded-lg"
              />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#FCF5ED] min-h-screen flex flex-col items-center p-8 relative">
      {/* Add Testimonial Section */}
      <div className="mt-12 w-full flex flex-col items-start">
        <h2 className="text-xl font-bold font-Judson text-black mb-4">Add Testimoni</h2>
        <div className="flex items-center space-x-4">
          <input
            type="file"
            accept="image/*"
            className="border-2 border-[#BBBBBB] rounded-lg px-4 py-2 mb-4 w-64"
            onChange={(e) => {
              const file = e.target.files[0];
              if (file) {
                const reader = new FileReader();
                reader.onloadend = () => setImageUrl(reader.result);
                reader.readAsDataURL(file);
              }
            }}
          />
          <button
            className="bg-[#CE5A67] font-Judson text-white px-4 py-2 rounded-lg"
            onClick={handleAddTestimonial}
          >
            Add Testimonial
          </button>
        </div>

        <div className="mt-12">
          <h2 className="text-xl font-bold font-Judson text-black mb-4">Testimonial List</h2>
          <div className="grid grid-cols-3 gap-4">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="bg-white p-4 rounded-lg shadow-md">
                <img
                  src={testimonial.imageUrl}
                  alt="Testimonial"
                  className="w-full h-48 object-cover rounded-lg"
                />
                <button
                  className="mt-2 bg-red-500 text-white px-4 py-1 rounded-lg"
                  onClick={() => handleDeleteTestimonial(testimonial.id)}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Add Item Section */}
      <div className="mt-12 w-full flex flex-col items-start">
        <h2 className="text-xl font-bold font-Judson text-black mb-4">Add Item</h2>
        <input
          type="text"
          placeholder="Package Name"
          value={packageName}
          onChange={(e) => setPackageName(e.target.value)}
          className="border-2 border-[#BBBBBB] rounded-lg px-4 py-2 mb-4 w-full"
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border-2 border-[#BBBBBB] rounded-lg px-4 py-2 mb-4 w-full"
        />
        <input
          type="text"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="border-2 border-[#BBBBBB] rounded-lg px-4 py-2 mb-4 w-full"
        />
        <input
          type="file"
          accept="image/*"
          className="border-2 border-[#BBBBBB] rounded-lg px-4 py-2 mb-4 w-full"
          onChange={(e) => {
            const file = e.target.files[0];
            if (file) {
              const reader = new FileReader();
              reader.onloadend = () => setItemImageUrl(reader.result);
              reader.readAsDataURL(file);
            }
          }}
        />
        <button
          className="bg-[#CE5A67] font-Judson text-white px-4 py-2 rounded-lg w-full"
          onClick={handleAddItem}
        >
          Add Item
        </button>

        <div className="mt-12">
          <h2 className="text-xl font-bold font-Judson text-black mb-4">Item List</h2>
          <div className="grid grid-cols-3 gap-4">
            {items.map((item) => (
              <div key={item.id} className="bg-white p-4 rounded-lg shadow-md">
                <img
                  src={item.imageUrl}
                  alt="Item"
                  className="w-full h-48 object-cover rounded-lg"
                />
                <h3 className="text-lg font-semibold mt-2">{item.packageName}</h3>
                <p className="text-sm text-gray-600">{item.description}</p>
                <p className="text-sm font-bold mt-2">{item.price}</p>
                <button
                  className="mt-2 bg-red-500 text-white px-4 py-1 rounded-lg"
                  onClick={() => handleDeleteItem(item.id)}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;