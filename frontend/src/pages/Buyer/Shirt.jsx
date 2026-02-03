import React, { useState, useEffect } from 'react'
import Cards from '../../components/Cards'
import axios from 'axios'
import ScrollReveal from '../../components/ScrollReveal'
import {useNavigate } from 'react-router-dom'

const Tshirt = () => {
  const [products, setProducts] = useState([])

  useEffect(() => {
    fetchData()
  }, [])

  const navigate=useNavigate()

  const fetchData = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/product/load-product/?category=shirt`
      )

      setProducts(res.data.product) // or res.data.products
      console.log(res.data.product)
    } catch (err) {
      console.log(err)
    }
  }

  const handleClick=(item)=>{
      navigate(`/tshirt/${item._id}`,{state:item})
    }

  return (
    <div className='bg-[#efefee]'>

<section className="relative w-full overflow-hidden pb-0  sm:block">
  <img
    src="/image/second4.png"
    alt="Banner"
    className="
      w-full
      h-[120px]
      md:h-[250px]
      lg:h-[400px]
      object-cover
      object-center
    "
  />
</section>

   
    <div className="px-4 pt-0!">
      <div
  className="
    grid
    grid-cols-2        
    sm:grid-cols-2
    md:grid-cols-3     
    lg:grid-cols-4     
    gap-4          
    sm:gap-6
    lg:gap-2
  "
>
  {Array.isArray(products) &&
    products.map((item, id) => (
      <ScrollReveal key={id}>
      <div onClick={() => handleClick(item)}>
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
      </ScrollReveal>

    ))}
</div>

    </div>
     </div>
  )
}

export default Tshirt
