import React, { useState, useEffect } from 'react'
import Cards from '../../components/Cards'
import axios from 'axios'

const Tshirt = () => {
  const [products, setProducts] = useState([])

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/product/load-product`
      )

      setProducts(res.data.product) // or res.data.products
      console.log(res.data.product)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      <section>
    <img src="/image/banner6.jpg" alt="" />
  </section>
   
    <div className="p-12">
      <div className="grid grid-cols-4 gap-8">
        {Array.isArray(products) &&
          products.map((item, id) => (
            <Cards
              key={id}
              image={`${import.meta.env.VITE_API_URL}/uploads/${item.image[0]}`}
              title={item.seo}
              subtitle={`₹${item.price}`}
              onView={() => console.log("View:", item._id)}
              onAddToCart={() => console.log("Add to cart:", item._id)}
            />
          ))}
      </div>
    </div>
     </>
  )
}

export default Tshirt
