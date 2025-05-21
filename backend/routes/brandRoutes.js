const express = require('express')
const router = express.Router()

const { postBrand, getBrands, getProductsInBrand } = require('../controllers/brandController')

// get all brands in a category
// GET /api/categories/:categoryId/brands
// public route
router.get('/:categoryId/brands', getBrands )

// get all products in a specific brand
// GET /api/categories/:categoryId/:brandId
// public route
router.get('/:categoryId/:brandId/', getProductsInBrand)

// Post a new brand in a category
// POST /api/categories/:categoryId/brands
// admin level route
router.post('/:categoryId/brands', postBrand);

module.exports = router;