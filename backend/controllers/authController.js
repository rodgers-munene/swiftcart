const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

// registration controller
const registerUser = asyncHandler(async (req, res) => {
    const {firstName, lastName, email, password, birthDate, phone} = req.body;

    // check for missing fields
    if(!firstName || !lastName || !email || !password){
        res.status(400);
        throw new Error("All fields are mandatory!!")
    }

    // check if user is already register 
    const userAvailable = await User.findOne({ email })

    if(userAvailable){
        res.status(400);
        throw new Error("User already registered!!")
    }

    // encryption of password
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        birthDate,
        phone
    })

    console.log("✅ User created:", user);

    res.status(201).json({ 
        _id: user._id,
        firstName: user.firstName, 
        lastName: user.lastName, 
        email: user.email,
        birthDate: user.birthDate,
        phone: user.phone
     })
})

// login controller
const loginUser = asyncHandler(async (req, res) => {
    const {email, password} = req.body

    // check for missing fields
    if(!email || !password){
        res.json(400);
        throw new Error("All fields a required!!")
    }

    // check if user is registerd
    const userAvailable = await User.findOne({ email });

    const user = {
        user_id: userAvailable._id,
        firstName: userAvailable.firstName,
        lastName: userAvailable.lastName,
        email: userAvailable.email,
        dob: userAvailable.birthDate,
        phone: userAvailable.phone,
        role: userAvailable.role
    }

    const expiresAt = "5h"

    if(userAvailable && (await bcrypt.compare(password, userAvailable.password))){
        // create a login token for a successful login
        const accessToken = jwt.sign(
            { user },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: expiresAt})

        res.status(200).json({ accessToken, user})
    }else{
        res.status(401);
        throw new Error("Email or password is not valid");
    }

    res.status(200).json({message: "User Login successful"})
})

// const logout user

const logoutUser = asyncHandler(async (req, res) =>{
    res.status(200).json({message: "User successfully logged out"})
})

module.exports = { registerUser, loginUser, logoutUser }