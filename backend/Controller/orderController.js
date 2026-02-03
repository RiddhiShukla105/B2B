import Order from "../Models/OrderSchema.js";
import axios from "axios";

export const createOrder = async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated",
      });
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
      totalAmount,
      paypalTransactionId
    } = req.body;

    if (!products?.length) {
      return res.status(400).json({
        success: false,
        message: "Products missing",
      });
    }

    if (!totalAmount) {
      return res.status(400).json({
        success: false,
        message: "Total amount missing",
      });
    }

    const order = new Order({
      userId,
      products,
      address: {
        name,
        email,
        phone,
        addressLine: address,
        city,
        state,
        zipcode,
        country,
      },
      addressCompleted: true,
      totalAmount,
      paypalTransactionId,
      status: "address_added",
      payment: {
        method: "paypal",
        status: "pending",
        amount: totalAmount,
      },
    });

    await order.save();

    return res.status(201).json({
      success: true,
      message: "Address saved. Proceed to PayPal.",
      orderId: order._id,
    });
  } catch (error) {
    console.error("CREATE ORDER ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to create order",
    });
  }
};


export const verifyPaypalPayment = async (req, res) => {
  try {
    const { paypalOrderId } = req.body;

    if (!paypalOrderId) {
      return res.status(400).json({
        success: false,
        message: "PayPal Order ID missing",
      });
    }

    // 1️⃣ GET PAYPAL ACCESS TOKEN
    const auth = Buffer.from(
      `${process.env.PAYPAL_CLIENT_ID}:${process.env.PAYPAL_CLIENT_SECRET}`
    ).toString("base64");

    const tokenRes = await axios.post(
      `${process.env.PAYPAL_API}/v1/oauth2/token`,
      "grant_type=client_credentials",
      {
        headers: {
          Authorization: `Basic ${auth}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    const accessToken = tokenRes.data.access_token;

    // 2️⃣ CAPTURE PAYMENT
    const captureRes = await axios.post(
      `${process.env.PAYPAL_API}/v2/checkout/orders/${paypalOrderId}/capture`,
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    const captureData = captureRes.data;

    if (captureData.status !== "COMPLETED") {
      return res.status(400).json({
        success: false,
        message: "Payment not completed",
      });
    }

    const transactionId =
      captureData.purchase_units[0].payments.captures[0].id;

    return res.status(200).json({
      success: true,
      transactionId,
    });
  } catch (error) {
    console.error("PAYPAL VERIFY ERROR:", error?.response?.data || error);
    return res.status(500).json({
      success: false,
      message: "Payment verification failed",
    });
  }
};


export const confirmPaidOrder = async (req, res) => {
  try {
    const userId = req.user?.id;
    const { orderId, paypalOrderId, paypalTransactionId } = req.body;

    if (!userId || !orderId || !paypalOrderId || !paypalTransactionId) {
      return res.status(400).json({
        success: false,
        message: "Required data missing",
      });
    }

    const order = await Order.findOne({
      _id: orderId,
      userId,
      "payment.status": "pending",
    });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found or already processed",
      });
    }

    order.payment.status = "paid";
    order.payment.paypalOrderId = paypalOrderId;
    order.payment.paypalTransactionId = paypalTransactionId;
    order.payment.paidAt = new Date();
    order.status = "confirmed";

    await order.save();

    return res.status(200).json({
      success: true,
      message: "Order confirmed",
      order,
    });
  } catch (error) {
    console.error("CONFIRM ORDER ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Order confirmation failed",
    });
  }
};

export const cancelOrder = async (req, res) => {
  try {
    const userId = req.user?.id;
    const { orderId } = req.body;

    if (!userId || !orderId) {
      return res.status(400).json({
        success: false,
        message: "Order ID required",
      });
    }

    await Order.findOneAndDelete({
      _id: orderId,
      userId,
      "payment.status": "pending",
    });

    return res.status(200).json({
      success: true,
      message: "Unpaid order deleted",
    });
  } catch (error) {
    console.error("CANCEL ORDER ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to cancel order",
    });
  }
};


export const userOrder = async (req, res) => {
  try {
    const orders = await Order.find().sort({
      createdAt: -1,
    });

    res.status(200).json({ success: true, orders });
  } catch (error) {
    console.error("GET USER ORDERS ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Orders not fetched",
    });
  }
};


export const getOrder = async (req, res) => {
  try {

    const userId=req.user.id;

    const orders = await Order.find({userId}).sort({ createdAt: -1 });

    res.status(200).json({ success: true, orders });
  } catch (error) {
    console.error("GET ALL ORDERS ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Orders not fetched",
    });
  }
};


export const updateOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const order = await Order.findByIdAndUpdate(
      id,
      { status: status.toLowerCase() },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Order updated",
      order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};




export const createPaypalOrder = async (req, res) => {
  try {
    const { amount } = req.body;

    if (!amount) {
      return res.status(400).json({
        success: false,
        message: "Amount is required",
      });
    }

    // 1️⃣ GET PAYPAL ACCESS TOKEN
    const auth = Buffer.from(
      `${process.env.PAYPAL_CLIENT_ID}:${process.env.PAYPAL_CLIENT_SECRET}`
    ).toString("base64");

    const tokenRes = await axios.post(
      `${process.env.PAYPAL_API}/v1/oauth2/token`,
      "grant_type=client_credentials",
      {
        headers: {
          Authorization: `Basic ${auth}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    const accessToken = tokenRes.data.access_token;

    // 2️⃣ CREATE PAYPAL ORDER
    const orderRes = await axios.post(
      `${process.env.PAYPAL_API}/v2/checkout/orders`,
      {
        intent: "CAPTURE",
        purchase_units: [
          {
            amount: {
              currency_code: "USD",
              value: amount.toFixed(2),
            },
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    return res.status(201).json({
      success: true,
      paypalOrderId: orderRes.data.id,
    });
  } catch (error) {
    console.error(
      "PAYPAL CREATE ORDER ERROR:",
      error?.response?.data || error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to create PayPal order",
    });
  }
};
