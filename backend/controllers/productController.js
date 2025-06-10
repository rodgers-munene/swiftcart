const asyncHandler = require("express-async-handler");
const Product = require("../models/productModel");

// Get all products
const getProducts = asyncHandler(async (req, res) => {
  limit = req.query.limit || 20;
  const products = await Product.find().limit(limit);
  res.json(products);
});

// Get product Details
// get /api/products/:id
const getProductDetails = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(400);
    throw new Error("Product Not Found!!");
  }

  res.status(200).json(product);
});

const getHighestDiscountProducts = asyncHandler(async (req, res) => {
  const productLimit = req.query.limit || 10;
  const products = await Product.find()
    .sort({ discountPercentage: -1 })
    .limit(productLimit);

  res.status(200).json(products);
});

// admin/ seller level endpoint

// post a product

const postProduct = asyncHandler(async (req, res) => {
  const { sku, productName, description, category, subCategory, image, price } =
    req.body;

  if (req.user.role !== "admin") {
    res.status(403);
    throw new Error("Not allowed to make this changes!!");
  }

  // required field validations
  if (!productName || !description || !subCategory || !sku) {
    res.status(400);
    throw new Error("Key values Missing!!");
  }

  // define category hierarchy

  const categoryHierarchy = [category, subCategory];

  const product = await Product.create({
    sku,
    productName,
    description,
    category,
    categoryHierarchy,
    productImages: image,
    price: {
      list: Number(price),
      sale: Number(price),
    },
  });
  res.status(201).json(product);
});

// update a product
// PUT /api/product/:id
const updateProduct = asyncHandler(async (req, res) => {
  if (req.user.role !== "admin") {
    res.status(403);
    throw new Error("Not allowed to make this changes!!");
  }

  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(404);
    throw new Error("Product not found!");
  }

  const newProduct = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json(newProduct);
});

// delete a product
// DELETE /api/product/:id

const deleteProduct = asyncHandler(async (req, res) => {
  if (req.user.role !== "admin") {
    res.status(403);
    throw new Error("Not allowed to make this changes!!");
  }

  const product = await Product.findByIdAndDelete(req.params.id);

  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  res.status(200).json(product);
});

const searchProducts = asyncHandler(async (req, res) => {
    const {query, category, brand, page = 1, limit = 10, sort} = req.query;

    const searchQuery = {}

    // Full-text search
    if(query) {
        searchQuery.$or = [
            { productName: { $regex: query, $options: 'i' } },
            { description: { $regex: query, $options: 'i' } },
            { category: { $regex: query, $options: 'i' } },
        ];
    }

    // category filter
    if(category){
        searchQuery.category = category;
    }

    // brand filter
    if(brand){
        searchQuery.brand = brand;
    }

    // pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);

    let sortOption = {};
    if(sort === 'price_asc')sortOption.price = 1;
    else if (sort === 'price_desc') sortOption.price = -1;
    else sortOption.createdAt = -1; // default, returns newest first

    const products = await Product.find(searchQuery)
        .sort(sortOption)
        .skip(skip)
        .limit(parseInt(limit))

    const total = await Product.countDocuments(searchQuery)

    res.status(200).json({
        products,
        total,
        page: parseInt(page),
        pages: Math.ceil(total/limit)
    })


});

module.exports = {
  getProducts,
  getProductDetails,
  postProduct,
  updateProduct,
  deleteProduct,
  getHighestDiscountProducts,
  searchProducts
};
