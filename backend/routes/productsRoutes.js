const express = require('express');
const { getProducts, getProductDetails, getHighestDiscountProducts, searchProducts } = require('../controllers/productController');
const router = express.Router();

// Get all products
// GET /api/products
// public route 
router.get('/', getProducts)

// get products sorted according to the discountPercentage
// GET /api/products
// public route

router.get('/highest-discount', getHighestDiscountProducts)

// Search products
// GET /api/products/search
// public route
router.get('/search', searchProducts)

// Get product details 
// GET /api/products/:id
// public route
router.get('/:id', getProductDetails)


module.exports = router