const express = require("express");
const dotenv = require("dotenv").config();
const errorHandler = require("./middleware/errorHandler");
const dbConnect = require("./config/dbConnect");
const rateLimiter = require("express-rate-limit");
const cors = require("cors");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const helmet = require("helmet");
// const seedFunction = require('./fetchData')

// start the database
dbConnect();

// seedFunction()

// declare the app module
const app = express();

const port = process.env.PORT ? process.env.PORT : 5000;

// allow api calls from our vite frontend
app.use(
  cors({
    origin: "https://swiftcart-alpha.vercel.app",
    credentials: true,
  })
);

//set secure http headers
app.use(helmet());
// limit the number of api calls from a single ip address to 60

const limiter = rateLimiter({
  windowMs: 15 * 60 * 1000,
  max: 60,
  message: "Too many requests from this ip, please try again later",
});

const authLimiter = rateLimiter({
  windowMs: 15 * 60 * 1000,
  max: 10, // 10 attempts per 15 minutes
  message: "Too many attempts ,please try again later",
});

app.use((req, res, next) => {
  req.query = { ...req.query }; // Clone into a mutable object
  next();
});

// protect the server from nosql injections
app.use(mongoSanitize());

// prevent cross-site scripting
app.use(xss());

app.use(express.json());

// declaring the routes
// admin routes
app.use("/api/admin", require("./routes/adminRoutes"));

// auth routes
app.use("/api/auth", limiter, require("./routes/authRoutes"));
// user routes
app.use("/api/users", limiter, require("./routes/userRoutes"));

// product routes
app.use("/api/products", require("./routes/productsRoutes"));

// category routes
app.use("/api/categories", require("./routes/categoryRoutes"));

// cart routes
app.use("/api/user", limiter, require("./routes/cartRoutes"));

// order routes
app.use("/api/user", limiter, require("./routes/orderRoutes"));

// payment route
app.use("/api/mpesa", require("./routes/mpesaRoutes"));

// error handler middleware
app.use(errorHandler);

// start the app
app.listen(port, () => {
  console.log(`Connected to the server on port: ${port}`);
});
