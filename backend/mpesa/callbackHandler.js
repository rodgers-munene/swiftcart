const Order = require('../models/orderModel')

const handleCallback = (req, res) => {
    console.log('🔔 Callback endpoint was hit');
    const data = req.body;
    console.log('Callback recieved:', JSON.stringify(data, null, 2))

    // update the order db after callback

    res.status(200).json({});
}

module.exports = { handleCallback }