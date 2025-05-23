const express = require('express');
const { getCategories, postCategory, postBrand, getBrands, getProductsInBrand } = require('../controllers/categoryController');
const router = express.Router()

// Get all categories
// GET /api/categories
// private route
router.get('/', getCategories)


// add a new category
// POST /api/categories
// admin level route
router.post('/', postCategory)

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



module.exports = router

