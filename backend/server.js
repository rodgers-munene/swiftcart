const express = require('express')
const dotenv = require('dotenv').config()
const errorHandler = require('./middleware/errorHandler')
const dbConnect = require('./config/dbConnect')
const seedFunction = require('./fetchData')

// start the database 
dbConnect()



// declare the app module 
const app = express()

const port = process.env.PORT? process.env.PORT: 5000;


app.use(express.json())

// declaring the routes

// auth routes
app.use('/api/auth', require('./routes/authRoutes'))
// user routes
app.use('/api/users', require('./routes/userRoutes'))

// product routes
app.use('/api/products', require('./routes/productsRoutes')) 

// category routes and brand routes
app.use('/api/categories', require('./routes/categoryRoutes'))


// error handler middleware
app.use(errorHandler);

// start the app
app.listen(port, () => {
    console.log(`Connected to the server on port: ${port}`)
})


