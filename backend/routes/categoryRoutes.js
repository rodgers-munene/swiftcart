const express = require('express')
const { getUniqueCategories, getProductsByCategories } = require('../controllers/categoryController')
const router = express.Router()

// uniquecategorie
router.get('/', getUniqueCategories)

router.get('/products', getProductsByCategories)

module.exports = router
