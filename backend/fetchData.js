const fs = require('fs')
// const products = require('../../../Downloads/products.json')
const Product = require('./models/productModel')

// read the json file

const products = JSON.parse(fs.readFileSync('./products_cleaned.json', 'utf-8'))

// limit products to insert to 1000
const productsToInsert = products.slice(1, 201);

const cleanedProducts = productsToInsert.map(product => {
    delete product._id; // remove the _id field
    return product;
  });


async function seed() {
  try {

    await Product.insertMany(cleanedProducts);
    console.log('✅ 1000 products imported successfully!');
  } catch (error) {
    console.error('❌ Error importing products:', error.message);
  } 
}




module.exports = seed