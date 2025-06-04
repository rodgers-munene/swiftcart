const asyncHandler = require('express-async-handler')
const Product = require('../models/productModel')



const getUniqueCategories = asyncHandler(async (req, res) => {
    const categories = await Product.distinct('category')

    res.status(200).json(categories)
})

const getProductsByCategories = asyncHandler(async (req, res) => {
  const category = req.query.category;
  const categories = category ? category.split(",") : [];

  const minPrice = req.query.minPrice ? Number(req.query.minPrice) : 0;
  const maxPrice = req.query.maxPrice ? Number(req.query.maxPrice) : Number.MAX_SAFE_INTEGER;

  const productLimit = req.query.limit ? Number(req.query.limit) : 20;

  const query = {};

  // Filter by categories if provided
  if (categories.length > 0) {
    query.category = { $in: categories };
  }

  // Filter by price range
  query.price = { $gte: minPrice, $lte: maxPrice };

  const products = await Product.find(query).limit(productLimit);

  res.status(200).json(products);
});


module.exports = {
    getUniqueCategories,
    getProductsByCategories
}