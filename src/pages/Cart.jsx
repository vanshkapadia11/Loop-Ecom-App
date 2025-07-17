import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Cart = () => {
  const { user } = useAuth();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userCost, setUserCost] = useState(0);

  useEffect(() => {
    const fetchCartItems = async () => {
      if (!user) return;

      try {
        const cartRef = collection(db, "users", user.uid, "cart");
        const querySnapshot = await getDocs(cartRef);
        const items = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCartItems(items);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching cart items:", err);
      }
    };

    fetchCartItems();
  }, [user]);

  useEffect(() => {
    const total = cartItems.reduce((acc, item) => acc + Number(item.price), 0);
    setUserCost(total.toFixed(2));
  }, [cartItems]);

  const deleteCartItem = async (cartItemId) => {
    if (!user || !cartItemId) return;

    try {
      const itemRef = doc(db, "users", user.uid, "cart", String(cartItemId));
      await deleteDoc(itemRef);
      setCartItems((prevItems) =>
        prevItems.filter((item) => item.id !== cartItemId)
      );
    } catch (err) {
      console.error("Error deleting cart item:", err);
    }
  };

  return (
    <>
      <Navbar />
      <section className="container mt-10">
        <h2 className="text-2xl font-semibold uppercase mb-8">Your Cart</h2>

        {loading ? (
          <p>Loading...</p>
        ) : cartItems.length === 0 ? (
          <p className="font-semibold text-sm uppercase">No items in cart.</p>
        ) : (
          <>
            {/* TOTAL + CHECKOUT */}
            <div className="flex justify-between items-center p-5 mb-6 rounded-xl shadow-lg bg-white border">
              <div className="text-lg font-semibold uppercase">
                Total: <span className="text-green-600">${userCost}</span>
              </div>
              <Link
                to="/checkout"
                className="text-green-600 shadow-xl ring-1 ring-inset ring-[#e8e8e8] font-semibold text-sm backdrop-blur-sm px-6 py-2 rounded-lg hover:scale-105 transition-all uppercase text-sm"
              >
                Proceed to Checkout
              </Link>
            </div>

            {/* ITEM LIST */}
            <div className="space-y-6">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center p-5 border rounded-xl shadow-md uppercase"
                >
                  <div>
                    <h3 className="font-bold">{item.title}</h3>
                    <p className="text-sm text-gray-600">${item.price}</p>
                  </div>
                  <button
                    onClick={() => deleteCartItem(item.id)}
                    className="text-red-600 font-semibold text-sm uppercase p-3 ring-1 ring-inset ring-[#e8e8e8] rounded-lg shadow-sm backdrop-blur-sm hover:scale-105 transition-all"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </>
        )}
      </section>
      <Footer />
    </>
  );
};

export default Cart;
