// import { createContext,useState,useEffect } from "react";
// import axios from "axios";
// import { ToastContainer,toast } from "react-toastify";
// import 'react-toastify/dist/ReactToastify.css';

// export const CartContext=createContext();

// export const CartProvider=({children})=>{

//     const[cartItems,setCartItems]=useState([]);

//     useEffect(()=>{
//         loadCart();
//     },[]);

//     const loadCart = async () => {
//   const token = localStorage.getItem("token");

//   if (!token) return;

//   try {
//     const res = await axios.get(
//       `${import.meta.env.VITE_API_URL}/api/cart/fetch`,
//       {
//         headers: {
//           Authorization: `Bearer ${token.trim()}`
//         }
//       }
//     );

//     setCartItems(res.data);
//   } catch (err) {
//     if (err.response?.status === 401) {
//       localStorage.removeItem("token");
//       setCartItems([]);
//       toast.error("Session expired. Please login again");
//     }
//     console.error("Load cart failed", err);
//   }
// };

//     const addToCart=async({id,name,image,price,size})=>{

//         const token=localStorage.getItem("token");
//         if(!token){
//             toast.warn("Please login first",{
//                 position:"top-right",
//                 autoClose:2000
//             })
//             return;
//         }

//         try{
//             const res=await axios.post(`${import.meta.env.VITE_API_URL}/api/cart/add`,
//                 {
//                     productId:id,name,image,price,size
//                 },{
//                     headers:{
//                         Authorization:`Bearer ${token}`
//                     }
//                 }
//             );
//             setCartItems(res.data);
//             await loadCart();
//         }catch(err){
//             console.error("Add to cart failed",err.response?.data||err);
//         }
//     };


//     const updateQty=async(id,size,diff)=>{
//         const token=localStorage.getItem("token");
//         try{
//             const res=await axios.post(
//                 `${import.meta.env.VITE_API_URL}/api/cart/update`,
//                 {productId:id,size,diff},
//                 {headers:{Authorization:`Bearer ${token}`}}
//             );
//             setCartItems(res.data)
//         }catch(err){
//             console.error("Qty update failed",err);
//         }
//     };


//     const removeItem=async(id,size)=>{
//         const token=localStorage.getItem("token");

//         try{
//             const res=await axios.post(
//                 `${import.meta.env.VITE_API_URL}/api/cart/remove`,
//                 {productId:id,size},
//                 {headers:{Authorization:`Bearer ${token}`}}
//             )
//             setCartItems(res.data)
//         }catch(err){
//             console.log("Remove failed: ",err)
//         }
//     };

//     return(
//         <CartContext.Provider
//         value={{
//             cartItems,addToCart,updateQty,removeItem,setCartItems
//         }}
//         >
//         {children}
//         </CartContext.Provider>
//     )

// }



// import { createContext, useState, useEffect } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";

// export const CartContext = createContext();

// const getToken = () => localStorage.getItem("token")?.trim();

// export const CartProvider = ({ children }) => {
//   const [cartItems, setCartItems] = useState([]);

// //   useEffect(() => {
// //     loadCart();
// //   }, []);


// useEffect(() => {
//   loadCart();

//   const onAuthChange = () => loadCart();
//   window.addEventListener("auth-change", onAuthChange);

//   return () => {
//     window.removeEventListener("auth-change", onAuthChange);
//   };
// }, []);



//   const loadCart = async () => {
//     const token = getToken();
//     if (!token) return;

//     try {
//       const res = await axios.get(
//         `${import.meta.env.VITE_API_URL}/api/cart/fetch`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//       setCartItems(res.data);
//     } catch (err) {
//       if (err.response?.status === 401) {
//         console.warn("Cart not loaded (unauthorized)");
//         // DO NOT remove token here
//       }
//       console.error("Load cart failed", err);
//     }
//   };

// //   const addToCart = async ({ id, name, image, price, size }) => {
// //     const token = getToken();

// //     if (!token) {
// //       toast.warn("Please login first");
// //       return;
// //     }

// //     try {
// //       await axios.post(
// //         `${import.meta.env.VITE_API_URL}/api/cart/add`,
// //         { productId: id, name, image, price, size },
// //         {
// //           headers: {
// //             Authorization: `Bearer ${token}`,
// //           },
// //         }
// //       );
// //       await loadCart();
// //     } catch (err) {
// //       if (err.response?.status === 401) {
// //         toast.error("Session expired. Please login again");
// //       }
// //       console.error("Add to cart failed", err);
// //     }
// //   };

 
// const addToCart = async ({ id, name, image, price, size }) => {
//   const token = localStorage.getItem("token");
//   if (!token) return;

//   try {
//     await axios.post(
//       `${import.meta.env.VITE_API_URL}/api/cart/add`,
//       { productId: id, name, image, price, size },
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       }
//     );

//     await loadCart();
//   } catch (err) {
//     console.error("Add to cart failed", err);
//   }
// };


// const updateQty = async (id, size, diff) => {
//     const token = getToken();
//     if (!token) return;

//     try {
//       const res = await axios.put(
//         `${import.meta.env.VITE_API_URL}/api/cart/update`,
//         { productId: id, size, diff },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       setCartItems(res.data);
//     } catch (err) {
//       console.error("Qty update failed", err);
//     }
//   };

//   const removeItem = async (id, size) => {
//     const token = getToken();
//     if (!token) return;

//     try {
//       const res = await axios.delete(
//         `${import.meta.env.VITE_API_URL}/api/cart/remove`,
//         { productId: id, size },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       setCartItems(res.data);
//     } catch (err) {
//       console.error("Remove failed", err);
//     }
//   };

//   return (
//     <CartContext.Provider
//       value={{ cartItems, addToCart, updateQty, removeItem }}
//     >
//       {children}
//     </CartContext.Provider>
//   );
// };





import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const CartContext = createContext();

const getToken = () => localStorage.getItem("token")?.trim();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = async () => {
    const token = getToken();
    if (!token) return;

    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/cart/fetch`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setCartItems(res.data);
    } catch (err) {
      console.error("Load cart failed", err);
    }
  };

  const addToCart = async ({ id, name, image, price, size }) => {
    const token = getToken();
    if (!token) return;

    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/cart/add`,
        { productId: id, name, image, price, size },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      loadCart();
    } catch (err) {
      console.error("Add to cart failed", err);
    }
  };

  const updateQty = async (productId,size,diff) => {
    const token = getToken();
    if (!token) return;

    try {
      const res = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/cart/update`,
        { productId,size,diff },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCartItems(res.data);
    } catch (err) {
      console.error("Qty update failed", err);
    }
  };

  const removeItem = async (productId, size) => {
    const token = getToken();
    if (!token) return;

    try {
      const res = await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/cart/remove`,
        {
          headers: { Authorization: `Bearer ${token}` },
          data: { productId, size }, 
        }
      );
      setCartItems(res.data);
    } catch (err) {
      console.error("Remove failed", err);
    }
  };

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, updateQty, removeItem }}
    >
      {children}
    </CartContext.Provider>
  );
};
