import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String
    },
    isBlock:{
        type:Boolean,
        default:false
    },
    role:{
        type:String,
        enum:["buyer","admin"],
        default:"buyer"
    }
})

export default mongoose.model('user',userSchema)