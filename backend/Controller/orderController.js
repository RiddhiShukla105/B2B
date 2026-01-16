import Order from "../Models/OrderSchema.js";

export const createOrder = async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res
        .status(401)
        .json({ success: false, message: "User not authenticated!!" });
    }
    const {
      products,
      name,
      email,
      phone,
      address,
      city,
      state,
      zipcode,
      country,
      status,
      paymentMethod,
      totalAmount,
    } = req.body;
    if (!totalAmount) {
      return res
        .status(400)
        .json({ success: false, message: "Total Amount missing" });
    }
    const order = new Order({
      userId,
      products,
      name,
      email,
      phone,
      address,
      city,
      state,
      zipcode,
      country,
      status,
      paymentMethod,
      totalAmount,
    });

    await order.save();

    return res
      .status(200)
      .json({ success: true, message: "Order created", order });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Order not created!!" });
  }
};

// export const getOrder = async (req, res) => {
//   try {
//     const order = await Order.find();
//     if (!order) {
//       return res
//         .status(400)
//         .json({ success: false, message: "Order not find" });
//     }
//     return res
//       .status(200)
//       .json({ success: true, message: "Order fetched", order });
//   } catch (error) {
//     return res
//       .status(500)
//       .json({ success: false, message: "Order not fetched!!" });
//   }
// };


export const userOrder = async (req, res) => {
  try {
    const userId = req.user.id; 

    const orders = await Order.find({ userId }).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      message: "Orders fetched",
      orders,
    });
  } catch (error) {
    console.error("GET ORDER ERROR ", error);
    return res.status(500).json({
      success: false,
      message: "Orders not fetched",
    });
  }
};


export const getOrder = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      message: "All orders fetched",
      orders,
    });
  } catch (error) {
    console.error("GET ALL ORDERS ERROR", error);
    return res.status(500).json({
      success: false,
      message: "Orders not fetched",
    });
  }
};

export const updateOrder=async(req,res)=>{
    try{
        const{id}=req.params;
        const{status}=req.body;
        const orders=await Order.findByIdAndUpdate(
            id,{$set:{
                status:status.toLowerCase()
            }},
            {new:true}
        );
        res.status(200).json(orders);

    }catch(error){
        res.status(500).json({message:error.message})
    }
}
