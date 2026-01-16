import React from "react";
import { Card } from "primereact/card";

const Cards = ({ image, title, subtitle, onView, onAddToCart }) => {
  const header = (
    <div className="relative group overflow-hidden rounded-xl">
      {/* Product Image */}
      <img
        alt={title}
        src={image}
        className="h-80 w-full object-cover transition-transform duration-500 group-hover:scale-110"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Action Icons */}
      <div className="absolute top-3 right-3 flex flex-col gap-3 opacity-0 translate-x-6 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
        <button
          onClick={onAddToCart}
          className="bg-white/90 backdrop-blur-md p-2 rounded-full shadow hover:bg-black hover:text-white transition"
        >
          <i className="pi pi-cart-plus text-lg" />
        </button>

        <button
          onClick={onView}
          className="bg-white/90 backdrop-blur-md p-2 rounded-full shadow hover:bg-black hover:text-white transition"
        >
          <i className="pi pi-eye text-lg" />
        </button>
      </div>
    </div>
  );

  return (
    <div className="transition-all duration-300 hover:-translate-y-1">
      <Card
        header={header}
        className="md:w-72 rounded-2xl border border-gray-100 shadow-md hover:shadow-2xl transition-all duration-300"
      >
        {/* Content */}
        <div className="mt-[-18px]!">
          <h3 className="text-lg font-semibold text-gray-900 line-clamp-1 ">
            {title}
          </h3>

          {/* Price */}
          <p className="text-xl font-bold text-gray-900 mt-2 mb-[-18px]!">
            ${subtitle}
          </p>
        </div>
      </Card>
    </div>
  );
};

export default Cards;
