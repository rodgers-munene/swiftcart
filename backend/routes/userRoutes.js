const express = require('express')
const { userProfile, updateProfile, getAddresses, createAddress, updateAddress, deleteAddress, getSpecificAddress } = require('../controllers/userController')

const { validateToken } = require('../middleware/tokenValidation')
const router = express.Router()



// Get user information / profile
// GET /api/users/:id
// private router
router.get('/profile/:id', validateToken, userProfile)

// Update user profile/ info
// PUT /api/users/:id
// private router
router.put('/profile/:id', validateToken, updateProfile)

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



module.exports = router