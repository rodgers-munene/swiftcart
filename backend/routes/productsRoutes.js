const express = require('express');
const { getProducts, getProductDetails } = require('../controllers/productController');
const router = express.Router();

// Get all products
// GET /api/products
// public route 
router.get('/', getProducts)

// Get product details 
// GET /api/products/:id
// public route
router.get('/:id', getProductDetails)

module.exports = router