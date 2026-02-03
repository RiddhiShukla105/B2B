import React,{useState,useRef,useEffect} from 'react'
import Cards from './Cards'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'



const Crousel = () => {

    const[products,setProducts]=useState([])
    const navigate=useNavigate()
    const imageRefs=useRef([])
    

    useEffect(()=>{
        fetchData()
    },[])

    const fetchData=async(req,res)=>{
      await axios.get(`${import.meta.env.VITE_API_URL}/api/product/load-product`)
      .then((res)=>{
        setProducts(res.data.product)
        console.log(res.data.product)
      })
      .catch((err)=>console.log(err))
    }

    const handleClick=(item)=>{
      navigate(`/tshirt/${item._id}`,{state:item})
    }

  return (
    <div>
       {Array.isArray(products) &&
    products.map((item, id) => (
      
        <div className="w-full" key={id}>
          <Cards
            image={item.image.map(
              img => `${import.meta.env.VITE_API_URL}/uploads/${img}`
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
  )
}

export default Crousel
