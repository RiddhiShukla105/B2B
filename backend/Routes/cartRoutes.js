import express from 'express'
import { getCart,createCart,updateCartQty,removeCartItem,clearUserCart } from '../Controller/cartController.js';
import auth from "../Middleware/auth.js"

const router=express.Router();

router.get("/fetch",auth,getCart)
router.post("/add",auth,createCart)
router.put("/update",auth,updateCartQty)
router.delete("/remove",auth,removeCartItem)
router.delete("/clear",auth,clearUserCart)

export default router;