const express = require('express')
const router = express.Router()
const { registerUser, loginUser, logoutUser } = require('../controllers/authController')


// create a new user / signup
// POST /api/users/register
// public route
router.post('/register', registerUser)

// login a user
// POST /api/users/login
// public router
router.post('/login', loginUser)

// logout a user
// POST /api/users/login
// private router
router.post('/logout', logoutUser)


module.exports = router