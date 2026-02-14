import React, { useState,useEffect,useRef } from "react";
import { Accordion, AccordionTab } from "primereact/accordion";
import Slider from "./Slider";
import Cards from "./Cards";
import Card2 from "./Card2";
import { Timeline } from 'primereact/timeline';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
 import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ScrollReveal from "./ScrollReveal";
import Crousel from "./Crousel";
import SplitText from "./Splittext";
import WheelRotateImage from "./WheelRotateImage";
import GridReveal from "./GridReveal";




const Dashboard = () => {

 const [active, setActive] = useState(null);
 const[products,setProducts]=useState([])
 const[shirts,setShirts]=useState([])
 const[allproduct,setAllproduct]=useState([])
    const navigate=useNavigate()
    const imageRefs=useRef([])
    const category="t-shirt"

useEffect(()=>{fetchData()},[])

// const handleWishlist = async (item) => {
//   try {
//     const token = localStorage.getItem("token");

//     if (!token) {
//       navigate("/login");
//       return;
//     }

//     const res = await axios.post(
//       `${import.meta.env.VITE_API_URL}/api/wishlist/add`,
//       {
//         productId: item._id
//       },
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       }
//     );

//     console.log("Added to wishlist:", res.data);
//   } catch (error) {
//     console.error(
//       "Wishlist error:",
//       error.response?.data || error.message
//     );
//   }
// };
const handleWishlist = async (product) => {
  if (!product?._id) return;

  try {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    await axios.post(
      `${import.meta.env.VITE_API_URL}/api/wishlist/add`,
      {
        productId: product._id,
        name: product.name,
        image: product.image,
        price: product.price,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    console.error(
      "Wishlist error:",
      error.response?.data || error.message
    );
  }
};



const fetchData = async () => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/product/load-product`
    );

    // filter t-shirts if backend returns all products
    const tshirts = response.data.product.filter(
      (item) => item.category === "t-shirt"
    );
    setProducts(tshirts.slice(0, 4));
    const shirt=response.data.product.filter(
      (item) => item.category === "shirt"
    )
    console.log("Shirts from API:", shirt);
      // show only 4
    setShirts(shirt.slice(0, 4));
    setAllproduct(response.data.product)
  } catch (error) {
    console.error(error);
  }
};


const data = [
  {
    title: "Return Policy",
    content: "Replacement of the same order will be provided within 5 days."
  },
  {
    title: "Shipping Policy",
    content: "Orders will be delivered within 5 business days."
  },
  {
    title: "About Us",
    content: `Born from a deep understanding of style, quality, and evolving market needs, our brand focuses on delivering well-crafted, trend-forward apparel designed for today’s man.

From timeless essentials to contemporary fashion pieces, every product is created with attention to detail, fit, and fabric excellence.

As a B2B-focused e-commerce brand, we partner globally, offering reliable sourcing, consistent quality, and seamless delivery.

Our goal is to build a strong, globally recognized men’s fashion brand that businesses trust.`
  },
  {
    title: "Minimum Buy for Wholesale",
    content: "A minimum purchase of 10 shirts is required for wholesale orders."
  }
];

  const reviewData = [
    {
      star: "★ ★ ★ ★ ★",
      review:
        "Amazing quality! The fabric feels premium and the fit is perfect. Definitely buying again.",
      letter: "R",
      name: "Romeo",
    },
    {
      star: "★ ★ ★ ★ ",
      review:
        "Super fast delivery and great prices. My go-to place for fashion shopping.",
      letter: "M",
      name: "Mandy",
    },
    {
      star: "★ ★ ★ ★ ★",
      review:
        "Loved the designs and fitting. Feels like a premium brand at a great price!",
      letter: "C",
      name: "Conard",
    },
  ];

  const [userReview, setUserReview] = useState([]);

  
        const events = [
        { status: '500+', icon: 'pi pi-shopping-cart', color: '#9C27B0', image: 'game-controller.jpg',p:"Trending Styles Hand-picked, high-demand designs updated weekly to keep your inventory fresh." },
        { status: 'Direct-to-Factory', icon: 'pi pi-cog', color: '#673AB7',p:"Zero Middlemen As the manufacturer, we offer you the best price-to-quality ratio without any extra commissions." },
        { status: '4-Point', icon: 'pi pi-shopping-cart', color: '#FF9800',p:"Quality Check Every bulk order undergoes a rigorous multi-stage inspection to ensure retail-ready excellence." },
        { status: 'Global Ready', icon: 'pi pi-check', color: '#607D8B',p:"Seamless Shipping Efficient logistics and customs-cleared shipping to help you scale your brand anywhere." }
    ];

    const customizedMarker = (item) => {
        return (
            <span className="flex w-2rem h-2rem align-items-center justify-content-center text-white border-circle z-1 shadow-1" style={{ backgroundColor: item.color }}>
                <i className={`${item.icon} text-2xl! p-4 rounded-full! bg-white! hover:text-blue-800!`}></i>
            </span>
        );
    };

    const customizedContent = (item) => {
        return (
            <Card title={item.status} className="text-red-400! hover:shadow-2xl!">
                
                <p className="text-black!">{item.p}</p>
            </Card>
        );
    };

    const handleClick=(item)=>{
      navigate(`/tshirt/${item._id}`,{state:item})
    }


  return (
    <div className="bg-gray-50">
      
      {/* <div className="relative">
   <img
    src="/image/poster2.png"
    alt=""
    className="w-full h-[60vh] md:h-160 object-cover rounded-xl"
  /> 

  
  <div
    className="absolute inset-0 rounded-xl
      bg-gradient-to-br 
      from-black/90 
      via-black/50 
      to-transparent"
  ></div>


  <div className="absolute inset-4 z-10 flex items-center">
  <div className="ml-12 max-w-4xl text-white space-y-4">
    <h1 className="text-3xl md:text-5xl font-bold font-sans">
      <span className="text-6xl">S</span>ource Men’s Fashion with Confidence
    </h1>

    <i><h2 className="text-lg md:text-2xl  font-bold font-medium font-sans text-gray-200">
      <span className="text-3xl">V</span>erified wholesale supply, flexible MOQ, and global shipping.
    </h2></i>
  </div>

<button className="absolute bg-black text-white px-40 py-3 text-2xl font-bold font-sans rounded-4xl
  md:mt-80 md:ml-30 md:left-auto md:translate-x-0
  hover:bg-black/90 hover:text-red-400 hover:text-3xl
  duration-300
  ring-0 hover:ring-2 hover:ring-red-400 hover:ring-offset-2 hover:ring-offset-black
  transition-all">
  Shop Now
</button> 
</div>
</div>  */}

<section className="relative bg-[#252626] text-white/90 overflow-hidden">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
    
    {/* Text Content */}
    <div className="text-center md:text-left">
    
      <span className="inline-block mb-4 text-xs sm:text-sm tracking-widest text-yellow-400">
        {/* NEW COLLECTION */}
         <SplitText
        text="NEW COLLECTION"
        type="letters"
        stagger={0.07}
      />
      </span>
      

      <h1 className="text-3xl sm:text-4xl md:text-6xl font-serif leading-tight ">
        {/* Everyday Shirts, */}
         <SplitText
        text="Everyday  Shirts ,|Elevated  Style"
        type="letters"
        className="word-spacing-[2rem]"
        stagger={0.08}
      />
    
      </h1>

      <p className="mt-6 text-base sm:text-lg text-gray-300 max-w-md mx-auto md:mx-0">
        <SplitText
        text="Crafted fabrics. Tailored comfort.| Designed for modern living."
        type="words"
        stagger={0.04}
      />
      </p>

      <div className="mt-10 flex justify-center md:justify-start ">
        <button className="bg-yellow-400 text-black px-10 sm:px-14 py-3 rounded-full font-semibold  hover:bg-transparent hover:text-yellow-400 hover:text-xl hover:outline-2 hover:outline-yellow-400 hover:px-44 transition hover:transition-all hover:duration-75 ">
          Shop Now
        </button>
      </div>
      
    </div>

    
      <div className="relative group flex justify-center">
  {/* Base image – defines space */}
  <WheelRotateImage
    src="/image/brown_plain4.jpg"
    alt="Premium Shirts"
    className="
      w-64 sm:w-80 md:w-full
      max-w-md
      drop-shadow-2xl
      rounded-full
      border-4 sm:border-6 border-white
      transform
      md:rotate-x-6 md:rotate-y--6
      transition duration-300
      
    "
  />

  



  {/* Glow */}
  <div className="absolute -z-10 inset-0 bg-yellow-400/20 blur-3xl rounded-full" />
</div>





  </div>
</section>


{/* <section className="bg-[#F7F7F5] text-gray-900">
      <div className="max-w-7xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-16 items-center">

       
        <div className="space-y-6">
          <span className="text-xs tracking-widest text-gray-500 uppercase">
            Thoughtfully Made
          </span>

          <h1 className="text-4xl md:text-5xl font-serif leading-tight">
            Elevated Essentials<br />for Everyday Wear
          </h1>

          <p className="text-gray-600 max-w-md">
            Clean silhouettes, breathable fabrics, and timeless construction —
            designed to move effortlessly with you.
          </p>

          <button className="inline-flex items-center gap-2 text-sm font-medium text-gray-900 border-b border-gray-300 hover:border-gray-900 transition">
            View Collection →
          </button>
        </div>

   
        <div className="relative">
          <img
            src="/image/gb.png"
            alt="Everyday Shirt"
            className="w-full max-w-md mx-auto"
          />

          
          <div className="absolute inset-0 -z-10 bg-gray-200/60 blur-3xl rounded-full"></div>
        </div>

      </div>
    </section> */}

{/* <section>
  <div className="bg-[#8a6e4e] relative py-20 px-6">

    <div className="relative z-10">
      <Card2 />
    </div>

    <div
      className="absolute inset-0 rounded-xl
                 bg-gradient-to-br 
                 from-black/90 
                 via-black/50 
                 to-transparent
                 pointer-events-none"
    ></div>

  </div>
</section> */}

<section>
  <div className="bg-white grid grid-cols-1 md:grid-cols-[2fr_3fr] py-10">
    
    {/* TEXT SECTION */}
    <div className="py-8 md:py-12 px-4 md:px-12 tracking-widest text-center">
      <h2 className="text-2xl md:text-4xl font-bold leading-relaxed">
        <span className="text-3xl md:text-5xl text-red-400">C</span>urated{" "}
        <span className="text-3xl md:text-5xl text-red-400">M</span>en's{" "}
        <span className="text-3xl md:text-5xl text-red-400">F</span>ashion
        <br className="hidden md:block" />
        <br className="hidden md:block" />
        <span className="text-3xl md:text-5xl text-red-400">S</span>traight{" "}
        <span className="text-3xl md:text-5xl text-red-400">F</span>rom{" "}
        <span className="text-3xl md:text-5xl text-red-400">F</span>actory
        <br className="hidden md:block" />
        <br className="hidden md:block" />
        <span className="text-3xl md:text-5xl text-red-400">F</span>loor
      </h2>

      <h3 className="mt-6 md:mt-16 text-base md:text-xl font-black text-red-900 italic tracking-wide">
        Skip the middlemen and source directly from our specialized production lines.
      </h3>
    </div>

    {/* TIMELINE SECTION */}
    <div className="px-4 md:px-0 ">
      <ScrollReveal>
        <div className="card">
          <Timeline
            value={events}
            align="alternate"
            className="customized-timeline"
            marker={customizedMarker}
            content={customizedContent}
          />
        </div>
      </ScrollReveal>
    </div>

  </div>
</section>



     <section className="bg-[#f7f6f3] pb-12 relative overflow-hidden px-4 sm:px-6 lg:px-8">
  {/* Heading */}
  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-serif text-center pt-10">
    {/* Our Trending T-shirts */}
    <SplitText
        text="Our Trending T-shirts"
        type="words"
        stagger={0.04}
      />
  </h1>

  {/* Divider */}
  <div className="mt-3 flex justify-center mb-6">
    <span className="h-1 w-16 sm:w-20 lg:w-24 rounded-full bg-red-700"></span>
  </div>

  <GridReveal>
    {/* Grid */}
    <div
      className="
        grid
        grid-cols-2
        sm:grid-cols-2
        md:grid-cols-3
        lg:grid-cols-4
        gap-4
        sm:gap-6
        lg:gap-8
        max-w-7xl
        mx-auto
      "
    >
      {Array.isArray(products) &&
        products.map((item, id) => (
          <div onClick={() => handleClick(item)}>
          <Cards
            key={id}
            image={item.image.map(
              (img) => `${import.meta.env.VITE_API_URL}/uploads/${img}`
            )}
            title={item.name}
            price={item.price}
            onAddToCart={() => handleAdd(item)}
            onView={() => handleClick(item)}
            onWishlist={() => handleWishlist(item)}
          />
          </div>
        ))}
    </div>
  </GridReveal>
</section>




<section className="bg-[#d7d4cd] pb-12 px-4 sm:px-6 lg:px-8">
  {/* Heading */}
  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-serif text-center pt-10">
    
    <SplitText
        text="Our Trending Shirts"
        type="words"
        stagger={0.04}
      />
  </h2>

  {/* Divider */}
  <div className="mt-3 flex justify-center mb-6">
    <span className="h-1 w-16 sm:w-20 lg:w-24 rounded-full bg-red-700"></span>
  </div>

  <GridReveal>
    {/* Product Grid */}
    <div className="
      grid
      grid-cols-2
      sm:grid-cols-2
      md:grid-cols-3
      lg:grid-cols-4
      gap-4
      sm:gap-6
      lg:gap-8
      max-w-7xl
      mx-auto
    ">
      {Array.isArray(shirts) &&
        shirts.map((item, id) => (
          <div onClick={() => handleClick(item)}>
          <Cards
            key={id}
            image={item.image.map(
              (img) => `${import.meta.env.VITE_API_URL}/uploads/${img}`
            )}
            title={item.name}
            price={item.price}
            onView={() => handleClick(item)}
            onAddToCart={() =>
              console.log("Add to cart: ", item._id)
            }
          />
          </div>
        ))}
    </div>
  </GridReveal>
</section>
{/*Brown Image */}
<ScrollReveal>
  <section className="w-full">
    <div className="relative w-full h-[70vh] sm:h-[80vh] lg:h-[90vh]">
      
      {/* Background Image */}
      <img
        src="/image/img_brown2.png"
        alt="Hero Background"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Dark Overlay (improves text readability on mobile) */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Overlay Content */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-4 sm:px-6">
        
        <h2 className="text-white text-2xl sm:text-3xl md:text-5xl font-semibold mb-6 sm:mb-10 font-serif">
          Ready to get started?
        </h2>

        <i>
          <h3 className="text-white text-base sm:text-xl md:text-3xl mb-8 sm:mb-12 font-serif max-w-2xl">
            
            <SplitText
        text="Unlock direct access to premium men’s fashion straight from our factory."
        type="words"
        stagger={0.04}
      />
          </h3>
        </i>

        <button
          className="
            bg-black/90 text-white
            px-8 sm:px-12 lg:px-14
            py-3 sm:py-4
            text-base sm:text-lg lg:text-xl
            font-bold
            rounded-full
            transition-all duration-300
            hover:bg-black
            hover:text-red-400
            hover:scale-105
            ring-0 hover:ring-2 hover:ring-red-400 hover:ring-offset-2 hover:ring-offset-black
          "
        >
          Sign In
        </button>

      </div>
    </div>
  </section>
</ScrollReveal>


<section className="bg-white rounded-2xl pt-26 pl-18 shadow-sm">
  {/* Header */}
  <div className="flex items-center justify-between mb-12">
    <h2 className="text-2xl font-serif font-semibold text-gray-900">
      Latest Instagram Reels
    </h2>

    <a
      href="https://www.instagram.com/modastitch_official/"
      target="_blank"
      rel="noopener noreferrer"
      className="text-sm font-semibold text-pink-600 hover:text-pink-700 transition"
    >
      View on Instagram →
    </a>
  </div>

  {/* Scrollable Reels */}
  <div
    className="
      flex gap-18
      overflow-x-auto
      pb-4
      snap-x snap-mandatory
      scrollbar-hide
    "
  >
    {[
      "DUi3AZggZ72",
      "DUbQnhkk3ro",
      "DUfMj0iEWjX",
      "DUcNnUhk6j2",
    ].map((id) => (
      <div
        key={id}
        className="
          min-w-[240px] sm:min-w-[280px]
          aspect-[9/16]
          snap-start
          rounded-xl
          overflow-hidden
          shadow-md
          bg-black
        "
      >
        <iframe
          src={`https://www.instagram.com/reel/${id}/embed`}
          className="w-full h-full"
          allowFullScreen
          loading="lazy"
        />
      </div>
    ))}
  </div>
