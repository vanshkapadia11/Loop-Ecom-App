import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Checkout = () => {
  return (
    <>
      <Navbar />
      <section className="container mt-10 mb-20 uppercase">
        <h2 className="text-3xl font-bold uppercase mb-8 ">Checkout</h2>
        <p className="text-gray-700 font-semibold text-sm">
          This is where payment and shipping info will go.
        </p>

        {/* Add your form/payment integrations here */}
        <div className="mt-10 p-6 border rounded-xl shadow-md">
          <p className="text-lg font-semibold">
            🚧 Coming Soon: Checkout Integration
          </p>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Checkout;
