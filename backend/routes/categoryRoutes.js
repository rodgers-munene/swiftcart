const express = require('express')
const { getUniqueCategories } = require('../controllers/categoryController')
const router = express.Router()

// uniquecategorie
router.get('/', getUniqueCategories)

module.exports = router
