const express = require('express');
const { getCategories, postCategory, postBrand, getBrands, getProductsInBrand } = require('../controllers/categoryController');
const router = express.Router()

// Get all categories
// GET /api/categories
// private route
router.get('/', getCategories)


// get all brands in a category
// GET /api/categories/:categoryId/brands
// public route
router.get('/:categoryId/brands', getBrands )

// get all products in a specific brand
// GET /api/categories/:categoryId/:brandId
// public route
router.get('/:categoryId/:brandId/', getProductsInBrand)






module.exports = router

