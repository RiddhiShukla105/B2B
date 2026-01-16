import dotenv from 'dotenv'
dotenv.config();

import User from "../Models/userSchema.js";
import bcrypt from 'bcryptjs'
import jwt from "jsonwebtoken"

export const createUser=async(req,res)=>{
    try{
         const {name,email,password}=req.body;

         if(!name||!email||!password){
            return res.status(400).json({success:false,message:"All fields are required"})
         }

         const userEmail=await User.findOne({email})
         if(userEmail){
            return res.status(400).json({success:false,message:"Email already exists"})
         }

         const hashedPassword=await bcrypt.hash(password,10);


         const user=new User({name,email,password:hashedPassword})
         await user.save()

         return res.status(200).json({success:true,message:"User created !!"})


    }catch(error){
        return res.status(500).json({success:false,message:"User not created!!",error})
    }
}


// export const updateUser = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { name } = req.body;

//     if (!name) {
//       return res.status(400).json({
//         success: false,
//         message: "Name is required",
//       });
//     }

//     const updatedUser = await User.findByIdAndUpdate(
//       id,
//       { name },
//       { new: true, runValidators: true }
//     );

//     if (!updatedUser) {
//       return res.status(404).json({
//         success: false,
//         message: "User not found",
//       });
//     }

//     return res.status(200).json({
//       success: true,
//       message: "Name updated successfully",
//       user: updatedUser,
//     });

//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       message: "User not updated",
//       error: error.message,
//     });
//   }
// };


export const getUser=async(req,res)=>{
    try{
        const user=await User.find().select("-password")

        return res.status(200).json({success:true,message:"Data fetched!!",user})

    }catch(error){
        return res.status(500).json({success:false,message:"Data not fetched",error:message.error})
    }
}

export const deleteUser=async(req,res)=>{
    try{
        const {id}=req.params;
        if(!id){
            return res.status(400).json({success:false,message:"User not found"})
        }
        const user=await User.findByIdAndDelete(id)
        return res.status(200).json({success:true,message:"User deleted",user})

    }catch(error){
        return res.status(500).json({success:false,message:"Data not deleted",error})
    }
}

export const blockUser=async(req,res)=>{
    try{
        const{id}=req.params;
        if(!id){
            return res.status(400).json({success:false,message:"User not found"})
        }

        const user=await User.findByIdAndUpdate(id,{isBlock:true},{new:true})
        return res.status(200).json({success:true,message:"User is blocked",user})


    }catch(error){
        return res.status(500).json({success:false,message:"Block unsuccessful",error:message.error})
    }
}

export const unblockUser=async(req,res)=>{
    try{
        const{id}=req.params;
        if(!id){
            return res.status(400).json({success:false,message:"User not found"})
        }

        const user=await User.findByIdAndUpdate(id,{isBlock:false},{new:true})

        return res.status(200).json({success:true,message:"User unblokced",user})

    }catch(error){
        return res.status(500).json({success:false,message:"User not iunblocked",error:message.error})
    }
}

// export const loginUser=async(req,res)=>{
//         try{

//           const{email,password}=req.body;

//           const userEmail=await find({email})
//           if(userEmail){
//             const userPassword=await find({password})

//             if(userPassword){
//               return res.status(200).json({success:true,message:"User logged in!"})
//             }
//           }

//           return res.status(400).json({success:false,message:"Invalid Credentials"})

//         }catch(error){
//           return res.status(500).json({success:false,message:error.message})
//         }
// }


export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET not defined");
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      token,
      role: user.role,
    });
  } catch (error) {
    // console.error("LOGIN ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};

