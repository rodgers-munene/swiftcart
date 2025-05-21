const mongoose = require('mongoose')

const addressSchema = mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    addressLineOne:{
        type: String,
        require: [true, "This field is required"]
    },
    addressLineTwo: {
        type: String,
    },
    country: {
        type: String,
        required: [true, "This field is required"],
    },
    city: {
        type: String,
        required: [true, "This field is required"]
    },
    postalCode: {
        type: Number,
        required: [true, "This field is required"]
    }

}, {
    timestamps: true
})

module.exports = mongoose.model('Address', addressSchema);