const express = require("express");
const router = express.Router();
const { paymentMethod } = require("../controllers/paymentController");
const { handleCallback } = require("../mpesa/callbackHandler");

// route to trigger stkpush
router.post("/stkpush", paymentMethod);

// callback endpoint
router.post("/callback", handleCallback);

module.exports = router;
