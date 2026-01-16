// import React,{useContext,useEffect} from 'react'
// import { OrderList } from 'primereact/orderlist';
// import { useLocation,useNavigate } from 'react-router-dom';
// import { CartContext } from '../../context/CartContext';
        

// const Cart = () => {


//     const location = useLocation();
//     const navigate = useNavigate();
//     const {
//     cartItems,
//     setCartItems,
//     updateQty,
//     removeItem
//   } = useContext(CartContext);

//   useEffect(() => {
// }, [cartItems]);

//     const itemTemplate = (item) => {
//         return (
//             <div className="flex flex-wrap p-2 align-items-center gap-3">
//                 <img className="w-4rem shadow-2 flex-shrink-0 border-round" src={item.image} alt={item.name} />
//                 <div className="flex-1 flex flex-column gap-2 xl:mr-8">
//                     <span className="font-bold">{item.name}</span>
//                     <div className="flex align-items-center gap-2">
//                         <i className="pi pi-tag text-sm"></i>
//                         <span>{item.category}</span>
//                     </div>
//                 </div>
//                 <span className="font-bold text-900">${item.price}</span>
//             </div>
//         );
//     };
//   return (
//     <div>
//        <div className="card xl:flex xl:justify-content-center">
//             <OrderList dataKey="id" value={ cartItems} onChange={(e) => setProducts(e.value)} itemTemplate={itemTemplate} header="Products"></OrderList>
//         </div>
//     </div>
//   )
// }

// export default Cart







import React, { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cartItems, updateQty, removeItem } = useContext(CartContext);
  const navigate = useNavigate();

  const totalPrice=cartItems.reduce(
    (t,i)=>t+i.price*i.qty,0
  )

  if (!Array.isArray(cartItems)) {
    return <div className="text-center py-20">Loading cart...</div>;
  }

  //Empty Cart

  if (cartItems.length === 0) {
    return (
      <div className="text-center py-20 space-y-4">
        <p className="text-2xl font-semibold">Your cart is empty</p>
        <button
          onClick={() => navigate("/")}
          className="px-6 py-3 bg-black text-white rounded"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold">Your Cart</h1>

      {cartItems.map((item) => (
        <div
          key={`${item.id}-${item.size}`}
          className="flex flex-col md:flex-row gap-6 border rounded-lg p-4"
        >
          <img
            src={item.image}
            alt={item.name}
            className="w-32 h-40 object-cover rounded"
          />

          <div className="flex-1 space-y-2">
            <h3 className="text-xl font-semibold">{item.name}</h3>
            <p>Size: {item.size}</p>
            <p className="font-bold">${item.price}</p>

            <div className="flex items-center gap-4">
              <button
                onClick={() => item.qty > 5 && updateQty(item.id,item.size, -1)}
                className="px-3 py-1 border rounded"
              >
                −
              </button>

              <span className="text-lg font-medium">{item.qty}</span>

              <button
                onClick={() => updateQty(item.id,item.size, 1)}
                className="px-3 py-1 border rounded"
              >
                +
              </button>
            </div>
          </div>

          <button
            onClick={() => removeItem(item.id, item.size)}
            className="text-red-600 font-semibold hover:text-red-800"
          >
            Remove
          </button>
          
        </div>
      ))}

    <hr/>
    <div className="font-bold text-3xl text-center">Total: ${totalPrice}</div>

    <div className="text-center">
        <button type="submit" className="bg-black text-white text-2xl py-2 px-4 hover:bg-black/80" onClick={()=>navigate('/order')}>Place Order</button>
    </div>
    </div>
  );
};

export default Cart;
