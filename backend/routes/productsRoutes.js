const express = require('express');
const { getProducts, getProductDetails, postProduct, updateProduct, deleteProduct } = require('../controllers/productController');
const router = express.Router();

// Get all products
// GET /api/products
// public route 
router.get('/', getProducts)

// Get product details 
// GET /api/products/:id
// public route
router.get('/:id', getProductDetails)

// update product details
// PUT /api/products/:id
// admin level route
router.put('/:id', updateProduct);

// delete a product 
// DELETE /api/products/:id
// admin level route
router.delete('/:id', deleteProduct);


// Post a product
// POST /api/products
// admin level route
router.post('/', postProduct)



module.exports = router