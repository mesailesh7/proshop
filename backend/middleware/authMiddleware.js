import jwt from "jsonwebtoken";
import asyncHandler from "./asyncHandler.js";
import User from "../models/userModel.js";

// Protect routes
const protect = asyncHandler(async (req, res, next) => {
  let token;

  // Read the jwt fromt the cookie
  //   we are getting jwt token from userController res.cookies('jwt)
  token = req.cookies.jwt;

  if (token) {
    try {
      // Verify token from userToken once its verified from userController its an object so it gets userId field
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.userId).select("-password"); //-password so that can minus or exclude the mentioned data while retreving it
      next(); // so that it will move on with the route
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  } else {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

// Admin middleware
const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error("Not authorized as an admin");
  }
};

export { admin, protect };
