const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
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
        shippingAddress: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Address",
            required: true
        },
        paymentMethod: {
            type: String,
            required: true,
            enum: ['card', 'mpesa', 'paypal']
        },
        totalPrice: {
            type: Number,
            required: true
        },
        paymentStatus: {
            type: String,
            default: 'pending' // or paid
        },
        orderStatus: {
            type: String,
            default: 'processing', // shipped, delivered, cancelled
        }

},
{
    timestamps: true
})

module.exports = mongoose.model('Order', orderSchema);