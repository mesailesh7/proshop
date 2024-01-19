import asyncHandler from "../middleware/asyncHandler.js";
import Order from "../models/orderModel.js";

// @desc create new order
// @route POST /api/orders
//@access Private

const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  console.log(orderItems);

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error("No order items");
  } else {
    // this will put it in the variables but will not be saved to the database
    const order = new Order({
      orderItems: orderItems.map((x) => ({
        ...x,
        product: x._id,
        _id: undefined,
      })), // we have to put directly orderItems beacuse if we check orderModel.js order items array data is going to come through directly from front end. But the product which is just the id of the item for each item.
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });

    // we want to await for for the order and let the data comes and then save it to the database.
    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  }
});

// @desc Get logged in user orders
// @route GET /api/orders/myorders
//@access Private

const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  res.status(200).json(orders);
});

// @desc Get  order by Id
// @route GET /api/orders/:id
//@access Private

const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id) //find by id
    .populate("user", "name email"); //it will populate user and email id

  if (order) {
    res.status(200).json(order);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

// @desc Update order to paid
// @route PUT /api/orders/:id/pay
//@access Private

// by default in orderModel.js isPaid is set default to unpaid
const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    // data below is gonna come from paypal
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    };

    const updatedOrder = await order.save();
    res.status(200).json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

// @desc update order to delivered
// @route PUT /api/orders/:id/deliver
// @access Private
const updateOrderToDelivered = asyncHandler(async (req, res) => {
  res.send("update order to delivered");
});

// @desc Get all orders
// @route GET /api/orders/
// @access Private/Admin
const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({}).populate("user", "id name");
  res.status(200).json(orders); //now we are gonna go in Orderslice
});

export {
  addOrderItems,
  getMyOrders,
  getOrderById,
  getOrders,
  updateOrderToPaid,
  updateOrderToDelivered,
};

// being imported to orderRoutes
