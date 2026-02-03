import React, { useEffect, useState } from "react";
import axios from "axios";

const Wishlist = () => {
  const [wish, setWish] = useState([]);

  useEffect(() => {
    loadWish();
  }, []);

  const loadWish = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/wishlist/fetch`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setWish(res.data.wishlist || res.data);
      console.log(res.data.wishlist || res.data)
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6">
      {wish.map((item, index) => (
        <div key={index} className="border p-3 rounded-lg shadow">
          <img
            src={`${import.meta.env.VITE_API_URL}/uploads/${item.image?.[0]}`}
            alt={item.name}
            className="w-full h-48 object-cover rounded"
          />
          <h1 className="mt-2 font-semibold">{item._id}</h1>
          <p className="text-gray-600">${item.price}</p>
        </div>
      ))}
    </div>
  );
};

export default Wishlist;
