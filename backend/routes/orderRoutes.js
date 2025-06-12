const express = require("express");
const {
  getOrders,
  postOrders,
  getOrderDetails,
  updateOrder,
  deleteOrder,
} = require("../controllers/orderController");
const { validateToken } = require("../middleware/tokenValidation");
const router = express.Router();

// Get all orders for a user
// GET /api/users/:id/orders
// private route
router.get("/:id/orders", validateToken, getOrders);

// add new order
// POST /api/users/:id/orders
// private route
router.post("/:id/orders", validateToken, postOrders);

// Get order details
// GET /api/users/:id/:orderId
// private route
router.get("/:id/orders/:orderId", validateToken, getOrderDetails);

// update order
// PUT /api/users/:id/:orderId
// private route
router.put("/:id/orders/:orderId", validateToken, updateOrder);

// Delete / Cancel an order
// DELETE /api/users/:id/:orderId
// private route
router.delete("/:id/orders/:orderId", validateToken, deleteOrder);

module.exports = router;
