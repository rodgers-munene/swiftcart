const asyncHandler = require('express-async-handler')
const Product = require('../models/productModel')

// Get all products
const getProducts = asyncHandler(async (req, res) => {
    limit = req.query.limit || 20
    const products = await Product.find().limit(limit)
    res.json(products)
})

// Get product Details
// get /api/products/:id
const getProductDetails = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if(!product){
        res.status(400)
        throw new Error("Product Not Found!!");
    }

    res.status(200).json(product)
})


// admin/ seller level endpoint

// post a product

const postProduct = asyncHandler(async (req, res) => {
    const {name, description, category, brand, image, sku, inStock, quantity, ratings, numReviews, colors, size, discount, weight} = req.body

    // required field validations
    if(!name || !description || !brand || inStock === undefined ||!sku){
        res.status(400)
        throw new Error("Key values Missing!!")
    }

    const product = await Product.create({
        name,
        description,
        category,
        brand,
        image,
        sku,
        inStock,
        quantity,
        ratings,
        numReviews,
        colors,
        size,
        discount,
        weight
    })
    res.status(201).json(product);
})


// update a product
// PUT /api/product/:id
const updateProduct = asyncHandler(async (req, res) => {

    const product = await Product.findById(req.params.id);

    if(!product){
        res.status(404);
        throw new Error("Product not found!");
    }

    const newProduct = await Product.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new: true}
    )
    res.status(200).json(newProduct);
})

// delete a product
// DELETE /api/product/:id

const deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findByIdAndDelete(req.params.id);

    if(!product) {
        res.status(404);
        throw new Error("Product not found")
    }

    res.status(200).json(product)

})




module.exports = {getProducts, getProductDetails, postProduct, updateProduct, deleteProduct}