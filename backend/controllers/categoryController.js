const asyncHandler = require("express-async-handler")
const Category = require('../models/categoryModel')


// get categories
const getCategories = asyncHandler(async (req, res) => {
    const categories = await Category.find();
    res.json(categories);
})

// get brands in categories
// GET /api/categories/:categoryId


// create category test

const postCategory = asyncHandler( async (req, res) => {
    const {name ,slug} = req.body

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





module.exports = {getCategories, postCategory}