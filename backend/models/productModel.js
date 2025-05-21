const  mongoose = require('mongoose')


const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please add the contact name"],
        maxLength: 100,
        trim: true
    },
    description: {
        type: String,
        required: [true, "Please add the description of the product"],
        maxLength: 1000
    },
    price: {
        type: Number,
        required: [true, "Please add the price of the product"],
        min: 0,
        default: 0
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: [true, "Please add the product category"]
    },
    brand: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Brand',
        required: [true, "Product Brand is required"]
    },
    image: {
        type: String,
        default: ''
    },
    sku: {
      type: String,
      required: true,
      unique: true,
    },
    inStock: {
        type: Boolean,
        required: true
    },
    quantity: {
        type: Number,
        default: 0
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    numReviews: {
      type: Number,
      default: 0,
    },
    colors: {
      type: [String],
      default: [],
    },
    size: {
      type: String,
      enum: ['S', 'M', 'L', 'XL'],
      default: 'M',
    },
    discount: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },
    weight: {
      type: String,
      default: '0 kg',
    }       

},
{timestamps: true}
)

module.exports = mongoose.model('Product', productSchema)
