import React,{useState,useEffect,useRef} from 'react'
import Cards from '../../components/Cards'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import ScrollReveal from '../../components/ScrollReveal'


const Tshirt = () => {
    const[products,setProducts]=useState([])
     const[loopProduct,setLoopProduct]=useState([])
    const navigate=useNavigate()
    const imageRefs=useRef([])
    const category="t-shirt"

    

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

    // const fetchData=async(req,res)=>{
    //   await axios.get(`${import.meta.env.VITE_API_URL}/api/product/load-product?category=${category}`)
    //   .then((res)=>{
    //     setProducts(res.data.product)
    //     console.log(res.data.product)
    //   })
    //   .catch((err)=>console.log(err))
    // }

    const handleClick=(item)=>{
      navigate(`/tshirt/${item._id}`,{state:item})
    }
  return (

<div className='bg-[#fdfaf6] pb-8'>
  {/* Banner Section */}
  <section className="w-full relative overflow-hidden pb-0!">
  <img
    src="/image/banner13.png"
    alt="Banner"
    className="
      w-full
      h-[150px]
      sm:h-[150px]
      md:h-[250px]
      lg:h-[400px]
      object-cover
      object-center
    "
  />
</section>


  {/* Collection Section */}
  <div className="px-4 sm:px-6 md:px-10 lg:px-12 pt-0!">
 {/* <div
  className="
    px-3                
    sm:px-4
    md:px-6
    lg:px-0

    grid
    grid-cols-2          
    sm:grid-cols-2
    md:grid-cols-3
    lg:grid-cols-4

    gap-x-3              
    gap-y-6              
    sm:gap-x-4
    sm:gap-y-6
    md:gap-6
    lg:gap-8
  "
>
  {Array.isArray(products) &&
    products.map((item, id) => (
      <ScrollReveal key={id}>
        <div className="w-full" onClick={() => handleClick(item)}>
 
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
