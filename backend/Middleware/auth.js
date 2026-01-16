// import jwt from "jsonwebtoken";
// import User from "../Models/userSchema.js"

// export const auth = async (req, res, next) => {
//   try {
//     const authHeader = req.headers.authorization;

//     if (!authHeader || !authHeader.startsWith("Bearer ")) {
//       return res.status(401).json({
//         success: false,
//         message: "Not authorized, token missing",
//       });
//     }

//     const token = authHeader.split(" ")[1];
    
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     const user = await User.findById(decoded.id).select("-password");

//     if (!user) {
//       return res.status(401).json({
//         success: false,
//         message: "User not found",
//       });
//     }

//     // 4. Attach user to request
//     req.user = user;

//     next(); // allow access

//   } catch (error) {
//     return res.status(401).json({
//       success: false,
//       message: "Token invalid or expired",
//     });
//   }
// };
// export default auth;





// import jwt from "jsonwebtoken";
// import User from "../Models/userSchema.js";

// const auth = async (req, res, next) => {
//   // console.log("Auth")
//   try {
//     const authHeader = req.headers.authorization;
//     // console.log("authHeader",authHeader)

//     if (!authHeader || !authHeader.startsWith("Bearer ")) {
//       return res.status(401).json({ message: "Token missing" });
//     }

//     const token = authHeader.split(" ")[1];
//     // console.log("token",token)

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     const user = await User.findById(decoded.userId).select("-password");

//     if (!user) {
//       return res.status(401).json({ message: "User not found" });
//     }

//     req.user = {
//       id: user._id,
//       email: user.email,
//     };

//     console.log("REQ USER:", req.user);

//     next();
//   } catch (err) {
//     console.error("AUTH ERROR:", err.message);
//     res.status(401).json({ message: "Invalid token" });
//   }
// };

// export default auth;





import jwt from "jsonwebtoken";
import User from "../Models/userSchema.js";

const auth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Token missing" });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // ✅ FIX IS HERE
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    // ✅ Attach FULL user
    req.user = user;

    // console.log("REQ USER:", req.user._id.toString());

    next();
  } catch (err) {
    console.error("AUTH ERROR:", err.message);
    res.status(401).json({ message: "Invalid token" });
  }
};

export default auth;
