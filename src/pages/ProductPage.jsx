import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { collection, getDocs, addDoc, query, where } from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import { doc, setDoc, getDoc } from "firebase/firestore"; // add `setDoc`

const ProductPage = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { id, title, image, description, category, price } = state;
  const { user } = useAuth(); // Get current user

  const addToCart = async () => {
    if (!user) {
      alert("Please log in to add items to cart");
      return;
    }

    try {
      const cartItemRef = doc(db, "users", user.uid, "cart", String(id));
      const existingDoc = await getDoc(cartItemRef);

      if (existingDoc.exists()) {
        toast.error(`${state.title} already added to cart`);
        return;
      }
      toast.success(`${state.title} added to cart`);

      await setDoc(cartItemRef, {
        title: state.title,
        price: state.price,
        description: state.description,
        image: state.image,
        category: state.category,
        createdAt: new Date(),
      });

      // alert("Item added to cart!");
    } catch (err) {
      toast.error("Failed to add item");
      console.error("Error adding to cart:", err);
    }
  };

  return (
    <>
      <Navbar />
      <section className="container mt-20">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center md:mx-20">
          <div className="flex items-center justify-center pb-10 border-b-2 md:border-none border-gray-500">
            <img src={image} alt="" className="w-60" />
          </div>
          <div className="flex flex-col md:w-7/12">
            <h2 className="text-2xl font-semibold heading1 uppercase my-5">
              {title}
            </h2>
            <p className="text-sm font-semibold uppercase line-clamp-2 mb-3">
              {description}
            </p>
            <div className="flex justify-between px-2 mt-4 items-center">
              <p className="font-semibold text-sm uppercase">
                category : {category}
              </p>
              <p className="font-semibold text-xl uppercase">${price}</p>
            </div>
            <button
              className="mt-10 p-3 rounded-lg ring-1 ring-inset ring-[#e8e8e8] w-1/2 shadow-lg backdrop-blur-sm uppercase text-sm font-semibold hover:scale-105 transition-all duration-500"
              onClick={async () => {
                await addToCart(); // Wait for add to cart
                navigate("/Cart"); // Then navigate
              }}
            >
              add to cart
            </button>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default ProductPage;
