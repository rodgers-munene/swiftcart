const express = require('express')
const { getOrders, postOrders, getOrderDetails, updateOrder, deleteOrder } = require('../controllers/orderController')
const router = express.Router()

// Get all orders for a user
// GET /api/users/:id/orders
// private route
router.get('/:id/orders', getOrders)

// add new order
// POST /api/users/:id/orders
// private route
router.post('/:id/orders', postOrders)

// Get order details 
// GET /api/users/:id/:orderId
// private route
router.get('/:id/orders/:orderId', getOrderDetails)

// update order
// PUT /api/users/:id/:orderId
// private route
router.put('/:id/orders/:orderId', updateOrder)

// Delete / Cancel an order
// DELETE /api/users/:id/:orderId
// private route
router.delete('/:id/orders/:orderId', deleteOrder)

module.exports = router;





