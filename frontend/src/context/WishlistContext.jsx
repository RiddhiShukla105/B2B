import {createContext,useState,useEffect} from "react"
import axios from "axios"

export const WishhlistContext=createContext();

const getToken=()=>localStorage.getItem("token")?.trim();

export const WishlistProvider=({children})=>{
    const[wishItems,setwishItems]=useState([])

    useEffect(()=>{
        loadWishlist();
    },[])

    const loadWishlist=async()=>{
        const token=getToken();
        if(!token) return;

        try{
            const res=await axios.get(`${import.meta.env.VITE_API_URL}/api/wishlist/fetch`,
                {headers:{Authorization:`Bearer ${token}`}}
            );
            setwishItems(res.data)
        }catch(err){
            console.error("Load whislist failed",err)
        }
    }

    // const addProduct=async({id,name,image,price})=>{
    // const token=getToken();
    // if(!token) return;

    // try{
    //     await axios.post(`${import.meta.env.VITE_API_URL}/api/wishlist/add`,
    //         {productId:id,name,image,price},
    //         {headers:{Authorization:`Bearer ${token}`}}
    //     );
    //     loadWishlist();
    // }catch(err){
    //     console.error("Add to wishlist failed",err);
    // }
    // }

    const addProduct = async ({ id, name, image, price }) => {
  const token = getToken();
  if (!token) return;

  try {
    await axios.post(
      `${import.meta.env.VITE_API_URL}/api/wishlist/add`,
      {
        productId: id,
        name: name,
        image: image,
        price: price,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    loadWishlist();
  } catch (err) {
    console.error("Add to wishlist failed", err);
  }
};

    const removeItem=async(productId,size)=>{
        const token=getToken();
        if(!token) return;
        try{
            const res=await axios.delete(
                `${import.meta.env.VITE_API_URL}/api/wishlist/remove`,
                {
                    headers:{Authorization:`Bearer ${token}`},
                    data:{productId,size},
                }
            );
            setwishItems(res.data);
        }catch(err){
            console.error("Remove failed",err)
        }
    };
    return(
        <WishhlistContext.Provider value={{wishItems,addProduct,removeItem}}>{children}</WishhlistContext.Provider>
    )
}

