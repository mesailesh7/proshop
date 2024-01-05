import asyncHandler from "../middleware/asyncHandler";
import order from "../models/orderModel.js";

// @desc create new order
// @route POST /api/orders
//@access Private

const addOrderItems = asyncHandler(async (req, res) => {
  res.send("Add order items");
});

// @desc Get logged in user orders
// @route GET /api/orders/myorders
//@access Private

const getMyOrders = asyncHandler(async (req, res) => {
  res.send("Get my orders");
});

// @desc Get  order by Id
// @route GET /api/orders/:id
//@access Private

const getOrderById = asyncHandler(async (req, res) => {
  res.send("Get order by id");
});

// @desc Update order to paid
// @route GET /api/orders/:id/pay
//@access Private

// by default in orderModel.js isPaid is set default to unpaid
const udpateOrderToPaid = asyncHandler(async (req, res) => {
  res.send("update order to paid");
});

// @desc update order to delivered
// @route GET /api/orders/:id/deliver
// @access Private
const updateOrderToDelivered = asyncHandler(async (req, res) => {
  res.send("update order to delivered");
});
