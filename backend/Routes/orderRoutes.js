// import express from 'express'
// import { createOrder, getOrder, userOrder,updateOrder } from '../Controller/orderController.js'
// import auth from "../Middleware/auth.js"

// const router=express.Router();

// router.post('/create-order',auth,createOrder)
// router.get('/get-order',auth,getOrder)
// router.get('/user-order',auth,userOrder)
// router.patch('/edit-order/:id',auth,updateOrder)

// export default router;

import express from "express";
import {
  createOrder,
  confirmPaidOrder,
  cancelOrder,updateOrder,verifyPaypalPayment,createPaypalOrder,
  getOrder,
  userOrder
} from "../Controller/orderController.js";
import auth from "../Middleware/auth.js";



const router = express.Router();

router.post("/create", auth, createOrder);
router.post("/confirm", auth, confirmPaidOrder);
router.delete("/:id", auth, cancelOrder);
router.patch("/:id",auth,updateOrder)
router.get("/getorder",auth,getOrder)
router.get("/userOrder",auth,userOrder)
router.post("/paypal/verify", auth,verifyPaypalPayment );
router.post("/paypal/create-order",auth,createPaypalOrder)

export default router;
