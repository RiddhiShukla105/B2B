import React, { useEffect, useState, useContext } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { CartContext } from "../../context/CartContext";

const getToken = () => localStorage.getItem("token")?.trim();

const Item = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const initialProduct = location.state || null;

  const [product, setProduct] = useState(initialProduct);
  const [activeImg, setActiveImg] = useState("");
  const [selectedSize, setSelectedSize] = useState(null);
  const [loading, setLoading] = useState(!initialProduct);

  const { addToCart } = useContext(CartContext);


  useEffect(() => {
  const pending = sessionStorage.getItem("pendingCart");
  if (pending) {
    const data = JSON.parse(pending);
    addToCart(data);
    sessionStorage.removeItem("pendingCart");
    navigate("/cart");
  }

  if (product?.image?.length > 0) {
    setActiveImg(product.image[0]);
  }
}, []);


  if (loading) {
    return <p className="text-center mt-20 text-xl">Loading product...</p>;
  }

  const handleAddToCart = async () => {
    if (!selectedSize) {
      toast.info("Select a size first");
      return;
    }

    const token = getToken();
   
    if(!token){
      toast.warn("Please login to add items to cart",{
        position:"top-right",
        autoClose:2000
      });

      setTimeout(()=>{
        navigate("/login")
      })
    }

    if (!token) {
  sessionStorage.setItem(
    "pendingCart",
    JSON.stringify({
      id: product._id,
      name: product.name,
      price: product.price,
      size: selectedSize,
      image: `${import.meta.env.VITE_API_URL}/uploads/${product.image?.[0]}`,
    })
  );

  navigate("/login", { state: { from: location.pathname } });
  return;
}


    await addToCart({
      id: product._id,
      name: product.name,
      price: product.price,
      size: selectedSize,
      image: `${import.meta.env.VITE_API_URL}/uploads/${product.image?.[0]}`,
    });

    toast.success("Added to cart");
    navigate("/cart");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:py-12 py-6 grid grid-cols-1 md:grid-cols-2 gap-12">

      {/* IMAGE SECTION */}
      <div className="flex gap-4">
        <div className="flex flex-col gap-3">
          {product.image?.map((img, i) => (
            <img
              key={i}
              src={`${import.meta.env.VITE_API_URL}/uploads/${img}`}
              onClick={() =>
                setActiveImg(
                  `${import.meta.env.VITE_API_URL}/uploads/${img}`
                )
              }
              className="w-20 h-24 object-cover border cursor-pointer hover:border-black transition"
            />
          ))}
        </div>

        <div className="flex-1 overflow-hidden rounded-xl">
          <img
            src={
                activeImg.startsWith("http")
                  ? activeImg
                  : `${import.meta.env.VITE_API_URL}/uploads/${activeImg}`
              }
            alt={product.name}
            className="w-full md:h-[550px] object-cover hover:scale-105 transition duration-500"
          />

        </div>
      </div>

      {/* DETAILS */}
      <div className="space-y-2 md:space-y-6">
        <h1 className="text-2xl md:text-4xl  font-serif">{product.name}</h1>

        {/* PRICE */}
        <div className="flex items-center gap-4">
          <span className="md:text-3xl text-xl font-semibold">${product.price}</span>
        </div>

        <p className="text-sm text-gray-500 font-serif">Inclusive of all taxes</p>

        {/* SIZE */}
        <div>
          <h3 className="font-serif mb-2">Select Size</h3>
          <div className="flex gap-3">
            {["S", "M", "L"].map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`px-5 py-2 rounded-full font-serif border text-sm transition ${
                  selectedSize === size
                    ? "bg-[#342a2a] text-white border-black"
                    : "border-gray-400 hover:border-black"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* CTA */}
        <button
          disabled={!selectedSize}
          onClick={handleAddToCart}
          className={`w-full md:py-4 py-2 rounded-full font-serif transition ${
            selectedSize
              ? "bg-[#342a2a] text-white hover:opacity-90 hover:bg-[#2A1F1F]"
              : "bg-gray-300 cursor-not-allowed"
          }`}
        >
          Add to Cart
        </button>

        {/* TRUST */}
        <div className="grid grid-cols-3 gap-4 text-center text-sm text-gray-600 pt-6 border-t font-serif">
          <div>🚚 Free Shipping</div>
          <div>🔁 30-Day Returns</div>
          <div>🔒 Secure Checkout</div>
        </div>

        {/* DESCRIPTION */}
        <div className="pt-6 text-gray-700 space-y-2">
          <h3 className="font-serif md:text-xl">Product Description</h3>
          {Array.isArray(product.desc)
            ? product.desc.map((d, i) => <p key={i}>• {d}</p>)
            : <p className="font-serif text-sm md:text-lg">{product.desc}</p>}
        </div>
      </div>
    </div>
  );
};

export default Item;
