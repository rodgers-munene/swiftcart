const express = require('express')
const { getCart, addToCart, updateCart, deleteCart } = require('../controllers/cartController')
const { validateToken } = require('../middleware/tokenValidation')
const router = express.Router()

// Get cart
// GET /api/users/:id/cart
// private route
router.get('/:id/cart', validateToken, getCart)

// post product in cart
// POST /api/users/:id/cart
// private route
router.post('/:id/cart', validateToken, addToCart)

// update product in cart
// UPDATE /api/users/:id/cart/:productId
// private route
router.put('/:id/cart/:productId', validateToken, updateCart)

// delete a product in cart
// DELETE /api/users/:id/cart/:productId
// private route
router.delete('/:id/cart/:productId', validateToken, deleteCart)

module.exports = router;
