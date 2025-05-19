const express = require('express')
const dotenv = require('dotenv').config()

// declare the app module 
const app = express()

const port = process.env.PORT? process.env.PORT: 5000;

// declaring the routes
// product routes
app.use('/api/products', require('./routes/products')) 

// category routes
app.use('/api/categories', require('./routes/category'))

// start the app
app.listen(port, () => {
    console.log(`Connected to the server on port: ${port}`)
})
