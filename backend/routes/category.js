const express = require('express');
const { getCategories, getSubCategories, getSubCategoryProducts } = require('../controllers/categoryController');
const router = express.Router()

// Get all categories
// GET /api/categories
// private route
router.get('/', getCategories)


// Get all subcategories for a category
router.get('/:categoryId/subcategories', getSubCategories)

router.get('/:categoryId/:subCategoryId/products', getSubCategoryProducts)

module.exports = router

