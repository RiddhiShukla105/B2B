import React, { useState } from "react";
import { Accordion, AccordionTab } from "primereact/accordion";
import Slider from "./Slider";
import Cards from "./Cards";
import Card2 from "./Card2";
import { Timeline } from 'primereact/timeline';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
 import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const Dashboard = () => {

 const [active, setActive] = useState(null);

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



  return (
    <div className="bg-gray-50">
      <div className="relative">
  <img
    src="/image/poster2.png"
    alt=""
    className="w-full  object-cover rounded-xl"
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
    <h1 className="text-5xl font-bold font-sans">
      <span className="text-6xl">S</span>ource Men’s Fashion with Confidence
    </h1>

    <i><h2 className="text-2xl font-bold font-medium font-sans text-gray-200">
      <span className="text-3xl">V</span>erified wholesale supply, flexible MOQ, and global shipping.
    </h2></i>
  </div>
  {/* <button className="absolute bg-black text-white px-40 py-4 text-2xl font-bold rounded-4xl hover:bg-black/90 mt-80 ml-30 hover:text-red-800 hover:text-3xl duration-75">Shop Now</button> */}

<button className="absolute bg-black text-white px-40 py-3 text-2xl font-bold font-sans rounded-4xl
  mt-80 ml-30
  hover:bg-black/90 hover:text-red-400 hover:text-3xl
  duration-300
  ring-0 hover:ring-2 hover:ring-red-400 hover:ring-offset-2 hover:ring-offset-black
  transition-all">
  Shop Now
</button> 
</div>
</div> 



<section>
  <div className="bg-[#8a6e4e] relative py-20 px-6">

    {/* CONTENT ABOVE OVERLAY */}
    <div className="relative z-10">
      <Card2 />
    </div>

    {/* OVERLAY */}
    <div
      className="absolute inset-0 rounded-xl
                 bg-gradient-to-br 
                 from-black/90 
                 via-black/50 
                 to-transparent
                 pointer-events-none"
    ></div>

  </div>
</section>

<section>
  <div className="bg-white grid grid-cols-[2fr_3fr] py-10">
    <div className="py-12 px-12 tracking-widest line-clamp-6 break-keep text-center">
    <h2 className="text-4xl font-bold "><span className="text-5xl text-red-400">C</span>urated <span className="text-5xl text-red-400">M</span>en's <span className="text-5xl text-red-400">F</span>ashion, 
    <br/><br /><span className="text-5xl text-red-400">S</span>traight <span className="text-5xl text-red-400">F</span>rom <span className="text-5xl text-red-400">F</span>actory <br/> <br/><span className="text-5xl text-red-400">F</span>loor</h2>
    <h3 className="break-keep tracking-widest mt-16 text-xl font-black text-red-900"><i>Skip the middlemen and source directly from our specialized production lines.</i></h3>
  </div>
  <div>
    <div className="card">
            <Timeline value={events} align="alternate" className="customized-timeline" marker={customizedMarker} content={customizedContent} />
        </div>

  </div>
  </div>
</section>




     <section>
       <h1 className="text-4xl font-bold font-serif text-center pt-18">
        Our Trending T-shirts
      </h1>
      <div className="mt-4 flex justify-center mb-4 pb-8">
          <span className="h-1 w-24 rounded-full bg-red-700"></span>
        </div>

      <div className="grid grid-cols-4 mx-8 my-4 gap-8">
        <span>
          <Cards />
        </span>{" "}
        <span>
          <Cards />
        </span>
        <span>
          <Cards />
        </span>{" "}
        <span>
          <Cards />
        </span>
      </div>
     </section>

<section>
    <h2 className="text-4xl font-bold font-serif text-center pt-18">
        Our Trending Shirts
      </h2>
       <div className="mt-4 flex justify-center mb-4 pb-8">
          <span className="h-1 w-24 rounded-full bg-red-700"></span>
        </div>
      <div className="grid grid-cols-4 mx-8 my-4 gap-8 pb-18">
        <span>
          <Cards />
        </span>{" "}
        <span>
          <Cards />
        </span>
        <span>
          <Cards />
        </span>{" "}
        <span>
          <Cards />
        </span>
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
</div>

      </section>
      

      <section className="w-full">
  <div className="relative w-full ">
    
    {/* Background Image */}
    <img
      src="/image/img_brown2.png"
      alt="Hero Background"
      className="w-full h-full object-cover"
    />

    {/* Overlay Content */}
    <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-6">
      
      <h2 className="text-white text-3xl md:text-5xl font-semibold mb-12 font-serif">
        Ready to get started?
      </h2>
      <i><h3 className="text-white text-2xl md:text-3xl mb-12 font-serif">"Unlock direct access to premium men’s fashion straight from our factory."</h3></i>
      <button
        className="
          bg-black/90 text-white
          px-14 py-4
          text-xl font-bold
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
{/* <section className="bg-[linear-gradient(130deg,_#FCFDFB_0%,_#F2F4F0_100%)]">
<h2 className="text-5xl font-bold font-serif text-red-900 text-center mt-10">Empowering businesses through global trade</h2>
  <div className="grid grid-cols-2 pt-18 h-screen px-8">
    <div className="h-5/6">
      <img src="/image/s-4.jpg" className="h-2/3 w-full rounded-4xl" alt="" />
    </div>
    <div className="grid grid-rows-2 h-2/3 px-4">
    <div>
      <img src="/image/s2.jpg" alt="" className="w-3/2 h-5/6 rounded-4xl"/>
    </div>
      <div className="flex h-2/3">
        <img src="/image/wolf5.png" className="w-1/2 pr-8 rounded-4xl" alt="" />
      <img src="/image/spooky_green4.png" className="w-1/2 rounded-4xl" alt="" />
      </div>
    </div>
  </div>
</section> */}
      
      <section className="py-8">
        <Slider/>
      </section>

     {/* <div className="card mt-10">
  <Accordion activeIndex={0} className="rounded-2xl overflow-hidden">
    
    <AccordionTab header="Return Policy">
      <p className="text-gray-700 leading-relaxed">
        Replacement of the same order will be provided within
        <span className="font-semibold text-gray-900"> 5 days</span> of delivery.
      </p>
    </AccordionTab>

    <AccordionTab header="Shipping Policy">
      <p className="text-gray-700 leading-relaxed">
        Orders will be delivered within
        <span className="font-semibold text-gray-900"> 5 business days</span>.
      </p>
    </AccordionTab>

    <AccordionTab header="About Us">
      <p className="text-gray-700 leading-relaxed space-y-4">
        Born from a deep understanding of style, quality, and evolving market
        needs, our brand focuses on delivering well-crafted, trend-forward
        apparel designed for today’s man.
        <br /><br />
        From timeless essentials to contemporary fashion pieces, every product
        is created with attention to detail, fit, and fabric excellence.
        <br /><br />
        As a <span className="font-semibold text-gray-900">B2B-focused e-commerce brand</span>,
        we partner with retailers, wholesalers, and fashion businesses
        worldwide, offering reliable sourcing, consistent quality, and seamless
        global delivery.
        <br /><br />
        Our operations support growing brands with scalable supply,
        competitive pricing, and dependable international logistics.
        <br /><br />
        We believe men’s fashion should balance
        <span className="font-semibold text-gray-900"> style, comfort, and confidence</span>.
        <br /><br />
        <span className="block text-right font-semibold text-gray-900">
          — to build a strong, globally recognized men’s fashion brand that
          businesses trust.
        </span>
      </p>
    </AccordionTab>

    <AccordionTab header="Minimum Buy for Wholesale">
      <p className="text-gray-700 leading-relaxed">
        A minimum purchase of
        <span className="font-semibold text-gray-900"> 10 shirts</span> is required
        as this is a wholesale platform.
      </p>
    </AccordionTab>

  </Accordion>
</div> */}


<section className="bg-white py-12">
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
  
</section>

    </div>
  );
};

