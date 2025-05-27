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



// create category test

const postCategory = asyncHandler( async (req, res) => {
    const {name ,slug} = req.body

    if(req.user.role !== 'admin'){
        res.status(403);
        throw new Error("Not allowed to make this changes!!")
    }
    
    if(!name || !slug){
        res.status(400);
        throw new Error("All field are required!!");
    }

    const categoryCreated = await Category.findOne({name: req.body.name})

    if(categoryCreated){
        res.status(400);
        throw new Error("Brand already exists");
    }

    const brand = await Category.create({
        name,
        slug,
    })
})

// create brand
// admin level
const postBrand = asyncHandler( async (req, res) => {
    const {name ,slug, category} = req.body

    if(req.user.role !== 'admin'){
        res.status(403);
        throw new Error("Not allowed to make this changes!!")
    }

    if(!name || !slug){
        res.status(400);
        throw new Error("All field are required!!");
    }

    const brandCreated = await Brand.findOne({name: req.body.name})

    if(brandCreated){
        res.status(400);
        throw new Error("Brand already exists");
    }

    const brand = await Brand.create({
        name,
        slug,
        category: req.params.categoryId
    })
})





module.exports = {getCategories, postCategory, postBrand, getBrands, getProductsInBrand}