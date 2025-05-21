// generating fake products using the faker package and feeding the date to products.json

//  npm install @faker-js/faker

const { faker } = require('@faker-js/faker');
const fs = require('fs')
const mongoose = require('mongoose')
const slugify = require('slugify')

const Category = require('./models/categoryModel')
const Brand = require('./models/brandModel')
const Product = require('./models/productModel')




async function seed(){
    await Product.deleteMany({});
    await Brand.deleteMany({});
    await Category.deleteMany({});

    console.log("Old Data Cleared")

    try {
        for(let i = 0; i < 1000; i++){
        
        const categoryName = faker.commerce.department();
        const brandName = faker.company.name();

        let category = await Category.findOne({ name: categoryName})
        if(!category){
            category = await Category.create({
                name: categoryName,
                slug: slugify(categoryName, {lower: true})
            });
        }
        

        let brand = await Brand.findOne({name : brandName})
        if(!brand){
            brand = await Brand.create({
                name: brandName,
                slug: slugify(brandName, {lower: true})
            })
        }

        await Product.create({
            name: faker.commerce.productName(),
            description: faker.commerce.productDescription(),
            price: faker.number.float({min: 10, max: 1000}),
            category: category._id,
            brand: brand._id,
            image: faker.image.url(),
            sku: faker.string.alphanumeric(8).toUpperCase(),
            inStock: faker.datatype.boolean(),
            quantity: faker.number.int({min: 0}),
            rating: faker.number.float({min: 1, max: 5, precision: 0.1}),
            numReviews: faker.number.int({min: 0, max: 500}),
            colors: Array.from({length: 2}, () => faker.color.human()),
            size: faker.helpers.arrayElement(['S', 'M', 'L', 'XL']),
            discount: faker.number.int({min: 0, max: 40}),
            weight: `${faker.number.float({min: 0.1, max: 10}).toFixed(2)} kg`
        })
        
        console.log(`Created Product ${i + 1}`)
    }

    console.log('Seeding Complete')
    } catch (error) {
        console.error("Error seeding data", error);
    }
}
// fs.writeFileSync('products.json', JSON.stringify(products, null, 2))

module.exports = seed