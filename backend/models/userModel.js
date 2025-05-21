const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "This field is required"],
        trim: true
    },
    lastName: {
        type: String,
        required: [true, "This field is required"],
        trim: true
    },
    email: {
        type: String,
        required: [true, "This field is required"],
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: [true, "This field is required"],
        trim: true
    },
    birthDate: {
        type: Date,
        required: [true, "This field is required"]
    },
    phone: {
        type: String,
        required: true,
        trim: true
    },
    address: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Address"
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('User', userSchema);