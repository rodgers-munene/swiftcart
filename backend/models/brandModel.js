const mongoose = require('mongoose');


const brandSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    slug:{
        type: String,
        required: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    }
})

module.exports = mongoose.model('Brand', brandSchema);