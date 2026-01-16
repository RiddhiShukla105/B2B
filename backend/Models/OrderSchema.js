// import mongoose from 'mongoose';

// const orderSchema = new mongoose.Schema({
//   userId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "User",
//     required: true
//   },
//   products: [
//     {
//       productId: { type: mongoose.Schema.Types.ObjectId, ref: 'product', required: true },
//       name: { type: String, required: true },
//       price: { type: Number, required: true },
//       qty: { type: Number, required: true },
//       size: { type: String },
//       image: { type: [String] }
//     }
//   ],
//   name: { type: String, required: true },
//   email: { type: String, required: true },
//   phone: { type: String, required: true },
//   address: { type: String, required: true },
//   city: { type: String, required: true },
//   state: { type: String, required: true },
//   zipcode: { type: String, required: true },
//   country:{type:String,required:true},
//   // Payment Details
// //   paymentMethod: {
// //     type: String,
// //     enum: ['cod', 'paypal'],
// //     required: true
// //   },
// //   paymentStatus: {
// //     type: String,
// //     enum: ['pending', 'paid', 'refunded', 'failed'],
// //     default: 'pending'
// //   },
// //   paypalOrderId: {  
// //     type: String
// //   },
// //   paypalTransactionId: { 
// //     type: String
// //   },
// //   paymentAmount: { 
// //     type: Number
// //   },
// //   currency: { 
// //     type: String,
// //     default: "USD"
// //   },

//   // Order Status
//   status: {
//     type: String,
//     enum: ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'],
//     default: 'pending'
//   },

//   price: { type:mongoose.Schema.Types.ObjectId,ref:"Cart", required: true }

// }, { timestamps: true });

// export default mongoose.model('Order', orderSchema);
import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    products: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        name: String,
        price: Number,
        qty: Number,
        size: String,
        image: [String],
      },
    ],

    name: String,
    email: String,
    phone: String,
    address: String,
    city: String,
    state: String,
    zipcode: String,
    country: String,

    paymentMethod: {
      type: String,
      enum: ["cod", "paypal"],
      default: "cod",
    },

    totalAmount: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
      enum: ["pending", "confirmed", "shipped", "delivered", "cancelled"],
      default: "pending",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);
