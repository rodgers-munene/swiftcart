const express = require('express')
const { userProfile, getAllUsers, updateProfile, getAddresses, createAddress, updateAddress, deleteAddress, getSpecificAddress } = require('../controllers/userController')
const validateToken = require('../middleware/tokenValidation')
const router = express.Router()



// Get user information / profile
// GET /api/users/:id
// private router
router.get('/:id', validateToken, userProfile)

// Update user profile/ info
// PUT /api/users/:id
// private router
router.put('/:id', validateToken, updateProfile)

// Get all of users addresses
// GET /api/users/:id/address
// private router
router.get('/:id/address', validateToken, getAddresses)

// Get specific address
// GET /api/users/:id/address/:addressId
// private router
router.get('/:id/address/:addressId', validateToken, getSpecificAddress)

// create user Address info
// POST /api/users/:id/address
// private router
router.post('/:id/address', validateToken, createAddress)

// update user Address info
// UPDATE /api/users/:id/address
// private router
router.put('/:id/address/:addressId', validateToken, updateAddress)


// delete user Address info
// DELETE /api/users/:id/address
// private router
router.delete('/:id/address/:addressId', validateToken, deleteAddress)


// get all users
router.get('/', getAllUsers);

module.exports = router