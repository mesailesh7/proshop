import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";

// In web development there's many different ways to authenticate users. You can use cookies,session,Json web tokens or a combinations. There is other servies like OAuth and there's third party services like Auth0.
// Json web token (JWT) is a secure way to share the information between two parties, such as a web server and a client. It consist of three parts a header a payload and a signature. Payload contains information like the user's ID or user's role and the signature is used to verify the information hasn't been tampered with in any way.
// JWt are commonly used for authentication which is the process of verifying user identity. Now, traditionally, Json web tokens often get stored in the browser on the client so basically we would login , we would validate , send a token and then we'd store that token in our local storage on the client and then send that token to any protected routes where we had to be logged in, where we had to authenticate.
// but storing in the client can be insecure like cross-site scripting and all kind of other attacks.
// We are going to generate a Json web token. However, we're going to store it in an Http only cookie on the server. We're going to write some middleware when we authenticare or we register it will create a token , store it in an HTTP only cookies and that will be sent with every request from then on.

// desc Auth user & get token
// routes Post /api/users/login
// @aceess public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email: email });

  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);

    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
    return;
  }
});

// desc Register user
// routes Post /api/users
// @aceess public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email: email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
    return;
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    generateToken(res, user._id);
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// desc Logout user / clear cookie
// routes POST /api/users/logout
// @aceess Private
const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "logged out sucessfully" });
});

// desc Get user profile
// routes Get /api/users/profile
// @aceess Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// desc Update user profile
// routes Put /api/users/profile
// @aceess Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      // token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// desc Get users
// routes Get /api/users/profile
// @aceess Private/Admin
const getUsers = asyncHandler(async (req, res) => {
  res.send("get user");
});

// desc Delete users
// routes Delete /api/users/:id
// @aceess Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
  res.send("delete user");
});

// desc Get user by id
// routes Get /api/users/:id
// @aceess Private/Admin
const getUserByID = asyncHandler(async (req, res) => {
  res.send("get user by id");
});

// desc Update users
// routes PUT /api/users/:id
// @aceess Private/Admin
const updateUser = asyncHandler(async (req, res) => {
  res.send("update user");
});

export {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserByID,
  updateUser,
};
