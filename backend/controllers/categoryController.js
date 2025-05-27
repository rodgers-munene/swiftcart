const asyncHandler = require("express-async-handler")
const Product = require('../models/productModel')


// get categories
const getCategories = asyncHandler(async (req, res) => {
    const categories = await Category.find();
    res.json(categories);
})


// get all brands
// GET /api/categories/:categoryId/brand

const getBrands = asyncHandler(async(req, res) => {
    const brands = await Brand.find();
    res.status(200).json(brands)
})

// get all products under a certain brand
//GET /api/categories/:categoryId/:brandId/

const getProductsInBrand = asyncHandler(async (req, res) => {
    const brandProducts = await Product.find({
        category: req.params.categoryId, 
        brand: req.params.brandId
    });
    
    if(!brandProducts){
        res.status(404);
        throw new Error("Product Not Found");
    }

    res.status(200).json(brandProducts)
})







module.exports = {getCategories, getBrands, getProductsInBrand}