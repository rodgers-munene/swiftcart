const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    product_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
    },
    status: {
        
    }
},{
    timestamps: true
})

module.exports = mongoose.model('Order', orderSchema);