export default Dashboard;


// import React from "react";
// import { Accordion, AccordionTab } from "primereact/accordion";
// import Slider from "./Slider";
// import Cards from "./Cards";

// const Dashboard = () => {
//   return (
//     <div className="bg-gray-100">

      
//       <section className="max-w-7xl mx-auto px-4 py-6">
//         <div className="grid grid-cols-12 gap-4">

          
//           <aside className="col-span-12 md:col-span-3 bg-white rounded-xl shadow p-4">
//             <h3 className="font-bold text-lg mb-4">Categories</h3>
//             <ul className="space-y-3 text-sm">
//               {[
//                 "Men T-Shirts",
//                 "Men Shirts",
//                 "Bulk Orders",
//                 "New Arrivals",
//                 "Best Sellers",
//                 "Wholesale Deals",
//               ].map((item, i) => (
//                 <li
//                   key={i}
//                   className="hover:text-red-700 cursor-pointer transition"
//                 >
//                   {item}
//                 </li>
//               ))}
//             </ul>
//           </aside>

          
//           <div className="col-span-12 md:col-span-9">
//             <img
//               src="/image/poster1.png"
//               alt="Wholesale Banner"
//               className="rounded-xl w-full h-full object-cover shadow"
//             />
//           </div>
//         </div>
//       </section>

     
//       <section className="bg-white py-6 shadow-sm">
//         <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-center text-sm font-medium">
//           <div>✔ MOQ Starting at 10 Units</div>
//           <div>✔ Worldwide Shipping</div>
//           <div>✔ Verified Wholesale Supplier</div>
//           <div>✔ Bulk Pricing Available</div>
//         </div>
//       </section>

      
//       <Section title="Trending T-Shirts" />
//       <ProductGrid />

