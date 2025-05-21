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
// user routes
app.use('/api/users', require('./routes/userRoutes'))

// product routes
app.use('/api/products', require('./routes/productsRoutes')) 

// category routes
app.use('/api/categories', require('./routes/categoryRoutes'))

// brand routers
app.use('/api/categories/',require('./routes/brandRoutes') )

// error handler middleware
app.use(errorHandler);

// start the app
app.listen(port, () => {
    console.log(`Connected to the server on port: ${port}`)
})


