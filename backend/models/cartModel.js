const mongoose = require('mongoose')

const cartSchema = mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, "User Id is required"]
    },
    items: [
        {
            product_id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                required: [true, "Product Id is required"]
            },
            quantity: {
                type: Number,
                required: true,
                default: 1
            },
            price: {
                type: Number,
                required: true
            }

        }
    ],    
    totalPrice: {
        type: Number,
        required: true,
        default: 0
    }
},
{
    timestamps: true
}
);

module.exports = mongoose.model("Cart", cartSchema);