//       <Section title="Trending Shirts" />
//       <ProductGrid />

     
//       <section className="bg-red-700 text-white py-12 mt-12">
//         <div className="max-w-6xl mx-auto text-center px-4">
//           <h2 className="text-3xl font-bold mb-4">
//             Looking for Bulk / Wholesale Orders?
//           </h2>
//           <p className="mb-6 text-lg">
//             Competitive pricing • Scalable supply • Reliable delivery
//           </p>
//           <button className="bg-white text-red-700 px-8 py-3 rounded-full font-semibold hover:bg-gray-100">
//             Contact Supplier
//           </button>
//         </div>
//       </section>

//       {/* ================= CUSTOMER REVIEWS ================= */}
//       <section className="max-w-7xl mx-auto px-4 py-12">
//         <h2 className="text-3xl font-bold text-center mb-8">
//           Trusted by Global Buyers
//         </h2>

//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           {[
//             {
//               name: "Romeo",
//               text: "Premium quality & consistent sizing. Perfect for wholesale.",
//             },
//             {
//               name: "Mandy",
//               text: "Fast logistics and great margins for retailers.",
//             },
//             {
//               name: "Conard",
//               text: "Reliable supplier. Repeat bulk orders every month.",
//             },
//           ].map((r, i) => (
//             <div
//               key={i}
//               className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition"
//             >
//               <p className="italic text-gray-600 mb-4">“{r.text}”</p>
//               <h4 className="font-semibold">{r.name}</h4>
//               <span className="text-green-600 text-sm">✔ Verified Buyer</span>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* ================= SLIDER ================= */}
//       <section className="py-8 bg-white">
//         <Slider />
//       </section>

//       {/* ================= FAQ ================= */}
//       <section className="max-w-6xl mx-auto px-4 py-10">
//         <Accordion activeIndex={0}>
//           <AccordionTab header="Minimum Order Quantity">
//             Minimum 10 units per design for wholesale orders.
//           </AccordionTab>
//           <AccordionTab header="Shipping & Delivery">
//             Orders are shipped worldwide within 5–7 business days.
//           </AccordionTab>
//           <AccordionTab header="Return Policy">
//             Replacement provided for defective items within 5 days.
//           </AccordionTab>
//           <AccordionTab header="About Us">
//             We are a B2B-focused men’s fashion brand delivering scalable,
//             trend-forward apparel for global retailers and wholesalers.
//           </AccordionTab>
//         </Accordion>
//       </section>
//     </div>
//   );
// };

// /* ===== Reusable Components ===== */

// const Section = ({ title }) => (
//   <section className="max-w-7xl mx-auto px-4 pt-12">
//     <h2 className="text-3xl font-bold text-center">{title}</h2>
//     <div className="mt-4 flex justify-center">
//       <span className="h-1 w-20 bg-red-700 rounded-full"></span>
//     </div>
//   </section>
// );

// const ProductGrid = () => (
//   <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
//     <Cards />
//     <Cards />
//     <Cards />
//     <Cards />
//   </div>
// );

// export default Dashboard;


 <div className="relative">
  <img
    src="/image/poster1.png"
    alt=""
    className="w-full h-[420px] object-cover rounded-xl"
  />

  
  <div className="absolute inset-0 bg-black/50 rounded-xl"></div>


  <div className="absolute inset-0 flex items-center justify-center text-white z-10">
    <h1 className="text-4xl font-bold">Wholesale Fashion</h1>
  </div>
</div> 
