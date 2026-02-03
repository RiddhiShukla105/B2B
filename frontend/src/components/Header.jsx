import React, { useContext, useEffect, useState } from "react";
import {
  AiFillLinkedin,
  AiOutlineWhatsApp,
  AiOutlineInstagram,
  AiFillFacebook,
  AiOutlineMenu,
  AiOutlineShoppingCart,
  AiOutlineUser,
  AiFillHeart,
  AiOutlineClose,
} from "react-icons/ai";
import { Link, useLocation, useNavigate } from "react-router-dom";
import appRoute from "./AppRoutes";
import { CartContext } from "../context/CartContext";
import { toast } from "react-toastify";
import ScrollReveal from "./ScrollReveal";

const Header = () => {
  const filteredRoutes = appRoute.filter((item) => item.name);

  const location = useLocation();
  const navigate = useNavigate();
  const { setCartItems } = useContext(CartContext);

  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("token")
  );
  
  const[open,setOpen]=useState()

  // ✅ UPDATE LOGIN STATE ON ROUTE CHANGE
  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem("token"));
  }, [location.pathname]);

const handleLogout = () => {
  localStorage.clear();

  if (typeof setCartItems === "function") {
    setCartItems([]);
  }

  setIsLoggedIn(false);

  toast.success("You are logged out!", { autoClose: 1600 });

  navigate("/login");
};


  return (
//     <>
//     <div className="bg-gradient-to-b from-black via-black/90 to-black/85 sticky">
//       {/* 🔹 Top Bar */}
      
//       <div className="flex justify-between items-center bg-transparent text-white text-sm pt-3 pb-2 px-8">
//         {/* <div className="flex gap-4 text-black">
//           {[AiFillLinkedin, AiOutlineWhatsApp, AiOutlineInstagram, AiFillFacebook].map(
//             (Icon, i) => (
//               <span
//                 key={i}
//                 className="bg-gray-200 p-1.5 rounded hover:bg-red-400 hover:text-white transition cursor-pointer"
//               >
//                 <Icon size={18} />
//               </span>
//             )
//           )}
//         </div> */}
       
//         <div className="text-2xl font-bold tracking-wide text-white">
//           Moda<span className="text-red-400">Stitch</span>
//         </div>

// {/* <i>
//   <div className="text-xl font-serif text-red-400  [word-spacing:0.2rem]">Free Shipping on all orders</div>
// </i> */}
//           <div className="w-1/3">
//           <input
//             type="search"
//             placeholder="Search here"
//             className="w-full px-4 text-white py-2 rounded-full border border-red-400
//                        focus:outline-none focus:border-red-600
//                        focus:ring-1 focus:ring-red-300 transition"
//           />
//         </div>

//         {isLoggedIn ? (
//           <ScrollReveal>
//           <div className="flex gap-5 items-center text-white">
//           <div className="flex gap-12 text-white">
//           {filteredRoutes.map((item) => (
//             <Link key={item.path} to={item.path}>
//               <span className="text-lg font-semibold hover:text-red-400 transition cursor-pointer">
//                 {item.name}
//               </span>
//             </Link>
//           ))}
//         </div>
//             <Link to="/cart">
//               <AiOutlineShoppingCart
//                 size={24}
//                 className="hover:text-red-400 cursor-pointer"
//               />
//             </Link>

//             <AiOutlineUser
//               size={24}
//               className="hover:text-red-400 cursor-pointer"
//               onClick={handleLogout}
//             />

//             <AiFillHeart
//               size={24}
//               className="hover:text-red-400 cursor-pointer"
//             />

//             {/* <span className="hover:text-red-400 cursor-pointer">
//               Delivery: 4 Days
//             </span> */}
//           </div>
//           </ScrollReveal>
//         ) : (
//           <Link to="/login">
//             <AiOutlineUser
//               size={24}
//               className="hover:text-red-400 cursor-pointer"
//             />
//           </Link>
//         )}
//       </div>

//       {/* <hr className="border-gray-200" /> */}

//       {/* 🔹 Middle Bar */}
//       <div className="flex justify-between items-center py-1 px-8 bg-transparent">
//         {/* <div className="text-2xl font-bold tracking-wide text-white">
//           Moda<span className="text-red-400">Stitch</span>
//         </div> */}

//         {/* <div className="w-1/3">
//           <input
//             type="search"
//             placeholder="Search here"
//             className="w-full px-4 text-white py-2 rounded-full border border-gray-300
//                        focus:outline-none focus:border-red-400
//                        focus:ring-1 focus:ring-red-300 transition"
//           />
//         </div> */}

//         {/* 🔹 Navigation */}
//         {/* <div className="flex gap-12 text-white">
//           {filteredRoutes.map((item) => (
//             <Link key={item.path} to={item.path}>
//               <span className="text-lg font-semibold hover:text-red-400 transition cursor-pointer">
//                 {item.name}
//               </span>
//             </Link>
//           ))}
//         </div> */}
//       </div>
      

//       {/* <hr className="border-gray-200" /> */}
      
//     </div>
    

//     </>
<>


<div className="bg-gradient-to-b from-black via-black/90 to-black/85 sticky top-0 z-50">
  {/* 🔹 Top Bar */}
  <div className="flex justify-between items-center text-white px-4 sm:px-8 py-3">
    
    {/* Logo */}
    <div className="text-xl sm:text-2xl font-bold tracking-wide">
      Moda<span className="text-red-400">Stitch</span>
    </div>

    {/* Search (hidden on mobile) */}
    <div className="hidden md:block w-1/3">
      <input
        type="search"
        placeholder="Search here"
        className="w-full px-4 py-2 rounded-full text-white bg-transparent
                   border border-red-400 focus:outline-none
                   focus:border-red-600 focus:ring-1 focus:ring-red-300"
      />
    </div>

    {/* Desktop Right Section */}
    <div className="hidden md:flex gap-6 items-center">
    {filteredRoutes.map((item) => (
            <Link key={item.path} to={item.path}>
              <span className="text-lg font-serif hover:text-red-400 transition">
                {item.name}
              </span>
            </Link>
          ))}
      {isLoggedIn ? (
        <>
          <Link to="/cart">
            <AiOutlineShoppingCart size={22} className="hover:text-red-400" />
          </Link>

          <AiFillHeart size={22} className="hover:text-red-400 cursor-pointer" />

          <AiOutlineUser
            size={22}
            className="hover:text-red-400 cursor-pointer"
            onClick={handleLogout}
          />
        </>
      ) : (
        <Link to="/login">
          <AiOutlineUser size={22} className="hover:text-red-400" />
        </Link>
      )}
    </div>

    {/* Mobile Menu Button */}
    <button
      className="md:hidden text-2xl"
      onClick={() => setOpen(!open)}
    >
      {open ? <AiOutlineClose /> : <AiOutlineMenu />}
    </button>
  </div>

  {/* 🔹 Mobile Menu */}
  {open && (
    <div className="md:hidden bg-black/95 px-6 pb-4 text-gray-200 text-sm space-y-4 sticky">
      
      {/* Mobile Search */}
      <input
        type="search"
        placeholder="Search here"
        className="w-full px-4 py-2 rounded-full bg-transparent
                   border border-red-400 focus:outline-none"
      />

      {filteredRoutes.map((item) => (
          <Link key={item.path} to={item.path} onClick={() => setOpen(false)}>
            <div className="md:text-lg sm:text-sm font-serif hover:text-red-400">
              {item.name}
            </div>
          </Link>
        ))}

      {/* Mobile Links */}
      {isLoggedIn &&
      <div className="flex gap-6 pt-3">
        <Link to="/cart">
          <AiOutlineShoppingCart size={22} />
        </Link>
        <AiFillHeart size={22} />
        {/* <AiOutlineUser size={22} onClick={handleLogout} /> */}
      </div>
        }

      
      <div className="flex gap-6 pt-3">
        {/* <Link to="/cart">
          <AiOutlineShoppingCart size={22} />
        </Link>
        <AiFillHeart size={22} /> */}
        <AiOutlineUser size={22} onClick={handleLogout} />
      </div>
    </div>
  )}
</div>

</>
  );
};

export default Header;

