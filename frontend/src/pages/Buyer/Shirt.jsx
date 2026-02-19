import React, { useState, useEffect } from 'react'
import Cards from '../../components/Cards'
import axios from 'axios'
import ScrollReveal from '../../components/ScrollReveal'
import {useNavigate } from 'react-router-dom'

const Tshirt = () => {
  const [products, setProducts] = useState([])
   const[loopProduct,setLoopProduct]=useState([])
  // const navigate=useNavigate()
  const category="shirt"

  // useEffect(() => {
  //   fetchData()
  // }, [])

    useEffect(() => {
        
        const loadData = async () => {
          try {
            const first = await axios.get(
              `${import.meta.env.VITE_API_URL}/api/product/loop-product?category=${category}`,
              { params: { cycle: 0 } }
            );
           
            const second = await axios.get(
              `${import.meta.env.VITE_API_URL}/api/product/loop-product?category=${category}`,
              { params: { cycle: 1 } }
            );
            
      
            setLoopProduct([
              ...first.data.product,
              ...second.data.product
            ]);
      
            
      
          } catch (error) {
            console.log(error);
          }
        };
      
        loadData();
      
      }, []);

  const navigate=useNavigate()

  // const fetchData = async () => {
  //   try {
  //     const res = await axios.get(
  //       `${import.meta.env.VITE_API_URL}/api/product/load-product/?category=shirt`
  //     )

  //     setProducts(res.data.product) // or res.data.products
  //     console.log(res.data.product)
  //   } catch (err) {
  //     console.log(err)
  //   }
  // }

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
      {/* <div
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
</div> */}
<section>
  <div className="
    px-3                 /* phone side padding */
    sm:px-4
    md:px-6
    lg:px-0

    grid
    grid-cols-2          /* phone: 2 columns */
    sm:grid-cols-2
    md:grid-cols-3
    lg:grid-cols-4

    gap-x-3              /* tighter horizontal gap */
    gap-y-6              /* more vertical breathing room */
    sm:gap-x-4
    sm:gap-y-6
    md:gap-6
    lg:gap-8
  ">
    {Array.isArray(loopProduct) && loopProduct.map((item, id) => (
      <ScrollReveal key={id}>
        <div className="w-full" onClick={() => handleClick(item)}>
      <Cards
        key={item._id || id}
        image={[`${import.meta.env.VITE_API_URL}/uploads/${item.displayImage}`]}
        title={item.name}
        price={item.price}
      />
      </div>

      </ScrollReveal>
    ))}
  </div>
</section>

    </div>
     </div>
  )
}

export default Tshirt
