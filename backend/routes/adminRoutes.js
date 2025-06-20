const express = require("express");
const router = express.Router();
const {
  deleteProduct,
  updateProduct,
  postProduct,
} = require("../controllers/productController");
const { getAllUsers } = require("../controllers/userController");
const { getOrders, allOrders } = require("../controllers/orderController");
const { validateToken, isAdmin } = require("../middleware/tokenValidation");

//user management

// get all users admin level priviledges
// GET /api/users
// private route
router.get("/users", validateToken, isAdmin, getAllUsers);

// product management

// delete a product
// DELETE /api/products/:id
// admin level route
router.delete("/products/:id", validateToken, isAdmin, deleteProduct);

// update product details
// PUT /api/products/:id
// admin level route
router.put("/products/:id", validateToken, isAdmin, updateProduct);

// Post a product
// POST /api/products
// admin level route
router.post("/products", validateToken, isAdmin, postProduct);

// order management

// get all orders from all users
// GET /api/admin/users/orders
// admin route
router.get("/users/orders", validateToken, isAdmin, allOrders);

// Get all orders for a user
// GET /api/users/:id/orders
// private route
router.get("/users/orders/:id", validateToken, isAdmin, getOrders);

module.exports = router;
