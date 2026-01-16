import React,{useState,useEffect,useRef} from 'react'
import Cards from '../../components/Cards'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


const Tshirt = () => {
    const[products,setProducts]=useState([])
    const navigate=useNavigate()
    const imageRefs=useRef([])
    const category="t-shirt"

    useEffect(()=>{
        fetchData()
    },[])

    const fetchData=async(req,res)=>{
      await axios.get(`${import.meta.env.VITE_API_URL}/api/product/load-product?category=${category}`)
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
    <>
    {/* <section>
    <img src="/image/banner6.jpg" alt="" />
  </section> */}
      <div className='p-12 pt-0! bg-gray-50/50'>
      <h1 className="text-4xl font-bold font-serif text-center pt-8">
        Our Collection
      </h1>
      <div className="mt-4 flex justify-center mb-4 pb-8">
          <span className="h-1 w-24 rounded-full bg-red-700"></span>
        </div>
        <div className='grid grid-cols-4 gap-8'>

        { Array.isArray(products) && products.map((item,id)=>(
            <Cards key={id} 
            image={`${import.meta.env.VITE_API_URL}/uploads/${item.image[0]}`} 
            title={item.name}
            subtitle={`${item.price}`}
            onView={()=>handleClick(item)}
            onAddToCart={()=>console.log("Add to cart: ",item._id)}
            />
        ))}

      </div>
      </div>
    </>
  )
}

export default Tshirt
