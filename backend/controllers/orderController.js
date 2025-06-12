const asyncHandler = require("express-async-handler");
const Order = require("../models/orderModel");
const Product = require("../models/productModel");
const Address = require("../models/addressModel");
const Cart = require("../models/cartModel");

//get orders
const getOrders = asyncHandler(async (req, res) => {
  // validate the user token
  if (req.user.user_id !== req.params.id) {
    if (req.user.role !== "admin") {
      res.status(401);
      throw new Error("User unauthorised");
    }
  }

  const orders = await Order.find({ user_id: req.params.id });

  res.status(200).json(orders);
});

// get all orders for all users admin

const allOrders = asyncHandler(async (req, res) => {
  if (req.user.role !== "admin") {
    res.status(403);
    throw new Error("Not allowed to make this changes!!");
  }

  const orders = await Order.find();

  res.status(200).json(orders);
});

//post order
const postOrders = asyncHandler(async (req, res) => {
  const { paymentMethod } = req.body;

  // validate the user token
  if (req.user.user_id !== req.params.id) {
    res.status(401);
    throw new Error("User unauthorised!!");
  }

  // validate fields
  if (!paymentMethod) {
    res.status(400);
    throw new Error("All fields are mandatory!!");
  }

  // get the users address
  const userAddress = await Address.findOne({
    user_id: req.params.id,
    isDefault: true,
  });
  if (!userAddress) {
    res.status(400);
    throw new Error("Address required to complete order!");
  }

  // to create an order we will get the items from cart and add them to order when user clicks "proceed to checkout"
  const userCart = await Cart.findOne({ user_id: req.params.id });

  // get products in the cart and store them in an array
  const productsInCart = [];
  for (let i = 0; i < userCart.items.length; i++) {
    const product = await Product.findById(userCart.items[i].product_id);
    if (!product) {
      res.status(400);
      throw new Error("Product not found");
    }
    productsInCart.push({
      product_id: userCart.items[i].product_id,
      quantity: userCart.items[i].quantity,
      price: userCart.items[i].price,
    });
  }

  // create the order
  const newOrder = await Order.create({
    user_id: req.params.id,
    items: productsInCart,
    shippingAddress: userAddress._id,
    paymentMethod,
    totalPrice: userCart.totalPrice,
    paymentStatus: "pending",
    orderStatus: "processing",
  });

  // clear the cart

  userCart.items = [];
  userCart.totalPrice = 0;
  await userCart.save();

  res.status(201).json(newOrder);
});

//get orders details
const getOrderDetails = asyncHandler(async (req, res) => {
  // validate user token
  if (req.user.user_id !== req.params.id) {
    res.status(401);
    throw new Error("User unauthorised");
  }

  const orderDetails = await Order.findOne({ user_id: req.params.id });

  if (!orderDetails) {
    res.status(400);
    throw new Error("Order details not found");
  }

  res.status(200).json(orderDetails);
});

//get orders
const updateOrder = asyncHandler(async (req, res) => {
  // validate the token
  if (req.user.user_id !== req.params.id) {
    res.status(401);
    throw new Error("User unauthorised");
  }

  const allowedChanges = {
    paymentMethod: req.body.paymentMethod,
  };
  const order = await Order.findById(req.params.orderId);
  if (!order) {
    res.status(400);
    throw new Error("Order Not Found!!!");
  }
  // validates user order
  if (order.user_id.toString() !== req.params.id) {
    res.status(403);
    throw new Error("User not authorised to make this changes!!!");
  }

  const updatedOrder = await Order.findByIdAndUpdate(
    req.params.orderId,
    { $set: allowedChanges },
    { new: true }
  );
  res.status(200).json(updatedOrder);
});

//get orders
const deleteOrder = asyncHandler(async (req, res) => {
  // validate token
  if (req.user.user_id !== req.params.id) {
    res.status(401);
    throw new Error("User unauthorised");
  }

  // check if order exists
  const order = await Order.findById(req.params.orderId);
  if (!order) {
    res.status(400);
    throw new Error("Order Not Found!!!");
  }
  // check if user is valid
  if (order.user_id.toString() !== req.params.id) {
    res.status(403);
    throw new Error("User not authorised to make this changes!!!");
  }

  // delete order under specific state

  if (order.orderStatus === "processing" && order.paymentStatus === "pending") {
    const deletedOrder = await Order.findByIdAndDelete(req.params.orderId);

    res.status(200).json(deletedOrder);
  } else {
    res.status(400);
    throw new Error("Order Cancellation Failed");
  }
});

module.exports = {
  getOrders,
  allOrders,
  postOrders,
  getOrderDetails,
  updateOrder,
  deleteOrder,
};
