import jwt from "jsonwebtoken";
import UserModel from "../models/User.js";

const auth = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(" ")[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get user from the token
      req.user = await UserModel.findById(decoded?.id).select("-password");
      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: "Not authorized, token failed" });
    }
  }
  // Check if token exists
  if (!token) {
    res.status(401).json({ message: "Not authorized, no token" });
  }
};

export { auth };
