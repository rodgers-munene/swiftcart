const express = require('express')
const { registerUser, loginUser, userProfile } = require('../controllers/userController')
const router = express.Router()

// create a new user / signup
// POST /api/users/register
// public route
router.post('/register', registerUser)

// login a user
// POST /api/users/login
// public router
router.post('/login', loginUser)

// Get user information / profile
// GET /api/users/:userId
// private router
router.get('/:id', userProfile)

module.exports = router