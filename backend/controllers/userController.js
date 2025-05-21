const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

// registration controller
const registerUser = asyncHandler(async (req, res) => {
    const {firstName, lastName, email, password, birthDate, phone, address} = req.body;

    // check for missing fields
    if(!firstName || !lastName || !email || !password || !birthDate || !phone){
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
        phone,
        address
    })

    console.log("✅ User created:", user);

    res.status(201).json({ 
        _id: user._id,
        firstName: user.firstName, 
        lastName: user.lastName, 
        email: user.email,
        birthDate: user.birthDate,
        phone: user.phone,
        address: user.address
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

    if(userAvailable && (await bcrypt.compare(password, userAvailable.password))){
        // create a login token for a successful login
        const accessToken = jwt.sign({
            user: {
                firstName: userAvailable.firstName,
                lastName: userAvailable.lastName,
                email: userAvailable.email,
                dob: userAvailable.birthDate,
                phone: userAvailable.phone
            }
        }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1h" })

        res.status(200).json({ accessToken })
    }else{
        res.status(401);
        throw new Error("Email or password is not valid");
    }

    res.status(200).json({message: "User Login successful"})
})

// user Profile

const userProfile = asyncHandler(async (req, res) => {
    res.json(req.user);
})

// admin leve api
const getAllUsers = asyncHandler(async (req, res) => {
    const users = await User.find();
    res.status(200).json(users)
})

module.exports = {registerUser, loginUser, userProfile, getAllUsers}