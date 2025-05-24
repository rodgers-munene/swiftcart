const asyncHandler = require('express-async-handler')


//get orders
const getOrders = asyncHandler(async (req, res) => {
    res.status(200).json({ message: "Get all order items"})
})

//post order
const postOrders = asyncHandler(async (req, res) => {
    res.status(200).json({ message: "Post an order"})
})

//get orders details
const getOrderDetails = asyncHandler(async (req, res) => {
    res.status(200).json({ message: "Get order details"})
})

//get orders
const updateOrder = asyncHandler(async (req, res) => {
    res.status(200).json({ message: "Update an order"})
})

//get orders
const deleteOrder = asyncHandler(async (req, res) => {
    res.status(200).json({ message: "Delete an order"})
})

module.exports = {
    getOrders,
    postOrders,
    getOrderDetails,
    updateOrder,
    deleteOrder
}