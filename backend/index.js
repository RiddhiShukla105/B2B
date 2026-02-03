import dotenv from "dotenv";
dotenv.config()


import mongoose from "mongoose";
import express from 'express'
import cors from 'cors'
import bodyParser from "body-parser";
import connectDB from "./Config/db.js";
import Product from './Routes/productRoutes.js'
import User from './Routes/userRoutes.js'
import Cart from './Routes/cartRoutes.js'
import Order from './Routes/orderRoutes.js'
import Wishlist from "./Routes/wishlistRoutes.js"

const app=express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
//   console.log("➡️", req.method, req.originalUrl);
  next();
});


connectDB()

app.use('/uploads', express.static('uploads'))

app.use('/api/user',User)
app.use('/api/product',Product)
app.use('/api/cart',Cart)
app.use('/api/order',Order)
app.use('/api/wishlist',Wishlist)


app.listen(process.env.PORT,()=>console.log(`Server is running on ${process.env.PORT}`))

