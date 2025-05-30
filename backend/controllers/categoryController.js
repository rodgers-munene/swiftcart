const asyncHandler = require('express-async-handler')
const Product = require('../models/productModel')



const getUniqueCategories = asyncHandler(async (req, res) => {
    const categories = await Product.distinct('category')

    res.status(200).json(categories)
})

const getProductsByCategories = asyncHandler(async(req, res) => {
    const category = req.query.category;
    const categories = category.split(",")
    const productLimit = req.query.limit || 20

    const products = await Product.find({category: { $in: categories }}).limit(Number(productLimit))

    res.status(200).json(products)
})

module.exports = {
    getUniqueCategories,
    getProductsByCategories
}