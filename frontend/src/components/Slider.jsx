import React, { useState, useEffect } from "react";
import { Galleria } from "primereact/galleria";

const Slider = () => {
  const [images, setImages] = useState([]);

  // your slider images
  const slider = [
    // {
    //   hitemImageSrc: "/image/avenger.avif",
    //   alt: "Avenger",
    // },
    {
      itemImageSrc: "/image/banner4.png",
      alt: "Avenger",
    },
    {
      itemImageSrc: "/image/banner6.jpg",
      alt: "Pants",
    },
  ];

  useEffect(() => {
    setImages(slider);
  }, []);

  const itemTemplate = (item) => {
    return (
      <img
        src={item.itemImageSrc}
        alt={item.alt}
        // className="w-full h-[400px] object-cover rounded-xl"
         className="w-full h-120 object-cover rounded-xl"
      />
    );
  };

  return (
    <div className="flex-auto mt-6">
      <Galleria
        value={images}
        item={itemTemplate}
        showThumbnails={false}
        showIndicators
        autoPlay
        circular
        transitionInterval={3000}
        style={{ maxWidth: "1900px" }}
      />
    </div>
  );
};

export default Slider;
