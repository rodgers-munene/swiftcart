const asyncHandler = require("express-async-handler");
const Cart = require("../models/cartModel");
const Product = require("../models/productModel");

// get cart items
// GET /api/user/:id/cart
const getCart = asyncHandler(async (req, res) => {
  // validate the token
  if (req.user.user_id !== req.params.id) {
    res.status(401);
    throw new Error("User Unauthorised!!");
  }

  const cart = await Cart.find({});

  res.status(200).json(cart);
});

// post items to cart
const addToCart = asyncHandler(async (req, res) => {
  // fetch the body
  const { product_id, quantity } = req.body;

  // validate the token
  if (req.user.user_id !== req.params.id) {
    res.status(401);
    throw new Error("Action unauthorised!!");
  }
  // check for missing field
  if (!product_id || !quantity) {
    res.status(400);
    throw new Error("Key values missing!!");
  }

  // get product from product schema
  const product = await Product.findById(product_id);
  if (!product) {
    res.status(400);
    throw new Error("Product not found");
  }

  // check for an already existing user's cart
  const userCart = await Cart.findOne({ user_id: req.params.id });

  // format the price
  const formattedPrice = product.price ? parseFloat(product.price) : 0;

  if (!userCart) {
    const newCart = await Cart.create({
      user_id: req.params.id,
      items: [
        {
          product_id,
          quantity,
          price: formattedPrice * quantity,
        },
      ],
      totalPrice: formattedPrice * quantity,
    });

    res.status(201).json(newCart);
  } else {
    // check if product already exist in the cart
    const itemIndex = await userCart.items.findIndex(
      (item) => item.product_id.toString() === product_id
    );

    if (itemIndex > -1) {
      // if product already exists update quantity and price
      userCart.items[itemIndex].quantity += quantity;
      userCart.items[itemIndex].price =
        parseFloat(userCart.items[itemIndex].price) + formattedPrice * quantity;
    } else {
      // if product does not exist push it into the array
      userCart.items.push({
        product_id,
        quantity,
        price: formattedPrice * quantity,
      });
    }

    userCart.totalPrice += formattedPrice * quantity;

    const updatedCart = await userCart.save();

    res.status(201).json(updatedCart);
  }
});

// update cart items
const updateCart = asyncHandler(async (req, res) => {
  const { quantity } = req.body;

  // validate the token
  if (req.user.user_id !== req.params.id) {
    res.status(401);
    throw new Error("User Unauthorised");
  }

  if (quantity === undefined) {
    res.status(400);
    throw new Error("Key values Missing");
  }

  // check if product exist
  const product = await Product.findById(req.params.productId);
  if (!product) {
    res.status(400);
    throw new Error("Product does not exist");
  }

  // get the user cart
  const userCart = await Cart.findOne({ user_id: req.params.id });

  // look for the item in the cart
  const itemIndex = await userCart.items.findIndex(
    (item) => item.product_id.toString() === req.params.productId
  );

  const formattedPrice = product.price ? parseFloat(product.price) : 0;

  if (itemIndex > -1) {
    const oldPrice = parseFloat(userCart.items[itemIndex].price);

    if (quantity > 0) {
      userCart.items[itemIndex].quantity = quantity;
      userCart.items[itemIndex].price = formattedPrice * quantity;

      userCart.totalPrice =
        userCart.totalPrice - oldPrice + formattedPrice * quantity;
    } else {
      userCart.totalPrice -= oldPrice;
      userCart.items.splice(itemIndex, 1);
    }

    const updatedCart = await userCart.save();
    res.status(200).json(updatedCart);
  } else {
    res.status(400);
    throw new Error("Product does not exist in cart!!");
  }
});

// delete cart item

const deleteCart = asyncHandler(async (req, res) => {
  if (req.user.user_id !== req.params.id) {
    res.status(400);
    throw new Error("User Unauthorised");
  }

  const product = await Product.findById(req.params.productId);
  if (!product) {
    res.status(400);
    throw new Error("Product does not Exist");
  }

  const userCart = await Cart.findOne({ user_id: req.params.id });
  if (!userCart) {
    res.status(404);
    throw new Error("Cart not found");
  }
  const formattedPrice = product.price ? parseFloat(product.price) : 0;

  const itemIndex = await userCart.items.findIndex(
    (item) => item.product_id.toString() === req.params.productId
  );

  if (itemIndex > -1) {
    const oldPrice = parseFloat(userCart.items[itemIndex].price);
    userCart.totalPrice -= oldPrice;

    userCart.items.splice(itemIndex, 1);

    const deletedCart = await userCart.save();

    res.status(200).json(deletedCart);
  } else {
    res.status(400);
    throw new Error("Product not found in cart!!");
  }
});

module.exports = {
  getCart,
  addToCart,
  updateCart,
  deleteCart,
};
