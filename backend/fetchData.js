// generating fake products using the faker package and feeding the date to products.json

//  npm install @faker-js/faker

const { faker } = require('@faker-js/faker');
const fs = require('fs')


const products = []

for( let i = 0; i < 500; i++){
    products.push({
        id: i + 1,
        name: faker.commerce.productName(),
        price: faker.commerce.price(),
        sku: faker.string.alphanumeric(8).toUpperCase(),
        description: faker.commerce.productDescription(),
        imageUrl: `https://picsum.photos/seed/${i}/400/300`
    })
}

fs.writeFileSync('products.json', JSON.stringify(products, null, 2))