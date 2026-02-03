import React, { useState, useContext } from "react";
import axios from "axios";
import { CartContext } from "../../context/CartContext";
import { PayPalButtons } from "@paypal/react-paypal-js";


const Order = () => {
  const { cartItems } = useContext(CartContext);

  const [userdetail, setUserdetail] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    state: "",
    country: "",
    zipcode: "",
    phone: "",
  });

  const [isAddressSubmitted, setIsAddressSubmitted] = useState(false);
  const [paymentReady, setPaymentReady] = useState(false);
  const [orderId, setOrderId] = useState(null);

  const calculatedTotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  const handleInput = (e) => {
    const { name, value } = e.target;
    setUserdetail((prev) => ({ ...prev, [name]: value }));
  };

  /*STEP 1: SAVE ADDRESS API*/
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !userdetail.name ||
      !userdetail.email ||
      !userdetail.phone ||
      !userdetail.address
    ) {
      alert("Please fill all required fields");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/order/create`,
        {
          products: cartItems.map((item) => ({
            productId: item.id,
            name: item.name,
            price: item.price,
            qty: item.qty,
            size: item.size,
            image: item.image,
          })),
          ...userdetail,
          totalAmount: calculatedTotal,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setOrderId(res.data.orderId);
      localStorage.setItem("orderId", res.data.orderId);
      setIsAddressSubmitted(true);
      setPaymentReady(true);

    } catch (err) {
      console.error(err);
      alert("Failed to save address");
    }
  };

  /* RESET + DELETE PENDING*/
  const resetForm = async () => {
    try {
      if (orderId) {
        await axios.delete(
          `${import.meta.env.VITE_API_URL}/api/order/${orderId}`
        );
      }
    } catch (err) {
      console.error("Cleanup failed", err);
    }

    setOrderId(null);
    setIsAddressSubmitted(false);
    setPaymentReady(false);
    setUserdetail({
      name: "",
      email: "",
      address: "",
      city: "",
      state: "",
      country: "",
      zipcode: "",
      phone: "",
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 py-20 px-4 flex justify-center">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-xl p-8">

        <h2 className="text-2xl font-bold text-center mb-8">
          Delivery Details
        </h2>

        {/* ADDRESS FORM */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {[
            { label: "Full Name", name: "name" },
            { label: "Email", name: "email", type: "email" },
            { label: "Address", name: "address" },
            { label: "City", name: "city" },
            { label: "State", name: "state" },
            { label: "Country", name: "country" },
            { label: "Zip Code", name: "zipcode" },
            { label: "Phone", name: "phone" },
          ].map((field) => (
            <div key={field.name}>
              <label className="block text-sm font-medium mb-1">
                {field.label}
              </label>
              <input
                type={field.type || "text"}
                name={field.name}
                value={userdetail[field.name]}
                onChange={handleInput}
                disabled={isAddressSubmitted}
                className="w-full border rounded-lg px-4 py-3 disabled:bg-gray-100"
              />
            </div>
          ))}

          {!isAddressSubmitted && (
            <button
              type="submit"
              className="w-full bg-black text-white py-3 rounded-xl"
            >
              Save Address
            </button>
          )}
        </form>

        {/* PAYPAL PAYMENT */}
        {paymentReady && (
          <div className="mt-8">
            <PayPalButtons
    createOrder={async () => {
    const token = localStorage.getItem("token");

    const res = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/order/paypal/create-order`,
      {
        amount: calculatedTotal,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    return res.data.paypalOrderId; // PAYPAL ORDER ID ONLY
  }}

  onApprove={async (data) => {
    try {
      const token = localStorage.getItem("token");

      // 1️⃣ VERIFY PAYPAL PAYMENT
      const verifyRes = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/order/paypal/verify`,
        { paypalOrderId: data.orderID },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // 2️⃣ CONFIRM DB ORDER
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/order/confirm`,
        {
          orderId: localStorage.getItem("orderId"),
          paypalOrderId: data.orderID,
          paypalTransactionId: verifyRes.data.transactionId,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      toast.info("Payment successful! Order confirmed.");
    } catch (err) {
      console.error(err);
      alert("Payment failed.");
    }
  }}

  onCancel={resetForm}
/>

          </div>
        )}
      </div>
    </div>
  );
};

export default Order;
