import mongoose from "mongoose";

const wishlistSchema=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true
    },
    items:[
        {
            productId:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"Product",
                required:true
            },
            name:String,
            image:String,
            price:String,
            quantity:{
                type:Number,
                default:1
            }
        }
    ]
})

export default mongoose.model("Wishlist",wishlistSchema)