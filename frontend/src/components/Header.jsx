// import React, { useContext, useEffect, useState } from "react";
// import {
//   AiFillLinkedin,
//   AiOutlineWhatsApp,
//   AiOutlineInstagram,
//   AiFillFacebook,
//   AiOutlineShoppingCart,
//   AiOutlineUser,
//   AiFillHeart,
// } from "react-icons/ai";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import appRoute from "./AppRoutes";
// import { CartContext } from "../context/CartContext";

// const Header = () => {
//   const filteredRoutes = appRoute.filter((item) => item.name);
//   const[isLoggedIn,setIsLoggedIn]=useState(false)

//   const location=useLocation();
//   const navigate=useNavigate();
//   const {logoutCart}=useContext(CartContext);

//   const role=localStorage.getItem("role")

//   useEffect(()=>{
//     setIsLoggedIn(!!localStorage.getItem("token"))
//   },[])

//   const handleLogout=()=>{
//     try{
//       localStorage.removeItem("token");
//       localStorage.removeItem("role");
//       logoutCart?.()
//       setIsLoggedIn(false);
//       toast("You are logged out!",
//         {
//           position:"top-right",
//           autoClose:1500,
//           theme:"light"
//         })
//         setTimeout(()=>navigate("/login"),1600);
//     }catch(error){
//       console.log("Logout Error : ",error)
//     }
//   }

//   return (
//     <>
//       {/* 🔹 Top Bar */}
//       <div className="flex justify-between items-center bg-gray-50 text-gray-600 text-sm py-2 px-8">
//         <div className="flex gap-4">
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
//         </div>

//         <div className="font-medium text-xl">
//           Free Shipping on all orders
//         </div>

//           {isLoggedIn?(<>
//         <div className="flex gap-5 items-center text-gray-700">
//          <Link to="/cart"> <AiOutlineShoppingCart size={24} className="hover:text-red-400 cursor-pointer" /></Link>
//           <Link><AiOutlineUser size={24} className="hover:text-red-400 cursor-pointer" onClick={handleLogout}/></Link>
//           <AiFillHeart size={24} className="hover:text-red-400 cursor-pointer" />
//           <span className="hover:text-red-400 cursor-pointer">
//             Delivery: 4 Days
//           </span>
//         </div>
//         </>):(
//             <Link to="/sign"><AiOutlineUser size={24} className="hover:text-red-400 cursor-pointer"/></Link>
//         )}

//       </div>

//       <hr className="border-gray-200" />

//       {/* 🔹 Middle Bar */}
//       <div className="flex justify-between items-center py-3 px-8">
//         <div className="text-2xl font-bold tracking-wide">
//           Moda<span className="text-red-400">Stitch</span>
//         </div>

//         <div className="w-1/3">
//           <input
//             type="search"
//             placeholder="Search here"
//             className="w-full px-4 py-2 rounded-full border border-gray-300
//                        focus:outline-none focus:border-red-400
//                        focus:ring-1 focus:ring-red-300 transition"
//           />
//         </div>

//         {/* 🔹 Navigation Bar */}
//       <div className="flex justify-center gap-12 py-3 px-8">
//         {filteredRoutes.map((item) => (
//           <Link key={item.path} to={item.path}>
//             <span className="text-lg font-semibold hover:text-red-400 transition cursor-pointer">
//               {item.name}
//             </span>
//           </Link>
//         ))}
//       </div>
//       </div>

//       <hr className="border-gray-200" />

      
//     </>
//   );
// };

// export default Header;


import React, { useContext, useEffect, useState } from "react";
import {
  AiFillLinkedin,
  AiOutlineWhatsApp,
  AiOutlineInstagram,
  AiFillFacebook,
  AiOutlineShoppingCart,
  AiOutlineUser,
  AiFillHeart,
} from "react-icons/ai";
import { Link, useLocation, useNavigate } from "react-router-dom";
import appRoute from "./AppRoutes";
import { CartContext } from "../context/CartContext";
import { toast } from "react-toastify";

const Header = () => {
  const filteredRoutes = appRoute.filter((item) => item.name);

  const location = useLocation();
  const navigate = useNavigate();
  const { setCartItems } = useContext(CartContext);

  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("token")
  );

  // ✅ UPDATE LOGIN STATE ON ROUTE CHANGE
  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem("token"));
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("user");

    setCartItems([]);        // reset cart

    setCartItems([]); // clear cart safely
    setIsLoggedIn(false);

    toast.success("You are logged out!", {
      position: "top-right",
      autoClose: 1500,
    });

    navigate("/login");
  };

  return (
    <>
    <div className="bg-gradient-to-b from-black via-black/90 to-black/85">
      {/* 🔹 Top Bar */}
      
      <div className="flex justify-between items-center bg-transparent text-white text-sm pt-3 pb-2 px-8">
        <div className="flex gap-4 text-black">
          {[AiFillLinkedin, AiOutlineWhatsApp, AiOutlineInstagram, AiFillFacebook].map(
            (Icon, i) => (
              <span
                key={i}
                className="bg-gray-200 p-1.5 rounded hover:bg-red-400 hover:text-white transition cursor-pointer"
              >
                <Icon size={18} />
              </span>
            )
          )}
        </div>

<i>
  <div className="text-xl font-serif text-red-400 tracking-widest [word-spacing:0.2rem]">Free Shipping on all orders</div>
</i>
          
        

        {isLoggedIn ? (
          <div className="flex gap-5 items-center text-white">
            <Link to="/cart">
              <AiOutlineShoppingCart
                size={24}
                className="hover:text-red-400 cursor-pointer"
              />
            </Link>

            <AiOutlineUser
              size={24}
              className="hover:text-red-400 cursor-pointer"
              onClick={handleLogout}
            />

            <AiFillHeart
              size={24}
              className="hover:text-red-400 cursor-pointer"
            />

            <span className="hover:text-red-400 cursor-pointer">
              Delivery: 4 Days
            </span>
          </div>
        ) : (
          <Link to="/login">
            <AiOutlineUser
              size={24}
              className="hover:text-red-400 cursor-pointer"
            />
          </Link>
        )}
      </div>

      {/* <hr className="border-gray-200" /> */}

      {/* 🔹 Middle Bar */}
      <div className="flex justify-between items-center py-3 px-8 bg-transparent">
        <div className="text-2xl font-bold tracking-wide text-white">
          Moda<span className="text-red-400">Stitch</span>
        </div>

        <div className="w-1/3">
          <input
            type="search"
            placeholder="Search here"
            className="w-full px-4 text-white py-2 rounded-full border border-gray-300
                       focus:outline-none focus:border-red-400
                       focus:ring-1 focus:ring-red-300 transition"
          />
        </div>

        {/* 🔹 Navigation */}
        <div className="flex gap-12 text-white">
          {filteredRoutes.map((item) => (
            <Link key={item.path} to={item.path}>
              <span className="text-lg font-semibold hover:text-red-400 transition cursor-pointer">
                {item.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
      

      {/* <hr className="border-gray-200" /> */}
      
    </div>
    

    </>
  );
};

export default Header;

