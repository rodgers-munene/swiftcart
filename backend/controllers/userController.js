const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const Address = require('../models/addressModel')


// user Profile
const userProfile = asyncHandler(async (req, res) => {
    if(req.user.user_id !== req.params.id){
        res.status(400)
        throw new Error("Unauthorised!!")
    }
    res.json(req.user);
})

// update profile
const updateProfile = asyncHandler(async(req, res) => {
    // check if user exists
    const user = await User.findById(req.params.id)

    if(!user){
        res.status(400)
        throw new Error("User not found")
    }

    // validate the token
    if(req.user.user_id !== req.params.id){
        res.status(401)
        throw new Error("Unauthorised!!")
    }

    const allowedChanges = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        birthDate: req.body.birthDate,
        phone: req.body.phone
    }

    const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {$set: allowedChanges},
        {new: true}
    )
    res.status(200).json(updatedUser)

})

// user addresses

// Get userAddress
const getAddresses = asyncHandler(async (req, res) => {
    // validate the token
    if(req.user.user_id !== req.params.id){
        res.status(401);
        throw new Error("Unauthorised!!")
    }

    const address = await Address.find({user_id: req.params.id})

    res.status(200).json(address)

})

// get specific address details
const getSpecificAddress = asyncHandler(async(req, res) => {
    if(req.user.user_id !== req.params.id){
        res.status(401);
        throw new Error("Unauthorised");
    }

    const address = await Address.findById(req.params.addressId)

    if(!address){
        res.status(400)
        throw new Error("Address not found")
    }

    res.status(200).json(address);

})

// post  address
const createAddress = asyncHandler(async (req, res) => {
    const { addressLine, country, city, postalCode } = req.body

    if(!addressLine || !country || !city || !postalCode){
        res.status(400)
        throw new Error("All key fields are mandatory");
    }

    // validate the token
    if(req.user.user_id !== req.params.id){
        res.status(401);
        throw new Error("Unauthorised")
    }

    const address = await Address.create({
        user_id: req.user.user_id,
        addressLine,
        country,
        city,
        postalCode
    })
    res.status(200).json(address)
})

// update address
// put /api/users/:id/address/:addressId
const updateAddress = asyncHandler(async (req, res) => {
    // validate the token 
    if(req.user.user_id !== req.params.id){
        res.status(401);
        throw new Error("Unauthorised");
    }

    const address = await Address.findById(req.params.addressId)

    if(!address){
        res.status(400)
        throw new Error("Address not found")
    }
    const updatedAddress = await Address.findByIdAndUpdate(
        req.params.addressId,
        req.body,
        {new: true}
    )
    res.status(201).json(updatedAddress);
    
})

// delete address
const deleteAddress = asyncHandler(async (req, res) => {
    if(req.user.user_id !== req.params.id){
        res.status(401);
        throw new Error("Unauthorised");
    }

    const address = await Address.findByIdAndDelete(req.params.addressId)

    if(!address){
        res.status(400)
        throw new Error("Address not found")
    }


    res.status(200).json(address);
})

// admin level api
const getAllUsers = asyncHandler(async (req, res) => {
    const users = await User.find();
    res.status(200).json(users)
})

module.exports = {
     userProfile,
     getAllUsers, 
     updateProfile, 
     getAddresses,
     getSpecificAddress, 
     createAddress, 
     updateAddress, 
     deleteAddress
}