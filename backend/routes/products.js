const express = require('express')
const { getProducts, getProductDetails } = require('../controllers/productController')
const router = express.Router()

// Get all products
// GET /api/products
// private route 
router.get('/', getProducts)

// Get product details 
// GET /api/products/:id
// private route
router.get('/:id', getProductDetails)

module.exports = router