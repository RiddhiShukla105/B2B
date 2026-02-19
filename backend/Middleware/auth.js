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


