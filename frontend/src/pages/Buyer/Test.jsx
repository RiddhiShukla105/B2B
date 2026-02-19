// import React, { useEffect, useState } from 'react'
// import axios from 'axios'





// const Test = () => {

//     const[state,setState]=useState([])
//     const fetch = async()=>{
//         const res=await axios.get(`${import.meta.env.VITE_API_URL}/api/product/load-product`);
//         setState(res.data.product)
//     }
//     useEffect(()=>{
//         fetch()
//     },[])
    
//   return (
//     <div>
//       {state.map((item,id)=>(
//         <div>{item.name}</div>
//       ))}
//     </div>
//   )
// }

// export default Test






// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const Test = () => {

//   // 1️⃣ Store all products
//   const [products, setProducts] = useState([]);

//   // 2️⃣ Store current page
//   const [currentPage, setCurrentPage] = useState(1);

//   // 3️⃣ How many items per page
//   const itemsPerPage = 5;

//   // 4️⃣ Fetch ALL products once
//   const fetchProducts = async () => {
//     try {
//       const res = await axios.get(
//         `${import.meta.env.VITE_API_URL}/api/product/load-product`
//       );
//       setProducts(res.data.product);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   // 5️⃣ Calculate indexes
//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;

//   // 6️⃣ Slice products for current page
//   const currentItems = products.slice(indexOfFirstItem, indexOfLastItem);

//   // 7️⃣ Total pages
//   const totalPages = Math.ceil(products.length / itemsPerPage);

//   return (
//     <div>

//       {/* 8️⃣ Show only current page items */}
//       {currentItems.map((item) => (
//         <div key={item._id}>{item.name}</div>
//       ))}

//       {/* 9️⃣ Pagination Buttons */}
//       <div style={{ marginTop: "20px" }}>

//         <button
//           disabled={currentPage === 1}
//           onClick={() => setCurrentPage(currentPage - 1)}
//         >
//           Previous
//         </button>

//         <span style={{ margin: "0 10px" }}>
//           Page {currentPage} of {totalPages}
//         </span>

//         <button
//           disabled={currentPage === totalPages}
//           onClick={() => setCurrentPage(currentPage + 1)}
//         >
//           Next
//         </button>

//       </div>

//     </div>
//   );
// };

// export default Test;









// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const Test = () => {

//   // 1️⃣ Store products
//   const [products, setProducts] = useState([]);

//   // 2️⃣ Store current page
//   const [page, setPage] = useState(1);

//   // 3️⃣ Store total pages (coming from backend)
//   const [totalPages, setTotalPages] = useState(1);

//   // 4️⃣ Function to fetch products based on page
//   const fetchProducts = async () => {
//     try {
//       const res = await axios.get(
//         `${import.meta.env.VITE_API_URL}/api/product/load-product?page=${page}&limit=5`
//       );

//       // 5️⃣ Set products
//       setProducts(res.data.product);

//       // 6️⃣ Set total pages
//       setTotalPages(res.data.totalPages);

//     } catch (err) {
//       console.error("Error fetching products:", err);
//     }
//   };

//   // 7️⃣ Run fetch whenever page changes
//   useEffect(() => {
//     fetchProducts();
//   }, [page]);

//   return (
//     <div>

//       {/* 8️⃣ Show products */}
//       {products.map((item) => (
//         <div key={item._id}>{item.name}</div>
//       ))}

//       {/* 9️⃣ Pagination Buttons */}
//       <div style={{ marginTop: "20px" }}>

//         {/* 🔙 Previous Button */}
//         <button
//           disabled={page === 1}
//           onClick={() => setPage(page - 1)}
//         >
//           Previous
//         </button>

//         <span style={{ margin: "0 10px" }}>
//           Page {page} of {totalPages}
//         </span>

//         {/* 🔜 Next Button */}
//         <button
//           disabled={page === totalPages}
//           onClick={() => setPage(page + 1)}
//         >
//           Next
//         </button>

//       </div>

//     </div>
//   );
// };

// export default Test;





// router.get("/load-product",async(req,res)=>{
//     const page=parseInt(req.query.page)||1;
//     const limit=parseInt(req.query.limit)||5;

//     const skip=(page-1)*limit;

//     const products=await Product.find();
//     .skip(skip)
//     .limit(limit);

//     const total=await Product.countDocuments();

//     res.json({
//         product:products,
//         total,
//         page,
//         totalPages:Math.ceil(total/limit)
//     })
// })


import React from 'react'

const Test = () => {
  return (
    <div>
      
    </div>
  )
}

export default Test

