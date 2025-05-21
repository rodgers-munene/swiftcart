const express = require('express');
const { getCategories, postCategory } = require('../controllers/categoryController');
const router = express.Router()

// Get all categories
// GET /api/categories
// private route
router.get('/', getCategories)


// add a new category
// POST /api/categories
// admin level route
router.post('/', postCategory)



module.exports = router

