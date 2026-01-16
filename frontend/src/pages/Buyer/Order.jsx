import React, { useState,useContext } from 'react'
import axios from 'axios'
import { CartContext } from "../../context/CartContext"


const Order = () => {

  const [userdetail, setUserdetail] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    state: "",
    country: "",
    zipcode: "",
    phone: ""
  })

  const { cartItems, totalPrice } = useContext(CartContext);


   const method = "cod";

  const calculatedTotal = cartItems.reduce(
  (sum, item) => sum + item.price * item.qty,
  0
);

  const orderData = {
  products: cartItems.map((item) => ({
    productId: item.id,
    name: item.name,
    price: item.price,
    qty: item.qty,
    size: item.size,
    image: Array.isArray(item.image) ? item.image : [item.image],
  })),
  ...userdetail,
  paymentMethod: method,
  totalAmount: calculatedTotal,
};


 

  const handleInput = (e) => {
  const { name, value } = e.target;
  setUserdetail((prev) => ({
    ...prev,
    [name]: value,
  }));
};


  const handleSubmit = async (e) => {
    try {
      e.preventDefault()

      const token=localStorage.getItem("token");
      if(!token){
        alert("Login Please")
        return;
      }
      console.log("OrderData: ",orderData)
      const res=await axios.post(`${import.meta.env.VITE_API_URL}/api/order/create-order`, orderData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
      console.log(res)
      
      // e.target.reset()
      // cartItems([])
      
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="min-h-screen bg-white flex justify-center items-start py-10 px-4">

      {/* Card */}
      <div className="w-full max-w-3xl bg-zinc-900 text-white rounded-2xl shadow-2xl p-8">

        <h2 className="text-center text-3xl font-bold mb-8 underline">
          Please Provide Your Address
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Name */}
          <div>
            <label className="block text-lg mb-1">Name</label>
            <input
              type="text"
              name="name"
              onChange={handleInput}
              className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-white/40"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-lg mb-1">Email</label>
            <input
              type="text"
              name="email"
              onChange={handleInput}
              className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-white/40"
            />
          </div>

          {/* Address */}
          <div>
            <label className="block text-lg mb-1">Address</label>
            <input
              type="text"
              name="address"
              onChange={handleInput}
              className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-white/40"
            />
          </div>

          {/* City & State */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-lg mb-1">City</label>
              <input
                type="text"
                name="city"
                onChange={handleInput}
                className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-white/40"
              />
            </div>

            <div>
              <label className="block text-lg mb-1">State</label>
              <input
                type="text"
                name="state"
                onChange={handleInput}
                className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-white/40"
              />
            </div>
          </div>

          {/* Country & Zip */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-lg mb-1">Country</label>
              <input
                type="text"
                name="country"
                onChange={handleInput}
                className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-white/40"
              />
            </div>

            <div>
              <label className="block text-lg mb-1">Zipcode</label>
              <input
                type="text"
                name="zipcode"
                onChange={handleInput}
                className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-white/40"
              />
            </div>
          </div>

          {/* Phone */}
          <div>
            <label className="block text-lg mb-1">Phone</label>
            <input
              type="text"
              name="phone"
              onChange={handleInput}
              className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-white/40"
            />
          </div>

          {/* Submit */}
          <div className="text-center pt-6">
            <button
              type="submit"
              className="bg-white text-black font-bold px-10 py-3 rounded-2xl hover:bg-white/80 transition"
            >
              Submit
            </button>
          </div>
        </form>

        {/* Payment */}
        <div className="text-center mt-8">
          <button
            className="bg-blue-500 text-white font-bold px-10 py-3 rounded-2xl hover:bg-blue-600 transition"
          >
            Confirm and Pay
          </button>
        </div>

      </div>
    </div>
  )
}

export default Order

