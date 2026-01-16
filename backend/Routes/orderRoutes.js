import express from 'express'
import { createOrder, getOrder, userOrder,updateOrder } from '../Controller/orderController.js'
import auth from "../Middleware/auth.js"

const router=express.Router();

router.post('/create-order',auth,createOrder)
router.get('/get-order',auth,getOrder)
router.get('/user-order',auth,userOrder)
router.patch('/edit-order/:id',auth,updateOrder)

export default router;