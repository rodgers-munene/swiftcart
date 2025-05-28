const asyncHandler = require('express-async-handler')
const Product = require('../models/productModel')



const getUniqueCategories = asyncHandler(async (req, res) => {
    const categories = await Product.distinct('category<j')

    res.status(200).json(categories)
})

module.exports = {
    getUniqueCategories
}