import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    products: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        name: {
          type: String,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
        qty: {
          type: Number,
          min: 1,
          required: true,
        },
        size: String,
        image: {
          type: [String],
          default: [],
        },
      },
    ],

    // ✅ LOCKED AFTER FORM SAVE
    address: {
      name: { type: String },
      email: { type: String },
      phone: { type: String },
      address: { type: String }, // ✅ fixed (was addressLine)
      city: { type: String },
      state: { type: String },
      zipcode: { type: String },
      country: { type: String },
    },

    addressCompleted: {
      type: Boolean,
      default: false,
    },

    payment: {
      method: {
        type: String,
        enum: ["paypal"],
        default: "paypal",
      },

      status: {
        type: String,
        enum: ["pending", "paid", "failed", "refunded"],
        default: "pending",
      },

      paypalOrderId: {
        type: String,
        index: true,
      },

      paypalTransactionId: String,

      amount: {
        type: Number,
      },

      currency: {
        type: String,
        default: "USD",
      },

      paidAt: Date,
    },

    totalAmount: {
      type: Number,
    },

    status: {
      type: String,
      enum: [
        "cart",
        "address_added",
        "payment_pending",
        "confirmed",
        "shipped",
        "delivered",
        "cancelled",
      ],
      default: "cart",
      index: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);
