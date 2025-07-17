import React from "react";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
import { useState } from "react";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Dashboard = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState(null);
  const { user } = useAuth(); // Get current user
  const [isDark, setIsDark] = useState(() => {
    return localStorage.theme === "dark";
  });
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);
  useEffect(() => {
    const fetchProducts = async () => {
      fetch("https://fakestoreapi.com/products")
        .then((response) => response.json())
        .then((data) => {
          setProducts(data);
        });
    };
    fetchProducts();
  }, []);
  return (
    <div>
      <Navbar />
      <section className="container mb-10">
        <div className="flex justify-center flex-col items-center gap-10 md:grid md:grid-cols-3 mt-20 w-full">
          {products &&
            products.map((item, id) => (
              <div
                className="flex flex-col w-full items-center p-5 rounded-xl shadow-xl backdrop-blur-sm hover:scale-105 transition-all duration-500 ring-1 ring-inset ring-[#e8e8e8] cursor-pointer"
                key={id}
                onClick={() =>
                  navigate(`/ProductPage/${item.id}`, { state: item })
                }
              >
                <div className="">
                  <img src={item.image} alt="" width={150} />
                </div>
                <div className="flex flex-col space-y-9">
                  <div className="">
                    <h2 className="mt-10 text-2xl font-semibold uppercase heading1">
                      {item.title}
                    </h2>
                    <p className="line-clamp-2 pb-10 font-semibold text-sm uppercase heading">
                      {item.description}
                    </p>
                  </div>
                  <div className="flex justify-between mt-10">
                    <p className="font-semibold text-sm uppercase heading text-zinc-600">
                      Category : {item.category}
                    </p>
                    <p className="text-xl font-semibold">${item.price}</p>
                  </div>
                  {/* <p>{item.rating.rate}</p>
                  <p>{item.rating.count}</p> */}
                </div>
              </div>
            ))}
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Dashboard;
