const asyncHandler = require('express-async-handler')

// registration controller
const registerUser = asyncHandler(async (req, res) => {
    res.status(201).json({message: "Register a user endpoint"})
})

// login controller
const loginUser = asyncHandler(async (req, res) => {
    res.status(200).json({message: "User Login successful"})
})

// user Profile

const userProfile = asyncHandler(async (req, res) => {
    res.status(200).json({message: "User Login successful"})
})

module.exports = {registerUser, loginUser, userProfile}