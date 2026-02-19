import React from "react";
import { Eye, ShoppingCart, Heart } from "lucide-react";
import { Link } from "react-router-dom";

const Cards = ({
  image = [], // array of images
  title,
  price,
  inStock = true,
  onView,
  onAddToCart,
  onWishlist,
  index = 0, 
}) => {
  const backgrounds = [
  "bg-white",
  "bg-gray-50",
  "bg-gradient-to-br from-pink-50 to-purple-50",
  "bg-gradient-to-br from-yellow-50 to-green-50",
];

const labelData = ["Top Pick", "Buy Now", "Trending"];

// pick a random label once per card
const label =
  labelData[Math.floor(Math.random() * labelData.length)];


const bgClass = backgrounds[index % backgrounds.length];


  const truncateText = (text, limit = 25) =>
    text?.length > limit ? text.slice(0, limit) + "..." : text;

  return (
    <div
      className={`group md:w-56 lg:w-72 sm:w-full rounded-2xl border border-gray-200  transition-all hover:shadow-lg mt-6 ${bgClass}`}
    >
    
      <div className="relative overflow-hidden rounded-t-xl h-70">
{/* <button
  type="button"
  onClick={(e) => {
    e.stopPropagation();
    if (onWishlist) onWishlist();
  }}
  className="absolute right-2 top-2 z-20 rounded-full bg-white p-2 shadow hover:bg-gray-100 opacity-40 hover:opacity-100"
>
  <Heart className="h-4 w-4 text-gray-700" />
</button> */}


{/* {label && (
  <span className="absolute left-3 top-3 z-20 rounded-full bg-red-700/70 px-2.5 py-1 text-xs  font-semibold text-white backdrop-blur">
     Buy Now
  </span>
)} */}

{label && (
  <span
    className="
      absolute left-2 top-2 z-20
      bg-red-700/70
      px-2 py-[1px]
      text-[9px] font-medium
      text-white
      rounded-full
      sm:px-2.5! sm:py-1 sm:text-xs sm:rounded-full
    "
  >
    Buy Now
  </span>
)}



        <div className="relative h-full overflow-hidden rounded-t-xl">
          <img
            src={image?.[0]}
            alt={title}
            className="absolute inset-0 h-80 w-full object-cover transition-opacity duration-500 group-hover:opacity-0"
          />

          {image?.[1] ? (
            <img
              src={image[1]}
              alt={title}
              className="absolute inset-0 h-80 w-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            />
          ) : (
            <img
              src={image?.[0]}
              alt={title}
              className="absolute inset-0 h-80 w-full object-cover hover:scale-[1.03]"
            />
          )}
        </div>

        
      </div>

      <div className="md:p-4 p-2">
        <h3 className="line-clamp-2 md:text-md text-sm font-medium text-gray-900 hover:underline font-serif">
          
          {truncateText(title)}
        </h3>

        <div className="md:mt-2 flex items-center gap-2 ">
          <span className="md:text-xl font-semibold text-gray-900">${price}</span>
        </div>

        <p className="mt-1 text-xs text-gray-600 opacity-70">
          FREE delivery <span className="font-semibold">Next Week</span>
        </p>
          {/* #C9A227 */}
        <div className="mt-3 flex gap-2">
  <button
    onClick={onView}
    disabled={!inStock}
    className={`flex flex-1 items-center justify-center gap-1 sm:gap-2 
      rounded-md sm:rounded-lg
      px-2.5 py-1.5 sm:px-4 sm:py-2
      text-xs sm:text-sm font-semibold
      transition
      ${
        inStock
          ? "bg-[#3B2F2F] text-white hover:bg-[#2A1F1F]"
          : "cursor-not-allowed bg-gray-300 text-gray-500"
      }`}
  >
    <Eye className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
    <span className="hidden sm:inline">Quick View</span>
    <span className="sm:hidden">View</span>
  </button>
</div>


        
      </div>
      
    </div>
  );
};

export default Cards;


// Seb@1234


// // Seb@1234