</section>





<section className="block md:hidden">
  <div className="grid grid-cols-2 mx-4 my-4 gap-4">
    {Array.isArray(allproduct) && allproduct.map((item, id) => (
      <Cards
        key={id}
        image={item.image.map(
          img => `${import.meta.env.VITE_API_URL}/uploads/${img}`
        )}
        title={item.name}
        price={item.price}
        onView={() => handleClick(item)}
        onAddToCart={() => console.log("Add to cart: ", item._id)}
      />
    ))}
  </div>
</section>



      <section className="bg-[linear-gradient(180deg,_#FFFFFF_0%,_#FFF5F5_100%)] py-16">
        <h2 className="text-4xl font-bold font-serif text-center pt-12">
          Let's Hear From Our Customers
        </h2>

        <div className="mt-4 flex justify-center mb-4 pb-8">
          <span className="h-1 w-24 rounded-full bg-red-700"></span>
        </div>

        <div className="relative mx-auto max-w-7xl px-6 py-10">
        <ScrollReveal>
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
    {reviewData.map((item) => (
      <div
        key={item.id}
        className="
          group relative
          rounded-3xl p-8
          bg-gradient-to-br from-white via-white to-red-50/40
          border border-gray-200
          shadow-md
          backdrop-blur-xl
          border border-black/30
          transition-all duration-300
          hover:-translate-y-2
          hover:shadow-2xl hover:shadow-red-200/40
        "
      >
        {/* Stars */}
        <div className="flex gap-1 mb-4 text-yellow-400 text-xl">
          {item.star}
        </div>

        {/* Review */}
        <p className="
          text-gray-700 text-base leading-relaxed italic
          line-clamp-4
        ">
          “{item.review}”
        </p>

        {/* Footer */}
        <div className="mt-8 pt-5 border-t border-gray-100 flex items-center gap-4">
          <div
            className="
              w-12 h-12 rounded-full
              bg-gradient-to-br from-red-600 to-red-800
              text-white
              flex items-center justify-center
              font-semibold text-lg
              shadow-md
            "
          >
            {item.letter}
          </div>
          

          <div>
            <h4 className="font-semibold text-gray-900 leading-tight">
              {item.name}
            </h4>
            <p className="text-sm text-green-700 font-medium flex items-center gap-1">
              <span>✔</span> Verified Customer
            </p>
          </div>
        </div>

        {/* Hover glow */}
        <div className="
          pointer-events-none absolute inset-0 rounded-3xl
          opacity-0 group-hover:opacity-100
          transition duration-300
          bg-gradient-to-br from-red-200/20 via-transparent to-transparent
        " />
      </div>
    ))}
  </div>
  </ScrollReveal>
</div>

      </section>
      
      <section className="py-8 hidden md:visible lg:visible">
        <Slider/>
      </section>


<section className="bg-white py-12">
<ScrollReveal>
  <div className="mx-auto max-w-4xl space-y-4 mt-10">
      {data.map((item, index) => {
        const isOpen = active === index;

        return (
          <div
            key={index}
            className="
              rounded-2xl
              bg-[#F5F5F0]/20 backdrop-blur-xl
              border border-white/30
              shadow-xl py-2
            "
          >
            {/* Header */}
            <button
              onClick={() => setActive(isOpen ? null : index)}
              className="w-full flex items-center justify-between px-6 py-4 text-left"
            >
              <h3 className="text-xl font-semibold text-gray-900">
                {item.title}
              </h3>

              <motion.span
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <ChevronDown className="w-5 h-5 text-gray-800" />
              </motion.span>
            </button>

            {/* Content */}
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-6 text-gray-700 leading-relaxed whitespace-pre-line">
                    {item.content}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  </ScrollReveal>
</section>
{/* <Crousel/> */}
    </div>
  );
};

export default Dashboard;

