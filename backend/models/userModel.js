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
    },
    phone: {
        type: String,
        trim: true
    },
    role:{
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('User', userSchema);